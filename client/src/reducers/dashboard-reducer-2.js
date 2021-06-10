import { GET_COMPANIES_BY_REVENUE } from '../actions/action-names';

const DEFAULT_STATE = {
  companies: [],
};

const DashboardReducer2 = function (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case GET_COMPANIES_BY_REVENUE:
      return {
        companies: action.payload.data,
      };
    default:
      return state;
  }
};

export default DashboardReducer2;
