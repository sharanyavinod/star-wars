import {
  takeEvery, call, put, select, fork
} from 'redux-saga/effects';

import {
  setCharacters, throwError, setSearchCharacter
} from '../actions';
import { fetchCharacterApi, searchCharacterApi } from '../api';

import { FETCH_CHARACTERS, SEARCH_CHARACTER } from '../constants/actions';

import { getFetchUrl, getSearchQuery } from './selector';


// Fetch characters using the next url that is saved
//Used for initial load and for lazy loading dataon scoll
function* fetchCharacters() {
  try {
    const fetchUrl = yield select(getFetchUrl);
    const data = yield call(fetchCharacterApi, fetchUrl);
    yield put(setCharacters(data));
  }
  catch (e) {
    //Action for handling errors : can pass custom error msgs as well
    //Todo: display error msg
    yield put(throwError(e));
  }
}


//Fetch characters matching the search query entered on search action by userInput
function* searchCharacter() {
  try {
    const searchQuery = yield select(getSearchQuery);
    const data = yield call(searchCharacterApi, searchQuery);
    yield put(setSearchCharacter(data));
  } catch (e) {
    yield put(throwError(e));
  }
}

export function* watchFetchCharacters() {
  yield takeEvery(FETCH_CHARACTERS, fetchCharacters)
}

export  function* watchSearchCharacter() {
  yield takeEvery(SEARCH_CHARACTER, searchCharacter)
}

export default function* root() {
  yield [
    fork(watchFetchCharacters),
    fork(watchSearchCharacter)
  ]
}
