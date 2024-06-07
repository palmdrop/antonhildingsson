<script lang="ts">
	import '../styles/reset.css';
	import '../styles/fonts.css';
	import '../styles/global.css';
	import '../styles/markdown.css';

	import Header from "$lib/components/header/Header.svelte";

  import { setScrollY, isFloating } from '../lib/state/scroll.svelte';
	import { onMount } from 'svelte';

  const { children } = $props();

  const onScrollY = () => {
    setScrollY(window.scrollY);
  }

  onMount(() => {
    setScrollY(window.scrollY);
  });
</script>

<svelte:window 
  on:scroll={onScrollY}
/>


<div class="app main-grid">
  <Header highlighted={isFloating()}/>

	<main class="main-grid full-width">
    {@render children()}
	</main>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
    height: 100vh;
	}

	main {
    padding: var(--edge-padding);
    padding-top: var(--top-padding);
	}
</style>
