import * as actions from "../action_types";

const initialState = {
  Loading: false,
  ApprovalsCount: 0,
  Approvals: null,
  viewApprovalHistory: null,
  Message: "",
  isSuccess: false,
  isFail: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_APPROVALS_COUNT_INIT:
      return { ...state, Loading: action.response };
    case actions.GET_APPROVALS_COUNT_SUCCESS:
      const { Loading, Count } = action.response;
      return { ...state, Loading: Loading, ApprovalsCount: Count };
    case actions.GET_APPROVALS_COUNT_FAIL:
      console.log(action.response)
      // changes 
      return { ...state, Loading: false,
        Message:action.response};

    case actions.GET_APPROVALS_INIT:
      return { ...state, Loading: action.response };
    case actions.GET_APPROVALS_SUCCESS:
      const { Load, Approvals } = action.response;
      return { ...state, Loading: Load, Approvals: Approvals };
    case actions.GET_APPROVALS_FAIL:
      return { ...state, Loading: action.response };

    case actions.SAVE_APPROVALS_INIT:
      return { ...state, Loading: true };
    case actions.SAVE_APPROVALS_SUCCESS:
      return {
        ...state,
        Loading: false,
        Message: action.message,
        isSuccess: true,
        isFail: false,
      };
    case actions.SAVE_APPROVALS_FAIL:
      return {
        ...state,
        Loading: false,
        Message: action.message,
        isSuccess: false,
        isFail: true,
      };

    case actions.VIEW_APPROVAL_HISTORY_INIT:
      return { ...state, Loading: true };
    case actions.VIEW_APPROVAL_HISTORY_SUCCESS:
      return { ...state, Loading: false, viewApprovalHistory: action.response };
    case actions.VIEW_APPROVAL_HISTORY_FAIL:
      return { ...state, Loading: false, Message: action.response };
    case actions.HIDE:
      return { ...state, isSuccess: false };
    case actions.SHOW:
      return { ...state, isSuccess: true };
    default:
      return state;
  }
};

export default reducer;
