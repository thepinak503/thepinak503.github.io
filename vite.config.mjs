import { defineConfig } from 'vite'

// GitHub Pages base: /<repo>/ when not using a custom domain
const base = '/thepinak503.github.io/';

export default defineConfig({
	base,
	build: {
		rollupOptions: {
			input: {
				index: 'index.html',
				about: 'about.html',
				projects: 'projects.html',
				contact: 'contact.html',
			},
		},
	},
	server: {
		open: 'index.html'
	}
})
