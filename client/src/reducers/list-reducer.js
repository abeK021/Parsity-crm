import { GET_COMPANIES_LIST } from '../actions/action-names';

const DEFAULT_STATE = [];

const ListReducer = function (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case GET_COMPANIES_LIST:
      return action.payload.data;
    default:
      return state;
  }
};

export default ListReducer;
