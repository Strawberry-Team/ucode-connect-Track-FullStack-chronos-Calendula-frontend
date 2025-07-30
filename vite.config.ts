import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import {defineConfig, loadEnv} from "vite"

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '')
    
    return {
        plugins: [react(), tailwindcss()],
        server: {
            port: 3000,
            strictPort: true,
        },
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src"),
            },
        },
        define: {
            __APP_ENV__: JSON.stringify(env.VITE_NODE_ENV),
        },
    }
})
