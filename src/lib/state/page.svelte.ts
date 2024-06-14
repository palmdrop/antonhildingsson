import { afterNavigate } from "$app/navigation";

let pathname = $state<string>("/");

export const initializePageState = () => {
  const set = () => {
    pathname = window.location.pathname;
  }

  set();

  window.addEventListener('popstate', set);
  afterNavigate(set);
}

export const page = {
  get value() {
    return pathname;
  },
  isOnPage: (path: string) => {
    const onPage = $derived(pathname.startsWith(`${path}`));
    return onPage;
  },
  isOnRootPage: (path: string) => {
    const onRootPage = $derived(pathname === `${path}`);
    return onRootPage;
  }
}