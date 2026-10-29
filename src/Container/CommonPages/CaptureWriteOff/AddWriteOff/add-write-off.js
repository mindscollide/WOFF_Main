import React, { useEffect, useState, useRef } from "react";
import { Typography, Radio, Tooltip, Row, Col } from "antd";
import {
  Paper,
  InputWithBtn,
  TextField,
  SelectBox,
  DatePicker,
  Button,
  FancyBox,
  FancyBoxSection,
  ConsolidateBox,
  Notification,
  Message,
  Loader,
  Table,
  FormattedInputs,
} from "../../../../Components/Elements";
import SaveRecord from "../../../../Components/CommonComponents/CaptureWriteOff/save-record";
import { useSelector, useDispatch } from "react-redux";
import {
  findCustomerFromMysis,
  ResetState,
} from "../../../../store/actions/find-customer-from-misys-actions";
import {
  GetBorrowerType,
  GetAdvanceClassification,
  GetManagementUnit,
  GetNatureofCharge,
  GetNatureOfSecurity,
  GetWOFReason,
} from "../../../../store/actions/setup-forms-actions";
import { findCustomerAccountDetailsFromMysis } from "../../../../store/actions/find-customer-account-details-from-mysis-actions";
import {
  demoaccountdetails,
  demoforadditionaldetails,
  DemoForConsolidate,
  demoforrecoverysection,
  demoforcollateral,
} from "./dummy";
import {
  DateDisplayFormat,
  DateSendingFormat,
  NumberFormater,
  CommaFormter,
} from "../../../../Common/Functions/date-formatter";
import { PlusOutlined as AddIcon } from "@ant-design/icons";
const AddWriteOff = () => {
  const { Title } = Typography;
  const dispatch = useDispatch();
  const [misysError, setMisysError] = useState(false);
  const [misysErrMsg, setMisysErrMsg] = useState("");
  const [enableRadio, setEnableRadio] = useState(true);
  const [openApproval, setOpenApproval] = useState(false);
  const [openWriteoff, setOpenWriteoff] = useState(false);
  const [open, setOpen] = useState({
    open: false,
    message: "",
  });
  const findCustomerFromMisys = useSelector((state) => state.findCustomerFromMisys);
  const findCustomerAccountDetailsFromMisys = useSelector((state) => state.findCustomerAccountDetailsFromMisys);
  const setupForms = useSelector((state) => state.setupForms);
  const [wofcode, setwofcode] = useState("");
  const [accountNumbersFromStore, setAccountNumbersFromStore] = useState(null);
  const [goToSave, setGoToSave] = useState(false);
  const [ButtonText, setButtonText] = useState("Add Record");
  const [consolidateCalculatorBox, setConsolidateCalculatorBox] = useState({
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
    FRAPrincipal: 0,
    FRANominated: 0,
    FRANonAccural: 0,
    FRAOtherCharges: 0,
    FRAPenalInterest: 0,
    FRATotal: 0,
  });
  const [misysSection, setMisysSection] = useState({
    MisysCode: null,
    NPLCode: null,
    BorrowerName: null,
    AddressOfBorrower: null,
    NTNNumber: null,
    ManagementUnitID: null,
    // SCode: null,
    // SDescription: null,
    BorrowerTypeID: null,
    iParty: null,
  });
  const [sponsorOwnerDetail, setSponsorOwnerDetail] = useState([
    {
      DirectorTypeID: null,
      DirectorName: null,
      CNIC: null,
      FatherHusband: null,
      Address: null,
    },
  ]);
  const [AccountNumber, setAccountNumber] = useState("Select...");
  const [AccountSection, setAccountSection] = useState([]);
  const [allinput, setallinput] = useState(false);
  const [AccountDetails, setAccountDetails] = useState({
    FacCode: null,
    FacName: null,
    BranchCode: "",
    BranchName: "",
    RegionCode: "",
    RegionName: "",
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
    FRAPrincipal: 0,
    SCode: null,
    SDescription: null,
    FRANominated: 0,
    FRANonAccural: 0,
    FRAOtherCharges: 0,
    FRAPenalInterest: 0,
    FRATotal: 0,
  });
  // for section details
  const [SectionDetails, setSectionDetails] = useState({
    lrAmount: null,
    lrDate: "",
  });
  const [AccountSancationInfo, setAccountSancationInfo] = useState([]);

  const [additionalDetailsSection, setAdditionalDetailsSection] = useState({
    AdvanceClassificationID: "Loss",
    ChargeOfType: 1,
    ApprovalNumber: null,
    DateOfApproval: null,
    DateOfWriteoff: null,
    WriteOffReason: null,
    Remarks: -1,
  });

  const [collateralSection, setCollateralSection] = useState({
    SaleOfSecurity: null,
    DetailsOfSecurity: null,
    ChangeInSecurity: null,
    SecuritybyBankAtWriteOff: null,
    PledgeLifted: 3,
    ABInitioLevel: 3,
    WillfullDefaulter: 3,
    RightOfRecovery: 3,
  });
  // for account Collatrels
  const [accountCollateralSection, setAccountCollateralSection] = useState({
    natureOfSecurity: null,
    natureOfCharge: null,
    fsValue: -1,
    dateOfValuation: "",
  });

  const [AccountCollateral, setAccountCollateral] = useState([]);
  const [AccountCollateralValue, setAccountCollateralValue] = useState([]);
  const [recoveryWriteOffSection, setRecoveryWriteOffSection] = useState({
    DateOfRecovery: null,
    Principal: 0,
    Nominated: 0,
    Nonaccural: 0,
    OtherCharges: 0,
    PenalInterest: 0,
    Total: 0,
  });
  const [FinalDetails, setFinalDetails] = useState({});
  const misysSearchHandler = () => {
    let MisysCode = misysSection.MisysCode;
    // let val = MisysCode.trim();
    if (MisysCode !== null && MisysCode !== "") {
      setwofcode("");
      setConsolidateCalculatorBox(DemoForConsolidate);
      setAccountNumber("Select...");
      setAccountSection([]);
      setAccountDetails(demoaccountdetails);
      setAdditionalDetailsSection(demoforadditionaldetails);
      setRecoveryWriteOffSection(demoforrecoverysection);
      setCollateralSection(demoforcollateral);
      console.log("locationlocation 123", MisysCode);
      dispatch(
        findCustomerFromMysis(
          MisysCode,
          setMisysSection,
          setAccountNumbersFromStore,
          setRecoveryWriteOffSection,
          recoveryWriteOffSection,
          setAdditionalDetailsSection,
          additionalDetailsSection,
          setSponsorOwnerDetail,
          setupForms.BorrowerTypes,
          setMisysError,
          misysError,
          setMisysErrMsg,
          misysErrMsg
        )
      );
    } else {
    }
  };
  const misysSectionHandler = (e, val) => {
    let id = e.target.id;
    let name = e.target.name;
    let value = e.target.value;
    console.log("locationlocation 123", name);
    if (id.includes("ManagementUnitID")) {
      setMisysSection({ ...misysSection, ["ManagementUnitID"]: val.title });
    } else if (id.includes("BorrowerTypeID")) {
      setMisysSection({ ...misysSection, ["BorrowerTypeID"]: val.title });
    } else if (name === "MisysCode") {
      setMisysSection({ ...misysSection, ["MisysCode"]: value.trim() });
    } else {
      setMisysSection({ ...misysSection, [name]: value });
    }
  };
  const NTNnumberHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === "NTNNumber" && Number(value)) {
      setMisysSection({ ...misysSection, [name]: value });
    } else {
      setMisysSection({ ...misysSection, [name]: "" });
    }
  };
  const AcountSelection = (e, val) => {
    if (val !== "No Data Found") {
      setAccountNumber(val);
      let index = AccountSection.findIndex((x) => x.AccountNumber === val);
      if (index === -1) {
        console.log("before update");

        setButtonText("Add Record");
        dispatch(
          findCustomerAccountDetailsFromMysis(
            val,
            misysSection.MisysCode,
            setAccountDetails,
            AccountDetails,
            setRecoveryWriteOffSection,
            recoveryWriteOffSection
          )
        );
        setSectionDetails({
          lrAmount: null,
          lrDate: "",
        });
        setAccountCollateralSection({
          natureOfSecurity: null,
          natureOfCharge: null,
          fsValue: -1,
          dateOfValuation: "",
        });
        setAccountSancationInfo([]);
        setAccountCollateral([]);
        setAccountCollateralValue([]);
        console.log("CheckAllInput after update 12", index);
      } else {
        console.log("CheckAllInput after update 11", AccountSection);
        setButtonText("Update Record");
        if (AccountSection[index].AccountDetails != undefined) {
          setAccountDetails(AccountSection[index].AccountDetails);
        }
        if (AccountSection[index].AccountSancationInfo != undefined) {
          // console.log("CheckAllInput after update 11", AccountSection);

          setAccountSancationInfo(AccountSection[index].AccountSancationInfo);
        } else {
          setAccountSancationInfo([]);
        }
        if (AccountSection[index].AccountCollateral != undefined) {
          console.log("after update", index);

          setAccountCollateral(AccountSection[index].AccountCollateral);
          setAccountCollateralValue(AccountSection[index].AccountCollateral);
        }
      }
    } else {
      console.log(val);
    }
  };
  console.log("AccountDetails.ABNSOutstandingPrincipal", AccountSection);
  //  for empty saction details
  const handleirDate = (text) => {
    if (text === "18000101") {
      return "";
    } else if (text != "18000101") {
      let a = DateDisplayFormat(text);
      return a;
    }
  };
  // colums for fancyboxsection of
  const column = [
    {
      title: "Sanction/Last Renewal Date",
      dataIndex: "lrDate",
      key: "lrDate",
      align: "center",
      width: "5%",
      render: (text) => {
        if (text === "" && text === undefined) {
          return "";
        } else if (text != "") {
          console.log("text", text);
          let a = DateDisplayFormat(text);
          return a;
        }
      },
    },
    {
      title: "Sanction/Last Renewal Amount",
      dataIndex: "lrAmount",
      key: "lrAmount",
      align: "center",
      width: "4%",
      render: (text) => {
        if (text === -1) {
          return "";
        } else if (text != -1) {
          return CommaFormter(text);
        }
      },
    },
    {
      title: "Delete",
      dataIndex: "delete",
      key: "delete",
      align: "center",
      width: "1%",
      render: (text, record) => (
        <Tooltip title="Delete" color={"Black"}>
          <i
            style={{ cursor: "pointer" }}
            onClick={(e) => DeleteSec(e, record)}
            className="icon-trash icon-size-one pdfRed"
          ></i>
        </Tooltip>
      ),
    },
  ];
  const AccountDetailsHandler = (e) => {
    if (e.target.name == "lrDate" && e.target.value !== "") {
      setSectionDetails({
        ...SectionDetails,
        [e.target.name]: DateSendingFormat(e.target.value),
      });
    } else {
      setAccountDetails({ ...AccountDetails, [e.target.name]: e.target.value });
    }
  };
  const CodeHandler = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setAccountDetails({
        ...AccountDetails,
        [e.target.name]: e.target.value,
      });
    }
  };
  console.log("lrDate 45 12", SectionDetails);
  const calculatorBoxhandlerdata = (e) => {
    console.log("lrDate 45", e.target.name);
    let tem = {
      lrAmount: null,
      lrDate: "",
    };
    if (AccountNumber !== "") {
      if (String(Number(e.target.value)).length <= 17) {
        console.log("lrDate 45 before", NumberFormater(e.target.value));
        if (e.target.value !== null && e.target.value !== "") {
          console.log("lrDate 45 12", e.target.value !== "");
          setSectionDetails({
            ...SectionDetails,
            [e.target.name]: NumberFormater(e.target.value),
          });
        }
      } else {
        setOpen({
          open: true,
          message: "Limit Exceed",
        });
      }
    } else {
      setOpen({
        open: true,
        message: "Please Select An Account Number",
      });
    }
  };
  const calculatorBoxhandler = (e) => {
    console.log("calculatorBoxhandler 45", e.target.value);
    if (AccountNumber !== "") {
      if (String(Number(e.target.value)).length <= 17) {
        setAccountDetails({
          ...AccountDetails,
          [e.target.name]: NumberFormater(e.target.value),
        });
      } else {
        setOpen({
          open: true,
          message: "Limit Exceed",
        });
      }
    } else {
      setOpen({
        open: true,
        message: "Please Select An Account Number",
      });
    }
  };
  // CheckAccountAvailablity()
  const AddRecordHandler = () => {
    if (AccountNumber !== "" && AccountNumber !== "Select...") {
      let { input, input1, input2, input3, input4, input5 } = CheckAllInput();
      if (input && input1 && input2 && input3 && input4 && input5) {
        CheckAccountAvailablity(true);
        console.log("CheckAllInput", consolidateCalculatorBox.ABNSTotal != 0);
        console.log("AddRecordHandler", consolidateCalculatorBox);
        if (consolidateCalculatorBox.ABNSTotal != 0) {
          console.log("CheckAllInput", consolidateCalculatorBox.ABNSTotal != 0);

          setButtonText("Update Record");
        }
        // else{
        //   setButtonText("Add Record");
        // }
      } else {
        CheckAccountAvailablity(false);
      }
    } else {
      setOpen({
        ...open,
        open: true,
        message: "Select Account Number First",
      });
    }
  };
  //   update AccountSancationInfo in Account Section details
  const CheckSectionAvailablity = (flag) => {
    console.log("CheckColatrelsAvailablity");
    let PreviousAccounts = [...AccountSection];
    let index = PreviousAccounts.findIndex(
      (x) => x.AccountNumber === AccountNumber
    );
    if (flag == true) {
      if (index === -1) {
        PreviousAccounts.push({
          AccountNumber: AccountNumber,
          AccountSancationInfo: AccountSancationInfo,
        });
        // PreviousAccounts.shift();
        console.log("PreviousAccounts", PreviousAccounts);
        setAccountSection(PreviousAccounts);
        //
      } else {
        PreviousAccounts[index].AccountNumber = AccountNumber;
        PreviousAccounts[index].AccountSancationInfo = AccountSancationInfo;
        setAccountSection(PreviousAccounts);
      }
    }
  };
  // add AccountSancationInfo in Account details
  const AddSectionDetails = () => {
    let lrAmount = SectionDetails.lrAmount;
    let lrDate = SectionDetails.lrDate;
    console.log("lrDate 45", lrDate, lrAmount);
    console.log("lrDate 45", Number.isNaN(NaN));

    if (
      (lrAmount != null && lrAmount != undefined) ||
      (lrDate != "" && lrDate != undefined)
    ) {
      let tem = [];
      if (
        lrAmount != null &&
        lrAmount != undefined &&
        lrDate != "" &&
        lrDate != undefined
      ) {
        console.log("lrDate 45", lrDate, lrAmount);
        tem = {
          lrAmount: SectionDetails.lrAmount,
          lrDate: SectionDetails.lrDate,
        };
      } else if (lrAmount != null && lrAmount != undefined && lrDate === "") {
        console.log("lrDate 45", lrDate, lrAmount);
        tem = {
          lrAmount: SectionDetails.lrAmount,
          lrDate: "",
        };
      } else if (
        (lrAmount === null || lrAmount === 0) &&
        lrDate != "" &&
        lrDate != undefined
      ) {
        console.log("lrDate 45", lrDate, lrAmount);
        tem = {
          lrAmount: -1,
          lrDate: SectionDetails.lrDate,
        };
      } else {
        console.log("lrDate 45", lrDate, lrAmount);
        tem = {
          lrAmount: -1,
          lrDate: "",
        };
      }
      console.log("lrDate 45", tem);
      setAccountSancationInfo([...AccountSancationInfo, tem]);
      let refreshDtata = {
        lrAmount: null,
        lrDate: "",
      };
      setSectionDetails(refreshDtata);
    } else {
      setOpen({
        ...open,
        open: true,
        message: "Select Sanction Details",
      });
    }
  };

  // AccountSancationInfo on update
  useEffect(() => {
    // if (AccountSancationInfo.length > 0) {
    CheckSectionAvailablity(true);
    // }
  }, [AccountSancationInfo]);
  useEffect(() => {}, [AccountCollateralValue]);
  // add data for Account Collateral
  const AddMultipleCollateralDetails = () => {
    if (
      accountCollateralSection.natureOfCharge !== null &&
      accountCollateralSection.natureOfSecurity !== null
    ) {
      let index5 = setupForms.NatureofCharges.findIndex(
        (x) => x.title === accountCollateralSection.natureOfCharge
      );
      let index6 = setupForms.NatureOfSecuritys.findIndex(
        (x) => x.title === accountCollateralSection.natureOfSecurity
      );
      let date = accountCollateralSection.dateOfValuation;
      let fsData = accountCollateralSection.fsValue;
      console.log("fsData 0", date, fsData);
      let tem = [];
      let temValue = [];
      if (date != null && date != 0) {
        console.log("fsData 1.1", fsData);
        if (fsData != -1) {
          console.log("fsData 1.1", fsData);
          tem = {
            natureOfSecurity: setupForms.NatureOfSecuritys[index6].id,
            natureOfCharge: setupForms.NatureofCharges[index5].id,
            fsValue: accountCollateralSection.fsValue,
            dateOfValuation: accountCollateralSection.dateOfValuation,
          };
          temValue = {
            natureOfSecurity: accountCollateralSection.natureOfSecurity,
            natureOfCharge: accountCollateralSection.natureOfCharge,
            fsValue: accountCollateralSection.fsValue,
            dateOfValuation: accountCollateralSection.dateOfValuation,
          };
        } else {
          console.log("fsData 1.2", fsData);
          tem = {
            natureOfSecurity: setupForms.NatureOfSecuritys[index6].id,
            natureOfCharge: setupForms.NatureofCharges[index5].id,
            fsValue: -1,
            dateOfValuation: accountCollateralSection.dateOfValuation,
          };
          temValue = {
            natureOfSecurity: accountCollateralSection.natureOfSecurity,
            natureOfCharge: accountCollateralSection.natureOfCharge,
            fsValue: -1,
            dateOfValuation: accountCollateralSection.dateOfValuation,
          };
        }
      } else {
        console.log("fsData 2", fsData);
        if (fsData != 0 && fsData != -1) {
          console.log("fsData 2.1", fsData);
          tem = {
            natureOfSecurity: setupForms.NatureOfSecuritys[index6].id,
            natureOfCharge: setupForms.NatureofCharges[index5].id,
            fsValue: fsData,
            dateOfValuation: "",
          };
          temValue = {
            natureOfSecurity: accountCollateralSection.natureOfSecurity,
            natureOfCharge: accountCollateralSection.natureOfCharge,
            fsValue: fsData,
            dateOfValuation: "",
          };
        } else {
          console.log("fsData 2.2", fsData);
          tem = {
            natureOfSecurity: setupForms.NatureOfSecuritys[index6].id,
            natureOfCharge: setupForms.NatureofCharges[index5].id,
            fsValue: -1,
            dateOfValuation: "",
          };
          temValue = {
            natureOfSecurity: accountCollateralSection.natureOfSecurity,
            natureOfCharge: accountCollateralSection.natureOfCharge,
            fsValue: -1,
            dateOfValuation: "",
          };
        }
      }

      var t = [];
      t = AccountCollateral;
      if (t.length > 0) {
        if (
          tem.natureOfSecurity === t[t.length - 1].natureOfSecurity &&
          tem.natureOfCharge === t[t.length - 1].natureOfCharge &&
          tem.fsValue === t[t.length - 1].fsValue &&
          tem.dateOfValuation === t[t.length - 1].dateOfValuation
        ) {
          setOpen({
            ...open,
            open: true,
            message: "Data Already Exsist",
          });
          setAccountCollateralSection({
            natureOfSecurity: null,
            natureOfCharge: null,
            fsValue: -1,
            dateOfValuation: "",
          });
        } else {
          setAccountCollateral([...AccountCollateral, tem]);
          setAccountCollateralValue([...AccountCollateralValue, temValue]);
          setAccountCollateralSection({
            natureOfSecurity: null,
            natureOfCharge: null,
            fsValue: -1,
            dateOfValuation: "",
          });
        }
      } else {
        // setAccountCollateralSection({
        //   natureOfSecurity: null,
        //   natureOfCharge: null,
        //   fsValue: 0,
        //   dateOfValuation: "",
        // });
        setAccountCollateral([...AccountCollateral, tem]);
        setAccountCollateralValue([...AccountCollateralValue, temValue]);
      }
    } else {
      setOpen({
        ...open,
        open: true,
        message: "Plese Enter Collateral Information",
      });
    }
    setAccountCollateralSection({
      natureOfSecurity: null,
      natureOfCharge: null,
      fsValue: -1,
      dateOfValuation: "",
    });
  };
  console.log("fsData bahir", AccountCollateral, AccountCollateralValue);
  //   update AccountCollateral in Account Section details
  const CheckColatrelsAvailablity = (flag) => {
    console.log("CheckColatrelsAvailablity");
    let PreviousAccounts = [...AccountSection];
    let index = PreviousAccounts.findIndex(
      (x) => x.AccountNumber === AccountNumber
    );
    if (flag == true) {
      if (index === -1) {
        PreviousAccounts.push({
          AccountNumber: AccountNumber,
          AccountCollateral: AccountCollateral,
        });
        // PreviousAccounts.shift();
        console.log("PreviousAccounts", PreviousAccounts);
        setAccountSection(PreviousAccounts);
        //
      } else {
        PreviousAccounts[index].AccountNumber = AccountNumber;
        PreviousAccounts[index].AccountCollateral = AccountCollateral;
        setAccountSection(PreviousAccounts);
      }
    }
  };
  // when AccountCollateral update
  useEffect(() => {
    // if (AccountCollateral.length > 0) {
    CheckColatrelsAvailablity(true);
    // }
  }, [AccountCollateral]);

  const CheckAllInput = () => {
    var input = true;
    var input1 = true;
    var input2 = true;
    var input3 = true;
    var input4 = true;
    var input5 = true;
    // if (AccountDetails.FRAPrincipal>0 && AccountDetails.ABNSOutstandingPrincipal ==0) {
    //   input = false
    //   setOpen({
    //     ...open,
    //     open: true,
    //     message: "Amount Before Negotiated Principal cannot be Zero"
    //   })
    // }
    if (
      AccountDetails.FRAPrincipal > 0 &&
      AccountDetails.ABNSOutstandingPrincipal >= AccountDetails.FRAPrincipal
    ) {
      input1 = true;
    } else if (
      AccountDetails.ABNSOutstandingPrincipal < AccountDetails.FRAPrincipal
    ) {
      input1 = false;
      console.log("1st", false);
      setOpen({
        ...open,
        open: true,
        message:
          "Negotiated Principal  Should be Greater than The Relief Principal ",
      });
    }
    if (
      AccountDetails.FRANominated > 0 &&
      AccountDetails.ABNSOutstandingNominal >= AccountDetails.FRANominated
    ) {
      input2 = true;
    } else if (
      AccountDetails.ABNSOutstandingNominal < AccountDetails.FRANominated
    ) {
      input2 = false;
      console.log("2nd", false);
      setOpen({
        ...open,
        open: true,
        message:
          "Amount Before Negotiated Principal Outstanding Nominated cannot be Less than Financial Relief Allowed Nominated",
      });
    }
    if (
      AccountDetails.FRANonAccural > 0 &&
      AccountDetails.ABNSOutstandingNonAccural >= AccountDetails.FRANonAccural
    ) {
      input3 = true;
    } else if (
      AccountDetails.ABNSOutstandingNonAccural < AccountDetails.FRANonAccural
    ) {
      input3 = false;
      console.log("3rd", false);
      setOpen({
        ...open,
        open: true,
        message:
          "Amount Before Negotiated Principal Outstanding Non-Accrual cannot be Less than Financial Relief Allowed Non-Accrual",
      });
    }
    if (
      AccountDetails.FRAOtherCharges > 0 &&
      AccountDetails.ABNSOtherCharges >= AccountDetails.FRAOtherCharges
    ) {
      input4 = true;
    } else if (
      AccountDetails.ABNSOtherCharges < AccountDetails.FRAOtherCharges
    ) {
      input4 = false;
      console.log("4rth", false);
      setOpen({
        ...open,
        open: true,
        message:
          "Amount Before Negotiated Principal Other Charges cannot be Less than Financial Relief Allowed Other Charges",
      });
    }
    if (
      AccountDetails.FRAPenalInterest > 0 &&
      AccountDetails.ABNSPenalInterest >= AccountDetails.FRAPenalInterest
    ) {
      input5 = true;
    } else if (
      AccountDetails.ABNSPenalInterest < AccountDetails.FRAPenalInterest
    ) {
      input5 = false;
      console.log("5th", false);
      setOpen({
        ...open,
        open: true,
        message:
          "Amount Before Negotiated Principal Penal Interest cannot be Less than Financial Relief Allowed Penal Interest",
      });
    }

    return { input, input1, input2, input3, input4, input5 };
  };
  const CheckAccountAvailablity = (flag) => {
    let PreviousAccounts = [...AccountSection];
    let index = PreviousAccounts.findIndex(
      (x) => x.AccountNumber === AccountNumber
    );
    if (flag == true && allinput == true) {
      if (index === -1) {
        PreviousAccounts.push({
          AccountNumber: AccountNumber,
          AccountDetails: AccountDetails,
        });
        setAccountSection(PreviousAccounts);
      } else {
        PreviousAccounts[index].AccountNumber = AccountNumber;
        PreviousAccounts[index].AccountDetails = AccountDetails;
        setAccountSection(PreviousAccounts);
      }
    }
    // else{
    //   setOpen({
    //     ...open,
    //     open:true,
    //     message:"SomeThing Went Wrong Record Not Save"
    //   })
    // }
  };
  const ConsolidateCalculation = () => {
    console.log(AccountSection, "AccountSection");

    if (
      AccountSection.some(
        (AccountSectio) => AccountSectio.AccountDetails !== undefined
      )
    ) {
      try {
        let ConsolidateBoxes = {
          ABNSOutstandingPrincipal: AccountSection.map(
            (data) => data.AccountDetails.ABNSOutstandingPrincipal
          ).reduce((a, b) => parseFloat((a + b).toFixed(2)), 0),
          ABNSOutstandingNominal: AccountSection.map(
            (data) => data.AccountDetails.ABNSOutstandingNominal
          ).reduce((a, b) => parseFloat((a + b).toFixed(2)), 0),
          ABNSOutstandingNonAccural: AccountSection.map(
            (data) => data.AccountDetails.ABNSOutstandingNonAccural
          ).reduce((a, b) => parseFloat((a + b).toFixed(2)), 0),
          ABNSOtherCharges: AccountSection.map(
            (data) => data.AccountDetails.ABNSOtherCharges
          ).reduce((a, b) => parseFloat((a + b).toFixed(2)), 0),
          ABNSPenalInterest: AccountSection.map(
            (data) => data.AccountDetails.ABNSPenalInterest
          ).reduce((a, b) => parseFloat((a + b).toFixed(2)), 0),
          ABNSTotal: AccountSection.map(
            (data) => data.AccountDetails.ABNSTotal
          ).reduce((a, b) => parseFloat((a + b).toFixed(2)), 0),
          APBSOutstandingPrincipal: AccountSection.map(
            (data) => data.AccountDetails.APBSOutstandingPrincipal
          ).reduce((a, b) => parseFloat((a + b).toFixed(2)), 0),
          APBSOutstandingNominal: AccountSection.map(
            (data) => data.AccountDetails.APBSOutstandingNominal
          ).reduce((a, b) => parseFloat((a + b).toFixed(2)), 0),
          APBSOutstandingNonAccural: AccountSection.map(
            (data) => data.AccountDetails.APBSOutstandingNonAccural
          ).reduce((a, b) => parseFloat((a + b).toFixed(2)), 0),
          APBSOtherCharges: AccountSection.map(
            (data) => data.AccountDetails.APBSOtherCharges
          ).reduce((a, b) => parseFloat((a + b).toFixed(2)), 0),
          APBSPenalInterest: AccountSection.map(
            (data) => data.AccountDetails.APBSPenalInterest
          ).reduce((a, b) => parseFloat((a + b).toFixed(2)), 0),
          APBSTotal: AccountSection.map(
            (data) => data.AccountDetails.APBSTotal
          ).reduce((a, b) => parseFloat((a + b).toFixed(2)), 0),
          FRAPrincipal: AccountSection.map(
            (data) => data.AccountDetails.FRAPrincipal
          ).reduce((a, b) => parseFloat((a + b).toFixed(2)), 0),
          FRANominated: AccountSection.map(
            (data) => data.AccountDetails.FRANominated
          ).reduce((a, b) => parseFloat((a + b).toFixed(2)), 0),
          FRANonAccural: AccountSection.map(
            (data) => data.AccountDetails.FRANonAccural
          ).reduce((a, b) => parseFloat((a + b).toFixed(2)), 0),
          FRAOtherCharges: AccountSection.map(
            (data) => data.AccountDetails.FRAOtherCharges
          ).reduce((a, b) => parseFloat((a + b).toFixed(2)), 0),
          FRAPenalInterest: AccountSection.map(
            (data) => data.AccountDetails.FRAPenalInterest
          ).reduce((a, b) => parseFloat((a + b).toFixed(2)), 0),
          FRATotal: AccountSection.map(
            (data) => data.AccountDetails.FRATotal
          ).reduce((a, b) => parseFloat((a + b).toFixed(2)), 0),
        };
        setConsolidateCalculatorBox(ConsolidateBoxes);
      } catch (e) {
        // let ConsolidateBoxes = {
        //   ABNSOutstandingPrincipal: AccountSection.map(
        //     (data) => data.AccountDetails.ABNSOutstandingPrincipal
        //   ).reduce((a, b) => a + b, 0),
        // };
      }
    } else {
      // alert("Object not found.");
    }
  };
  const addDetailsSectionHandler = (e, val) => {
    let id = e.target.id !== undefined ? e.target.id : null;
    let name = e.target.name;
    let value = e.target.value;
    if (id && id.includes("AdvanceClassificationID")) {
      setAdditionalDetailsSection({
        ...additionalDetailsSection,
        ["AdvanceClassificationID"]: val.title,
      });
    } else if (id && id.includes("WriteOffReason")) {
      if (
        val.title ==
        "PARTY PAID THE SETTLEMENT AMOUNT AND REMAINING BALANCE HAS BEEN WRITTEN-OFF AS PER APPROVAL"
      ) {
        setAdditionalDetailsSection({
          ...additionalDetailsSection,
          ["Remarks"]: parseInt(1),
          ["WriteOffReason"]: val.title,
        });
      } else if (val.title == "WRITE-OFF FOR CLEANING OF BOOKS") {
        setAdditionalDetailsSection({
          ...additionalDetailsSection,
          ["Remarks"]: parseInt(2),
          ["WriteOffReason"]: val.title,
        });
      } else {
        setAdditionalDetailsSection({
          ...additionalDetailsSection,
          ["WriteOffReason"]: val.title,
        });
      }
    } else if (name == "DateOfApproval" && value !== "") {
      setAdditionalDetailsSection({
        ...additionalDetailsSection,
        [name]: DateSendingFormat(value),
      });
    } else if (name == "DateOfWriteoff" && value !== "") {
      setAdditionalDetailsSection({
        ...additionalDetailsSection,
        [name]: DateSendingFormat(value),
      });
    } else {
      console.log("additionalDetailsSection 33333", value);
      setAdditionalDetailsSection({
        ...additionalDetailsSection,
        [name]: value,
      });
    }
  };
  const collateralSectionHandler = (e, val) => {
    let id = e.target.id !== undefined ? e.target.id : null;
    let name = e.target.name;
    let value = e.target.value;
    console.log(e.target.name);
    console.log(e.target.value);
    console.log(val);
    if (id && id.includes("natureOfSecurity")) {
      // setCollateralSection({
      //   ...collateralSection,
      //   ["natureOfSecurity"]: val.title,
      // });
    } else if (id && id.includes("natureOfCharge")) {
      // setCollateralSection({
      //   ...collateralSection,
      //   ["natureOfCharge"]: val.title,
      // });
    } else if (name == "dateOfValuation" && value !== "") {
      // setCollateralSection({
      //   ...collateralSection,
      //   [name]: DateSendingFormat(value),
      // });
    } else if (name == "fsValue" && value !== "") {
      // setCollateralSection({
      //   ...collateralSection,
      //   [name]: DateSendingFormat(value),
      // });
    } else {
      setCollateralSection({
        ...collateralSection,
        [name]: value,
      });
    }
  };
  const collateralSectionHandlerNew = (e, val) => {
    let id = e.target.id !== undefined ? e.target.id : null;
    let name = e.target.name;
    let value = e.target.value;
    console.log(e.target.name);
    console.log("collateralSection check nan", val, e.target.value);
    console.log(val);
    if (id && id.includes("natureOfSecurity")) {
      setAccountCollateralSection({
        ...accountCollateralSection,
        ["natureOfSecurity"]: val.title,
      });
    } else if (id && id.includes("natureOfCharge")) {
      setAccountCollateralSection({
        ...accountCollateralSection,
        ["natureOfCharge"]: val.title,
      });
    } else if (name == "dateOfValuation" && value !== "") {
      setAccountCollateralSection({
        ...accountCollateralSection,
        [name]: DateSendingFormat(value),
      });
    } else {
      setAccountCollateralSection({
        ...accountCollateralSection,
        [name]: value,
      });
    }
    // setAccountCollateral(collateralSection)
    console.log("v", accountCollateralSection);
  };
  const ColleteralNumberField = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (String(parseInt(value)).length <= 17) {
      setCollateralSection({
        ...collateralSection,
        [name]: NumberFormater(value),
      });
    }
  };
  const AccountColleteralNumberField = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    console.log("collateralSection check nan", typeof value);
    if (String(parseInt(value)).length <= 17) {
      if (e.target.value !== null && e.target.value !== "") {
        setAccountCollateralSection({
          ...accountCollateralSection,
          [name]: NumberFormater(value),
        });
      } else {
        setAccountCollateralSection({
          ...accountCollateralSection,
          [name]: -1,
        });
      }
    }
  };
  console.log("collateralSection check nan", accountCollateralSection);
  const recoveryWriteOffSectionHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name == "DateOfRecovery") {
      setRecoveryWriteOffSection({
        ...recoveryWriteOffSection,
        [name]: value !== "" ? DateSendingFormat(value) : "",
      });
    }
  };
  const recoveryNumberField = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (String(Number(value)).length <= 17) {
      setRecoveryWriteOffSection({
        ...recoveryWriteOffSection,
        [name]: NumberFormater(value),
      });
    }
  };
  console.log("collateralSection", collateralSection);
  const goToSaveHandler = (e) => {
    // console.log(collateralSection.WillfullDefaulter)
    console.log(e);
    e.preventDefault();
    setMisysSection({ ...misysSection });
    setAccountSection([...AccountSection]);
    setAccountDetails({ ...AccountDetails });
    setAdditionalDetailsSection({ ...additionalDetailsSection });
    setCollateralSection({ ...collateralSection });
    setRecoveryWriteOffSection({ ...recoveryWriteOffSection });
    if (misysSection) {
      let index1 = setupForms.ManagementUnits.findIndex(
        (x) => x.title === misysSection.ManagementUnitID
      );
      misysSection.ManagementUnitID = setupForms.ManagementUnits[index1].id;
      let index2 = setupForms.BorrowerTypes.findIndex(
        (x) => x.title === misysSection.BorrowerTypeID
      );
      misysSection.BorrowerTypeID = setupForms.BorrowerTypes[index2].id;
      // this code is for validating if user has left fields empty
      if (misysSection.NPLCode == null) {
        misysSection.NPLCode = "";
      }
      if (misysSection.NTNNumber == null) {
        misysSection.NTNNumber = "";
      }
    }
    if (AccountDetails) {
      if (AccountDetails.BranchCode == null) {
        AccountDetails.BranchCode = 0;
      }
    }
    if (additionalDetailsSection) {
      let index3 = setupForms.ClassificationOfAdvances.findIndex(
        (x) => x.title === additionalDetailsSection.AdvanceClassificationID
      );
      let index4 = setupForms.WOFReasons.findIndex(
        (x) => x.title === additionalDetailsSection.WriteOffReason
      );
      additionalDetailsSection.AdvanceClassificationID =
        setupForms.ClassificationOfAdvances[index3].id;
      additionalDetailsSection.WriteOffReason =
        setupForms.WOFReasons[index4].id;
      if (additionalDetailsSection.ApprovalNumber == null) {
        additionalDetailsSection.ApprovalNumber = "";
      }
      if (additionalDetailsSection.Remarks == null) {
        additionalDetailsSection.Remarks = 1;
      }
    }
    if (collateralSection) {
      if (collateralSection.SaleOfSecurity == null) {
        collateralSection.SaleOfSecurity = 0;
      }
      if (collateralSection.DetailsOfSecurity == null) {
        collateralSection.DetailsOfSecurity = "";
      }
      if (collateralSection.ChangeInSecurity == null) {
        collateralSection.ChangeInSecurity = "";
      }
      if (collateralSection.SecuritybyBankAtWriteOff == null) {
        collateralSection.SecuritybyBankAtWriteOff = "";
      }
    }
    if (recoveryWriteOffSection) {
      if (recoveryWriteOffSection.DateOfRecovery == null) {
        recoveryWriteOffSection.DateOfRecovery = "18000101";
      }
    }

    var FinalObject = {
      MisysCode: misysSection.MisysCode,
      NPLCode: misysSection.NPLCode,
      BorrowerName: misysSection.BorrowerName,
      AddressOfBorrower: misysSection.AddressOfBorrower,
      NTNNumber: misysSection.NTNNumber,
      ManagementUnitID: misysSection.ManagementUnitID,
      BorrowerTypeID: misysSection.BorrowerTypeID,
      IParty: misysSection.iParty,
      Consolidated: consolidateCalculatorBox,
      Accounts: AccountSection,
      AdditionalDetails: additionalDetailsSection,
      Collateral: collateralSection,
      RecoveryAfterWriteOff: recoveryWriteOffSection,
      SponsorOwnerDetail: sponsorOwnerDetail,
    };
    if (
      additionalDetailsSection.Remarks !== null &&
      collateralSection.ABInitioLevel !== null &&
      collateralSection.PledgeLifted !== null &&
      collateralSection.WillfullDefaulter !== null &&
      collateralSection.RightOfRecovery !== null
    ) {
      if (
        additionalDetailsSection.DateOfApproval == null ||
        additionalDetailsSection.DateOfApproval == ""
      ) {
        setOpenApproval((prev) => !prev);
      } else if (
        additionalDetailsSection.DateOfWriteoff == null ||
        additionalDetailsSection.DateOfWriteoff == ""
      ) {
        setOpenWriteoff((prev) => !prev);
      } else {
        if (FinalObject.Accounts.length > 0) {
          let tem1 = [];
          let tem2 = [];

          let data = FinalObject.Accounts;
          data.map((item, index) => {
            // let accountCollateral = item.AccountCollateral;
            let accountDetails = item.AccountDetails;
            // if (accountCollateral != undefined && accountDetails != undefined) {
            // } else {
            if (accountDetails != undefined) {
            } else {
              tem1 = [false];
            }
            // if (accountCollateral != undefined) {
            // } else {
            //   tem2 = [false];
            // }
            // }
          });
          if (tem1.length > 0) {
            setOpen({
              ...open,
              open: true,
              message: " Please Add atleast One Account Consolidated ",
            });
            // alert(tem);
          }
          // else if (tem2.length > 0) {
          //   setOpen({
          //     ...open,
          //     open: true,
          //     message: " Please add at least one Collateral Detail",
          //   });
          //   // alert(tem);
          // }
          else {
            setFinalDetails(FinalObject);
            setGoToSave(!goToSave);
          }
          console.log("FinalObjectFinalObject", FinalObject);
          // setFinalDetails(FinalObject);
          // setGoToSave(!goToSave);
        } else {
          setOpen({
            ...open,
            open: true,
            message: " Please Add atleast One Account Number",
          });
        }
      }
    } else {
      console.log("Please Fill All Fields Correctly");
    }
  };
  useEffect(() => {
    ConsolidateCalculation();
  }, [AccountSection]);
  useEffect(() => {
    console.log("mycall 2");
    ConsolidateCalculation();
  }, [AccountDetails]);
  // this use Effect is for charge of
  useEffect(() => {
    if (additionalDetailsSection.AdvanceClassificationID === "Charged Off") {
      setEnableRadio(false);
      setAdditionalDetailsSection({
        ...additionalDetailsSection,
        ChargeOfType: 2,
      });
    } else if (
      additionalDetailsSection.AdvanceClassificationID !== "Charged Off"
    ) {
      setEnableRadio(true);
      setAdditionalDetailsSection({
        ...additionalDetailsSection,
        ChargeOfType: 1,
      });
    }
  }, [additionalDetailsSection.AdvanceClassificationID]);
  // use effect to calculate total of recovery
  useEffect(() => {
    let myTotal =
      (!isNaN(recoveryWriteOffSection.Principal)
        ? recoveryWriteOffSection.Principal
        : 0) +
      (!isNaN(recoveryWriteOffSection.Nominated)
        ? recoveryWriteOffSection.Nominated
        : 0) +
      (!isNaN(recoveryWriteOffSection.OtherCharges)
        ? recoveryWriteOffSection.OtherCharges
        : 0) +
      (!isNaN(recoveryWriteOffSection.PenalInterest)
        ? recoveryWriteOffSection.PenalInterest
        : 0) +
      (!isNaN(recoveryWriteOffSection.Nonaccural)
        ? recoveryWriteOffSection.Nonaccural
        : 0);
    setRecoveryWriteOffSection({
      ...recoveryWriteOffSection,
      Total: parseFloat(myTotal.toFixed(2)),
    });
  }, [
    recoveryWriteOffSection.Principal,
    recoveryWriteOffSection.Nominated,
    recoveryWriteOffSection.OtherCharges,
    recoveryWriteOffSection.PenalInterest,
    recoveryWriteOffSection.Nonaccural,
  ]);
  useEffect(() => {
    let myTotal =
      (!isNaN(AccountDetails.ABNSOutstandingPrincipal)
        ? AccountDetails.ABNSOutstandingPrincipal
        : 0) +
      (!isNaN(AccountDetails.ABNSOutstandingNominal)
        ? AccountDetails.ABNSOutstandingNominal
        : 0) +
      (!isNaN(AccountDetails.ABNSOutstandingNonAccural)
        ? AccountDetails.ABNSOutstandingNonAccural
        : 0) +
      (!isNaN(AccountDetails.ABNSOtherCharges)
        ? AccountDetails.ABNSOtherCharges
        : 0) +
      (!isNaN(AccountDetails.ABNSPenalInterest)
        ? AccountDetails.ABNSPenalInterest
        : 0);
    setAccountDetails({
      ...AccountDetails,
      ABNSTotal: myTotal,
    });
  }, [
    AccountDetails.ABNSOutstandingPrincipal,
    AccountDetails.ABNSOutstandingNominal,
    AccountDetails.ABNSOutstandingNonAccural,
    AccountDetails.ABNSOtherCharges,
    AccountDetails.ABNSPenalInterest,
  ]);
  useEffect(() => {
    let myTotal =
      (!isNaN(AccountDetails.APBSOutstandingPrincipal)
        ? AccountDetails.APBSOutstandingPrincipal
        : 0) +
      (!isNaN(AccountDetails.APBSOutstandingNominal)
        ? AccountDetails.APBSOutstandingNominal
        : 0) +
      (!isNaN(AccountDetails.APBSOutstandingNonAccural)
        ? AccountDetails.APBSOutstandingNonAccural
        : 0) +
      (!isNaN(AccountDetails.APBSOtherCharges)
        ? AccountDetails.APBSOtherCharges
        : 0) +
      (!isNaN(AccountDetails.APBSPenalInterest)
        ? AccountDetails.APBSPenalInterest
        : 0);
    console.log(myTotal);
    setAccountDetails({
      ...AccountDetails,
      APBSTotal: myTotal,
    });
  }, [
    AccountDetails.APBSOutstandingPrincipal,
    AccountDetails.APBSOutstandingNominal,
    AccountDetails.APBSOutstandingNonAccural,
    AccountDetails.APBSOtherCharges,
    AccountDetails.APBSPenalInterest,
  ]);
  useEffect(() => {
    console.log("mycall 3");
    // let myTotal =
    // (!isNaN(AccountDetails.FRAPrincipal) ? AccountDetails.FRAPrincipal : 0) +
    // (!isNaN(AccountDetails.FRANominated) ? AccountDetails.FRANominated : 0) +
    // (!isNaN(AccountDetails.FRANonAccural)
    //   ? AccountDetails.FRANonAccural
    //   : 0) +
    // (!isNaN(AccountDetails.FRAPenalInterest)
    //   ? AccountDetails.FRAPenalInterest
    //   : 0) +
    // (!isNaN(AccountDetails.FRAOtherCharges)
    //   ? AccountDetails.FRAOtherCharges
    //   : 0);
    let myTotal =
      (!isNaN(AccountDetails.FRAPrincipal) ? AccountDetails.FRAPrincipal : 0) +
      (!isNaN(AccountDetails.FRANominated) ? AccountDetails.FRANominated : 0) +
      (!isNaN(AccountDetails.FRANonAccural)
        ? AccountDetails.FRANonAccural
        : 0) +
      (!isNaN(AccountDetails.FRAPenalInterest)
        ? AccountDetails.FRAPenalInterest
        : 0) +
      (!isNaN(AccountDetails.FRAOtherCharges)
        ? AccountDetails.FRAOtherCharges
        : 0);
    setAccountDetails({
      ...AccountDetails,
      ["FRATotal"]: myTotal,
    });
  }, [
    AccountDetails.FRAPrincipal,
    AccountDetails.FRANominated,
    AccountDetails.FRANonAccural,
    AccountDetails.FRAOtherCharges,
    AccountDetails.FRAPenalInterest,
  ]);
  // this code is used to set update record text on button when the user remains on the same account
  useEffect(() => {
    console.log("myTotal FRATotal", AccountDetails.FRATotal);
  }, [AccountDetails.FRATotal]);
  useEffect(() => {
    let accountsec = AccountSection.AccountNumber;
    // if (AccountSection.length > 0) {
    if (accountsec != undefined) {
      setButtonText("Update Record");
    }
  }, [AccountSection]);
  console.log("AccountSection btn", AccountSection);
  // code for adding condition on last row of colleteral section
  useEffect(() => {
    if (additionalDetailsSection.Remarks == 1) {
      setCollateralSection({
        ...collateralSection,
        WillfullDefaulter: 2,
        RightOfRecovery: 1,
      });
    } else if (additionalDetailsSection.Remarks == 2) {
      setCollateralSection({
        ...collateralSection,
        RightOfRecovery: 2,
        WillfullDefaulter: 1,
      });
    }
  }, [additionalDetailsSection.Remarks]);

  useEffect(() => {
    if (findCustomerFromMisys.isFail) {
      setMisysError(true);
      setMisysErrMsg(findCustomerFromMisys.message);
      // setTimeout(() => {
      //   dispatch(ResetState())
      //   setMisysError(false);
      // }, 3000);

      // changes
    } else {
      setMisysError(false);
    }
  }, [findCustomerFromMisys]);
  useEffect(() => {
    dispatch(GetBorrowerType());
    dispatch(GetAdvanceClassification());
    dispatch(GetManagementUnit());
    dispatch(GetNatureofCharge());
    dispatch(GetNatureOfSecurity());
    dispatch(GetWOFReason());
    window.scrollTo(0, 0);
  }, []);
  const Delete = (e, value) => {
    console.log("filteredItems filteredItems");
    let index5 = setupForms.NatureofCharges.findIndex(
      (x) => x.title === value.natureOfCharge
    );
    let index6 = setupForms.NatureOfSecuritys.findIndex(
      (x) => x.title === value.natureOfSecurity
    );
    let tem = [];
    tem = {
      dateOfValuation: value.dateOfValuation,
      fsValue: value.fsValue,
      natureOfCharge: setupForms.NatureofCharges[index5].id,
      natureOfSecurity: setupForms.NatureOfSecuritys[index6].id,
    };
    AccountCollateral.shift(tem);
    const filteredItems = AccountCollateral.filter((item) => item !== tem);
    const filteredItemsValue = AccountCollateralValue.filter(
      (item) => item !== value
    );

    setAccountCollateral(filteredItems);
    setAccountCollateralValue(filteredItemsValue);
  };
  // delete of section detail
  const DeleteSec = (e, value) => {
    const filteredItems = AccountSancationInfo.filter((item) => item !== value);
    console.log("value", AccountSection);
    setAccountSancationInfo(filteredItems);
  };
  const columns = [
    {
      title: "Nature of Security",
      dataIndex: "natureOfSecurity",
      key: "natureOfSecurity",
      align: "center",
      width: "3%",
      render: (text) => {
        if (Number.isInteger(text)) {
          let index5 = setupForms.NatureOfSecuritys.findIndex(
            (x) => x.id === text
          );
          let data = setupForms.NatureOfSecuritys[index5].title;
          return data;
        } else {
          return text;
        }
      },
    },
    {
      title: "Nature of Charge",
      dataIndex: "natureOfCharge",
      key: "natureOfCharge",
      align: "center",
      width: "4%",
      render: (text) => {
        if (Number.isInteger(text)) {
          let index6 = setupForms.NatureofCharges.findIndex(
            (x) => x.id === text
          );
          let data = setupForms.NatureofCharges[index6].title;

          return data;
        } else {
          return text;
        }
      },
    },
    {
      title: "FS Value of Security ",
      dataIndex: "fsValue",
      key: "fsValue",
      align: "center",
      width: "5%",
      render: (text) => {
        // console.log("text 1234", text);
        if (text === -1) {
          return "";
        } else if (text != -1 && text !== null) {
          return CommaFormter(text);
        }
      },
    },
    {
      title: "Date of Valuation",
      dataIndex: "dateOfValuation",
      key: "dateOfValuation",
      align: "center",
      width: "5%",
      render: (text) => {
        if (text === "") {
          return "";
        } else if (text != "") {
          let a = DateDisplayFormat(text);
          return a;
        }
      },
    },
    {
      title: "Delete",
      dataIndex: "delete",
      key: "delete",
      align: "center",
      width: "1%",
      render: (text, record) => (
        <Tooltip title="Delete" color={"Black"}>
          <i
            style={{ cursor: "pointer" }}
            onClick={(e) => Delete(e, record)}
            className="icon-trash icon-size-one pdfRed"
          ></i>
        </Tooltip>
      ),
    },
  ];
  console.log("CheckColatrelsAvailablity AccountSection", AccountSection);
  console.log("AccountCollateral 1", AccountCollateral);
  return !goToSave ? (
    <>
      {findCustomerAccountDetailsFromMisys.isLoading && <Loader />}
      <form onSubmit={(e) => goToSaveHandler(e)}>
        <Title level={2}>Capture Write Off</Title>
        <Paper padding="1" section>
          <Row gutter={16}>
            <Col lg={6} md={6} sm={24} xs={24}>
              <div
                onClick={() => {
                  dispatch(ResetState());
                  // setMisysError(false);
                }}
              >
                <InputWithBtn
                  isUpperCase={true}
                  onchange={misysSectionHandler}
                  label="Misys Customer Code"
                  fullWidth
                  helperText={misysErrMsg}
                  textFieldSize="small"
                  applyClass="search"
                  textLength={6}
                  minLength={6}
                  icon={<i className="icon-search icon-size-one"></i>}
                  required
                  error={misysError}
                  value={misysSection.MisysCode}
                  name="MisysCode"
                  click={misysSearchHandler}
                />
              </div>
            </Col>

            <Col lg={6} md={6} sm={24} xs={24}>
              <TextField
                name=""
                size="small"
                placeholder="WOF Code"
                disable
                value={wofcode}
                label={"WOF Code"}
                fullWidth
              />
            </Col>

            <Col lg={6} md={6} sm={24} xs={24}>
              <TextField
                change={misysSectionHandler}
                value={misysSection.NPLCode}
                size="small"
                label="Borrower NPL Code"
                fullWidth
                textLength={7}
                name="NPLCode"
              />
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              <TextField
                value={misysSection.BorrowerName}
                change={misysSectionHandler}
                size="small"
                label="Borrower Name"
                fullWidth
                textLength={300}
                required
                name="BorrowerName"
              />
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              <TextField
                value={misysSection.AddressOfBorrower}
                change={misysSectionHandler}
                name="AddressOfBorrower"
                size="small"
                label="Address of Borrower"
                fullWidth
                textLength={300}
                required
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <TextField
                value={misysSection.NTNNumber}
                change={NTNnumberHandler}
                name="NTNNumber"
                size="small"
                label="NTN Number"
                fullWidth
                textLength={8}
                minLength={1}
                maxLength={8}
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <SelectBox
                change={misysSectionHandler}
                name="ManagementUnitID"
                propertyName={"title"}
                option={setupForms.ManagementUnits}
                label="Business Segment"
                value={misysSection.ManagementUnitID}
                required
              />
            </Col>
            <div style={{ marginTop: "10px" }} />
            <Col lg={6} md={6} sm={24} xs={24}>
              {/* <div style={{ marginTop: "35px" }} /> */}
              <SelectBox
                change={misysSectionHandler}
                name="BorrowerTypeID"
                propertyName={"title"}
                option={setupForms.BorrowerTypes}
                label="Borrower Type"
                required
                value={misysSection.BorrowerTypeID}
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              {/* <div style={{ marginTop: "35px" }} /> */}
              <TextField
                label={"IParty ID"}
                name=""
                placeholder="IParty ID"
                size="small"
                disable
                value={misysSection.iParty}
                fullWidth
              />
            </Col>
            {/* <Grid item lg={4} md={4} sm={12} xs={12}>
              <div style={{ marginTop: "35px" }} />
              <SelectBox
                change={misysSectionHandler}
                name="BorrowerTypeID"
                propertyName={"title"}
                option={setupForms.BorrowerTypes}
                label="Borrower Type"
                required
                value={misysSection.BorrowerTypeID}
              />
            </Grid>
            <Grid item lg={2} md={2} sm={12} xs={12}>
              <div style={{ marginTop: "35px" }} />
              <TextField
                label={"IParty ID"}
                name=""
                placeholder="IParty ID"
                size="small"
                disable
                value={misysSection.iParty}
                fullWidth
              />
            </Grid> */}
          </Row>
        </Paper>
        <div style={{ marginTop: "20px" }} />
        <Paper padding="1" section>
          <Row gutter={16}>
            <Col lg={6} md={6} sm={24} xs={24}>
              <SelectBox
                option={accountNumbersFromStore && accountNumbersFromStore}
                change={AcountSelection}
                value={AccountNumber}
                label="Account Number"
                required={true}
                name="AccountNumber"
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <TextField
                change={CodeHandler}
                value={AccountDetails.BranchCode}
                size="small"
                label="Branch Code"
                fullWidth
                textLength={4}
                minLength={4}
                required
                name="BranchCode"
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <TextField
                change={AccountDetailsHandler}
                value={AccountDetails.BranchName}
                name="BranchName"
                size="small"
                label="Branch Name"
                fullWidth
                textLength={300}
                required
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <TextField
                change={CodeHandler}
                name="RegionCode"
                size="small"
                label="Region Code"
                value={AccountDetails.RegionCode}
                fullWidth
                textLength={2}
                minLength={2}
                required
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <TextField
                change={AccountDetailsHandler}
                name="RegionName"
                size="small"
                value={AccountDetails.RegionName}
                label="Region Name"
                fullWidth
                textLength={40}
                required
              />
            </Col>
            <Col lg={24} md={24} sm={24} xs={24}>
              <b style={{ fontSize: "1rem" }}>Sundry Analysis</b>
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <TextField
                value={AccountDetails.SCode}
                change={AccountDetailsHandler}
                size="small"
                label="Sundry Code"
                textLength={2}
                width="100%"
                name="SCode"
                minLength={2}
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <TextField
                change={AccountDetailsHandler}
                value={AccountDetails.SDescription}
                size="small"
                label="Sundry Description"
                fullWidth
                textLength={40}
                width="100%"
                name="SDescription"
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              {/* <div style={{ marginTop: 22 }} /> */}
              <TextField
                change={AccountDetailsHandler}
                name="FacCode"
                size="small"
                label="Type of Facility Code"
                fullWidth
                textLength={2}
                minLength={2}
                required
                value={AccountDetails.FacCode}
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              {/* <div style={{ marginTop: 22 }} /> */}
              <TextField
                change={AccountDetailsHandler}
                name="FacName"
                size="small"
                label="Type of Facility Description"
                fullWidth
                textLength={40}
                required
                value={AccountDetails.FacName}
              />
            </Col>
          </Row>
          <div style={{ marginTop: "20px" }} />
          {console.log("FRATotal", SectionDetails)}
          <FancyBoxSection
            hide={false}
            columns={column}
            setAccountSancationInfo={setAccountSancationInfo}
            AccountSancationInfo={AccountSancationInfo}
            DatePicker={DatePicker}
            AccountDetailsHandler={AccountDetailsHandler}
            SectionDetails={SectionDetails}
            DateDisplayFormat={DateDisplayFormat}
            calculatorBoxhandler={calculatorBoxhandlerdata}
          />
          <Row gutter={16} style={{ backgroundColor: "#E8F3F3" }}>
            <Col lg={24} md={24} sm={24} xs={24} align="center">
              <Button
                text={"Add Record"}
                icon={<AddIcon />}
                applyClass="btnSecondarySolid"
                size="large"
                click={AddSectionDetails}
              />
            </Col>
          </Row>
          <div style={{ marginTop: "20px" }} />
          <Title level={4}>Collateral Details</Title>
          <Row gutter={16}>
            <Col lg={6} md={6} sm={24} xs={24}>
              <SelectBox
                // required
                label="Nature of Security"
                option={setupForms.NatureOfSecuritys}
                name="natureOfSecurity"
                propertyName={"title"}
                value={accountCollateralSection.natureOfSecurity}
                change={collateralSectionHandlerNew}
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <SelectBox
                // required
                label="Nature of Charge"
                option={setupForms.NatureofCharges}
                name="natureOfCharge"
                propertyName={"title"}
                value={accountCollateralSection.natureOfCharge}
                change={collateralSectionHandlerNew}
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <FormattedInputs
                fullWidth
                Label="FS Value of Security"
                size="small"
                numLength={15}
                minLength={15}
                name="fsValue"
                value={
                  accountCollateralSection.fsValue === -1
                    ? null
                    : accountCollateralSection.fsValue
                }
                change={AccountColleteralNumberField}
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <DatePicker
                size="large"
                width="100%"
                placeholder={"Date of Valuation"}
                name="dateOfValuation"
                value={
                  accountCollateralSection.dateOfValuation
                    ? DateDisplayFormat(
                        accountCollateralSection.dateOfValuation
                      )
                    : null
                }
                DateRange
                change={collateralSectionHandlerNew}
              />
            </Col>
            <Col
              style={{
                backgroundColor: "#E8F3F3",
                marginTop: "20px",
              }}
              lg={24}
              md={24}
              sm={24}>
              <div style={{ marginTop: "2%" }} />
              <Table
                rows={AccountCollateralValue}
                columns={columns}
                scroll={{ x: "max-content" }}
                pagination={true}
              />
              <div style={{ marginTop: "2%" }} />
              <Col lg={24} md={24} sm={24} xs={24} align="center">
                <Button
                  text={"Add Record"}
                  icon={<AddIcon />}
                  applyClass="btnSecondarySolid"
                  size="large"
                  click={AddMultipleCollateralDetails}
                />
              </Col>
            </Col>
          </Row>
          <div style={{ marginTop: "20px" }} />
          <FancyBox
            state={AccountDetails}
            handler={calculatorBoxhandler}
            ABNSTotal={AccountDetails.ABNSTotal}
            APBSTotal={AccountDetails.APBSTotal}
            FRATotal={AccountDetails.FRATotal}
            required
            setallinput={setallinput}
            allinput={allinput}
          />
          <Row gutter={16} style={{ backgroundColor: "#E8F3F3" }}>
            <Col lg={24} md={24} sm={24} xs={24} align="center">
              <Title level={4}>Consolidated</Title>
            </Col>
            <ConsolidateBox
              state={consolidateCalculatorBox}
              FRATotal={consolidateCalculatorBox.FRATotal}
              ABNSTotal={consolidateCalculatorBox.ABNSTotal}
              APBSTotal={consolidateCalculatorBox.APBSTotal}
              disable={true}
            />
            <Col lg={24} md={24} sm={24} xs={24} align="center">
              <Button
                text={ButtonText}
                icon={<AddIcon />}
                applyClass="btnSecondarySolid"
                size="large"
                click={AddRecordHandler}
              />
            </Col>
          </Row>
        </Paper>
        <div style={{ marginTop: "20px" }} />
        <Paper padding="1" section>
          <Title level={4}>Additional Detail</Title>
          <Row gutter={8}>
            <Col lg={6} md={6} sm={24}>
              <SelectBox
                label="Classification of Advances"
                option={setupForms.ClassificationOfAdvances}
                propertyName={"title"}
                name="AdvanceClassificationID"
                change={addDetailsSectionHandler}
                required
                value={additionalDetailsSection.AdvanceClassificationID}
              />
            </Col>
            <Col lg={6} md={6} sm={24}>
              <label>
                {" "}
                <b>Charge Off</b>{" "}
              </label>
              <br />
              <Radio.Group
                required
                name="ChargeOfType"
                onChange={addDetailsSectionHandler}
                value={additionalDetailsSection.ChargeOfType}
              >
                <Radio disabled={enableRadio} value={2}>
                  New Charge-Off
                </Radio>
                <Radio disabled={enableRadio} value={3}>
                  Old Charge-Off
                </Radio>
              </Radio.Group>
            </Col>
            <Col lg={6} md={6} sm={24}>
              <TextField
                fullWidth
                label="Approval Number"
                size="small"
                textLength={30}
                name="ApprovalNumber"
                change={addDetailsSectionHandler}
                value={additionalDetailsSection.ApprovalNumber}
              />
            </Col>
            <Col lg={6} md={6} sm={24}>
              <DatePicker
                size="large"
                width="100%"
                DateRange
                placeholder={"Date of Approval *"}
                name="DateOfApproval"
                change={addDetailsSectionHandler}
                value={
                  additionalDetailsSection.DateOfApproval
                    ? DateDisplayFormat(additionalDetailsSection.DateOfApproval)
                    : null
                }
              />
            </Col>
            <Col lg={12} md={12} sm={24}>
              <DatePicker
                size="large"
                width="100%"
                DateRange
                name="DateOfWriteoff"
                change={addDetailsSectionHandler}
                placeholder={"Date of Write off *"}
                value={
                  additionalDetailsSection.DateOfWriteoff
                    ? DateDisplayFormat(additionalDetailsSection.DateOfWriteoff)
                    : null
                }
              />
            </Col>
            <Col lg={6} md={6} sm={24}>
              <SelectBox
                label="Reason of Write off"
                option={setupForms.WOFReasons}
                name="WriteOffReason"
                propertyName={"title"}
                required
                change={addDetailsSectionHandler}
                value={additionalDetailsSection.WriteOffReason}
              />
            </Col>
            <Col lg={6} md={6} sm={24} align="left">
              <label>
                {" "}
                <b>
                  Remarks <span style={{ color: "red" }}>*</span>
                </b>{" "}
              </label>{" "}
              <br />
              <Radio.Group
                required
                value={additionalDetailsSection.Remarks}
                onChange={addDetailsSectionHandler}
                name="Remarks"
              >
                <Radio required value={1}>
                  Settlement
                </Radio>
                <Radio required value={2}>
                  Book Cleaning
                </Radio>
              </Radio.Group>
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              <FormattedInputs
                fullWidth
                Label="Sale of Security"
                size="small"
                minLength={15}
                numLength={15}
                name="SaleOfSecurity"
                value={collateralSection.SaleOfSecurity}
                change={ColleteralNumberField}
              />
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              <TextField
                fullWidth
                label="Details of Securities obtained at the time of initial approval of loan"
                size="small"
                textLength={3000}
                // minLength={100}
                maxLength={3000}
                name="DetailsOfSecurity"
                value={collateralSection.DetailsOfSecurity}
                change={collateralSectionHandler}
              />
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              <TextField
                fullWidth
                label="Change in Securities held by the bank during the loan period"
                size="small"
                name="ChangeInSecurity"
                value={collateralSection.ChangeInSecurity}
                change={collateralSectionHandler}
                textLength={3000}
                // minLength={100}
                maxLength={3000}
              />
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              <TextField
                fullWidth
                // label="Details security by the bank at approving W-off"
                label="Details of Securities held by the bank at the time of approving write off case"
                size="small"
                name="SecuritybyBankAtWriteOff"
                value={collateralSection.SecuritybyBankAtWriteOff}
                change={collateralSectionHandler}
                textLength={3000}
                // minLength={100}
                maxLength={3000}
              />
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              <div style={{ marginTop: "20px" }} />
              <label>
                <b>
                  Whether pledge stocks held by the bank was lifted by to the
                  borrower ?
                </b>
              </label>
              <br />
              <Radio.Group
                onChange={collateralSectionHandler}
                name="PledgeLifted"
                value={collateralSection.PledgeLifted}
              >
                <Radio value={1}>Yes</Radio>
                <Radio value={2}>No</Radio>
              </Radio.Group>
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              <div style={{ marginTop: "20px" }} />
              <label>
                <b>
                  Whether Securities held by the bank was not perfect at
                  ab-initio level?
                </b>
              </label>
              <br />
              <Radio.Group
                onChange={collateralSectionHandler}
                name="ABInitioLevel"
                value={collateralSection.ABInitioLevel}
              >
                <Radio value={1}>Yes</Radio>
                <Radio value={2}>No</Radio>
              </Radio.Group>
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              <div style={{ marginTop: "20px" }} />
              <label>
                {" "}
                <b>Whether borrower was a willful defaulter?</b>
              </label>{" "}
              <br />
              <Radio.Group
                onChange={collateralSectionHandler}
                name="WillfullDefaulter"
                // value={collateralSection.WillfullDefaulter}
                defaultValue={2}
              >
                <Radio value={1}>Yes</Radio>
                <Radio value={2}>No</Radio>
              </Radio.Group>
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              <div style={{ marginTop: "20px" }} />
              <label>
                <b>
                  After write-off, Do bank surrender/cease the right of
                  recovery?
                </b>
              </label>
              <br />
              <Radio.Group
                onChange={collateralSectionHandler}
                name="RightOfRecovery"
                value={collateralSection.RightOfRecovery}
                disabled
              >
                <Radio value={1}>Yes</Radio>
                <Radio value={2}>No</Radio>
              </Radio.Group>
            </Col>
          </Row>
        </Paper>
        <div style={{ marginTop: "20px" }} />
        <Paper padding="1" section>
          <Title level={4}>Recovery After Write-off</Title>
          <Row gutter={8}>
            <Col lg={6} md={6} sm={24} xs={24}>
              <DatePicker
                change={recoveryWriteOffSectionHandler}
                name="DateOfRecovery"
                size="large"
                width="100%"
                DateRange
                value={
                  recoveryWriteOffSection.DateOfRecovery
                    ? DateDisplayFormat(recoveryWriteOffSection.DateOfRecovery)
                    : ""
                }
                placeholder={"Date of Recovery"}
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <FormattedInputs
                fullWidth
                label="Principal"
                size="small"
                numLength={15}
                name="Principal"
                value={recoveryWriteOffSection.Principal}
                change={recoveryNumberField}
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <FormattedInputs
                fullWidth
                label="Nominated (Debited Mark-up)"
                size="small"
                numLength={15}
                name="Nominated"
                value={recoveryWriteOffSection.Nominated}
                change={recoveryNumberField}
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <FormattedInputs
                fullWidth
                label="Non-Accrual (Un-Debited Mark-up)"
                size="small"
                numLength={15}
                name="Nonaccural"
                value={recoveryWriteOffSection.Nonaccural}
                change={recoveryNumberField}
              />
            </Col>
            <div style={{ marginTop: "10px" }} />
            <Row gutter={8}>
              <Col lg={12} md={12} sm={24} xs={24}>
                <FormattedInputs
                  fullWidth
                  label="Other Charges"
                  size="small"
                  numLength={15}
                  name="OtherCharges"
                  value={recoveryWriteOffSection.OtherCharges}
                  change={recoveryNumberField}
                />
              </Col>
              <Col lg={12} md={12} sm={24} xs={24}>
                <FormattedInputs
                  fullWidth
                  label="Penal Interest"
                  size="small"
                  numLength={15}
                  name="PenalInterest"
                  value={recoveryWriteOffSection.PenalInterest}
                  change={recoveryNumberField}
                />
              </Col>
              <Col lg={6} md={6} sm={24} xs={24}>
                <FormattedInputs
                  disable
                  fullWidth
                  label="Total"
                  size="small"
                  numLength={15}
                  name="Total"
                  value={recoveryWriteOffSection.Total}
                  change={recoveryNumberField}
                />
              </Col>
            </Row>
          </Row>
        </Paper>
        <div style={{ marginTop: "20px" }} />
        <Row gutter={16}>
          <Col lg={24} md={24} sm={24} xs={24} align="center">
            <Button
              type="submit"
              applyClass="btnBorderStyledBeach"
              text="Next"
              endIcon={<i className="icon-arrow-right icon-size-one"></i>}
            />
          </Col>
        </Row>
      </form>
      <Notification setOpen={setOpen} open={open.open} message={open.message} />
      <Notification
        setOpen={setOpenApproval}
        open={openApproval}
        message={"Select Date of Approval"}
        Type={Message.warning}
      />
      <Notification
        setOpen={setOpenWriteoff}
        open={openWriteoff}
        message={"Select Date of Write off"}
        Type={Message.warning}
      />
    </>
  ) : (
    <SaveRecord
      setGoToSave={setGoToSave}
      goToSave={goToSave}
      PreviousPageDetails={FinalDetails}
      WofCode={wofcode}
      setOpen={setOpen}
      setwofcode={setwofcode}
    />
  );
};

export default AddWriteOff;
