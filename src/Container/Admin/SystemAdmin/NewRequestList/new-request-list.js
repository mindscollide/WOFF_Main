import React, { useState, useEffect } from "react";
import { Grid, Box, Container } from "@material-ui/core";
import { Typography } from "antd";
import {
  saveUserRequest,
  newRequestList,
} from "./../../../../store/actions/request-actions";
import styles from "../../../Authentication/SignUp/style.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  Paper,
  Button,
  Loader,
  TextField,
  Notification,
} from "../../../../Components/Elements";
import RequestListTemplate from "./request-list-template";
import { ControlOutlined } from "@ant-design/icons";

const NewRequestList = () => {
  const { Title, Text } = Typography;
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { wofApprovals, requestReducer, ui } = state;
  const [userRequestDetails, setUserRequestDetails] = useState(
    requestReducer.UserRequestDetails
  );
  const [btndisplay, setBtnDisplay] = useState(true);
  const Approved = 6;
  const Rejected = 7;
  const [comment, setComment] = useState("");
  const Comments = (e) => {
    let value = e.target.value;
    setComment(value);
    if (value.length > 0) {
      setBtnDisplay(false);
    } else {
      setBtnDisplay(true);
    }
  };
  const [open, setOpen] = useState({
    flag: false,
    message: "",
  });

  const goToSaveHandler = (data, Status) => {
    let UserDetails = JSON.parse(localStorage.getItem("UserDetails"));
    let UserID = UserDetails.userID;
    let comments = comment;
    setComment("");
    setBtnDisplay(true);
    console.log(data, Status, comments);
    dispatch(saveUserRequest(data, Status, comments, UserID));
  };
  useEffect(() => {
    let UserDetails = JSON.parse(localStorage.getItem("UserDetails"));
    let userid = UserDetails.userID;
    dispatch(newRequestList(userid));
  }, []);
  useEffect(() => {
    setUserRequestDetails(requestReducer.UserRequestDetails);
    setComment("");
  }, [requestReducer.UserRequestDetails]);
  // for notifications for Save or Reject
  useEffect(() => {
    setUserRequestDetails(requestReducer.UserRequestDetails);
    if (requestReducer.ResponseMessage === "Save Successfully") {
      setOpen({
        ...open,
        flag: true,
        message: "Record saved",
      });
      setComment("");
      console.log("noti change", open.flag);
    }
    setComment("");
  }, [requestReducer.ResponseMessage]);
  useEffect(() => {}, [comment]);
  return (
    <>
      <Container maxWidth="lg">
        {userRequestDetails !== null ? (
          <>
            <Title level={3}>Pending Signup Requests</Title>
            <Grid container spacing={1}>
              <Grid item lg={4} md={4} sm={12}></Grid>
              <Grid item lg={6} md={6} sm={12}>
                <Title level={5}>
                  Below are the pending Sign Up requests for your approval
                </Title>
              </Grid>
            </Grid>
            {userRequestDetails != null && userRequestDetails != undefined
              ? userRequestDetails.map((item, index) => (
                  <RequestListTemplate
                    data={{
                      item: item,
                      index: index,
                    }}
                    key={index}
                  />
                  // <>
                  //   <Paper padding="1" index={ind}>
                  //     <Grid container spacing={1}>
                  //       <Grid item lg={3} md={3} sm={6} xs={6}>
                  //         <p className="m-0" style={{ color: "#b27706" }}>
                  //           First Name
                  //         </p>
                  //       </Grid>
                  //       <Grid item lg={3} md={3} sm={6} xs={6}>
                  //         <span className="mr-1">{item.firstName}</span>
                  //       </Grid>
                  //       <Grid item lg={3} md={3} sm={6} xs={6}>
                  //         <p className="m-0" style={{ color: "#b27706" }}>
                  //           Last Name
                  //         </p>
                  //       </Grid>
                  //       <Grid item lg={3} md={3} sm={6} xs={6}>
                  //         <span className="mr-1">{item.lastName}</span>
                  //       </Grid>
                  //     </Grid>
                  //     <Grid container spacing={1}>
                  //       <Grid item lg={3} md={3} sm={6} xs={6}>
                  //         <p className="m-0" style={{ color: "#b27706" }}>
                  //           Employee Number
                  //         </p>
                  //       </Grid>
                  //       <Grid item lg={3} md={3} sm={6} xs={6}>
                  //         <span className="mr-1">{item.personalNumber}</span>
                  //       </Grid>
                  //       <Grid item lg={3} md={3} sm={6} xs={6}>
                  //         <p className="m-0" style={{ color: "#b27706" }}>
                  //           User Name
                  //         </p>
                  //       </Grid>
                  //       <Grid item lg={3} md={3} sm={6} xs={6}>
                  //         <span className="mr-1">{item.loginID}</span>
                  //       </Grid>
                  //     </Grid>
                  //     <Grid container spacing={1}>
                  //       <Grid item lg={3} md={3} sm={6} xs={6}>
                  //         <p className="m-0" style={{ color: "#b27706" }}>
                  //           Email
                  //         </p>
                  //       </Grid>
                  //       <Grid item lg={3} md={3} sm={6} xs={6}>
                  //         <span className="mr-1">{item.email}</span>
                  //       </Grid>
                  //       <Grid item lg={3} md={3} sm={6} xs={6}>
                  //         <p className="m-0" style={{ color: "#b27706" }}>
                  //           Role
                  //         </p>
                  //       </Grid>
                  //       <Grid item lg={3} md={3} sm={6} xs={6}>
                  //         <span className="mr-1">{item.roleID===4?"Data Entry":item.roleID===3?"Manager":item.roleID===5?"Adutior":null}</span>
                  //       </Grid>
                  //     </Grid>
                  //     <Grid container spacing={1}>
                  //       <Grid item lg={3} md={3} sm={2} xs={2}>
                  //         <p className="m-0" style={{ color: "#b27706" }}>

                  //           Type your Comments<span style={{ color: "#ce0000" }}>*</span>
                  //         </p>
                  //       </Grid>
                  //       <Grid item lg={9} md={9} sm={10} xs={10}>
                  //         <TextField
                  //           multiline
                  //           rows={4}
                  //           change={Comments}
                  //           // value={item.address}
                  //           fullWidth
                  //           name="Comments"
                  //           required={true}
                  //         />
                  //       </Grid>
                  //     </Grid>
                  //     <div style={{ marginTop: "20px" }} />
                  //     <Grid container spacing={1}>
                  //       <Grid item md={4} lg={4} sm={12}></Grid>
                  //       <Grid item md={8} lg={8} sm={12}>
                  //         <Box display="flex">
                  //           <Box width={0.8 / 4}>
                  //             <Button
                  //               applyClass="buttonPrimary3"
                  //               text="Approve"
                  //               icon={<i className="icon-check icon-size-one "></i>}
                  //               click={() => goToSaveHandler(item, Approved)}
                  //               disableBtn={btndisplay}
                  //             />
                  //           </Box>
                  //           <div style={{ margin: "0 5px 0 5px" }} />
                  //           <Box width={1 / 4}>
                  //             <Button
                  //               applyClass="btnBorderStyledRed"
                  //               text="Reject"
                  //               icon={<i className="icon-close icon-size-one"></i>}
                  //               click={() => goToSaveHandler(item, Rejected)}
                  //               disableBtn={btndisplay}
                  //             />
                  //           </Box>
                  //         </Box>
                  //       </Grid>
                  //     </Grid>
                  //   </Paper>
                  //   <div style={{ marginTop: "20px" }} />
                  // </>
                ))
              : null}
          </>
        ) : (
          <>
            <Title level={3}>Pending Signup Requests</Title>
            <Grid container spacing={1}>
              <Grid item lg={4} md={4} sm={12}></Grid>
              <Grid item lg={6} md={6} sm={12}>
                <Title level={5}>
                  You do not have any Pending Signup Request{" "}
                </Title>
              </Grid>
            </Grid>
          </>
        )}
        <Notification
          setOpen={setOpen}
          open={open.flag}
          message={open.message}
        />
        {requestReducer.Loading ? <Loader /> : null}
      </Container>
    </>
  );
};
export default NewRequestList;
