import PlexLoginButton from '@app/components/Login/PlexLoginButton';
import { useUser } from '@app/hooks/useUser';
import defineMessages from '@app/utils/defineMessages';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

const messages = defineMessages('components.Setup', {
  signin: 'Sign in to your account',
  signinWithPlex: 'Sign in with your Plex account to continue',
});

interface SetupLoginProps {
  onComplete: () => void;
}

const SetupLogin: React.FC<SetupLoginProps> = ({ onComplete }) => {
  const [authToken, setAuthToken] = useState<string | undefined>(undefined);
  const { user, revalidate } = useUser();

  useEffect(() => {
    const login = async () => {
      try {
        const response = await axios.post('/api/v1/auth/plex', {
          authToken: authToken,
        });

        if (response.data?.id) {
          const { data: loggedInUser } = await axios.get('/api/v1/auth/me');
          revalidate(loggedInUser, false);
        }
      } catch {
        // auth failed silently and user can attempt again
      }
    };
    if (authToken) {
      login();
    }
  }, [authToken, revalidate]);

  useEffect(() => {
    if (user) {
      onComplete();
    }
  }, [user, onComplete]);

  return (
    <div className="p-4">
      <div className="mb-2 flex justify-center text-xl font-bold">
        <FormattedMessage {...messages.signin} />
      </div>
      <div className="mb-2 flex justify-center pb-6 text-sm">
        <FormattedMessage {...messages.signinWithPlex} />
      </div>
      <div className="flex justify-center bg-black/30 px-10 py-8">
        <PlexLoginButton
          large
          onAuthToken={(token) => {
            setAuthToken(token);
          }}
        />
      </div>
    </div>
  );
};

export default SetupLogin;
