<script lang="ts">
  type Props = { 
    highlighted?: boolean, 
    hidden?: boolean
  };

  const { 
    highlighted = false,
    hidden = false
  }: Props = $props();
</script>

<a href="/" class="title action" class:highlighted class:hidden>
  <span class="dot"></span>
  {import.meta.env.VITE_TITLE}
</a>

<style>
  .title {
    font-style: italic;
  }

  a {
    margin-top: var(--edge-padding);
    transition: 1s box-shadow, 1s text-shadow;
  }

  .highlighted {
    filter: drop-shadow(0px 0px 5px var(--bg));

    /*
    --fg: green;
    */

    text-shadow: 0px 0px 0.15em var(--fg);

    color: var(--fg);

    /*
    background-color: yellow;
    */
  }

  .dot {
    display: inline-block;

    background-color: var(--fg);

    width: 0.7em;
    height: 0.7em;
    margin-right: 0.25em;

    border-radius: 100%;
    transition: 1s box-shadow, 1s text-shadow;

    color: var(--bg);
    box-shadow: 0px 0px 0.1em 0.05em var(--fg);
  }

  .highlighted .dot {
    box-shadow: 0px 0px 0.15em 0.1em var(--fg);
  }

  .hidden {
    visibility: hidden;
  }
</style>