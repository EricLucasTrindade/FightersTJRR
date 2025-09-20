// Configuração de ambiente
export interface AppConfig {
  environment: 'development' | 'production';
  apiUrl: string;
  debug: boolean;
  version: string;
}

const getConfig = (): AppConfig => {
  const env = import.meta.env.VITE_APP_ENV || 'development';
  
  const configs: Record<string, AppConfig> = {
    development: {
      environment: 'development',
      apiUrl: import.meta.env.VITE_APP_API_URL || 'http://localhost:3000',
      debug: import.meta.env.VITE_APP_DEBUG === 'true' || true,
      version: import.meta.env.VITE_APP_VERSION || 'dev',
    },
    production: {
      environment: 'production',
      apiUrl: import.meta.env.VITE_APP_API_URL || 'https://api.fighterstjrr.com',
      debug: import.meta.env.VITE_APP_DEBUG === 'true' || false,
      version: import.meta.env.VITE_APP_VERSION || '1.0.0',
    }
  };

  return configs[env] || configs.development;
};

export const config = getConfig();
