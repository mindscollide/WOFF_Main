import React, { useEffect, useRef, useState } from "react";
import styles from "./style.module.css";
import { Input, Row, Col } from "antd";
import {
  Button,
  InputWithBtn,
  Loader,
  Notification,
  AuthLayout,
} from "../../../Components/Elements";
import { useNavigate } from "react-router";
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
  const auth = useSelector((state) => state.auth);
  const ui = useSelector((state) => state.ui);
  const [finishStatus, setfinishStatus] = useState(false);
  const dispatch = useDispatch();
  const [fields, setFields] = useState(false);
  // AuthLayout hands back its animated "switch to Login" function here
  const switchToLogin = useRef(null);
  const [btnDisable, setbtnDisable] = useState(false);
  const [emailAfterVerify, setEmailAfterVerify] = useState();
  const [emailAfterVerifyError, setEmailAfterVerifyError] = useState("");
  const navigate = useNavigate();
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
    gobackHandler();
  };
  const gobackHandler = () => {
    if (switchToLogin.current) {
      // animated switch; AuthLayout's onSwitch clears the sign-up state
      switchToLogin.current();
    } else {
      navigate("/");
      dispatch(clearestate(navigate));
    }
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
    dispatch(clearestateBackbutton(navigate));
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
        dispatch(signUp(copyState, navigate));
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
    <>
      <AuthLayout
        mode="signup"
        onSwitch={() => dispatch(clearestate(navigate))}
        switchRef={switchToLogin}
      >
        <div className={styles.signupForm}>
          <h1 className={styles.formTitle}>Create Account</h1>
          <p className={styles.formSubtitle}>
            Send a signup request with your LDAP ID
          </p>
          {/* first step code */}
          {auth.isError ? (
            <>
              <div className={styles.ldapField}>
                <Input
                  onChange={setFieldsHandler}
                  placeholder="Enter LDAP ID"
                  size="large"
                  name="emailAddress"
                  autoComplete="off"
                  autoFocus
                />
                <span className={styles.ldapIcon}>
                  <i className="icon-user icon-size-one"></i>
                </span>
              </div>
              <InputWithBtn
                placeholder="Enter Password"
                onchange={setFieldsHandler}
                autoComplete="off"
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
              {/* ErrorBar of Email */}
              {credentials.password.isFail && (
                <ErrorBar errorText="This is a error" />
              )}
              {credentials.emailAddress.isFail && (
                <ErrorBar errorText={emailAfterVerifyError} />
              )}
              <div className={styles.goBack}>
                <Button
                  text="Go Back"
                  icon={null}
                  endIcon=""
                  applyClass="btnSecondarySolidReset"
                  disable={false}
                  click={goback}
                />
              </div>
            </>
          ) : (
            <>
              <Row gutter={[10, 14]}>
                <Col md={12} lg={12} span={24}>
                  <label className={styles.lableNotRequired}>Email</label>
                  <TextField
                    size="small"
                    placeholder="Enter Email"
                    disable
                    value={bio.email.content}
                  />
                </Col>
                <Col md={12} lg={12} span={24}>
                  <label className={styles.lableNotRequired}>Username</label>
                  <TextField
                    size="small"
                    placeholder="Enter User Name"
                    disable
                    value={bio.userName.content}
                  />
                </Col>
                <Col md={12} lg={12} span={24}>
                  <label className={styles.lable}>First Name</label>
                  <TextField
                    size="small"
                    placeholder="Enter First Name"
                    name="firstName"
                    change={setFieldsHandler}
                    value={bio.firstName.content}
                    required={true}
                  />
                  {bio.firstName.isError && (
                    <ErrorBar errorText={bio.firstName.errorMessage} />
                  )}
                </Col>
                <Col md={12} lg={12} span={24}>
                  <label className={styles.lable}>Last Name</label>
                  <TextField
                    size="small"
                    placeholder="Enter Last Name"
                    name="lastName"
                    change={setFieldsHandler}
                    value={bio.lastName.content}
                    required={true}
                  />
                  {bio.lastName.isError && (
                    <ErrorBar errorText={bio.lastName.errorMessage} />
                  )}
                </Col>
                <Col md={24} lg={24} span={24}>
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
                </Col>
              </Row>
              <div className={styles.goBack}>
                <GroupedButtons data={buttonProps} />
              </div>
            </>
          )}
        </div>
      </AuthLayout>
      <Notification setOpen={setOpen} open={open.open} message={open.message} />
      {auth.Loading ? <Loader /> : null}
    </>
  );
};

export default SignUp;
