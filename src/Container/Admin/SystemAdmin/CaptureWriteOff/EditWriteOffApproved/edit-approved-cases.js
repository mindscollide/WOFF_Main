import React, { useEffect, useState, useRef } from "react";
import { Grid, Box } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { Typography, Radio, Tooltip } from "antd";
import {
  Paper,
  InputWithBtn,
  TextField,
  SelectBox,
  DatePicker,
  Button,
  FancyBox,
  ConsolidateBox,
  Notification,
  FormattedInputs,
  FancyBoxSection,
  Table,
} from "../../../../../Components/Elements";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { directorTypeOptions } from "../../../../../Common/SelectFieldOption/select-field-option";
import {
  ViewWriteOff,
  NullState,
  EditApprovedWriteOff,
} from "../../../../../store/actions/write-off-actions";
import EditApprovedRecord from "./edit-approved-record";
import {
  DateDisplayFormat,
  DateSendingFormat,
  NumberFormater,
  CommaFormter,
} from "../../../../../Common/Functions/date-formatter";
import {
  GetBorrowerType,
  GetAdvanceClassification,
  GetManagementUnit,
  GetNatureofCharge,
  GetNatureOfSecurity,
  GetWOFReason,
} from "../../../../../store/actions/setup-forms-actions";
const EditApprovedCases = () => {
  const { Title } = Typography;
  let WriteOffData = useSelector((state) => state.writeOffCases.WriteOffData);
  const state = useSelector((state) => state);
  const { setupForms } = state;
  const dispatch = useDispatch();
  const history = useHistory();
  const [openN, setOpenN] = useState(false);
  const [openApproval, setOpenApproval] = useState(false);
  const [openWriteoff, setOpenWriteoff] = useState(false);
  const [allinput, setallinput] = useState(true);
  const [accountNumbersFromStore, setAccountNumbersFromStore] = useState(null);
  const [enableRadio, setEnableRadio] = useState(true);
  const [goToSave, setGoToSave] = useState(false);
  const [FinalDetails, setFinalDetails] = useState({});
  const [misysSection, setMisysSection] = useState({
    MisysCode: null,
    WOFCode: null,
    NPLCode: null,
    Iparty: null,
    BorrowerName: null,
    AddressOfBorrower: null,
    NTNNumber: null,
    ManagementUnitID: null,
    // SCode: null,
    // SDescription: null,
    BorrowerTypeID: null,
  });
  const [open, setOpen] = useState({
    open: false,
    message: "",
  });
  const [AccountNumber, setAccountNumber] = useState("Select...");
  const [saveValue, setsaveValue] = useState(null);
  let UserDetails = JSON.parse(localStorage.getItem("UserDetails"));
  const [AccountSection, setAccountSection] = useState([
    { AccountNumber: "", AccountDetails: {}, AccountCollateral: {} },
  ]);
  // use for already exist data fllag
  const [alreadyExistData, setAlreadyExistData] = useState(true);

  let CustomerId = JSON.parse(localStorage.getItem("wofCustomerMasterID"));
  const [AccountDetails, setAccountDetails] = useState({
    FacCode: null,
    FacName: null,
    SCode: null,
    SDescription: null,
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
    FRANominated: 0,
    FRANonAccural: 0,
    FRAOtherCharges: 0,
    FRAPenalInterest: 0,
    FRATotal: 0,
  });
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
  const [additionalDetailsSection, setAdditionalDetailsSection] = useState({
    AdvanceClassificationID: null,
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
    PledgeLifted: -1,
    ABInitioLevel: -1,
    WillfullDefaulter: -1,
    RightOfRecovery: -1,
  });
  const [recoveryWriteOffSection, setRecoveryWriteOffSection] = useState({
    DateOfRecovery: null,
    Principal: 0,
    Nominated: 0,
    Nonaccural: 0,
    OtherCharges: 0,
    PenalInterest: 0,
    Total: 0,
  });
  // changes huz
  // for account Collatrels
  const [accountCollateralSection, setAccountCollateralSection] = useState({
    natureOfSecurity: null,
    natureOfCharge: null,
    fsValue: null,
    dateOfValuation: null,
  });
  const [AccountCollateral, setAccountCollateral] = useState([]);
  const [AccountCollateralValue, setAccountCollateralValue] = useState([]);
  const [SectionDetails, setSectionDetails] = useState({
    lrAmount: null,
    lrDate: "",
  });
  const [AccountSancationInfo, setAccountSancationInfo] = useState([]);

  const calculatorBoxhandlerdata = (e) => {
    if (AccountNumber !== "") {
      if (String(Number(e.target.value)).length <= 17) {
        setSectionDetails({
          ...SectionDetails,
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
      let tem = [];
      let temValue = [];
      if (date != null) {
        let fsData = accountCollateralSection.fsValue;
        if (fsData != null) {
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
        let fsData = accountCollateralSection.fsValue;
        if (fsData != null) {
          tem = {
            natureOfSecurity: setupForms.NatureOfSecuritys[index6].id,
            natureOfCharge: setupForms.NatureofCharges[index5].id,
            fsValue: accountCollateralSection.fsValue,
            dateOfValuation: "",
          };
          temValue = {
            natureOfSecurity: accountCollateralSection.natureOfSecurity,
            natureOfCharge: accountCollateralSection.natureOfCharge,
            fsValue: accountCollateralSection.fsValue,
            dateOfValuation: "",
          };
        } else
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
            fsValue: null,
            dateOfValuation: null,
          });
        } else {
          setAccountCollateralSection({
            natureOfSecurity: null,
            natureOfCharge: null,
            fsValue: null,
            dateOfValuation: null,
          });
          setAccountCollateral([...AccountCollateral, tem]);
          setAccountCollateralValue([...AccountCollateralValue, temValue]);
        }
      } else {
        setAccountCollateralSection({
          natureOfSecurity: null,
          natureOfCharge: null,
          fsValue: null,
          dateOfValuation: null,
        });
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
  };
  // const AddMultipleCollateralDetails = () => {
  //   console.log("accountCollateralSection", accountCollateralSection);
  //   if (
  //     accountCollateralSection.dateOfValuation !== null ||
  //     accountCollateralSection.natureOfCharge !== null ||
  //     accountCollateralSection.natureOfSecurity !== null ||
  //     (accountCollateralSection.fsValue !== null &&
  //       accountCollateralSection.fsValue !== "")
  //   ) {
  //     let index5 = setupForms.NatureofCharges.findIndex(
  //       (x) => x.title === accountCollateralSection.natureOfCharge
  //     );
  //     let index6 = setupForms.NatureOfSecuritys.findIndex(
  //       (x) => x.title === accountCollateralSection.natureOfSecurity
  //     );
  //     let tem = [];
  //     tem = {
  //       natureOfSecurity: setupForms.NatureOfSecuritys[index6].id,
  //       natureOfCharge: setupForms.NatureofCharges[index5].id,
  //       fsValue: parseInt(accountCollateralSection.fsValue),
  //       dateOfValuation: accountCollateralSection.dateOfValuation,
  //     };

  //     let temValue = [];
  //     temValue = {
  //       natureOfSecurity: accountCollateralSection.natureOfSecurity,
  //       natureOfCharge: accountCollateralSection.natureOfCharge,
  //       fsValue: parseInt(accountCollateralSection.fsValue),
  //       dateOfValuation: accountCollateralSection.dateOfValuation,
  //     };
  //     var t = [];
  //     t = AccountCollateral;
  //     if (t.length > 0) {
  //       if (
  //         tem.natureOfSecurity === t[t.length - 1].natureOfSecurity &&
  //         tem.natureOfCharge === t[t.length - 1].natureOfCharge &&
  //         tem.fsValue === t[t.length - 1].fsValue &&
  //         tem.dateOfValuation === t[t.length - 1].dateOfValuation
  //       ) {
  //         setOpen({
  //           ...open,
  //           open: true,
  //           message: "Data Already Exsist",
  //         });
  //         setAccountCollateralSection({
  //           natureOfSecurity: null,
  //           natureOfCharge: null,
  //           fsValue: null,
  //           dateOfValuation: null,
  //         });
  //       } else {
  //         setAccountCollateralSection({
  //           natureOfSecurity: null,
  //           natureOfCharge: null,
  //           fsValue: null,
  //           dateOfValuation: null,
  //         });
  //         setAccountCollateral([...AccountCollateral, tem]);
  //         setAccountCollateralValue([...AccountCollateralValue, temValue]);
  //       }
  //     } else {
  //       setAccountCollateralSection({
  //         natureOfSecurity: null,
  //         natureOfCharge: null,
  //         fsValue: null,
  //         dateOfValuation: null,
  //       });
  //       console.log("AccountCollateral", AccountCollateral);
  //       setAccountCollateral([...AccountCollateral, tem]);
  //       setAccountCollateralValue([...AccountCollateralValue, temValue]);
  //     }
  //   } else {
  //     setOpen({
  //       ...open,
  //       open: true,
  //       message: "Select Account Number First",
  //     });
  //   }
  // };
  // add AccountSancationInfo in Account details
  const AddSectionDetails = () => {
    let lrAmount = SectionDetails.lrAmount;
    let lrDate = SectionDetails.lrDate;
    if (lrAmount != null || lrDate != "") {
      let tem = [];
      if (lrAmount && lrDate) {
        tem = {
          lrAmount: SectionDetails.lrAmount,
          lrDate: SectionDetails.lrDate,
        };
      } else if (lrAmount != null && lrDate === "") {
        tem = {
          lrAmount: SectionDetails.lrAmount,
          lrDate: "",
        };
      } else if (lrAmount === null && lrDate != "") {
        tem = {
          lrAmount: -1,
          lrDate: SectionDetails.lrDate,
        };
      } else {
        console.log("empty");
      }

      setAccountSancationInfo([...AccountSancationInfo, tem]);
      setSectionDetails({
        lrAmount: null,
        lrDate: "",
      });
    } else {
      setOpen({
        ...open,
        open: true,
        message: "Select Sanction Details",
      });
    }
    // let tem = [];
    // tem = {
    //   lrAmount: SectionDetails.lrAmount,
    //   lrDate: SectionDetails.lrDate,
    // };
    // setAccountSancationInfo([...AccountSancationInfo, tem]);
    // setSectionDetails({
    //   lrAmount: null,
    //   lrDate: "",
    // });
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
  // AccountSancationInfo on update
  useEffect(() => {
    if (AccountSancationInfo.length > 0) {
      CheckSectionAvailablity(true);
    }
  }, [AccountSancationInfo]);
  const Delete = (e, value) => {
    let index5 = setupForms.NatureofCharges.findIndex(
      (x) => x.title === value.natureOfCharge
    );
    let index6 = setupForms.NatureOfSecuritys.findIndex(
      (x) => x.title === value.natureOfSecurity
    );
    let tem = [];
    tem = {
      dateOfValuation: value.dateOfValuation,
      fsValue: parseInt(value.fsValue),
      natureOfCharge: setupForms.NatureofCharges[index5].id,
      natureOfSecurity: setupForms.NatureOfSecuritys[index6].id,
    };
    AccountCollateral.shift(tem);
    const filteredItems = AccountCollateral.filter((item) => item !== tem);
    const filteredItemsValue = AccountCollateralValue.filter(
      (item) => item !== value
    );
    // setAccountCollateral(filteredItems);
    setAccountCollateralValue(filteredItemsValue);
  };
  console.log(
    "AccountCollateralValue aa",
    AccountCollateralValue,
    AccountSection
  );
  // const changenaturehandler = (text) => {
  //   let index6 = setupForms.NatureofCharges.findIndex((x) => x.id === text);
  //   let natureOfCharge = setupForms.NatureofCharges[index6];
  //   let data;
  //   if (natureOfCharge != undefined) {
  //     console.log("setupForms.NatureofCharges[index6]", natureOfCharge);
  //     return natureOfCharge.title;
  //   }
  // };
  // const changenaturesecurityhandler = (text) => {
  //   let type = typeof text;
  //   console.log("typeof", type === "number");
  //   if (type === "number") {
  //     let index6 = setupForms.NatureOfSecuritys.findIndex((x) => x.id === text);
  //     let natureOfCharge = setupForms.NatureOfSecuritys[index6];
  //     if (natureOfCharge != undefined) {
  //       console.log("setupForms.NatureofCharges[index6]", natureOfCharge);
  //       return natureOfCharge.title;
  //     }
  //   }
  // };
  const column = [
    {
      title: "Nature of Security",
      dataIndex: "natureOfSecurity",
      key: "natureOfSecurity",
      align: "center",
      width: "3%",
    },
    {
      title: "Nature of Charge",
      dataIndex: "natureOfCharge",
      key: "natureOfCharge",
      align: "center",
      width: "4%",
    },
    {
      title: "FS Value of Security ",
      dataIndex: "fsValue",
      key: "fsValue",
      align: "center",
      width: "5%",
      render: (text) => {
        if (text === -1) {
          return "";
        } else if (text != -1) {
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

  // delete of section detail
  const DeleteSec = (e, value) => {
    const filteredItems = AccountSancationInfo.filter((item) => item !== value);
    console.log("value", filteredItems);
    setAccountSancationInfo(filteredItems);
  };
  const columns = [
    {
      title: "Sanction/Last Renewal Date",
      dataIndex: "lrDate",
      key: "lrDate",
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
  // //////////
  const [sectionIndex, setSectionIndex] = useState(null);
  const sectionIndexHandler = (ind) => {
    setSectionIndex(ind);
  };
  const [sponsorOwnerDetail, setSponsorOwnerDetail] = useState([
    {
      DirectorTypeID: null,
      DirectorName: null,
      CNIC: null,
      FatherHusband: null,
      Address: null,
    },
  ]);

  const misysSectionHandler = (e, val) => {
    let id = e.target.id;
    let name = e.target.name;
    let value = e.target.value;
    if (id.includes("ManagementUnitID")) {
      setMisysSection({ ...misysSection, ["ManagementUnitID"]: val.title });
    } else if (id.includes("BorrowerTypeID")) {
      setMisysSection({ ...misysSection, ["BorrowerTypeID"]: val.title });
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
      if (index !== -1) {
        let Data = AccountSection[index].AccountDetails;
        let Data2 = AccountSection[index].AccountSancationInfo;
        let Data3 = AccountSection[index].AccountCollateral;
        setAccountDetails({
          ...AccountDetails,
          FacCode: Data.FacCode,
          FacName: Data.FacName,
          BranchCode: Data.BranchCode,
          BranchName: Data.BranchName,
          RegionCode: Data.RegionCode,
          RegionName: Data.RegionName,
          ABNSOutstandingPrincipal: Data.ABNSOutstandingPrincipal,
          ABNSOutstandingNominal: Data.ABNSOutstandingNominal,
          ABNSOutstandingNonAccural: Data.ABNSOutstandingNonAccural,
          ABNSOtherCharges: Data.ABNSOtherCharges,
          ABNSPenalInterest: Data.ABNSPenalInterest,
          ABNSTotal: Data.ABNSTotal,
          APBSOutstandingPrincipal: Data.APBSOutstandingPrincipal,
          APBSOutstandingNominal: Data.APBSOutstandingNominal,
          APBSOutstandingNonAccural: Data.APBSOutstandingNonAccural,
          APBSOtherCharges: Data.APBSOtherCharges,
          APBSPenalInterest: Data.APBSPenalInterest,
          APBSTotal: Data.APBSTotal,
          FRAPrincipal: Data.FRAPrincipal,
          FRANominated: Data.FRANominated,
          FRANonAccural: Data.FRANonAccural,
          FRAOtherCharges: Data.FRAOtherCharges,
          FRAPenalInterest: Data.FRAPenalInterest,
          FRATotal: Data.FRATotal,
          SCode: Data.sCode,
          SDescription: Data.sDescription,
        });
        setAccountSancationInfo(Data2);
        if (Data3.length > 0) {
          setAccountCollateral(Data3);
          setAlreadyExistData(true);
        } else {
          setAlreadyExistData(true);
          setAccountCollateralSection({
            NatureOfSecurity: null,
            NatureOfCharge: null,
            FSValue: null,
            DateOfValuation: null,
          });
          setAccountCollateral([]);
          setAccountCollateralValue([]);
        }

        console.log("AccountDetails aa", AccountSancationInfo);
      } else {
        console.log("Not Found");
      }
    }
  };
  const AccountDetailsHandler = (e) => {
    console.log("SectionDetails", e.target.value);
    if (e.target.name == "lrDate" && e.target.value !== "") {
      setSectionDetails({
        ...SectionDetails,
        [e.target.name]: DateSendingFormat(e.target.value),
      });
      setAlreadyExistData(true);
    } else {
      setAccountDetails({ ...SectionDetails, [e.target.name]: e.target.value });
      setAlreadyExistData(true);
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
  const calculatorBoxhandler = (e) => {
    if (AccountNumber !== "") {
      if (String(Number(e.target.value)).length <= 17) {
        setAccountDetails({
          ...AccountDetails,
          [e.target.name]: Number(e.target.value),
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
  const AddRecordHandler = () => {
    if (AccountNumber !== "" && AccountNumber !== "Select...") {
      let { input, input1, input2, input3, input4, input5 } = CheckAllInput();
      console.log(input, input1, input2, input3, input4, input5);
      if (input && input1 && input2 && input3 && input4 && input5) {
        CheckAccountAvailablity(true);
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
    console.log(flag);
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
    let ConsolidateBoxes = {
      ABNSOutstandingPrincipal: AccountSection.map(
        (data) => data.AccountDetails.ABNSOutstandingPrincipal
      ).reduce((a, b) => a + b, 0),
      ABNSOutstandingNominal: AccountSection.map(
        (data) => data.AccountDetails.ABNSOutstandingNominal
      ).reduce((a, b) => a + b, 0),
      ABNSOutstandingNonAccural: AccountSection.map(
        (data) => data.AccountDetails.ABNSOutstandingNonAccural
      ).reduce((a, b) => a + b, 0),
      ABNSOtherCharges: AccountSection.map(
        (data) => data.AccountDetails.ABNSOtherCharges
      ).reduce((a, b) => a + b, 0),
      ABNSPenalInterest: AccountSection.map(
        (data) => data.AccountDetails.ABNSPenalInterest
      ).reduce((a, b) => a + b, 0),
      ABNSTotal: AccountSection.map(
        (data) => data.AccountDetails.ABNSTotal
      ).reduce((a, b) => a + b, 0),
      APBSOutstandingPrincipal: AccountSection.map(
        (data) => data.AccountDetails.APBSOutstandingPrincipal
      ).reduce((a, b) => a + b, 0),
      APBSOutstandingNominal: AccountSection.map(
        (data) => data.AccountDetails.APBSOutstandingNominal
      ).reduce((a, b) => a + b, 0),
      APBSOutstandingNonAccural: AccountSection.map(
        (data) => data.AccountDetails.APBSOutstandingNonAccural
      ).reduce((a, b) => a + b, 0),
      APBSOtherCharges: AccountSection.map(
        (data) => data.AccountDetails.APBSOtherCharges
      ).reduce((a, b) => a + b, 0),
      APBSPenalInterest: AccountSection.map(
        (data) => data.AccountDetails.APBSPenalInterest
      ).reduce((a, b) => a + b, 0),
      APBSTotal: AccountSection.map(
        (data) => data.AccountDetails.APBSTotal
      ).reduce((a, b) => a + b, 0),
      FRAPrincipal: AccountSection.map(
        (data) => data.AccountDetails.FRAPrincipal
      ).reduce((a, b) => a + b, 0),
      FRANominated: AccountSection.map(
        (data) => data.AccountDetails.FRANominated
      ).reduce((a, b) => a + b, 0),
      FRANonAccural: AccountSection.map(
        (data) => data.AccountDetails.FRANonAccural
      ).reduce((a, b) => a + b, 0),
      FRAOtherCharges: AccountSection.map(
        (data) => data.AccountDetails.FRAOtherCharges
      ).reduce((a, b) => a + b, 0),
      FRAPenalInterest: AccountSection.map(
        (data) => data.AccountDetails.FRAPenalInterest
      ).reduce((a, b) => a + b, 0),
      FRATotal: AccountSection.map(
        (data) => data.AccountDetails.FRATotal
      ).reduce((a, b) => a + b, 0),
    };
    setConsolidateCalculatorBox(ConsolidateBoxes);
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
      setAdditionalDetailsSection({
        ...additionalDetailsSection,
        ["WriteOffReason"]: val.title,
      });
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
    if (id && id.includes("natureOfSecurity")) {
      setCollateralSection({
        ...collateralSection,
        ["natureOfSecurity"]: val.title,
      });
    } else if (id && id.includes("natureOfCharge")) {
      setCollateralSection({
        ...collateralSection,
        ["natureOfCharge"]: val.title,
      });
    } else if (name == "dateOfValuation" && value !== "") {
      setCollateralSection({
        ...collateralSection,
        [name]: DateSendingFormat(value),
      });
    } else {
      setCollateralSection({
        ...collateralSection,
        [name]: value,
      });
    }
  };
  // for account collatreal section add new value
  const collateralSectionHandlerNew = (e, val) => {
    let id = e.target.id !== undefined ? e.target.id : null;
    let name = e.target.name;
    let value = e.target.value;
    console.log(e.target.name);
    console.log(e.target.value);
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
      console.log("value", value);
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
    let id = e.target.id !== undefined ? e.target.id : null;
    let name = e.target.name;
    let value = e.target.value;
    if (String(parseInt(value)).length <= 17) {
      setCollateralSection({
        ...collateralSection,
        [name]: NumberFormater(value),
      });
    }
  };
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
    if (String(parseInt(value)).length <= 17) {
      setRecoveryWriteOffSection({
        ...recoveryWriteOffSection,
        [name]: NumberFormater(value),
      });
    }
  };
  const goToSaveHandler = (e) => {
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
      // if (misysSection.SCode == null) {
      //   misysSection.SCode = "";
      // }
      // if (misysSection.SDescription == null) {
      //   misysSection.SDescription = "";
      // }
    }
    if (AccountDetails) {
      if (AccountDetails.BranchCode == null) {
        AccountDetails.BranchCode = 0;
      }
      // if (AccountDetails.lrDate == null) {
      //   AccountDetails.lrDate = "18000101";
      // }
      // if (AccountDetails.lrAmount == null) {
      //   AccountDetails.lrAmount = 0;
      // }
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
      let index5 = setupForms.NatureofCharges.findIndex(
        (x) => x.title === collateralSection.natureOfCharge
      );
      let index6 = setupForms.NatureOfSecuritys.findIndex(
        (x) => x.title === collateralSection.natureOfSecurity
      );
      // collateralSection.natureOfCharge = setupForms.NatureofCharges[index5].id;
      // collateralSection.natureOfSecurity =
      //   setupForms.NatureOfSecuritys[index6].id;
      // if (collateralSection.dateOfValuation == null) {
      //   collateralSection.dateOfValuation = "18000101";
      // }
      // if (collateralSection.fsValue == null) {
      //   collateralSection.fsValue = 0;
      // }

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

    let FinalObject = {
      WOFCustomerMasterID: CustomerId,
      WOFCode: misysSection.WOFCode,
      MisysCode: misysSection.MisysCode,
      NPLCode: misysSection.NPLCode,
      WOFCode: misysSection.WOFCode,
      BorrowerName: misysSection.BorrowerName,
      AddressOfBorrower: misysSection.AddressOfBorrower,
      NTNNumber: misysSection.NTNNumber,
      ManagementUnitID: misysSection.ManagementUnitID,
      // SCode: misysSection.SCode,
      // SDescription: misysSection.SDescription,
      BorrowerTypeID: misysSection.BorrowerTypeID,
      Consolidated: consolidateCalculatorBox,
      Accounts: AccountSection,
      AdditionalDetails: additionalDetailsSection,
      Collateral: collateralSection,
      RecoveryAfterWriteOff: recoveryWriteOffSection,
      SponsorOwnerDetail: sponsorOwnerDetail,
      UserID: UserDetails.userID,
      SendForApproval: saveValue,
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
        if (FinalObject.Accounts.length !== 0) {
          if (saveValue == 0) {
            setFinalDetails(FinalObject);
            setGoToSave(!goToSave);
          } else if (saveValue == 1) {
            dispatch(EditApprovedWriteOff(FinalObject, history, setOpen));
            setFinalDetails(FinalObject);
          } else if (saveValue == 2) {
            dispatch(EditApprovedWriteOff(FinalObject, history, setOpen));
            setFinalDetails(FinalObject);
          }
        } else {
          setOpen({
            ...open,
            open: true,
            message: "Please Add atleast One Account Number",
          });
        }
      }
    } else {
      setOpen({
        ...open,
        open: true,
        message: "Please Fill All Fields Correctly",
      });
    }

    //  dispatch(EditApprovedWriteOff(FinalObject));
  };
  // for update AccountCollateral Values
  const ConsolidateAccountCollateral = (e) => {
    console.log("AccountCollateral huz", AccountCollateral);
    let tem = [];
    if (alreadyExistData) {
      console.log(
        "AccountCollateral alreadyExistData",
        setupForms.NatureofCharges
      );
      if (AccountCollateral.length > 0) {
        AccountCollateral.map((data, index) => {
          let typeNatureofCharges = typeof data.natureOfCharge;
          let typeNatureOfSecuritys = typeof data.natureOfSecurity;
          if (
            typeNatureofCharges === "text" &&
            typeNatureOfSecuritys === "text"
          ) {
            console.log("AccountCollateral text", setupForms.NatureofCharges);
            let index5 = setupForms.NatureofCharges.findIndex(
              (x) => x.title === data.natureOfCharge
            );
            let index6 = setupForms.NatureOfSecuritys.findIndex(
              (x) => x.title === data.natureOfSecurity
            );
            tem.push({
              dateOfValuation: data.dateOfValuation,
              fsValue: parseInt(data.fsValue),
              natureOfCharge: setupForms.NatureofCharges[index5].title,
              natureOfSecurity: setupForms.NatureOfSecuritys[index6].title,
            });
          } else if (
            typeNatureofCharges === "number" &&
            typeNatureOfSecuritys === "number"
          ) {
            console.log("AccountCollateral number", setupForms.NatureofCharges);
            let index5 = setupForms.NatureofCharges.findIndex(
              (x) => x.id === data.natureOfCharge
            );
            let index6 = setupForms.NatureOfSecuritys.findIndex(
              (x) => x.id === data.natureOfSecurity
            );
            tem.push({
              dateOfValuation: data.dateOfValuation,
              fsValue: parseInt(data.fsValue),
              natureOfCharge: setupForms.NatureofCharges[index5].title,
              natureOfSecurity: setupForms.NatureOfSecuritys[index6].title,
            });
          }
        });
        let PreviousAccounts = [...AccountSection];
        let index = PreviousAccounts.findIndex(
          (x) => x.AccountNumber === AccountNumber
        );
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
        setAccountCollateralValue(tem);
        setAlreadyExistData(false);
      }
    } else {
      let PreviousAccounts = [...AccountSection];
      let index = PreviousAccounts.findIndex(
        (x) => x.AccountNumber === AccountNumber
      );
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
  console.log(
    "AccountCollateralValue final",
    AccountSection,
    AccountCollateralValue
  );
  useEffect(() => {
    ConsolidateCalculation();
  }, [AccountSection]);
  useEffect(() => {
    ConsolidateCalculation();
  }, [AccountDetails]);
  useEffect(() => {
    if (AccountCollateral.length > 0) {
      console.log("AccountCollateralValue call", AccountCollateral);
      ConsolidateAccountCollateral();
    }
  }, [AccountCollateral]);
  // useEffect(()=>{

  // },[AccountCollateralValue])

  useEffect(() => {
    if (saveValue == null) {
      // if (
      //   Object.keys(WriteOffData).length !== 0 &&
      //   setupForms.ManagementUnits.length > 0 &&
      //   setupForms.BorrowerTypes.length > 0 &&
      //   setupForms.ClassificationOfAdvances.length > 0 &&
      //   setupForms.WOFReasons.length > 0 &&
      //   setupForms.NatureofCharges.length > 0 &&
      //   setupForms.NatureOfSecuritys.length > 0
      // )
      if (
        Object.keys(WriteOffData).length !== 0 &&
        setupForms.ManagementUnits.length > 0 &&
        setupForms.BorrowerTypes.length > 0 &&
        setupForms.ClassificationOfAdvances.length > 0 &&
        setupForms.WOFReasons.length > 0
      ) {
        let index = setupForms.ManagementUnits.findIndex(
          (x) => x.id === WriteOffData.managementUnitID
        );
        let index2 = setupForms.BorrowerTypes.findIndex(
          (x) => x.id === WriteOffData.borrowerTypeID
        );
        console.log("setupForms", setupForms.ManagementUnits);
        setMisysSection({
          ...misysSection,
          MisysCode: WriteOffData ? WriteOffData.misysCode : null,
          WOFCode: WriteOffData ? WriteOffData.wofCode : null,
          NPLCode: WriteOffData ? WriteOffData.nplCode : null,
          BorrowerName: WriteOffData ? WriteOffData.borrowerName : null,
          Iparty: WriteOffData ? WriteOffData.iParty : null,
          AddressOfBorrower: WriteOffData
            ? WriteOffData.addressOfBorrower
            : null,
          NTNNumber: WriteOffData ? WriteOffData.ntnNumber : null,
          ManagementUnitID: WriteOffData
            ? setupForms.ManagementUnits[index].title
            : null,
          // SCode: WriteOffData ? WriteOffData.sCode : null,
          // SDescription: WriteOffData ? WriteOffData.sDescription : null,
          BorrowerTypeID: WriteOffData
            ? setupForms.BorrowerTypes[index2].title
            : null,
        });
        if (WriteOffData.accounts !== null) {
          let Numbers = WriteOffData.accounts.map((item) => {
            return item.accountNumber;
          });
          let AccountDetails = WriteOffData.accounts.map((item) => {
            let Data = item.accountDetails;
            return {
              FacName: Data.facName,
              FacCode: Data.facCode,
              SCode: Data.sCode,
              SDescription: Data.sDescription,
              BranchCode: Data.branchCode,
              BranchName: Data.branchName,
              RegionCode: Data.regionCode,
              RegionName: Data.regionName,
              ABNSOutstandingPrincipal: Data.abnsOutstandingPrincipal,
              ABNSOutstandingNominal: Data.abnsOutstandingNominal,
              ABNSOutstandingNonAccural: Data.abnsOutstandingNonAccural,
              ABNSOtherCharges: Data.abnsOtherCharges,
              ABNSPenalInterest: Data.abnsPenalInterest,
              ABNSTotal: Data.abnsTotal,
              APBSOutstandingPrincipal: Data.apbsOutstandingPrincipal,
              APBSOutstandingNominal: Data.apbsOutstandingNominal,
              APBSOutstandingNonAccural: Data.apbsOutstandingNonAccural,
              APBSOtherCharges: Data.apbsOtherCharges,
              APBSPenalInterest: Data.apbsPenalInterest,
              APBSTotal: Data.apbsTotal,
              FRAPrincipal: Data.fraPrincipal,
              FRANominated: Data.fraNominated,
              FRANonAccural: Data.fraNonAccural,
              FRAOtherCharges: Data.fraOtherCharges,
              FRAPenalInterest: Data.fraPenalInterest,
              FRATotal: Data.fraTotal,
            };
          });
          let AccountSancationInfo = WriteOffData.accounts.map((item) => {
            let Data = item.accountSancationInfo;
            return Data;
          });

          let AccountCollateral = WriteOffData.accounts.map((item) => {
            let Data = item.accountCollateral;
            return Data;
          });
          setAccountNumbersFromStore(Numbers);
          setAccountNumber(Numbers[0]);
          setAccountDetails(AccountDetails[0]);
          setAccountSancationInfo(AccountSancationInfo[0]);
          setAccountCollateral(AccountCollateral[0]);

          let AccountSection = WriteOffData.accounts.map((item) => {
            let Data = item.accountDetails;
            var Data2 = item.accountSancationInfo;
            let Data3 = item.accountCollateral;
            return {
              AccountNumber: item.accountNumber,
              AccountDetails: {
                FacCode: Data.facCode,
                FacName: Data.facName,
                SCode: Data.sCode,
                SDescription: Data.sDescription,
                BranchCode: Data.branchCode,
                BranchName: Data.branchName,
                RegionCode: Data.regionCode,
                RegionName: Data.regionName,
                ABNSOutstandingPrincipal: Data.abnsOutstandingPrincipal,
                ABNSOutstandingNominal: Data.abnsOutstandingNominal,
                ABNSOutstandingNonAccural: Data.abnsOutstandingNonAccural,
                ABNSOtherCharges: Data.abnsOtherCharges,
                ABNSPenalInterest: Data.abnsPenalInterest,
                ABNSTotal: Data.abnsTotal,
                APBSOutstandingPrincipal: Data.apbsOutstandingPrincipal,
                APBSOutstandingNominal: Data.apbsOutstandingNominal,
                APBSOutstandingNonAccural: Data.apbsOutstandingNonAccural,
                APBSOtherCharges: Data.apbsOtherCharges,
                APBSPenalInterest: Data.apbsPenalInterest,
                APBSTotal: Data.apbsTotal,
                FRAPrincipal: Data.fraPrincipal,
                FRANominated: Data.fraNominated,
                FRANonAccural: Data.fraNonAccural,
                FRAOtherCharges: Data.fraOtherCharges,
                FRAPenalInterest: Data.fraPenalInterest,
                FRATotal: Data.fraTotal,
              },
              AccountSancationInfo: Data2,
              AccountCollateral: Data3,
            };
          });
          setAccountSection(AccountSection);
        }
        console.log("WriteOffData", WriteOffData);
        if (WriteOffData.consolidated) {
          let data = WriteOffData.consolidated;
          setConsolidateCalculatorBox({
            ...consolidateCalculatorBox,
            ABNSOutstandingPrincipal: data.abnsOutstandingPrincipal,
            ABNSOutstandingNominal: data.abnsOutstandingNominal,
            ABNSOutstandingNonAccural: data.abnsOutstandingNonAccural,
            ABNSOtherCharges: data.abnsOtherCharges,
            ABNSPenalInterest: data.abnsPenalInterest,
            ABNSTotal: data.abnsTotal,
            APBSOutstandingPrincipal: data.apbsOutstandingPrincipal,
            APBSOutstandingNominal: data.apbsOutstandingNominal,
            APBSOutstandingNonAccural: data.apbsOutstandingNonAccural,
            APBSOtherCharges: data.apbsOtherCharges,
            APBSPenalInterest: data.apbsPenalInterest,
            APBSTotal: data.abnsTotal,
            FRAPrincipal: data.fraPrincipal,
            FRANominated: data.fraNominated,
            FRANonAccural: data.fraNonAccural,
            FRAOtherCharges: data.fraOtherCharges,
            FRAPenalInterest: data.fraPenalInterest,
            FRATotal: data.abnsTotal,
          });
        }
        if (WriteOffData.additionalDetails) {
          let Data = WriteOffData.additionalDetails;
          let index = setupForms.ClassificationOfAdvances.findIndex(
            (x) =>
              x.id === WriteOffData.additionalDetails.advanceClassificationID
          );
          let index2 = setupForms.WOFReasons.findIndex(
            (x) => x.id === WriteOffData.additionalDetails.writeOffReason
          );
          setAdditionalDetailsSection({
            ...additionalDetailsSection,
            AdvanceClassificationID:
              setupForms.ClassificationOfAdvances[index].title,
            ApprovalNumber: Data.approvalNumber,
            chargeOfType: Data.chargeOfType,
            DateOfApproval: Data.dateOfApproval,
            DateOfWriteoff: Data.dateOfWriteoff,
            Remarks: Data.remarks,
            WriteOffReason: setupForms.WOFReasons[index2].title,
          });
        }
        if (WriteOffData.collateral) {
          let Data = WriteOffData.collateral;
          let index = setupForms.NatureofCharges.findIndex(
            (x) => x.id === WriteOffData.collateral.natureOfCharge
          );
          let index2 = setupForms.NatureOfSecuritys.findIndex(
            (x) => x.id === WriteOffData.collateral.natureOfSecurity
          );
          setCollateralSection({
            ...collateralSection,
            ABInitioLevel: Data.abInitioLevel,
            ChangeInSecurity: Data.changeInSecurity,
            // dateOfValuation: Data.dateOfValuation,
            DetailsOfSecurity: Data.detailsOfSecurity,
            // fsValue: Data.fsValue,
            //  natureOfCharge: setupForms.NatureofCharges[index].title,
            //  natureOfSecurity: setupForms.NatureOfSecuritys[index2].title,
            PledgeLifted: Data.pledgeLifted,
            RightOfRecovery: Data.rightOfRecovery,
            SaleOfSecurity: Data.saleOfSecurity,
            SecuritybyBankAtWriteOff: Data.securitybyBankAtWriteOff,
            WillfullDefaulter: Data.willfullDefaulter,
          });
        }
        if (WriteOffData.recoveryAfterWriteOff) {
          let Data = WriteOffData.recoveryAfterWriteOff;
          setRecoveryWriteOffSection({
            DateOfRecovery: Data.dateOfRecovery,
            Principal: Data.principal,
            Nominated: Data.nominated,
            Nonaccural: Data.nonaccural,
            OtherCharges: Data.otherCharges,
            PenalInterest: Data.penalInterest,
            Total: Data.total,
          });
        }
        if (WriteOffData.sponsorOwnerDetail) {
          let Sponser = WriteOffData.sponsorOwnerDetail.map((item) => {
            return {
              DirectorTypeID: item.directorTypeID,
              DirectorName: item.directorName,
              CNIC: item.cnic,
              FatherHusband: item.fatherHusband,
              Address: item.address,
            };
          });
          setSponsorOwnerDetail(Sponser);
        }
      }
    } else {
      console.log("NOT From API");
    }
  }, [WriteOffData, setupForms]);
  console.log(
    "AccountCollateral after",
    AccountSancationInfo,
    AccountCollateral
  );
  useEffect(() => {
    dispatch(ViewWriteOff(CustomerId));
    window.scrollTo(0, 0);
    return () => {
      dispatch(NullState());
    };
  }, []);
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
  // use effect to calculate Total of recovery
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
      Total: myTotal,
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
      FRATotal: myTotal,
    });
  }, [
    AccountDetails.FRAPrincipal,
    AccountDetails.FRANominated,
    AccountDetails.FRANonAccural,
    AccountDetails.FRAOtherCharges,
    AccountDetails.FRAPenalInterest,
  ]);
  // code for adding condition on last row of colleteral section
  useEffect(() => {
    if (additionalDetailsSection.Remarks == 1) {
      setCollateralSection({
        ...collateralSection,
        // WillfullDefaulter: 2,
        RightOfRecovery: 1,
      });
    } else if (additionalDetailsSection.Remarks == 2) {
      setCollateralSection({
        ...collateralSection,
        RightOfRecovery: 2,
        // WillfullDefaulter: 1,
      });
    }
  }, [additionalDetailsSection.Remarks]);
  useEffect(() => {
    dispatch(GetBorrowerType());
    dispatch(GetAdvanceClassification());
    dispatch(GetManagementUnit());
    dispatch(GetNatureofCharge());
    dispatch(GetNatureOfSecurity());
    dispatch(GetWOFReason());
  }, []);
  return !goToSave ? (
    <>
      <form onSubmit={(e) => goToSaveHandler(e)}>
        <Title level={2}>Edit Write Off</Title>
        <Paper padding="1">
          <Grid container spacing={2}>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <TextField
                disable
                isUpperCase={true}
                change={misysSectionHandler}
                label="Misys Customer Code"
                fullWidth
                size="small"
                textLength={6}
                minLength={6}
                required
                value={misysSection.MisysCode}
                name="MisysCode"
              />
            </Grid>
            <Grid item lg={2} md={2} sm={12} xs={12}>
              <TextField
                name="WOFCode"
                size="small"
                placeholder="WOF Code"
                label={"WOF Code"}
                value={misysSection.WOFCode}
                fullWidth
                change={misysSectionHandler}
              />
            </Grid>
            <Grid item lg={2} md={2} sm={12} xs={12}>
              <TextField
                change={misysSectionHandler}
                value={misysSection.NPLCode}
                size="small"
                label="Borrower NPL Code"
                fullWidth
                textLength={7}
                name="NPLCode"
              />
            </Grid>
            <Grid item lg={5} md={5} sm={12} xs={12}>
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
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
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
            </Grid>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <TextField
                value={misysSection.NTNNumber}
                change={NTNnumberHandler}
                name="NTNNumber"
                size="small"
                label="NTN Number"
                fullWidth
                textLength={8}
                minLength={8}
              />
            </Grid>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <SelectBox
                change={misysSectionHandler}
                name="ManagementUnitID"
                propertyName={"title"}
                option={setupForms.ManagementUnits}
                label="Business Segment"
                value={misysSection.ManagementUnitID}
                required
              />
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <div style={{ marginTop: "10px" }} />
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
              <div style={{ marginTop: "10px" }} />
              <TextField
                label={"IParty ID"}
                name=""
                placeholder="IPartyID"
                size="small"
                disable
                value={misysSection.Iparty}
                fullWidth
              />
            </Grid>
          </Grid>
        </Paper>
        <div style={{ marginTop: "20px" }} />
        <Paper padding="1">
          <Grid container spacing={2}>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <SelectBox
                option={accountNumbersFromStore && accountNumbersFromStore}
                change={AcountSelection}
                value={AccountNumber}
                label="Account Number"
                required
                name="AccountNumber"
              />
            </Grid>
            <Grid item lg={2} md={2} sm={12} xs={12}>
              <TextField
                change={CodeHandler}
                value={AccountDetails.BranchCode}
                size="small"
                label="Branch Code"
                fullWidth
                textLength={4}
                minLength={4}
                name="BranchCode"
              />
            </Grid>
            <Grid item lg={3} md={3} sm={12} xs={12}>
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
            </Grid>
            <Grid item lg={2} md={2} sm={12} xs={12}>
              <TextField
                change={CodeHandler}
                name="RegionCode"
                size="small"
                label="Region Code"
                value={AccountDetails.RegionCode}
                fullWidth
                textLength={2}
                minLength={2}
              />
            </Grid>
            <Grid item lg={2} md={2} sm={12} xs={12}>
              <TextField
                change={AccountDetailsHandler}
                name="RegionName"
                size="small"
                value={AccountDetails.RegionName}
                label="Region Name"
                fullWidth
                textLength={40}
              />
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <b style={{ fontSize: "1rem" }}>Sundry Analysis</b>
            </Grid>
            <Grid item lg={2} md={2} sm={12} xs={12}>
              <TextField
                value={AccountDetails.SCode}
                change={misysSectionHandler}
                size="small"
                label="Sundry Code"
                textLength={2}
                width="90%"
                name="SCode"
                minLength={2}
              />
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <TextField
                change={misysSectionHandler}
                value={AccountDetails.SDescription}
                size="small"
                label="Sundry Description"
                fullWidth
                textLength={40}
                width="90%"
                name="SDescription"
              />
            </Grid>
            <Grid item lg={3} md={3} sm={12} xs={12}>
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
            </Grid>
            <Grid item lg={3} md={3} sm={12} xs={12}>
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
            </Grid>
          </Grid>
          <div style={{ marginTop: "20px" }} />
          {console.log("FRATotal", SectionDetails)}
          <FancyBoxSection
            hide={false}
            columns={columns}
            setAccountSancationInfo={setAccountSancationInfo}
            AccountSancationInfo={AccountSancationInfo}
            DatePicker={DatePicker}
            AccountDetailsHandler={AccountDetailsHandler}
            SectionDetails={SectionDetails}
            DateDisplayFormat={DateDisplayFormat}
            calculatorBoxhandler={calculatorBoxhandlerdata}
          />
          <Grid
            container
            spacing={2}
            style={{ backgroundColor: "#e7f5f4", padding: "1%" }}
          >
            <Grid item lg={12} md={12} sm={12} xs={12} align="center">
              <Button
                text={"Add Record"}
                icon={<AddIcon />}
                applyClass="btnSecondarySolid"
                size="large"
                click={AddSectionDetails}
              />
            </Grid>
          </Grid>
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
          <Grid
            container
            spacing={2}
            style={{ backgroundColor: "#e7f5f4", padding: "1%" }}
          >
            <Grid item lg={12} md={12} sm={12} xs={12} align="center">
              <Title level={4}>Consolidated</Title>
            </Grid>
            <ConsolidateBox
              state={consolidateCalculatorBox}
              ABNSTotal={consolidateCalculatorBox.ABNSTotal}
              APBSTotal={consolidateCalculatorBox.APBSTotal}
              FRATotal={consolidateCalculatorBox.FRATotal}
              disable={true}
            />
            <Grid item lg={12} md={12} sm={12} xs={12} align="center">
              <Button
                text="Update Record"
                icon={<AddIcon />}
                applyClass="btnSecondarySolid"
                size="large"
                click={AddRecordHandler}
              />
            </Grid>
          </Grid>
        </Paper>
        <div style={{ marginTop: "20px" }} />
        <Paper padding="1">
          <Title level={4}>Collateral Detail</Title>
          <Grid container spacing={2}>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <div style={{ marginTop: "20px" }} />
              <SelectBox
                // required
                label="Nature of Security"
                propertyName={"title"}
                option={setupForms.NatureOfSecuritys}
                name="natureOfSecurity"
                value={accountCollateralSection.natureOfSecurity}
                change={collateralSectionHandlerNew}
              />
            </Grid>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <div style={{ marginTop: "20px" }} />
              <SelectBox
                // required
                label="Nature of Charge"
                propertyName={"title"}
                option={setupForms.NatureofCharges}
                name="natureOfCharge"
                value={accountCollateralSection.natureOfCharge}
                change={collateralSectionHandlerNew}
              />
            </Grid>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <FormattedInputs
                fullWidth
                label="FS Value of Security"
                size="small"
                numLength={15}
                minLength={15}
                name="fsValue"
                value={accountCollateralSection.fsValue}
                change={collateralSectionHandlerNew}
              />
            </Grid>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <div style={{ marginTop: "20px" }} />
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
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12} align="center">
              <Button
                text={"Add Record"}
                icon={<AddIcon />}
                applyClass="btnSecondarySolid"
                size="large"
                click={AddMultipleCollateralDetails}
              />
            </Grid>
            <div style={{ marginTop: "5%" }} />
            <Grid item style={{ marginTop: "2%" }} lg={12} md={12} sm={12}>
              <Table
                rows={AccountCollateralValue}
                columns={column}
                scroll={{ x: "max-content" }}
                pagination={true}
              />
            </Grid>
          </Grid>
        </Paper>
        <div style={{ marginTop: "20px" }} />
        <Paper padding="1">
          <Title level={4}>Additional Detail</Title>
          <Grid container spacing={1}>
            <Grid item lg={3} md={3} sm={12}>
              <SelectBox
                label="Classification of Advances"
                propertyName={"title"}
                option={setupForms.ClassificationOfAdvances}
                name="AdvanceClassificationID"
                change={addDetailsSectionHandler}
                value={additionalDetailsSection.AdvanceClassificationID}
              />
            </Grid>
            <Grid item lg={4} md={4} sm={12}>
              <label>
                {" "}
                <b>Charge Off</b>{" "}
              </label>
              <br />
              <Radio.Group
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
            </Grid>
            <Grid item lg={2} md={2} sm={12}>
              <TextField
                fullWidth
                label="Approval Number"
                size="small"
                textLength={30}
                name="ApprovalNumber"
                change={addDetailsSectionHandler}
                value={additionalDetailsSection.ApprovalNumber}
              />
            </Grid>
            <Grid item lg={3} md={3} sm={12}>
              <DatePicker
                size="large"
                width="100%"
                DateRange
                placeholder={"Date of Approval"}
                name="DateOfApproval"
                change={addDetailsSectionHandler}
                value={
                  additionalDetailsSection.DateOfApproval
                    ? DateDisplayFormat(additionalDetailsSection.DateOfApproval)
                    : null
                }
              />
            </Grid>
            <Grid item lg={5} md={5} sm={12}>
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
            </Grid>
            <Grid item lg={4} md={4} sm={12}>
              <SelectBox
                label="Reason of Write off"
                option={setupForms.WOFReasons}
                propertyName={"title"}
                name="WriteOffReason"
                required
                change={addDetailsSectionHandler}
                value={additionalDetailsSection.WriteOffReason}
              />
            </Grid>
            <Grid item lg={3} md={3} sm={12} align="left">
              <label>
                {" "}
                <b>
                  Remarks<span style={{ color: "red" }}>*</span>
                </b>{" "}
              </label>{" "}
              <br />
              <Radio.Group
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
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <FormattedInputs
                fullWidth
                label="Sale of Security"
                size="small"
                minLength={15}
                numLength={15}
                name="SaleOfSecurity"
                value={collateralSection.SaleOfSecurity}
                change={ColleteralNumberField}
              />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <div style={{ marginTop: "22px" }} />
              <TextField
                fullWidth
                label="Details of Securities held by the bank at the time of approving write off case"
                size="small"
                name="DetailsOfSecurity"
                maxLength={3000}
                value={collateralSection.DetailsOfSecurity}
                change={collateralSectionHandler}
              />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextField
                fullWidth
                label="Change in Securities held by the bank during the loan period"
                size="small"
                name="ChangeInSecurity"
                maxLength={3000}
                value={collateralSection.ChangeInSecurity}
                change={collateralSectionHandler}
              />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextField
                fullWidth
                label="Details security by the bank at approving W-off"
                size="small"
                name="SecuritybyBankAtWriteOff"
                maxLength={3000}
                value={collateralSection.SecuritybyBankAtWriteOff}
                change={collateralSectionHandler}
              />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <div style={{ marginTop: "20px" }} />
              <label>
                <b>
                  {" "}
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
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <div style={{ marginTop: "20px" }} />
              <label>
                <b>
                  {" "}
                  Whether Securities held by the bank was not perfect at
                  ab-initio level?
                </b>{" "}
              </label>{" "}
              <br />
              <Radio.Group
                onChange={collateralSectionHandler}
                name="ABInitioLevel"
                value={collateralSection.ABInitioLevel}
              >
                <Radio value={1}>Yes</Radio>
                <Radio value={2}>No</Radio>
              </Radio.Group>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <div style={{ marginTop: "20px" }} />
              <label>
                {" "}
                <b>Whether borrower was a willful defaulter?</b>
              </label>{" "}
              <br />
              <Radio.Group
                onChange={collateralSectionHandler}
                name="WillfullDefaulter"
                defaultValue={2}
                value={collateralSection.WillfullDefaulter}
              >
                <Radio value={1}>Yes</Radio>
                <Radio value={2}>No</Radio>
              </Radio.Group>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
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
            </Grid>
          </Grid>
        </Paper>
        <div style={{ marginTop: "20px" }} />
        <Paper padding="1">
          <Title level={4}>Recovery After Write-off</Title>
          <Grid container spacing={1}>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <b style={{ fontSize: "0.7rem" }}>{"Date of Recovery"}</b>
              <DatePicker
                width="100%"
                size="large"
                DateRange
                value={
                  recoveryWriteOffSection.DateOfRecovery
                    ? DateDisplayFormat(recoveryWriteOffSection.DateOfRecovery)
                    : null
                }
                placeholder={"Date of Recovery"}
                name="DateOfRecovery"
                change={recoveryWriteOffSectionHandler}
              />
            </Grid>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <FormattedInputs
                fullWidth
                label="Principal"
                size="small"
                numLength={15}
                name="Principal"
                value={recoveryWriteOffSection.Principal}
                change={recoveryNumberField}
              />
            </Grid>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <FormattedInputs
                fullWidth
                label="Nominated (Debited Mark-up)"
                size="small"
                numLength={15}
                name="Nominated"
                value={recoveryWriteOffSection.Nominated}
                change={recoveryNumberField}
              />
            </Grid>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <FormattedInputs
                fullWidth
                label="Non-Accrual (Un-Debited Mark-up)"
                size="small"
                numLength={15}
                name="Nonaccural"
                value={recoveryWriteOffSection.Nonaccural}
                change={recoveryNumberField}
              />
            </Grid>
            <div style={{ marginTop: "10px" }} />
            <Grid container spacing={1}>
              <Grid item lg={5} md={5} sm={12} xs={12}>
                <FormattedInputs
                  fullWidth
                  label="Other Charges"
                  size="small"
                  numLength={15}
                  name="OtherCharges"
                  value={recoveryWriteOffSection.OtherCharges}
                  change={recoveryNumberField}
                />
              </Grid>
              <Grid item lg={5} md={5} sm={12} xs={12}>
                <FormattedInputs
                  fullWidth
                  label="Penal Interest"
                  size="small"
                  numLength={15}
                  name="PenalInterest"
                  value={recoveryWriteOffSection.PenalInterest}
                  change={recoveryNumberField}
                />
              </Grid>
              <Grid item lg={2} md={2} sm={12} xs={12}>
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
              </Grid>
            </Grid>
          </Grid>
        </Paper>
        <div style={{ marginTop: "20px" }} />
        <Grid container spacing={2} justifyContent="center">
          <Grid item lg={2} md={2} sm={12}>
            <Button
              text="Next"
              endIcon={<i className="icon-arrow-right icon-size-one"></i>}
              applyClass="buttonYellow"
              size="large"
              type="submit"
              click={() => setsaveValue(0)}
            />
          </Grid>
        </Grid>
      </form>
      <Notification
        setOpen={setOpenApproval}
        open={openApproval}
        message={"Select Date of Approval"}
      />
      <Notification
        setOpen={setOpenWriteoff}
        open={openWriteoff}
        message={"Select Date of Write off"}
      />
      <Notification
        setOpen={setOpenN}
        open={openN}
        message={"Select Account Number First"}
      />
      <Notification setOpen={setOpen} open={open.open} message={open.message} />
    </>
  ) : (
    <EditApprovedRecord
      setGoToSave={setGoToSave}
      goToSave={goToSave}
      PreviousPageDetails={FinalDetails}
      setOpen={setOpen}
    />
  );
};

export default EditApprovedCases;
