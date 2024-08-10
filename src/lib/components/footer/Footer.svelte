<script lang="ts">
  const year = new Date().getFullYear();
</script>

<footer class="full-width" lang="en">
  <p xmlns:cc="http://creativecommons.org/ns#">
    © { year }
    <a 
      rel="cc:attributionURL dct:creator noopener noreferrer"
      property="cc:attributionName"
      href="/om"
      class="neutral-clickable"
    >
      <span class="underlined">
        {import.meta.env.VITE_TITLE}
      </span> 
    </a>.
    Licensed under 
    <a 
      href="https://creativecommons.org/licenses/by-nc-nd/4.0/?ref=chooser-v1" 
      target="_blank" 
      rel="license noopener noreferrer" 
      style="display: inline-block;"
      class="neutral-clickable"
    >
      <span class="underlined">
        CC BY-NC-ND 4.0
      </span>
      <img width="64" height="64" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1" alt="">
      <img width="64" height="64" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1" alt="">
      <img width="64" height="64" src="https://mirrors.creativecommons.org/presskit/icons/nc.svg?ref=chooser-v1" alt="">
      <img width="64" height="64" src="https://mirrors.creativecommons.org/presskit/icons/nd.svg?ref=chooser-v1" alt="">
    </a>
  </p>
</footer>

<style>
  footer {
    padding: min(var(--gap), 12px) var(--edge-padding);

    display: grid;
    justify-content: center;
    gap: 0;

    border-top: var(--border);
    margin-top: auto;

    width: 100%;
  }

  p {
    font-size: max(0.5em, 16px);
    line-height: 1.1em;
  }

  @media screen and (min-resolution: 2dppx) and (max-width: 500px) {
    p {
      font-size: max(0.4em, 12px);
    }
  }

  @media screen and (min-width: 375px) {
    p {
      text-align: center;
    }
  }

  .underlined {
    text-decoration: underline;
  }

  img {
    height: 1em;
    width: auto;

    padding-top: 0.1em;
  }
</style>