import * as actions from "../action_types";
import { findCustomerAccountDetailsFromMisysApi } from "../../Common/Api/apis-end-points.js";
import { findCustomerAccountDetailsFromMisysConfigs } from "../../Common/Api/apis-config";
import { SomeThingWentWrong } from "./ui-actions";
import { refreshToken } from "../actions/auth-actions";
import axios from "axios";

const findCustomerAccountDetailsFromMysisInit = () => {
  return {
    type: actions.FIND_CUSTOMER_ACCOUNT_DETAILS_FROM_MYSIS_INIT,
  };
};
const findCustomerAccountDetailsFromMysisSuccess = (response) => {
  return {
    type: actions.FIND_CUSTOMER_ACCOUNT_DETAILS_FROM_MYSIS_SUCCESS,
    response: response,
  };
};
const findCustomerAccountDetailsFromMysisFail = (response) => {
  return {
    type: actions.FIND_CUSTOMER_ACCOUNT_DETAILS_FROM_MYSIS_FAIL,
    response: response,
  };
};

const findCustomerAccountDetailsFromMysis = (
  Anum,
  Mcode,
  setAccountDetails,
  AccountDetails,
  setRecoveryWriteOffSection,
  recoveryWriteOffSection
) => {
  const dataToPOST = { AccountNumber: `${Anum}`, MiSysCode: `${Mcode}` };
  console.log("async", dataToPOST);

  return (dispatch) => {
    dispatch(findCustomerAccountDetailsFromMysisInit());
    let token = JSON.parse(localStorage.getItem("token"));
    let form = new FormData();
    form.append(
      "RequestMethod",
      findCustomerAccountDetailsFromMisysConfigs.RequestMethod
    );
    form.append("RequestData", JSON.stringify(dataToPOST));

    axios({
      method: "post",
      url: findCustomerAccountDetailsFromMisysApi,
      data: form,
      headers: {
        // _token:findCustomerAccountDetailsFromMisysConfigs._token
        _token: token,
      },
    })
      .then(async (res) => {
        console.log("async", res);
        if (res.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(
            findCustomerAccountDetailsFromMysis(
              Anum,
              Mcode,
              setAccountDetails,
              AccountDetails,
              setRecoveryWriteOffSection,
              recoveryWriteOffSection
            )
          );
        } else if (res.data.responseCode === 200) {
          if (res.data.responseResult.recordFound === true) {
            let Response = res.data.responseResult;
            console.log("findCustomerAccountDetailsFromMysis", Response);
            setAccountDetails({
              ...AccountDetails,
              FacCode: Response.facilityCode,
              FacName: Response.facilityDescription,
              BranchCode: Response.branchCode,
              BranchName: Response.branchName,
              RegionCode: Response.regionCode,
              RegionName: Response.regionName,
              ABNSOutstandingPrincipal: 0,
              ABNSOutstandingNominal: 0,
              ABNSOutstandingNonAccural: 0,
              ABNSOtherCharges: 0,
              ABNSPenalInterest: 0,
              ABNSTotal: 0,
              APBSOutstandingPrincipal: 0,
              APBSOutstandingNominal: 0,
              APBSOutstandingNonAccural: 0,
              APBSOtherCharges: 0,
              APBSPenalInterest: 0,
              APBSTotal: 0,
              FRAPrincipal: Response.fraPrincipal,
              SCode: Response.saCode,
              SDescription: Response.saDescription,
              // FRAPrincipal:0,
              FRANominated: 0,
              FRANonAccural: Response.fraNonAccuralUnDebitedMarkup,
              FRAOtherCharges: Response.fraOtherCharges,
              FRAPenalInterest: 0,
              FRATotal:
                Response.fraNonAccuralUnDebitedMarkup + Response.fraPrincipal,
            });
            // setAccountSancationInfo({
            //   ...AccountSancationInfo,
            // })
            dispatch(findCustomerAccountDetailsFromMysisSuccess(Response));
            // dispatch(findCustomerAccountDetailsFromMysisFail(Response));
          } else {
            dispatch(
              findCustomerAccountDetailsFromMysisFail(res.data.responseResult)
            );
          }
        } else {
          dispatch(
            findCustomerAccountDetailsFromMysisFail(res.data.responseResult)
          );
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
      });
  };
};

export { findCustomerAccountDetailsFromMysis };
