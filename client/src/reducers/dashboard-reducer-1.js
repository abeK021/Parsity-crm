import { GET_CONVERSION_PERCENTAGE_ALL } from '../actions/action-names';

const DEFAULT_STATE = {
  conversion: [],
};

const DashboardReducer1 = function (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case GET_CONVERSION_PERCENTAGE_ALL:
      return {
        conversion: action.payload.data,
      };
    default:
      return state;
  }
};

export default DashboardReducer1;
