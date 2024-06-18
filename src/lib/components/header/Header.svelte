<script lang="ts">
	import { page } from "$lib/state/page.svelte";
  import NavLink from "../links/NavLink.svelte";
  import Title from "./Title.svelte";

  const { 
    highlighted = false
  }: { highlighted?: boolean } = $props();

  const links: {
    href: string,
    label: string
  }[] = [
    {
      href: "/work" ,
      label: "texter"
    },
    {      
      href: "/about",
      label: "om"
    }
  ];
</script>

<header class="main-grid">
  <nav 
    class="main-grid full-width" 
    class:highlighted
  >
    <Title />
    <ul>
      { #each links as link (link.href)}
        <li >
          <NavLink 
            href={link.href}
            label={link.label}
            active={page.isOnRootPage(link.href)}
          />
        </li>
      {/each}
    </ul>
  </nav>
</header>

<style>
  header {
    position: fixed;
    width: 100%;
    max-width: var(--max-page-width);
    padding: var(--edge-padding);

    z-index: 1;
  }

  nav {
    padding: 0;
    margin: 0;

    transition: 1s box-shadow, 1s text-shadow;
  }

  .highlighted {
    filter: drop-shadow(0px 0px 0.15em var(--bg));
    text-shadow: var(--text-shadow);
  }

  @media (hover: hover) and (pointer: fine) {
    .highlighted:hover {
      filter: none;
    }
  }

  li {
    margin-right: 0.5em;
  }

  li:last-child {
    margin-right: 0em;
  }

  ul {
    display: flex;
    justify-content: flex-end;

    grid-column: span 2;
  }
</style>
