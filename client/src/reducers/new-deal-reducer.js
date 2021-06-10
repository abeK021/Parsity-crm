import { POST_DEAL } from '../actions/action-names';

const DEFAULT_STATE = {
  newDeal: [],
};

const NewDealReducer = function (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case POST_DEAL:
      return {
        newDeal: action.payload.data,
      };
    default:
      return state;
  }
};

export default NewDealReducer;
