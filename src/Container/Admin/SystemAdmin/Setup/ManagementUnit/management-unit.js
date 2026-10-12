import React, { useState, useEffect } from "react";
import { Grid, Box } from "@material-ui/core";
import { Typography } from "antd";
import AddIcon from "@material-ui/icons/Add";
import Search from "@material-ui/icons/Search";
import Edit from "@material-ui/icons/Edit";
import Restore from "@material-ui/icons/Restore";
import {
  Button,
  Table,
  GroupedButtons,
  Modal,
  TextField,
  Notification,
} from "../../../../../Components/Elements";
import { useDispatch, useSelector } from "react-redux";
import {
  GetManagementUnit,
  AddManagementUnit,
  EditManagementUnit,
  DeleteManagementUnit,
  HideNotification,
  SearchManagementUnit,
} from "../../../../../store/actions/setup-forms-actions";
const ManagementUnit = () => {
  const { Title } = Typography;
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { setupForms } = state;
  const [actions, setAction] = useState({
    add: false,
    update: false,
    delete: false,
  });
  const [open, setOpen] = useState({
    flag: false,
    message: "",
  });
  const [managementUnit, setmanagementUnit] = useState({
    ID: null,
    WOFStatus: 4,
    Title: "",
  });
  const add = () => {
    if (managementUnit.Title !== "") {
      showModal();
      setAction({ ...actions, add: true, update: false, delete: false });
    } else {
      setOpen({
        flag: true,
        message: "Please Enter Business Segment",
      });
    }
  };
  const deleteit = (e, record) => {
    setmanagementUnit({
      ...managementUnit,
      Title: record.title,
      ID: record.id,
    });
    console.log(record);
    showModal();
    setAction({ ...actions, delete: true, update: false, add: false });
  };
  const update = (e, record) => {
    setmanagementUnit({
      ...managementUnit,
      Title: record.title,
      // WOFStatus:record.wofStatus,
      ID: record.id,
    });
    console.log(record);
    setAction({ ...actions, update: true, add: false, delete: false });
  };
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
    setAction({ add: false, delete: false, update: false });
    setmanagementUnit({
      Title: "",
      ID: 0,
    });
  };
  const handleDelete = () => {
    dispatch(
      DeleteManagementUnit(managementUnit, setmanagementUnit, setIsModalVisible)
    );
    setmanagementUnit({
      Title: "",
      ID: 0,
    });
  };
  
  const handleAdd = () => {
    console.log("managementUnit",managementUnit)
    dispatch(AddManagementUnit(managementUnit, setIsModalVisible))
    setmanagementUnit({
      Title: "",
      ID: 0,
    });
  };
    
  const columns = [
    {
      title: "Business Segment",
      dataIndex: "title",
      key: "title",
      align: "center",
      width: "60%",
    },

    {
      title: "Edit",
      dataIndex: "edit",
      key: "edit",
      align: "center",
      width: "20%",
      render: (text, record) => (
        <div
          style={{ cursor: "pointer" }}
          onClick={(e) => update(e, record)}
          className="icon-edit icon-size-one beachGreen"
        />
      ),
    },

    {
      title: "Delete",
      dataIndex: "delete",
      key: "delete",
      align: "center",
      width: "20%",
      render: (text, record) => (
        <div
          style={{ cursor: "pointer" }}
          onClick={(e) => deleteit(e, record)}
          className="icon-trash icon-size-one pdfRed"
        />
      ),
    },
  ];
  // props to pass for grouped button bar
  const buttonProps = {
    primaryButton: {
      text: "Yes",
      icon: <i className="icon-check icon-size-one"></i>,
      endIcon: "",
      class: "btnBorderStyledBeach",
      click: () => handleDelete(),
    },
    secondaryButton: {
      text: "Cancle",
      icon: <i className="icon-close icon-size-one"></i>,
      endIcon: "",
      class: "btnBorderStyledRed",
      click: () => handleCancel(),
    },
  };

  const addButtonProps = {
    primaryButton: {
      text: "Proceed",
      icon: null,
      endIcon: <i className="icon-proceed icon-size-one"></i>,
      class: "btnBorderStyledBeach",
      click: () =>handleAdd(),
    },
    secondaryButton: {
      text: "Discard",
      icon: <i className="icon-close icon-size-one"></i>,
      endIcon: "",
      class: "btnBorderStyledRed",
      click: () => handleCancel(),
    },
  };
  const handleChange = (e) => {
    if (e.target.value == "") {
      setAction({ ...actions, update: false });
    }
    setmanagementUnit({
      ...managementUnit,
      Title: e.target.value,
    });
  };
  useEffect(() => {
    dispatch(GetManagementUnit());
  }, []);
  useEffect(() => {
    if (setupForms.ShowNotification) {
      setOpen({
        flag: true,
        message: setupForms.Message,
      });
      dispatch(HideNotification());
      dispatch(GetManagementUnit());
    }
  }, [setupForms.ShowNotification]);
  return (
    <>
      <Title level={3}>Business Segment</Title>
      <Grid container spacing={1}>
        <Grid item lg={6} md={6} sm={12}>
          <TextField
            fullWidth
            label="Enter Business Segment"
            size="small"
            required
            value={managementUnit.Title}
            change={handleChange}
          />
        </Grid>
        <Grid item lg={2} md={2} sm={12}>
          <Button
            text="Search"
            icon={<Search />}
            applyClass="btnDarkSolid"
            size="small"
            click={() => dispatch(SearchManagementUnit(managementUnit.Title))}
          />
        </Grid>
        <Grid item lg={2} md={2} sm={12}>
          <Button
            text="Reset"
            icon={<Restore />}
            applyClass="btnDarkSolid"
            size="small"
            click={() => {
              setmanagementUnit({
                ...managementUnit,
                Title: "",
              });
              setAction({
                ...actions,
                add: false,
                update: false,
                delete: false,
              });
              dispatch(GetManagementUnit());
            }}
          />
        </Grid>
        <Grid item lg={2} md={2} sm={12}>
          {actions.update ? (
            <Button
              text="Update"
              icon={<Edit />}
              applyClass="btnDarkSolid"
              size="small"
              click={() =>
                dispatch(
                  EditManagementUnit(
                    managementUnit,
                    setmanagementUnit,
                    setAction,
                    actions
                  )
                )
              }
            />
          ) : (
            <Button
              text="Add"
              icon={<AddIcon />}
              applyClass="btnDarkSolid"
              size="small"
              click={add}
            />
          )}
        </Grid>
        <Grid style={{ marginTop: "1%" }} item lg={12} md={11} sm={12}>
          <Table
            rows={setupForms.ManagementUnits}
            columns={columns}
            scroll={{ x: "max-content" }}
          />
        </Grid>
      </Grid>
      <Modal closeModal={handleCancel} modalState={isModalVisible} width={700}>
        {/* this data will be pass to modal when Add Brower btn will be clicked */}
        {actions.add && (
          <>
            <Box
              display="flex"
              justifyContent="center"
              style={{ padding: "40px" }}
            >
              <Title level={3} align="center">
                Are you sure you want to add Business Segment
              </Title>
            </Box>
            <GroupedButtons data={addButtonProps} />
          </>
        )}
        {/* this data will be pass to modal when delete icon btn in the table  will be clicked */}
        {actions.delete && (
          <>
            <Box
              display="flex"
              justifyContent="center"
              style={{ padding: "40px" }}
            >
              <i className="icon-trash icon-size-two"></i>
              <Title level={3} align="center">
                Are you sure you want to delete this?
              </Title>
            </Box>
            <GroupedButtons data={buttonProps} />
          </>
        )}
      </Modal>
      <Notification setOpen={setOpen} open={open.flag} message={open.message} />
    </>
  );
};

export default ManagementUnit;
