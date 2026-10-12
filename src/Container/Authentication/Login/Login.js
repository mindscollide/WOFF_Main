import React, { useRef, useState, useEffect } from "react";
import { Container, Box, Grid } from "@material-ui/core";
import styles from "./style.module.css";
import { Input, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Button, Loader, Notification } from "../../../Components/Elements";
import { useHistory, useRouteMatch, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../../../store/actions/auth-actions";
import Helper from "../../../Common/Functions/history_logout";
import { clearestateBackbutton } from "./../../../store/actions/auth-actions";
import Password from "antd/lib/input/Password";
const Login = () => {
  const state = useSelector((state) => state);
  const UserIDInput = useRef(null);
  const dispatch = useDispatch();
  const { auth, ui } = state;
  const { Title } = Typography;
  const history = useHistory();
  Helper.history = history;
  const [credentials, setCredentials] = useState({
    UserName: "",
    Password: "",
    fakePassword: "",
  });
  const [open, setOpen] = useState({
    open: false,
    message: "",
  });
  // const [showText, seShowText] = useState({ fkps: "" });
  const setCredentialHandler = (e) => {
    if (e.target.name === "Password") {
      let numChars = e.target.value;
      let showText = "";
      for (let i = 0; i < numChars.length; i++) {
        showText += "•";
      }
      setCredentials({
        ...credentials,
        [e.target.name]: e.target.value,
        ["fakePassword"]: showText,
      });
    } else {
      setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
  };
  const validateHandler = (e) => {
    if (credentials.UserName === "" || credentials.Password === "") {
      setOpen({
        ...open,
        open: true,
        message: "Please Enter All Credentials",
      });
    } else {
      e.preventDefault();
      dispatch(signIn(credentials, history));
    }
  };

  const route = useRouteMatch();
  const path = route.path;

  useEffect(() => {
    Helper.history = history;
    document.body.className = "login-page";
    return () => {
      document.body.className = "";
    };
  }, [credentials]);
  useEffect(() => {
    console.log(ui.SomeThingWentWrong);
    if (ui.SomeThingWentWrong === true) {
      setOpen({
        ...open,
        open: true,
        message:
          "Unable to connect to server please check your connection or contact support",
      });
    }
  }, [ui.SomeThingWentWrong]);
  useEffect(() => {
    dispatch(clearestateBackbutton());
  }, []);
  // for notifications for signup
  useEffect(() => {
    console.log(auth.signUpResponseMessage);
    if (auth.signUpResponseMessage != "") {
      setOpen({
        ...open,
        open: true,
        message: auth.signUpResponseMessage,
      });
      setTimeout(() => {
        setOpen({
          ...open,
          open: false,
          message: "",
        });
      }, 10000);
    }
  }, [auth.signUpResponseMessage]);

  useEffect(() => {}, [auth.ResponseMessage]);
  useEffect(() => {
    if (UserIDInput.current) {
      UserIDInput.current.focus();
    }
  }, [UserIDInput]);
  useEffect(() => {
    // console.log(ui.SessionExpeireResponseMessage);
    if (
      auth.SessionExpeireResponseMessage !== "" &&
      auth.SessionExpeireResponseMessage !== undefined
    ) {
      console.log("hi", ui.SessionExpeireResponseMessage);
      setOpen({
        ...open,
        open: true,
        message: auth.SessionExpeireResponseMessage,
      });
    } else {
      setOpen({
        ...open,
        open: false,
        message: "",
      });
    }
  }, [auth.SessionExpeireResponseMessage]);
  return (
    <Container maxWidth="lg">
      <React.StrictMode>
        <form
          autoComplete="off"
          readonly
          onclick="this.removeAttribute(
                    'readOnly');"
          onSubmit={(e) => validateHandler(e)}
        >
          <Box display="flex" alignItems="center" style={{ height: "100vh" }}>
            <Grid container spacing={5}>
              <Grid item lg={6} md={6} sm={12}></Grid>
              <Grid item lg={6} md={6} sm={12} align="right">
                <Box className={styles.loginBody}>
                  <Title
                    level={3}
                    style={{
                      color: "white",
                      textAlign: "center",
                      marginTop: 10,
                    }}
                  >
                    Write Off Data Capturing Portal
                  </Title>
                  <div style={{ marginTop: "6%" }} />
                  <Title
                    level={5}
                    style={{ color: "white", textAlign: "left" }}
                  >
                    User ID
                  </Title>

                  <Input
                    name="UserName"
                    size="large"
                    placeholder="User ID"
                    prefix={<UserOutlined />}
                    onChange={setCredentialHandler}
                    value={credentials.UserName}
                    ref={UserIDInput}
                    autoComplete="off"
                  />
                  <div style={{ marginTop: "5%" }} />
                  <Title
                    level={5}
                    style={{ color: "white", textAlign: "left" }}
                  >
                    Password
                  </Title>
                  <Input
                    name="Password"
                    size="large"
                    placeholder="password"
                    onChange={setCredentialHandler}
                    // value={credentials.fakePassword}
                    autoComplete="off"
                    style={{
                      fontFamily: "text-security-disc",
                      webkitTextSecurity: "disc",
                      inputSecurity: "none",
                    }}
                    type="text"
                  />

                  {!auth.isLoggedIn && auth.ResponseMessage !== "" ? (
                    <Box align="center">
                      <div className={styles.error + " " + styles.fade}>
                        {auth.ResponseMessage}
                      </div>
                    </Box>
                  ) : null}

                  <div style={{ marginTop: "10%" }} />
                  <Box
                    align="center"
                    display="flex"
                    justifyContent="space-evenly"
                  >
                    <Button
                      applyClass="btnBorderStyled"
                      text="Login"
                      endIcon={<i className="icon-login icon-size-one"></i>}
                      type="submit"
                    />
                    <Link to="/Signup">
                      <Button
                        applyClass="btnBorderStyledRedSignup"
                        text="SIGN UP"
                      />
                    </Link>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </form>
      </React.StrictMode>
      <Notification setOpen={setOpen} open={open.open} message={open.message} />
      {auth.Loading ? <Loader /> : null}
    </Container>
  );
};

export default Login;
