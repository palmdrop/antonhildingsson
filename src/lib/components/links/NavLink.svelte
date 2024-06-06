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
  { label }
</a>

<style>
  a {
    white-space: nowrap;
    font-style: italic;
  }

  a::before {
    content: "[ ";
  }

  a::after {
    content: " ]";
  }

  a::before, a::after {
    font-style: normal;
  }

  a:hover {
    background-color: var(--accent);
  }
</style>