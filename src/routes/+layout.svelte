<script lang="ts">
	import '../styles/reset.css';
	import '../styles/fonts.css';
	import '../styles/global.css';
	import '../styles/markdown.css';

  import { setScrollY, isFloating } from '../lib/state/scroll.svelte';
	import { onMount } from 'svelte';
	import { initializeQueryState } from '$lib/state/query.svelte';
	import { initializePageState } from '$lib/state/page.svelte';
	import { scrollToAnchor } from '$lib/utils/url';
	import { afterNavigate, beforeNavigate, onNavigate } from '$app/navigation';
	import { onHydrationComplete } from '$lib/utils/loading';
	import { fade } from 'svelte/transition';
	import { setMinScrollDown } from '$lib/state/header.svelte';

	import Header from "$lib/components/header/Header.svelte";
	import Footer from '$lib/components/footer/Footer.svelte';

  const { children } = $props();

  let loadingInitialPage = $state(true);
  let isNavigating = $state(false);

  const onScrollY = () => {
    setScrollY(window.scrollY);
  }

  onMount(() => {
    loadingInitialPage = document.readyState !== 'complete';

    onScrollY();
    initializeQueryState();
    initializePageState();
    scrollToAnchor();

    onHydrationComplete(() => {
      loadingInitialPage = false;
    });
  });

  onNavigate((navigation) => {
    // Do nothing if the base route is the same
    if(navigation.from?.route.id === navigation.to?.route.id) return;

    if (!document.startViewTransition) return;

    return new Promise((resolve) => {
      document.startViewTransition(async () => {
        resolve();
        await navigation.complete;
      });
    });
  });

  beforeNavigate(navigation => {
    if(navigation.from?.route.id === navigation.to?.route.id) return;
    isNavigating = true;
  });

  afterNavigate(navigation => {
    if(navigation.from?.route.id === navigation.to?.route.id) return;
    window.scrollTo(0, 0);
    isNavigating = false;

    if(navigation.to?.route.id?.includes('texter/')) {
      setMinScrollDown(import.meta.env.VITE_MIN_SCROLL_DOWN_WORK);
    } else {
      setMinScrollDown(import.meta.env.VITE_MIN_SCROLL_DOWN_DEFAULT);
    }
  });
</script>

<svelte:window 
  on:scroll={onScrollY}
/>

<div class="app" class:done={!loadingInitialPage}>
  { #if loadingInitialPage }
    <div class="loader" transition:fade={{ duration: 250 }}>
      <span class="loader-text">
        {import.meta.env.VITE_TITLE}
      </span>
    </div>
  { /if }
  <div class="container main-grid">
    <Header 
      flashing={isNavigating} 
      highlighted={isFloating()} 
    />

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
    text-transform: uppercase;
    opacity: 0;
    animation: 
      delayed-fade-in 1500ms ease-in forwards,
      pulse-color 1000ms ease-in infinite alternate;
  }

  .app.done {
    opacity: 1;
  }

  .container {
    display: flex;
    flex-direction: column;
    min-height: 100%;
    width: 100%;
    --page-width: 100%;
    max-width: var(--page-width);
  }

  @media screen and (min-width: 2000px) {
    .container {
      --page-width: var(--max-page-width);
      max-width: var(--page-width);
    }
  }


	main {
    padding: var(--edge-padding);
    padding-top: var(--top-padding);
	}

  @keyframes goo-in {
    from {
      opacity: 0;
      filter: var(--view-transition-filter);
    }
  }

  @keyframes goo-out {
    to {
      opacity: 0;
      filter: var(--view-transition-filter);
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

  :root::view-transition-old(root) {
    animation: 
      150ms ease-in-out both goo-out, 
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
