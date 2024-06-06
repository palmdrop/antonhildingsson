<script lang="ts">
  import Title from "../header/Title.svelte";

  const {
    children
  }: { children: any } = $props();
</script>

<p>
  <!--
    A small floating element is used to offset the intro paragraph to avoid overlap with navbar
  -->
  <span class="float"></span>
  <Title hidden /> 
  <span>
    {@render children()}
  </span>
</p>

<style>
  p {
    grid-column: span calc(2 * var(--grid-columns) / 3);
    padding-bottom: 1em;
  }

  .float {
    top: 0;
    height: 1em;
    width: 1.5em;
    float: right;
  }

  @media screen and (min-width: 400px) {
    .float {
      display: none;
    }
  }
</style>