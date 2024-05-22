<script>
	import '../styles/reset.css';
	import '../styles/global.css';

	import Header from "$lib/components/header/Header.svelte";
	import Footer from '$lib/components/footer/Footer.svelte';
</script>

<div class="app">
  <Header />

	<main>
		<slot />
	</main>

  <Footer />
</div>

<style>
	.app {
    position: relative;
		display: flex;
		flex-direction: column;

    height: 100vh;

    overflow-x: hidden;
	}

	main {
		flex: 1;
		width: 100%;

    padding: var(--edge-padding);
    padding-top: var(--top-padding);
    padding-bottom: var(--bottom-padding);
	}
</style>
