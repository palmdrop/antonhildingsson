<script lang="ts">
  import type { HTMLAnchorAttributes } from 'svelte/elements';

  const { 
    label,
    active,
    ...rest 
  }: {
    label: string,
    active?: boolean
  } & HTMLAnchorAttributes = $props();
</script>

<a  
  class="clickable" 
  class:active
  {...rest}
>
  { label }
</a>

<style>
  a {
    white-space: nowrap;
  }
</style>