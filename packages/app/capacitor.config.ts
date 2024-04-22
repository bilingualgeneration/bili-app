import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.thebiliapp.app",
  appName: "bili",
  webDir: "dist",
  server: {
    androidScheme: "https",
  },
};

export default config;
