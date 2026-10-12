import * as actions from "../action_types";
import axios from "axios";
import { refreshToken } from "../actions/auth-actions";
import { SetupFormApi, ApprovalsApi } from "../../Common/Api/apis-end-points";
import {
  GetSetupFormConfigs,
  PostSetupFormConfigs,
  SearchSetupFormConfigs,
} from "../../Common/Api/apis-config";
import { SomeThingWentWrong } from "./ui-actions";
const HideNotification = () => {
  return {
    type: actions.HIDE,
  };
};
const ShowNotification = (message) => {
  return {
    type: actions.SHOW,
    message: message,
  };
};
const setupFormInit = () => {
  return {
    type: actions.GET_SETUP_FORM_INIT,
  };
};
const setupFormFail = () => {
  return {
    type: actions.GET_SETUP_FORM_FAIL,
  };
};
const BorrowerTypeSuccess = (response) => {
  return {
    type: actions.GET_BORROWER_TYPE_SUCCESS,
    response: response,
  };
};
const BorrowerTypeFail = (response) => {
  return {
    type: actions.GET_BORROWER_TYPE_FAIL,
    response: response,
  };
};
const GetBorrowerType = () => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", GetSetupFormConfigs.GetBorrowerType);
    console.log("hit");
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        // _token: GetSetupFormConfigs._token,
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(GetBorrowerType());
        } else if (response.data.responseCode === 200) {
          console.log("GetBorrowerType", response);

          if (response.data.responseResult.recordFound === true) {
            let FinalArray = response.data.responseResult.list.map(
              (item, index) => {
                console.log(response.data.responseResult);
                return { ...item, key: index };
              }
            );
            console.log("BorrowerTypeSuccess", FinalArray);
            dispatch(BorrowerTypeSuccess(FinalArray));
          } else {
            dispatch(BorrowerTypeFail(response.data));
          }
        } else {
          dispatch(BorrowerTypeFail(response.data));
        }
      })
      .catch((response) => {
        console.log(response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};
const AddBorrowerType = (object, setIsModalVisible) => {
  let token = JSON.parse(localStorage.getItem("token"));
  console.log("AddBorrowerType", object);
  return (dispatch) => {
    let PostData = { WOFStatus: object.WOFStatus, Title: `${object.Title}` };
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", PostSetupFormConfigs.AddBorrowerType);
    form.append("RequestData", JSON.stringify(PostData));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        // _token: PostSetupFormConfigs._token,
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(AddBorrowerType(object, setIsModalVisible));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.recordFound === true) {
            console.log(response.data.responseResult);
            dispatch(
              ShowNotification(response.data.responseResult.recordMessage)
            );
            setIsModalVisible(false);
          } else {
            console.log(response.data.responseResult);
            setIsModalVisible(false);
          }
        } else {
          dispatch(BorrowerTypeFail(response.data));
          setIsModalVisible(false);
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());
        console.log(response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};
const EditBorrowerType = (
  borrowerType,
  setborrowerType,
  setAction,
  actions
) => {
  let token = JSON.parse(localStorage.getItem("token"));
  console.log(
    "EditBorrowerType",
    borrowerType,
    setborrowerType,
    setAction,
    actions
  );
  return (dispatch) => {
    let PostData = {
      ID: borrowerType.ID,
      WOFStatus: borrowerType.WOFStatus,
      Title: `${borrowerType.Title}`,
    };
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", PostSetupFormConfigs.UpdateBorrowerType);
    form.append("RequestData", JSON.stringify(PostData));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        // _token: PostSetupFormConfigs._token,
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(
            EditBorrowerType(borrowerType, setborrowerType, setAction, actions)
          );
        } else if (response.data.responseCode === 200) {
          console.log(response);
          if (response.data.responseResult.recordFound === true) {
            console.log(response.data.responseResult);
            setborrowerType({
              ...borrowerType,
              ID: null,
              WOFStatus: 4,
              Title: "",
            });
            setAction({
              ...actions,
              update: false,
            });
            dispatch(
              ShowNotification(response.data.responseResult.recordMessage)
            );
          } else {
            console.log(response.data.responseResult);
          }
        } else {
          dispatch(BorrowerTypeFail(response.data));
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());
        console.log(response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};
const DeleteBorrowerType = (
  borrowerType,
  setborrowerType,
  setIsModalVisible
) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    let PostData = { ID: borrowerType.ID };
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", PostSetupFormConfigs.DeleteBorrowerType);
    form.append("RequestData", JSON.stringify(PostData));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        // _token: PostSetupFormConfigs._token,
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(
            DeleteBorrowerType(borrowerType, setborrowerType, setIsModalVisible)
          );
        } else if (response.data.responseCode === 200) {
          console.log(response);
          if (response.data.responseResult.recordFound === true) {
            console.log(response.data.responseResult);
            setborrowerType({
              ...borrowerType,
              ID: null,
              WOFStatus: 4,
              Title: "",
            });
            dispatch(
              ShowNotification(response.data.responseResult.recordMessage)
            );
            setIsModalVisible(false);
          } else {
            console.log(response.data.responseResult);
            setIsModalVisible(false);
          }
        } else {
          dispatch(BorrowerTypeFail(response.data));
          setIsModalVisible(false);
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());
        console.log(response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};
const AdvanceClassificationSuccess = (response) => {
  return {
    type: actions.GET_ADVANCE_CLASSIFICATION_SUCCESS,
    response: response,
  };
};

const viewAllRevertCasesSuccess = (response) => {
  return {
    type: actions.GET_All_REVERT_CASES_SUCCESS,
    response: response,
  };
};
const viewAllRevertCasesFail = (response) => {
  return {
    type: actions.GET_All_REVERT_CASES_FAIL,
    response: response,
  };
};
const viewAllApprovedCasesSuccess = (response) => {
  console.log("ddddddddd call");
  return {
    type: actions.GET_All_APPROVED_CASES_SUCCESS,
    response: response,
  };
};
const viewAllApprovedCasesFail = (response) => {
  return {
    type: actions.GET_All_APPROVED_CASES_FAIL,
    response: response,
  };
};
const GetAdvanceClassification = () => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", GetSetupFormConfigs.GetAdvanceClassification);
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        // _token: GetSetupFormConfigs._token,
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(GetAdvanceClassification());
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.recordFound === true) {
            let FinalArray = response.data.responseResult.list.map(
              (item, index) => {
                return { ...item, key: index };
              }
            );
            dispatch(AdvanceClassificationSuccess(FinalArray));
          } else {
            dispatch(BorrowerTypeFail(response.data));
          }
        } else {
          dispatch(BorrowerTypeFail(response.data));
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());
        console.log(response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};
