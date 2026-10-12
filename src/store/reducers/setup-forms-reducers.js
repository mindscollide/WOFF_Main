import * as actions from "../action_types";

const initialState = {
  Loading: false,
  Message: "",
  Success: false,
  Fail: false,
  ShowNotification: false,
  BorrowerTypes: [],
  ClassificationOfAdvances: [],
  ManagementUnits: [],
  NatureofCharges: [],
  NatureOfSecuritys: [],
  WOFReasons: [],
  ApprovalReasons: [],
  RejectionReasons: [],
  ApprovalFlows: [],
  ApprovalFlowsForEdit: {},
  ExistingUserList: [],
  RemainingUserList: [],
  RevertUserList: [],
  ApprovedUserList: [],
  RevertUserList: [],
};

const SetupFormReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_SETUP_FORM_INIT:
      return { ...state, Loading: true };
    case actions.GET_SETUP_FORM_FAIL:
      return { ...state, Loading: false, Fail: true };
    case actions.GET_BORROWER_TYPE_SUCCESS:
      return {
        ...state,
        Loading: false,
        Success: true,
        BorrowerTypes: action.response,
      };
    case actions.ACTIONS_APPROVAL_FLOW_FOR_EDIT_SUCCESS:
      return {
        ...state,
        ExistingUserList: action.ExistingUserList,
        RemainingUserList: action.RemainingUserList,
      };
    case actions.GET_ADVANCE_CLASSIFICATION_SUCCESS:
      return {
        ...state,
        Loading: false,
        Success: true,
        ClassificationOfAdvances: action.response,
      };
    case actions.GET_MANAGEMENT_UNIT_SUCCESS:
      return {
        ...state,
        Loading: false,
        Success: true,
        ManagementUnits: action.response,
      };
    case actions.GET_NATURE_OF_CHARGE_SUCCESS:
      return {
        ...state,
        Loading: false,
        Success: true,
        NatureofCharges: action.response,
      };
    case actions.GET_NATURE_OF_SECURITY_SUCCESS:
      return {
        ...state,
        Loading: false,
        Success: true,
        NatureOfSecuritys: action.response,
      };
    case actions.GET_WRITEOFFREASON_SUCCESS:
      return {
        ...state,
        Loading: false,
        Success: true,
        WOFReasons: action.response,
      };
    case actions.GET_APPROVAL_REASON_SUCCESS:
      return {
        ...state,
        Loading: false,
        Success: true,
        ApprovalReasons: action.response,
      };
    case actions.GET_REJECTION_REASON_SUCCESS:
      return {
        ...state,
        Loading: false,
        Success: true,
        RejectionReasons: action.response,
      };
    case actions.GET_BORROWER_TYPE_FAIL:
      console.log("getViewAllApprovedCasesForSystemAdmin",action)
      return {
        ...state,
        Loading: false,
        Success: false,
        Message:
          action.responseMessage != undefined
            ? action.responseMessage
            : action.response.responseResult.recordMessage,
      };
    case actions.GET_APPROVAL_FLOW_SUCCESS:
      return {
        ...state,
        Loading: false,
        Success: true,
        ApprovalFlows: action.response,
      };
    case actions.GET_APPROVAL_FLOW_FOR_EDIT_SUCCESS:
      return {
        ...state,
        ApprovalFlowsForEdit: action.ApprovalFlowsForEdit,
        ExistingUserList: action.ExistingUserList,
        RemainingUserList: action.RemainingUserList,
      };
    case actions.HIDE:
      return { ...state, ShowNotification: false };
    case actions.SHOW:
      return { ...state, ShowNotification: true, Message: action.message };
    case actions.GET_APPROVAL_REASON_SUCCESS:
      return {
        ...state,
        Loading: false,
        Success: true,
        RevertUserList: action.response,
      };
    case actions.GET_ADVANCE_CLASSIFICATION_FAIL:
      return { ...state, Loading: false, Fail: true };
      case actions.GET_All_APPROVED_CASES_BY_SYSTEM_ADMIN_SUCCESS:
        console.log("RevertApprovedCaseBySystemAdmin",action.response.responseResult.recordMessage)
        return {
          ...state,
          Loading: false,
          Success: true,
          ShowNotification:true,
          Message: action.response.responseResult.recordMessage!==undefined?action.response.responseResult.recordMessage:null,
          ApprovedUserList:[]
        };
      case actions.GET_All_APPROVED_CASES_SUCCESS:
      return {
        ...state,
        Loading: false,
        Success: true,
        ApprovedUserList: action.response,
      };
    case actions.GET_All_APPROVED_CASES_FAIL:
      return { ...state, Loading: false, Fail: true };
    case actions.GET_All_REVERT_CASES_SUCCESS:
      return {
        ...state,
        Loading: false,
        Success: true,
        RevertUserList: action.response,
      };
    case actions.GET_All_REVERT_CASES_FAIL:
      return { ...state, Loading: false, Fail: true };
    default:
      return state;
  }
};

export default SetupFormReducer;
