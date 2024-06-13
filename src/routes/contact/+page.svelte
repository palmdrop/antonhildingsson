<script lang="ts">
  import Contact from "$content/contact.md";
	import { createTitle } from "$lib/utils/title";
</script>

<svelte:head>
	<title>{createTitle("Kontakt")}</title>
</svelte:head>

<Contact />