const AddAdvanceClassification = (
  classificationofAdvance,
  setIsModalVisible
) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    let PostData = {
      WOFStatus: classificationofAdvance.WOFStatus,
      Title: `${classificationofAdvance.Title}`,
    };
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", PostSetupFormConfigs.AddAdvanceClassification);
    form.append("RequestData", JSON.stringify(PostData));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        // _token: PostSetupFormConfigs._token,
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(
            AddAdvanceClassification(classificationofAdvance, setIsModalVisible)
          );
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.recordFound === true) {
            console.log(response.data.responseResult);
            dispatch(
              ShowNotification(response.data.responseResult.recordMessage)
            );
            setIsModalVisible(false);
          } else {
            console.log(response.data.responseResult);
            setIsModalVisible(false);
          }
        } else {
          dispatch(BorrowerTypeFail(response.data));
          setIsModalVisible(false);
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());
        console.log(response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};
const EditAdvanceClassification = (
  classificationofAdvance,
  setclassificationofAdvance,
  setAction,
  actions
) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    let PostData = {
      ID: classificationofAdvance.ID,
      WOFStatus: classificationofAdvance.WOFStatus,
      Title: `${classificationofAdvance.Title}`,
    };
    dispatch(setupFormInit());
    let form = new FormData();
    form.append(
      "RequestMethod",
      PostSetupFormConfigs.UpdateAdvanceClassification
    );
    form.append("RequestData", JSON.stringify(PostData));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        // _token: PostSetupFormConfigs._token,
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(
            EditAdvanceClassification(
              classificationofAdvance,
              setclassificationofAdvance,
              setAction,
              actions
            )
          );
        } else if (response.data.responseCode === 200) {
          console.log(response);
          if (response.data.responseResult.recordFound === true) {
            console.log(response.data.responseResult);
            setclassificationofAdvance({
              ...classificationofAdvance,
              ID: null,
              WOFStatus: 4,
              Title: "",
            });
            setAction({
              ...actions,
              update: false,
            });
            dispatch(
              ShowNotification(response.data.responseResult.recordMessage)
            );
          } else {
            console.log(response.data.responseResult);
          }
        } else {
          dispatch(BorrowerTypeFail(response.data));
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());
        console.log(response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};
const DeleteAdvanceClassification = (
  classificationofAdvance,
  setclassificationofAdvance,
  setIsModalVisible
) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    let PostData = { ID: classificationofAdvance.ID };
    dispatch(setupFormInit());
    console.log(PostData);
    let form = new FormData();
    form.append(
      "RequestMethod",
      PostSetupFormConfigs.DeleteAdvanceClassification
    );
    form.append("RequestData", JSON.stringify(PostData));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        // _token: PostSetupFormConfigs._token,
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(
            DeleteAdvanceClassification(
              classificationofAdvance,
              setclassificationofAdvance,
              setIsModalVisible
            )
          );
        } else if (response.data.responseCode === 200) {
          console.log(response);
          if (response.data.responseResult.recordFound === true) {
            console.log(response.data.responseResult);
            setclassificationofAdvance({
              ...classificationofAdvance,
              ID: null,
              WOFStatus: 4,
              Title: "",
            });
            dispatch(
              ShowNotification(response.data.responseResult.recordMessage)
            );
            setIsModalVisible(false);
          } else {
            console.log(response.data.responseResult);
            setIsModalVisible(false);
          }
        } else {
          setIsModalVisible(false);
          dispatch(BorrowerTypeFail(response.data));
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());
        console.log(response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};
const ManagementUnitSuccess = (response) => {
  return {
    type: actions.GET_MANAGEMENT_UNIT_SUCCESS,
    response: response,
  };
};
const GetManagementUnit = () => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", GetSetupFormConfigs.GetManagementUnit);
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        // _token: GetSetupFormConfigs._token,
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(GetManagementUnit());
        } else if (response.data.responseCode === 200) {
          console.log("GetManagementUnit", response);
          if (response.data.responseResult.recordFound === true) {
            let FinalArray = response.data.responseResult.list.map(
              (item, index) => {
                return { ...item, key: index };
              }
            );
            dispatch(ManagementUnitSuccess(FinalArray));
          } else {
            dispatch(ManagementUnitSuccess([]));
          }
        } else {
          dispatch(BorrowerTypeFail(response.data));
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());
        console.log(response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};
const AddManagementUnit = (managementUnit, setIsModalVisible) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    let PostData = {
      WOFStatus: managementUnit.WOFStatus,
      Title: `${managementUnit.Title}`,
    };
    console.log("managementUnit", PostData);
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", PostSetupFormConfigs.AddManagementUnit);
    form.append("RequestData", JSON.stringify(PostData));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        // _token: PostSetupFormConfigs._token,
        _token: token,
      },
    })
      .then(async (response) => {
        console.log("managementUnit", response);

        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(AddManagementUnit(managementUnit, setIsModalVisible));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.recordFound === true) {
            console.log(response.data.responseResult);
            dispatch(
              ShowNotification(response.data.responseResult.recordMessage)
            );
            setIsModalVisible(false);
          } else {
            console.log(response.data.responseResult);
            setIsModalVisible(false);
          }
        } else {
          setIsModalVisible(false);
          dispatch(BorrowerTypeFail(response.data));
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());
        console.log(response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};
const EditManagementUnit = (
  managementUnit,
  setmanagementUnit,
  setAction,
  actions
) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    let PostData = {
      ID: managementUnit.ID,
      WOFStatus: managementUnit.WOFStatus,
      Title: `${managementUnit.Title}`,
    };
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", PostSetupFormConfigs.UpdateManagementUnit);
    form.append("RequestData", JSON.stringify(PostData));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        // _token: PostSetupFormConfigs._token,
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(
            EditManagementUnit(
              managementUnit,
              setmanagementUnit,
              setAction,
              actions
            )
          );
        } else if (response.data.responseCode === 200) {
          console.log(response);
          if (response.data.responseResult.recordFound === true) {
            console.log(response.data.responseResult);
            setmanagementUnit({
              ...managementUnit,
              ID: null,
              WOFStatus: 4,
              Title: "",
            });
            setAction({
              ...actions,
              update: false,
            });
            dispatch(
              ShowNotification(response.data.responseResult.recordMessage)
            );
          } else {
            console.log(response.data.responseResult);
          }
        } else {
          dispatch(BorrowerTypeFail(response.data));
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());
        console.log(response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};
const DeleteManagementUnit = (
  managementUnit,
  setmanagementUnit,
  setIsModalVisible
) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    let PostData = { ID: managementUnit.ID };
    dispatch(setupFormInit());
    console.log(PostData);
    let form = new FormData();
    form.append("RequestMethod", PostSetupFormConfigs.DeleteManagementUnit);
    form.append("RequestData", JSON.stringify(PostData));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        // _token: PostSetupFormConfigs._token,
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(
            DeleteManagementUnit(
              managementUnit,
              setmanagementUnit,
              setIsModalVisible
            )
          );
        } else if (response.data.responseCode === 200) {
          console.log(response);
          if (response.data.responseResult.recordFound === true) {
            console.log(response.data.responseResult);
            setmanagementUnit({
              ...managementUnit,
              ID: null,
              WOFStatus: 4,
              Title: "",
            });
            dispatch(
              ShowNotification(response.data.responseResult.recordMessage)
            );
            setIsModalVisible(false);
          } else {
            console.log(response.data.responseResult);
            setIsModalVisible(false);
          }
        } else {
          setIsModalVisible(false);
          dispatch(BorrowerTypeFail(response.data));
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());
        console.log(response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};
