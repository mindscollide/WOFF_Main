import * as actions from "../action_types";

const initialState = {
  completeReport: [],
  completeReportConsolidate: [],
  creditPoliocyReport: [],
  balanceSheetReport: [],
  isLoading: null,
  isSuccess: null,
  isFail: null,
  errorMessage: null,
  isRecordFound:false,
  recordMessage: ""
};

const reportsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.COMPLETE_REPORT_INIT:
      return { ...state, isLoading: true };
    case actions.COMPLETE_REPORT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        isFail: false,
        completeReport: action.response.responseResult.allIndividualCases,
        completeReportConsolidate: [],
        creditPoliocyReport: [],
        balanceSheetReport: [],
        isRecordFound: action.response.responseResult.recordFound,
        recordMessage:  action.response.responseResult.recordMessage
      };
    case actions.COMPLETE_REPORT_FAIL:
      console.log("completeReport",action.response.responseMessage)
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        isFail: true,
        completeReport: action.response.responseResult,
        completeReportConsolidate: [],
        creditPoliocyReport: [],
        balanceSheetReport: [],
        isRecordFound: action.response.responseResult.recordFound,
        recordMessage:  action.response.responseResult.recordMessage!=undefined? action.response.responseResult.recordMessage:action.response.responseMessage

      };
      case actions.COMPLETE_REPORT_CONSOLIDATE_SUCCESS:
        return {
          ...state,
          isLoading: false,
          isSuccess: true,
          isFail: false,
          completeReportConsolidate: action.response.responseResult.allIndividualCases,
          completeReport: [],
          creditPoliocyReport: [],
          balanceSheetReport: [],
          isRecordFound: action.response.responseResult.recordFound,
          recordMessage:  action.response.responseResult.recordMessage
        };
        case actions.COMPLETE_REPORT_CONSOLIDATE_FAIL:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        isFail: true,
        completeReportConsolidate: action.response.responseResult,
        completeReport: [],
        creditPoliocyReport: [],
        balanceSheetReport: [],
        isRecordFound: action.response.responseResult.recordFound,
        recordMessage:  action.response.responseResult.recordMessage!=undefined? action.response.responseResult.recordMessage:action.response.responseMessage

      };
    case actions.CREDIT_POLICY_REPORT_INIT:
      return {
        ...state,
        isLoading: true,
      };
    case actions.CREDIT_POLICY_REPORT_SUCCESS:
      console.log("")
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        isFail: false,
        creditPoliocyReport: action.response.responseResult.companyWiseCases,
        completeReport: [],
        completeReportConsolidate: [],
        balanceSheetReport: [],
        isRecordFound: action.response.responseResult.recordFound,
        recordMessage:  action.response.responseResult.recordMessage
      };
    case actions.CREDIT_POLICY_REPORT_FAIL:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        isFail: true,
        completeReport: [],
        completeReportConsolidate: [],
        creditPoliocyReport: [],
        balanceSheetReport: [],
        isRecordFound: action.response.responseResult.recordFound,
        recordMessage:  action.response.responseResult.recordMessage!=undefined? action.response.responseResult.recordMessage:action.response.responseMessage

      };
    
    case actions.BALANCE_SHEET_REPORT_INIT:
      return { ...state, isLoading: true };
    case actions.BALANCE_SHEET_REPORT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        isFail: false,
        completeReport: [],
        completeReportConsolidate: [],
        creditPoliocyReport: [],
        balanceSheetReport: action.response.responseResult.balanceSheetRecords,
        isRecordFound: action.response.responseResult.recordFound,
        recordMessage:  action.response.responseResult.recordMessage
      };
    case actions.BALANCE_SHEET_REPORT_FAIL:
      return {
        ...state,
        recordMessage:  action.response.responseResult.recordMessage,
        isLoading: false,
        isSuccess: false,
        isFail: true,
        completeReport: [],
        completeReportConsolidate: [],
        creditPoliocyReport: [],
        balanceSheetReport: [],
      };
    default:
      return state;
  }
};

export default reportsReducer;
