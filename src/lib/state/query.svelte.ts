import { afterNavigate, goto } from "$app/navigation";
import type { Tag } from "$lib/types/work";
import { TAGS_QUERY_PARAMETER } from "../../constants";

let search = $state<URLSearchParams>();

export const initializeQueryState = () => {
  const set = () => {
    search = new URLSearchParams(window.location.search);
  }

  set();

  window.addEventListener('popstate', set);

  afterNavigate(set);
}

export const setQuery = (key: string, value: string | undefined) => {
  search = new URLSearchParams(window.location.search);
  if(!value) {
    search.delete(key);
  } else {
    search.set(key, value);
  }
  goto(`?${search.toString()}`);
}

export const getQuery = (key: string) => {
  if(!search) return undefined;

  const query = $derived(search.get(key));
  return query;
}

export const createQueryParameter = <T>({
  key,
  initialValue = undefined,
  toString = value => "" + value,
  fromString = value => value ? JSON.parse(value) : undefined
}: {
  key: string,
  initialValue?: T | undefined,
  toString?: (value: T) => string   
  fromString?: (value?: string) => T
}): { value: T } => {
  const parameter = $derived.by(() => {
    const value = search?.get(key);
    return value ? value : undefined;
  });

  if(initialValue) {
    setQuery(
      key, 
      toString 
        ? toString(initialValue) 
        : initialValue + ""
    );
  }

  return {
    get value() { 
      return (
        fromString 
          ? fromString(parameter) 
          : parameter
      ) as T;
    },
    set value(value: T) {
      setQuery(
        key, 
        (toString 
          ? toString(value) 
          : value
        ) as string
      );
    }
  }
}

export const tagsQuery = createQueryParameter<Tag[]>({
  key: TAGS_QUERY_PARAMETER,
  toString: (tags: Tag[]) => tags.join(','),
  fromString: (value?: string) => {
    if(!value) return [];
    return value.split(',') as Tag[];
  }
});