const NatureofChargeSuccess = (response) => {
  return {
    type: actions.GET_NATURE_OF_CHARGE_SUCCESS,
    response: response,
  };
};
const GetNatureofCharge = () => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", GetSetupFormConfigs.GetNatureofCharge);
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        // _token: GetSetupFormConfigs._token,
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(GetNatureofCharge());
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.recordFound === true) {
            let FinalArray = response.data.responseResult.list.map(
              (item, index) => {
                return { ...item, key: index };
              }
            );
            dispatch(NatureofChargeSuccess(FinalArray));
          } else {
            dispatch(BorrowerTypeFail(response.data));
          }
        } else {
          dispatch(BorrowerTypeFail(response.data));
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());
        console.log(response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};
const AddNatureofCharge = (natureofCharge, setIsModalVisible) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    let PostData = {
      WOFStatus: natureofCharge.WOFStatus,
      Title: `${natureofCharge.Title}`,
    };
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", PostSetupFormConfigs.AddNatureofCharge);
    form.append("RequestData", JSON.stringify(PostData));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        // _token: PostSetupFormConfigs._token,
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(AddNatureofCharge(natureofCharge, setIsModalVisible));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.recordFound === true) {
            console.log(response.data.responseResult);
            dispatch(
              ShowNotification(response.data.responseResult.recordMessage)
            );
            setIsModalVisible(false);
          } else {
            console.log(response.data.responseResult);
            setIsModalVisible(false);
          }
        } else {
          dispatch(BorrowerTypeFail(response.data));
          setIsModalVisible(false);
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());
        console.log(response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};
const EditNatureofCharge = (
  natureofCharge,
  setnatureofCharge,
  setAction,
  actions
) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    let PostData = {
      ID: natureofCharge.ID,
      WOFStatus: natureofCharge.WOFStatus,
      Title: `${natureofCharge.Title}`,
    };
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", PostSetupFormConfigs.UpdateNatureofCharge);
    form.append("RequestData", JSON.stringify(PostData));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        // _token: PostSetupFormConfigs._token,
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(
            EditNatureofCharge(
              natureofCharge,
              setnatureofCharge,
              setAction,
              actions
            )
          );
        } else if (response.data.responseCode === 200) {
          console.log(response);
          if (response.data.responseResult.recordFound === true) {
            console.log(response.data.responseResult);
            setnatureofCharge({
              ...natureofCharge,
              ID: null,
              WOFStatus: 4,
              Title: "",
            });
            setAction({
              ...actions,
              update: false,
            });
            dispatch(
              ShowNotification(response.data.responseResult.recordMessage)
            );
          } else {
            dispatch(BorrowerTypeFail(response.data));
          }
        } else {
          dispatch(BorrowerTypeFail(response.data));
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());
        console.log(response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};
const DeleteNatureofCharge = (
  natureofCharge,
  setnatureofCharge,
  setIsModalVisible
) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    let PostData = { ID: natureofCharge.ID };
    dispatch(setupFormInit());
    console.log(PostData);
    let form = new FormData();
    form.append("RequestMethod", PostSetupFormConfigs.DeleteNatureofCharge);
    form.append("RequestData", JSON.stringify(PostData));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        // _token: PostSetupFormConfigs._token,
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(
            DeleteNatureofCharge(
              natureofCharge,
              setnatureofCharge,
              setIsModalVisible
            )
          );
        } else if (response.data.responseCode === 200) {
          console.log(response);
          if (response.data.responseResult.recordFound === true) {
            console.log(response.data.responseResult);
            setnatureofCharge({
              ...natureofCharge,
              ID: null,
              WOFStatus: 4,
              Title: "",
            });
            dispatch(
              ShowNotification(response.data.responseResult.recordMessage)
            );
            setIsModalVisible(false);
          } else {
            console.log(response.data.responseResult);
            setIsModalVisible(false);
          }
        } else {
          setIsModalVisible(false);
          dispatch(BorrowerTypeFail(response.data));
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());
        console.log(response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};
const NatureOfSecuritySuccess = (response) => {
  return {
    type: actions.GET_NATURE_OF_SECURITY_SUCCESS,
    response: response,
  };
};
const GetNatureOfSecurity = () => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", GetSetupFormConfigs.GetNatureOfSecurity);
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        // _token: GetSetupFormConfigs._token,
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(GetNatureOfSecurity());
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.recordFound === true) {
            let FinalArray = response.data.responseResult.list.map(
              (item, index) => {
                return { ...item, key: index };
              }
            );
            dispatch(NatureOfSecuritySuccess(FinalArray));
          } else {
            dispatch(BorrowerTypeFail(response.data));
          }
        } else {
          dispatch(BorrowerTypeFail(response.data));
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());
        console.log(response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};
const AddNatureOfSecurity = (natureofSecurity, setIsModalVisible) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    let PostData = {
      WOFStatus: natureofSecurity.WOFStatus,
      Title: `${natureofSecurity.Title}`,
    };
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", PostSetupFormConfigs.AddNatureOfSecurity);
    form.append("RequestData", JSON.stringify(PostData));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        // _token: PostSetupFormConfigs._token,
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(AddNatureOfSecurity(natureofSecurity, setIsModalVisible));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.recordFound === true) {
            console.log(response.data.responseResult);
            dispatch(
              ShowNotification(response.data.responseResult.recordMessage)
            );
            setIsModalVisible(false);
          } else {
            console.log(response.data.responseResult);
            setIsModalVisible(false);
          }
        } else {
          setIsModalVisible(false);
          dispatch(BorrowerTypeFail(response.data));
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());
        console.log(response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};
const EditNatureOfSecurity = (
  natureofSecurity,
  setnatureofSecurity,
  setAction,
  actions
) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    let PostData = {
      ID: natureofSecurity.ID,
      WOFStatus: natureofSecurity.WOFStatus,
      Title: `${natureofSecurity.Title}`,
    };
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", PostSetupFormConfigs.UpdateNatureOfSecurity);
    form.append("RequestData", JSON.stringify(PostData));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        // _token: PostSetupFormConfigs._token,
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(
            EditNatureOfSecurity(
              natureofSecurity,
              setnatureofSecurity,
              setAction,
              actions
            )
          );
        } else if (response.data.responseCode === 200) {
          console.log(response);
          if (response.data.responseResult.recordFound === true) {
            console.log(response.data.responseResult);
            setnatureofSecurity({
              ...natureofSecurity,
              ID: null,
              WOFStatus: 4,
              Title: "",
            });
            setAction({
              ...actions,
              update: false,
            });
            dispatch(
              ShowNotification(response.data.responseResult.recordMessage)
            );
          } else {
            dispatch(BorrowerTypeFail(response.data));
          }
        } else {
          dispatch(BorrowerTypeFail(response.data));
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());
        console.log(response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};
