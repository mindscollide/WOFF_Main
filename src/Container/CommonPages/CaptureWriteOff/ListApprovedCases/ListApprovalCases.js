import React, { useEffect, useState } from "react";
import { Grid, Box } from "@material-ui/core";
import { Typography, Tooltip } from "antd";
import {
  FilterBar,
  InputWithBtn,
  Table,
  Modal,
  Button,
  TextField,
  Notification,
} from "../../../../Components/Elements";
import {
  HideNotification,
  ListOfPendingAndApprovedCases,
  ListAllApprovedCases,
} from "../../../../store/actions/write-off-actions";
import { GetAdvanceClassification } from "../../../../store/actions/setup-forms-actions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { enableGoBack } from "../../../../store/actions/ui-actions";
import { viewApprovalHistory } from "../../../../store/actions/wof-approvals-actions";
import {
  DateDisplayFormat,
  CommaFormter,
} from "../../../../Common/Functions/date-formatter";
import {
  GetApprovalReason,
  GetRejectionReason,
} from "../../../../store/actions/setup-forms-actions";
import Restore from "@material-ui/icons/Restore";
import Search from "@material-ui/icons/Search";
const ListOffWriteOff = () => {
  const history = useHistory();
  const { Title } = Typography;
  const state = useSelector((state) => state);
  const { writeOffCases, setupForms, wofApprovals } = state;
  const [ApprovalHistory, setviewApprovalHistory] = useState([]);
  const [open, setOpen] = useState({
    flag: false,
    message: "",
  });
  const [rows, setrows] = useState([]);
  const Details = JSON.parse(localStorage.getItem("UserDetails"));
  const dispatch = useDispatch();
  const { Message, Success, ListOFPendingAndApprovedCases } = writeOffCases;
  const [filter, setfilter] = useState(5);
  const [SearchTerm, setSearchTerm] = useState("");
  const View = (e, value) => {
    localStorage.setItem("wofCustomerMasterID", JSON.stringify(value));
    let role = JSON.parse(localStorage.getItem("role"));
    dispatch(enableGoBack());
    if (role === 3) {
      history.push("/Wof/Manager/ViewWriteOff");
    } else if (role === 4) {
      history.push("/Wof/DataEntryUser/ViewWriteOff");
    }
  };
  const globalSearch = (action) => {
    if (SearchTerm !== "" && action == 1) {
      let filteredData = rows.filter((value) => {
        let data = 0;
        try {
          if (setupForms.ClassificationOfAdvances.length > 0) {
            data =
              setupForms.ClassificationOfAdvances[
                setupForms.ClassificationOfAdvances.findIndex(
                  (x) => x.title.toLowerCase() === SearchTerm.toLowerCase()
                )
              ].id;
          }
        } catch (error) {
          // ...
        }

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
          value.advanceClassificationID === data ||
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
      setSearchTerm("");
      GenrateRows();
    }
  };
  const GenrateRows = () => {
    if (ListOFPendingAndApprovedCases !== undefined) {
      let FinalArray = ListOFPendingAndApprovedCases.map((item, index) => {
        return { ...item, key: index };
      });
      setrows(FinalArray);
    } else {
      setrows([]);
    }
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
      title: "FRA Principal",
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
      title: "Created By",
      dataIndex: "createdByUser",
      key: "createdByUser",
      align: "center",
      width: "5%",
      render: (text) => CommaFormter(text),
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
  ];
  const column = [
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
      title: "FRA Principal",
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
  ];
  const handleSearch = () =>
    dispatch(
      ListOfPendingAndApprovedCases(Details.userID, SearchTerm, 1, filter)
    );

  const [approvalHistModal, setApprovalHistModal] = useState(false);
  const [isModalVisible1, setIsModalVisible1] = useState(false);
  const [filteredApprovalHistRow, setFilteredApprovalHistRow] = useState([]);
  const handleCancel1 = () => {
    setIsModalVisible1(false);
    setApprovalHistModal((prev) => !prev);
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
  const showModal = () => {
    setApprovalHistModal((prev) => !prev);
    setIsModalVisible1(true);
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
  const options = [
    { value: 1, title: "Last 30 days" },
    { value: 2, title: "31 to 60 days" },
    { value: 3, title: "61 to 90 days" },
    { value: 4, title: "More than 90 Days" },
    { value: 5, title: "Current Month Cases" },
  ];
  const handleFilter = (value) => {
    setfilter(Number(value));
    if (Details.roleID === 3) {
      dispatch(ListAllApprovedCases(Details.roleID, SearchTerm, value));
    } else {
      dispatch(
        ListOfPendingAndApprovedCases(Details.userID, SearchTerm, 1, value)
      );
    }
  };
  console.log("filter", filter);
  useEffect(() => {
    if (Details.roleID === 3) {
      dispatch(ListAllApprovedCases(Details.roleID, "", filter));
    } else {
      dispatch(ListOfPendingAndApprovedCases(Details.userID, "", 1, filter));
    }
    dispatch(GetAdvanceClassification());
    dispatch(GetRejectionReason());
    dispatch(GetApprovalReason());
  }, []);
  useEffect(() => {
    if (Success) {
      setOpen({
        flag: true,
        message: Message,
      });
      dispatch(HideNotification());
      if (Details.roleID === 3) {
        dispatch(ListAllApprovedCases(Details.roleID, SearchTerm, filter));
      } else {
        dispatch(
          ListOfPendingAndApprovedCases(Details.userID, SearchTerm, 1, filter)
        );
      }
    }
  }, [Success]);

  useEffect(() => {
    GenrateRows();
  }, [ListOFPendingAndApprovedCases]);
  return (
    <>
      <Title level={2}>Approved Cases</Title>
      <Grid container spacing={2}>
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
        <Grid item style={{ marginTop: "2%" }} lg={12} md={12} sm={12}>
          {Details.roleID === 3 ? (
            <Table
              rows={rows}
              columns={columns}
              scroll={{ x: "max-content" }}
            />
          ) : (
            <Table rows={rows} columns={column} scroll={{ x: "max-content" }} />
          )}
        </Grid>
      </Grid>
      {/* modal for approvals history */}
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
      <Notification setOpen={setOpen} open={open.flag} message={open.message} />
    </>
  );
};

export default ListOffWriteOff;
