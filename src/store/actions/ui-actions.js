import * as actions from "../action_types";

const enableGoBack = () => {
  return {
    type: actions.UI_GO_BACK_ENABLE,
  };
};

const disableGoBack = () => {
  return {
    type: actions.UI_GO_BACK_DISABLE,
  };
};

const activeEdit = () => {
  return {
    type: actions.ACTIVE_EDIT,
  };
};
const SomeThingWentWrong = (response) => {
  console.log("error",response)
  return{
    type: actions.SOMETHINGWENTWRONG,
  }
}
const SomeThingWentWrongRemove = (response) => {
  console.log("error",response)
  return{
    type: actions.SOMETHINGWENTWRONGREMOVE,
  }
}
// for tab active tabs
const makeTabAvtive = () => {
  return {
    type: actions.ACTIVE_TAB,
  };
};
const makeTabDisable = () => {
  return {
    type: actions.CLOSED_TAB,
  };
};
export { enableGoBack, disableGoBack, activeEdit , SomeThingWentWrong , SomeThingWentWrongRemove,makeTabDisable,makeTabAvtive };
