import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [solidPlugin()],
  base: "/GoD-Rune-Picker/",
  build: {
    target: "esnext",
    minify: false,
    polyfillDynamicImport: false,
  },
});
