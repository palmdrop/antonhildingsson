<script lang="ts">
  import About from "$content/about.md";
  import HeadMeta from "$lib/components/util/HeadMeta.svelte";
</script>

<HeadMeta 
  title="Om"
  description={`Information om ${import.meta.env.VITE_TITLE}, hans skrivande, och CV.`}
  route="om"
/>

<About />