import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { run } from 'vite-plugin-run';

export default defineConfig({
	plugins: [
    sveltekit(),
    run([{
      name: 'process',
      run: ['npm', 'run', 'process'],
      pattern: ['src/content/work/**/*.md']
    }])
  ]
});
