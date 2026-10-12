import React, { useState,useEffect } from "react";
import { Typography, Space, Row, Col } from "antd";
import {
  CheckBox,
  SelectBox,
  Button,
  Table,
  GroupedButtons,
  Modal,
  StartToEndDate,
  TextField,
  Notification
} from "../../../Components/Elements";
import { useDispatch, useSelector } from "react-redux";

import {
  PlusOutlined as AddIcon,
  SearchOutlined as Search,
  EditOutlined as Edit,
  UndoOutlined as Restore,
} from "@ant-design/icons";

const UserDetail = () => {
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
        <SelectBox 
          label="Select Action"
          // change={handleUser}
          // option={remainingUserList}
          // value={updateApprovalFlowForEdit.UserID}
          name="RemainingUser"
          propertyName={"Fullname"}
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
      <Notification setOpen={setOpen} open={open.flag} message={open.message} />
    </>
  );
};

export default UserDetail;
