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
  FormattedInputs,
  Notification,
} from "../../../../Components/Elements";
import {
  GetAdvanceClassification,
  GetManagementUnit,
  GetWOFReason,
} from "../../../../store/actions/setup-forms-actions";
import { useDispatch, useSelector } from "react-redux";
import {
  completeReport,
  completeReportExcel,
} from "../../.././../store/actions/reports_actions";
import { columns } from "./data";
import {
  DateDisplayFormat,
  DateSendingFormat,
  currentToOneYearBackDate,
  NumberFormater,
} from "../../../../Common/Functions/date-formatter";
const CompleteReports = () => {
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
  const [length, setLength] = useState(13);
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
  // function containsSpecialChars(str) {
  //   const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  //   return specialChars.test(str);
  // }
  const CNIChandler = async (e) => {
    let name = e.target.name;
    let value = e.target.value;
    var valueCheck = value.replace(/[^\d-]/g, "");
    if (!valueCheck == "") {
      const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

      // await containsSpecialChars(valueCheck)
      if (specialChars.test(valueCheck)) {
        await setLength(15);
        setForm({ ...form, [name]: valueCheck });
      } else {
        await setLength(13);
        setForm({ ...form, [name]: valueCheck });
      }
      console.log("valuevalue", valueCheck);
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
    //   let AdvanceClassificationIDIndex =
    //     setupForms.ClassificationOfAdvances.findIndex(
    //       (x) => x.title === FinalSendingObject.AdvanceClassificationID
    //     );
    //   let WriteOffReasonIndex = setupForms.WOFReasons.findIndex(
    //     (x) => x.title === FinalSendingObject.WriteOffReason
    //   );
    //   let ManagementUnitIDIndex = setupForms.ManagementUnits.findIndex(
    //     (x) => x.title === FinalSendingObject.ManagementUnitID
    //   );
    //   FinalSendingObject.AdvanceClassificationID =
    //     setupForms.ClassificationOfAdvances[AdvanceClassificationIDIndex].id;
    //   FinalSendingObject.WriteOffReason =
    //     setupForms.WOFReasons[WriteOffReasonIndex].id;
    //   FinalSendingObject.ManagementUnitID =
    //     setupForms.ManagementUnits[ManagementUnitIDIndex].id;
    // }
    // FinalSendingObject.DateFrom = DateSendingFormat(FinalSendingObject.DateFrom);
    // FinalSendingObject.DateTO = DateSendingFormat(FinalSendingObject.DateTO);
    console.log(FinalSendingObject);
    if (submitType === 1) {
      console.log("Search", FinalSendingObject);
      dispatch(completeReport(FinalSendingObject));
    } else if (submitType === 2) {
      console.log("Export");
      dispatch(completeReportExcel(FinalSendingObject));
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
    if (reports.isRecordFound && reports.completeReport.length > 0) {
      data = [...reports.completeReport];

      addedKey = data.map((item, index) => {
        return { ...item, key: index };
      });
    }
    setRows(addedKey);
    setOpen({
      ...open,
      open: true,
      message: reports.recordMessage,
    });
    // setForm(JSON.parse(JSON.stringify(structure)));
  }, [reports.completeReport]);
  useEffect(() => {
    // let { toThisDate, fromThisDate } = currentToOneYearBackDate("YYYYMMDD");
    // if (toThisDate !== undefined && fromThisDate !== undefined) {
    //   setForm({ ...form, DateTO: toThisDate, DateFrom: fromThisDate });
    // }
    dispatch(GetAdvanceClassification());
    dispatch(GetManagementUnit());
    dispatch(GetWOFReason());
  }, []);
  return (
    <form onSubmit={(e) => handleSubmit(e, submitType)}>
      <>
        <Paper page>
          <Row gutter={8}>
            {/* Row 01 */}
            <Col lg={18} md={18} sm={24}>
              <Title level={3}>Complete Report (Account wise)</Title>
            </Col>
            <div style={{ marginTop: "8%" }} />
            {/* Row 2 */}
            <Row gutter={8}>
              <Col lg={8} md={8} sm={24}>
                <label>
                  <b>Date Of WriteOff</b>
                </label>
                <br />
                <div style={{
                  display: "flex"
                }}>
                  <StartToEndDate
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
                    DateRange={true}
                  />
                </div>
              </Col>
              <Col lg={8} md={8} sm={24}>
                <label>
                  <b>FRA Total</b>
                </label>
                <br />
                <div style={{
                  display: "flex"
                }}>
                  <FormattedInputs
                    placeholder="From"
                    label={null}
                    size="small"
                    minLength={15}
                    fullWidth
                    name="AmountFrom"
                    value={form.AmountFrom}
                    change={ammountFieldHandler}
                  />
                  <FormattedInputs
                    placeholder="To"
                    label={null}
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
                <label>
                  <b>MISYS Customer Code</b>
                </label>
                <br />
                <TextField
                  name="MiSysCustomerCode"
                  value={form.MiSysCustomerCode}
                  change={fieldsHandler}
                  // textLength={6}
                  // helper="Please Enter 6 Digit Code"
                  // error={
                  //   form.MiSysCustomerCode !== ""?
                  //     // ? form.MiSysCustomerCode.length >= 6
                  //     //   ? false
                  //     //   :
                  //       true
                  //     : false
                  // }
                  fullWidth
                  // minLength={6}
                  label={null}
                  size="small"
                />
              </Col>
              <div style={{ marginTop: "8%" }} />
              <Col lg={6} md={6} sm={24}>
                <label>
                  <b>Borrower NPL Code</b>
                </label>
                <br />
                <TextField
                  name="BorrowserNPLCode"
                  value={form.BorrowserNPLCode}
                  change={fieldsHandler}
                  label={null}
                  size="small"
                  fullWidth
                />
              </Col>
              <Col lg={6} md={6} sm={24}>
                <label>
                  <b>CNIC Number</b>
                </label>
                <br />
                <TextField
                  name="CNICNumber"
                  value={form.CNICNumber}
                  change={CNIChandler}
                  fullWidth
                  label={null}
                  size="small"
                  textLength={length}
                  minLength={length}
                />
              </Col>
              <Col lg={6} md={6} sm={24}>
                <label>
                  <b>Name of Borrower</b>
                </label>
                <br />
                <TextField
                  name="NameOfSponsor"
                  value={form.NameOfSponsor}
                  change={fieldsHandler}
                  fullWidth
                  label={null}
                  size="small"
                />
              </Col>
              <Col lg={6} md={6} sm={24}>
                <label>
                  <b>Classification of Advance</b>
                </label>
                <br />
                <SelectBox
                  name="AdvanceClassificationID"
                  value={advanceClassificationIDValue}
                  change={fieldsHandler}
                  label={"Select Classification of Advance"}
                  propertyName={"title"}
                  option={setupForms.ClassificationOfAdvances}
                />
              </Col>
            </Row>
            {/* Row 03 */}
            <Row gutter={8}>
              <Col lg={6} md={6} sm={24}>
                <label>
                  <b>Business Segment</b>
                </label>
                <br />
                <SelectBox
                  option={setupForms.ManagementUnits}
                  name="ManagementUnitID"
                  value={managementUnitIDValue}
                  change={fieldsHandler}
                  label={"Select Business Segment"}
                  propertyName={"title"}
                />
              </Col>
              <Col lg={6} md={6} sm={24}>
                <label>
                  <b>Reason of Write Off</b>
                </label>
                <br />
                <SelectBox
                  propertyName={"title"}
                  option={setupForms.WOFReasons}
                  name="WriteOffReason"
                  value={writeOffReasonValue}
                  change={fieldsHandler}
                  label={"Select Write Off Reason"}
                />
              </Col>
              <Col lg={6} md={6} sm={24}>
                <label>
                  <b>WOF Code</b>
                </label>
                <br />
                <TextField
                  name="WOFCode"
                  value={form.WOFCode}
                  change={fieldsHandler}
                  // label={"WOFCode"}
                  size="small"
                  fullWidth
                />
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
              {/* <Grid item lg={5} md={5} sm={12}></Grid> */}
              <Col lg={4} md={4} sm={24}>
                <div style={{ marginTop: "14%" }} />
                <Button
                  applyClass="btnMiniPrimary"
                  text="Search"
                  icon={<i className="icon-search icon-size-one"></i>}
                  click={() => setsubmitType(1)}
                  type="submit"
                />
              </Col>
              <Col lg={20} md={20} sm={24} align="right">
                <div style={{ marginTop: "2%" }} />
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
            </Row>
          </Row>
          <Row gutter={8}>
            <Col style={{ marginTop: "2%" }} lg={24} md={24} sm={24}>
              <Table
                rows={rows}
                columns={columns}
                scroll={{ x: "max-content" }}
              />
            </Col>
          </Row>
        </Paper>
        <Notification
          setOpen={setOpen}
          open={open.open}
          message={open.message}
        />
      </>
    </form>
  );
};

export default CompleteReports;