const DeleteNatureOfSecurity = (
  natureofSecurity,
  setnatureofSecurity,
  setIsModalVisible
) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    let PostData = { ID: natureofSecurity.ID };
    dispatch(setupFormInit());
    console.log(PostData);
    let form = new FormData();
    form.append("RequestMethod", PostSetupFormConfigs.DeleteNatureOfSecurity);
    form.append("RequestData", JSON.stringify(PostData));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        // _token: PostSetupFormConfigs._token,
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(
            DeleteNatureOfSecurity(
              natureofSecurity,
              setnatureofSecurity,
              setIsModalVisible
            )
          );
        } else if (response.data.responseCode === 200) {
          console.log(response);
          if (response.data.responseResult.recordFound === true) {
            console.log(response.data.responseResult);
            setnatureofSecurity({
              ...natureofSecurity,
              ID: null,
              WOFStatus: 4,
              Title: "",
            });
            dispatch(
              ShowNotification(response.data.responseResult.recordMessage)
            );
            setIsModalVisible(false);
          } else {
            dispatch(BorrowerTypeFail(response.data));

            setIsModalVisible(false);
          }
        } else {
          setIsModalVisible(false);
          dispatch(BorrowerTypeFail(response.data));
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());
        console.log(response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};
const WOFReasonSuccess = (response) => {
  return {
    type: actions.GET_WRITEOFFREASON_SUCCESS,
    response: response,
  };
};
const GetWOFReason = () => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", GetSetupFormConfigs.GetWOFReason);
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        // _token: GetSetupFormConfigs._token,
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(GetWOFReason());
        } else if (response.data.responseCode === 200) {
          console.log("GetWOFReason", response);
          if (response.data.responseResult.recordFound === true) {
            let FinalArray = response.data.responseResult.list.map(
              (item, index) => {
                return { ...item, key: index };
              }
            );
            await dispatch(WOFReasonSuccess(FinalArray));
          } else {
            dispatch(BorrowerTypeFail(response.data));
          }
        } else {
          dispatch(BorrowerTypeFail(response.data));
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());
        console.log(response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};
const AddWOFReason = (reasonOfWriteOff, setIsModalVisible) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    let PostData = {
      WOFStatus: reasonOfWriteOff.WOFStatus,
      Title: `${reasonOfWriteOff.Title}`,
    };
    console.log("PostData", PostData);

    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", PostSetupFormConfigs.AddWOFReason);
    form.append("RequestData", JSON.stringify(PostData));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        // _token: PostSetupFormConfigs._token,
        _token: token,
      },
    })
      .then(async (response) => {
        console.log("PostData", response);

        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(AddWOFReason(reasonOfWriteOff, setIsModalVisible));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.recordFound === true) {
            console.log(response.data.responseResult);
            dispatch(
              ShowNotification(response.data.responseResult.recordMessage)
            );
            setIsModalVisible(false);
          } else {
            console.log(response.data.responseResult);
            setIsModalVisible(false);
            dispatch(BorrowerTypeFail(response.data));
          }
        } else {
          dispatch(BorrowerTypeFail(response.data));
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());
        console.log(response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};
const EditWOFReason = (
  reasonOfWriteOff,
  setreasonOfWriteOff,
  setAction,
  actions
) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    let PostData = {
      ID: reasonOfWriteOff.ID,
      WOFStatus: reasonOfWriteOff.WOFStatus,
      Title: `${reasonOfWriteOff.Title}`,
    };
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", PostSetupFormConfigs.UpdateWOFReason);
    form.append("RequestData", JSON.stringify(PostData));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        // _token: PostSetupFormConfigs._token,
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(
            EditWOFReason(
              reasonOfWriteOff,
              setreasonOfWriteOff,
              setAction,
              actions
            )
          );
        } else if (response.data.responseCode === 200) {
          console.log(response);
          if (response.data.responseResult.recordFound === true) {
            console.log(response.data.responseResult);
            setreasonOfWriteOff({
              ...reasonOfWriteOff,
              ID: null,
              WOFStatus: 4,
              Title: "",
            });
            setAction({
              ...actions,
              update: false,
            });
            dispatch(
              ShowNotification(response.data.responseResult.recordMessage)
            );
          } else {
            dispatch(BorrowerTypeFail(response.data));
          }
        } else {
          dispatch(BorrowerTypeFail(response.data));
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());
        console.log(response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};
const DeleteWOFReason = (
  reasonOfWriteOff,
  setreasonOfWriteOff,
  setIsModalVisible
) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    let PostData = { ID: reasonOfWriteOff.ID };
    dispatch(setupFormInit());
    console.log(PostData);
    let form = new FormData();
    form.append("RequestMethod", PostSetupFormConfigs.DeleteWOFReason);
    form.append("RequestData", JSON.stringify(PostData));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        // _token: PostSetupFormConfigs._token,
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(
            DeleteWOFReason(
              reasonOfWriteOff,
              setreasonOfWriteOff,
              setIsModalVisible
            )
          );
        } else if (response.data.responseCode === 200) {
          console.log(response);
          if (response.data.responseResult.recordFound === true) {
            console.log(response.data.responseResult);
            setreasonOfWriteOff({
              ...reasonOfWriteOff,
              ID: null,
              WOFStatus: 4,
              Title: "",
            });
            dispatch(
              ShowNotification(response.data.responseResult.recordMessage)
            );
            setIsModalVisible(false);
          } else {
            console.log(response.data.responseResult);
            setIsModalVisible(false);
            dispatch(BorrowerTypeFail(response.data));
          }
        } else {
          dispatch(BorrowerTypeFail(response.data));
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());
        console.log(response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};
const ApprovalReasonSuccess = (response) => {
  return {
    type: actions.GET_APPROVAL_REASON_SUCCESS,
    response: response,
  };
};
const GetApprovalReason = () => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", GetSetupFormConfigs.GetApprovalReason);
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        // _token: GetSetupFormConfigs._token,
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(GetApprovalReason());
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.recordFound === true) {
            let FinalArray = response.data.responseResult.list.map(
              (item, index) => {
                return { ...item, key: index };
              }
            );
            dispatch(ApprovalReasonSuccess(FinalArray));
          } else {
            dispatch(BorrowerTypeFail(response.data));
          }
        } else {
          dispatch(BorrowerTypeFail(response.data));
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());
        console.log(response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};
