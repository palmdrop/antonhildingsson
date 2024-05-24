<script lang="ts">
</script>

<header
  class="main-grid"
>
  <a class="dot" href="/">
  </a>
  <h1>
    <a href="/" class="action">
      {import.meta.env.VITE_TITLE}
    </a>
  </h1>
</header>

<style>
  header {
    position: fixed;
    width: 100%;

    background-color: var(--bg);
    box-shadow: var(--scroll-shadow);

    padding: var(--edge-padding);
  }

  .dot {
    background-color: var(--fg);

    width: 2em;
    height: 1em;

    border-radius: 100%;

    color: var(--bg);
  }

  h1 {
    text-align: right;
  }

  header > * {
    grid-column: span calc(var(--grid-columns) / 2);
  }
</style>
