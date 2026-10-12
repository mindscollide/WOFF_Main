import React, { useEffect } from "react";
import { Layout, Typography, Tooltip } from "antd";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
// import Logout from '@material-ui/core/Logout';
import UserImage from "../../../assets/images/user.png";
import Logo from "../../../assets/images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../../store/actions/auth-actions";
import {
  getApprovalCount,
  getApprovals,
} from "../../../store/actions/wof-approvals-actions";
import {
  newRequestList,
  newRequestListCount,
} from "../../../store/actions/request-actions";
import Helper from "../../../Common/Functions/history_logout";
import "./header.css";
import { useHistory } from "react-router-dom";
import { disableGoBack } from "../../../store/actions/ui-actions";
import { makeTabAvtive } from "../../../store/actions/ui-actions";
const Header = ({ Notification, title, UserDetails }) => {
  console.log(Notification);
  const history = useHistory();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { wofApprovals, requestReducer, ui } = state;
  const { Title } = Typography;
  const { Header } = Layout;
  const Details = JSON.parse(localStorage.getItem("UserDetails"));
  const role = parseInt(JSON.parse(localStorage.getItem("role")));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  Helper.history = history;
  useEffect(() => {
    Helper.history = history;
  }, []);
  const openUserRequest = () => {
    console.log(Details.userID);
    dispatch(newRequestList(Details.userID));
  };
  useEffect(() => {
    console.log("DetailsDetails", wofApprovals.ApprovalsCount);
    if (Details.userID === 2) {
      dispatch(getApprovalCount(Details.userID));
    } else if (Details.roleID === 3) {
      dispatch(getApprovalCount(Details.userID));
    }
  }, []);
  useEffect(() => {
    // define increment counter part
    const tabsOpen = localStorage.getItem("tabsOpen");
    console.log("tabsOpen", tabsOpen);
    if (tabsOpen == null) {
      localStorage.setItem("tabsOpen", 1);
    } else {
      localStorage.setItem("tabsOpen", parseInt(tabsOpen) + parseInt(1));
    }

    // define decrement counter part
    window.onunload = function (e) {
      const newTabCount = localStorage.getItem("tabsOpen");
      if (newTabCount !== null) {
        localStorage.setItem("tabsOpen", newTabCount - 1);
      }
    };
    if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
      window.localStorage.isMySessionActive = "false";
    } else {
      const newTabCount2 = localStorage.getItem("tabsOpen");
      let value = localStorage.getItem("isMySessionActive");
      console.log("ali12345", value == "true", 3);
      if (value == "true") {
        console.log("ali12345", value == "true", 3);
        if (newTabCount2 - 1 == 0) {
          dispatch(signOut(history));
          window.localStorage.isMySessionActive = "false";
        } else {
          window.localStorage.isMySessionActive = "false";
        }
      }
    }
  }, []);

  // call user request list and user list count on refresh on reloaded
  useEffect(() => {
    if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
      let UserDetails = JSON.parse(localStorage.getItem("UserDetails"));
      let data = UserDetails.userID;
      dispatch(newRequestListCount(data));
      dispatch(newRequestList(data));
    }
  }, []);
  return (
    <Header className="header">
      {/* logo */}
      <div className="inner-container">
        <div className="logo-container">
          <img src={Logo} alt="logo" />
        </div>
        {/* middle text */}
        <div className="heading-main-container">
          <Title level={3} className="heading-main">
            {title}
          </Title>
        </div>
        {/* its go back button  */}
        {ui.isGoBack && (
          <Tooltip placement="bottom" title="Back">
            <div className="logout-icon-section">
              <div
                onClick={() => {
                  window.history.back();
                  dispatch(disableGoBack());
                }}
              >
                <div className="logout-icon">
                  <i className="icon-arrow-left icon-size-one "></i>
                </div>
              </div>
            </div>
          </Tooltip>
        )}
        {/* its notification icon */}
        {Notification !== null && Notification === true ? (
          <Tooltip placement="bottom" title="Notification">
            <div className="notify">
              <IconButton onClick={handleClick}>
                <Badge
                  badgeContent={
                    Details.roleID === 2
                      ? requestReducer.userRequestCount
                      : wofApprovals.ApprovalsCount
                  }
                  color="secondary"
                  overlap="circular"
                >
                  <NotificationsNoneIcon
                    fontSize="large"
                    className="noti-icon"
                  />
                </Badge>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                style={{ top: "45px", left: "35px" }}
              >
                <MenuItem>
                  {Details.roleID === 3 ? (
                    <ListItemIcon
                      onClick={() => {
                        dispatch(getApprovals(Details.userID));
                        localStorage.setItem("parent", "sub1");
                        localStorage.setItem("child", "1");
                        dispatch(makeTabAvtive());
                        history.push("/Wof/Manager/PendingApprovals");
                      }}
                    >
                      <i className="icon-chevron-right color-black icon-s mr-2"></i>
                      {wofApprovals.ApprovalsCount} Pending For Approval
                    </ListItemIcon>
                  ) : (
                    <ListItemIcon
                      onClick={() => {
                        dispatch(newRequestList(Details.userID));
                        localStorage.setItem("parent", "sub1");
                        localStorage.setItem("child", "15");
                        dispatch(makeTabAvtive());
                        history.push("/Wof/Admin/NewRequestList");
                      }}
                    >
                      <i className="icon-chevron-right color-black icon-s mr-2"></i>
                      {requestReducer.userRequestCount} New User Requests
                    </ListItemIcon>
                  )}
                </MenuItem>
              </Menu>
            </div>
          </Tooltip>
        ) : null}
        {/* its logout button */}
        <Tooltip placement="bottom" title="Logout">
          <div className="logout-icon-section">
            <div onClick={() => dispatch(signOut(history))}>
              <div className="logout-icon">
                <i className="icon-login icon-size-one "></i>
              </div>
            </div>
          </div>
        </Tooltip>
        {/* its avatar */}
        <div className="action-container">
          <div className="avatar">
            <div className="user-name">
              <p>
                {Details.firstName ? Details.firstName : null}{" "}
                {Details.lastName ? Details.lastName : null}
              </p>
            </div>
            <div className="user-figure">
              <img src={UserImage} alt="user" className={"user-icon-header"} />
            </div>
          </div>
        </div>
      </div>
    </Header>
  );
};

export default Header;
