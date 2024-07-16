let scrollY = $state(0);
let lastScrollUp = $state(0);

const floating = $derived(scrollY > import.meta.env.VITE_SCROLL_Y_THRESHOLD);
const scrollingDown = $derived(
  lastScrollUp <= scrollY &&
  (scrollY - lastScrollUp) >= import.meta.env.VITE_SCROLLING_DOWN_THRESHOLD
);

const setScrollY = (y: number) => {
  if(y < scrollY) lastScrollUp = y;
  scrollY = y;
}

const getScrollY = () => {
  return scrollY;
}

const isScrollingDown = () => {
  return scrollingDown;
}

const isFloating = () => {
  return floating;
}

export {
  setScrollY,
  getScrollY,
  isScrollingDown,
  isFloating
}