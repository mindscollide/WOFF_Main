import React, { useEffect } from "react";
import { Layout, Typography, Tooltip, Badge, Dropdown } from "antd";
import UserImage from "../../../assets/images/user.png";
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
import { useNavigate } from "react-router";
import { disableGoBack } from "../../../store/actions/ui-actions";
import { makeTabAvtive } from "../../../store/actions/ui-actions";
import { BellOutlined as NotificationsNoneIcon } from "@ant-design/icons";
const Header = ({ Notification, title, UserDetails }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wofApprovals = useSelector((state) => state.wofApprovals);
  const requestReducer = useSelector((state) => state.requestReducer);
  const ui = useSelector((state) => state.ui);
  const { Title } = Typography;
  const { Header } = Layout;
  const Details = JSON.parse(localStorage.getItem("UserDetails"));
  // Bell dropdown: one entry, which depends on the role (3 = Manager sees
  // pending approvals, otherwise System Admin sees new user requests).
  const notificationItems = [
    Details.roleID === 3
      ? {
          key: "approvals",
          label: (
            <span>
              <i className="icon-chevron-right color-black icon-s mr-2"></i>
              {wofApprovals.ApprovalsCount} Pending For Approval
            </span>
          ),
          onClick: () => {
            dispatch(getApprovals(Details.userID));
            localStorage.setItem("parent", "sub1");
            localStorage.setItem("child", "1");
            dispatch(makeTabAvtive());
            navigate("/Wof/Manager/PendingApprovals");
          },
        }
      : {
          key: "requests",
          label: (
            <span>
              <i className="icon-chevron-right color-black icon-s mr-2"></i>
              {requestReducer.userRequestCount} New User Requests
            </span>
          ),
          onClick: () => {
            dispatch(newRequestList(Details.userID));
            localStorage.setItem("parent", "sub1");
            localStorage.setItem("child", "15");
            dispatch(makeTabAvtive());
            navigate("/Wof/Admin/NewRequestList");
          },
        },
  ];
  Helper.navigate = navigate;
  useEffect(() => {
    Helper.navigate = navigate;
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

    // the decrement counter part is the "pagehide" listener in index.html
    if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
      window.localStorage.isMySessionActive = "false";
    } else {
      const newTabCount2 = localStorage.getItem("tabsOpen");
      let value = localStorage.getItem("isMySessionActive");
      console.log("ali12345", value == "true", 3);
      if (value == "true") {
        console.log("ali12345", value == "true", 3);
        if (newTabCount2 - 1 == 0) {
          dispatch(signOut(navigate));
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
      <div className="inner-container">
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
                className="header-icon-card"
                onClick={() => {
                  window.history.back();
                  dispatch(disableGoBack());
                }}
              >
                <i className="icon-arrow-left icon-size-one "></i>
              </div>
            </div>
          </Tooltip>
        )}
        {/* its notification icon */}
        {Notification !== null && Notification === true ? (
          <Tooltip placement="bottom" title="Notification">
            <div className="notify">
              <Dropdown
                menu={{ items: notificationItems }}
                trigger={["click"]}
                placement="bottomRight"
              >
                <span className="noti-icon">
                  <Badge
                    count={
                      Details.roleID === 2
                        ? requestReducer.userRequestCount
                        : wofApprovals.ApprovalsCount
                    }
                    offset={[-2, 8]}
                  >
                    <span className="header-icon-card">
                      <NotificationsNoneIcon />
                    </span>
                  </Badge>
                </span>
              </Dropdown>
            </div>
          </Tooltip>
        ) : null}
        {/* its logout button */}
        <Tooltip placement="bottom" title="Logout">
          <div className="logout-icon-section">
            <div
              className="header-icon-card"
              onClick={() => dispatch(signOut(navigate))}
            >
              <i className="icon-login icon-size-one "></i>
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
