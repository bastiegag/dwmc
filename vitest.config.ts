import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
	plugins: [react()],
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: './src/test/setup.ts',
		css: true
	},
	resolve: {
		alias: {
			context: path.resolve(__dirname, './src/context'),
			hooks: path.resolve(__dirname, './src/hooks'),
			components: path.resolve(__dirname, './src/components'),
			types: path.resolve(__dirname, './src/types'),
			utils: path.resolve(__dirname, './src/utils')
		}
	}
});
