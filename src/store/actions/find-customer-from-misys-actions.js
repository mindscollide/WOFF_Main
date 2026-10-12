import * as actions from "../action_types";
import { findCustomerFromMisysApi } from "../../Common/Api/apis-end-points.js";
import { findCustomerFromMisysConfigs } from "../../Common/Api/apis-config";
import axios from "axios";
import { borrowerTypeOptions } from "../../Common/SelectFieldOption/select-field-option";
import { SomeThingWentWrong } from "./ui-actions";
import { refreshToken } from "../actions/auth-actions";
const findCustomerFromMysisInit = () => {
  return {
    type: actions.FIND_CUSTOMER_FROM_MISYS_INIT,
  };
};
const findCustomerFromMysisSuccess = (response) => {
  return {
    type: actions.FIND_CUSTOMER_FROM_MISYS_SUCCESS,
    response: response,
  };
};

const findCustomerFromMysisFail = (response) => {
  return {
    type: actions.FIND_CUSTOMER_FROM_MISYS_FAIL,
    response: response,
  };
};
const ResetState = () => {
  return {
    type: actions.RESET_STATE,
  };
};
const findCustomerFromMysis = (
  data,
  setMisysSection,
  setAccountNumbersFromStore,
  setRecoveryWriteOffSection,
  recoveryWriteOffSection,
  setAdditionalDetailsSection,
  additionalDetailsSection,
  setSponsorOwnerDetail,
  borrowerTypeOptions,
  setMisysError,
  misysError,
  setMisysErrMsg,
  misysErrMsg
) => {
  // var dat = data.toUpperCase();
  var dataToPOST = "";
  if (data !== null && data !== undefined && data !== "") {
    dataToPOST = { MiSysCode: `${data.toUpperCase()}` };
  } else {
    dataToPOST = { MiSysCode: `${dataToPOST}` };
  }
  console.log("findCustomerFromMysis Before Data", dataToPOST);

  // console.log(dataToPOST);
  return (dispatch) => {
    dispatch(findCustomerFromMysisInit());
    let token = JSON.parse(localStorage.getItem("token"));
    console.log(token);
    let form = new FormData();
    form.append("RequestMethod", findCustomerFromMisysConfigs.RequestMethod);
    form.append("RequestData", JSON.stringify(dataToPOST));
    axios({
      method: "post",
      url: findCustomerFromMisysApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (res) => {
        console.log("findCustomerFromMysis respoone", res.data);
        if (res.data.responseCode === 417) {
          console.log("refresh");
          await dispatch(refreshToken());
          dispatch(
            findCustomerFromMysis(
              data,
              setMisysSection,
              setAccountNumbersFromStore,
              setRecoveryWriteOffSection,
              recoveryWriteOffSection,
              setAdditionalDetailsSection,
              additionalDetailsSection,
              setSponsorOwnerDetail,
              borrowerTypeOptions,
              setMisysError,
              misysError,
              setMisysErrMsg,
              misysErrMsg
            )
          );
          // }
        } else if (res.data.responseCode === 200) {
          if (res.data.responseResult.recordFound === true) {
            console.log("findCustomerFromMysis after true", res.data);

            let index2 = borrowerTypeOptions.findIndex(
              (x) => x.id === res.data.responseResult.customer.borrowerType
            );
            console.log(
              "findCustomerFromMysis for check index ",
              borrowerTypeOptions,
              index2,
              res.data.responseResult.customer
            );

            dispatch(findCustomerFromMysisSuccess(res.data));
            setMisysSection({
              MisysCode: res.data.responseResult
                ? res.data.responseResult.customer.misysCode
                : null,
              NPLCode: null,
              BorrowerName: res.data.responseResult
                ? res.data.responseResult.customer.borrowerName
                : null,
              AddressOfBorrower: res.data.responseResult
                ? res.data.responseResult.customer.addressOfBorrower
                : null,
              NTNNumber: res.data.responseResult
                ? res.data.responseResult.customer.ntnNumber
                : null,
              ManagementUnitID: null,
              // SCode: res.data.responseResult
              //   ? res.data.responseResult.customer.saCode
              //   : null,
              // SDescription: res.data.responseResult
              //   ? res.data.responseResult.customer.saDescription
              //   : null,
              BorrowerTypeID: borrowerTypeOptions[index2].title,
              iParty: res.data.responseResult
                ? res.data.responseResult.customer.iParty
                : null,
            });
            setRecoveryWriteOffSection({
              ...recoveryWriteOffSection,
              Principal: res.data.responseResult
                ? res.data.responseResult.customer.rawPrincipal
                : null,
              Nominated: 0,
              Nonaccural: res.data.responseResult
                ? res.data.responseResult.customer.rawNonAccuralUndebitedMarkup
                : null,
              DateOfRecovery: res.data.responseResult
                ? res.data.responseResult.customer.dateOfRecovery
                : null,
              OtherCharges: res.data.responseResult.customer
                ? res.data.responseResult.customer.rawOtherCharges
                : null,
              PenalInterest: 0,
              // Total: 0,
            });
            setAdditionalDetailsSection({
              ...additionalDetailsSection,
              DateOfWriteoff: res.data.responseResult.customer.dateOfWriteOff,
            });
            if (res.data.responseResult.directorList !== null) {
              console.log(
                "findCustomerFromMysis for check directorList ",
                res.data.responseResult.directorList
              );
              console.log(
                "findCustomerFromMysis for check directorList  DirectorTypeID: null  DirectorNameitem.directorName CNIC: item.directorIdentity FatherHusband item.fatherName Address: item.personalAddress,"
              );

              let DirectorsList = res.data.responseResult.directorList.map(
                (item) => {
                  return {
                    DirectorTypeID: null,
                    DirectorName: item.directorName,
                    CNIC: item.directorIdentity,
                    FatherHusband: item.fatherName,
                    Address: item.personalAddress,
                  };
                }
              );
              console.log(
                "findCustomerFromMysis for check directorList after ",
                DirectorsList
              );

              setSponsorOwnerDetail(DirectorsList);
            } else {
              setSponsorOwnerDetail([]);
            }
            if (
              res.data.responseResult.accountNumbers !== null &&
              res.data.responseResult.accountNumbers.length > 0
            ) {
              let accNum = [...res.data.responseResult.accountNumbers];
              let accNumArr = accNum.map((item) => item.accountNumber);
              setAccountNumbersFromStore([...accNumArr]);
            }
            // setMisysError(false);
            // setMisysErrMsg("");
          } else {
            console.log(
              "findCustomerFromMysis findCustomerFromMysisFail",
              res.data.responseResult
            );
            dispatch(findCustomerFromMysisFail(res.data));

            setMisysSection({
              MisysCode: dataToPOST.MiSysCode,
              NPLCode: null,
              BorrowerName: null,
              AddressOfBorrower: null,
              NTNNumber: null,
              ManagementUnitID: null,
              SCode: null,
              SDescription: null,
              BorrowerTypeID: null,
            });
            // setMisysError(true);
            // setMisysErrMsg(res.data.responseResult.responseMessage);
          }
        } else {
          console.log("findCustomerFromMysis findCustomerFromMysisFail", res);
          dispatch(findCustomerFromMysisFail(res.data));
          setMisysSection({
            MisysCode: dataToPOST.MiSysCode,
            NPLCode: null,
            BorrowerName: null,
            AddressOfBorrower: null,
            NTNNumber: null,
            ManagementUnitID: null,
            SCode: null,
            SDescription: null,
            BorrowerTypeID: null,
          });
        }
      })
      .catch((res) => {
        console.log("findCustomerFromMysis findCustomerFromMysisFail", res);
        // dispatch(findCustomerFromMysisFail());
        dispatch(SomeThingWentWrong(res));
      });
  };
};

export { findCustomerFromMysis, ResetState };
