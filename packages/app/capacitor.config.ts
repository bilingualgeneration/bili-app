import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.thebilliapp.app",
  appName: "Bili - Bilingual Learning",
  webDir: "dist",
  server: {
    androidScheme: "https",
  },
  plugins: {
    FirebaseAuthentication: {
      skipNativeAuth: false,
      providers: [],
    },
  },
};

export default config;
