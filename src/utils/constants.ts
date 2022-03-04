export const URL: string = "https://norma.nomoreparties.space/api";

// Set access  token life time in seconds
export const accessTokenLifeTime: number = 1200;

export const apiRequest: (endpoint: string, options: RequestInit | undefined) => Promise<any> = (endpoint, options=undefined) => {
  return fetch(URL + endpoint, options)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error: " + response.statusText);
      }
    })
};
