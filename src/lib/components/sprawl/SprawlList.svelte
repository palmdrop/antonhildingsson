<script lang="ts">
  const sprawlImport = import.meta.glob("$content/sprawl/**/*.md", { eager: true });
  export const sprawlList = (
    Object.values(sprawlImport) as { default: ConstructorOfATypedSvelteComponent, metadata: any }[]
  )
    .map(item => ({ Component: item.default, metadata: item.metadata }))
    // TODO: random order?
    .sort((item1, item2) => {
      return new Date(item2.metadata.date).getTime() - new Date(item1.metadata.date).getTime();
    });

</script>

<ol class="full-width main-grid">
  { #each sprawlList as { Component }, i (`${1}_${i}`) }
    <li>
      <Component />
    </li>
  { /each }
</ol>

<style>
  ol {
    counter-reset: figure;
  }

  li {
    grid-column: span var(--grid-columns);
  }
</style>