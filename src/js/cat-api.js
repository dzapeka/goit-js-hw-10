import axios from 'axios';

const THECAT_API_KEY =
  'live_7nJQSWCEncpz57WxpMzD6eaKOsf0Oy2DyyKgGUAmDh83P8gIgadgKRkO7OlbQFZK';
const BASE_URL = 'https://api.thecatapi.com/v1';

axios.defaults.headers.common['x-api-key'] = THECAT_API_KEY;

function fetchBreeds() {
  return axios.get(`${BASE_URL}/breeds`).then(response => {
    return response.data;
  });
}

function fetchCatByBreed(breedId) {
  return axios
    .get(`${BASE_URL}/images/search`, {
      params: {
        breed_ids: breedId,
      },
    })
    .then(response => {
      return response.data[0];
    });
}

export { fetchBreeds, fetchCatByBreed };
