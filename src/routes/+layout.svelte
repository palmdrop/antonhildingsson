<script lang="ts">
	import '../styles/reset.css';
	import '../styles/fonts.css';
	import '../styles/global.css';

	import Header from "$lib/components/header/Header.svelte";
	import Footer from '$lib/components/footer/Footer.svelte';

  import { setScrollY, isFloating } from '../state/scroll.svelte';
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

	<main>
    {@render children()}
	</main>

  <Footer />
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;

    height: 100vh;
	}

	main {
		flex: 1;
		width: 100%;

    padding: var(--edge-padding);
    padding-top: var(--top-padding);
    padding-bottom: var(--bottom-padding);
	}
</style>
