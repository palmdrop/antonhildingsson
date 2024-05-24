<script lang="ts">
	import '../styles/reset.css';
	import '../styles/fonts.css';
	import '../styles/global.css';

	import Header from "$lib/components/header/Header.svelte";
	import Footer from '$lib/components/footer/Footer.svelte';
	import Title from '$lib/components/header/Title.svelte';

  let { children } = $props();

  let scrollY = $state(0);
</script>

<svelte:window bind:scrollY={scrollY} />

<div class="app main-grid">
  <Header />

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
