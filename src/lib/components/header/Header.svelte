<script lang="ts">
  import Title from "./Title.svelte";

  const { 
    highlighted = false
  }: { highlighted?: boolean } = $props();
</script>

<header class="main-grid">
  <nav class="main-grid" class:highlighted>
    <Title />
    <ul>
      <li>
        <a href="/contact">
          contact
        </a>
      </li>
      <!--
      <li>
        <a href="/about" class="side">
          about
        </a>
      </li>
      -->
    </ul>
  </nav>
</header>

<style>
  header {
    position: fixed;
    width: 100%;
    padding: var(--edge-padding);
  }

  nav {
    grid-column: span var(--grid-columns);
    padding: 0;
    margin: 0;

    transition: 1s box-shadow, 1s text-shadow;
  }

  .highlighted {
    filter: drop-shadow(0px 0px 5px var(--bg));

    text-shadow: 0px 0px 0.15em var(--fg);

    /*
    background-color: yellow;
    */
  }


  ul {
    text-align: right;
  }
</style>
