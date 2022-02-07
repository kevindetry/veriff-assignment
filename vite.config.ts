import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import reactPlugin from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: { sourcemap: true, target: "esnext" },
  server: { watch: { ignored: path.resolve("coverage") } },
  plugins: [reactPlugin(), vanillaExtractPlugin()],
});
