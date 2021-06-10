import { GET_REVENUE_BY_MONTH } from '../actions/action-names';

const DEFAULT_STATE = {
  revenueByMonth: [],
};

const DashboardReducer4 = function (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case GET_REVENUE_BY_MONTH:
      return {
        revenueByMonth: action.payload.data,
      };
    default:
      return state;
  }
};

export default DashboardReducer4;
