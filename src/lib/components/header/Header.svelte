<script lang="ts">
</script>

<header>
  <h1>
    <a href="/">
      {import.meta.env.VITE_TITLE}
    </a>
  </h1>
  <nav>
    <ul>
      <li>
        <a href="/about">
          about
        </a>
      </li>
    </ul>
  </nav>
</header>

<style>
  header {
    display: flex;
    align-items: center;
    padding: 1em;
  }

  nav  {
    position: relative;

    margin-left: 2em;

    --border-color: rgba(50, 50, 50, 0.643);
  }

  ul {
    display: flex;
  }

  li {
    padding: 0.5em;
    text-align: center;
    font-size: 1em;
  }
</style>
