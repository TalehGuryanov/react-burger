import {URL} from "../services/constants";

export const apiRequest: (endpoint: string, options?: RequestInit) => Promise<any> = (endpoint, options=undefined) => {
  return fetch(URL + endpoint, options)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error: " + response.statusText);
        }
      })
};