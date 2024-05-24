<script lang="ts">
	import Title from "./Title.svelte";

  let scrollY = $state(0);
</script>

<svelte:window bind:scrollY={scrollY} />

<header>
  <Title highlighted={scrollY > 3} />
</header>

<style>
  header {
    position: fixed;
    width: 100%;
    padding: var(--edge-padding);
  }
</style>
