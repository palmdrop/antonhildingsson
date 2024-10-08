<script lang="ts">
	import type { Snippet } from "svelte";
	import { createQueryParameter } from "$lib/state/query.svelte";
	import { getBlurConfig, getSlideConfig } from "$lib/utils/transitions";
	import { blur, slide } from "svelte/transition";

  type State = 'expanded' | 'collapsed';

  const {
    beforeButton,
    afterButton,
    buttonContent,
    queryParamId,
    children,
  }: {
    beforeButton?: string | [string, string]
    afterButton?: string | [string, string],
    buttonContent: string | [string, string],
    initialState?: State,
    queryParamId: string,
    children: Snippet
  } = $props();

  const stateQueryParam = createQueryParameter<State>({
    key: queryParamId,
    toString: value => value === 'expanded' 
      ? 'synlig' 
      : 'osynlig',
    fromString: value => value === 'synlig' 
      ? 'expanded' 
      : 'collapsed'
  });

  const toggle = () => {
    stateQueryParam.value = stateQueryParam.value === 'collapsed' 
      ? 'expanded' 
      : 'collapsed';
  }

  const index = $derived(
    stateQueryParam.value === 'collapsed' ? 0 : 1
  );

  const getContent = (content: string | [string, string] | undefined, contentIndex = 0) => {
    if(!content) return undefined;
    return typeof content === 'string' ? content : content[contentIndex];
  }

  const activeBeforeContent = $derived(getContent(beforeButton, index));
  const activeAfterContent = $derived(getContent(afterButton, index));
  const activeButtonContent = $derived(getContent(buttonContent, index));
</script>

<div>
  <p>
    { activeBeforeContent }
    <button onclick={toggle} class="clickable" id={queryParamId}>
      { activeButtonContent }
    </button>
    { activeAfterContent }
  </p>
  { #if stateQueryParam.value === 'expanded' }
    <div 
      class="content" 
      in:slide={getSlideConfig()}
      out:slide={{
        ...getSlideConfig(),
        delay: 150,
      }}
    >
      <div
        in:blur={getBlurConfig()}
        out:blur={getBlurConfig(300)}
      >
        {@render children()}
      </div>
    </div>
  { /if }
</div>

<style>
  .content {
    padding-top: 0.5em;
  }
</style>