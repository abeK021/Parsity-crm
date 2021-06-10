import { GET_CONVERSIONS_BY_STAGE } from '../actions/action-names';

const DEFAULT_STATE = {
  deals: [],
};

const DashboardReducer3 = function (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case GET_CONVERSIONS_BY_STAGE:
      return {
        deals: action.payload.data,
      };
    default:
      return state;
  }
};

export default DashboardReducer3;
