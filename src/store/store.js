import { configureStore, combineReducers } from "@reduxjs/toolkit";
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
const store = configureStore({
  reducer: rootReducer,
  // This codebase predates Redux Toolkit and stores non-serializable values
  // in state — disable the dev-only checks that would otherwise flag those
  // on every action.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

export default store;
