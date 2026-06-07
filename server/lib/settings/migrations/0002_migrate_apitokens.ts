import type { AllSettings } from '@server/lib/settings';

const migrateApiTokens = async (settings: any): Promise<AllSettings> => {
  return settings;
};

export default migrateApiTokens;
