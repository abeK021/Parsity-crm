import { GET_DEALS, GET_DEALS_ERROR } from '../actions/action-names';

const DEFAULT_STATE = {
  deals: [],
  error: '',
};

const DealsReducer = function (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case GET_DEALS:
      return {
        deals: action.payload.data,
        error: '',
      };
    case GET_DEALS_ERROR:
      return {
        deals: [],
        error: action.payload.message,
      };
    default:
      return state;
  }
};

export default DealsReducer;
