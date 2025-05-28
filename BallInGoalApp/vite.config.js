import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    historyApiFallback: {
      disableDotRule: true,
      rewrites: [{ from: /\/.*/, to: "/index.html" }],
    },
  },
  resolve: {
    alias: {
      path: "path-browserify",
    },
  },
  optimizeDeps: {
    include: ["path-browserify"],
  },
});
