import { updateObject } from '../utils/utility';
import Moment from 'moment';

export const searchFilterOptions = ['title', 'author', 'content'];

const init = {
  searchText: '',
  highlightText: '',
  searchFilter: searchFilterOptions,
  startDate: Moment().subtract(5, 'months'),
  endDate: Moment()
};

const search = (state = init, action) => {
  switch (action.type) {
    case 'SET_SEARCH_FILTER':
      return updateObject(state, { searchFilter: action.payload });
    case 'SET_SEARCH_TEXT':
      return updateObject(state, { searchText: action.payload });
    case 'SET_HIGHLIGHT_TEXT':
      return updateObject(state, { highlightText: action.payload });
    case 'SET_START_DATE':
      return updateObject(state, { startDate: action.payload });
    case 'SET_END_DATE':
      return updateObject(state, { endDate: action.payload });
    default:
      return state;
  }
};

export default search;
