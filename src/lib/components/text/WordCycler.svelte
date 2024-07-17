<script lang="ts">
  const {
    words,
    interval,
  }: { words: string[], interval: number } = $props();

  const randomIndex = () => Math.floor(Math.random() * words.length);

  let word = $state(words[randomIndex()]);

  $effect(() => {
    const intervalHandle = setInterval(() => {
      word = words[randomIndex()];
    }, interval);

    return () => {
      clearInterval(intervalHandle);
    }
  });
</script>

{ word }