const AddApprovalReason = (approvalReason, setIsModalVisible) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    let PostData = {
      WOFStatus: approvalReason.WOFStatus,
      Title: `${approvalReason.Title}`,
    };
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", PostSetupFormConfigs.AddApprovalReason);
    form.append("RequestData", JSON.stringify(PostData));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        // _token: PostSetupFormConfigs._token,
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(AddApprovalReason(approvalReason, setIsModalVisible));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.recordFound === true) {
            console.log(response.data.responseResult);
            dispatch(
              ShowNotification(response.data.responseResult.recordMessage)
            );
            setIsModalVisible(false);
          } else {
            console.log(response.data.responseResult);
            setIsModalVisible(false);
            dispatch(BorrowerTypeFail(response.data));
          }
        } else {
          dispatch(BorrowerTypeFail(response.data));
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());
        console.log(response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};
const EditApprovalReason = (
  approvalReason,
  setapprovalReason,
  setAction,
  actions
) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    let PostData = {
      ID: approvalReason.ID,
      WOFStatus: approvalReason.WOFStatus,
      Title: `${approvalReason.Title}`,
    };
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", PostSetupFormConfigs.UpdateApprovalReason);
    form.append("RequestData", JSON.stringify(PostData));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        // _token: PostSetupFormConfigs._token,
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(
            EditApprovalReason(
              approvalReason,
              setapprovalReason,
              setAction,
              actions
            )
          );
        } else if (response.data.responseCode === 200) {
          console.log(response);
          if (response.data.responseResult.recordFound === true) {
            console.log(response.data.responseResult);
            setapprovalReason({
              ...approvalReason,
              ID: null,
              WOFStatus: 4,
              Title: "",
            });
            setAction({
              ...actions,
              update: false,
            });
            dispatch(
              ShowNotification(response.data.responseResult.recordMessage)
            );
          } else {
            dispatch(BorrowerTypeFail(response.data));
          }
        } else {
          dispatch(BorrowerTypeFail(response.data));
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());
        console.log(response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};
const DeleteApprovalReason = (
  approvalReason,
  setapprovalReason,
  setIsModalVisible
) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    let PostData = { ID: approvalReason.ID };
    dispatch(setupFormInit());
    console.log(PostData);
    let form = new FormData();
    form.append("RequestMethod", PostSetupFormConfigs.DeleteApprovalReason);
    form.append("RequestData", JSON.stringify(PostData));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        // _token: PostSetupFormConfigs._token,
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(
            DeleteApprovalReason(
              approvalReason,
              setapprovalReason,
              setIsModalVisible
            )
          );
        } else if (response.data.responseCode === 200) {
          console.log(response);
          if (response.data.responseResult.recordFound === true) {
            console.log(response.data.responseResult);
            setapprovalReason({
              ...approvalReason,
              ID: null,
              WOFStatus: 4,
              Title: "",
            });
            dispatch(
              ShowNotification(response.data.responseResult.recordMessage)
            );
            setIsModalVisible(false);
          } else {
            console.log(response.data.responseResult);
            setIsModalVisible(false);
            dispatch(BorrowerTypeFail(response.data));
          }
        } else {
          dispatch(BorrowerTypeFail(response.data));
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());
        console.log(response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};
const RejectionReasonSuccess = (response) => {
  return {
    type: actions.GET_REJECTION_REASON_SUCCESS,
    response: response,
  };
};
const GetRejectionReason = () => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", GetSetupFormConfigs.GetRejectionReason);
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        // _token: GetSetupFormConfigs._token,
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(GetRejectionReason());
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.recordFound === true) {
            let FinalArray = response.data.responseResult.list.map(
              (item, index) => {
                return { ...item, key: index };
              }
            );
            dispatch(RejectionReasonSuccess(FinalArray));
          } else {
            dispatch(BorrowerTypeFail(response.data));
          }
        } else {
          dispatch(BorrowerTypeFail(response.data));
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());
        console.log(response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};
const AddRejectionReason = (rejectionReason, setIsModalVisible) => {
  let token = JSON.parse(localStorage.getItem("token"));
  console.log("AddRejectionReason", rejectionReason);
  return (dispatch) => {
    let PostData = {
      WOFStatus: rejectionReason.WOFStatus,
      Title: `${rejectionReason.Title}`,
    };
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", PostSetupFormConfigs.AddRejectionReason);
    form.append("RequestData", JSON.stringify(PostData));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        // _token: PostSetupFormConfigs._token,
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(AddRejectionReason(rejectionReason, setIsModalVisible));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.recordFound === true) {
            console.log(response.data.responseResult);
            dispatch(
              ShowNotification(response.data.responseResult.recordMessage)
            );
            setIsModalVisible(false);
          } else {
            console.log(response.data.responseResult);
            setIsModalVisible(false);
            dispatch(BorrowerTypeFail(response.data));
          }
        } else {
          dispatch(BorrowerTypeFail(response.data));
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());
        console.log(response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};
const EditRejectionReason = (
  rejectionReason,
  setrejectionReason,
  setAction,
  actions
) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    let PostData = {
      ID: rejectionReason.ID,
      WOFStatus: rejectionReason.WOFStatus,
      Title: `${rejectionReason.Title}`,
    };
    console.log("PostData", PostData);
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", PostSetupFormConfigs.UpdateRejectionReason);
    form.append("RequestData", JSON.stringify(PostData));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        // _token: PostSetupFormConfigs._token,
        _token: token,
      },
    })
      .then(async (response) => {
        console.log("PostData", response);

        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(
            EditRejectionReason(
              rejectionReason,
              setrejectionReason,
              setAction,
              actions
            )
          );
        } else if (response.data.responseCode === 200) {
          console.log(response);
          if (response.data.responseResult.recordFound === true) {
            console.log(response.data.responseResult);
            setrejectionReason({
              ...rejectionReason,
              ID: null,
              WOFStatus: 4,
              Title: "",
            });
            setAction({
              ...actions,
              update: false,
            });
            dispatch(
              ShowNotification(response.data.responseResult.recordMessage)
            );
          } else {
            dispatch(BorrowerTypeFail(response.data));
          }
        } else {
          dispatch(BorrowerTypeFail(response.data));
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());
        console.log(response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};
const DeleteRejectionReason = (
  rejectionReason,
  setrejectionReason,
  setIsModalVisible
) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    let PostData = { ID: rejectionReason.ID };
    dispatch(setupFormInit());
    console.log(PostData);
    let form = new FormData();
    form.append("RequestMethod", PostSetupFormConfigs.DeleteRejectionReason);
    form.append("RequestData", JSON.stringify(PostData));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        // _token: PostSetupFormConfigs._token,
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(
            DeleteRejectionReason(
              rejectionReason,
              setrejectionReason,
              setIsModalVisible
            )
          );
        } else if (response.data.responseCode === 200) {
          console.log(response);
          if (response.data.responseResult.recordFound === true) {
            console.log(response.data.responseResult);
            setrejectionReason({
              ...rejectionReason,
              ID: null,
              WOFStatus: 4,
              Title: "",
            });
            dispatch(
              ShowNotification(response.data.responseResult.recordMessage)
            );
            setIsModalVisible(false);
          } else {
            console.log(response.data.responseResult);
            setIsModalVisible(false);
            dispatch(BorrowerTypeFail(response.data));
          }
        } else {
          dispatch(BorrowerTypeFail(response.data));
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());
        console.log(response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};
