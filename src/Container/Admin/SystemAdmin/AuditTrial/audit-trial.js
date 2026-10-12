import React, { useState,useEffect } from "react";
import { Typography, Space, Row, Col } from "antd";
import {
  SelectBox,
  Button,
  Table,
  GroupedButtons,
  Modal,
  StartToEndDate,
  TextField,
  Notification
} from "../../../../Components/Elements";
import { useDispatch, useSelector } from "react-redux";

import {
  PlusOutlined as AddIcon,
  SearchOutlined as Search,
  EditOutlined as Edit,
  UndoOutlined as Restore,
} from "@ant-design/icons";

const ApprovalFlow = () => {
  const { Title ,Text} = Typography;
  const dispatch = useDispatch();
  const [open, setOpen] = useState({
    flag: false,
    message: "",
  });
 
  const [State, setState] = useState({
    Id:'',
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
    })
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
  return (
    <>
      <Title level={3}>Audit Trail</Title>
      <Row gutter={8}>
        <Col lg={4} md={4} sm={24}>
          <TextField
            name={"WofCode"}
            fullWidth
            label="Wof Code"
            size="small"
            change={handleChange}
            value={State.ApprovalFlowName}
          />
        </Col>
        <Col lg={4} md={4} sm={24}>
          <TextField
            fullWidth
            name={"MysisCustomerCode"}
            label="Mysis Customer Code"
            size="small"
            change={handleChange}
            value={State.ApprovalFlowDescription}
          />
        </Col>
        <Col lg={4} md={4} sm={24}>
          <TextField
            fullWidth
            name={"BorrowerNPLCode"}
            label="Borrower NPL Code"
            size="small"
            change={handleChange}
            value={State.ApprovalFlowDescription}
          />
        </Col>
        <Col lg={8} md={8} sm={24}>
          <TextField
            fullWidth
            name={"ActionBy"}
            label="Action By"
            size="small"
            change={handleChange}
            value={State.ApprovalFlowDescription}
          />
        </Col>
        <Col lg={4} md={4} sm={24}>
        <SelectBox 
          label="Select Action"
          // change={handleUser}
          // option={remainingUserList}
          // value={updateApprovalFlowForEdit.UserID}
          name="RemainingUser"
          propertyName={"Fullname"}
           />
        </Col>
      
        <Col lg={8} md={8} sm={24}>
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
        <Col lg={4} md={4} sm={24}>
        <Button
          text="Search"
          icon={<Search />}
          applyClass="btnDarkSolid"
          size="small"
          // click={()=>dispatch(SearchApprovalFlow(State.ApprovalFlowName,State.ApprovalFlowDescription))}
        />
        </Col>
        <Col lg={4} md={4} sm={24}>
        <Button
          text="Reset"
          icon={<Restore />}
          applyClass="btnDarkSolid"
          size="small"
        />
        </Col>
        <Col style={{ marginTop: "1%" }} lg={24} md={22} sm={24}>
          <Table rows={[{name:"adssada"}]} columns={columns} scroll={{ x: "max-content" }} />
        </Col>
      </Row>
      <Modal
        modalTitle={<b>Audit Detail</b>}
        closeModal={handleCancel}
        modalState={isModalVisible}
        width={800}
        padding="5"
      >
        {/* this data will be pass to modal when Add Approval btn will be clicked */}
        
        {isModalVisible && (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "10px"
              }}>
              <Row gutter={16} style={{
                width: "calc(100% + 16px)"
              }}>
              <Col style={{ marginTop: "1%",}} lg={12} md={12} sm={24}>
              <Text style={{ width: "25%" ,color:"#025f5c"}}>Action By</Text>
                </Col>
                <Col style={{ marginTop: "1%" }} lg={12} md={12} sm={24}>
              <Text style={{ width: "25%",color:"#025f5c" }}>Action On</Text>
                </Col>
                <Col style={{ marginTop: "1%" }} lg={12} md={12} sm={24}>
              <Text style={{ width: "25%",color:"#025f5c" }}>Description</Text>
                </Col>
             
                <Col style={{ marginTop: "1%" }} lg={24} md={24} sm={24}>
                  <Table
                    rows={[]}
                    columns={columnsForModal}
                    pagination={false}
                    scroll={{ x: "max-content" }}
                  />
                </Col>
              </Row>
            </div>
            <div style={{ marginTop: "25px" }} />
          </>
        )}
      </Modal>
      <Notification setOpen={setOpen} open={open.flag} message={open.message} />
    </>
  );
};

export default ApprovalFlow;
