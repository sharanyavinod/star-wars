import * as Actions from '../constants/actions';
import { DEFAULT_URL } from '../constants/urls';

const initialState = {
  error: '',
  characters: [],
  nextUrl: DEFAULT_URL,
  fetchedCount: 0,
  totalCount: 0,
  isLoading: false,
  searchQuery: ''
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    //Handle error message displayed to user
    case Actions.EMIT_ERROR:
      return Object.assign({}, state, { error: action.payload })
    //Display spinner when fetch is initiated
    case Actions.FETCH_CHARACTERS: {
      return Object.assign({}, state, { isLoading: true })
    }
    /** Display the characters received on fetch
    * 2 scenarios: 1.Initial fetch on page load-Data is fetched with the default url
    * From the returned data,the total count of results available, url to the next set of results\
    * and the current set of results in the response are saved.
    * 2. Once user has scrolled to the bottom,if the no of results fetched is lesser than total count,
    * data is fetched from the url saved earlier. Same flow on search results scroll end.
    */
    case Actions.SET_CHARACTERS: {
      const { count, next, results } = action.payload;
      const { fetchedCount, characters } = state;
      if (fetchedCount < count) {
        const updatedCharacters = [].concat(characters);
        updatedCharacters.push(...results);
        return Object.assign({}, state, {
          nextUrl: next,
          fetchedCount: (fetchedCount + results.length),
          characters: updatedCharacters,
          totalCount: count,
          isLoading: false
        });
      } else {
        return Object.assign({}, state, { isLoading: false })
      }
    }
    /** For search queries, data is retrieved and existing data is
    *  reset to display the new data and save the new parameters.
    */
    case Actions.SET_SEARCH_CHARACTER: {
      const { count, next, results } = action.payload;
      return Object.assign({}, state, {
        nextUrl: next,
        fetchedCount: results.length,
        characters: results,
        totalCount: count,
        isLoading: false
      });
    }
    case Actions.GET_SEARCH_QUERY: {
      const userInput = action.payload;
      return Object.assign({}, state, { searchQuery: userInput })
    }
    default:
      return state
  }
};

export default dataReducer;
