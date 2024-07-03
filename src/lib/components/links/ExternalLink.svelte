<script lang="ts">
  import type { HTMLAnchorAttributes } from 'svelte/elements';

  const {
    children,
    href,
    ...rest
  }: {
    children: any
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