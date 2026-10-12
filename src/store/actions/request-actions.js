import * as actions from "../action_types";
import axios from "axios";
import { authenticationApi } from "../../Common/Api/apis-end-points";
import {
  requestListCount,
  requestList,
  saveuserrequest,
} from "../../Common/Api/apis-config";
import { SomeThingWentWrong } from "./ui-actions";
import Helper from "../../Common/Functions/history_logout";
import { refreshToken } from "../actions/auth-actions";

// Request List
const newRequestListInit = (response, message) => {
  return {
    type: actions.REQUEST_LIST_INIT,
    response: response,
    message: message,
  };
};
const newRequestListSuccess = (response, message) => {
  return {
    type: actions.REQUEST_LIST_SUCCESS,
    response: response,
    message: message,
  };
};
const newRequestListFail = (response, message) => {
  return {
    type: actions.REQUEST_LIST_FAIL,
    response: response,
    message: message,
  };
};
// Request List count
const newRequestListCountSuccess = (response, message) => {
  return {
    type: actions.REQUEST_LIST_COUNT_SUCCESS,
    response: response,
    message: message,
  };
};
const newRequestListCountFail = (response, message) => {
  return {
    type: actions.REQUEST_LIST_COUNT_FAIL,
    response: response,
    message: message,
  };
};
// Approve user Request
const saveUserRequestInit = (response, message) => {
  return {
    type: actions.SAVE_USER_REQUEST_INIT,
    response: response,
    message: message,
  };
};
const saveUserRequestSuccess = (response, message) => {
  return {
    type: actions.SAVE_USER_REQUEST_SUCCESS,
    response: response,
    message: message,
  };
};
const saveUserRequestFail = (response, message) => {
  return {
    type: actions.SAVE_USER_REQUEST_FAIL,
    response: response,
    message: message,
  };
};
// Request List for Sysytem Admin
const newRequestList = (UserData) => {
  let history = Helper.history;
  let Data = {
    UserID: UserData,
  };
  console.log("call", Data);
  return async (dispatch) => {
    dispatch(newRequestListInit());
    let token = JSON.parse(localStorage.getItem("token"));
    let form = new FormData();
    form.append("RequestMethod", requestList.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    await axios({
      method: "post",
      url: authenticationApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        console.log("kk", response.data);
        if (response.data.responseCode === 417) {
          console.log("refresh");
          await dispatch(refreshToken());

          dispatch(newRequestList(UserData));
          // }

          console.log("sync");
        } else if (response.data.responseCode === 200) {
          console.log(response.data.responseResult);
          if (response.data.responseResult.recordFound === true) {
            await dispatch(newRequestListSuccess(response.data.responseResult));
          } else {
            await dispatch(newRequestListFail(response.data.responseResult));
          }
        } else {
          await dispatch(newRequestListFail(response.data));
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
      });
  };
};
// Request List count (Notification) for Sysytem Admin
const newRequestListCount = (UserData) => {
  let Data = {
    UserID: UserData,
  };
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("token"));
    let form = new FormData();
    form.append("RequestMethod", requestListCount.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: authenticationApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        console.log("kk", response.data);
        if (response.data.responseCode === 417) {
          console.log("refresh");
          await dispatch(refreshToken());

          dispatch(newRequestListCount(UserData));
          // }

          console.log("sync");
        } else if (response.data.responseCode === 200) {
          console.log(response.data.responseResult.userRequestCount);
          if (response.data.responseResult.recordFound === true) {
            dispatch(
              newRequestListCountSuccess(
                response.data.responseResult,
                "Login Successfully"
              )
            );
          } else {
            dispatch(newRequestListFail(response.data));
          }
        } else {
          dispatch(newRequestListFail(response.data));
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
      });
  };
};
// Approve user Request for Sysytem Admin
const saveUserRequest = (UserData, Status, comment, UserID) => {
  // let Token = JSON.parse(localStorage .getItem("token"));
  let Data = {
    UserID: UserID,
    UserRegistrationRequestID: UserData.userRegistrationRequestID,
    Status: Status,
    Comments: comment,
  };
  return (dispatch) => {
    dispatch(saveUserRequestInit());
    let token = JSON.parse(localStorage.getItem("token"));
    let form = new FormData();
    form.append("RequestMethod", saveuserrequest.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: authenticationApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        console.log("kk", response.data);
        if (response.data.responseCode === 417) {
          console.log("refresh");
          await dispatch(refreshToken());

          dispatch(saveUserRequest(UserData, Status, comment, UserID));
          // }

          console.log("sync");
        } else if (response.data.responseCode === 200) {
          console.log(response.data.responseResult.userRequestCount);
          if (response.data.responseResult.recordFound === true) {
            dispatch(newRequestList(UserID));
            dispatch(newRequestListCount(UserID));
            dispatch(
              saveUserRequestSuccess(
                response.data.responseResult,
                "Save Successfully"
              )
            );
          } else {
            dispatch(newRequestListFail(response.data));
          }
        } else {
          dispatch(newRequestListFail(response.data));
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
      });
  };
};
// for activate tabs
const makeTabActive = () => {
  return {
    type: actions.MAKE_TAB_ACTIVE_INIT,
  };
};
export { newRequestList, newRequestListCount, saveUserRequest, makeTabActive };
