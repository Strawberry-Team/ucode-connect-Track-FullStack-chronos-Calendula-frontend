// Environment utilities
export const env = {
  // API Configuration
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
  FRONTEND_URL: import.meta.env.VITE_FRONTEND_URL,
  
  // Application Configuration
  APP_NAME: import.meta.env.VITE_APP_NAME,
  APP_VERSION: import.meta.env.VITE_APP_VERSION,
  NODE_ENV: import.meta.env.VITE_NODE_ENV,
  
  // Helper methods
  isDevelopment: () => import.meta.env.DEV || import.meta.env.VITE_NODE_ENV === 'development',
  isProduction: () => import.meta.env.PROD || import.meta.env.VITE_NODE_ENV === 'production',
}