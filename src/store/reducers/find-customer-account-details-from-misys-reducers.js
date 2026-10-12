import * as actions from "../action_types";

const initialState = {
  data: {},
  isLoading: null,
  isSuccess: null,
  isFail: null,
  errorMessage: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.FIND_CUSTOMER_ACCOUNT_DETAILS_FROM_MYSIS_INIT:
      return { ...state, isLoading: true };
    case actions.FIND_CUSTOMER_ACCOUNT_DETAILS_FROM_MYSIS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.response,
        isSuccess: true,
        isFail: false,
      };
    case actions.FIND_CUSTOMER_ACCOUNT_DETAILS_FROM_MYSIS_FAIL:
      return {
        ...state,
        isLoading: false,
        data: action.response,
        isSuccess: false,
        isFail: true,
        errorMessage: action.response,
      };
    default:
      return state;
  }
};

export default reducer;
