import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://movie-library-roan-three.vercel.app/", // Change to your actual development server URL
  },
});
