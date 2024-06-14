<script lang="ts">
	import '../styles/reset.css';
	import '../styles/fonts.css';
	import '../styles/global.css';
	import '../styles/markdown.css';

	import Header from "$lib/components/header/Header.svelte";

  import { setScrollY, isFloating } from '../lib/state/scroll.svelte';
	import { onMount } from 'svelte';
	import { initializeQueryState } from '$lib/state/query.svelte';
	import { initializePageState } from '$lib/state/page.svelte';

  const { children } = $props();

  const onScrollY = () => {
    setScrollY(window.scrollY);
  }

  onMount(() => {
    onScrollY();
    initializeQueryState();
    initializePageState();
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
