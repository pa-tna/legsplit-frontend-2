import { store } from './store.js';

export const authedFetch = (resource, options) => {
  let url = store.endpoint + '/' + resource;
  let newOptions = {
    mode: 'cors',
    method: 'GET',
  };
  Object.assign(newOptions, options);

  newOptions.headers = {
    Authorization: 'Bearer ' + store.token,
  };
  if (options) {
    Object.assign(newOptions.headers, options.headers);
  }

  return fetch(url, newOptions);
};
