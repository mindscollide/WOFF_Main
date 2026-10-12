import React, { useState, useEffect } from "react";
import styles from "./sidebar.module.css";
import { Layout, Menu } from "antd";
import { Link, useRouteMatch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { makeTabDisable } from "../../../store/actions/ui-actions";
import { useLocation } from "react-router-dom";
const Sidebar = ({ Links, ui }) => {
  const { SubMenu } = Menu;
  const { Sider } = Layout;
  const dispatch = useDispatch();
  const route = useRouteMatch();
  const store = useSelector((state) => state);
  const { ListOFWriteOff } = store.writeOffCases;
  const path = route.path;
  var parent, child;
  parent = localStorage.getItem("parent");
  child = localStorage.getItem("child");
  if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
    parent = localStorage.getItem("parent");
    child = localStorage.getItem("child");
  }

  const location = useLocation();
  console.log(
    "locationlocation",
    location.pathname === "/Wof/Admin/SystemAdminApprovedCases"
  );
  // this use effect is for refreshing
  useEffect(() => {
    if (ui.activeEdit) {
      // window.location.reload();
      if (location.pathname === "/Wof/Admin/SystemAdminApprovedCases") {
        localStorage.setItem("parent", "sub2");
        localStorage.setItem("child", "10");
      } else {
        localStorage.setItem("parent", "sub1");
        localStorage.setItem("child", "2");
      }
    }
  }, [ui.activeEdit]);

  // this is use for active tab for indirect likns
  useEffect(() => {
    if (ui.activeTab) {
      localStorage.setItem("parent", "sub1");
      localStorage.setItem("child", "15");
    }
    console.log("At Sidebar: ", ui.activeTab);
  }, [ui.activeTab]);
  return (
    <Sider width={250} className={styles.sider}>
      <Menu
        mode="inline"
        defaultSelectedKeys={[child ? child : "1"]}
        // defaultOpenKeys={["sub1","sub2"]}
        // onSelect={(e) => {
        //   // if (e.key !== "3") {
        //   //   console.log("make tab disable");
        //   //   _makeTabDisable();
        //   // }
        //   localStorage .setItem("parent", e.keyPath[1]);
        //   localStorage .setItem("child", e.keyPath[0]);
        // }}
        // selectedKeys={makeTabActive === true ? ["3"] : undefined}
        defaultSelectedKeys={[
          localStorage.getItem("child") !== ""
            ? localStorage.getItem("child")
            : "1",
        ]}
        defaultOpenKeys={[
          localStorage.getItem("parent") !== ""
            ? localStorage.getItem("parent")
            : "sub1",
        ]}
        selectedKeys={
          ui.activeTab === true ? ["15"] : localStorage.getItem("child")
        }
        onSelect={(e) => {
          if (e.key !== "3") {
            console.log("make tab disable");
            dispatch(makeTabDisable());
          }

          localStorage.setItem("parent", e.keyPath[1]);
          localStorage.setItem("child", e.keyPath[0]);
        }}
        style={{ height: "100%", border: "none!important" }}
      >
        {Links.length > 0
          ? Links.map((item, index) => {
              return (
                <SubMenu
                  key={`sub${index + 1}`}
                  icon={<i className={`${item.icon}`}></i>}
                  title={`${item.menuName}`}
                  className={styles.menuMainItem}
                >
                  {item
                    ? item.subMenu.map((nestedItem, nestedIndex) => {
                        return (
                          <Menu.Item key={nestedItem.key}>
                            <Link
                              to={`${path}${nestedItem.link}`}
                              className={styles.noLinkStyles}
                            >
                              {nestedItem.name}
                            </Link>
                          </Menu.Item>
                        );
                      })
                    : null}
                </SubMenu>
              );
            })
          : null}
      </Menu>
    </Sider>
  );
};

export default Sidebar;
