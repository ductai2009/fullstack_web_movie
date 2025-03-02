import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    build: {
        outDir: 'dist', // Đảm bảo thư mục đầu ra là `dist`
    },
    proxy: {
        '/api': {
            target: 'http://localhost:5001',
        },
    },

    base: '/',
    css: {
        modules: {
            generateScopedName: '[name]_[local]', // Tên file + Tên class
        },
    },
});
