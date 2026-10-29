import { useEffect } from "react";
import { notification } from "antd";
import { BellFilled, CloseOutlined } from "@ant-design/icons";

const Message = {
  success: "success",
  error: "error",
  info: "info",
  warning: "warning",
};

// Kept as a controlled component with the exact same {setOpen, open, message}
// API every caller already uses — antd's notification is an imperative
// singleton, so this wrapper triggers it internally instead of changing
// every call site.
const Notification = ({ setOpen, open, message }) => {
  const handleClose = () => {
    // Preserved exactly as before — some callers key their own state on
    // "open", others on "flag"; this always writes "flag", a pre-existing
    // inconsistency this wrapper isn't meant to fix.
    setOpen({
      flag: false,
      message: "",
    });
  };

  useEffect(() => {
    if (open && message !== "") {
      // longer messages stay up longer so the whole text can be read
      const text = typeof message === "string" ? message : "";
      const duration = Math.min(8, Math.max(3.5, text.length / 14));
      notification.open({
        title: message,
        placement: "topRight",
        duration,
        // antd's own time-left bar along the bottom (coloured in App.less);
        // it pauses, like the auto-close timer, while the pointer is over it
        showProgress: true,
        pauseOnHover: true,
        icon: (
          <span className="app-notification-icon">
            <BellFilled />
          </span>
        ),
        closeIcon: <CloseOutlined />,
        // a raised dark-teal card that flips in (see App.less)
        className: "app-teal-notification",
        onClose: handleClose,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, message]);

  return null;
};

export { Notification, Message };
