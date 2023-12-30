import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';
import { defineConfig } from 'vite'

// Load environment variables from .env
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
