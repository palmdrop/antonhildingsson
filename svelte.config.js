import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter(),
    alias: {
      '$types': 'src/types'
    }
	},
  runes: true,
  vitePlugin:{
    dynamicCompileOptions({ filename }){
      if(filename.includes('node_modules')) {
        return { 
          runes: undefined 
        } // or false, check what works
      }
    }
  }
};

export default config;
