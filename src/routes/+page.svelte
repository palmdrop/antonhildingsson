<script>
</script>

<svelte:head>
	<title>{import.meta.env.VITE_TITLE}</title>
	<meta name="description" content="Anton Hildingsson's writing and portfolio." />
</svelte:head>

<section>
  { #each { length: 100 } as _, i (i )}
  <p class={i % 2 === 0 ? 'left' : 'right'}>
    mina revben är min hjärna är en råttsvans
  </p>
  { /each }
</section>

<style>
  section {
    animation: ribs 10s ease-in-out infinite;
    animation-direction: alternate;
  }

  .left {
    text-align: left;
  }

  .left::after {
    content: ' /';
  }

  .right {
    text-align: right;
  }

  .right::before {
    content: '/ ';
  }

  @keyframes ribs {
    0% {
      line-height: var(--line-height);
      letter-spacing: calc(8 * var(--letter-spacing));
    }

    50% {
      line-height: 3px;
      letter-spacing: 0.0em;
    }
  }
</style>
