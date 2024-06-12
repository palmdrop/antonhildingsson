<script lang="ts">
  import type { HTMLAnchorAttributes } from 'svelte/elements';

  const { 
    label,
    ...rest 
  }: {
    label: string
  } & HTMLAnchorAttributes = $props();
</script>

<a  class="clickable" {...rest}>
  { label }
</a>

<style>
  a {
    white-space: nowrap;
  }

</style>