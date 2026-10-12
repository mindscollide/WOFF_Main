import React, { useState } from "react";
import { Typography, Row, Col } from "antd";
import {roles} from "../../../../../Common/SelectFieldOption/select-field-option"
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
import { PlusOutlined as AddIcon } from "@ant-design/icons";
const AddEditUsers = () => {
  const { Title } = Typography;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [actions, setAction] = useState({
    add: false,
    edit: false,
    status: false,
    update: false,
  });

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setAction({ add: false, edit: false, status: false, update: false });
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
      align: "center",
      width:"50%"
    },
    {
      title: "Role Name",
      dataIndex: "roleName",
      key: "roleName",
      align: "center",
      width:"25%"
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      width:"15%",
      render: (text) => (
        <div
          // style={{ cursor: "pointer" }}
          // onClick={showModal}
          className="icon-check icon-size-one greenTick"
        />
      ),
    },
    {
      title: "Edit",
      dataIndex: "edit",
      key: "edit",
      align: "center",
      width:"10%",
      render: (text) => (
        <div
          style={{ cursor: "pointer" }}
          onClick={edit}
          className="icon-user icon-size-one beachGreen"
        />
      ),
    },
  ];

  const rows = [
    {
      key: "1",
      userName: "User",
      roleName: "Data Entry",
      edit: "",
      status: "",
    },
    {
      key: "2",
      userName: "User",
      roleName: "Manager",
      edit: "",
      status: "",
    },
    {
      key: "3",
      userName: "User",
      roleName: "Audit",
      edit: "",
      status: "",
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

  const editButtonProps = {
    primaryButton: {
      text: "Update",
      icon: <i className="icon-update icon-size-one"></i>,
      endIcon: "",
      class: "btnBorderStyledBeach",
      size: "",
      disable: "",
      click: () => update(),
    },
    secondaryButton: {
      text: "Discard",
      icon: <i className="icon-close icon-size-one"></i>,
      endIcon: "",
      class: "btnBorderStyledRed",
      size: "",
      disable: "",
      click: () => handleCancel(),
    },
  };

  const add = () => {
    showModal();
    setAction({ ...actions, add: !actions.add });
  };

  const edit = () => {
    showModal();
    setAction({ ...actions, edit: !actions.edit });
  };

  const update = () => {
    showModal();
    setAction({ ...actions, update: !actions.update });
  };

  return (
    <>
      <Title level={3}>Add / Edit User</Title>
      <Row gutter={16}>
        <Col md={8} lg={8} sm={24}>
          <SelectBox label="Select User Name" />
        </Col>
        <Col md={8} lg={8} sm={24}>
          <SelectBox label="Select Role" option={roles} />
        </Col>
        <Col md={2} lg={2} sm={24} align="left">
          <Button
            text="Add"
            icon={<AddIcon />}
            applyClass="btnDarkSolid"
            size="large"
            click={add}
          />
        </Col>
        <Col md={24} lg={24} sm={24}>
          <Table rows={rows} columns={columns} scroll={{ x: 'max-content' }}/>
        </Col>
      </Row>

      {/* modal starts here */}
      <Modal
        modalTitle={
          actions.edit && (
            <h3>
              <b>Edit User</b>
            </h3>
          )
        }
        closeModal={handleCancel}
        modalState={isModalVisible}
        width={700}
      >
        {actions.add && (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "40px"
              }}>
              <div className="icon-add-user icon-size-two"></div>
              <Title level={3} align="center">
                Are you sure you want add to user?
              </Title>
            </div>
            <div align="center">
              <Button
                click={handleCancel}
                applyClass="btnBorderStyledBeach"
                text="Proceed"
                endIcon={<i className="icon-proceed icon-size-one"></i>}
              />
            </div>
          </>
        )}
        {actions.edit && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              padding: "40px"
            }}>
            <TextField
              focus
              disable
              label="User Name"
              fullWidth
              value="Shahroz Ahmed"
            />
            <div style={{ marginTop: "3%" }} />
            <Row gutter={16}>
              <Col md={12} lg={12} sm={12}>
                <SelectBox label="Select Role" option={roles}/>
              </Col>

              <Col md={12} lg={12} sm={12}>
                <div style={{ marginTop: "10px" }} />
                <Checkbox label="is Active" />
              </Col>
            </Row>
            <div style={{ marginTop: "7%" }} />
            <GroupedButtons data={editButtonProps} />
          </div>
        )}
      </Modal>
      {/* a separate modal fo edit user prompt */}
      {actions.update && (
        <>
          <Modal
            closeModal={handleCancel}
            modalState={isModalVisible}
            width={700}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "40px"
              }}>
              <div className="icon-update-user icon-size-two"></div>
              <Title level={3} align="center">
                Are you sure you want update to user?
              </Title>
            </div>
            <div align="center">
              <Button
                click={handleCancel}
                applyClass="btnBorderStyledBeach"
                text="Proceed"
                endIcon={<i className="icon-proceed icon-size-one"></i>}
              />
            </div>
          </Modal>
        </>
      )}
    </>
  );
};

export default AddEditUsers;
