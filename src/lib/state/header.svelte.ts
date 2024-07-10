import { getScrollY, isScrollingDown } from "./scroll.svelte";

let minScrollDown = $state<number>(import.meta.env.VITE_MIN_SCROLL_DOWN_DEFAULT);

const shouldHide = $derived(isScrollingDown() && getScrollY() > minScrollDown);

const getShouldHide = () => shouldHide;
const setMinScrollDown = (value: number) => minScrollDown = value;

export {
  getShouldHide,
  setMinScrollDown
}