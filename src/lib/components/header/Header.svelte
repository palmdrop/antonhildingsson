<script lang="ts">
</script>

<header>
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

    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: var(--edge-padding);

    background-color: var(--bg);
    box-shadow: var(--scroll-shadow);
  }

  .dot {
    background-color: var(--fg);

    width: 2em;
    height: 1em;

    border-radius: 100%;

    color: var(--bg);
  }
</style>
