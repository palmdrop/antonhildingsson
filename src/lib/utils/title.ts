export const createTitle = (value?: string) => {
  if(!value) return import.meta.env.VITE_TITLE;
  return `${value} | ${import.meta.env.VITE_TITLE}`;
}