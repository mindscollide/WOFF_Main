import React, { useRef, useState, useEffect } from "react";
import styles from "./style.module.css";
import { Input } from "antd";
import {
  UserOutlined,
  LockOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { Loader, Notification, AuthLayout } from "../../../Components/Elements";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../../../store/actions/auth-actions";
import Helper from "../../../Common/Functions/history_logout";
import { clearestateBackbutton } from "./../../../store/actions/auth-actions";
const Login = () => {
  const auth = useSelector((state) => state.auth);
  const ui = useSelector((state) => state.ui);
  const UserIDInput = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  Helper.navigate = navigate;
  const [credentials, setCredentials] = useState({
    UserName: "",
    Password: "",
    fakePassword: "",
  });
  const [open, setOpen] = useState({
    open: false,
    message: "",
  });
  const [showPassword, setShowPassword] = useState(false);
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
    // always stay on the page: an empty submit used to reload it before the
    // "enter all credentials" notification could show
    e.preventDefault();
    if (credentials.UserName === "" || credentials.Password === "") {
      setOpen({
        ...open,
        open: true,
        message: "Please Enter All Credentials",
      });
    } else {
      dispatch(signIn(credentials, navigate));
    }
  };


  useEffect(() => {
    Helper.navigate = navigate;
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
    <>
      <AuthLayout mode="login">
        <form onSubmit={(e) => validateHandler(e)} className={styles.form}>
          <h1 className={styles.formTitle}>Sign in to WOFF</h1>
          <p className={styles.formSubtitle}>Use your LDAP User ID and password</p>

          <Input
            name="UserName"
            size="large"
            placeholder="User ID"
            prefix={<UserOutlined />}
            onChange={setCredentialHandler}
            value={credentials.UserName}
            ref={UserIDInput}
            autoComplete="off"
            className={styles.field}
          />
          <Input
            name="Password"
            size="large"
            placeholder="Password"
            prefix={<LockOutlined />}
            suffix={
              <span
                className={styles.eye}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => setShowPassword((shown) => !shown)}
              >
                {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
              </span>
            }
            onChange={setCredentialHandler}
            autoComplete="off"
            className={`${styles.field} ${showPassword ? "" : styles.passwordInputField}`}
            type="text"
          />

          {!auth.isLoggedIn && auth.ResponseMessage !== "" ? (
            <div className={styles.error + " " + styles.fade}>
              {auth.ResponseMessage}
            </div>
          ) : null}

          <button type="submit" className={styles.primaryButton}>
            SIGN IN
          </button>
        </form>
      </AuthLayout>
      <Notification setOpen={setOpen} open={open.open} message={open.message} />
      {auth.Loading ? <Loader /> : null}
    </>
  );
};

export default Login;
