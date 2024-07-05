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
  {@render children()}
</p>

<style>
  p {
    grid-column: span var(--grid-columns);
    max-width: min(80%, var(--paragraph-width));
  }

  .float {
    width: 6em;
    height: 2.5em; 
    float: right;

    shape-outside: ellipse(50% 50% at 100% 0%);
  }
</style>