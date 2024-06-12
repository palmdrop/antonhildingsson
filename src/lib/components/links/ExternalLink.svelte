<script lang="ts">
  import type { HTMLAnchorAttributes } from 'svelte/elements';

  const {
    children,
    ...rest
  }: {
    children: any
  } & HTMLAnchorAttributes = $props();
</script>

<a 
  {...rest} 
  class="clickable"
  target="_blank" 
  rel="noopener noreferrer"
>
  { @render children() }
</a>