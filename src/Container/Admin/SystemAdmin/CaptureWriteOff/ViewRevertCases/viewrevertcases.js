import React, { useEffect, useState } from "react";
import { Typography, Tooltip, Row, Col } from "antd";
import {
  FilterBar,
  InputWithBtn,
  Table,
  Button,
  TextField,
  GroupedButtons,
  Loader,
  Modal,
  Notification,
} from "../../../../../Components/Elements";
import {
  ViewAllRevertedCasesForSystemAdmin,
  DeleteWriteOff,
  HideNotification,
} from "../../../../../store/actions/write-off-actions";
import { GetAdvanceClassification } from "../../../../../store/actions/setup-forms-actions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import {
  enableGoBack,
  activeEdit,
} from "../../../../../store/actions/ui-actions";
import { viewApprovalHistory } from "../../../../../store/actions/wof-approvals-actions";
import {
  DateDisplayFormat,
  CommaFormter,
} from "../../../../../Common/Functions/date-formatter";
import {
  GetApprovalReason,
  GetRejectionReason,
} from "../../../../../store/actions/setup-forms-actions";
import { UndoOutlined as Restore, SearchOutlined as Search } from "@ant-design/icons";
const ViewRevertCases = () => {
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
  const { ListOFRevertCases, Message, Success } = writeOffCases;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [filter, setfilter] = useState(5);
  const [SearchTerm, setSearchTerm] = useState("");
  const [wofCustomerMasterID, setwofCustomerMasterID] = useState("");
  const handleCancel = () => setIsModalVisible(false);
  const View = (e, value) => {
    localStorage.setItem("wofCustomerMasterID", JSON.stringify(value));
    const role = JSON.parse(localStorage.getItem("role"));
    console.log("rolerole", role === 2);

    dispatch(enableGoBack());
    if (role === 2) {
      navigate("/Wof/Admin/ViewWriteOff");
    } else {
      navigate("/Wof/DataEntryUser/ViewWriteOff");
    }
  };
  const Edit = (e, value) => {
    localStorage.setItem("parent", "");
    localStorage.setItem("child", "");
    dispatch(activeEdit());
    localStorage.setItem("wofCustomerMasterID", JSON.stringify(value));
    navigate("/Wof/DataEntryUser/EditWriteOffDetails");
  };
  const Delete = (e, value) => {
    setIsModalVisible(true);
    setwofCustomerMasterID(value);
  };
  const buttonProps = {
    primaryButton: {
      text: "Yes",
      icon: <i className="icon-check icon-size-one"></i>,
      endIcon: "",
      class: "btnBorderStyledBeach",
      size: "small",
      disable: false,
      click: () =>
        dispatch(DeleteWriteOff(wofCustomerMasterID, setIsModalVisible)),
    },
    secondaryButton: {
      text: "Cancel",
      icon: <i className="icon-close icon-size-one"></i>,
      endIcon: "",
      class: "btnBorderStyledRed",
      size: "small",
      disable: false,
      click: () => setIsModalVisible(false),
    },
  };
  const GenrateRows = () => {
    let FinalArray = ListOFRevertCases.map((item, index) => {
      return { ...item, key: index };
    });
    setrows(FinalArray);
  };
  const options = [
    { value: 1, title: "Last 30 days" },
    { value: 2, title: "31 to 60 days" },
    { value: 3, title: "61 to 90 days" },
    { value: 4, title: "More than 90 Days" },
    { value: 5, title: "Current Month Cases" },
  ];
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
          <>
            {/* {console.log( record.wofCustomerMasterID)} */}
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
          </>
        );
      },
    },
    // {
    //   title: "Edit",
    //   dataIndex: "edit",
    //   key: "edit",
    //   align: "center",
    //   width: "1%",
    //   render: (text, record) => (
    //     <Tooltip title="Edit" color={"Black"}>
    //       <i
    //         style={{ cursor: "pointer" }}
    //         onClick={(e) => Edit(e, record.wofCustomerMasterID)}
    //         className="icon-edit-list2 icon-size-one beachGreen"
    //       />
    //     </Tooltip>
    //   ),
    // },
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
    //         onClick={(e) => Delete(e, record.wofCustomerMasterID)}
    //         className="icon-trash icon-size-one pdfRed"
    //       ></i>
    //     </Tooltip>
    //   ),
    // },
  ];
  const handleFilter = (value) => {
    setfilter(Number(value));
    dispatch(
      ViewAllRevertedCasesForSystemAdmin(Details.userID, value, SearchTerm)
    );
  };

  const handleSearch = () =>
    dispatch(
      ViewAllRevertedCasesForSystemAdmin(Details.userID, filter, SearchTerm)
    );
  useEffect(() => {
    if (Success) {
      setOpen({
        flag: true,
        message: Message,
      });
      dispatch(HideNotification());
      // dispatch(ViewAllRevertedCasesForSystemAdmin(Details.userID, 5,SearchTerm));
    }
  }, [Success]);
  console.log("ListOFRevertCases", Message, Success);

  useEffect(() => {
    console.log("ListOFRevertCases", Message, Success);
    if (ListOFRevertCases !== undefined) {
      GenrateRows();
    }
  }, [ListOFRevertCases]);

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
  console.log("filteredApprovalHistRow", filteredApprovalHistRow);
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
      // render: (text) => ,
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
      setSearchTerm("");
      GenrateRows();
    }
  };
  useEffect(() => {
    dispatch(ViewAllRevertedCasesForSystemAdmin(Details.userID, 5, ""));
    dispatch(GetAdvanceClassification());
    dispatch(GetRejectionReason());
    dispatch(GetApprovalReason());
  }, []);
  return (
    <>
      <Title level={2}>In-Active Cases</Title>
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
            applyClass="btnDarkSolid"
            size="small"
            click={() => globalSearch(2)}
          />
        </Col>
        <div style={{ marginTop: "5%" }} />
        <Col style={{ marginTop: "2%" }} lg={24} md={24} sm={24}>
          <Table
            rows={rows}
            columns={columns}
            // scroll={{ x: "max-content" }}
          />
        </Col>
      </Row>
      <Modal closeModal={handleCancel} modalState={isModalVisible} width={700}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "40px"
          }}>
          <div className="icon-trash icon-size-two"></div>
          <Title level={3} align="center">
            Are you sure you want to delete this?
          </Title>
        </div>
        <GroupedButtons data={buttonProps} />
      </Modal>
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
      {writeOffCases.Loading ? <Loader /> : null}
    </>
  );
};

export default ViewRevertCases;
