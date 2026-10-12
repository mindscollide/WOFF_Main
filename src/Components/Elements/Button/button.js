import React from "react";
import { Button } from "@material-ui/core";
import styles from "./button.module.css";

const CustomButton = ({
  text,
  icon,
  click,
  applyClass,
  endIcon,
  disableBtn,
  disableClass,
  size,
  align,
  type
}) => {
  return (
    <>
      <Button
        type={type}
        size={size}
        startIcon={icon ? icon : null}
        className={styles[applyClass] + " " + styles[disableClass]}
        disabled={disableBtn}
        onClick={click}
        endIcon={endIcon ? endIcon : null}
        align={align}
      >
        {text}
      </Button>
    </>
  );
};

export default CustomButton;
