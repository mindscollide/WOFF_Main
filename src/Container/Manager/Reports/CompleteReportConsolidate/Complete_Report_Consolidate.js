import React, { useState, useEffect } from "react";
import styles from "./style.module.css";
import { Typography, Space, Radio, Row, Col } from "antd";
import {
  SelectBox,
  Button,
  Table,
  StartToEndDate,
  Paper,
  TextField,
  Notification,
  FormattedInputs,
} from "../../../../Components/Elements";
import {
  GetAdvanceClassification,
  GetManagementUnit,
  GetWOFReason,
} from "../../../../store/actions/setup-forms-actions";
import { useDispatch, useSelector } from "react-redux";
import {
  completeReportConsolidate,
  completeReportConsolidateExcel,
} from "../../.././../store/actions/reports_actions";
import { columns } from "./data";
import {
  DateDisplayFormat,
  DateSendingFormat,
  currentToOneYearBackDate,
  NumberFormater,
} from "../../../../Common/Functions/date-formatter";
const CompleteReportsConsolidate = () => {
  const structure = {
    DateFrom: "",
    DateTO: "",
    AmountFrom: 0,
    AmountTo: 0,
    MiSysCustomerCode: "",
    BorrowserNPLCode: "",
    CNICNumber: "",
    NameOfSponsor: "",
    AdvanceClassificationID: 0,
    ChargeOfType: 1,
    ManagementUnitID: 0,
    WriteOffReason: 0,
  };

  const dispatch = useDispatch();

  const reports = useSelector((state) => state.reports);
  const setupForms = useSelector((state) => state.setupForms);
  const { Title } = Typography;

  // data states
  var [rows, setRows] = useState([]);
  const [submitType, setsubmitType] = useState(1);
  const [enableRadio, setEnableRadio] = useState(true);
  const [form, setForm] = useState({
    DateFrom: "",
    DateTO: "",
    AmountFrom: 0,
    AmountTo: 0,
    MiSysCustomerCode: "",
    BorrowserNPLCode: "",
    CNICNumber: "",
    NameOfSponsor: "",
    AdvanceClassificationID: 0,
    ChargeOfType: 1,
    ManagementUnitID: 0,
    WriteOffReason: 0,
    WOFCode: "",
  });
  const [advanceClassificationIDValue, setAdvanceClassificationIDValue] =
    useState("");
  const [managementUnitIDValue, setManagementUnitIDValue] = useState("");
  const [writeOffReasonValue, setWriteOffReasonValue] = useState("");
  const [open, setOpen] = useState({
    open: false,
    message: "",
  });

  const fieldsHandler = (e, val) => {
    let id = e.target.id !== undefined ? e.target.id : null;
    let name = e.target.name;
    let value = e.target.value;
    if (id && id.includes("ManagementUnitID")) {
      setManagementUnitIDValue(val.title);
      let idn = 0;
      setupForms.ManagementUnits.map((data, index) => {
        if (data.title === val.title) {
          idn = data.id;
        }
      });
      setForm({ ...form, ["ManagementUnitID"]: idn });
    } else if (id && id.includes("AdvanceClassificationID")) {
      console.log(
        "setupForms.ClassificationOfAdvances",
        setupForms.ClassificationOfAdvances
      );
      setAdvanceClassificationIDValue(val.title);
      let idn = 0;
      setupForms.ClassificationOfAdvances.map((data, index) => {
        if (data.title === val.title) {
          idn = data.id;
        }
      });
      if (val.title === "Charged Off") {
        setEnableRadio(false);
        setForm({ ...form, ["AdvanceClassificationID"]: idn, ChargeOfType: 2 });
      } else if (form.AdvanceClassificationID !== "Charged Off") {
        setEnableRadio(true);
        setForm({ ...form, ["AdvanceClassificationID"]: idn, ChargeOfType: 1 });
      }
      // setForm({ ...form, ["AdvanceClassificationID"]: idn });
    } else if (id && id.includes("WriteOffReason")) {
      setWriteOffReasonValue(val.title);
      let idn = 0;
      setupForms.WOFReasons.map((data, index) => {
        if (data.title === val.title) {
          idn = data.id;
        }
      });
      setForm({ ...form, ["WriteOffReason"]: idn });
    } else if (name === "WOFCode") {
      setForm({ ...form, ["WOFCode"]: value });
    } else {
      setForm({ ...form, [name]: value });
    }
  };
  const datehandler = (e, val) => {
    if (
      e.name &&
      e.name === "dater" &&
      e.startDate !== null &&
      e.endDate !== null &&
      e.startDate !== "" &&
      e.endDate !== ""
    ) {
      setForm({
        ...form,
        DateTO: DateSendingFormat(e.startDate),
        DateFrom: DateSendingFormat(e.endDate),
      });
    } else {
      setForm({ ...form, DateTO: "", DateFrom: "" });
    }
  };
  const ammountFieldHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (String(Number(e.target.value)).length <= 17) {
      setForm({ ...form, [name]: NumberFormater(value) });
    } else {
      console.log("Greater");
    }
  };
  const CNIChandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    var valueCheck = value.replace(/[^\d-]/g, "");
    if (!valueCheck == "") {
      if (valueCheck) {
        console.log("cnic", typeof valueCheck);
        setForm({ ...form, [name]: valueCheck });
      } else {
        console.log("Please Enter Valid CNIC");
      }
    } else {
      setForm({ ...form, [name]: "" });
    }
    console.log(form);
  };
  // dispatch action here to make api post request
  const handleSubmit = (e, submitType) => {
    e.preventDefault();
    let FinalSendingObject = { ...form };
    // if (FinalSendingObject.AdvanceClassificationID === "Select") {
    //   FinalSendingObject.AdvanceClassificationID = 0;
    // }
    // if (FinalSendingObject.WriteOffReason === "Select") {
    //   FinalSendingObject.WriteOffReason = 0;
    // }
    // if (FinalSendingObject.ManagementUnitID === "Select") {
    //   FinalSendingObject.ManagementUnitID = 0;
    // } else {
    //   let AdvanceClassificationIDIndex = setupForms.ClassificationOfAdvances.findIndex(x=>x.title===FinalSendingObject.AdvanceClassificationID)
    //   let WriteOffReasonIndex = setupForms.WOFReasons.findIndex(x=>x.title===FinalSendingObject.WriteOffReason)
    //   let ManagementUnitIDIndex = setupForms.ManagementUnits.findIndex(x=>x.title===FinalSendingObject.ManagementUnitID)
    //   FinalSendingObject.AdvanceClassificationID = setupForms.ClassificationOfAdvances[AdvanceClassificationIDIndex].id;
    //   FinalSendingObject.WriteOffReason = setupForms.WOFReasons[WriteOffReasonIndex].id;
    //   FinalSendingObject.ManagementUnitID = setupForms.ManagementUnits[ManagementUnitIDIndex].id;
    // }
    // FinalSendingObject.DateFrom = DateSendingFormat(FinalSendingObject.DateFrom);
    // FinalSendingObject.DateTO = DateSendingFormat(FinalSendingObject.DateTO);
    console.log(FinalSendingObject);
    if (submitType === 1) {
      console.log("Search");
      dispatch(completeReportConsolidate(FinalSendingObject));
    } else if (submitType === 2) {
      console.log("Export");
      dispatch(completeReportConsolidateExcel(FinalSendingObject));
    }
  };

  // useEffect(() => {
  //   if (form.AdvanceClassificationID === "Charged Off") {
  //     setEnableRadio(false);
  //     setForm({ ...form, ChargeOfType: 2 });
  //   } else if (form.AdvanceClassificationID !== "Charged Off") {
  //     setEnableRadio(true);
  //     setForm({ ...form, ChargeOfType: 1 });
  //   }
  // }, [form.AdvanceClassificationID]);

  useEffect(() => {
    var addedKey, data;
    if (reports.isRecordFound && reports.completeReportConsolidate.length > 0) {
      data = [...reports.completeReportConsolidate];

      addedKey = data.map((item, index) => {
        return { ...item, key: index };
      });
    }
    setRows(addedKey);
    console.log("addedKey", addedKey);
    setOpen({
      ...open,
      open: true,
      message: reports.recordMessage,
    });
    // setForm(JSON.parse(JSON.stringify(structure)));
  }, [reports.completeReportConsolidate]);
  useEffect(() => {
    // let { toThisDate, fromThisDate } = currentToOneYearBackDate("YYYYMMDD");
    // if(toThisDate!==undefined && fromThisDate!==undefined){
    // setForm({ ...form, DateTO: toThisDate, DateFrom: fromThisDate });
    // }
    dispatch(GetAdvanceClassification());
    dispatch(GetManagementUnit());
    dispatch(GetWOFReason());
  }, []);
  console.log("Search", form);
  return (
    <form onSubmit={(e) => handleSubmit(e, submitType)}>
      <>
        <Paper page>
          <Row gutter={8}>
            {/* Row 01 */}
            <Col lg={18} md={18} sm={24}>
              <Title level={3}>Complete Report Consolidate</Title>
            </Col>
            <div style={{ marginTop: "8%" }} />
            {/* Row 2 */}
            <Row gutter={8}>
              <Col lg={8} md={8} sm={24}>


                <div style={{
                  display: "flex"
                }}>
                  <StartToEndDate
                    label="Date Of WriteOff"
                    change={datehandler}
                    width="100%!important"
                    size="large"
                    startvalue={
                      form.DateFrom !== null && form.DateFrom !== ""
                        ? DateDisplayFormat(form.DateFrom)
                        : ""
                    }
                    endvalue={
                      form.DateTO !== null && form.DateFrom !== ""
                        ? DateDisplayFormat(form.DateTO)
                        : ""
                    }
                    DateRange={true} />
                </div>
              </Col>
              <Col lg={8} md={8} sm={24}>


                <div style={{
                  display: "flex"
                }}>
                  <FormattedInputs
                    placeholder="From"
                    Label="FRA Total From"
                    size="small"
                    minLength={15}
                    fullWidth
                    name="AmountFrom"
                    value={form.AmountFrom}
                    change={ammountFieldHandler}
                  />
                  <FormattedInputs
                    placeholder="To"
                    Label="FRA Total To"
                    minLength={15}
                    fullWidth
                    size="small"
                    name="AmountTo"
                    value={form.AmountTo}
                    change={ammountFieldHandler}
                  />
                </div>
              </Col>
              <Col lg={8} md={8} sm={24}>


                <TextField
                  name="MiSysCustomerCode"
                  value={form.MiSysCustomerCode}
                  change={fieldsHandler}
                  // textLength={6}
                  // helper="Please Enter 6 Digit Code"
                  // error={form.MiSysCustomerCode!==""?form.MiSysCustomerCode.length>=6?false:true:false}
                  fullWidth
                  label="MISYS Customer Code"
                  size="small"
                />
              </Col>
              <div style={{ marginTop: "8%" }} />
              <Col lg={6} md={6} sm={24}>


                <TextField
                  name="BorrowserNPLCode"
                  value={form.BorrowserNPLCode}
                  change={fieldsHandler}
                  label="Borrower NPL Code"
                  size="small"
                  fullWidth
                />
              </Col>
              <Col lg={6} md={6} sm={24}>


                <TextField
                  name="CNICNumber"
                  value={form.CNICNumber}
                  change={CNIChandler}
                  fullWidth
                  label="CNIC Number"
                  size="small"
                  textLength={15}
                  minLength={15}
                />
              </Col>
              <Col lg={6} md={6} sm={24}>


                <TextField
                  name="NameOfSponsor"
                  value={form.NameOfSponsor}
                  change={fieldsHandler}
                  fullWidth
                  label="Name of Borrower"
                  size="small"
                />
              </Col>
              <Col lg={6} md={6} sm={24}>


                <SelectBox
                  name="AdvanceClassificationID"
                  value={advanceClassificationIDValue}
                  change={fieldsHandler}
                  label="Classification of Advance"
                  propertyName={"title"}
                  option={setupForms.ClassificationOfAdvances}
                />
              </Col>
            </Row>
            {/* Row 03 */}
            <Row gutter={8}>
              <Col lg={6} md={6} sm={24}>


                <SelectBox
                  option={setupForms.ManagementUnits}
                  name="ManagementUnitID"
                  value={managementUnitIDValue}
                  change={fieldsHandler}
                  label="Business Segment"
                  propertyName={"title"}
                />
              </Col>
              <Col lg={6} md={6} sm={24}>


                <SelectBox
                  propertyName={"title"}
                  option={setupForms.WOFReasons}
                  name="WriteOffReason"
                  value={writeOffReasonValue}
                  change={fieldsHandler}
                  label="Reason of Write Off"
                />
              </Col>
              <Col lg={6} md={6} sm={24}>


                <TextField
                  label="WOF Code"
                  name="WOFCode"
                  value={form.WOFCode}
                  change={fieldsHandler}
                  // label={"WOFCode"}
                  size="small"
                  fullWidth />
              </Col>
              <Col lg={6} md={6} sm={24} align="left">
                <label>
                  <b>Charge Off</b>
                </label>
                <br />
                <Radio.Group
                  onChange={fieldsHandler}
                  name="ChargeOfType"
                  value={form.ChargeOfType}
                  style={{ marginTop: "2%" }}
                >
                  <Radio disabled={enableRadio} value={2}>
                    New Charge-Off
                  </Radio>
                  <Radio disabled={enableRadio} value={3}>
                    Old Charge-Off
                  </Radio>
                </Radio.Group>
              </Col>
              {/* <Grid item lg={5} md={5} sm={12} ></Grid> */}
              <Col lg={4} md={4} sm={24}>
                <Button
                  applyClass="btnMiniPrimary"
                  text="Search"
                  icon={<i className="icon-search icon-size-one"></i>}
                  click={() => setsubmitType(1)}
                  type="submit"
                />
              </Col>
              <Col lg={20} md={20} sm={24} align="right">
                <Space>
                  <Button
                    type="submit"
                    click={() => setsubmitType(2)}
                    applyClass="transparentBtn"
                    text="Export To Excel"
                    icon={<i className="icon-export-excel icon-size-one"></i>}
                  />
                </Space>
                <br />
                <br />
              </Col>

              <Row gutter={8}>
                <Col style={{ marginTop: "2%" }} lg={24} md={24} sm={24}>
                  <Table
                    rows={rows}
                    columns={columns}
                    scroll={{ x: "max-content" }}
                  />
                </Col>
              </Row>
            </Row>
          </Row>
        </Paper>
      </>
      <Notification setOpen={setOpen} open={open.open} message={open.message} />
    </form>
  );
};

export default CompleteReportsConsolidate;
