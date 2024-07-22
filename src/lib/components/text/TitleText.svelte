<script lang="ts">
  import Title from "../header/Title.svelte";

  const {
    children
  }: { children: any } = $props();
</script>

<div class="full-width">
  <!--
    A small floating element is used to offset the intro paragraph to avoid overlap with navbar
  -->
  <span class="float"></span>
  <p>
    <Title hidden /> 
    {@render children()}
  </p>
</div>

<style>
  p {
    grid-column: span var(--grid-columns);
    max-width: min(90%, var(--paragraph-width));
  }

  .float {
    width: 7.5em;
    height: 2.5em; 
    float: right;

    shape-outside: ellipse(50% 50% at 0% 0%);
  }
</style>