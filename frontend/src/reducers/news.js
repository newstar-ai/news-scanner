import { updateObject } from '../utils/utility';

const init = {
  news: null
};

const news = (state = init, action) => {
  switch (action.type) {
    case 'SET_NEWS':
      return updateObject(state, { news: action.payload });
    default:
      return state;
  }
};

export default news;
