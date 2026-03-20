<script lang="ts">
  import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

  export let src: string; 
  export let scale: number = 1;
  export let addBorder = false;

  let container: HTMLDivElement;

  let loading = true;

  onMount(async () => {
    const pdfjsLib = await import('pdfjs-dist');
    const worker = await import('pdfjs-dist/build/pdf.worker?url');
    pdfjsLib.GlobalWorkerOptions.workerSrc = worker.default;

    const pdf = await pdfjsLib.getDocument(src).promise;

    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
      const page = await pdf.getPage(pageNumber);

      const viewport = page.getViewport({ scale });

      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      if(addBorder) {
        canvas.style.border = 'var(--border)'
      }

      container.appendChild(canvas);

      await page.render({
        canvas,
        canvasContext: context ?? undefined,
        viewport
      }).promise;
    }

    loading = false;
  });
</script>

<div class="container">
  { #if loading }
    <p class="loader" transition:fade={{ duration: 250 }}>
      Laddar in...
    </p>
  {/if}
  <div 
    bind:this={container} 
    class="pdf-container"
    class:loading={loading}
  >
  </div>
</div>

<style>
  .container {
    position: relative;
  }

  .loader {
    width: 100%;
    top: 1.1em;
    position: absolute;

    text-align: center;

    font-family: var(--font-accent);
  }

  .pdf-container {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    padding: 0.75em;
    padding-top: 0.5em;

    min-height: 100vh;

    opacity: 1;
    transition: 0.5s;
  }

  .loading {
    opacity: 0;
  }
</style>