<script lang="ts">
	import { createTitle } from "$lib/utils/work";

  const baseUrl = import.meta.env.VITE_BASE_URL;

  const {
    title,
    description = import.meta.env.VITE_DESCRIPTION,
    type = "website",
    image = `${baseUrl}/${import.meta.env.VITE_PREVIEW_IMAGE}`,
    route = "",
    canonical = true
  }: {
    title?: string,
    description?: string,
    type?: string,
    image?: string,
    route?: string,
    canonical?: boolean
  } = $props();

  const fullTitle = createTitle(title);
  const fullUrl = `${baseUrl}/${route}`;

  const metaProperties = [
    // Open Graph
    ["og:title", title ?? fullTitle],
    ["og:description", description],
    ["og:type", type],
    ["og:image", image],
    ["og:url", fullUrl],
    ["og:site_name", import.meta.env.VITE_TITLE],
    ["og:locale", import.meta.env.VITE_LOCALE],
    ["og:email", import.meta.env.VITE_EMAIL],
    // Twitter / X
    // ["twitter:site", `@${import.meta.env.VITE_SHORT_TITLE}`],
    ["twitter:title", title ?? fullTitle],
    ["twitter:description", description],
    ["twitter:url", fullUrl],
    ["twitter:domain", baseUrl],
    ["twitter:image", image],
    ["twitter:card", "summary_large_image"],
  ];
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta 
    name="description" 
    content={description}
  />
  { #if canonical }
    <link rel="canonical" href={fullUrl}>
  { /if }

  { #each metaProperties as [property, content] }
    <meta {property} {content} /> 
  {/each}
</svelte:head>