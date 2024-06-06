import adapter from '@sveltejs/adapter-auto';
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
      layout: {
        work: "./src/lib/components/markdown/layout/WorkLayout.svelte",
        _: "./src/lib/components/markdown/layout/DefaultLayout.svelte"
      }
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