const SearchBorrowerType = (Title) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(setupFormInit());
    let PostData = { Title: `${Title}` };
    let form = new FormData();
    form.append("RequestMethod", SearchSetupFormConfigs.SearchBorrowerType);
    form.append("RequestData", JSON.stringify(PostData));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        // _token: SearchSetupFormConfigs._token,
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(SearchBorrowerType(Title));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.recordFound === true) {
            let FinalArray = response.data.responseResult.list.map(
              (item, index) => {
                return { ...item, key: index };
              }
            );
            dispatch(BorrowerTypeSuccess(FinalArray));
          } else {
            dispatch(BorrowerTypeFail(response.data));
          }
        } else {
          dispatch(BorrowerTypeFail(response.data));
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());
        console.log(response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};
const SearchManagementUnit = (Title) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(setupFormInit());
    let PostData = { Title: `${Title}` };
    let form = new FormData();
    form.append("RequestMethod", SearchSetupFormConfigs.SearchManagementUnit);
    form.append("RequestData", JSON.stringify(PostData));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        // _token: SearchSetupFormConfigs._token,
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(SearchManagementUnit(Title));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.recordFound === true) {
            let FinalArray = response.data.responseResult.list.map(
              (item, index) => {
                return { ...item, key: index };
              }
            );
            dispatch(ManagementUnitSuccess(FinalArray));
          } else {
            dispatch(BorrowerTypeFail(response.data));
          }
        } else {
          dispatch(BorrowerTypeFail(response.data));
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());
        console.log(response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};
const SearchAddvanceClassification = (Title) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(setupFormInit());
    let PostData = { Title: `${Title}` };
    let form = new FormData();
    form.append(
      "RequestMethod",
      SearchSetupFormConfigs.SearchAdvanceClassification
    );
    form.append("RequestData", JSON.stringify(PostData));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        // _token: SearchSetupFormConfigs._token,
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(SearchAddvanceClassification(Title));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.recordFound === true) {
            let FinalArray = response.data.responseResult.list.map(
              (item, index) => {
                return { ...item, key: index };
              }
            );
            dispatch(AdvanceClassificationSuccess(FinalArray));
          } else {
            dispatch(BorrowerTypeFail(response.data));
          }
        } else {
          dispatch(BorrowerTypeFail(response.data));
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());
        console.log(response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};
const SearchNatureOfCharge = (Title) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(setupFormInit());
    let PostData = { Title: `${Title}` };
    let form = new FormData();
    form.append("RequestMethod", SearchSetupFormConfigs.SearchNatureofCharge);
    form.append("RequestData", JSON.stringify(PostData));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        // _token: SearchSetupFormConfigs._token,
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(SearchNatureOfCharge(Title));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.recordFound === true) {
            let FinalArray = response.data.responseResult.list.map(
              (item, index) => {
                return { ...item, key: index };
              }
            );
            dispatch(NatureofChargeSuccess(FinalArray));
          } else {
            dispatch(BorrowerTypeFail(response.data));
          }
        } else {
          dispatch(BorrowerTypeFail(response.data));
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());
        console.log(response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};
const SearchNatureOfSecurity = (Title) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(setupFormInit());
    let PostData = { Title: `${Title}` };
    let form = new FormData();
    form.append("RequestMethod", SearchSetupFormConfigs.SearchNatureOfSecurity);
    form.append("RequestData", JSON.stringify(PostData));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        // _token: SearchSetupFormConfigs._token,
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(SearchNatureOfSecurity(Title));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.recordFound === true) {
            let FinalArray = response.data.responseResult.list.map(
              (item, index) => {
                return { ...item, key: index };
              }
            );
            dispatch(NatureOfSecuritySuccess(FinalArray));
          } else {
            dispatch(BorrowerTypeFail(response.data));
          }
        } else {
          dispatch(BorrowerTypeFail(response.data));
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());
        console.log(response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};
const SearchWOFReason = (Title) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(setupFormInit());
    let PostData = { Title: `${Title}` };
    let form = new FormData();
    form.append("RequestMethod", SearchSetupFormConfigs.SearchWOFReason);
    form.append("RequestData", JSON.stringify(PostData));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        // _token: SearchSetupFormConfigs._token,
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(SearchWOFReason(Title));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.recordFound === true) {
            let FinalArray = response.data.responseResult.list.map(
              (item, index) => {
                return { ...item, key: index };
              }
            );
            dispatch(WOFReasonSuccess(FinalArray));
          } else {
            dispatch(BorrowerTypeFail(response.data));
          }
        } else {
          dispatch(BorrowerTypeFail(response.data));
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());
        console.log(response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};
const SearchApprovalReason = (Title) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(setupFormInit());
    let PostData = { Title: `${Title}` };
    let form = new FormData();
    form.append("RequestMethod", SearchSetupFormConfigs.SearchApprovalReason);
    form.append("RequestData", JSON.stringify(PostData));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        // _token: SearchSetupFormConfigs._token,
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(SearchApprovalReason(Title));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.recordFound === true) {
            let FinalArray = response.data.responseResult.list.map(
              (item, index) => {
                return { ...item, key: index };
              }
            );
            dispatch(ApprovalReasonSuccess(FinalArray));
          } else {
            dispatch(BorrowerTypeFail(response.data));
          }
        } else {
          dispatch(BorrowerTypeFail(response.data));
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());
        console.log(response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};
const SearchRejectionReason = (Title) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(setupFormInit());
    let PostData = { Title: `${Title}` };
    let form = new FormData();
    form.append("RequestMethod", SearchSetupFormConfigs.SearchRejectionReason);
    form.append("RequestData", JSON.stringify(PostData));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        // _token: SearchSetupFormConfigs._token,
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(SearchRejectionReason(Title));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.recordFound === true) {
            let FinalArray = response.data.responseResult.list.map(
              (item, index) => {
                return { ...item, key: index };
              }
            );
            dispatch(RejectionReasonSuccess(FinalArray));
          } else {
            dispatch(BorrowerTypeFail(response.data));
          }
        } else {
          dispatch(BorrowerTypeFail(response.data));
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());
        console.log(response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};
const ApprovalFlowSuccess = (response) => {
  return {
    type: actions.GET_APPROVAL_FLOW_SUCCESS,
    response: response,
  };
};
const GetApprovalFlow = () => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", GetSetupFormConfigs.GetApprovalFlow);
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        // _token: GetSetupFormConfigs._token,
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(GetApprovalFlow());
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.recordFound === true) {
            let FinalArray = response.data.responseResult.list.map(
              (item, index) => {
                return { ...item, key: index };
              }
            );
            dispatch(ApprovalFlowSuccess(FinalArray));
          } else {
            dispatch(BorrowerTypeFail(response.data));
          }
        } else {
          dispatch(BorrowerTypeFail(response.data));
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());
        console.log(response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};
