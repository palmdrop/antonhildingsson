<script lang="ts">
  import NavLink from "../links/NavLink.svelte";
  import Title from "./Title.svelte";

  const { 
    highlighted = false
  }: { highlighted?: boolean } = $props();
</script>

<header class="main-grid">
  <nav 
    class="main-grid full-width" 
    class:highlighted
  >
    <Title />
    <ul>
      <li>
        <NavLink 
          href="/about" 
          label="om"
        />
      </li>
      <li>
        <NavLink 
          href="/contact" 
          label="kontakt"
        />
      </li>
    </ul>
  </nav>
</header>

<style>
  header {
    position: fixed;
    width: 100%;
    padding: var(--edge-padding);

    z-index: 1;
  }

  nav {
    padding: 0;
    margin: 0;

    transition: 1s box-shadow, 1s text-shadow;
  }

  .highlighted {
    filter: drop-shadow(0px 0px 5px var(--bg));
    text-shadow: 0px 0px 0.15em var(--fg);
  }

  .highlighted:hover {
    filter: none;
  }

  ul {
    display: flex;
    justify-content: flex-end;
    gap: var(--gap);

    grid-column: span 2;
  }
</style>
