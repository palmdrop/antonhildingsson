<script lang="ts">
	import '../styles/reset.css';
	import '../styles/fonts.css';
	import '../styles/global.css';
	import '../styles/markdown.css';

  const { children }: any = $props();
</script>

<svelte:head>
  <link rel="preload" as="font" href="/fonts/degheest/Louise-Regular.woff2" type="font/woff2" crossorigin="anonymous" />
  <link rel="preload" as="font" href="/fonts/baskervville-regular/Baskervville-Regular.woff2" type="font/woff2" crossorigin="anonymous" />
  <link rel="preload" as="font" href="/fonts/baskervville-italic/Baskervville-Italic.woff2" type="font/woff2" crossorigin="anonymous" />
</svelte:head>

<div class="app">
  <div class="loader">
    <span class="loader-text">
      UNDER KONSTRUKTION - ANTON HILDINGSSON
    </span>
  </div>

  { @render children() }
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
    animation: 
      delayed-fade-in 1500ms ease-in forwards,
      pulse-color 1000ms ease-in infinite alternate;
  }
</style>
