import { GET_COMPANY, GET_COMPANY_ERROR } from '../actions/action-names';

const DEFAULT_STATE = {
  company: [],
  error: '',
};

const CompanyReducer = function (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case GET_COMPANY:
      return {
        company: action.payload.data,
        error: '',
      };
    case GET_COMPANY_ERROR:
      return {
        company: [],
        error: action.payload.message,
      };
    default:
      return state;
  }
};

export default CompanyReducer;
