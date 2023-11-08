import legacy from '@vitejs/plugin-legacy';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
	legacy(),
	react(),
	svgr(),
	tsconfigPaths(),
    ],
    test: {
	globals: true,
	environment: 'jsdom',
	setupFiles: './src/setupTests.ts',
    }
});
