import { defineConfig } from "vite";

export default defineConfig({
  base: "/",
  build: {
    cssCodeSplit: true,
    target: "es2019",
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("resultView")) return "result";
          return undefined;
        }
      }
    }
  }
});
