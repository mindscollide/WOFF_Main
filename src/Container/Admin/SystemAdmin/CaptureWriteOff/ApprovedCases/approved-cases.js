import React, { useState, useEffect } from "react";
// import styles from "../../../../Manager/Reports/CompleteReports/s";
import { Typography, Space, Radio, Tooltip, Row, Col } from "antd";
import { Link, useNavigate } from "react-router";
import {
  SelectBox,
  Button,
  Table,
  StartToEndDate,
  Modal,
  Paper,
  TextField,
  FormattedInputs,
  Loader,
  GroupedButtons,
  Notification,
} from "../../../../../Components/Elements";
import {
  GetAdvanceClassification,
  RevertApprovedCaseBySystemAdmin,
  GetManagementUnit,
  GetWOFReason,
  GetApprovalReason,
  GetRejectionReason,
  getViewAllApprovedCasesForSystemAdmin,
} from "../../../../../store/actions/setup-forms-actions";
import { HideNotification } from "../../../../../store/actions/write-off-actions";
import {
  enableGoBack,
  activeEdit,
  disableGoBack,
} from "../../../../../store/actions/ui-actions";

import { useDispatch, useSelector } from "react-redux";
import {
  completeReport,
  completeReportExcel,
  ApprovedCasesSystemAdminExcel,
} from "../../../../../store/actions/reports_actions";
import { viewApprovalHistory } from "../../../../../store/actions/wof-approvals-actions";
// import { columns } from "./data";
import {
  DateDisplayFormat,
  DateSendingFormat,
  currentToOneYearBackDate,
  NumberFormater,
  CommaFormter,
} from "../../../../../Common/Functions/date-formatter";
const ApprovedCases = () => {
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
    ManagementUnitID: "Select",
    WriteOffReason: "Select",
  };

  const [ApprovalHistory, setviewApprovalHistory] = useState([]);

  const dispatch = useDispatch();
  const reports = useSelector((state) => state.reports);
  const setupForms = useSelector((state) => state.setupForms);
  const { Title } = Typography;

  // data states
  var [rows, setRows] = useState([]);
  const [filteredApprovalHistRow, setFilteredApprovalHistRow] = useState([]);
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
    AdvanceClassificationID: "Select",
    ChargeOfType: 1,
    ManagementUnitID: "Select",
    WriteOffReason: "Select",
    WOFCode: "",
  });
  const [open, setOpen] = useState({
    open: false,
    message: "",
  });
  const navigate = useNavigate();
  const fieldsHandler = (e, val) => {
    let id = e.target.id !== undefined ? e.target.id : null;
    let name = e.target.name;
    let value = e.target.value;
    if (id && id.includes("ManagementUnitID")) {
      setForm({ ...form, ["ManagementUnitID"]: val.title });
    } else if (id && id.includes("AdvanceClassificationID")) {
      setForm({ ...form, ["AdvanceClassificationID"]: val.title });
    } else if (id && id.includes("WriteOffReason")) {
      setForm({ ...form, ["WriteOffReason"]: val.title });
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
      e.endDate !== null
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

  // dispatch action here to make api post request
  const handleSubmit = (e, submitType) => {
    e.preventDefault();
    let FinalSendingObject = { ...form };
    if (FinalSendingObject.AdvanceClassificationID === "Select") {
      FinalSendingObject.AdvanceClassificationID = 0;
    }
    if (FinalSendingObject.WriteOffReason === "Select") {
      FinalSendingObject.WriteOffReason = 0;
    }
    if (FinalSendingObject.ManagementUnitID === "Select") {
      FinalSendingObject.ManagementUnitID = 0;
    } else {
      let AdvanceClassificationIDIndex =
        setupForms.ClassificationOfAdvances.findIndex(
          (x) => x.title === FinalSendingObject.AdvanceClassificationID
        );
      let WriteOffReasonIndex = setupForms.WOFReasons.findIndex(
        (x) => x.title === FinalSendingObject.WriteOffReason
      );
      let ManagementUnitIDIndex = setupForms.ManagementUnits.findIndex(
        (x) => x.title === FinalSendingObject.ManagementUnitID
      );
      FinalSendingObject.AdvanceClassificationID =
        setupForms.ClassificationOfAdvances[AdvanceClassificationIDIndex].id;
      FinalSendingObject.WriteOffReason =
        setupForms.WOFReasons[WriteOffReasonIndex].id;
      FinalSendingObject.ManagementUnitID =
        setupForms.ManagementUnits[ManagementUnitIDIndex].id;
    }
    // FinalSendingObject.DateFrom = DateSendingFormat(FinalSendingObject.DateFrom);
    // FinalSendingObject.DateTO = DateSendingFormat(FinalSendingObject.DateTO);
    console.log(FinalSendingObject);
    if (submitType === 1) {
      console.log("Search");
      // dispatch(completeReport(FinalSendingObject));
      dispatch(getViewAllApprovedCasesForSystemAdmin(FinalSendingObject));
    } else if (submitType === 2) {
      console.log("Export");
      // let name="Approved-Cases.xlsx"
      dispatch(ApprovedCasesSystemAdminExcel(FinalSendingObject));
    }
  };
  const [approvalHistModal, setApprovalHistModal] = useState(false);
  const [isModalVisible1, setIsModalVisible1] = useState(false);
  const [btnStatus, setBtnStatus] = useState(true);
  const showModal = () => {
    setApprovalHistModal((prev) => !prev);
  };
  const showModal2 = () => {
    setIsModalVisible1(true);
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
    if (setupForms.Success && setupForms.ApprovedUserList.length > 0) {
      data = [...setupForms.ApprovedUserList];

      addedKey = data.map((item, index) => {
        return { ...item, key: index };
      });
    }
    setRows(addedKey);
    console.log("ddddddddd", setupForms);
    // setForm(JSON.parse(JSON.stringify(structure)));
  }, [setupForms.ApprovedUserList]);
  useEffect(() => {
    let { toThisDate, fromThisDate } = currentToOneYearBackDate("YYYYMMDD");
    // if (toThisDate !== undefined && fromThisDate !== undefined) {
    //   setForm({ ...form, DateTO: toThisDate, DateFrom: fromThisDate });
    // }
    dispatch(disableGoBack());
    dispatch(GetAdvanceClassification());
    dispatch(GetManagementUnit());
    dispatch(GetWOFReason());
    dispatch(GetApprovalReason());
    dispatch(GetRejectionReason());
  }, []);
  const View = (e, value) => {
    localStorage.setItem("wofCustomerMasterID", JSON.stringify(value));
    dispatch(enableGoBack());
    navigate("/Wof/Admin/ViewWriteOff");
  };
  const Edit = async (e, value) => {
    localStorage.setItem("parent", "");
    localStorage.setItem("child", "");

    dispatch(enableGoBack());
    // dispatch(activeEdit());
    await localStorage.setItem("wofCustomerMasterID", JSON.stringify(value));
    navigate("/Wof/Admin/EditWriteOffDetails");
  };
  const handleCancel1 = () => {
    setIsModalVisible1(false);
    setApprovalHistModal((prev) => !prev);
  };
  const [approvalReason, setapprovalReason] = useState({
    WOFCustomerMasterID: "",
    Reason: "",
  });
  const handleDescription = (e) => {
    let a = e.target.value;
    setapprovalReason({
      ...approvalReason,
      Reason: e.target.value,
    });

    if (a.length > 0) {
      console.log("handleDescription");
      setBtnStatus(false);
    } else {
      console.log("handleDescription false");
      setBtnStatus(true);
    }
  };

  const inactiveit = (record) => {
    console.log("WOFCustomerMasterID", record);

    setapprovalReason({
      ...approvalReason,
      WOFCustomerMasterID: record.wofCustomerMasterID,
    });
    showModal2();
    // setAction({ ...actions, delete: true, update: false,
    //   add: false, });
  };

  useEffect(() => {}, [btnStatus]);
  console.log("btnStatus", btnStatus);
  const handleCancel = () => {
    setIsModalVisible1(false);
    setapprovalReason({
      ...approvalReason,
      WOFCustomerMasterID: null,
      Reason: "",
    });
    setBtnStatus(true);
  };
  const handleProceed = () => {
    console.log("handleProceed", approvalReason);
    setIsModalVisible1(false);
    setBtnStatus(true);
    dispatch(RevertApprovedCaseBySystemAdmin(approvalReason));
  };
  const buttonProps = {
    primaryButton: {
      text: "Proceed",
      icon: <i className="icon-check icon-size-one"></i>,
      endIcon: "",
      class: "btnBorderStyledBeach",
      // disable:{btnStatus},
      click: () => handleProceed(),
    },
    secondaryButton: {
      text: "Discard",
      icon: <i className="icon-close icon-size-one"></i>,
      endIcon: "",
      // disable:{btnStatus},
      class: "btnBorderStyledRed",
      click: () => handleCancel(),
    },
  };
  const buttonProps2 = {
    primaryButton: {
      text: "Proceed",
      icon: <i className="icon-check icon-size-one"></i>,
      endIcon: "",
      class: "btnBorderStyledBeach",
      disable: { btnStatus },
      click: () => handleProceed(),
    },
    secondaryButton: {
      text: "Discard",
      icon: <i className="icon-close icon-size-one"></i>,
      endIcon: "",
      disable: { btnStatus },
      class: "btnBorderStyledRed",
      click: () => handleCancel(),
    },
  };
  const columns = [
    {
      title: "Company Code",
      dataIndex: "miSysCode",
      key: "miSysCode",
      align: "center",
      width: "3%",
    },
    {
      title: "Company Name",
      dataIndex: "name",
      key: "name",
      align: "center",
      width: "4%",
    },
    {
      title: "WOF Code",
      dataIndex: "wofCode",
      key: "wofCode",
      align: "center",
      width: "5%",
      render: (text, record, index) => (
        <Tooltip title="View" color={"Black"}>
          <i
            style={{ cursor: "pointer", color: "blue" }}
            onClick={(e) => View(e, record.wofCustomerMasterID)}
          >
            {record.wofCode}
          </i>
        </Tooltip>
      ),
    },

    {
      title: "Classification Of Advances",
      dataIndex: "advanceClassificationID",
      key: "advanceClassificationID",
      align: "center",
      width: "5%",
      render: (text) => {
        if (setupForms.ClassificationOfAdvances.length > 0) {
          return setupForms.ClassificationOfAdvances[
            setupForms.ClassificationOfAdvances.findIndex((x) => x.id === text)
          ].title;
        } else {
          return "";
        }
      },
    },
    {
      title: "FRA Principal ",
      dataIndex: "fraPrincipal",
      key: "fraPrincipal",
      align: "center",
      width: "5%",
      render: (text) => CommaFormter(text),
    },
    {
      title: "FRA Total",
      dataIndex: "fraTotal",
      key: "fraTotal",
      align: "center",
      width: "5%",
      render: (text) => CommaFormter(text),
    },
    {
      title: "Date of Write-off",
      dataIndex: "dateOfWriteoff",
      key: "dateOfWriteoff",
      align: "center",
      width: "5%",
      render: (text) => DateDisplayFormat(text),
    },
    {
      title: "View Approval History",
      dataIndex: "ViewApprovalHistory",
      key: "ViewApprovalHistory",
      align: "center",
      width: "5%",
      render: (text, record) => {
        return (
          <div
            onClick={() => {
              dispatch(
                viewApprovalHistory(
                  Number(record.wofCustomerMasterID),
                  setviewApprovalHistory
                )
              );
              showModal();
            }}
            style={{ cursor: "pointer" }}
            className="icon-edit-list icon-size-one beachGreen"
          ></div>
        );
      },
    },
    {
      title: "Edit",
      dataIndex: "Edit",
      key: "Edit",
      align: "center",
      width: "4%",
      render: (text, record) => (
        <Tooltip title="Edit" color={"Black"}>
          <i
            style={{ cursor: "pointer" }}
            onClick={(e) => Edit(e, record.wofCustomerMasterID)}
            className="icon-edit-list2 icon-size-one beachGreen"
          />
        </Tooltip>
      ),
    },
    {
      // title: "In-Active",
      title: "In-Active Case",
      dataIndex: "wofCustomerMasterID",
      key: "wofCustomerMasterID",
      align: "center",
      width: "4%",
      render: (text, record) => {
        return (
          <div>
            <i
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                inactiveit(record);
              }}
              className="icon-close icon-size-one crosstick"
            />
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    let historyData = ApprovalHistory.approvalHistory;

    console.log("filteredApprovalHistRow", setupForms);
    const data =
      ApprovalHistory &&
      ApprovalHistory.map((item) => {
        if (item.wofStatus == 1 && item.approvalRejectionReasonID !== 0) {
          let index = setupForms.ApprovalReasons.findIndex(
            (x) => x.id === item.approvalRejectionReasonID
          );
          let index2 = setupForms.RejectionReasons.findIndex(
            (x) => x.id === item.approvalRejectionReasonID
          );

          if (index !== -1) {
            item.approvalRejectionReasonID =
              setupForms.ApprovalReasons[index].title;
          } else if (index2 !== -1) {
            item.approvalRejectionReasonID =
              setupForms.RejectionReasons[index].title;
          }
          item.wofStatus = "Pending";
        }
        if (item.wofStatus == 2 && item.approvalRejectionReasonID !== 0) {
          let index = setupForms.ApprovalReasons.findIndex(
            (x) => x.id === item.approvalRejectionReasonID
          );
          item.approvalRejectionReasonID =
            setupForms.ApprovalReasons[index].title;
          item.wofStatus = "Approved";
        }
        if (item.wofStatus == 3 && item.approvalRejectionReasonID !== 0) {
          let index = setupForms.RejectionReasons.findIndex(
            (x) => x.id === item.approvalRejectionReasonID
          );
          item.approvalRejectionReasonID =
            setupForms.RejectionReasons[index].title;
          item.wofStatus = "Rejected";
        }
        if (item.wofStatus == 7) {
          // let index = setupForms.RejectionReasons.findIndex(x=>x.id===item.approvalRejectionReasonID);
          item.approvalRejectionReasonID = "";
          item.wofStatus = "In-Active";
        }
        if (item.wofStatus == 1 && item.approvalRejectionReasonID === 0) {
          item.approvalRejectionReasonID = "";
          item.wofStatus = "Pending";
        }
        return item;
      });

    setFilteredApprovalHistRow(data);
  }, [ApprovalHistory]);
  const viewApprovalColumn = [
    {
      title: "Date",
      dataIndex: "dateOfApproval",
      key: "dateOfApproval",
      align: "center",
      render: (text) => DateDisplayFormat(text),
      // width: "3%",
    },
    {
      title: "Status",
      dataIndex: "wofStatus",
      key: "wofStatus",
      align: "center",
    },
    {
      title: "Reason",
      dataIndex: "approvalRejectionReasonID",
      key: "approvalRejectionReasonID",
      align: "center",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      align: "center",
    },
    {
      title: "Action By",
      dataIndex: "actionBy",
      key: "actionBy",
      align: "center",
    },
  ];
  useEffect(() => {
    console.log("handleDescription", btnStatus);
  }, [btnStatus]);
  useEffect(() => {
    console.log("RevertApprovedCaseBySystemAdmin", setupForms.Success);

    if (setupForms.ShowNotification) {
      setOpen({
        flag: true,
        message: setupForms.Message,
      });
      dispatch(HideNotification());
      // dispatch(ViewAllRevertedCasesForSystemAdmin(Details.userID, 5,SearchTerm));
    }
  }, [setupForms.ShowNotification]);
  return (
    <>
      <form onSubmit={(e) => handleSubmit(e, submitType)}>
        <>
          <Paper page>
            <Row gutter={8}>
              {/* Row 01 */}
              <Col lg={18} md={18} sm={24}>
                <Title level={3}>Approved Cases</Title>
              </Col>
              <Col lg={6} md={6} sm={24} align="right">
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
              <div style={{ marginTop: "8%" }} />
              {/* Row 2 */}
              <Row gutter={8}>
                <Col lg={8} md={8} sm={24}>


                  <div style={{
                    display: "flex"
                  }}>
                    <StartToEndDate
                      label="Date"
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
                      Label="Amount From"
                      size="small"
                      minLength={15}
                      fullWidth
                      name="AmountFrom"
                      value={
                        form.AmountFrom === 0.0 ||
                        form.AmountFrom === 0 ||
                        form.AmountFrom === null ||
                        form.AmountFrom === undefined
                          ? null
                          : form.AmountFrom
                      }
                      change={ammountFieldHandler}
                    />
                    <FormattedInputs
                      placeholder="To"
                      Label="Amount To"
                      minLength={15}
                      fullWidth
                      size="small"
                      name="AmountTo"
                      value={
                        form.AmountTo === 0.0 ||
                        form.AmountTo === 0 ||
                        form.AmountTo === null ||
                        form.AmountTo === undefined
                          ? null
                          : form.AmountTo
                      }
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
                    // error={
                    //   form.MiSysCustomerCode !== ""
                    //     ? form.MiSysCustomerCode.length >= 6
                    //       ? false
                    //       : true
                    //     : false
                    // }
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
                    textLength={13}
                    minLength={13}
                  />
                </Col>
                <Col lg={6} md={6} sm={24}>


                  <TextField
                    name="NameOfSponsor"
                    value={form.NameOfSponsor}
                    change={fieldsHandler}
                    fullWidth
                    label="Name of Sponsor / Owner"
                    size="small"
                  />
                </Col>
                <Col lg={6} md={6} sm={24}>


                  <SelectBox
                    name="AdvanceClassificationID"
                    value={form.AdvanceClassificationID}
                    change={fieldsHandler}
                    label="Classification of Advance"
                    propertyName={"title"}
                    option={setupForms.ClassificationOfAdvances}
                  />
                </Col>
              </Row>
              {/* Row 03 */}
              <Row gutter={8}>
                <Col lg={8} md={8} sm={24}>


                  <TextField
                    label="WOF Code"
                    name="WOFCode"
                    value={form.WOFCode}
                    change={fieldsHandler}
                    // label={"WOFCode"}
                    size="small"
                    fullWidth />
                </Col>
                <Col lg={6} md={6} sm={24}>


                  <SelectBox
                    option={setupForms.ManagementUnits}
                    name="ManagementUnitID"
                    value={form.ManagementUnitID}
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
                    value={form.WriteOffReason}
                    change={fieldsHandler}
                    label="Reason of Write Off"
                  />
                </Col>
                <Col lg={8} md={8} sm={24} align="left">
                  <label>
                    <b>Charge Off</b>
                  </label>
                  <br />
                  <Radio.Group
                    onChange={fieldsHandler}
                    name="ChargeOfType"
                    value={form.ChargeOfType}
                  >
                    <Radio disabled={enableRadio} value={2}>
                      New Charge-Off
                    </Radio>
                    <Radio disabled={enableRadio} value={3}>
                      Old Charge-Off
                    </Radio>
                  </Radio.Group>
                </Col>
                <Col lg={4} md={4} sm={24}>
                  <Button
                    applyClass="btnMiniPrimary"
                    text="Search"
                    icon={<i className="icon-search icon-size-one"></i>}
                    click={() => setsubmitType(1)}
                    type="submit"
                  />
                </Col>
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
        </>
      </form>
      <Modal
        closeModal={handleCancel1}
        modalState={approvalHistModal}
        width={700}
        modalTitle={<Title level={3}>View Approval History</Title>}
      >
        <Table
          rows={filteredApprovalHistRow && filteredApprovalHistRow}
          columns={viewApprovalColumn}
        />
      </Modal>
      <Modal
  closeModal={handleCancel}
  modalState={isModalVisible1}
  width={700}
  modalTitle={<Title level={3}>In-Active</Title>}
>
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      paddingBottom: "80px",
      paddingLeft: "20px",
      paddingRight: "20px"
    }}>
    <Col lg={24} md={24} sm={24} xs={24}>
      <TextField
        multiline
        rows={6}
        label="Please Enter Reason"
        change={handleDescription}
        value={approvalReason.Reason}
        fullWidth
        required
      />
    </Col>
  </div>
  {btnStatus ? (
    <GroupedButtons data={buttonProps2} />
  ) : (
    <GroupedButtons data={buttonProps} />
  )}
</Modal>
      <Notification setOpen={setOpen} open={open.flag} message={open.message} />
      {setupForms.Loading ? <Loader /> : null}
    </>
  );
};

export default ApprovedCases;
