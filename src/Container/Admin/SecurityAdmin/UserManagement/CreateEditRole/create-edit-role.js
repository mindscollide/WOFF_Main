import React, { useState } from "react";
import { Input, Typography, Space, Row, Col } from "antd";
import CheckBoxesList from "../../../../../Components/Admin/SecurityAdmin/UserManagement/checkbox-list";
import {Paper,
  FilterBar,
  InputWithBtn,
  TextField,
  Table,
  SelectBox,
  DatePicker,
  Button,
  GroupedButtons,
  Modal,
  Checkbox,
  FancyBox} from "../../../../../Components/Elements"
const CreateEditRoles = () => {
  const { Title } = Typography;

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const [showUrduContent, setShowUrduContent] = useState(false);

  const checkBoxHandler = () => {
    setShowUrduContent(!showUrduContent);
  };

  const columns = [
    {
      title: "Role Name",
      dataIndex: "roleName",
      key: "roleName",
      render: (text) => <p style={{ fontWeight: "bold" }}>{text}</p>,
      align: "left",
    },
    {
      title: "Edit",
      dataIndex: "edit",
      key: "edit",
      align: "center",
      render: (text) => (
        <div
          style={{ cursor: "pointer" }}
          onClick={showModal}
          className="icon-edit-list2 icon-size-one beachGreen"
        ></div>
      ),
    },
    {
      title: "Delete",
      dataIndex: "delete",
      key: "delete",
      align: "center",
      render: (text) => (
        <div
          style={{ cursor: "pointer" }}
          onClick={showModal}
          className="icon-trash icon-size-one pdfRed"
        ></div>
      ),
    },
  ];

  const rows = [
    {
      key: "1",
      roleName: "Data Entry",
      edit: "",
      delete: "",
    },
    {
      key: "2",
      roleName: "Manager",
      edit: "",
      delete: "",
    },
    {
      key: "3",
      roleName: "Audit",
      edit: "",
      delete: "",
    },
  ];

  // props to pass for grouped button bar
  const buttonProps = {
    primaryButton: {
      text: "Yes",
      icon: <i className="icon-check icon-size-one"></i>,
      endIcon: "",
      class: "btnBorderStyledBeach",
      size: "",
      disable: "",
      click: () => null,
    },
    secondaryButton: {
      text: "Cancle",
      icon: <i className="icon-close icon-size-one"></i>,
      endIcon: "",
      class: "btnBorderStyledRed",
      size: "",
      disable: "",
      click: () => null,
    },
  };

  return (
    <>
      <Title level={3}>Create / Edit Role</Title>
      <Row gutter={16}>
        <Col md={8} lg={8} sm={24}>
          <InputWithBtn
            label="Enter Role Name"
            fullWidth
            helperText="please fill"
            textFieldSize="small"
            btnSize="medium"
            applyClass="uploadButton"
            icon= {<i className="icon-save icon-size-one"></i>}
            text="Save"
            required
          />
          <Paper variant height="450px" padding="4" mt="3">
            <CheckBoxesList />
          </Paper>
        </Col>
        <Col md={16} lg={16} sm={24}>
          <Paper variant height="500px" padding="3">
            <Title level={5}>Edit Role</Title>
            <Table columns={columns} rows={rows} />
          </Paper>
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
    </>
  );
};

export default CreateEditRoles;
