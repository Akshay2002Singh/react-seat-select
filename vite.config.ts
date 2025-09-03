import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import dts from "vite-plugin-dts";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true, // generates "types" entrypoint in package.json
      outDir: "dist/types",
    }),
    cssInjectedByJsPlugin(), // ✅ this makes CSS auto-applied
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "ReactSeatSelect",
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format === "es" ? "esm" : format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
