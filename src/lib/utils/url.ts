import { onHydrationComplete } from "./loading";

// Kudos: chat-GPT lol
export const convertToURLFriendly = (value: string) => {
  // Normalize the string to decompose combined characters into base characters
  const normalizedTitle = value.normalize("NFD");
  
  // Replace special characters with their ASCII counterparts
  return normalizedTitle
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .replace(/[^\w\s-]/g, "")        // Remove non-word characters except dash and whitespace
    .replace(/\s+/g, "-")            // Replace whitespace with dash
    .toLowerCase();                  // Convert to lowercase
}


export const scrollToAnchor = () => {
  onHydrationComplete(() => {
    if(!window.location.hash) return;
    
    const target = document.querySelector(window.location.hash) as HTMLElement | null;
    if(!target) return;

    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

export const getWorkUrl = (date: string | Date, fileName?: string) => {
  const year = new Date(date).getFullYear();
  const url = fileName ? `/texter/${year}/${fileName}` : '';
  return url;
}