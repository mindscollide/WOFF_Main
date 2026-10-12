import * as actions from "../action_types";
import { refreshToken } from "../actions/auth-actions";
import axios from "axios";

import {
  reportsApi,
  downloadExcelFile,
} from "../../Common/Api/apis-end-points";
import {
  completeReportConfigs,
  CompleteReportByWOFCode,
  creditPolicyReportConfigs,
  balanceSheetReportConfigs,
  completeReportExcelConfigs,
  creditReportExcelConfigs,
  balanceReportExcelConfigs,
  CompleteReportExcelByWOFCode,
  ApprovedCasesSystemAdminReportExcelConfigs,
} from "../../Common/Api/apis-config";
import { SomeThingWentWrong } from "./ui-actions";

//   COMPLETE REPORT ACTIONS
const completeReportInit = () => {
  return {
    type: actions.COMPLETE_REPORT_INIT,
  };
};

const completeReportSuccess = (response) => {
  return {
    type: actions.COMPLETE_REPORT_SUCCESS,
    response: response,
  };
};
const completeReportFauilure = (response) => {
  return {
    type: actions.COMPLETE_REPORT_FAIL,
    response: response,
  };
};
const completeReportConsolidateSuccess = (response) => {
  return {
    type: actions.COMPLETE_REPORT_CONSOLIDATE_SUCCESS,
    response: response,
  };
};
const completeReportConsolidateFauilure = (response) => {
  return {
    type: actions.COMPLETE_REPORT_CONSOLIDATE_FAIL,
    response: response,
  };
};

