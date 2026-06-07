import type { AllSettings } from '@server/lib/settings';
import { randomUUID } from 'node:crypto';

const migrateBranflixPlexClientId = (settings: any): AllSettings => {
  if (
    Array.isArray(settings.migrations) &&
    settings.migrations.includes('0009_migrate_branflix_plex_client_id')
  ) {
    return settings;
  }

  // Plex caches the app name per client identifier; rotate so OAuth shows BranFlix.
  settings.clientId = randomUUID();

  if (!Array.isArray(settings.migrations)) {
    settings.migrations = [];
  }
  settings.migrations.push('0009_migrate_branflix_plex_client_id');

  return settings;
};

export default migrateBranflixPlexClientId;
