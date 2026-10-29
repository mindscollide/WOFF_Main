import React from "react";
import { Button } from "antd";
import styles from "./styles.module.css";
import TextField from "../InputFields/TextField/text-field";

const InputWithBtn = ({
  click,
  ref,
  label,
  icon,
  text,
  placeholder,
  applyClass,
  helperText,
  textFieldSize,
  fullWidth,
  error,
  textLength,
  required,
  onchange,
  value,
  name,
  disable,
  isUpperCase,
  type,
  autoComplete,
  classpas,
}) => {
  return (
    <div className={`u-display-flex ${styles.attachedBar}`}>
      {/* flex:1 so the input fills all space the Button doesn't need */}
      <div style={{ flex: 1 }}>
        <TextField
          autoComplete={autoComplete}
          placeholder={placeholder ? placeholder : null}
          type={type ? type : null}
          isUpperCase={isUpperCase}
          disable={disable ? true : false}
          ref={ref}
          name={name}
          value={value}
          change={onchange}
          helper={helperText}
          size={textFieldSize}
          label={label}
          fullWidth={fullWidth}
          error={error && error}
          textLength={textLength}
          required={required}
          classpass={classpas}
        />
      </div>
      <Button
        onClick={click}
        size="large"
        disabled={disable ? true : false}
        type="primary"
        className={styles[`${applyClass}`]}
      >
        {/* See Button/button.js — a flex row with a fixed gap spaces both
            antd icons and the plain <i className="icon-..."> font icons. */}
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          {icon ? icon : null}
          {text ? <span>{text}</span> : null}
        </span>
      </Button>
    </div>
  );
};

export default InputWithBtn;
