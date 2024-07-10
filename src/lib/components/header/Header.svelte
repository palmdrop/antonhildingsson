<script lang="ts">
	import { page } from "$lib/state/page.svelte";
	import { getShouldHide } from "$lib/state/header.svelte";
  import NavLink from "../links/NavLink.svelte";
  import Title from "./Title.svelte";

  const { 
    highlighted = false,
    flashing = false,
  }: { 
    highlighted?: boolean, 
    flashing?: boolean,
  } = $props();

  // TODO: also determine if we've scrolled far enough! maybe 150px, less on work pages

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

<header 
  class="main-grid"
  class:hidden={getShouldHide()}
>
  <nav 
    class="main-grid full-width" 
    class:highlighted
    class:flashing
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

    transition: 0.5s;
  }

  .hidden {
    transform: translateY(-100%);
  }

  @media screen and (min-width: 500px) {
    .hidden {
      transform: none;
    }
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

  .highlighted:active {
    filter: none;
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

  .flashing {
    opacity: 1;
    animation: pulse-opacity 1000ms ease-in infinite alternate;
  }
</style>
