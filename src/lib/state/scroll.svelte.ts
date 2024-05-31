let scrollY = $state(0);
const floating = $derived(scrollY > import.meta.env.VITE_SCROLL_Y_THRESHOLD);

const setScrollY = (y: number) => {
  scrollY = y;
}

const getScrollY = () => {
  return scrollY;
}

const isFloating = () => {
  return floating;
}

export {
  setScrollY,
  getScrollY,
  isFloating
}