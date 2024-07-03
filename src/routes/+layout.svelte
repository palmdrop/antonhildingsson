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
	import { onHydrationComplete } from '$lib/utils/loading';
	import { fade } from 'svelte/transition';

  const { children } = $props();

  let loading = $state(true);

  const onScrollY = () => {
    setScrollY(window.scrollY);
  }

  onMount(() => {
    loading = document.readyState !== 'complete';

    onScrollY();
    initializeQueryState();
    initializePageState();
    scrollToAnchor();

    onHydrationComplete(() => {
      loading = false;
    });
  });

  onNavigate((navigation) => {
    // Do nothing if the base route is the same
    if(navigation.from?.route.id === navigation.to?.route.id) return;
    window.scrollTo(0, 0);

    if (!document.startViewTransition) return;

    return new Promise((resolve) => {
      document.startViewTransition(async () => {
        resolve();
        await navigation.complete;
      });
    });
  });
</script>

<svelte:window 
  on:scroll={onScrollY}
/>

<div class="app" class:done={!loading}>
  { #if loading }
    <div class="loader" transition:fade={{ duration: 250 }}>
      <span class="loader-text">
        ANTON HILDINGSSON
      </span>
    </div>
  { /if }
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

  .loader {
    position: fixed;
    top: 0;
    left: 0;

    width: 100vw;
    height: 100vh;

    z-index: 3;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: var(--bg);
    color: var(--fg);
  }

  .loader-text {
    font-family: serif;
    font-style: italic;
    opacity: 0;
    animation: 
      delayed-fade-in 1500ms ease-in forwards,
      pulse 1000ms ease-in infinite alternate;
  }

  .app.done {
    opacity: 1;
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

  @keyframes delayed-fade-in {
    0% {
      opacity: 0;
    }

    95% {
      opacity: 0;
    }

    100% {
      opacity: 1
    }
  }

  @keyframes pulse {
    from {
      color: var(--fg);
    }

    to {
      color: var(--bg);
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
