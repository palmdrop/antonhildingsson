<script>
	import '../styles/reset.css';
	import '../styles/global.css';

	import Header from "$lib/components/header/Header.svelte";
</script>

<div class="app">
  <Header />

	<main>
		<slot />
	</main>

	<footer>
		<p>what</p>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		width: 100%;
	}
</style>
