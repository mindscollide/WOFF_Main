import React, { useState, useEffect } from "react";
import styles from "./style.module.css";
import { Typography, Space, Radio, Row, Col } from "antd";
import {
  SelectBox,
  Button,
  Table,
  Paper,
  StartToEndDate,
  TextField,
  Loader,
  Notification,
  FormattedInputs,
} from "../../../../Components/Elements";
import { useDispatch, useSelector } from "react-redux";
import {
  creditPolicyReport,
  creditReportExcel,
} from "../../.././../store/actions/reports_actions";
import { GetAdvanceClassification } from "../../../../store/actions/setup-forms-actions";
import {
  DateDisplayFormat,
  DateSendingFormat,
  currentToOneYearBackDate,
  NumberFormater,
} from "../../../../Common/Functions/date-formatter";
import { columns } from "./data";

const CreditPolicy = () => {
  const structure = {
    DateFrom: "",
    DateTO: "",
    AmountFrom: 0,
    AmountTo: 0,
    MiSysCustomerCode: "",
    BorrowserNPLCode: "",
    CNICNumber: "",
    NameOfSponsor: "",
    AdvanceClassificationID: "Select",
    ChargeOfType: 1,
  };
  var [rows, setRows] = useState([]);
  const [submitType, setsubmitType] = useState(1);
  const dispatch = useDispatch();
  const reports = useSelector((state) => state.reports);
  const setupForms = useSelector((state) => state.setupForms);
  const { Title } = Typography;

  // data states
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
    AdvanceClassificationID: "Select",
    ChargeOfType: 1,
    WOFCode: "",
  });
  const [open, setOpen] = useState({
    open: false,
    message: "",
  });
  const fieldsHandler = (e, val) => {
    let id = e.target.id !== undefined ? e.target.id : null;
    let name = e.target.name;
    let value = e.target.value;
    if (id && id.includes("AdvanceClassificationID")) {
      setForm({ ...form, ["AdvanceClassificationID"]: val.title });
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
    if (!value == "") {
      if (Number(value)) {
        setForm({ ...form, [name]: value });
      } else {
        console.log("Please Enter Valid CNIC");
      }
    } else {
      setForm({ ...form, [name]: "" });
    }
    console.log(form);
  };
  // to make api call
  const handleSubmit = (e, submitType) => {
    e.preventDefault();
    let tempData = { ...form };
    if (tempData.AdvanceClassificationID === "Select") {
      tempData.AdvanceClassificationID = 0;
    } else {
      let AdvanceClassificationIDIndex =
        setupForms.ClassificationOfAdvances.findIndex(
          (x) => x.title === tempData.AdvanceClassificationID
        );
      tempData.AdvanceClassificationID =
        setupForms.ClassificationOfAdvances[AdvanceClassificationIDIndex].id;
    }
    // format date as per Api
    if (submitType === 1) {
      console.log("Search");
      dispatch(creditPolicyReport(tempData));
    } else if (submitType === 2) {
      console.log("Export");
      dispatch(creditReportExcel(tempData));
    }
  };

  useEffect(() => {
    if (form.AdvanceClassificationID === "Charged Off") {
      setEnableRadio(false);
      setForm({ ...form, ChargeOfType: 2 });
    } else if (form.AdvanceClassificationID !== "Charged Off") {
      setEnableRadio(true);
      setForm({ ...form, ChargeOfType: 1 });
    }
  }, [form.AdvanceClassificationID]);

  useEffect(() => {
    var addedKey, data;
    if (reports.isRecordFound) {
      data = [...reports.creditPoliocyReport];

      addedKey = data.map((item, index) => {
        return { ...item, key: index };
      });
    }
    setRows(addedKey);
    console.log(reports.creditPoliocyReport);
    console.log("credit row", addedKey);
    setOpen({
      ...open,
      open: true,
      message: reports.recordMessage,
    });
    // setForm(JSON.parse(JSON.stringify(structure)));
  }, [reports.creditPoliocyReport]);
  useEffect(() => {
    // let { toThisDate, fromThisDate } = currentToOneYearBackDate("YYYYMMDD");
    // if(toThisDate!==undefined && fromThisDate!==undefined){
    //   setForm({ ...form, DateTO: toThisDate, DateFrom: fromThisDate });
    //   }
    dispatch(GetAdvanceClassification());
  }, []);
  return (
    <form onSubmit={(e) => handleSubmit(e, submitType)}>
      <>
        <Paper page>
          <Row gutter={8}>
            <Col lg={18} md={18} sm={24}>
              <Title level={3}>Credit Policy</Title>
            </Col>
            <div style={{ marginTop: "8%" }} />
            {/* Row 2 */}
            <Row gutter={8}>
              <Col lg={8} md={8} sm={24}>
                <label>
                  <b>Date Of WriteOff</b>
                </label>
                <br />
                <StartToEndDate
                  change={datehandler}
                  wudth="100%!important"
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
                    fullWidth
                    label={null}
                    size="small"
                    name="AmountFrom"
                    value={form.AmountFrom}
                    change={ammountFieldHandler}
                  />
                  <FormattedInputs
                    placeholder="To"
                    fullWidth
                    label={null}
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
                  fullWidth
                  label={null}
                  // required
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
                  textLength={13}
                  name="CNICNumber"
                  value={form.CNICNumber}
                  change={CNIChandler}
                  minLength={13}
                  fullWidth
                  label={null}
                  size="small"
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
                  value={form.AdvanceClassificationID}
                  change={fieldsHandler}
                  label={null}
                  option={setupForms.ClassificationOfAdvances}
                  propertyName={"title"}
                />
              </Col>
            </Row>
            {/* Row 03 */}
            <Row gutter={8}>
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
              <Col lg={6} md={6} sm={24}>
                <div style={{ marginTop: "9%" }} />
                <Button
                  applyClass="btnMiniPrimary"
                  text="Search"
                  icon={<i className="icon-search icon-size-one"></i>}
                  click={() => setsubmitType(1)}
                  type="submit"
                />
              </Col>
              <Col lg={6} md={6} sm={24} align="right">
                <div style={{ marginTop: "9%" }} />
                <Space>
                  <Button
                    applyClass="transparentBtn"
                    text="Export To Excel"
                    type="submit"
                    click={() => setsubmitType(2)}
                    icon={<i className="icon-export-excel icon-size-one"></i>}
                  />
                </Space>
              </Col>
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

export default CreditPolicy;
