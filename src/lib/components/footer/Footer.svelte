<script lang="ts">
  const year = new Date().getFullYear();
</script>

<footer class="full-width">
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
      <img style="height:1em!important; padding-top: 2px;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1" alt="">
      <img style="height:1em!important; padding-top: 2px;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1" alt="">
      <img style="height:1em!important; padding-top: 2px;" src="https://mirrors.creativecommons.org/presskit/icons/nc.svg?ref=chooser-v1" alt="">
      <img style="height:1em!important; padding-top: 2px;" src="https://mirrors.creativecommons.org/presskit/icons/nd.svg?ref=chooser-v1" alt="">
    </a>
  </p>
</footer>

<style>
  footer {
    padding: min(var(--gap), 12px)  var(--edge-padding);

    display: grid;
    justify-content: center;
    gap: 0;

    border-top: 1px solid var(--fg);
    margin-top: auto;

    width: 100%;
  }

  p {
    font-size: 16px;
    line-height: 1.1em;
  }

  @media screen and (min-resolution: 2dppx) and (max-width: 500px) {
    p {
      font-size: 12px;
      line-height: 1.1em;
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
</style>