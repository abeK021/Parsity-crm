import { GET_COMPANIES, GET_COMPANIES_ERROR } from '../actions/action-names';

const DEFAULT_STATE = {
  companies: [],
  count: null,
  error: '',
};

const CompaniesReducer = function (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case GET_COMPANIES:
      return {
        companies: action.payload.data.companies,
        count: action.payload.data.totalResultsCount,
        error: '',
      };
    case GET_COMPANIES_ERROR:
      return {
        companies: [],
        count: null,
        error: action.payload.message,
      };
    default:
      return state;
  }
};

export default CompaniesReducer;
