import { defineConfig } from "vite";

export default defineConfig({
  root: "./",
  base: "/Hangman-Game/",
  publicDir: "public",
  build: {
    outDir: "dist",
    assetsDir: "assets"
  },
  plugins: []
});