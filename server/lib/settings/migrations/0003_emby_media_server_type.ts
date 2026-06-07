import type { AllSettings } from '@server/lib/settings';

// Legacy Jellyfin/Emby media server types (2 = Jellyfin, 3 = Emby) for settings migration only.
const LEGACY_JELLYFIN_MEDIA_SERVER_TYPE = 2;
const LEGACY_EMBY_MEDIA_SERVER_TYPE = 3;

const migrateHostname = (settings: any): AllSettings => {
  const oldMediaServerType = settings.main.mediaServerType;
  if (
    oldMediaServerType === LEGACY_JELLYFIN_MEDIA_SERVER_TYPE &&
    process.env.JELLYFIN_TYPE === 'emby'
  ) {
    settings.main.mediaServerType = LEGACY_EMBY_MEDIA_SERVER_TYPE;
  }

  return settings;
};

export default migrateHostname;
