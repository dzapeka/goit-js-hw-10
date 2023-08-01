import axios from 'axios';

const THECAT_API_KEY =
  'live_7nJQSWCEncpz57WxpMzD6eaKOsf0Oy2DyyKgGUAmDh83P8gIgadgKRkO7OlbQFZK';
const THECAT_API_URL = 'https://api.thecatapi.com/v1';

axios.defaults.headers.common['x-api-key'] = THECAT_API_KEY;

function fetchBreeds() {
  return axios
    .get(`${THECAT_API_URL}/breeds`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw error;
    });
}

function fetchCatByBreed(breedId) {
  return axios
    .get(`${THECAT_API_URL}/images/search?breed_ids=${breedId}`)
    .then(response => {
      return response.data[0];
    })
    .catch(error => {
      throw error;
    });
}

export { fetchBreeds, fetchCatByBreed };
