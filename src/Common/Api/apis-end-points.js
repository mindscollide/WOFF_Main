// this is our base url or machine api
const baseURL = "http://192.168.18.243"; // TRESMARK (WOF + Fraud IIS server)

// this is our service URLs
const authenticationServiceURL = ":9100/WOF_Auth"; // route renamed from /ERM_Auth

const findCustomerFromMisysServiceURL = ":9105/WOF_Search";
const findCustomerAccountDetailsFromMisysServiceURL = ":9105/WOF_Search";
const WriteOffServiceURL = ":9102/WOF_Persist";
const ApprovalsServiceURL = ":9103/WOF_Approvals";
const reportsURL = ":9104/WOF_Reports";
const SetupFormsUrl = ":9101/WOF_Admin";
const downloadExcelURL = ":9104/ExcelReport";
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
