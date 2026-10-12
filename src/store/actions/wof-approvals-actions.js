import * as actions from "../action_types";
import { refreshToken } from "../actions/auth-actions";
import axios from "axios";
import { ApprovalsApi } from "../../Common/Api/apis-end-points";
import {
  approvalsCountConfigs,
  approvalsConfigs,
  saveApprovalsConfig,
  viewApprovalHistoryConfigs,
} from "../../Common/Api/apis-config";
import { SomeThingWentWrong } from "./ui-actions";
const getApprovalCountInit = (response) => {
  return {
    type: actions.GET_APPROVALS_COUNT_INIT,
    response: response,
  };
};
const getApprovalCountSuccess = (response) => {
  return {
    type: actions.GET_APPROVALS_COUNT_SUCCESS,
    response: {
      Loading: false,
      Count: response,
    },
  };
};

const getApprovalCountFail = (response) => {
  return {
    type: actions.GET_APPROVALS_COUNT_FAIL,
    response: response,
  };
};
const getApprovalCount = (UserID) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    const UserData = { LeadStewardUserID: UserID };
    dispatch(getApprovalCountInit(true));
    let form = new FormData();
    form.append("RequestMethod", approvalsCountConfigs.RequestMethod);
    form.append("RequestData", JSON.stringify(UserData));
    axios({
      method: "post",
      url: ApprovalsApi,
      data: form,
      headers: {
        // _token: approvalsCountConfigs._token,
        _token: token,
      },
    })
      .then(async (response) => {
        console.log("getApprovalCount", response);
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(getApprovalCount(UserID));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.recordFound === true) {
            dispatch(
              getApprovalCountSuccess(
                response.data.responseResult.approvalCount
              )
            );
          } else {
            console.log("fal");
            dispatch(
              getApprovalCountFail(
                response.data.responseResult.recordMessage,
                false
              )
            );
          }
        } else {
          console.log("fal");
          dispatch(
            getApprovalCountFail(
              response.data.responseResult.recordMessage,
              false
            )
          );
        }
      })
      .catch((response) => {
        console.log(response);
        dispatch(
          getApprovalCountFail(
            response.data.responseResult.recordMessage,
            false
          )
        );
        dispatch(SomeThingWentWrong(response));
      });
  };
};
const getApprovalInit = (response) => {
  return {
    type: actions.GET_APPROVALS_INIT,
    response: response,
  };
};
const getApprovalSuccess = (response) => {
  return {
    type: actions.GET_APPROVALS_SUCCESS,
    response: {
      Load: false,
      Approvals: response,
    },
  };
};

const getApprovalFail = (response) => {
  return {
    type: actions.GET_APPROVALS_FAIL,
    response: response,
  };
};

const getApprovals = (UserID, SearchTerm, filter) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    const UserData = {
      LeadStewardUserID: UserID,
      SearchTerm: `${SearchTerm}`,
      DayRangeID: filter,
    };
    console.log(UserData);
    dispatch(getApprovalInit(true));
    let form = new FormData();
    form.append("RequestMethod", approvalsConfigs.RequestMethod);
    form.append("RequestData", JSON.stringify(UserData));
    axios({
      method: "post",
      url: ApprovalsApi,
      data: form,
      headers: {
        // _token: approvalsCountConfigs._token,
        _token: token,
      },
    })
      .then(async (response) => {
        console.log("getApprovals", response);
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(getApprovals(UserID, SearchTerm, filter));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.recordFound === true) {
            console.log(response.data.responseResult);
            let array = [...response.data.responseResult.pendingCases];
            let FinalArray = array.map((item, index) => ({
              ...item,
              key: index,
            }));
            dispatch(getApprovalSuccess(FinalArray));
          } else {
            dispatch(
              getApprovalFail(response.data.responseResult.recordMessage, true)
            );
          }
        } else {
          dispatch(
            getApprovalFail(response.data.responseResult.recordMessage, true)
          );
        }
      })
      .catch((response) => {
        console.log(response);
        dispatch(
          getApprovalFail(response.data.responseResult.recordMessage, true)
        );
        dispatch(SomeThingWentWrong(response));
      });
  };
};
const saveApprovalInit = () => {
  return {
    type: actions.SAVE_APPROVALS_INIT,
  };
};
const saveApprovalSuccess = (message) => {
  return {
    type: actions.SAVE_APPROVALS_SUCCESS,
    message: message,
  };
};

