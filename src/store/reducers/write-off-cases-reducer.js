import * as actions from "../action_types";

const initialState = {
    Loading:false,
    WriteOffData: {},
    Message:'',
    Success: false,
    ListOFWriteOff:[],
    ListOFRevertCases:[],
    ListOFPendingAndApprovedCases:[],
    EditWrite:null,
    Fail: false,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_WRITE_OFF_INIT:
        return { ...state, Loading: true };
    case actions.ADD_WRITE_OFF_SUCCESS:
        return {...state,Loading: false,Success: true,Message: "Record Saved"};
    case actions.ADD_WRITE_OFF_FAIL:
        return {...state,Loading: false,Success: false,Fail: true,Message: "Record Not Saved"};
    case actions.EDIT_WRITE_OFF_INIT:
        return { ...state,Loading: true};
    case actions.EDIT_WRITE_OFF_SUCCESS:
        return { ...state,Loading: false,EditWrite:action.response,Success:true,Message:"Record Successfully Updated"};
    case actions.EDIT_WRITE_OFF_FAIL:
        return { ...state,Loading: false,Success:false,Message:"Record Not Updated"};
    case actions.VIEW_WRITE_OFF_INIT:
        return { ...state,Loading: true};
    case actions.VIEW_WRITE_OFF_SUCCESS:
        return { ...state,Loading: false,WriteOffData:action.response};
    case actions.VIEW_WRITE_OFF_FAIL:
        return { ...state,Loading: false,Message:action.message};
    case actions.LIST_WRITE_OFF_INIT:
        return { ...state,Loading: true};
    case actions.LIST_WRITE_OFF_SUCCESS:
        return { ...state,Loading: false,ListOFWriteOff:action.response};
    case actions.LIST_WRITE_OFF_FAIL:
        return { ...state,Loading: false,ListOFWriteOff:[],Message:action.message};
        case actions.LIST_OF_VIEW_REVERT_CASE_SUCCESS:
            console.log("ListOFRevertCases",action)
            return { ...state,Loading: false,Success:true,ListOFRevertCases:action.response.pendingCases,Message:action.response.recordMessage};
        case actions.LIST_OF_VIEW_REVERT_CASE_FAIL:
            return { ...state,Loading: false,ListOFRevertCases:[],Message:action.response.message};
    case actions.DELETE_WRITE_OFF_INIT:
        return { ...state,Loading: true};
    case actions.DELETE_WRITE_OFF_SUCCESS:
        return { ...state,Loading: false,Success:true,Message:"Record Succesfully Deleted"};
    case actions.DELETE_WRITE_OFF_FAIL:
        return { ...state,Loading: false,Success:false,Message:"Record Not Deleted"};
    case actions.LIST_OFF_PENDING_AND_APPROVED_CASES_SUCCESS:
        return { ...state,Loading: false,ListOFPendingAndApprovedCases:action.response};
    case actions.LIST_OFF_PENDING_AND_APPROVED_CASES_FAIL:
        return { ...state,ListOFPendingAndApprovedCases:action.response,Message:action.message};
    case actions.HIDE:
        return { ...state,Success:false};
    case actions.SHOW:
        return { ...state,Success:true};
    case actions.NULL_STATE:
        return { ...state,WriteOffData:{}};    
    default:
      return state;
  }
};

export default reducer;