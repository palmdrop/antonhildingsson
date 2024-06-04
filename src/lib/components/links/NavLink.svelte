<script lang="ts">
  import type { HTMLAnchorAttributes } from 'svelte/elements';
  const { 
    label,
    ...rest 
  }: {
    label: string
  } & HTMLAnchorAttributes = $props();
</script>

<a {...rest}>
  <span>{ label }</span>
</a>

<style>
  a > span {
    font-style: italic;
  }

  a::before {
    content: "[ ";
  }

  a::after {
    content: " ]";
  }

  a:hover {
    background-color: yellow;
  }

  a:hover > span {
  }
</style>