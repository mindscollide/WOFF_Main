import React, { useEffect, useState } from "react";
import { Typography, Tooltip, Row, Col } from "antd";
import {
  FilterBar,
  InputWithBtn,
  Table,
  GroupedButtons,
  Button,
  TextField,
  Modal,
  Notification,
} from "../../../../Components/Elements";
import {
  DeleteWriteOff,
  HideNotification,
  ListOfPendingAndApprovedCases,
} from "../../../../store/actions/write-off-actions";
import { GetAdvanceClassification } from "../../../../store/actions/setup-forms-actions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
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
import { UndoOutlined as Restore, SearchOutlined as Search } from "@ant-design/icons";
const ListOffWriteOff = () => {
  const navigate = useNavigate();
  const { Title } = Typography;
  const writeOffCases = useSelector((state) => state.writeOffCases);
  const setupForms = useSelector((state) => state.setupForms);
  const wofApprovals = useSelector((state) => state.wofApprovals);
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
    dispatch(enableGoBack());
    navigate("/Wof/DataEntryUser/ViewWriteOff");
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
      ListOfPendingAndApprovedCases(Details.userID, SearchTerm, 2, filter)
    );
  useEffect(() => {
    if (Success) {
      setOpen({
        flag: true,
        message: Message,
      });
      dispatch(HideNotification());
      dispatch(
        ListOfPendingAndApprovedCases(Details.userID, SearchTerm, 2, filter)
      );
    }
  }, [Success]);

  useEffect(() => {
    GenrateRows();
  }, [ListOFPendingAndApprovedCases]);
  console.log(rows);
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
      setSearchTerm("");
      GenrateRows();
    }
  };
  const [approvalHistModal, setApprovalHistModal] = useState(false);
  const [isModalVisible1, setIsModalVisible1] = useState(false);
  const [filteredApprovalHistRow, setFilteredApprovalHistRow] = useState([]);
  const handleCancel1 = () => {
    setIsModalVisible1(false);
    setApprovalHistModal((prev) => !prev);
  };
  // code for converting api
  useEffect(() => {
    console.log("filteredApprovalHistRow", setupForms.ApprovalReasons);
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
    dispatch(
      ListOfPendingAndApprovedCases(Details.userID, SearchTerm, 2, filter)
    );
  };
  useEffect(() => {
    dispatch(ListOfPendingAndApprovedCases(Details.userID, "", 2, filter));
    dispatch(GetAdvanceClassification());
    dispatch(GetRejectionReason());
    dispatch(GetApprovalReason());
  }, []);
  return (
    <>
      <Title level={2}>Pending Cases</Title>
      <Row gutter={16}>
        <Col lg={6} md={6} sm={24} xs={24}>
          <FilterBar
            Options={options}
            change={handleFilter}
            placeholder={"Filter by Duration"}
            defaultValue={options[4].title}
          />
        </Col>
        <Col lg={10} md={10} sm={24} xs={24}>
          <TextField
            fullWidth
            label="Search"
            size="small"
            value={SearchTerm}
            change={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
        <Col lg={4} md={4} sm={24}>
          <Button
            text="Search"
            icon={<Search />}
            applyClass="btnDarkSolid"
            size="small"
            click={() => globalSearch(1)}
          />
        </Col>
        <Col lg={4} md={4} sm={24}>
          <Button
            text="Reset"
            icon={<Restore />}
            applyClass="btnSecondarySolidResetFull"
            size="small"
            click={() => globalSearch(2)}
          />
        </Col>
        <div style={{ marginTop: "5%" }} />
        <Col style={{ marginTop: "2%" }} lg={24} md={24} sm={24}>
          <Table rows={rows} columns={columns} scroll={{ x: "max-content" }} />
        </Col>
      </Row>
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
