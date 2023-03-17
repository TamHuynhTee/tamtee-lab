import { LOCAL_STORAGE_KEYS } from './keys';

export const getFromLocalStorage = (key: string) => {
  const data = localStorage.getItem(key);
  if (!data) return null;
  return JSON.parse(data);
};

export const saveToLocalStorage = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};
