<script lang="ts">
  import Title from "./Title.svelte";

  const { 
    highlighted = false
  }: { highlighted?: boolean } = $props();
</script>

<header>
  <Title highlighted={highlighted} />
</header>

<style>
  header {
    position: fixed;
    width: 100%;
    padding: var(--edge-padding);
  }
</style>
