import { useDispatch, useSelector } from "react-redux";
import {
  ViewWriteOff,
  NullState,
} from "../../../../store/actions/write-off-actions";
import React, { useEffect, useState, useRef } from "react";
import { Typography, Radio, Row, Col } from "antd";
import {
  Paper,
  InputWithBtn,
  TextField,
  SelectBox,
  DatePicker,
  Button,
  FancyBox,
  ConsolidateBox,
  FormattedInputs,
  FancyBoxSection,
  Table,
} from "../../../../Components/Elements";
import {
  DateDisplayFormat,
  CommaFormter,
} from "../../../../Common/Functions/date-formatter";
// data imports
import { directorTypeOptions } from "../../../../Common/SelectFieldOption/select-field-option";
import {
  GetBorrowerType,
  GetAdvanceClassification,
  GetManagementUnit,
  GetNatureofCharge,
  GetNatureOfSecurity,
  GetWOFReason,
} from "../../../../store/actions/setup-forms-actions";

import { PlusOutlined as AddIcon } from "@ant-design/icons";

const ViewWriteOffs = () => {
  const { Title } = Typography;
  const WriteOffData = useSelector((state) => state.writeOffCases.WriteOffData);
  const setupForms = useSelector((state) => state.setupForms);
  const dispatch = useDispatch();

  const structure = {
    address: "",
    cnic: "",
    directorName: "",
    directorTypeID: null,
    fatherHusband: "",
  };
  const [accountNumbersFromStore, setAccountNumbersFromStore] = useState(null);
  // section details add
  const [SectionDetails, setSectionDetails] = useState({
    lrAmount: null,
    lrDate: "",
  });
  // for add section details array
  const [AccountSancationInfo, setAccountSancationInfo] = useState([]);
  // for add account collatreal details array
  const [AccountCollateralValue, setAccountCollateralValue] = useState([]);
  const [misysSection, setMisysSection] = useState({
    MisysCode: null,
    IParty: null,
    WOFCode: null,
    NPLCode: null,
    BorrowerName: null,
    AddressOfBorrower: null,
    NTNNumber: null,
    ManagementUnitID: null,
    // SCode: null,
    // SDescription: null,
    BorrowerTypeID: null,
  });
  const [AccountNumber, setAccountNumber] = useState("");
  const [AccountSection, setAccountSection] = useState([
    { accountNumber: "", accountDetails: {} },
  ]);
  const [AccountDetails, setAccountDetails] = useState({
    sCode: null,
    sDescription: null,
    abnsOtherCharges: null,
    abnsOutstandingNominal: null,
    abnsOutstandingNonAccural: null,
    abnsOutstandingPrincipal: null,
    abnsPenalInterest: null,
    abnsTotal: null,
    apbsOtherCharges: null,
    apbsOutstandingNominal: null,
    apbsOutstandingNonAccural: null,
    apbsOutstandingPrincipal: null,
    apbsPenalInterest: null,
    apbsTotal: null,
    branchCode: "",
    branchName: "",
    facCode: "",
    facName: "",
    fraNominated: null,
    fraNonAccural: null,
    fraOtherCharges: null,
    fraPenalInterest: null,
    fraPrincipal: null,
    fraTotal: null,
    regionCode: "",
    regionName: "",
  });
  const [consolidateCalculatorBox, setConsolidateCalculatorBox] = useState({
    abnsOtherCharges: null,
    abnsOutstandingNominal: null,
    abnsOutstandingNonAccural: null,
    abnsOutstandingPrincipal: null,
    abnsPenalInterest: null,
    abnsTotal: null,
    apbsOtherCharges: null,
    apbsOutstandingNominal: null,
    apbsOutstandingNonAccural: null,
    apbsOutstandingPrincipal: null,
    apbsPenalInterest: null,
    apbsTotal: null,
    fraNominated: null,
    fraNonAccural: null,
    fraOtherCharges: null,
    fraPenalInterest: null,
    fraPrincipal: null,
    fraTotal: null,
  });
  const [enableRadio, setEnableRadio] = useState(true);
  const [additionalDetailsSection, setAdditionalDetailsSection] = useState({
    advanceClassificationID: null,
    approvalNumber: "",
    chargeOfType: null,
    dateOfApproval: "",
    dateOfWriteOff: "",
    remarks: null,
    writeOffReason: null,
  });
  const [collateralSection, setCollateralSection] = useState({
    abInitioLevel: null,
    changeInSecurity: "",
    dateOfValuation: "",
    detailsOfSecurity: "",
    fsValue: null,
    natureOfCharge: null,
    natureOfSecurity: null,
    pledgeLifted: null,
    rightOfRecovery: null,
    saleOfSecurity: null,
    securitybyBankAtWriteOff: "",
    willfullDefaulter: null,
  });
  const [recoveryWriteOffSection, setRecoveryWriteOffSection] = useState({
    dateOfRecovery: "",
    nominated: null,
    nonaccural: null,
    otherCharges: null,
    penalInterest: null,
    principal: null,
    total: null,
  });
  const [sponsorOwnerDetail, setSponsorOwnerDetail] = useState([structure]);
  const AcountSelection = async (e, val) => {
    setAccountNumber(val);
    let index = AccountSection.findIndex((x) => x.accountNumber === val);
    if (index === -1) {
      console.log("Not Found");
    } else {
      console.log("found");
      await setAccountDetails(AccountSection[index].accountDetails);
      setAccountSancationInfo(AccountSection[index].accountSancationInfo);
      setAccountCollateralValue(AccountSection[index].accountCollateral);
    }
  };
  useEffect(() => {
    if (
      Object.keys(WriteOffData).length !== 0 &&
      setupForms.ManagementUnits.length > 0 &&
      setupForms.BorrowerTypes.length > 0 &&
      setupForms.ClassificationOfAdvances.length > 0 &&
      setupForms.WOFReasons.length > 0 &&
      setupForms.NatureofCharges.length > 0 &&
      setupForms.NatureOfSecuritys.length > 0
    ) {
      let index = setupForms.ManagementUnits.findIndex(
        (x) => x.id === WriteOffData.managementUnitID
      );
      let index2 = setupForms.BorrowerTypes.findIndex(
        (x) => x.id === WriteOffData.borrowerTypeID
      );

      setMisysSection({
        ...misysSection,
        MisysCode: WriteOffData ? WriteOffData.misysCode : null,
        IParty: WriteOffData ? WriteOffData.iParty : null,
        WOFCode: WriteOffData ? WriteOffData.wofCode : null,
        NPLCode: WriteOffData ? WriteOffData.nplCode : null,
        BorrowerName: WriteOffData ? WriteOffData.borrowerName : null,
        AddressOfBorrower: WriteOffData ? WriteOffData.addressOfBorrower : null,
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
        setAccountSection(WriteOffData.accounts);
        let AccountDetails = WriteOffData.accounts.map((item) => {
          return item.accountDetails;
        });
        let Numbers = WriteOffData.accounts.map((item) => {
          return item.accountNumber;
        });
        let AccountSancationInfo = WriteOffData.accounts.map((item) => {
          return item.accountSancationInfo;
        });
        let AccountCollateralValue = WriteOffData.accounts.map((item) => {
          return item.accountCollateral;
        });
        // alert(JSON.stringify(AccountDetails[0]))
        setAccountDetails(AccountDetails[0]);
        setAccountNumbersFromStore(Numbers);
        setAccountNumber(Numbers[0]);
        setAccountSancationInfo(AccountSancationInfo[0]);
        setAccountCollateralValue(AccountCollateralValue[0]);
      }
      if (WriteOffData.consolidated) {
        setConsolidateCalculatorBox(WriteOffData.consolidated);
      }
      if (WriteOffData.additionalDetails) {
        let index = setupForms.ClassificationOfAdvances.findIndex(
          (x) => x.id === WriteOffData.additionalDetails.advanceClassificationID
        );
        let index2 = setupForms.WOFReasons.findIndex(
          (x) => x.id === WriteOffData.additionalDetails.writeOffReason
        );
        setAdditionalDetailsSection({
          ...additionalDetailsSection,
          advanceClassificationID:
            setupForms.ClassificationOfAdvances[index].title,
          approvalNumber: WriteOffData.additionalDetails.approvalNumber,
          chargeOfType: WriteOffData.additionalDetails.chargeOfType,
          dateOfApproval: WriteOffData.additionalDetails.dateOfApproval,
          dateOfWriteOff: WriteOffData.additionalDetails.dateOfWriteoff,
          remarks: WriteOffData.additionalDetails.remarks,
          writeOffReason: setupForms.WOFReasons[index2].title,
        });
      }
      if (WriteOffData.collateral) {
        setCollateralSection({
          ...collateralSection,
          abInitioLevel: WriteOffData.collateral.abInitioLevel,
          changeInSecurity: WriteOffData.collateral.changeInSecurity,
          detailsOfSecurity: WriteOffData.collateral.detailsOfSecurity,
          pledgeLifted: WriteOffData.collateral.pledgeLifted,
          rightOfRecovery: WriteOffData.collateral.rightOfRecovery,
          saleOfSecurity: WriteOffData.collateral.saleOfSecurity,
          securitybyBankAtWriteOff:
            WriteOffData.collateral.securitybyBankAtWriteOff,
          willfullDefaulter: WriteOffData.collateral.willfullDefaulter,
        });
      }
      if (WriteOffData.recoveryAfterWriteOff) {
        setRecoveryWriteOffSection(WriteOffData.recoveryAfterWriteOff);
      }
      if (WriteOffData.sponsorOwnerDetail) {
        let Sponser = WriteOffData.sponsorOwnerDetail.map((item) => {
          if (item.directorTypeID == 1) {
            item.directorTypeID = "Sponsor";
          } else if (item.directorTypeID == 2) {
            item.directorTypeID = "Nominee Director";
          } else if (item.directorTypeID == 3) {
            item.directorTypeID = "Other";
          } else if (item.directorTypeID == 4) {
            item.directorTypeID = "Partner";
          } else if (item.directorTypeID == 5) {
            item.directorTypeID = "Director";
          } else if (item.directorTypeID == 6) {
            item.directorTypeID = "Individual";
          } else if (item.directorTypeID == 7) {
            item.directorTypeID = "Proprietor";
          } else if (item.directorTypeID == 8) {
            item.directorTypeID = "Guarantor";
          }
          return item;
        });
        setSponsorOwnerDetail(Sponser);
      }
    }
  }, [WriteOffData, setupForms]);
  console.log("WriteOffData", WriteOffData, AccountDetails);
  useEffect(() => {
    if (additionalDetailsSection.advanceClassificationID === "ChargedOff") {
      setEnableRadio(false);
      setAdditionalDetailsSection({
        ...additionalDetailsSection,
        ChargeOfType: 2,
      });
    } else if (
      additionalDetailsSection.advanceClassificationID !== "ChargedOff"
    ) {
      setEnableRadio(true);
      setAdditionalDetailsSection({
        ...additionalDetailsSection,
        ChargeOfType: 1,
      });
    }
  }, [additionalDetailsSection.advanceClassificationID]);

  let CustomerId = JSON.parse(localStorage.getItem("wofCustomerMasterID"));
  useEffect(() => {
    dispatch(ViewWriteOff(CustomerId));
    window.scrollTo(0, 0);
    return () => {
      dispatch(NullState());
    };
  }, []);
  useEffect(() => {
    dispatch(GetBorrowerType());
    dispatch(GetAdvanceClassification());
    dispatch(GetManagementUnit());
    dispatch(GetNatureofCharge());
    dispatch(GetNatureOfSecurity());
    dispatch(GetWOFReason());
  }, []);
  // colums for account section info
  const column = [
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
    // {
    //   title: "Delete",
    //   dataIndex: "delete",
    //   key: "delete",
    //   align: "center",
    //   width: "1%",
    //   render: (text, record) => (
    //     <Tooltip title="Delete" color={"Black"}>
    //       <i
    //         style={{ cursor: "pointer" }}
    //         onClick={(e) => DeleteSec(e, record)}
    //         className="icon-trash icon-size-one pdfRed"
    //       ></i>
    //     </Tooltip>
    //   ),
    // },
  ];
  console.log(
    "additionalDetailsSection.dateOfApprova",
    additionalDetailsSection.dateOfApprova
  );
  // Value set For natureOfSecurity
  const handlerNatureOfSecurity = (text) => {
    let index = setupForms.NatureOfSecuritys.findIndex((x) => x.id === text);

    let natureOfSecurity = setupForms.NatureOfSecuritys[index].title;
    return natureOfSecurity;
  };
  // Value set For natureOfCharge
  const handlerNatureOfCharge = (text) => {
    let index = setupForms.NatureofCharges.findIndex((x) => x.id === text);
    let natureOfCharge = setupForms.NatureofCharges[index].title;
    return natureOfCharge;
  };
  // colums for account Collatreal
  const columns = [
    {
      title: "Nature of Security",
      dataIndex: "natureOfSecurity",
      key: "natureOfSecurity",
      align: "center",
      width: "3%",
      render: (text) => handlerNatureOfSecurity(text),
    },
    {
      title: "Nature of Charge",
      dataIndex: "natureOfCharge",
      key: "natureOfCharge",
      align: "center",
      width: "4%",
      render: (text) => handlerNatureOfCharge(text),
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
  ];
  console.log(setupForms);
  return (
    <>
      <Title level={2}>View Write Off</Title>
      <Paper padding="1" section>
        <Row gutter={16}>
          <Col lg={6} md={6} sm={24} xs={24}>
            <TextField
              label="Misys Customer Code"
              size="small"
              fullWidth
              helperText="please fill"
              textFieldSize="small"
              applyClass="search"
              disable
              icon={<i className="icon-search icon-size-one"></i>}
              error={null}
              value={misysSection.MisysCode}
              name="MisysCode"
            />
          </Col>

          <Col lg={6} md={6} sm={24} xs={24}>
            <TextField
              name=""
              size="small"
              placeholder="WOF Code"
              value={misysSection.WOFCode}
              disable
              label={"WOF Code"}
              fullWidth
            />
          </Col>
          <Col lg={6} md={6} sm={24} xs={24}>
            <TextField
              value={misysSection.NPLCode}
              size="small"
              label="Borrower NPL Code"
              disable
              fullWidth
              textLength={7}
              name="NPLCode"
            />
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            <TextField
              value={misysSection.BorrowerName}
              size="small"
              label="Borrower Name"
              fullWidth
              textLength={300}
              disable
              name="BorrowerName"
            />
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            <TextField
              value={misysSection.AddressOfBorrower}
              name="AddressOfBorrower"
              size="small"
              label="Address of Borrower"
              fullWidth
              disable
              textLength={300}
            />
          </Col>
          <Col lg={6} md={6} sm={24} xs={24}>
            <TextField
              value={misysSection.NTNNumber}
              name="NTNNumber"
              size="small"
              label="NTN Number"
              fullWidth
              disable
              textLength={13}
            />
          </Col>
          <Col lg={6} md={6} sm={24} xs={24}>
            <SelectBox
              name="ManagementUnitID"
              option={setupForms.ManagementUnits}
              propertyName={"title"}
              label="Business Segment"
              value={misysSection.ManagementUnitID}
              disable
            />
          </Col>

          <div style={{ marginTop: "10px" }} />
          <Col lg={6} md={6} sm={24} xs={24}>
            {/* <div style={{ marginTop: "35px" }} /> */}
            <SelectBox
              name="BorrowerTypeID"
              option={setupForms.BorrowerTypes}
              propertyName={"title"}
              label="Borrower Type"
              disable
              value={misysSection.BorrowerTypeID}
            />
          </Col>
          <Col lg={6} md={6} sm={24} xs={24}>
            {/* <div style={{ marginTop: "35px" }} /> */}
            <TextField
              label={"IParty ID"}
              name=""
              placeholder="IPartyID"
              size="small"
              disable
              value={misysSection.IParty}
              fullWidth
            />
          </Col>
          {/* <Grid item lg={5} md={5} sm={12} xs={12}>
            <b style={{ fontSize: "1rem" }}>Sundry Analysis</b>
            <div style={{ marginTop: "10px" }} />
            <Box display="flex">
              <TextField
                value={misysSection.SCode}
                size="small"
                label="Sundry Code"
                textLength={2}
                width="30%"
                name="SCode"
                disable
              />
              <TextField
                value={misysSection.SDescription}
                size="small"
                label="Sundry Description"
                fullWidth
                textLength={40}
                width="70%"
                name="SDescription"
                disable
              />
            </Box>
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
              name="AccountNumber"
            />
          </Col>
          <Col lg={6} md={6} sm={24} xs={24}>
            <TextField
              value={AccountDetails.branchCode}
              size="small"
              label="BranchCode"
              fullWidth
              textLength={4}
              name="BranchCode"
              disable
            />
          </Col>
          <Col lg={6} md={6} sm={24} xs={24}>
            <TextField
              value={AccountDetails.branchName}
              name="BranchName"
              size="small"
              label="Branch Name"
              fullWidth
              textLength={300}
              disable
            />
          </Col>
          <Col lg={6} md={6} sm={24} xs={24}>
            <TextField
              name="RegionCode"
              size="small"
              label="Region Code"
              value={AccountDetails.regionCode}
              fullWidth
              textLength={2}
              disable
            />
          </Col>
          <Col lg={6} md={6} sm={24} xs={24}>
            <TextField
              name="RegionName"
              size="small"
              value={AccountDetails.regionName}
              label="Region Name"
              fullWidth
              textLength={40}
              disable
            />
          </Col>
          <Col lg={24} md={24} sm={24} xs={24}>
            <b style={{ fontSize: "1rem" }}>Sundry Code and Description</b>
          </Col>
          <Col lg={6} md={6} sm={24} xs={24}>
            {/* <TextField
              name="SCode"
              size="small"
              label="Sundry Code"
              // width="90%"
              disable
              value={AccountDetails.sCode}
            /> */}
            {/* <div style={{ marginTop: 22 }} /> */}
            <TextField
              value={AccountDetails.sCode}
              name="SCode"
              size="small"
              label="Sundry Code"
              fullWidth
              // textLength={2}
              disable
            />
          </Col>
          <Col lg={6} md={6} sm={24} xs={24}>
            {/* <div style={{ marginTop: 22 }} /> */}
            <TextField
              value={AccountDetails.sDescription}
              name="FacCode"
              size="small"
              label="Sundry Description"
              fullWidth
              // textLength={10}
              disable
            />
          </Col>
          <Col lg={6} md={6} sm={24} xs={24}>
            {/* <div style={{ marginTop: 22 }} /> */}
            <TextField
              name="FacCode"
              size="small"
              label="Type of Facility Code"
              fullWidth
              textLength={2}
              disable
              value={AccountDetails.facCode}
            />
          </Col>
          <Col lg={6} md={6} sm={24} xs={24}>
            {/* <div style={{ marginTop: 22 }} /> */}
            <TextField
              name="FacName"
              size="small"
              label="Type of Facility Description"
              fullWidth
              textLength={40}
              disable
              value={AccountDetails.facName}
            />
          </Col>
        </Row>
        <div style={{ marginTop: "20px" }} />
        <FancyBoxSection
          hide={true}
          columns={column}
          SectionDetails={SectionDetails}
          AccountSancationInfo={AccountSancationInfo}
          DatePicker={DatePicker}
          DateDisplayFormat={DateDisplayFormat}
        />
        <div style={{ marginTop: "20px" }} />

        <Title level={4}>Collateral Details</Title>
        <Row gutter={16}>
          <div style={{ marginTop: "5%" }} />
          <Col
            style={{ backgroundColor: "#E8F3F3", padding: "1%" }}
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
          </Col>
        </Row>
        <div style={{ marginTop: "20px" }} />
        <FancyBox
          state={null}
          ViewState={AccountDetails}
          ABNSTotal={AccountDetails.abnsTotal}
          APBSTotal={AccountDetails.apbsTotal}
          FRATotal={AccountDetails.fraTotal}
          disable={true}
        />
        <Row gutter={16} style={{ backgroundColor: "#E8F3F3", padding: "1%" }}>
          <Col lg={24} md={24} sm={24} xs={24} align="center">
            <Title level={4}>Consolidated</Title>
          </Col>
          <ConsolidateBox
            ViewState={consolidateCalculatorBox}
            FRATotal={consolidateCalculatorBox.fraTotal}
            ABNSTotal={consolidateCalculatorBox.abnsTotal}
            APBSTotal={consolidateCalculatorBox.apbsTotal}
            disable={true}
          />
        </Row>
      </Paper>
      <div style={{ marginTop: "20px" }} />
      <div style={{ marginTop: "20px" }} />
      <Paper padding="1" section>
        <Title level={4}>Additional Detail</Title>
        <Row gutter={8}>
          <Col lg={6} md={6} sm={24}>
            <div style={{ marginTop: "20px" }} />
            <SelectBox
              label="Classification of Advances"
              option={setupForms.ClassificationOfAdvances}
              propertyName={"title"}
              name="AdvanceClassificationID"
              value={additionalDetailsSection.advanceClassificationID}
              disable
            />
          </Col>
          <Col lg={6} md={6} sm={24}>
            <div style={{ marginTop: "20px" }} />
            <label>
              {" "}
              <b>Charge Off</b>{" "}
            </label>
            <br />
            <Radio.Group
              name="ChargeOfType"
              value={additionalDetailsSection.chargeOfType}
              disabled={true}
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
            <div style={{ marginTop: "20px" }} />
            <TextField
              fullWidth
              label="Approval Number"
              size="small"
              textLength={30}
              disable
              name="ApprovalNumber"
              value={additionalDetailsSection.approvalNumber}
            />
          </Col>
          <Col lg={6} md={6} sm={24}>
            <b style={{ fontSize: "0.7rem" }}>{"Date of Approval"}</b>
            <DatePicker
              size="large"
              width="100%"
              DateRange
              disable
              placeholder={"Date of Approval"}
              name="DateOfApproval"
              value={
                additionalDetailsSection.dateOfApproval
                  ? DateDisplayFormat(additionalDetailsSection.dateOfApproval)
                  : null
              }
            />
          </Col>
          <Col lg={12} md={12} sm={24}>
            <b style={{ fontSize: "0.7rem" }}>{"Date of Write Off"}</b>
            <DatePicker
              size="large"
              width="100%"
              DateRange
              disable
              name="DateOfWriteoff"
              placeholder={"Date of Write off *"}
              value={
                additionalDetailsSection.dateOfWriteOff
                  ? DateDisplayFormat(additionalDetailsSection.dateOfWriteOff)
                  : null
              }
            />
          </Col>
          <Col lg={6} md={6} sm={24}>
            <div style={{ marginTop: "20px" }} />
            <SelectBox
              label="Reason of Write off"
              option={setupForms.WOFReasons}
              name="WriteOffReason"
              propertyName={"title"}
              disable
              value={additionalDetailsSection.writeOffReason}
            />
          </Col>
          <Col lg={6} md={6} sm={24} align="left">
            <div style={{ marginTop: "20px" }} />
            <label>
              {" "}
              <b>Remarks</b>{" "}
            </label>{" "}
            <br />
            <Radio.Group
              value={additionalDetailsSection.remarks}
              disabled={true}
              name="Remarks"
            >
              <Radio value={1}>Settlement</Radio>
              <Radio value={2}>Book Cleaning</Radio>
            </Radio.Group>
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            <FormattedInputs
              fullWidth
              label="Sale of Security"
              size="small"
              textLength={(999, 999, 999, 999, 999.99)}
              name="SaleOfSecurity"
              value={collateralSection.saleOfSecurity}
              disable
            />
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            <div style={{ marginTop: "22px" }} />
            <TextField
              fullWidth
              // label=" Details of Securities held by the bank at the time of approving write off case"
              label="Details of Securities obtained at the time of initial approval of loan"
              size="small"
              textLength={300}
              name="DetailsOfSecurity"
              value={collateralSection.detailsOfSecurity}
              disable
            />
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            <TextField
              fullWidth
              label="Change in Securities held by the bank during the loan period"
              size="small"
              textLength={300}
              name="ChangeInSecurity"
              value={collateralSection.changeInSecurity}
              disable
            />
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            <TextField
              fullWidth
              // label="Details security by the bank at approving W-off"
              label="Details of Securities held by the bank at the time of approving write off case"
              size="small"
              textLength={300}
              name="SecuritybyBankAtWriteOff"
              value={collateralSection.securitybyBankAtWriteOff}
              disable
            />
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
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
              name="PledgeLifted"
              disabled={true}
              value={collateralSection.pledgeLifted}
            >
              <Radio value={1}>Yes</Radio>
              <Radio value={2}>No</Radio>
            </Radio.Group>
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            <div style={{ marginTop: "20px" }} />
            <label>
              <b>
                {" "}
                Whether Securities held by the bank was not perfect at ab-initio
                level?
              </b>{" "}
            </label>{" "}
            <br />
            <Radio.Group
              name="ABInitioLevel"
              disabled={true}
              value={collateralSection.abInitioLevel}
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
              disabled={true}
              name="WillfullDefaulter"
              value={collateralSection.willfullDefaulter}
            >
              <Radio value={1}>Yes</Radio>
              <Radio value={2}>No</Radio>
            </Radio.Group>
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            <div style={{ marginTop: "20px" }} />
            <label>
              <b>
                After write-off, Do bank surrender/cease the right of recovery?
              </b>
            </label>
            <br />
            <Radio.Group
              disabled={true}
              name="RightOfRecovery"
              value={collateralSection.rightOfRecovery}
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
            <b style={{ fontSize: "0.7rem" }}>{"Date of Recovery"}</b>
            <DatePicker
              width="100%"
              disable
              size="large"
              DateRange
              value={
                recoveryWriteOffSection.dateOfRecovery
                  ? DateDisplayFormat(recoveryWriteOffSection.dateOfRecovery)
                  : null
              }
              placeholder={"Date of Recovery"}
              name="DateOfRecovery"
            />
          </Col>
          <Col lg={6} md={6} sm={24} xs={24}>
            <FormattedInputs
              // type="number"
              fullWidth
              label="Principal"
              size="small"
              textLength={(999, 999, 999, 999, 999.99)}
              name="Principal"
              value={recoveryWriteOffSection.principal}
              disable
            />
          </Col>
          <Col lg={6} md={6} sm={24} xs={24}>
            <FormattedInputs
              // type="number"
              fullWidth
              label="Nominated (Debited Mark-up)"
              size="small"
              textLength={(999, 999, 999, 999, 999.99)}
              name="Nominated"
              value={recoveryWriteOffSection.nominated}
              disable
            />
          </Col>
          <Col lg={6} md={6} sm={24} xs={24}>
            <FormattedInputs
              // type="number"
              fullWidth
              label="Non-Accrual (Un-Debited Mark-up)"
              size="small"
              textLength={(999, 999, 999, 999, 999.99)}
              name="Nonaccural"
              value={recoveryWriteOffSection.nonaccural}
              disable
            />
          </Col>
          <div style={{ marginTop: "10px" }} />
          <Row gutter={8}>
            <Col lg={12} md={12} sm={24} xs={24}>
              <FormattedInputs
                // type="number"
                fullWidth
                label="Other Charges"
                size="small"
                textLength={(999, 999, 999, 999, 999.99)}
                name="OtherCharges"
                value={recoveryWriteOffSection.otherCharges}
                disable
              />
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              <FormattedInputs
                // type="number"
                fullWidth
                label="Penal Interest"
                size="small"
                textLength={(999, 999, 999, 999, 999.99)}
                name="PenalInterest"
                value={recoveryWriteOffSection.penalInterest}
                disable
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <FormattedInputs
                // type="number"
                fullWidth
                label="Total"
                size="small"
                textLength={(999, 999, 999, 999, 999.99)}
                name="Total"
                value={recoveryWriteOffSection.total}
                disable
              />
            </Col>
          </Row>
        </Row>
      </Paper>
      <div style={{ marginTop: "20px" }} />
      <Title level={2}>Sponsor / Owner Details</Title>
      <div style={{ marginTop: "20px" }} />
      {sponsorOwnerDetail &&
        sponsorOwnerDetail.map((item, ind) => (
          <Paper padding="2" key={ind}>
            <Row gutter={16}>
              <Col lg={6} md={6} sm={24} xs={24}>
                <SelectBox
                  size="small"
                  label="Director Type"
                  option={directorTypeOptions && directorTypeOptions}
                  value={item.directorTypeID}
                  name="DirectorTypeID"
                  disable
                />
              </Col>
              <Col lg={6} md={6} sm={24} xs={24}>
                <TextField
                  size="small"
                  disable
                  label="Name of Proprietor/Director/Partner"
                  fullWidth
                  value={item.directorName}
                  textLength={300}
                  name="DirectorName"
                />
              </Col>
              <Col lg={6} md={6} sm={24} xs={24}>
                <TextField
                  size="small"
                  label="CNIC"
                  fullWidth
                  value={item.cnic}
                  textLength={300}
                  name="CNIC"
                  disable
                />
              </Col>
              <Col lg={6} md={6} sm={24} xs={24}>
                <TextField
                  size="small"
                  label="Father / Husband Name"
                  fullWidth
                  value={item.fatherHusband}
                  textLength={300}
                  name="FatherHusband"
                  disable
                />
              </Col>
              <Col lg={24} md={24} sm={24} xs={24} align="center">
                <TextField
                  multiline
                  rows={4}
                  label="Personal Address"
                  value={item.address}
                  fullWidth
                  name="Address"
                  disable
                />
              </Col>
            </Row>
          </Paper>
        ))}
    </>
  );
};

export default ViewWriteOffs;
