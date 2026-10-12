import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  authReducer,
  findCustomerAccountDetailsFromMisysReducer,
  findCustomerFromMisysReducers,
  wofApprovalsReducers,
  writeOffCasesReducer,
  reportsReducer,
  uiReducers,
  setupFormsReducer,
  requestReducer,
} from "./reducers/index";
import * as actions from "./action_types";
const AppReducer = combineReducers({
  auth: authReducer,
  requestReducer: requestReducer,
  findCustomerFromMisys: findCustomerFromMisysReducers,
  findCustomerAccountDetailsFromMisys:
    findCustomerAccountDetailsFromMisysReducer,
  reports: reportsReducer,
  wofApprovals: wofApprovalsReducers,
  writeOffCases: writeOffCasesReducer,
  ui: uiReducers,
  setupForms: setupFormsReducer,
});
const rootReducer = (state, action) => {
  // when a logout action is dispatched it will reset redux state
  if (action.type === actions.SIGN_OUT) {
    state = undefined;
  }
  return AppReducer(state, action);
};
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
