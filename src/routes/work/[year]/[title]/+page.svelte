<script lang="ts">
  const { data } = $props();
</script>

<div class="main-grid full-width">
  { #await import(`$content/work/${data.year}/${data.title}.md`) } 
    <p>loading...</p>
  { :then { default: Component } }
    <Component alone /> 
  { :catch error }
    <p>
      Error: { error }
    </p>
  {/await}
</div>

<style>
  div {
    padding-top: 2em;
  }
</style>