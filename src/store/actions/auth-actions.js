import * as actions from "../action_types";
import axios from "axios";
import { authenticationApi } from "../../Common/Api/apis-end-points";
import {
  authenticationRequestConfigs,
  authenticationRefreshToken,
  validateemail,
  validateemailandpassword,
  signuprequest,
  RoleList,
} from "../../Common/Api/apis-config";
import { SomeThingWentWrong } from "./ui-actions";
import { newRequestListCount } from "./request-actions";
import Helper from "../../Common/Functions/history_logout";
import { getApprovalCount } from "./wof-approvals-actions";
const signinInit = () => {
  return {
    type: actions.SIGN_IN_INIT,
  };
};
const signinSuccess = (response, message) => {
  return {
    type: actions.SIGN_IN_SUCCESS,
    response: response,
    message: message,
  };
};
const signinFail = (response, message) => {
  return {
    type: actions.SIGN_IN_FAIL,
    response: response,
    message: message,
  };
};
const refreshTokenInit = () => {
  return {
    type: actions.SIGN_IN_INIT,
  };
};
const refrshtokenFail = (response, message) => {
  return {
    type: actions.REFRESH_TOKEN_FAIL,
    response: response,
    message: message,
  };
};
const refrshtokenSuccess = (response, message) => {
  return {
    type: actions.REFRESH_TOKEN_SUCCESS,
    response: response,
    message: message,
  };
};
// Email Validdation for signup
const validateemailaddressInit = (response, message) => {
  return {
    type: actions.VALIDATE_EMAIL_ADDRESS_INIT,
    response: response,
    message: message,
  };
};
const validateEmailAddressSuccess = (response, message) => {
  return {
    type: actions.VALIDATE_EMAIL_ADDRESS_SUCCES,
    response: response,
    message: message,
  };
};
const validateEmailAddressFail = (response, message) => {
  return {
    type: actions.VALIDATE_EMAIL_ADDRESS_FAIL,
    response: response,
    message: message,
  };
};
//  Email & SignUp Validdation for signup
const validateemailandpasswordInit = (response, message) => {
  return {
    type: actions.VALIDATE_EMAIL_AND_PASSWORD_INIT,
    response: response,
    message: message,
  };
};
const validateEmailAndPasswordSuccess = (response, message) => {
  return {
    type: actions.VALIDATE_EMAIL_AND_PASSWORD_SUCCES,
    response: response,
    message: message,
  };
};
const validateEmailAndPasswordFail = (response, message) => {
  return {
    type: actions.VALIDATE_EMAIL_AND_PASSWORD_FAIL,
    response: response,
    message: message,
  };
};
// SignUp Request
const signupInit = (response, message) => {
  return {
    type: actions.SIGN_UP_INIT,
    response: response,
    message: message,
  };
};
const signUpSuccess = (response, message) => {
  return {
    type: actions.SIGN_UP_SUCCESS,
    response: response,
    message: message,
  };
};
const signUpFail = (response, message) => {
  return {
    type: actions.SIGN_UP_FAIL,
    response: response,
    message: message,
  };
};

const signIn = (UserData, history) => {
  var min = 10000;
  var max = 90000;
  var id = min + Math.random() * (max - min);
  let Data = {
    Password: UserData.Password,
    UserName: UserData.UserName,
    DeviceID: id.toString(),
    Device: "browser",
  };
  return (dispatch) => {
    dispatch(signinInit());
    let form = new FormData();
    form.append("RequestMethod", authenticationRequestConfigs.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: authenticationApi,
      data: form,
    })
      .then((response) => {
        console.log(response);
        if (response.data.responseResult.recordFound === true) {
          if (
            response.data.responseResult.roleID === 2 ||
            response.data.responseResult.roleID === 3 ||
            response.data.responseResult.roleID === 4
          ) {
            dispatch(
              signinSuccess(response.data.responseResult, "Login Successfully")
            );
            console.log(response.data.responseResult.userID);

            if (
              response.data.responseResult.roleID === 2 ||
              response.data.responseResult.roleID === 3
            ) {
              if (response.data.responseResult.roleID === 2) {
                localStorage.setItem("parent", "sub1");
                localStorage.setItem("child", "15");
                dispatch(
                  newRequestListCount(response.data.responseResult.userID)
                );
                history.push("/Wof/Admin/NewRequestList");
              }
              if (response.data.responseResult.roleID === 3) {
                localStorage.setItem("parent", "sub1");
                localStorage.setItem("child", "1");
                dispatch(getApprovalCount(response.data.responseResult.userID));
                history.push("/Wof");
              }
            }
            if (response.data.responseResult.roleID === 4) {
              console.log("checkplz");
              localStorage.setItem("parent", "sub1");
              localStorage.setItem("child", "2");
              history.push("/Wof");
            }

            console.log(response);
          } else {
            dispatch(
              signinFail(
                response.data.responseResult,
                "Not allowed to login with Current Role"
              )
            );
          }
          console.log(response.data.responseResult.recordMessage);
        } else {
          dispatch(
            signinFail(
              response.data.responseResult,
              response.data.responseResult.recordMessage
            )
          );
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
      });
  };
};
// Sign Out
const signOut = (history, message) => {
  localStorage.clear();
  history.push("/");
  if (message !== "") {
    return {
      type: actions.SIGN_OUT,
      message: message,
    };
  } else {
    return {
      type: actions.SIGN_OUT,
    };
  }
};
// changes By Huzeifa

