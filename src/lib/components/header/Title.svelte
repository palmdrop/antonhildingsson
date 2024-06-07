<script lang="ts">
  type Props = { 
    hidden?: boolean
  };

  const { 
    hidden = false
  }: Props = $props();
</script>

<a href="/" class="title" class:hidden>
  <span>
    <span class="dot"></span>
    {import.meta.env.VITE_TITLE}
  </span>
</a>

<style>
  .title {
    font-style: italic;
    grid-column: span calc(var(--grid-columns) - 2);
  }

  .title:hover > :not(.dot) {
    background-color: var(--accent);
  }

  a::before, a::after {
    content: none;
  }

  .dot {
    display: none;

    background-color: var(--fg);

    width: 0.7em;
    height: 0.7em;
    margin-right: 0.25em;

    border-radius: 100%;
    transition: 1s box-shadow, 1s text-shadow;

    color: var(--bg);
    box-shadow: 0px 0px 0.1em 0.05em var(--fg);
  }

  @media screen and (min-width: 500px) {
    .dot {
      display: inline-block;
    }
  }

  .hidden {
    visibility: hidden;
  }
</style>