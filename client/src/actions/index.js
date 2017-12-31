import axios from 'axios';

const ROOT_URL = 'http://localhost:3001';

export const FETCH_ITEMS = 'FETCH_ITEMS';

export function fetchItems() {
  const url = `${ROOT_URL}/items/`;
  const request = axios.get(url);

  return {
    type: FETCH_ITEMS,
    payload: request,
  };
}
