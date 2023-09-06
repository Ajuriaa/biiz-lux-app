import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.atlantisdev.biiz',
  appName: 'BIIZ',
  webDir: 'dist/biiz-lux-app',
  plugins: {
    CapacitorCookies: {
      "enabled": true
    }
  }
};

export default config;
