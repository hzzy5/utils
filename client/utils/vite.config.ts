import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "utils",
        short_name: "utils",
        display: "standalone",
        theme_color: "#ffffff",
        icons: [
          { src: "./src/assets/utilslogo192.png", sizes: "192x192", type: "image/png" },
          { src: "./src/assets/utilslogo512.png", sizes: "512x512", type: "image/png" }
        ]
      }
    })
  ]
});