import { fetchBreeds, fetchCatByBreed } from './cat-api';

const breedSelect = document.querySelector('.breed-select');
const loaderMsg = document.querySelector('.loader');
const errorMsq = document.querySelector('.error');
const catInfoDiv = document.querySelector('div.cat-info');

breedSelect.addEventListener('change', selectBreedHandler);
breedSelect.hidden = true;

loaderMsg.style.fontWeight = 'bold';

errorMsq.style.color = 'red';
errorMsq.style.fontWeight = 'bold';
errorMsq.hidden = true;

function selectBreedHandler() {
  const breedId = breedSelect.value;

  catInfoDiv.innerHTML = '';
  loaderMsg.hidden = false;

  fetchCatByBreed(breedId)
    .then(breed => {
      const {
        url,
        breeds: [{ name, temperament, description }],
      } = breed;

      const catInfoMarkup = getCatInfoMarkup({
        url,
        name,
        temperament,
        description,
      });

      loaderMsg.hidden = true;

      catInfoDiv.innerHTML = catInfoMarkup;
    })
    .catch(error => {
      catInfoDiv.innerHTML = '';
      breedSelect.hidden = true;
      loaderMsg.hidden = true;
      errorMsq.hidden = false;
    });
}

fetchBreeds()
  .then(breeds => {
    const breedSelectOptionMarkup = breeds
      .map(({ id, name }) => `<option value="${id}">${name}</option>`)
      .join('');
    breedSelect.innerHTML = breedSelectOptionMarkup;
    breedSelect.hidden = false;
    loaderMsg.hidden = true;
  })
  .catch(error => {
    loaderMsg.hidden = true;
    errorMsq.hidden = false;
  });

function getCatInfoMarkup({ url, name, temperament, description }) {
  return `<div class="cat-info-img">
        <img
          src="${url}"
          alt="${name}"
          width="560"
        />
      </div>
      <div class="cat-info-">
        <h1 class="breed-name">${name}</h1>
        <p>${description}</p>
        <p class="breed-temperament">
        <span class="breed-temperament-title">Temperament: </span>${temperament}</p>
      </div>`;
}
