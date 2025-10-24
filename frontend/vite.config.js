import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/split-the-bill-f-/",  // 👈 use your repo name here
});
