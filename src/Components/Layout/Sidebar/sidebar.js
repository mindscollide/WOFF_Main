import React, { useState, useEffect } from "react";
import styles from "./sidebar.module.css";
import { Layout, Menu } from "antd";
import { Link, useLocation } from "react-router";
import { useDispatch } from "react-redux";
import { makeTabDisable } from "../../../store/actions/ui-actions";

const Sidebar = ({ Links, ui }) => {
  const { Sider } = Layout;
  const dispatch = useDispatch();
  // Sidebar only ever mounts under /Wof (see App.js) and isn't rendered
  // through a matched <Route>, so the base path is hardcoded (this was
  // useRouteMatch().path under react-router v5).
  const path = "/Wof";
  const location = useLocation();

  // Selected key lives in React state (initialized from localStorage) so the
  // controlled Menu reflects live selection.
  const [selectedKey, setSelectedKey] = useState(
    () => localStorage.getItem("child") || "1"
  );
  const selectKey = (parent, child) => {
    localStorage.setItem("parent", parent);
    localStorage.setItem("child", child);
    setSelectedKey(child);
  };

  // this use effect is for refreshing
  useEffect(() => {
    if (ui.activeEdit) {
      if (location.pathname === "/Wof/Admin/SystemAdminApprovedCases") {
        selectKey("sub2", "10");
      } else {
        selectKey("sub1", "2");
      }
    }
  }, [ui.activeEdit]);

  // this is use for active tab for indirect links (Header notification bell)
  useEffect(() => {
    if (ui.activeTab) {
      selectKey("sub1", "15");
    }
  }, [ui.activeTab]);

  const onSelect = ({ key, keyPath }) => {
    if (key !== "3") {
      dispatch(makeTabDisable());
    }
    selectKey(keyPath[1], keyPath[0]);
  };

  // antd v5+ builds the menu from an `items` array (SubMenu/Menu.Item
  // children are deprecated). Keys are unchanged: "sub1", "sub2", ... for
  // parents and Links.js keys for children, so localStorage parent/child
  // selection still lines up.
  const menuItems = Links.map((item, index) => ({
    key: `sub${index + 1}`,
    icon: <i className={`${item.icon}`}></i>,
    label: `${item.menuName}`,
    className: styles.menuMainItem,
    children: item.subMenu.map((nestedItem) => ({
      key: String(nestedItem.key),
      label: (
        <Link to={`${path}${nestedItem.link}`} className={styles.noLinkStyles}>
          {nestedItem.name}
        </Link>
      ),
    })),
  }));

  return (
    <Sider width={250} className={styles.sider}>
      <Menu
        mode="inline"
        selectedKeys={[ui.activeTab === true ? "15" : selectedKey]}
        defaultOpenKeys={[localStorage.getItem("parent") || "sub1"]}
        onSelect={onSelect}
        style={{ height: "100%", border: "none" }}
        items={menuItems}
      />
    </Sider>
  );
};

export default Sidebar;
