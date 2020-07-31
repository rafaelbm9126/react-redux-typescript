import { SessionDataLogin } from "components/Login/type";

export const setSession = (storage: SessionDataLogin): boolean => {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("session", JSON.stringify(storage));
    return true;
  }
  return false;
};

export const getSession = (): SessionDataLogin | null => {
  if (typeof localStorage !== "undefined") {
    const storage = localStorage.getItem("session");
    if (typeof storage === "string") {
      return JSON.parse(storage);
    } else {
      return null;
    }
  }
  return null;
};

export const delSession = (): void => {
  if (typeof localStorage !== "undefined") {
    localStorage.removeItem("session");
  }
};
