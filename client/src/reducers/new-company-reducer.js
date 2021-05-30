import { POST_COMPANY, RESET_NEW_COMPANY } from "../actions";

const DEFAULT_STATE = {
  isSuccessful: false,
  newCompany: {}
};

const NewCompanyReducer = function(state = DEFAULT_STATE, action) {
  switch (action.type) {
      case POST_COMPANY:
        return {
          isSuccessful: true,
          newCompanyId: action.payload.data._id,
        }
      case RESET_NEW_COMPANY:
        return DEFAULT_STATE;
    default:
      return state;
  };
};

export default NewCompanyReducer;