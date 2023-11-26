import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.atlantisdev.biiz',
  appName: 'BIIZ',
  webDir: 'dist/biiz-lux-app',
  server: {
    androidScheme: 'http',
    url: 'http://192.168.1.13:4200/'
  },
  plugins: {
    CapacitorCookies: {
      "enabled": true
    }
  }
};

export default config;
