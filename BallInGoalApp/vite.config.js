import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path"; // <-- استيراد مكتبة path

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    historyApiFallback: true,
  },
  resolve: {
    alias: {
      path: path.resolve(__dirname, "node_modules/path-browserify"),
    },
  },
  optimizeDeps: {
    include: ["path-browserify"],
  },
});
