import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    // Configure Vite plugins
    plugins: [
        vue(),
    ],

    // Configure the development server settings
    server: {
        port: 8081, // Change the port to 8080
    },

    // Resolve options for module imports
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
})