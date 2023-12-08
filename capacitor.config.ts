import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.atlantisdev.biiz',
  appName: 'BIIZ',
  webDir: 'dist/biiz-lux-app',
  server: {
    androidScheme: 'http',
    iosScheme: 'http',
    url: 'http://192.168.1.16:4200/'
  },
  plugins: {
    CapacitorCookies: {
      "enabled": true
    }
  }
};

export default config;
