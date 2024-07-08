import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookie = (name: string, value: string, option: any) => {
  return cookies.set(name, value, { ...option });
};

export const getCookie = (name: string): string => {
  return cookies.get(name);
};

export const removeCookie = (name: string, option: any) => {
  console.log(name);
  return cookies.remove(name, option);
};
