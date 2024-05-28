// See https://kit.svelte.dev/docs/types#app

import { SvelteComponent } from "svelte";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
  declare module '*.md' {
    export default SvelteComponent;
  }
}


export {};
