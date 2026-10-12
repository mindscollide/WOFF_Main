import React, { useEffect, useState } from "react";
import { Grid, Box } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import {
  getApprovals,
  saveApprovals,
  viewApprovalHistory,
  HideNotification,
  ShowNotification,
} from "../../../store/actions/wof-approvals-actions";
import { enableGoBack } from "../../../store/actions/ui-actions";
import {
  GetApprovalReason,
  GetRejectionReason,
} from "../../../store/actions/setup-forms-actions";
import { Typography, Tooltip, Input, Space } from "antd";
import {
  TextField,
  InputWithBtn,
  Table,
  GroupedButtons,
  Modal,
  Button,
  SelectBox,
  FilterBar,
  Notification,
} from "../../../Components/Elements";
import { Link, useHistory } from "react-router-dom";
import {
  DateDisplayFormat,
  CommaFormter,
} from "../../../Common/Functions/date-formatter";
import { GetAdvanceClassification } from "../../../store/actions/setup-forms-actions";
import Restore from "@material-ui/icons/Restore";
import Search from "@material-ui/icons/Search";
const PendingApprovals = () => {
  const history = useHistory();
  const [SearchTerm, setSearchTerm] = useState("");
  const Details = JSON.parse(localStorage.getItem("UserDetails"));
  const state = useSelector((state) => state);
  const { wofApprovals, setupForms } = state;
  const [filter, setfilter] = useState(5);
  const approvalHistoryFromStore = wofApprovals.viewApprovalHistory;
  const [ApprovalHistory, setviewApprovalHistory] = useState([]);
  const dispatch = useDispatch();
  const { Title } = Typography;
  //states
  const [open, setOpen] = useState({
    open: false,
    message: "",
  });
  const [btnStatus, setBtnStatus] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [rows, setrows] = useState([]);
  const [selectedReason, setselectedReason] = useState({ Id: "", Reason: "" });
  const [modalConfig, setModalConfig] = useState({
    actions: false,
    approvalHist: false,
  });
  const [State, setstate] = useState({
    WOFCustomerMasterID: "",
    WOFStatus: "",
    ApprovalRejectionReasonID: "",
    UserID: Details.userID,
    Description: "",
  });
  const WofStatus = {
    Pending: 1,
    Approved: 2,
    Rejected: 3,
  };

  const [filteredApprovalHistRow, setFilteredApprovalHistRow] = useState([]);
  const [reason, setReason] = useState([]);
  //handlers
  const showModal = (
    e,
    WOFCustomerMasterID,
    wofStatus,
    Description,
    whichModal
  ) => {
    console.log(whichModal);
    if (whichModal.actions) {
      setModalConfig({
        actions: true,
        approvalHist: false,
      });
    } else if (whichModal.approvalHist) {
      setModalConfig({
        actions: false,
        approvalHist: true,
      });
    }
    setstate({
      ...State,
      WOFCustomerMasterID: WOFCustomerMasterID,
      WOFStatus: wofStatus,
      Description: Description,
    });
    setselectedReason({ ...selectedReason, Reason: "" });
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
    setModalConfig({
      actions: false,
      approvalHist: false,
    });
    setBtnStatus(true);
  };
  const handleDescription = (e) => {
    setstate({
      ...State,
      Description: e.target.value,
    });
  };
  const handleReasons = (e, reason) => {
    if (reason) {
      setstate({
        ...State,
        ApprovalRejectionReasonID: reason.id,
      });
      setselectedReason({ ...selectedReason, Reason: reason.title });
    }
  };
  const handleProceed = () => {
    if (State.ApprovalRejectionReasonID !== "" && State.Description !== "") {
      handleCancel();
      dispatch(saveApprovals(State));
      if (wofApprovals.Message === "Record saved") {
        setOpen({
          ...open,
          open: true,
          message: wofApprovals.Message,
        });
      }
      setBtnStatus(true);
    } else {
      setOpen({
        ...open,
        open: true,
        message: "Please Enter All Fields",
      });
    }
  };

  const setOpenHandler = () => {
    setOpen(false);
  };
  const setReasons = (Array) => {
    setReason(Array);
  };
  const View = (e, value) => {
    localStorage.setItem("wofCustomerMasterID", JSON.stringify(value));
    dispatch(enableGoBack());
    history.push("/Wof/Manager/ViewWriteOff");
  };
  const buttonProps = {
    primaryButton: {
      text: "Proceed",
      icon: <i className="icon-check icon-size-one"></i>,
      endIcon: "",
      class: "btnBorderStyledBeach",
      click: () => handleProceed(),
      disable: btnStatus,
    },
    secondaryButton: {
      text: "Discard",
      icon: <i className="icon-close icon-size-one"></i>,
      endIcon: "",
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
      width: "10%",
    },
    {
      title: "Wof Code",
      dataIndex: "wofCode",
      key: "wofCode",
      align: "center",
      width: "10%",
      render: (text, record, index) => (
        <Tooltip placement="left" title="View">
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
      title: "Company Name",
      dataIndex: "name",
      key: "name",
      align: "center",
      width: "10%",
    },

    {
      title: "Classification Of Advances",
      dataIndex: "advanceClassificationID",
      key: "advanceClassificationID",
      align: "center",
      width: "10%",
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
      title: "FRA Principal",
      dataIndex: "fraPrincipal",
      key: "fraPrincipal",
      align: "center",
      width: "10%",
      render: (text) => CommaFormter(text),
    },
    {
      title: "FRA Total",
      dataIndex: "fraTotal",
      key: "fraTotal",
      align: "center",
      width: "10%",
      render: (text) => CommaFormter(text),
    },
    {
      title: "Date of Write-off",
      dataIndex: "dateOfWriteoff",
      key: "dateOfWriteoff",
      align: "center",
      width: "10%",
      render: (text) => DateDisplayFormat(text),
    },
    {
      title: "Created By",
      dataIndex: "createdByUser",
      key: "createdByUser",
      align: "center",
      width: "10%",
    },
    {
      title: "View Approval History",
      dataIndex: "ViewApprovalHistory",
      key: "ViewApprovalHistory",
      align: "center",
      width: "10%",
      render: (text, rec) => {
        return (
          <div
            onClick={(e) => {
              dispatch(
                viewApprovalHistory(
                  Number(rec.wofCustomerMasterID),
                  setviewApprovalHistory
                )
              );
              showModal(e, null, null, null, {
                actions: false,
                approvalHist: true,
              });
            }}
            style={{ cursor: "pointer" }}
            className="icon-edit-list icon-size-one beachGreen"
          ></div>
        );
      },
    },
    {
      title: "Accept / Reject",
      dataIndex: "Accept/Reject",
      key: "Accept/Reject",
      align: "center",
      width: "10%",
      render: (text, record, index) => {
        return (
          <div
          // style={{
          //   display: "flex",
          //   flexDirection: "column"
          // }}
          >
            <i
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                setReasons(setupForms.ApprovalReasons);
                showModal(
                  e,
                  record.wofCustomerMasterID,
                  WofStatus.Approved,
                  "Approved",
                  {
                    actions: true,
                    approvalHist: false,
                  }
                );
              }}
              className="icon-check icon-size-one greenTick"
            />
            <i
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                setReasons(setupForms.RejectionReasons);
                showModal(
                  e,
                  record.wofCustomerMasterID,
                  WofStatus.Rejected,
                  "Rejected",
                  {
                    actions: true,
                    approvalHist: false,
                  }
                );
              }}
              className="icon-close icon-size-one crosstick"
            />
          </div>
        );
      },
    },
  ];
  const handleFilter = (value) => {
    setfilter(Number(value));
    dispatch(getApprovals(Details.userID, SearchTerm, value));
  };
  const viewApprovalColumn = [
    {
      title: "Date",
      dataIndex: "dateOfApproval",
      key: "dateOfApproval",
      align: "center",
      render: (text) => DateDisplayFormat(text),
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
  const globalSearch = (action) => {
    if (SearchTerm !== "" && action == 1) {
      let filteredData = rows.filter((value) => {
        return (
          value.miSysCode.toLowerCase().includes(SearchTerm.toLowerCase()) ||
          value.wofCode.toLowerCase().includes(SearchTerm.toLowerCase()) ||
          value.dateOfWriteoff
            .toString()
            .toLowerCase()
            .includes(SearchTerm.toLowerCase()) ||
          value.fraPrincipal
            .toString()
            .toLowerCase()
            .includes(SearchTerm.toLowerCase()) ||
          value.fraTotal
            .toString()
            .toLowerCase()
            .includes(SearchTerm.toLowerCase()) ||
          value.name
            .toString()
            .toLowerCase()
            .includes(SearchTerm.toLowerCase()) ||
          value.principal
            .toString()
            .toLowerCase()
            .includes(SearchTerm.toLowerCase()) ||
          value.sanctionAmount
            .toString()
            .toLowerCase()
            .includes(SearchTerm.toLowerCase())
        );
      });
      setrows(filteredData);
    } else {
      setrows(wofApprovals.Approvals);
    }
  };

  // code for converting api
  useEffect(() => {
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
          console.log(index, index2);
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
          // item.approvalRejectionReasonID = setupForms.RejectionReasons[index].title;
          item.wofStatus = "In-Active";
        }
        if (item.wofStatus == 1 && item.approvalRejectionReasonID === 0) {
          item.approvalRejectionReasonID = "";
          item.wofStatus = "Pending";
        }
        return item;
      });
    console.log("setFilteredApprovalHistRow", ApprovalHistory, data);
    console.log("setFilteredApprovalHistRow", typeof ApprovalHistory);
    console.log("setFilteredApprovalHistRow", typeof data);
    setFilteredApprovalHistRow(data);
  }, [ApprovalHistory]);
  useEffect(() => {
    dispatch(GetApprovalReason());
    dispatch(GetRejectionReason());
    dispatch(GetAdvanceClassification());
    if (Details.userID) {
      dispatch(getApprovals(Details.userID, "", filter));
    }
  }, []);
  useEffect(() => {
    if (selectedReason.Reason != "" && State.Description != "") {
      console.log("check");
      setBtnStatus(false);
    } else {
      console.log("check");
      setBtnStatus(true);
    }
  }, [selectedReason.Reason, State.Description]);
  console.log("check", btnStatus);
  useEffect(() => {
    if (wofApprovals.isSuccess) {
      setstate({
        ...State,
        WOFCustomerMasterID: "",
        WOFStatus: "",
        ApprovalRejectionReasonID: "",
        UserID: Details.userID,
        Description: "",
      });
      // setOpen({
      //   flag: true,
      //   message: wofApprovals.message,
      // });
      dispatch(getApprovals(Details.userID, SearchTerm, filter));
      dispatch(HideNotification());
    }
  }, [wofApprovals.isSuccess]);
  const options = [
    { value: 1, title: "Last 30 days" },
    { value: 2, title: "31 to 60 days" },
    { value: 3, title: "61 to 90 days" },
    { value: 4, title: "More than 90 Days" },
    { value: 5, title: "Current Month Cases" },
  ];
  useEffect(() => {
    if (wofApprovals.Approvals) {
      setrows(wofApprovals.Approvals);
    }
  }, [wofApprovals.Approvals]);
  return (
    <>
      {/* >>>>>>>>>>>>>>>>>>>Row 01<<<<<<<<<<<<<<<<<<<<< */}
      <Notification setOpen={setOpen} open={open.open} message={open.message} />
      <Title level={2}>Pending Approvals</Title>
      <Grid container spacing={2}>
        {/* 1.1 */}
        <Grid item lg={3} md={3} sm={12} xs={12}>
          <FilterBar
            Options={options}
            change={handleFilter}
            placeholder={"Filter by Duration"}
            defaultValue={options[4].title}
          />
        </Grid>
        <Grid item lg={5} md={5} sm={12} xs={12}>
          <TextField
            fullWidth
            label="Search"
            size="small"
            value={SearchTerm}
            change={(e) => setSearchTerm(e.target.value)}
          />
        </Grid>
        <Grid item lg={2} md={2} sm={12}>
          <Button
            text="Search"
            icon={<Search />}
            applyClass="btnDarkSolid"
            size="small"
            click={() => globalSearch(1)}
          />
        </Grid>
        <Grid item lg={2} md={2} sm={12}>
          <Button
            text="Reset"
            icon={<Restore />}
            applyClass="btnSecondarySolid1"
            size="small"
            click={() => globalSearch(2)}
          />
        </Grid>
        <div style={{ marginTop: "5%" }} />
        {/* Row 04 */}
        <Grid item style={{ marginTop: "2%" }} lg={12} md={12} sm={12}>
          <Table
            id={"table-to-xls"}
            rows={rows}
            columns={columns}
            scroll={{ x: "max-content" }}
          />
        </Grid>
      </Grid>

      <Modal
        closeModal={handleCancel}
        modalState={modalConfig.actions}
        width={700}
        modalTitle={<Title level={3}>Accept/Reject</Title>}
      >
        <Box
          display="flex"
          justifyContent="center"
          style={{
            paddingBottom: "40px",
            paddingLeft: "20px",
            paddingRight: "20px",
          }}
        >
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <SelectBox
              option={reason}
              propertyName={"title"}
              change={handleReasons}
              label="Select Reason"
              required
              value={selectedReason.Reason}
              name="Select Reason"
            />
          </Grid>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          style={{
            paddingBottom: "80px",
            paddingLeft: "20px",
            paddingRight: "20px",
          }}
        >
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <TextField
              multiline
              rows={6}
              label="Description"
              change={handleDescription}
              value={State.Description}
              fullWidth
              required
            />
          </Grid>
        </Box>
        <GroupedButtons data={buttonProps} />
      </Modal>

      {/* modal for approvals history */}
      <Modal
        closeModal={handleCancel}
        modalState={modalConfig.approvalHist}
        width={700}
        modalTitle={<Title level={3}>View Approval History</Title>}
      >
        <Table
          rows={filteredApprovalHistRow && filteredApprovalHistRow}
          columns={viewApprovalColumn}
        />
      </Modal>
    </>
  );
};

export default PendingApprovals;