// for cleare state
const clearestate = (history) => {
  history.push("/");
  return {
    type: actions.CLEARE_STATE_INIT,
  };
};
const clearestateBackbutton = (history) => {
  // history.push("/");
  return {
    type: actions.CLEARE_STATE_BACKBUTTON_INIT,
  };
};
// refrest token
const refreshToken = (props) => {
  let history = Helper.history;
  let Token = JSON.parse(localStorage.getItem("token"));
  let RefreshToken = JSON.parse(localStorage.getItem("refreshToken"));
  let Data = {
    Token: Token,
    RefreshToken: RefreshToken,
  };
  return async (dispatch) => {
    console.log("after");
    // dispatch(refreshTokenInit());
    let form = new FormData();
    form.append("RequestMethod", authenticationRefreshToken.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    await axios({
      method: "post",
      url: authenticationApi,
      data: form,
    })
      .then((response) => {
        console.log(response.data.responseCode);
        // if (response.data.responseResult.recordFound === true) {
        if (response.data.responseCode === 200) {
          dispatch(
            refrshtokenSuccess(
              response.data.responseResult,
              "Refresh Token Update Successfully"
            )
          );
          console.log("update", response);
        } else {
          dispatch(
            refrshtokenFail(
              response.data.responseResult,
              "Refresh Token Expire Please Login Again"
            )
          );
          let message = "Your Session has expired";
          // history.push("/");
          console.log("logout");
          dispatch(signOut(history, message));
        }
        // } else {
        //   dispatch(
        //     refrshtokenFail(
        //       response.data.responseResult,
        //       "Refresh Token Expire Please Login Again"
        //     )
        //   );
        //   // useHistory.push("/");
        //   console.log("fails");
        // }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
      });
  };
};
// Email Validdation for signup
const validateEmailAddress = (UserData) => {
  console.log("in email", UserData);
  let data = {
    UserName: UserData,
  };
  return async (dispatch) => {
    dispatch(validateemailaddressInit());
    let form = new FormData();
    form.append("RequestMethod", validateemail.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    await axios({
      method: "post",
      url: authenticationApi,
      data: form,
    })
      .then((response) => {
        console.log(response.data);
        if (response.data.responseResult.recordFound === true) {
          console.log("true", response.data);
          dispatch(
            validateEmailAddressSuccess(
              response.data.responseResult,
              "validate Email Successfully"
            )
          );

          console.log(response);
        } else {
          console.log("false", response.data);
          dispatch(
            validateEmailAddressFail(
              response.data.responseResult,
              "User could not be verified"
            )
          );
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
      });
  };
};
//  Email & SignUp Validdation for signup
const validateEmailAndPassword = (email, password) => {
  let Data = {
    UserName: email,
    Password: password,
  };
  console.log("in email and password", validateemailandpassword.RequestMethod);
  return async (dispatch) => {
    dispatch(validateemailandpasswordInit());
    let form = new FormData();
    form.append("RequestMethod", validateemailandpassword.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    await axios({
      method: "post",
      url: authenticationApi,
      data: form,
    })
      .then((response) => {
        console.log(response.data.responseResult.recordMessage);
        if (response.data.responseResult.recordFound === true) {
          dispatch(
            validateEmailAndPasswordSuccess(
              response.data.responseResult,
              response.data.responseResult.recordMessage
            )
          );
          dispatch(roleList());
        } else {
          console.log(response.data.responseResult.recordMessage);
          dispatch(
            validateEmailAndPasswordFail(
              response.data.responseResult,
              response.data.responseResult.recordMessage
            )
          );
        }
      })
      .catch((response) => {
        dispatch(validateEmailAndPasswordFail());
        dispatch(SomeThingWentWrong(response));
      });
  };
};
// SignUp Request
const signUp = (UserData, history) => {
  console.log(UserData);
  let Data = {
    LoginID: UserData.userName.content,
    FirstName: UserData.firstName.content,
    LastName: UserData.lastName.content,
    Email: UserData.email.content,
    PersonalNumber: "0",
    RoleID: UserData.roles.content,
    UserID: 0,
  };
  console.log(Data);
  return (dispatch) => {
    dispatch(signupInit());
    let form = new FormData();
    form.append("RequestMethod", signuprequest.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: authenticationApi,
      data: form,
    })
      .then(async (response) => {
        console.log(response);
        if (response.data.responseResult.recordFound === true) {
          await dispatch(
            signUpSuccess(
              response.data.responseResult,
              response.data.responseResult.recordMessage
            )
          );
          dispatch(clearestateBackbutton);
          history.push("/");
        } else {
          console.log("fail", response.data.responseResult.recordMessage);
          await dispatch(
            signUpFail(
              response.data.responseResult,
              response.data.responseResult.recordMessage
            )
          );
          // dispatch(clearestateBackbutton);
          // history.push("/");
        }
      })
      .catch((response) => {
        // dispatch(SomeThingWentWrong(response));
        // dispatch(clearestateBackbutton);
      });
  };
};
const roleListSuccess = (response) => {
  return {
    type: actions.ROLE_LIST_SUCCESS,
    response: response,
  };
};

const roleList = () => {
  return (dispatch) => {
    let form = new FormData();
    form.append("RequestMethod", RoleList.RequestMethod);
    form.append("RequestData", JSON.stringify({}));
    axios({
      method: "post",
      url: authenticationApi,
      data: form,
    })
      .then((response) => {
        console.log("roleListroleList", response);
        if (response.data.responseResult.recordFound === true) {
          dispatch(roleListSuccess(response.data.responseResult.roles));
        } else {
          let list = [];
          dispatch(roleListSuccess(list));
        }
      })
      .catch((response) => {
        let list = [];

        dispatch(roleListSuccess(list));

        dispatch(SomeThingWentWrong(response));
      });
  };
};
export {
  signIn,
  signOut,
  refreshToken,
  validateEmailAddress,
  validateEmailAndPassword,
  signUp,
  clearestate,
  clearestateBackbutton,
  roleList,
};
