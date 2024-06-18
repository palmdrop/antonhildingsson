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
	import { scrollToAnchor } from '$lib/utils/url';
	import { onNavigate } from '$app/navigation';
	import Footer from '$lib/components/footer/Footer.svelte';

  const { children } = $props();

  const onScrollY = () => {
    setScrollY(window.scrollY);
  }

  onMount(() => {
    onScrollY();
    initializeQueryState();
    initializePageState();
    scrollToAnchor();

  });

  onNavigate((navigation) => {
    if (
      !document.startViewTransition ||
      // No animation if the base route is the same
      navigation.from?.route.id === navigation.to?.route.id
    ) return;

    return new Promise((resolve) => {
      document.startViewTransition(async () => {
        resolve();
        await navigation.complete;
      });
    });
  })
</script>

<svelte:window 
  on:scroll={onScrollY}
/>

<div class="app">
  <div class="container main-grid">
    <Header highlighted={isFloating()}/>

    <main class="main-grid full-width">
      {@render children()}
    </main>

  </div>
  <Footer />
</div>

<style>
	.app {
		display: flex;
    flex-direction: column;
    position: relative;

    align-items: center;

    min-height: 100vh;
	}

  .container {
    display: flex;
    flex-direction: column;
    min-height: 100%;
    width: 100%;
    max-width: var(--max-page-width);
  }

	main {
    padding: var(--edge-padding);
    padding-top: var(--top-padding);
	}

  @keyframes goo-in {
    from {
      opacity: 0;
      filter: blur(5px) contrast(200%);
    }
  }

  @keyframes goo-out {
    to {
      opacity: 0;
      filter: blur(5px) contrast(200%);
    }
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
  }

  @keyframes fade-out {
    to {
      opacity: 1;
    }
  }

  :root::view-transition-old(root) {
    animation: 
      210ms ease-in-out both goo-out, 
      150ms ease-in-out both fade-out;
  }

  :root::view-transition-new(root) {
    animation: 
      210ms ease-in-out 90ms both goo-in, 
      210ms ease-in-out both fade-in;
  }

  @media (prefers-reduced-motion) {
    ::view-transition-group(*),
    ::view-transition-old(*),
    ::view-transition-new(*) {
      animation: none !important;
    }
  }
</style>
