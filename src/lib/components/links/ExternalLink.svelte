<script lang="ts">
	import type { Snippet } from 'svelte';
  import type { HTMLAnchorAttributes } from 'svelte/elements';

  const {
    href,
    children,
    ...rest
  }: {
    children: Snippet
  } & HTMLAnchorAttributes = $props();
</script>

<a 
  href={href}
  class="clickable"
  target={!href || href?.startsWith("#") || href?.startsWith("/") ? "" : "_blank"}
  rel="noopener noreferrer"
  {...rest} 
>
  { @render children() }
</a>