// this is our base url or machine api
const baseURL = "http://192.168.18.241";

// this is our service URLs
const authenticationServiceURL = ":9011/ERM_Auth";

const findCustomerFromMisysServiceURL = ":9012/WOF_Search";
const findCustomerAccountDetailsFromMisysServiceURL = ":9012/WOF_Search";
const WriteOffServiceURL = ":9013/WOF_Persist";
const ApprovalsServiceURL = ":9014/WOF_Approvals";
const reportsURL = ":9015/WOF_Reports";
const SetupFormsUrl = ":9016/WOF_Admin";
const downloadExcelURL = ":9015/ExcelReport";
// this is our final Apis
const authenticationApi = baseURL + authenticationServiceURL;
const findCustomerFromMisysApi = baseURL + findCustomerFromMisysServiceURL;
const findCustomerAccountDetailsFromMisysApi =
  baseURL + findCustomerAccountDetailsFromMisysServiceURL;
const WriteOffApi = baseURL + WriteOffServiceURL;
const SetupFormApi = baseURL + SetupFormsUrl;
const ApprovalsApi = baseURL + ApprovalsServiceURL;
const reportsApi = baseURL + reportsURL;
const downloadExcelFile = baseURL + downloadExcelURL;

export {
  authenticationApi,
  findCustomerFromMisysApi,
  findCustomerAccountDetailsFromMisysApi,
  WriteOffApi,
  ApprovalsApi,
  reportsApi,
  SetupFormApi,
  downloadExcelFile,
};
