import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
    vitePreprocess(),
    mdsvex({
			extensions: [
				'.md',
				'.svelte.md',
			],
			smartypants: true,
		})
  ],
  extensions: [
		'.svelte',
		'.svelte.md',
		'.md'
	],
	kit: {
		adapter: adapter(),
    alias: {
      '$types': 'src/types',
      '$content': 'src/content'
    }
	},
  vitePlugin:{
    dynamicCompileOptions({ filename }){
      if(filename.includes('node_modules')) {
        return { 
          runes: undefined 
        } // or false, check what works
      } else {
        return true;
      }
    }
  }
};

export default config;
