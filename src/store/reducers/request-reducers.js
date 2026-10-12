import * as actions from "../action_types";

const initialState = {
  userRequestCount: null,
  UserRequestDetails: null,
  isLoggedIn: false,
  Loading: false,
  ResponseMessage: "",
  isSignUp: false,
  saveMessage: "",
  activateTabs: 0,
};

const requestReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.REQUEST_LIST_SUCCESS:
      console.log("REQUEST_LIST_SUCCESS", action);
      return {
        ...state,
        UserRequestDetails: action.response.userRequestList,
        isLoggedIn: false,
        Loading: false,
        // ResponseMessage: action.message,
        ResponseMessage: action.response.recordMessage,
      };
    case actions.REQUEST_LIST_COUNT_SUCCESS:
      //   console.log("token updates", action.response.userRequestCount);
      return {
        ...state,
        userRequestCount: action.response.userRequestCount,
        ResponseMessage: action.response.recordMessage,
      };
    case actions.REQUEST_LIST_FAIL:
      return {
        ...state,
        UserRequestDetails: action.response.userRequestList,
        isLoggedIn: false,
        Loading: false,
        ResponseMessage:
          action.response.recordMessage !== undefined
            ? action.response.recordMessage
            : action.response.responsedMessage,
      };
    case actions.REQUEST_LIST_COUNT_FAIL:
      return {
        ...state,
        UserDetails: action.response,
        isLoggedIn: false,
        Loading: false,
        ResponseMessage: action.message,
      };
    case actions.SAVE_USER_REQUEST_SUCCESS:
      return {
        ...state,
        UserDetails: action.response,
        isLoggedIn: false,
        Loading: false,
        ResponseMessage: action.message,
      };
    case actions.SAVE_USER_REQUEST_FAIL:
      return {
        ...state,
        UserDetails: action.response,
        isLoggedIn: false,
        Loading: false,
        ResponseMessage: action.message,
      };
    case actions.REQUEST_LIST_INIT:
      return { ...state, Loading: true };
    case actions.SAVE_USER_REQUEST_INIT:
      return { ...state, Loading: true };
    case actions.MAKE_TAB_ACTIVE_INIT:
      return { ...state, activateTabs: 15 };
    default:
      return { ...state };
  }
};

export default requestReducer;
