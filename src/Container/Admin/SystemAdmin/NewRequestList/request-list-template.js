import React, { useState, useEffect } from "react";
import { Typography, Row, Col } from "antd";
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
import { ControlOutlined } from "@ant-design/icons";

const RequestListTemplate = ({ data }) => {
  const { item, index } = data;
  const dispatch = useDispatch();
  const requestReducer = useSelector((state) => state.requestReducer);
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
    setBtnDisplay(true);
    console.log(data, Status, comment);
    dispatch(saveUserRequest(data, Status, comment, UserID));
    setComment("");
  };
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
      <Paper padding="1" index={index}>
        <Row gutter={8}>
          <Col lg={6} md={6} sm={12} xs={12}>
            <p className="m-0" style={{ color: "#035F5C" }}>
              First Name
            </p>
          </Col>
          <Col lg={6} md={6} sm={12} xs={12}>
            <span className="mr-1">{item.firstName}</span>
          </Col>
          <Col lg={6} md={6} sm={12} xs={12}>
            <p className="m-0" style={{ color: "#035F5C" }}>
              Last Name
            </p>
          </Col>
          <Col lg={6} md={6} sm={12} xs={12}>
            <span className="mr-1">{item.lastName}</span>
          </Col>
        </Row>
        <Row gutter={8}>
          {/* <Grid item lg={3} md={3} sm={6} xs={6}>
            <p className="m-0" style={{ color: "#035F5C" }}>
              Employee Number
            </p>
          </Grid>
          <Grid item lg={3} md={3} sm={6} xs={6}>
            <span className="mr-1">{item.personalNumber}</span>
          </Grid> */}
          <Col lg={6} md={6} sm={12} xs={12}>
            <p className="m-0" style={{ color: "#035F5C" }}>
              Email
            </p>
          </Col>
          <Col lg={6} md={6} sm={12} xs={12}>
            <span className="mr-1">{item.email}</span>
          </Col>
          <Col lg={6} md={6} sm={12} xs={12}>
            <p className="m-0" style={{ color: "#035F5C" }}>
              User Name
            </p>
          </Col>
          <Col lg={6} md={6} sm={12} xs={12}>
            <span className="mr-1">{item.loginID}</span>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col lg={6} md={6} sm={12} xs={12}>
            <p className="m-0" style={{ color: "#035F5C" }}>
              Role
            </p>
          </Col>
          <Col lg={6} md={6} sm={12} xs={12}>
            <span className="mr-1">
              {item.roleID === 4
                ? "Data Entry"
                : item.roleID === 3
                ? "Manager"
                : item.roleID === 5
                ? "Adutior"
                : null}
            </span>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col lg={6} md={6} sm={4} xs={4}>
            <p className="m-0" style={{ color: "#035F5C" }}>
              Type your Comments<span style={{ color: "#FC4343" }}>*</span>
            </p>
          </Col>
          <Col lg={18} md={18} sm={20} xs={20}>
            <TextField
              multiline
              rows={4}
              change={Comments}
              // value={item.address}
              value={comment}
              fullWidth
              name="Comments"
              required={true}
            />
          </Col>
        </Row>
        <div style={{ marginTop: "20px" }} />
        <Row gutter={8}>
          <Col md={8} lg={8} sm={24}></Col>
          <Col md={16} lg={16} sm={24}>
            <div style={{
              display: "flex"
            }}>
              <div style={{
                width: "20%"
              }}>
                <Button
                  applyClass="buttonPrimary3"
                  text="Approve"
                  icon={<i className="icon-check icon-size-one "></i>}
                  click={() => goToSaveHandler(item, Approved)}
                  disableBtn={btndisplay}
                />
              </div>
              <div style={{ margin: "0 5px 0 5px" }} />
              <div style={{
                width: "25%"
              }}>
                <Button
                  applyClass="btnBorderStyledRed"
                  text="Reject"
                  icon={<i className="icon-close icon-size-one"></i>}
                  click={() => goToSaveHandler(item, Rejected)}
                  disableBtn={btndisplay}
                />
              </div>
            </div>
          </Col>
        </Row>
      </Paper>
      <div style={{ marginTop: "20px" }} />
      <Notification setOpen={setOpen} open={open.flag} message={open.message} />
      {/* {requestReducer.Loading ? <Loader /> : null} */}
    </>
  );
};
export default RequestListTemplate;
