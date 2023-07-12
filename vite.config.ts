import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [solidPlugin()], 
  assetsInclude:"./public/*.png",
  build: {
    target: "esnext",
    minify: false,
    polyfillDynamicImport: false,
  },
});
