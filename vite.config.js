import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "./",
  server: {
    headers: {
      "Cache-Control": "no-store, max-age=0",
    },
  },
  build: {
    outDir: "docs",
  },
  plugins: [react()],
});
