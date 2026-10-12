import React, { useState, useEffect } from "react";
import { Typography, Space, Row, Col } from "antd";
import {
  DownloadOutlined,
  PlusOutlined as AddIcon,
  SearchOutlined as Search,
  EditOutlined as Edit,
  UndoOutlined as Restore,
} from '@ant-design/icons';
import {
  SelectBox,
  Button,
  Table,
  GroupedButtons,
  Modal,
  StartToEndDate,
  TextField,
  Notification,
} from "../../../../Components/Elements";
import { useDispatch, useSelector } from "react-redux";

const UserAudit = () => {
  const { Title, Text } = Typography;
  const dispatch = useDispatch();
  const [open, setOpen] = useState({
    flag: false,
    message: "",
  });
  const [letterStatus, setLetterStatus] = useState([
    "Activated",
    "De-Activated",
    "Closed", 
    "Locked",
    "Un-Locked",
  ]);
  const [State, setState] = useState({
    Id: "",
    ApprovalFlowName: "",
    ApprovalFlowDescription: "",
  });
  //
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleChange = (e) => {
    setState({
      ...State,
      [e.target.name]: e.target.value,
    });
  };

  const columns = [
    {
      title: "Action By",
      dataIndex: "ActionBy",
      key: "ActionBy",
      align: "center",
      width: "20%",
    },
    {
      title: "Action",
      dataIndex: "Action",
      key: "Action",
      align: "center",
      width: "20%",
    },
    {
      title: "Action On",
      dataIndex: "ActionOn",
      key: "ActionOn",
      align: "center",
      width: "15%",
    },
    {
      title: "Description",
      dataIndex: "Description",
      key: "Description",
      align: "center",
      width: "30%",
    },
    {
      title: "View Details",
      dataIndex: "Action",
      key: "Action",
      align: "center",
      width: "15%",
      render: (text, record) => {
        return (
          <div
            onClick={() => showModal()}
            style={{ cursor: "pointer" }}
            className="icon-edit-list icon-size-one beachGreen"
          ></div>
        );
      },
    },
  ];
  //   rows and column for modal starts
  const columnsForModal = [
    {
      title: "Account Number",
      dataIndex: "Fullname",
      key: "Fullname",
      align: "center",
    },
    {
      title: "Field Name",
      dataIndex: "approvalFlowPriority",
      key: "approvalFlowPriority",
      align: "center",
    },
    {
      title: "Previous Value",
      dataIndex: "delete",
      key: "delete",
      align: "center",
    },
    {
      title: "Updated Value",
      dataIndex: "delete",
      key: "delete",
      align: "center",
    },
  ];
  console.log(letterStatus)
  return (
    <>
      <Title level={3}>User Audit</Title>
      <Row gutter={8}>
        <Col lg={6} md={6} sm={24}>
          <TextField
            name={"WofCode"}
            fullWidth
            label="Action on User"
            size="small"
            change={handleChange}
            value={State.ApprovalFlowName}
          />
        </Col>
        <Col lg={6} md={6} sm={24}>
          <SelectBox
            label="Select Action"
            // change={handleUser}
            // option={remainingUserList}
            value={letterStatus}
            propertyName={"Fullname"}
          />
        </Col>
        <Col lg={6} md={6} sm={24}>
          <TextField
            fullWidth
            name={"ActionBy"}
            label="Action By"
            size="small"
            change={handleChange}
            value={State.ApprovalFlowDescription}
          />
        </Col>

        <Col lg={6} md={6} sm={24}>
          <StartToEndDate
            // change={datehandler}
            label={"Action On"}
            width="100%!important"
            size="large"
            // startvalue={form.DateFrom!==null && form.DateFrom!==""? DateDisplayFormat(form.DateFrom):''}
            // endvalue={form.DateTO!==null && form.DateFrom!=="" ?DateDisplayFormat(form.DateTO):''}
            DateRange={true}
          />
        </Col>
        <Col md={24} lg={24} sm={24} align="center">
          <Space>
            <Button
              text="Search"
              icon={<Search />}
              applyClass="btnDarkSolid"
              size="small"
              // click={()=>dispatch(SearchApprovalFlow(State.ApprovalFlowName,State.ApprovalFlowDescription))}
            />
            <Button
              text="Reset"
              icon={<Restore />}
              applyClass="btnDarkSolid"
              size="small"
            />
          </Space>
        </Col>
        <Col style={{ marginTop: "1%" }} lg={24} md={22} sm={24}>
          <Title level={3}>User Status</Title>
        </Col>
        <Col lg={24} md={24} sm={24} align="center">
        <Space>
          <Button
            text="Download User Status"
            icon={<DownloadOutlined/>}
            applyClass="btnDarkSolid"
            size="small" 
            ghost/>
          </Space>
        </Col>
      </Row>
      <Notification setOpen={setOpen} open={open.flag} message={open.message} />
    </>
  );
};

export default UserAudit;
