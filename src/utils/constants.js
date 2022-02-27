export const URL = "https://norma.nomoreparties.space/api";

// Set access  token life time in seconds
export const accessTokenLifeTime = 1200;

export const apiRequest = (endpoint, options=null) => {
  return fetch(URL + endpoint, options)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error: " + response.statusText);
      }
    })
};
