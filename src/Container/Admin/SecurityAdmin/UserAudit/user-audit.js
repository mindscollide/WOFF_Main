import React, { useState,useEffect } from "react";
import { Grid, Box } from "@material-ui/core";
import { Typography, Space } from "antd";
import AddIcon from "@material-ui/icons/Add";
import Search from "@material-ui/icons/Search";
import Edit from "@material-ui/icons/Edit";
import Restore from "@material-ui/icons/Restore";
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

const UserDetail = () => {
  const { Title ,Text} = Typography;
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
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
      <Grid container spacing={1}>
        <Grid item lg={2} md={2} sm={12}>
          <TextField
            name={"WofCode"}
            fullWidth
            label="Wof Code"
            size="small"
            change={handleChange}
            value={State.ApprovalFlowName}
          />
        </Grid>
        <Grid item lg={2} md={2} sm={12}>
        <SelectBox 
          label="Select Action"
          // change={handleUser}
          // option={remainingUserList}
          // value={updateApprovalFlowForEdit.UserID}
          name="RemainingUser"
          propertyName={"Fullname"}
           />
        </Grid>
        <Grid item lg={2} md={2} sm={12}>
          <TextField
            fullWidth
            name={"BorrowerNPLCode"}
            label="Borrower NPL Code"
            size="small"
            change={handleChange}
            value={State.ApprovalFlowDescription}
          />
        </Grid>
      
        <Grid item lg={4} md={4} sm={12}>
                <StartToEndDate
                  // change={datehandler}
                  label={"Action On"}
                  width="100%!important"
                  size="large"
                  // startvalue={form.DateFrom!==null && form.DateFrom!==""? DateDisplayFormat(form.DateFrom):''}
                  // endvalue={form.DateTO!==null && form.DateFrom!=="" ?DateDisplayFormat(form.DateTO):''}
                  DateRange={true}
                />
              </Grid>
        <Grid item lg={2} md={2} sm={12}>
        <Button
          text="Search"
          icon={<Search />}
          applyClass="btnDarkSolid"
          size="small"
          // click={()=>dispatch(SearchApprovalFlow(State.ApprovalFlowName,State.ApprovalFlowDescription))}
        />
        </Grid>
        <Grid item lg={2} md={2} sm={12}>
        <Button
          text="Reset"
          icon={<Restore />}
          applyClass="btnDarkSolid"
          size="small"
        />
        </Grid>
        <Grid style={{ marginTop: "1%" }} item lg={12} md={11} sm={12}>
          <Table rows={[{name:"adssada"}]} columns={columns} scroll={{ x: "max-content" }} />
        </Grid>
      </Grid>
       <Notification setOpen={setOpen} open={open.flag} message={open.message} />
    </>
  );
};

export default UserDetail;
