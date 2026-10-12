import React, { useState } from "react";
import { Grid, Box } from "@material-ui/core";
import { Typography, Space } from "antd";
import {TextField,
        SelectBox,
        Button,
        StartToEndDate,
        Table,
        Modal,
        GridDataView} from "../../../../Components/Elements"
const AuditTrial = () => {
  const { Title } = Typography;
  const [actions, setAction] = useState({
    add: false,
    delete: false,  
    addRole: false,
    modalDelete: false,
  });
  const add = () => {
    showModal();
    setAction({ ...actions, add: !actions.add });
  };
  const modalDelete = () => {
    showModal();
    setAction({ ...actions, modalDelete: !actions.modalDelete });
  };

  const deleteit = () => {
    showModal();
    setAction({ ...actions, delete: !actions.delete });
  };

  const addRole = () => {
    showModal();
    setAction({ ...actions, addRole: !actions.addRole });
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setAction({
      add: false,
      delete: false,
      addRole: false,
      modalDelete: false,
    });
  };
  const columns = [
    {
      title: "Action By",
      dataIndex: "actionBy",
      key: "actionBy",
      align: "center",
      width: "15%",
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text) => <b>{text}</b>,
      align: "center",
      width: "25%",
    },
    {
      title: "Action On",
      dataIndex: "actionOn",
      key: "actionOn",
      width: "15%",
      render: (text) => (
        <>
          <b>{text.date}</b>
          <br />
          <span style={{ color: "#838383", fontSize: ".875em" }}>
            {text.time}
          </span>
        </>
      ),
      align: "center",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      align: "center",
      width: "90%",
      render: (text) => <b>{text}</b>,
    },
    {
      title: "View Details",
      dataIndex: "viewDetail",
      key: "viewDetail",
      width: "20%",
      render: (text) => (
        <Space onClick={showModal}>
          <i className="icon-edit-list icon-size-one beachGreen"></i>
        </Space>
      ),
      align: "center",
    },
  ];

  const rows = [
    {
      key: "1",
      actionBy: "Yasir Ahmed",
      description:
        "Write Off case created for Pakistan Auto Industries – CG7GSW - 0137238",
      actionOn: { date: "01 Jan, 2021", time: "15:00" },
      action: "Write Off case Created",
      viewDetails: "",
    },
    {
      key: "2",
      actionBy: "Faheemuddin Sufi",
      description:
        "Complete Report Searched for Pakistan Auto Industries – CG7GSW - 0137238",
      actionOn: { date: "01 Jan, 2021", time: "15:00" },
      action: "	Complete Report Searched",
      viewDetails: "",
    },
    {
      key: "4",
      actionBy: "Yasir Ahmed",
      description:
        "Write Off case created for Pakistan Auto Industries – CG7GSW - 0137238",
      actionOn: { date: "01 Jan, 2021", time: "15:00" },
      action: "Write Off case Created",
      viewDetails: "",
    },
    {
      key: "5",
      actionBy: "Yasir Ahmed",
      description:
        "Write Off case created for Pakistan Auto Industries – CG7GSW - 0137238",
      actionOn: { date: "01 Jan, 2021", time: "15:00" },
      action: "Write Off case Created",
      viewDetails: "",
    },
    {
      key: "6",
      actionBy: "Yasir Ahmed",
      description:
        "Write Off case created for Pakistan Auto Industries – CG7GSW - 0137238",
      actionOn: { date: "01 Jan, 2021", time: "15:00" },
      action: "Write Off case Created",
      viewDetails: "",
    },
  ];

  const modalColumns = [
    {
      title: "Account #",
      dataIndex: "account",
      key: "account",
      align: "center",
    },
    {
      title: "Field Name",
      dataIndex: "fieldName",
      key: "fieldName",
      align: "center",
    },
    {
      title: "Previous Value",
      dataIndex: "previousValue",
      key: "previousValue",
      align: "center",
    },
    {
      title: "Updated Value",
      dataIndex: "updatedValue",
      key: "updatedValue",
      align: "center",
    },
  ];

  const modalRows = [
    {
      key: "1",
      account: "25257000356503",
      fieldName: "Financial Relief Allowed >> Principal",
      previousValue: "12,000,000",
      updatedValue: "13,500,000",
    },
    {
      key: "2",
      account: "25257000356503",
      fieldName: "Financial Relief Allowed >> Principal",
      previousValue: "12,000,000",
      updatedValue: "13,500,000",
    },
    {
      key: "4",
      account: "25257000356503",
      fieldName: "Financial Relief Allowed >> Principal",
      previousValue: "12,000,000",
      updatedValue: "13,500,000",
    },
    {
      key: "5",
      account: "25257000356503",
      fieldName: "Financial Relief Allowed >> Principal",
      previousValue: "12,000,000",
      updatedValue: "13,500,000",
    },
    {
      key: "6",
      account: "25257000356503",
      fieldName: "Financial Relief Allowed >> Principal",
      previousValue: "12,000,000",
      updatedValue: "13,500,000",
    },
  ];
  return (
    <>
      <Title level={3}>Audit Trial</Title>
      <Grid container spacing={1}>
        <Grid item lg={2} md={2} sm={12}>
          <TextField fullWidth label="WOF Code" size="small" />
        </Grid>
        <Grid item lg={2} md={2} sm={12}>
          <TextField fullWidth label="MISYS Customer Code" size="small" />
        </Grid>
        <Grid item lg={2} md={2} sm={12}>
          <TextField fullWidth label="Borrower NPL Code" size="small" />
        </Grid>
        <Grid item lg={4} md={4} sm={12}>
          <TextField fullWidth label="Action By" size="small" />
        </Grid>
        <Grid item lg={2} md={2} sm={12}>
          <SelectBox label="Select Action" size="small" height="10px!important" />
        </Grid>
        <div style={{ marginTop: "5%" }} />
        <Grid item md={5} lg={5} sm={12}>
          <StartToEndDate label="Action on" width="400px" size="large" />
        </Grid>

        <Grid item md={7} lg={7} sm={12} >
          <Box display="flex">
            <Box width={1.5 / 8}>
              <Button
                applyClass="btnDarkSolid"
                text="Search"
                icon={<i className="icon-search icon-size-one"></i>}
              />
            </Box>
            <div style={{ margin: "0 5px 0 5px" }} />
            <Box width={1 / 8}>
              <Button
                applyClass="btnSecondarySolid"
                text="Reset"
                icon={<i className="icon-reset icon-size-one"></i>}
              />
            </Box>
          </Box>
        </Grid>

        <div style={{ marginTop: "10%" }} />
        <Grid item md={12} lg={12} sm={12}>
          <Table rows={rows} columns={columns} pagination={false}  scroll={{ x: "max-content" }} />
        </Grid>
      </Grid>

      <Modal
        closeModal={handleCancel}
        modalState={isModalVisible}
        width={700}
        modalTitle={<b>Details</b>}
      >
        <GridDataView />

        <Grid container>
          <Grid item md={12} lg={12} sm={12}>
            <Table rows={modalRows} columns={modalColumns} pagination={false} />
          </Grid>
        </Grid>
      </Modal>
    </>
  );
};

export default AuditTrial;
