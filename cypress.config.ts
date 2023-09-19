import { defineConfig } from "cypress";

import { plugins } from "cypress-social-logins";

const googleSocialLogin = plugins.GoogleSocialLogin;

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        GoogleSocialLogin: googleSocialLogin,
      });
    },
    baseUrl: "http://localhost:3000",
    supportFile: false,
  },
});
