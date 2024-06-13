<script lang="ts">
  import About from "$content/about.md";
	import { createTitle } from "$lib/utils/title";
</script>

<svelte:head>
	<title>{createTitle("Om")}</title>
</svelte:head>

<About />