import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import { VitePWA } from 'vite-plugin-pwa';

const root = resolve(__dirname, 'src');

// https://vite.dev/config/
export default defineConfig({
	base: './',
	define: {},
	server: {
		open: true,
		host: true,
		port: 5182,
		watch: {
			usePolling: true
		}
	},
	build: {
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes('node_modules/firebase')) {
						return 'firebase'; // Group all firebase modules into a 'firebase' chunk
					}
					if (id.includes('src/hooks')) {
						return 'hooks'; // Group all hooks modules into a 'hooks' chunk
					}
				}
			}
		}
	},
	publicDir: 'public',
	plugins: [
		react(),
		VitePWA({
			registerType: 'autoUpdate',
			manifest: {
				name: "Dude, where's my cash?",
				short_name: 'DWMC',
				description: 'Budget application',
				theme_color: '#8f61a2',
				icons: [
					{
						src: 'pwa-192x192.png',
						sizes: '192x192',
						type: 'image/png'
					},
					{
						src: 'pwa-512x512.png',
						sizes: '512x512',
						type: 'image/png'
					}
				]
			}
		})
	],
	resolve: {
		alias: {
			assets: resolve(root, 'assets'),
			components: resolve(root, 'components'),
			context: resolve(root, 'context'),
			hooks: resolve(root, 'hooks'),
			layouts: resolve(root, 'layouts'),
			pages: resolve(root, 'pages'),
			routes: resolve(root, 'routes'),
			services: resolve(root, 'services'),
			theme: resolve(root, 'theme'),
			types: resolve(root, 'types'),
			utils: resolve(root, 'utils')
		}
	}
});