const saveApprovalFail = (message) => {
  return {
    type: actions.SAVE_APPROVALS_FAIL,
    message: message,
  };
};

const saveApprovals = (Details) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(saveApprovalInit());
    // = {"WOFCustomerMasterID":"123456","WOFStatus":2,"ApprovalRejectionReasonID":1,
    //  "UserID": 2,"Description": "Comments in description"}
    const PostData = {
      WOFCustomerMasterID: `${Details.WOFCustomerMasterID}`,
      WOFStatus: Details.WOFStatus,
      ApprovalRejectionReasonID: Details.ApprovalRejectionReasonID,
      UserID: Details.UserID,
      Description: Details.Description,
    };
    let form = new FormData();
    form.append("RequestMethod", saveApprovalsConfig.RequestMethod);
    form.append("RequestData", JSON.stringify(PostData));
    axios({
      method: "post",
      url: ApprovalsApi,
      data: form,
      headers: {
        // _token: saveApprovalsConfig._token,
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(saveApprovals(Details));
        } else if (response.data.responseCode === 200) {
          console.log(response);
          if (response.data.responseResult.recordFound === true) {
            dispatch(
              saveApprovalSuccess(response.data.responseResult.recordMessage)
            );
            dispatch(getApprovalCount(Details.UserID));
          } else {
            dispatch(
              saveApprovalFail(response.data.responseResult.recordMessage, true)
            );
          }
        } else {
          dispatch(
            saveApprovalFail(response.data.responseResult.recordMessage, true)
          );
        }
      })
      .catch((response) => {
        console.log(response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};

const viewApprovalHistoryFailure = (response) => {
  return {
    type: actions.VIEW_APPROVAL_HISTORY_FAIL,
    loading: false,
    response: response,
  };
};

const viewApprovalHistory = (id, setviewApprovalHistory) => {
  let token = JSON.parse(localStorage.getItem("token"));
  const UserData = { WOFCustomerMasterID: id };
  let form = new FormData();
  form.append("RequestMethod", viewApprovalHistoryConfigs.RequestMethod);
  form.append("RequestData", JSON.stringify(UserData));
  return (dispatch) => {
    axios({
      method: "post",
      url: ApprovalsApi,
      data: form,
      headers: {
        // _token: viewApprovalHistoryConfigs._token,
        _token: token,
      },
    })
      .then(async (response) => {
        console.log("filteredApprovalHistRow", response);
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(viewApprovalHistory(id, setviewApprovalHistory));
        } else if (response.data.responseCode === 200) {
          console.log(response.data.responseResult);
          if (response.data.responseResult.recordFound === true) {
            let array = [...response.data.responseResult.approvalHistory];
            let FinalArray = array.map((item, index) => ({
              ...item,
              key: index,
            }));
            setviewApprovalHistory(FinalArray);
          } else {
            setviewApprovalHistory([]);
            dispatch(viewApprovalHistoryFailure(response));
          }
        } else {
          setviewApprovalHistory([]);
          dispatch(viewApprovalHistoryFailure(response));
        }
      })
      .catch((response) => {
        console.log(response);
        dispatch(viewApprovalHistoryFailure(response));
        dispatch(SomeThingWentWrong(response));
      });
  };
};
const ShowNotification = (response) => {
  return {
    type: actions.SHOW,
  };
};
const HideNotification = () => {
  return {
    type: actions.HIDE,
  };
};
export {
  getApprovalCount,
  getApprovals,
  saveApprovals,
  viewApprovalHistory,
  HideNotification,
  ShowNotification,
};
