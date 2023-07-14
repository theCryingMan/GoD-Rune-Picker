import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [solidPlugin({ solid: { delegateEvents: false } })],
  base: "/GoD-Rune-Picker/",
  build: {
    target: "esnext",
    minify: false,
    polyfillDynamicImport: false,
  },
});
