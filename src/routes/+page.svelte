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
<section class="highlight">
  <p>
    sörpla och sleva och sorla
  </p>
  <p>
    jag hör inte vad du säger under vatten
  </p>
  <p>
    fast jag kan ändå formens ord
  </p>
</section>

<style>
  section {
  }

  .left {
    text-align: left;
  }

  .right {
    text-align: right;
  }

  .highlight {
    position: fixed;
    top: 50%;
    left: 50%;
    padding: 2em;

    width: 35ch;
    max-width: 90vw;

    transform: translate(-50%, -50%);

    background-color: var(--bg);
    color: var(--fg);

    line-height: 2em;
    white-space: nowrap;

    font-style: italic;
  }
</style>
