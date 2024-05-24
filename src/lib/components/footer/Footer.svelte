<script lang="ts" >
	import Navbar from '$lib/components/navigation/Navbar.svelte';
</script>

<footer>
  <Navbar />
</footer>

<style>
  footer {
    position: fixed;
    bottom: 0;
    width: 100%;

    padding: var(--edge-padding);

    background-color: var(--bg);
    box-shadow: var(--scroll-shadow);

    grid-column: span var(--grid-columns);
  }
</style>