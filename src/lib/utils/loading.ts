export const onHydrationComplete = (callback: () => void) => {
  document.addEventListener('readystatechange', () => {
    if(document.readyState === 'complete') callback();
  });
}