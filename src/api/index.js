import { DEFAULT_URL } from '../constants/urls';

export const searchCharacterApi = (searchQuery) => {
  const searchUrl = `${DEFAULT_URL}?search=${searchQuery}`;
  return fetchCharacterApi(searchUrl);
}

//common api for fetching character data based on the url passed
export const fetchCharacterApi = (url) => {
  const data = fetch(url)
    .then(response => response.json())
    .catch(error => error)
    .then(data => {
      if (data && data.results) {
        // Todo - To display species info extract
        // all unique species from fetched data
        const species = new Set();
        data.results.forEach(character => {
          species.add(...character.species);
        });
        data.allSpecies = species;
        return data;
      } else {
        return null;
      }
    });
  return data;
}
