import React, { useEffect, useState } from "react";
import { Container, Box, Grid, Fade } from "@material-ui/core";
import styles from "./style.module.css";
import { Input, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import {
  Button,
  InputWithBtn,
  Loader,
  Notification,
} from "../../../Components/Elements";
import { useHistory, useRouteMatch, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ErrorBar from "./ErrorBar/error-bar";
import {
  validateEmailAddress,
  validateEmailAndPassword,
  signUp,
  clearestate,
  clearestateBackbutton,
  roleList,
} from "./../../../store/actions/auth-actions";

import TextField from "../../../Components/Elements/InputFields/TextField/text-field";
import Select from "../../../Components/Elements/InputFields/SelectBox/select-box";
import GroupedButtons from "../../../Components/Elements/GroupedButtons/grouped-buttons";
import {
  checkEmptyField,
  validEmailAddress,
} from "../../../Common/Functions/validations";
import { validateemail } from "../../../Common/Api/apis-config";

// import ripple from "../../../assets/images/ripple"

const SignUp = () => {
  // to be use when get the api
  const state = useSelector((state) => state);
  const [finishStatus, setfinishStatus] = useState(false);
  const dispatch = useDispatch();
  const { auth, ui } = state;
  const [fields, setFields] = useState(false);
  const { Title } = Typography;
  const [btnDisable, setbtnDisable] = useState(false);
  const [emailAfterVerify, setEmailAfterVerify] = useState();
  const [emailAfterVerifyError, setEmailAfterVerifyError] = useState("");
  const history = useHistory();
  const [open, setOpen] = useState({
    open: false,
    message: "",
  });
  const errorMessagesStr = {
    notVerified: `could not be verified`,
    emptyField: `Please Enter`,
  };
  const [roleValue, setRoleValue] = useState([]);
  const [rolesName, setRolesName] = useState([]);
  const [credentialsp, setCredentialsp] = useState({ fakePassword: "" });
  const [credentials, setCredentials] = useState({
    emailAddress: {
      content: "",
      isError: true,
      isSuccess: false,
      errorMessage: "",
      isFail: false,
    },
    password: {
      content: "",
      isSuccess: false,
      isError: true,
      errorMessage: "",
      isFail: false,
    },
    completed: false,
  });
  const [roles, setRoles] = useState([]);
  const [bio, setBio] = useState({
    email: {
      content: "",
      isError: false,
      errorMessage: "",
      isSuccess: false,
    },
    userName: {
      content: "",
      isError: false,
      errorMessage: "",
      isSuccess: false,
    },
    firstName: {
      content: "",
      isError: false,
      errorMessage: "",
      isSuccess: false,
    },
    lastName: {
      content: "",
      isError: false,
      errorMessage: "",
      isSuccess: false,
    },
    personalNumber: {
      content: "",
      isError: false,
      errorMessage: "",
      isSuccess: false,
    },
    // departments: {
    //   content: "",
    //   isError: false,
    //   errorMessage: "",
    //   isSuccess: false,
    // },
    roles: {
      content: "",
      isError: false,
      errorMessage: "",
      isSuccess: false,
    },
  });
  // handler just to cleare all values from fields to state on goback:
  const goback = () => {
    setbtnDisable(false);
    setCredentials({
      ...credentials,
      emailAddress: {
        content: "",
        isError: true,
        isSuccess: false,
        errorMessage: "",
        isFail: false,
      },
      password: {
        content: "",
        isSuccess: false,
        isError: true,
        errorMessage: "",
        isFail: false,
      },
      completed: false,
    });
    setBio({
      ...bio,
      email: {
        content: "",
        isError: false,
        errorMessage: "",
        isSuccess: false,
      },
      userName: {
        content: "",
        isError: false,
        errorMessage: "",
        isSuccess: false,
      },
      firstName: {
        content: "",
        isError: false,
        errorMessage: "",
        isSuccess: false,
      },
      lastName: {
        content: "",
        isError: false,
        errorMessage: "",
        isSuccess: false,
      },
      personalNumber: {
        content: "",
        isError: false,
        errorMessage: "",
        isSuccess: false,
      },
      roles: {
        content: "",
        isError: false,
        errorMessage: "",
        isSuccess: false,
      },
    });
    if (btnDisable === true) {
      history.push();
      gobackHandler();
    } else {
      history.push("/");
      dispatch(clearestate(history));
    }
  };
  const gobackHandler = () => {
    history.push("/");
    dispatch(clearestate(history));
  };
  useEffect(() => {
    console.log(auth.ResponseMessage);

    if (
      auth.ResponseMessage !==
        "User already exists in WOFF System. Please use other credentials" &&
      auth.ResponseMessage !==
        "Signup request for the Login ID is in pending state. Please use a different ID"
    ) {
      setOpen({
        ...open,
        open: true,
        message: auth.ResponseMessage,
      });
    }
  }, [auth.ResponseMessage]);
  // handler just to set values from fields to state:
  const setFieldsHandler = (e) => {
    console.log("name: ", e.target.name, "value: ", e.target.value);

    let fieldName = e.target.name;
    let fieldValue = e.target.value;

    switch (fieldName) {
      case "emailAddress":
        setCredentials({
          ...credentials,
          [fieldName]: { ...credentials[fieldName], content: fieldValue },
        });
        break;
      case "password":
        let numChars = fieldValue;
        let showText = "";
        for (let i = 0; i < numChars.length; i++) {
          showText += "•";
        }
        console.log("passwordpasswordpassword", showText, fieldValue);
        setCredentialsp({
          ...credentialsp,
          ["fakePassword"]: showText,
        });
        setCredentials({
          ...credentials,
          [fieldName]: { ...credentials[fieldName], content: fieldValue },
        });
        break;
      case "firstName":
        setBio({
          ...bio,
          [fieldName]: { ...credentials[fieldName], content: fieldValue },
        });
        break;
      case "lastName":
        setBio({
          ...bio,
          [fieldName]: { ...credentials[fieldName], content: fieldValue },
        });
        break;
      case "personalNumber":
        setBio({
          ...bio,
          [fieldName]: { ...credentials[fieldName], content: fieldValue },
        });
        break;
      // case "departments":
      //   setBio({
      //     ...bio,
      //     [fieldName]: { ...credentials[fieldName], content: fieldValue },
      //   });
      //   break;
      case "roles":
        setBio({
          ...bio,
          [fieldName]: { ...credentials[fieldName], content: fieldValue },
        });

        break;
      default:
        return null;
    }
  };
  const roleHandler = (e, val) => {
    setRoleValue(val);
    roles.map((data) => {
      let a = data.roleName;
      if (a === val) {
        console.log(data);
        setBio({
          ...bio,
          roles: {
            ...credentials.roles,
            content: data.roleID,
          },
        });
      }
    });
  };
  const gobackBrowserHandler = () => {
    setbtnDisable(false);
    setCredentials({
      ...credentials,
      emailAddress: {
        content: "",
        isError: true,
        isSuccess: false,
        errorMessage: "",
        isFail: false,
      },
      password: {
        content: "",
        isSuccess: false,
        isError: true,
        errorMessage: "",
        isFail: false,
      },
      completed: false,
    });
    setBio({
      ...bio,
      email: {
        content: "",
        isError: false,
        errorMessage: "",
        isSuccess: false,
      },
      userName: {
        content: "",
        isError: false,
        errorMessage: "",
        isSuccess: false,
      },
      firstName: {
        content: "",
        isError: false,
        errorMessage: "",
        isSuccess: false,
      },
      lastName: {
        content: "",
        isError: false,
        errorMessage: "",
        isSuccess: false,
      },
      personalNumber: {
        content: "",
        isError: false,
        errorMessage: "",
        isSuccess: false,
      },
      roles: {
        content: "",
        isError: false,
        errorMessage: "",
        isSuccess: false,
      },
    });
    dispatch(clearestateBackbutton(history));
  };
  useEffect(() => {
    // console.log("auth.roelList", auth.roelList);
    if (auth.roelList.length > 0) {
      // console.log("auth.roelList", auth.roelList);

      setRoles(auth.roelList);
    } else {
      setRoles([]);
    }
  }, [auth.roelList]);
  // to set body backgound
  useEffect(() => {
    gobackBrowserHandler();
    document.body.className = "login-page";
    return () => {
      document.body.className = "";
    };
  }, []);
  // for notifications for signup
  useEffect(() => {
    console.log(ui.SomeThingWentWrong);
    if (ui.SomeThingWentWrong === true) {
      setOpen({
        ...open,
        open: true,
        message: "SomeThing Went Wrong Please Check Your Internet Connection",
      });
    }
  }, [ui.SomeThingWentWrong]);
  // for email validate error handle
  useEffect(() => {
    if (!auth.isError) {
      setbtnDisable(true);
      setCredentials({
        ...credentials,
        emailAddress: {
          ...credentials.emailAddress,
          isError: auth.isError,
          isFail: auth.isFail,
          isSuccess: true,
        },
      });
    }
  }, [auth.isError, auth.isFail]);
  // for email verification id
  useEffect(() => {
    console.log(auth.ResponseMessage);
    setEmailAfterVerifyError(auth.ResponseMessage);
  }, [auth.ResponseMessage]);
  useEffect(() => {}, [emailAfterVerifyError]);
  // checky validity
  const checkValidity = async (section) => {
    console.log(credentials.emailAddress.content);
    let email = credentials.emailAddress.content;
    switch (section) {
      case "verify-email":
        function validateEmail(email) {
          const re = /([a-zA-Z0-9]+)([\.{1}])?([a-zA-Z0-9]+)\@hbl([\.])com/g;
          return re.test(String(email).toLowerCase());
        }
        if (
          !validateEmail(email) &&
          (credentials.emailAddress.content == "" ||
            credentials.emailAddress.content !== "")
        ) {
          // for Error message
          if (
            !validateEmail(email) &&
            credentials.emailAddress.content !== ""
          ) {
            setEmailAfterVerifyError("Enter your correct Email address");
          } else if (credentials.emailAddress.content == "") {
            setEmailAfterVerifyError("Please enter Email Address");
          }
          // --end--
          console.log("pahlay");
          setCredentials({
            ...credentials,
            emailAddress: {
              ...credentials.emailAddress,
              isError: true,
              content: "",
              isFail: true,
            },
          });
          // console.log(credentials.emailAddress.isFail)
        } else if (validateEmail(email)) {
          console.log("pahlay 2");
          await dispatch(
            validateEmailAddress(credentials.emailAddress.content)
          );
          setCredentials({
            ...credentials,
            emailAddress: {
              ...credentials.emailAddress,
              isError: auth.isError,
              isFail: auth.isFail,
              isSuccess: true,
            },
          });
          setEmailAfterVerify(credentials.emailAddress.content);
        }
        break;
      case "verify-password":
        if (credentials.password.content == "") {
          setCredentials({
            ...credentials,
            password: {
              ...credentials.password,
              isError: true,
              isFail: true,
              content: "",
            },
            completed: false,
          });
        } else {
          console.log("in");
          dispatch(
            validateEmailAndPassword(
              emailAfterVerify,
              credentials.password.content
            )
          );
          setCredentials({
            ...credentials,
            password: {
              ...credentials.password,
              isError: false,
              isSuccess: true,
              // isError: auth.isErrorPas,
              // isSuccess: true,
            },
            completed: true,
          });
        }
        break;
      case "verify-bio":
        let keys = Object.keys(bio);
        var copyState = { ...bio };
        await keys.forEach((item) => {
          if (copyState[item].content == "") {
            copyState[item].isError = true;
            copyState[item].errorMessage = "The Field is Empty";
          }
        });
        setBio({ ...copyState });
        dispatch(signUp(copyState, history));
        break;
      default:
        break;
    }
  };
  //  For button
  const buttonProps = {
    primaryButton: {
      text: "SIGN UP",
      icon: <i className="icon-sent icon-size-one"></i>,
      endIcon: "",
      class: "btnBorderStyledBeachSignup",
      size: "small",
      disable: false,
      click: () => checkValidity("verify-bio"),
    },
    secondaryButton: {
      text: "Go Back",
      icon: null,
      endIcon: "",
      class: "btnBorderStyledRedSignup",
      size: "small",
      disable: false,
      click: () => goback(),
    },
  };
  // set response data into form
  useEffect(() => {
    setBio({
      ...bio,
      email: {
        ...credentials.email,
        content: auth.responseData.email,
      },
      userName: {
        ...credentials.userName,
        content:
          auth.responseData.userName === null ||
          auth.responseData.userName === "" ||
          auth.responseData.userName === undefined
            ? null
            : auth.responseData.userName.search("@") != -1
            ? auth.responseData.userName.split("@")[0]
            : auth.responseData.userName,
      },
      firstName: {
        ...credentials.firstName,
        content: auth.responseData.firstName,
      },
      lastName: {
        ...credentials.lastName,
        content: auth.responseData.lastName,
      },
    });
  }, [auth.responseData.email]);
  // set roles
  useEffect(() => {
    // console.log("auth.roelList", auth.roelList);
    if (roles) {
      // console.log("auth.roelList", auth.roelList);
      setRolesName(
        roles.map((role, i) => {
          return role.roleName;
        })
      );
    }
  }, [roles]);
  // set verify email password
  const verifyEmailPassword = (email, password) => {
    console.log("done", email, password);
    function validateEmail(email) {
      const re = /([a-zA-Z0-9]+)([\.{1}])?([a-zA-Z0-9]+)\@hbl([\.])com/g;
      return re.test(String(email).toLowerCase());
    }
    // changes for validtaion on email
    // if (!validateEmail(email) && (email == "" || email !== "")) {
    // if (!validateEmail(email) && (email == "" || email !== "")) {
    // for Error message
    if (email === "") {
      // if (!validateEmail(email) && email !== "") {
      // setEmailAfterVerifyError("Enter your correct LogIn Id");
      // } else if (credentials.emailAddress.content == "") {
      setEmailAfterVerifyError("Please enter Email Address");
      // }
      // --end--
      console.log("pahlay");
      setCredentials({
        ...credentials,
        emailAddress: {
          ...credentials.emailAddress,
          isError: true,
          content: "",
          isFail: true,
        },
      });
      // console.log(credentials.emailAddress.isFail)
    }
    // if (validateEmail(email))
    else {
      console.log("pahlay 2");
      dispatch(validateEmailAndPassword(email, password));
      setCredentials({
        ...credentials,
        emailAddress: {
          ...credentials.emailAddress,
          isError: auth.isError,
          isFail: auth.isFail,
          isSuccess: true,
        },
      });
      setEmailAfterVerify(email);
    }
    setFields(true);
  };
  useEffect(() => {}, [auth.isFail, auth.isError]);
  return (
    <Container maxWidth="lg">
      <Box display="flex" style={{ height: "100vh" }}>
        <Grid container spacing={5}>
          <Grid item lg={6} md={6} sm={12}></Grid>
          <Grid item lg={6} md={6} sm={12} align="right">
            <Box className={styles.loginBody}>
              <Title
                level={3}
                style={{ color: "white", textAlign: "center", marginTop: 10 }}
              >
                Sign Up Request
              </Title>
              <div style={{ marginTop: "6%" }} />
              {/* first step code */}
              {auth.isError ? (
                <>
                  <Input
                    onChange={setFieldsHandler}
                    placeholder="Enter Email Address"
                    size="large"
                    fullWidth
                    name="emailAddress"
                    autoComplete="off"
                    autoFocus
                  />
                  <div style={{ marginTop: "10%" }} />
                  <InputWithBtn
                    placeholder="Enter Password"
                    onchange={setFieldsHandler}
                    // value={credentialsp.fakePassword}
                    size="medium"
                    autoComplete="off"
                    // style={{
                    //   webkitTextSecurity: "disc",
                    // }}
                    type="text"
                    name="password"
                    fullWidth
                    textFieldSize="small"
                    click={() =>
                      verifyEmailPassword(
                        credentials.emailAddress.content,
                        credentials.password.content
                      )
                    }
                    applyClass="next"
                    classpas="disc"
                    icon={
                      credentials.password.isError === false ? (
                        <i className="icon-check  icon-size-one"></i>
                      ) : (
                        <i className="icon-arrow-right icon-size-one"></i>
                      )
                    }
                  />
                  {/* </>
                  )} */}
                  {/* ErrorBar of Email */}
                  {credentials.password.isFail && (
                    <ErrorBar errorText="This is a error" />
                  )}
                  {credentials.emailAddress.isFail && (
                    <ErrorBar errorText={emailAfterVerifyError} />
                  )}
                  <Grid align="center" item md={12} lg={12}>
                    <div style={{ marginTop: "30px" }} />
                    <Button
                      text="Go Back"
                      icon={null}
                      endIcon=""
                      applyClass="btnBorderStyledRedSignup"
                      disable={false}
                      click={goback}
                    />
                  </Grid>
                </>
              ) : (
                <Grid container align="left" spacing={5}>
                  <Grid item md={6} lg={6}>
                    <label className={styles.lable}>Email</label>
                    <TextField
                      size="small"
                      placeholder="Enter Email"
                      disable
                      value={bio.email.content}
                      // value={auth.responseData.email}
                    />
                    {/* <ErrorBar errorText="" /> */}
                  </Grid>
                  <Grid item md={6} lg={6}>
                    <label className={styles.lable}>Username</label>
                    <TextField
                      size="small"
                      placeholder="Enter User Name"
                      disable
                      value={bio.userName.content}
                      // value={
                      //   bio.userName.content === null ||
                      //   bio.userName.content === "" ||
                      //   bio.userName.content === undefined
                      //     ? null
                      //     : bio.userName.content.search("@") != -1
                      //     ? bio.userName.content.split("@")[0]
                      //     : bio.userName.content
                      // }
                      // value={auth.responseData.userName}
                    />
                    {/* <ErrorBar errorText="" /> */}
                  </Grid>
                  <div style={{ marginTop: "30px" }} />
                  <Grid item md={6} lg={6}>
                    <label className={styles.lable}>First Name</label>
                    <TextField
                      size="small"
                      placeholder="Enter First Name"
                      name="firstName"
                      change={setFieldsHandler}
                      value={bio.firstName.content}
                      // value={auth.responseData.firstName}
                      required={true}
                    />

                    {bio.firstName.isError && (
                      <ErrorBar errorText={bio.firstName.errorMessage} />
                    )}
                  </Grid>
                  <Grid item md={6} lg={6}>
                    <label className={styles.lable}>Last Name</label>
                    <TextField
                      size="small"
                      placeholder="Enter Last Name"
                      name="lastName"
                      change={setFieldsHandler}
                      value={bio.lastName.content}
                      required={true}
                      // value={auth.responseData.lastName}
                    />
                    {bio.lastName.isError && (
                      <ErrorBar errorText={bio.lastName.errorMessage} />
                    )}
                  </Grid>
                  <div style={{ marginTop: "30px" }} />
                  {/* <Grid item md={12} lg={12}>
                    <label className={styles.lable}>Personal Number</label>
                    <TextField
                      size="small"
                      placeholder="Enter Personal Mobile Number"
                      fullWidth
                      name="personalNumber"
                      change={setFieldsHandler}
                      value={bio.personalNumber.content}
                      required={true}
                    />
                    {bio.personalNumber.isError && (
                      <ErrorBar errorText={bio.personalNumber.errorMessage} />
                    )}
                  </Grid> */}
                  <Grid item md={12} lg={12}>
                    <label className={styles.lable}>Role</label>
                    <Select
                      value={roleValue}
                      option={rolesName}
                      placeholder="Select"
                      name="roles"
                      change={roleHandler}
                      required={true}
                    />
                    {bio.roles.isError && (
                      <ErrorBar errorText={bio.roles.errorMessage} />
                    )}
                    {auth.pendingError ? (
                      <ErrorBar errorText={auth.ResponseMessage} />
                    ) : null}
                  </Grid>
                  <Grid align="center" item md={12} lg={12}>
                    <div style={{ marginTop: "30px" }} />
                    <GroupedButtons data={buttonProps} />
                  </Grid>
                </Grid>
              )}
              {/* second step component  */}
              {/* {!credentials.emailAddress.isError &&
              !credentials.password.isError ? ( */}

              {/* ) : null} */}
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Notification setOpen={setOpen} open={open.open} message={open.message} />
      {auth.Loading ? <Loader /> : null}
    </Container>
  );
};

export default SignUp;
