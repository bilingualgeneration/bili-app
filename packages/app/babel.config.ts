const config = {
  presets: [
    "@babel/preset-env",
    "@babel/preset-react",
    "@babel/preset-typescript",
  ],
  plugins: [
    [
      "react-intl",
      {
        messagesDir: "./src/translations",
      },
    ],
  ],
};

export default config;