const completeReport = (data) => {
  let token = JSON.parse(localStorage.getItem("token"));
  console.log(JSON.stringify(data));
  let form = new FormData();
  form.append("RequestMethod", completeReportConfigs.RequestMethod);
  form.append("RequestData", JSON.stringify(data));
  return (dispatch) => {
    dispatch(completeReportInit());
    axios({
      method: "post",
      url: reportsApi,
      data: form,
      headers: {
        // _token: completeReportConfigs._token,
        _token: token,
      },
    })
      .then(async (response) => {
        console.log("completeReport", response);
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(completeReport(data));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.recordFound) {
            console.log("completeReport", response);
            dispatch(completeReportSuccess(response.data));
          } else {
            dispatch(completeReportFauilure(response.data));
          }
          console.log(response.data);
        } else {
          console.log("completeReport", response.data.responseMessage);

          dispatch(completeReportFauilure(response.data));
        }
      })
      .catch((response) => {
        console.log(response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};
const completeReportConsolidateExcel = (data) => {
  let token = JSON.parse(localStorage.getItem("token"));
  console.log("datadata", JSON.stringify(data));
  let form = new FormData();
  form.append("RequestMethod", CompleteReportExcelByWOFCode.RequestMethod);
  form.append("RequestData", JSON.stringify(data));
  return (dispatch) => {
    dispatch(downloadExcelFileInit());
    axios({
      method: "post",
      url: downloadExcelFile,
      data: form,
      headers: {
        // _token: completeReportExcelConfigs._token,
        _token: token,
        "Content-Disposition": "attachment; filename=template.xlsx",
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
      responseType: "arraybuffer",
    })
      .then(async (response) => {
        console.log("datadata", response);

        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(completeReportConsolidateExcel(data));
        } else if (response.status === 200) {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute(
            "download",
            "complete-report_consolidate-by-WOF-code.xlsx"
          );
          document.body.appendChild(link);
          link.click();
          console.log(response);
        } else {
          dispatch(downloadExcelFileFail());
        }
      })
      .catch((response) => {
        console.log(response);
        dispatch(downloadExcelFileFail());
        dispatch(SomeThingWentWrong(response));
      });
  };
};
const completeReportConsolidate = (data) => {
  let token = JSON.parse(localStorage.getItem("token"));
  console.log("datadata", JSON.stringify(data));
  let form = new FormData();
  form.append("RequestMethod", CompleteReportByWOFCode.RequestMethod);
  form.append("RequestData", JSON.stringify(data));
  return (dispatch) => {
    dispatch(completeReportInit());
    axios({
      method: "post",
      url: reportsApi,
      data: form,
      headers: {
        // _token: completeReportConfigs._token,
        _token: token,
      },
    })
      .then(async (response) => {
        console.log("datadata", response);

        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(completeReportConsolidate(data));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.recordFound) {
            dispatch(completeReportConsolidateSuccess(response.data));
          } else {
            dispatch(completeReportConsolidateFauilure(response.data));
          }
          console.log(response.data);
        } else {
          dispatch(completeReportFauilure(response.data));
        }
      })
      .catch((response) => {
        console.log(response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};
//   CREDIT POLICY REPORT ACTIONS

const creditPolicyReportInit = () => {
  return {
    type: actions.CREDIT_POLICY_REPORT_INIT,
  };
};

const creditPolicyReportSuccess = (response) => {
  return {
    type: actions.CREDIT_POLICY_REPORT_SUCCESS,
    response: response,
  };
};

const creditPolicyReportFauilure = (response) => {
  return {
    type: actions.CREDIT_POLICY_REPORT_FAIL,
    response: response,
  };
};

const creditPolicyReport = (data) => {
  let token = JSON.parse(localStorage.getItem("token"));
  console.log(JSON.stringify(data));
  let form = new FormData();
  form.append("RequestMethod", creditPolicyReportConfigs.RequestMethod);
  form.append("RequestData", JSON.stringify(data));
  return (dispatch) => {
    dispatch(creditPolicyReportInit());
    axios({
      method: "post",
      url: reportsApi,
      data: form,
      headers: {
        // _token: creditPolicyReportConfigs._token,
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(creditPolicyReport(data));
        } else if (response.data.responseCode === 200) {
          console.log("fgfgffg", response);
          if (response.data.responseResult.recordFound === true) {
            dispatch(creditPolicyReportSuccess(response.data));
          } else {
            dispatch(creditPolicyReportFauilure(response.data));
          }
        } else {
          dispatch(completeReportFauilure(response.data));
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
      });
  };
};

//   BALANCE SHEET REPORT ACTIONS
const balanceSheetReportInit = () => {
  return {
    type: actions.BALANCE_SHEET_REPORT_INIT,
  };
};

const balanceSheetReportSuccess = (response) => {
  return {
    type: actions.BALANCE_SHEET_REPORT_SUCCESS,
    response: response,
  };
};

const balanceSheetReportFauilure = (response) => {
  return {
    type: actions.BALANCE_SHEET_REPORT_FAIL,
    response: response,
  };
};

const balanceSheetReport = (data) => {
  let token = JSON.parse(localStorage.getItem("token"));
  console.log("balanceSheetReport", JSON.stringify(data));
  let form = new FormData();
  form.append("RequestMethod", balanceSheetReportConfigs.RequestMethod);
  form.append("RequestData", JSON.stringify(data));
  return (dispatch) => {
    dispatch(balanceSheetReportInit());
    axios({
      method: "post",
      url: reportsApi,
      data: form,
      headers: {
        // _token: balanceSheetReportConfigs._token,
        _token: token,
      },
    })
      .then(async (response) => {
        console.log("balanceSheetReport", response);
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(balanceSheetReport(data));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.recordFound === true) {
            dispatch(balanceSheetReportSuccess(response.data));
          } else {
            dispatch(balanceSheetReportFauilure(response.data));
          }
        } else {
          dispatch(completeReportFauilure(response.data));
        }
      })
      .catch((response) => {
        console.log(response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};

const downloadExcelFileInit = () => {
  return {
    type: actions.DOWNLOAD_EXCEL_FILE_INIT,
  };
};
const downloadExcelFileFail = (response) => {
  return {
    type: actions.DOWNLOAD_EXCEL_FILE_INIT,
    response: response,
  };
};

const balanceReportExcel = (data) => {
  let token = JSON.parse(localStorage.getItem("token"));
  console.log(JSON.stringify(data));
  let form = new FormData();
  form.append("RequestMethod", balanceReportExcelConfigs.RequestMethod);
  form.append("RequestData", JSON.stringify(data));
  return (dispatch) => {
    dispatch(downloadExcelFileInit());
    axios({
      method: "post",
      url: downloadExcelFile,
      data: form,
      headers: {
        // _token: balanceReportExcelConfigs._token,
        _token: token,
        "Content-Disposition": "attachment; filename=template.xlsx",
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
      responseType: "arraybuffer",
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(balanceReportExcel(data));
        } else if (response.status === 200) {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "balance-report.xlsx");
          document.body.appendChild(link);
          link.click();
          console.log(response);
        } else {
          dispatch(downloadExcelFileFail());
        }
      })
      .catch((response) => {
        console.log(response);
        dispatch(downloadExcelFileFail());
        dispatch(SomeThingWentWrong(response));
      });
  };
};
const completeReportExcel = (data, name) => {
  let token = JSON.parse(localStorage.getItem("token"));
  console.log("datadata", JSON.stringify(data));
  let form = new FormData();
  form.append("RequestMethod", completeReportExcelConfigs.RequestMethod);
  form.append("RequestData", JSON.stringify(data));
  return (dispatch) => {
    dispatch(downloadExcelFileInit());
    axios({
      method: "post",
      url: downloadExcelFile,
      data: form,
      headers: {
        // _token: completeReportExcelConfigs._token,
        _token: token,
        "Content-Disposition": "attachment; filename=template.xlsx",
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
      responseType: "arraybuffer",
    })
      .then(async (response) => {
        console.log("datadata", response);

        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(completeReportExcel(data));
        } else if (response.status === 200) {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "complete-report-account_wise.xlsx");
          document.body.appendChild(link);
          link.click();
          console.log("datadata", response);
        } else {
          dispatch(downloadExcelFileFail());
        }
      })
      .catch((response) => {
        console.log(response);
        dispatch(downloadExcelFileFail());
        dispatch(SomeThingWentWrong(response));
      });
  };
};
const creditReportExcel = (data) => {
  let token = JSON.parse(localStorage.getItem("token"));
  console.log(JSON.stringify(data));
  let form = new FormData();
  form.append("RequestMethod", creditReportExcelConfigs.RequestMethod);
  form.append("RequestData", JSON.stringify(data));
  return (dispatch) => {
    dispatch(downloadExcelFileInit());
    axios({
      method: "post",
      url: downloadExcelFile,
      data: form,
      headers: {
        // _token: creditReportExcelConfigs._token,
        _token: token,
        "Content-Disposition": "attachment; filename=template.xlsx",
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
      responseType: "arraybuffer",
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(creditReportExcel(data));
        } else if (response.status === 200) {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "credit-report.xlsx");
          document.body.appendChild(link);
          link.click();
          console.log(response);
        } else {
          dispatch(downloadExcelFileFail());
        }
      })
      .catch((response) => {
        console.log(response);
        dispatch(downloadExcelFileFail());
        dispatch(SomeThingWentWrong(response));
      });
  };
};
// for approved cases
const ApprovedCasesSystemAdminExcel = (data, name) => {
  let token = JSON.parse(localStorage.getItem("token"));
  console.log("datadata", JSON.stringify(data));
  let form = new FormData();
  form.append(
    "RequestMethod",
    ApprovedCasesSystemAdminReportExcelConfigs.RequestMethod
  );
  form.append("RequestData", JSON.stringify(data));
  return (dispatch) => {
    dispatch(downloadExcelFileInit());
    axios({
      method: "post",
      url: downloadExcelFile,
      data: form,
      headers: {
        // _token: completeReportExcelConfigs._token,
        _token: token,
        "Content-Disposition": "attachment; filename=template.xlsx",
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
      responseType: "arraybuffer",
    })
      .then(async (response) => {
        console.log("datadata", response);

        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(completeReportExcel(data));
        } else if (response.status === 200) {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "approved-cases.xlsx");
          document.body.appendChild(link);
          link.click();
          console.log("datadata", response);
        } else {
          dispatch(downloadExcelFileFail());
        }
      })
      .catch((response) => {
        console.log(response);
        dispatch(downloadExcelFileFail());
        dispatch(SomeThingWentWrong(response));
      });
  };
};
export {
  ApprovedCasesSystemAdminExcel,
  completeReport,
  creditPolicyReport,
  balanceSheetReport,
  balanceReportExcel,
  completeReportExcel,
  creditReportExcel,
  completeReportConsolidate,
  completeReportConsolidateExcel,
};
