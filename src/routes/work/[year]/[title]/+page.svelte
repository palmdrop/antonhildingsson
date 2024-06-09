<script lang="ts">
  const { data } = $props();
</script>

{ #await import(`$content/work/${data.year}/${data.title}.md`) } 
  <p>loading...</p>
{ :then { default: Component } }
  <Component alone /> 
{ :catch error }
  <p>
    Error: { error }
  </p>
{/await}