const DeleteApprovalFlow = (ID) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(setupFormInit());
    console.log(ID);
    let form = new FormData();
    form.append("RequestMethod", PostSetupFormConfigs.DeleteApprovalFlow);
    form.append("RequestData", JSON.stringify({ ID: ID }));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        // _token: PostSetupFormConfigs._token,
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(DeleteApprovalFlow(ID));
        } else if (response.data.responseCode === 200) {
          console.log(response);
          if (response.data.responseResult.recordFound === true) {
            console.log(response.data.responseResult);
            // dispatch(ShowNotification(response.data.responseResult.recordMessage))
          } else {
            dispatch(BorrowerTypeFail(response.data));
          }
        } else {
          dispatch(BorrowerTypeFail(response.data));
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());
        console.log(response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};
const SearchApprovalFlow = (ApprovalFlowName, ApprovalFlowDescription) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(setupFormInit());
    let PostData = {
      ApprovalFlowName: `${ApprovalFlowName}`,
      ApprovalFlowDescription: `${ApprovalFlowDescription}`,
    };
    let form = new FormData();
    form.append("RequestMethod", SearchSetupFormConfigs.SearchApprovalFlow);
    form.append("RequestData", JSON.stringify(PostData));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        // _token: SearchSetupFormConfigs._token,
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(
            SearchApprovalFlow(ApprovalFlowName, ApprovalFlowDescription)
          );
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.recordFound === true) {
            let FinalArray = response.data.responseResult.list.map(
              (item, index) => {
                return { ...item, key: index };
              }
            );
            dispatch(ApprovalFlowSuccess(FinalArray));
          } else {
            dispatch(BorrowerTypeFail(response.data));
          }
        } else {
          dispatch(BorrowerTypeFail(response.data));
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());
        console.log(response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};
const ApprovalFlowForEditSuccess = (
  ApprovalFlowsForEdit,
  ExistingUserList,
  RemainingUserList
) => {
  return {
    type: actions.GET_APPROVAL_FLOW_FOR_EDIT_SUCCESS,
    ApprovalFlowsForEdit: ApprovalFlowsForEdit,
    ExistingUserList: ExistingUserList,
    RemainingUserList: RemainingUserList,
  };
};
const GetApprovalFlowForEdit = (Id) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    let form = new FormData();
    form.append("RequestMethod", GetSetupFormConfigs.GetApprovalFlowForEdit);
    form.append("RequestData", JSON.stringify({ ID: Id }));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        // _token: GetSetupFormConfigs._token,
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(GetApprovalFlowForEdit(Id));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.recordFound === true) {
            let RemaingUserList =
              response.data.responseResult.remainingUserList.map(
                (item, index) => {
                  return {
                    ...item,
                    key: index,
                    Fullname: item.firstName + " " + item.lastName,
                  };
                }
              );
            let ExistingUserList =
              response.data.responseResult.existingUserList.map(
                (item, index) => {
                  return {
                    ...item,
                    key: index,
                    Fullname: item.firstName + " " + item.lastName,
                  };
                }
              );
            dispatch(
              ApprovalFlowForEditSuccess(
                response.data.responseResult.approvalFlow,
                ExistingUserList,
                RemaingUserList
              )
            );
          } else {
            dispatch(BorrowerTypeFail(response.data));
          }
        } else {
          dispatch(BorrowerTypeFail(response.data));
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());
        console.log(response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};
const ApprovalFlowForEdit = (ExistingUserList, RemainingUserList) => {
  return {
    type: actions.ACTIONS_APPROVAL_FLOW_FOR_EDIT_SUCCESS,
    ExistingUserList: ExistingUserList,
    RemainingUserList: RemainingUserList,
  };
};
const UpdateApprovalFlowForEdit = (PostData) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    let form = new FormData();
    form.append(
      "RequestMethod",
      PostSetupFormConfigs.UpdateApprovalFlowForUser
    );
    form.append("RequestData", JSON.stringify(PostData));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        // _token: GetSetupFormConfigs._token,
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(UpdateApprovalFlowForEdit(PostData));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.recordFound === true) {
            let RemaingUserList =
              response.data.responseResult.remainingUserList.map(
                (item, index) => {
                  return {
                    ...item,
                    key: index,
                    Fullname: item.firstName + " " + item.lastName,
                  };
                }
              );
            let ExistingUserList =
              response.data.responseResult.existingUserList.map(
                (item, index) => {
                  return {
                    ...item,
                    key: index,
                    Fullname: item.firstName + " " + item.lastName,
                  };
                }
              );
            console.log(response.data.responseResult);
            dispatch(ApprovalFlowForEdit(ExistingUserList, RemaingUserList));
          } else {
            dispatch(ApprovalFlowForEdit({}, [], []));
          }
        } else {
          dispatch(BorrowerTypeFail(response.data));
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());
        console.log(response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};
const DeleteApprovalFlowForEdit = (updateApprovalFlowForEdit) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    let PostData = {
      ID: updateApprovalFlowForEdit.ID,
      UserID: updateApprovalFlowForEdit.UserID,
    };
    let form = new FormData();
    console.log(PostData);
    form.append(
      "RequestMethod",
      PostSetupFormConfigs.DeleteApprovalFlowForUser
    );
    form.append("RequestData", JSON.stringify(PostData));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        // _token: GetSetupFormConfigs._token,
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(DeleteApprovalFlowForEdit(updateApprovalFlowForEdit));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.recordFound === true) {
            let RemaingUserList =
              response.data.responseResult.remainingUserList.map(
                (item, index) => {
                  return {
                    ...item,
                    key: index,
                    Fullname: item.firstName + " " + item.lastName,
                  };
                }
              );
            let ExistingUserList =
              response.data.responseResult.existingUserList.map(
                (item, index) => {
                  return {
                    ...item,
                    key: index,
                    Fullname: item.firstName + " " + item.lastName,
                  };
                }
              );
            console.log(response.data.responseResult);
            dispatch(ApprovalFlowForEdit(ExistingUserList, RemaingUserList));
          } else {
            dispatch(ApprovalFlowForEdit({}, [], []));
          }
        } else {
          dispatch(BorrowerTypeFail(response.data));
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());
        console.log(response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};
