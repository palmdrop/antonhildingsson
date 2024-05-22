<script lang="ts">
</script>

<header>
  <h1>
    <a href="/">
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
    justify-content: flex-end;

    padding: var(--edge-padding);

    background-color: var(--bg);
    box-shadow: var(--scroll-shadow);
  }
</style>
