import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { run } from 'vite-plugin-run';
import { enhancedImages } from '@sveltejs/enhanced-img'

export default defineConfig({
	plugins: [
    enhancedImages(),
    sveltekit(),
    run([{
      name: 'process',
      run: ['npm', 'run', 'process'],
      pattern: ['src/content/work/**/*.md']
    }])
  ]
});