// get reverse approval revert
const getRevertApprovedCaseBySystemAdmin = (searchData) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    let PostData = {
      DateFrom: searchData.DateFrom,
      DateTO: searchData.DateTO,
      AmountFrom: searchData.AmountFrom,
      AmountTo: searchData.AmountTo,
      MiSysCustomerCode: searchData.MiSysCustomerCode,
      BorrowserNPLCode: searchData.BorrowserNPLCode,
      CNICNumber: searchData.CNICNumber,
      NameOfSponsor: searchData.NameOfSponsor,
      AdvanceClassificationID: searchData.AdvanceClassificationID,
      ChargeOfType: searchData.ChargeOfType,
      ManagementUnitID: searchData.ManagementUnitID,
      WriteOffReason: searchData.WriteOffReason,
    };
    dispatch(setupFormInit());
    let form = new FormData();
    form.append(
      "RequestMethod",
      GetSetupFormConfigs.ViewAllRevertedCasesForSystemAdmin
    );
    form.append("RequestData", JSON.stringify(PostData));
    axios({
      method: "post",
      url: ApprovalsApi,
      data: form,
      headers: {
        // _token: GetSetupFormConfigs._token,
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(getRevertApprovedCaseBySystemAdmin(searchData));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.recordFound === true) {
            console.log("ddddddddd 2", response);
            let FinalArray = response.data.responseResult.pendingCases.map(
              (item, index) => {
                return { ...item, key: index };
              }
            );
            dispatch(viewAllRevertCasesSuccess(FinalArray));
          } else {
            dispatch(viewAllRevertCasesFail([]));
          }
        } else {
          dispatch(BorrowerTypeFail(response.data));
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());
        console.log(response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};
// List All Approved for System Admin
const getViewAllApprovedCasesForSystemAdmin = (searchData) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    let PostData = {
      DateFrom: searchData.DateFrom,
      DateTO: searchData.DateTO,
      AmountFrom: searchData.AmountFrom,
      AmountTo: searchData.AmountTo,
      MiSysCustomerCode: searchData.MiSysCustomerCode,
      BorrowserNPLCode: searchData.BorrowserNPLCode,
      CNICNumber: searchData.CNICNumber,
      NameOfSponsor: searchData.NameOfSponsor,
      AdvanceClassificationID: searchData.AdvanceClassificationID,
      ChargeOfType: searchData.ChargeOfType,
      ManagementUnitID: searchData.ManagementUnitID,
      WriteOffReason: searchData.WriteOffReason,
      WOFCode: searchData.WOFCode,
    };
    console.log(
      "getViewAllApprovedCasesForSystemAdmin",
      JSON.stringify(PostData)
    );
    dispatch(setupFormInit());
    let form = new FormData();
    form.append(
      "RequestMethod",
      GetSetupFormConfigs.ViewAllApprovedCasesForSystemAdmin
    );
    form.append("RequestData", JSON.stringify(PostData));
    axios({
      method: "post",
      url: ApprovalsApi,
      data: form,
      headers: {
        // _token: GetSetupFormConfigs._token,
        _token: token,
      },
    })
      .then(async (response) => {
        console.log("getViewAllApprovedCasesForSystemAdmin", response);

        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(getViewAllApprovedCasesForSystemAdmin(searchData));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.recordFound === true) {
            console.log("ddddddddd", response);
            let FinalArray = response.data.responseResult.pendingCases.map(
              (item, index) => {
                return { ...item, key: index };
              }
            );
            console.log("ddddddddd", FinalArray);
            dispatch(viewAllApprovedCasesSuccess(FinalArray));
          } else {
            dispatch(viewAllApprovedCasesFail([]));
          }
        } else {
          dispatch(BorrowerTypeFail(response.data));
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());
        console.log(response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};
const revertApprovedCaseBySystemAdminSuccess = (response) => {
  console.log("RevertApprovedCaseBySystemAdmin", response);
  return {
    type: actions.GET_All_APPROVED_CASES_BY_SYSTEM_ADMIN_SUCCESS,
    response: response,
  };
};
const revertApprovedCaseBySystemAdminFail = () => {};
// List All Approved for System Admin
const RevertApprovedCaseBySystemAdmin = (data, searchData) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    console.log("RevertApprovedCaseBySystemAdmin", JSON.stringify(data));
    dispatch(setupFormInit());
    let form = new FormData();
    form.append(
      "RequestMethod",
      GetSetupFormConfigs.RevertApprovedCaseBySystemAdmin
    );
    form.append("RequestData", JSON.stringify(data));
    axios({
      method: "post",
      url: ApprovalsApi,
      data: form,
      headers: {
        // _token: GetSetupFormConfigs._token,
        _token: token,
      },
    })
      .then(async (response) => {
        console.log("RevertApprovedCaseBySystemAdmin", response);

        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(RevertApprovedCaseBySystemAdmin(data));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.recordFound === true) {
            console.log("ddddddddd", response);
            dispatch(revertApprovedCaseBySystemAdminSuccess(response.data));
            if (response.data.responseResult.pendingCases !== undefined) {
              let FinalArray = response.data.responseResult.pendingCases.map(
                (item, index) => {
                  return { ...item, key: index };
                }
              );
              console.log("ddddddddd", FinalArray);
            }

            // dispatch(getViewAllApprovedCasesForSystemAdmin(searchData));
          } else {
            dispatch(BorrowerTypeFail(response.data));
          }
        } else {
          dispatch(BorrowerTypeFail(response.data));
        }
      })
      .catch((response) => {
        // dispatch(revertApprovedCaseBySystemAdminFail());
        console.log(response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};
export {
  getViewAllApprovedCasesForSystemAdmin,
  getRevertApprovedCaseBySystemAdmin,
  GetBorrowerType,
  AddBorrowerType,
  EditBorrowerType,
  DeleteBorrowerType,
  GetAdvanceClassification,
  AddAdvanceClassification,
  EditAdvanceClassification,
  DeleteAdvanceClassification,
  GetManagementUnit,
  AddManagementUnit,
  EditManagementUnit,
  DeleteManagementUnit,
  GetNatureofCharge,
  AddNatureofCharge,
  EditNatureofCharge,
  DeleteNatureofCharge,
  GetNatureOfSecurity,
  AddNatureOfSecurity,
  EditNatureOfSecurity,
  DeleteNatureOfSecurity,
  GetWOFReason,
  AddWOFReason,
  EditWOFReason,
  DeleteWOFReason,
  GetApprovalReason,
  AddApprovalReason,
  EditApprovalReason,
  DeleteApprovalReason,
  GetRejectionReason,
  AddRejectionReason,
  EditRejectionReason,
  DeleteRejectionReason,
  SearchBorrowerType,
  SearchManagementUnit,
  SearchAddvanceClassification,
  SearchNatureOfCharge,
  SearchNatureOfSecurity,
  SearchWOFReason,
  SearchApprovalReason,
  SearchRejectionReason,
  GetApprovalFlow,
  DeleteApprovalFlow,
  SearchApprovalFlow,
  GetApprovalFlowForEdit,
  UpdateApprovalFlowForEdit,
  DeleteApprovalFlowForEdit,
  HideNotification,
  ShowNotification,
  RevertApprovedCaseBySystemAdmin,
};
