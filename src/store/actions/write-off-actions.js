import * as actions from "../action_types";
import { refreshToken } from "../actions/auth-actions";
import axios from "axios";
import { WriteOffApi, ApprovalsApi } from "../../Common/Api/apis-end-points";
import {
  addWriteOffConfigs,
  viewWriteOff,
  listOffWriteOff,
  editWriteOffConfigs,
  editApprovedWriteOffConfigs,
  deleteWriteOffConfigs,
  viewAllRevertedCasesForSystemAdmin,
} from "../../Common/Api/apis-config";
import { SomeThingWentWrong } from "./ui-actions";
const addWriteOffInit = () => {
  return {
    type: actions.ADD_WRITE_OFF_INIT,
  };
};
const addWriteOffSuccess = (response) => {
  return {
    type: actions.ADD_WRITE_OFF_SUCCESS,
    response: response,
  };
};
const addWriteOffFail = (response) => {
  return {
    type: actions.ADD_WRITE_OFF_FAIL,
    reponse: response,
  };
};
const addWriteOff = (object, navigate, setwofcode, setOpen, open) => {
  let token = JSON.parse(localStorage.getItem("token"));
  console.log("new request", JSON.stringify(object));
  return (dispatch) => {
    dispatch(addWriteOffInit());
    let form = new FormData();
    console.log("object", object);
    form.append("RequestMethod", addWriteOffConfigs.RequestMethod);
    form.append("RequestData", JSON.stringify(object));
    axios({
      method: "post",
      url: WriteOffApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(addWriteOff(object, navigate, setwofcode, setOpen, open));
        } else if (response.data.responseCode === 200) {
          console.log("response1 after", response.data);
          if (response.data.responseResult.recordFound === true) {
            console.log(response.data.responseResult);
            setOpen({
              ...open,
              open: true,
              message: "Successfully",
            });
            window.location.reload();
            dispatch(addWriteOffSuccess(response.data.responseResult));

            // navigate("/Wof/DataEntryUser/AddWriteOff", { replace: true });

            // localStorage .setItem("parent", "sub1");
            // localStorage .setItem("child", "1");
            // window.location.reload();

            setwofcode(response.data.responseResult.wofCode);
          } else {
            dispatch(addWriteOffFail(response.data.responseResult));
          }
        } else {
          dispatch(addWriteOffFail(response.data.responseResult));
        }
      })
      .catch((response) => {
        // dispatch(addWriteOffFail(response.data.responseResult));
        console.log("response1 after", response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};
const EditWriteOffInit = () => {
  return {
    type: actions.EDIT_WRITE_OFF_INIT,
  };
};
const EditOffWriteOffSuccess = (response) => {
  return {
    type: actions.EDIT_WRITE_OFF_SUCCESS,
    response: response,
  };
};
const EditOffWriteOffFail = (message) => {
  return {
    type: actions.EDIT_WRITE_OFF_FAIL,
    message: message,
  };
};
const EditWriteOff = (object, navigate, setOpen) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(EditWriteOffInit());
    console.log("ViewWriteOff EditWriteOff", JSON.stringify(object));
    let form = new FormData();
    form.append("RequestMethod", editWriteOffConfigs.RequestMethod);
    form.append("RequestData", JSON.stringify(object));
    axios({
      method: "post",
      url: WriteOffApi,
      data: form,
      headers: {
        // _token: editWriteOffConfigs._token,
        _token: token,
      },
    })
      .then(async (response) => {
        console.log("ViewWriteOff EditWriteOff", response);

        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(EditWriteOff(object, navigate, setOpen));
        } else if (response.data.responseCode === 200) {
          console.log("huzeifa edit", response);
          if (response.data.responseResult.recordFound === true) {
            console.log("EditWriteOff", response);
            dispatch(EditOffWriteOffSuccess(response.data.responseResult));
            navigate("/Wof/DataEntryUser/ListWriteOff", { replace: true });
            localStorage.setItem("parent", "sub1");
            localStorage.setItem("child", "1");
            // window.location.reload();
          } else {
            console.log("EditWriteOff", response);
            dispatch(
              EditOffWriteOffFail(
                response.data.responseResult.recordMessage,
                true
              )
            );
            setOpen({
              open: true,
              message: "Record Not Updated",
            });
          }
        } else {
          dispatch(EditOffWriteOffFail(response.data.recordMessage, true));
          setOpen({
            open: true,
            message: response.data.responseResult,
          });
        }
      })
      .catch((response) => {
        console.log(response);
        dispatch(
          EditOffWriteOffFail(response.data.responseResult.recordMessage, true)
        );
        dispatch(SomeThingWentWrong(response));
      });
  };
};
const EditApprovedWriteOff = (object, navigate, setOpen, routeCheck) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(EditWriteOffInit());
    console.log("EditApprovedWriteOff", JSON.stringify(object));
    let form = new FormData();
    form.append("RequestMethod", editApprovedWriteOffConfigs.RequestMethod);
    form.append("RequestData", JSON.stringify(object));
    axios({
      method: "post",
      url: WriteOffApi,
      data: form,
      headers: {
        // _token: editWriteOffConfigs._token,
        _token: token,
      },
    })
      .then(async (response) => {
        console.log("EditApprovedWriteOff", JSON.stringify(response));

        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(EditApprovedWriteOff(object, navigate, setOpen));
        } else if (response.data.responseCode === 200) {
          console.log(response);
          if (response.data.responseResult.recordFound === true) {
            console.log(response);
            await dispatch(
              EditOffWriteOffSuccess(response.data.responseResult)
            );

            await localStorage.setItem("parent", "sub2");
            await localStorage.setItem("child", "10");
            navigate("/Wof/Admin/SystemAdminApprovedCases", { replace: true });
            // window.location.reload();
          } else {
            console.log(response);
            dispatch(
              EditOffWriteOffFail(
                response.data.responseResult.recordMessage,
                true
              )
            );
            setOpen({
              open: true,
              message: "Record Not Updated",
            });
          }
        } else {
          console.log(response);
          dispatch(EditOffWriteOffFail(response.data.responseMessage, true));
          setOpen({
            open: true,
            message: response.data.responseMessage,
          });
        }
      })
      .catch((response) => {
        console.log(response);
        dispatch(
          EditOffWriteOffFail(response.data.responseResult.recordMessage, true)
        );
        dispatch(SomeThingWentWrong(response));
      });
  };
};
const DeleteWriteOffInit = () => {
  return {
    type: actions.DELETE_WRITE_OFF_INIT,
  };
};
const DeleteWriteOffSuccess = () => {
  return {
    type: actions.DELETE_WRITE_OFF_SUCCESS,
  };
};
const DeleteWriteOffFail = () => {
  return {
    type: actions.DELETE_WRITE_OFF_FAIL,
  };
};
const DeleteWriteOff = (WOFCustomerMasterID, setIsModalVisible) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(DeleteWriteOffInit());
    let postData = { WOFCustomerMasterID: WOFCustomerMasterID };
    let form = new FormData();
    form.append("RequestMethod", deleteWriteOffConfigs.RequestMethod);
    form.append("RequestData", JSON.stringify(postData));
    axios({
      method: "post",
      url: WriteOffApi,
      data: form,
      headers: {
        // _token: deleteWriteOffConfigs._token,
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(DeleteWriteOff(WOFCustomerMasterID, setIsModalVisible));
        } else if (response.data.responseCode === 200) {
          console.log(response);
          if (response.data.responseResult.recordFound === true) {
            console.log(response);
            dispatch(DeleteWriteOffSuccess());
            setIsModalVisible(false);
          } else {
            console.log(response);
            dispatch(DeleteWriteOffFail());
          }
        } else {
          console.log(response);
          dispatch(DeleteWriteOffFail(response.data.responseMessage));
        }
      })
      .catch((response) => {
        console.log(response);
        dispatch(DeleteWriteOffFail());
        dispatch(SomeThingWentWrong(response));
      });
  };
};
const viewWriteOffInit = () => {
  return {
    type: actions.VIEW_WRITE_OFF_INIT,
  };
};
const viewWriteOffSuccess = (response) => {
  return {
    type: actions.VIEW_WRITE_OFF_SUCCESS,
    response: response,
  };
};
const viewWriteOffFail = (message) => {
  return {
    type: actions.VIEW_WRITE_OFF_FAIL,
    message: message,
  };
};
const NullState = () => {
  return {
    type: actions.NULL_STATE,
  };
};
const ViewWriteOff = (WOFCustomerMasterID) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(viewWriteOffInit());
    const PostData = { WOFCustomerMasterID: WOFCustomerMasterID };
    let form = new FormData();
    console.log(PostData);
    form.append("RequestMethod", viewWriteOff.RequestMethod);
    form.append("RequestData", JSON.stringify(PostData));
    axios({
      method: "post",
      url: WriteOffApi,
      data: form,
      headers: {
        // _token: viewWriteOff._token,
        _token: token,
      },
    })
      .then(async (response) => {
        console.log("ViewWriteOff", response);
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(ViewWriteOff(WOFCustomerMasterID));
        } else if (response.data.responseCode === 200) {
          console.log(response);
          if (response.data.responseResult.recordFound === true) {
            let Data = response.data.responseResult;
            await dispatch(viewWriteOffSuccess(Data));
          } else {
            dispatch(
              viewWriteOffFail(response.data.responseResult.recordMessage, true)
            );
          }
        } else {
          dispatch(viewWriteOffFail(response.data.responseMessage, true));
        }
      })
      .catch((response) => {
        console.log(response);
        dispatch(
          viewWriteOffFail(response.data.responseResult.recordMessage, true)
        );
        dispatch(SomeThingWentWrong(response));
      });
  };
};
const ListOffWriteOffInit = () => {
  return {
    type: actions.LIST_WRITE_OFF_INIT,
  };
};
const ListOffWriteOffSuccess = (response) => {
  return {
    type: actions.LIST_WRITE_OFF_SUCCESS,
    response: response,
  };
};
const ListOffWriteOffFail = (message) => {
  return {
    type: actions.LIST_WRITE_OFF_FAIL,
    message: message,
  };
};
// for view revert case sucess
const ListOffViewRevertCaseSuccess = (response) => {
  return {
    type: actions.LIST_OF_VIEW_REVERT_CASE_SUCCESS,
    response: response,
  };
};
const ListOffViewRevertCaseffFail = (message) => {
  return {
    type: actions.LIST_OF_VIEW_REVERT_CASE_FAIL,
    message: message,
  };
};
const ListOfWriteOff = (UserID, DayRangeID, SearchTerm) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(ListOffWriteOffInit());
    let PostData = {
      UserID: UserID,
      DayRangeID: DayRangeID,
      SearchTerm: `${SearchTerm}`,
    };
    let form = new FormData();
    form.append("RequestMethod", listOffWriteOff.ListWriteOff);
    form.append("RequestData", JSON.stringify(PostData));
    axios({
      method: "post",
      url: ApprovalsApi,
      data: form,
      headers: {
        // _token: listOffWriteOff._token,
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(ListOfWriteOff(UserID, DayRangeID, SearchTerm));
        } else if (response.data.responseCode === 200) {
          console.log(response);
          if (response.data.responseResult.recordFound === true) {
            dispatch(
              ListOffWriteOffSuccess(response.data.responseResult.listCases)
            );
          } else {
            dispatch(
              ListOffWriteOffFail(
                response.data.responseResult.recordMessage,
                true
              )
            );
          }
        } else {
          dispatch(ListOffWriteOffFail(response.data.responseMessage, true));
        }
      })
      .catch((response) => {
        console.log(response);
        dispatch(
          ListOffWriteOffFail(response.data.responseResult.recordMessage, true)
        );
        dispatch(SomeThingWentWrong(response));
      });
  };
};
const ViewAllRevertedCasesForSystemAdmin = (UserID, DayRangeID, SearchTerm) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(ListOffWriteOffInit());
    let PostData = {
      // UserID: UserID,
      DayRangeID: DayRangeID,
      SearchTerm: `${SearchTerm}`,
    };
    console.log("PostData", PostData);
    let form = new FormData();
    form.append(
      "RequestMethod",
      viewAllRevertedCasesForSystemAdmin.RequestMethod
    );
    form.append("RequestData", JSON.stringify(PostData));
    axios({
      method: "post",
      url: ApprovalsApi,
      data: form,
      headers: {
        // _token: listOffWriteOff._token,
        _token: token,
      },
    })
      .then(async (response) => {
        console.log("PostData", response);

        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(
            ViewAllRevertedCasesForSystemAdmin(UserID, DayRangeID, SearchTerm)
          );
        } else if (response.data.responseCode === 200) {
          console.log(response);
          if (response.data.responseResult.recordFound === true) {
            dispatch(
              ListOffViewRevertCaseSuccess(response.data.responseResult)
            );
          } else {
            dispatch(
              ListOffViewRevertCaseffFail(
                response.data.responseResult.recordMessage,
                true
              )
            );
          }
        } else {
          dispatch(
            ListOffViewRevertCaseffFail(response.data.responseMessage, true)
          );
        }
      })
      .catch((response) => {
        console.log("PostData", response);
        // dispatch(
        //   ListOffViewRevertCaseffFail(
        //     response.data.responseResult.recordMessage,
        //     true
        //   )
        // );
        dispatch(SomeThingWentWrong(response));
      });
  };
};
const ListOfPendingAndApprovedCasesSuccess = (response) => {
  return {
    type: actions.LIST_OFF_PENDING_AND_APPROVED_CASES_SUCCESS,
    response: response,
  };
};
const ListOfPendingAndApprovedCasesFail = (response, message) => {
  return {
    type: actions.LIST_OFF_PENDING_AND_APPROVED_CASES_FAIL,
    response: response,
    message: message,
  };
};
const ListOfPendingAndApprovedCases = (
  UserID,
  SearchTerm,
  TypeOfCase,
  filter
) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(ListOffWriteOffInit());
    let PostData = {
      UserID: UserID,
      SearchTerm: `${SearchTerm}`,
      TypeOfCases: TypeOfCase,
      DayRangeID: filter,
    };
    console.log("ListOfPendingAndApprovedCases");
    let form = new FormData();
    form.append("RequestMethod", listOffWriteOff.FindMyCases);
    form.append("RequestData", JSON.stringify(PostData));
    axios({
      method: "post",
      url: ApprovalsApi,
      data: form,
      headers: {
        // _token: listOffWriteOff._token,
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(
            ListOfPendingAndApprovedCases(
              UserID,
              SearchTerm,
              TypeOfCase,
              filter
            )
          );
        } else if (response.data.responseCode === 200) {
          console.log(response);
          if (response.data.responseResult.recordFound === true) {
            dispatch(
              ListOfPendingAndApprovedCasesSuccess(
                response.data.responseResult.pendingCases
              )
            );
            console.log("ListOfPendingAndApprovedCases", response.data);
          } else {
            dispatch(
              ListOfPendingAndApprovedCasesFail(
                response.data.responseResult.pendingCases,
                response.data.responseResult.recordMessage
              )
            );
          }
        } else {
          dispatch(
            ListOfPendingAndApprovedCasesFail(
              response.data.responseMessage,
              true
            )
          );
        }
      })
      .catch((response) => {
        console.log(response);
        dispatch(
          ListOfPendingAndApprovedCasesFail(
            response.data.responseResult.pendingCases,
            response.data.responseResult.recordMessage
          )
        );
        dispatch(SomeThingWentWrong(response));
      });
  };
};
const ListAllApprovedCases = (UserID, SearchTerm, filter) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(ListOffWriteOffInit());
    let PostData = {
      LeadStewardUserID: UserID,
      SearchTerm: `${SearchTerm}`,
      DayRangeID: filter,
    };
    console.log("ListAllApprovedCases", PostData);
    let form = new FormData();
    form.append("RequestMethod", listOffWriteOff.ViewAllApprovedCases);
    form.append("RequestData", JSON.stringify(PostData));
    axios({
      method: "post",
      url: ApprovalsApi,
      data: form,
      headers: {
        // _token: listOffWriteOff._token,
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(ListAllApprovedCases(UserID, SearchTerm, filter));
        } else if (response.data.responseCode === 200) {
          console.log(response);
          if (response.data.responseResult.recordFound === true) {
            dispatch(
              ListOfPendingAndApprovedCasesSuccess(
                response.data.responseResult.pendingCases
              )
            );
            console.log("ListAllApprovedCases", response.data);
          } else {
            dispatch(
              ListOfPendingAndApprovedCasesFail(
                response.data.responseResult.pendingCases,
                response.data.responseResult.recordMessage
              )
            );
          }
        } else {
          dispatch(
            ListOfPendingAndApprovedCasesFail(
              response.data.responseMessage,
              true
            )
          );
        }
      })
      .catch((response) => {
        dispatch(
          ListOfPendingAndApprovedCasesFail(
            response.data.responseResult.pendingCases,
            response.data.responseResult.recordMessage
          )
        );
        console.log(response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};
const HideNotification = () => {
  return {
    type: actions.HIDE,
  };
};
const ShowNotification = (response) => {
  return {
    type: actions.SHOW,
  };
};
export {
  ViewAllRevertedCasesForSystemAdmin,
  addWriteOff,
  EditWriteOff,
  DeleteWriteOff,
  ViewWriteOff,
  ListOfWriteOff,
  ShowNotification,
  HideNotification,
  ListOfPendingAndApprovedCases,
  NullState,
  ListAllApprovedCases,
  EditApprovedWriteOff,
};
