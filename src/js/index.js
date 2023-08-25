import { fetchBreeds, fetchCatByBreed } from './cat-api';

const breedSelect = document.querySelector('.breed-select');
const loaderMsg = document.querySelector('.loader');
const errorMsq = document.querySelector('.error');
const catInfoDiv = document.querySelector('div.cat-info');

const showLoadingMsg = () => loaderMsg.classList.remove('visually-hidden');
const hideLoadingMsg = () => loaderMsg.classList.add('visually-hidden');

const showErrorMsg = () => errorMsq.classList.remove('visually-hidden');
const hideErrorMsg = () => errorMsq.classList.add('visually-hidden');

const selectBreedHandler = () => {
  const breedId = breedSelect.value;

  catInfoDiv.innerHTML = '';

  hideErrorMsg();
  showLoadingMsg();

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

      hideLoadingMsg();

      catInfoDiv.innerHTML = catInfoMarkup;
    })
    .catch(error => {
      handleFetchError();
    });
};

const handleFetchError = () => {
  catInfoDiv.innerHTML = '';
  hideLoadingMsg();
  showErrorMsg();
};

const getCatInfoMarkup = ({ url, name, temperament, description }) => {
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
};

breedSelect.addEventListener('change', selectBreedHandler);

loaderMsg.style.fontWeight = 'bold';

errorMsq.style.color = 'red';
errorMsq.style.fontWeight = 'bold';

showLoadingMsg();

fetchBreeds()
  .then(breeds => {
    const breedSelectOptionMarkup = breeds
      .map(({ id, name }) => `<option value="${id}">${name}</option>`)
      .join('');
    breedSelect.innerHTML = breedSelectOptionMarkup;
    hideLoadingMsg();
    breedSelect.classList.remove('visually-hidden');
  })
  .catch(error => {
    handleFetchError();
  });
