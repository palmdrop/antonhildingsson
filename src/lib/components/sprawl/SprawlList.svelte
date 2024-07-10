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
      <Component first={i === 0}/>
    </li>
  { /each }
</ol>

<style>
  ol {
    counter-reset: figure;
    gap: 1em;

    --item-top-padding: calc(var(--edge-padding) + 1.75em);
    margin-top: calc(-1 * var(--item-top-padding));
  }

  li {
    grid-column: span var(--grid-columns);
  }

  @media (min-width: 350px) {
    li {
      grid-column: span calc(var(--grid-columns) / 2);
    }
  }

  @media (min-width: 2500px) {
    li {
      grid-column: span calc(var(--grid-columns) / 3);
    }
  }
</style>