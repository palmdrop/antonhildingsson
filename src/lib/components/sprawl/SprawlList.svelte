<script lang="ts">
  const sprawlImport = import.meta.glob("$content/sprawl/*.md", { eager: true });
  export const sprawlList = (Object.values(sprawlImport) as { default: ConstructorOfATypedSvelteComponent }[])
    .map(item => ({ Component: item.default }));

</script>

<ol class="full-width main-grid">
  { #each sprawlList as { Component }, i (`${1}_${i}`) }
    <li>
      <Component />
    </li>
  { /each }
</ol>

<style>
  li {
    grid-column: span var(--grid-columns);
  }

  /*
  @media screen and (min-width: 1000px) {
    li {
      grid-column: span calc(var(--grid-columns) / 2);
    }
  }

  @media screen and (min-width: 1500px) {
    li {
      grid-column: span calc(var(--grid-columns) / 3);
    }
  }
  */
</style>