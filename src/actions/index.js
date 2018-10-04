import * as Actions from '../constants/actions';

export const throwError = (payload) => ({
  type: Actions.EMIT_ERROR,
  payload
});

export const fetchCharacters = () => ({
  type: Actions.FETCH_CHARACTERS
});

export const setCharacters = (payload) => ({
  type: Actions.SET_CHARACTERS,
  payload
});

export const getSearchQuery = (payload) => ({
  type: Actions.GET_SEARCH_QUERY,
  payload
});

export const searchCharacter = (payload) => ({
  type: Actions.SEARCH_CHARACTER,
  payload
});

export const setSearchCharacter = (payload) => ({
  type: Actions.SET_SEARCH_CHARACTER,
  payload
});
