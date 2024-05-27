let scrollY = $state(0);
let floating = $derived(scrollY > import.meta.env.VITE_SCROLL_Y_THRESHOLD);

const setScrollY = (y: number) => {
  scrollY = y;
}

const getScrollY = () => $state.snapshot(screenY);

const isFloating = () => floating;

export {
  setScrollY,
  getScrollY,
  isFloating
}