import * as actions from "../action_types";

const initialState = {
  UserDetails: null,
  isLoggedIn: false,
  Loading: false,
  ResponseMessage: "",
  signUpResponseMessage: "",
  LoginResponseMessage: "",
  SessionExpeireResponseMessage: "",
  isSignUp: false,
  departments: null,
  roles: null,
  // change
  roelList: [],
  responseData: "",
  isError: true,
  isFail: true,
  isErrorPas: true,
  pendingError: false,
  Token: "",
  Refresh: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SIGN_IN_INIT:
      return { ...state, Loading: true };
    case actions.SIGN_IN_SUCCESS:
      localStorage.setItem("token", JSON.stringify(action.response.token));
      localStorage.setItem(
        "refreshToken",
        JSON.stringify(action.response.refreshToken)
      );
      localStorage.setItem("role", JSON.stringify(action.response.roleID));
      localStorage.setItem("UserDetails", JSON.stringify(action.response));
      return {
        ...state,
        UserDetails: action.response,
        isLoggedIn: true,
        Loading: false,
        ResponseMessage: action.message,
        // change
        Token: action.response.token,
        Refresh: action.response.refreshToken,
      };
    case actions.REFRESH_TOKEN_SUCCESS:
      localStorage.setItem("token", JSON.stringify(action.response.token));
      localStorage.setItem(
        "refreshToken",
        JSON.stringify(action.response.refreshToken)
      );

      console.log("token updates");
      return {
        ...state,
        // UserDetails: action.response,
        ResponseMessage: action.message,
        // change
        Token: action.response.token,
        Refresh: action.response.refreshToken,
      };
    case actions.REFRESH_TOKEN_FAIL:
      return {
        ...state,
        UserDetails: action.response,
        isLoggedIn: false,
        Loading: false,
        SessionExpeireResponseMessage: action.message,
        Token: "",
        Refresh: "",
      };
    case actions.SIGN_IN_FAIL:
      console.log("signin fail", action);
      return {
        ...state,
        UserDetails: action.response,
        isLoggedIn: false,
        Loading: false,
        ResponseMessage: action.message,
        Token: "",
        Refresh: "",
      };
    case actions.SIGN_UP_INIT:
      return { ...state, Loading: true };
    case actions.SIGN_UP_SUCCESS:
      console.log("signup", action.message);
      return {
        ...state,
        isLoggedIn: true,
        Loading: false,
        pendingError: false,
        signUpResponseMessage: action.message,
      };
    case actions.SIGN_UP_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        Loading: false,
        pendingError: true,
        ResponseMessage: action.message,
      };
    case actions.SIGN_OUT:
      // localStorage .removeItem("token");
      // localStorage .removeItem("role");
      // localStorage .removeItem("UserDetails");
      // localStorage .removeItem("wofCustomerMasterID");
      // localStorage .removeItem("parent");
      // localStorage .removeItem("child");
      localStorage.clear();
      return {
        ...state,
        UserDetails: null,
        isLoggedIn: false,
        Loading: false,
        Token: "",
        Refresh: "",
        SessionExpeireResponseMessage: action.message,
      };
    case actions.CLEARE_STATE_INIT:
      console.log("cleare");
      localStorage.clear();
      return {
        ...state,
        UserDetails: null,
        isLoggedIn: false,
        Loading: false,
        ResponseMessage: "",
        LoginResponseMessage: "",
        signUpResponseMessage: "",
        pendingError: false,
        isSignUp: false,
        departments: null,
        roles: null,
        responseData: "",
        isError: true,
        isFail: true,
        isErrorPas: true,
        Token: "",
        Refresh: "",
      };
    case actions.CLEARE_STATE_BACKBUTTON_INIT:
      localStorage.clear();
      return {
        ...state,
        UserDetails: null,
        isLoggedIn: false,
        Loading: false,
        isSignUp: false,
        departments: null,
        roles: null,
        ResponseMessage: "",
        pendingError: false,
        responseData: "",
        isError: true,
        isFail: true,
        isErrorPas: true,
        Token: "",
        Refresh: "",
      };
    case actions.VALIDATE_EMAIL_ADDRESS_SUCCES:
      console.log("email");
      return {
        ...state,
        isError: false,
        isFail: false,
        isLoggedIn: false,
        Loading: false,
        ResponseMessage: action.message,
      };
    case actions.VALIDATE_EMAIL_ADDRESS_FAIL:
      // console.log(action);
      return {
        ...state,
        isError: true,
        isFail: true,
        isLoggedIn: false,
        Loading: false,
        ResponseMessage: action.response.recordMessage,
      };
    case actions.VALIDATE_EMAIL_AND_PASSWORD_SUCCES:
      console.log("pas");
      return {
        ...state,
        responseData: action.response,
        isLoggedIn: false,
        Loading: false,
        isErrorPas: false,
        isError: false,
        ResponseMessage: action.message,
      };
    case actions.VALIDATE_EMAIL_AND_PASSWORD_FAIL:
      console.log(action.message);
      return {
        ...state,
        isLoggedIn: false,
        Loading: false,
        isErrorPas: true,
        ResponseMessage: action.message,
      };
    case actions.VALIDATE_EMAIL_ADDRESS_INIT:
      return { ...state, Loading: true };
    case actions.VALIDATE_EMAIL_AND_PASSWORD_INIT:
      return { ...state, Loading: true, ResponseMessage: "" };
    case actions.SIGN_UP_INIT:
      return { ...state, Loading: true };
    case actions.ROLE_LIST_SUCCESS:
      return { ...state, roelList: action.response };

    default:
      return state;
  }
};

export default reducer;
