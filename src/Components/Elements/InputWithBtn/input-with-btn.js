import React, { useState } from "react";
import styles from "./styles.module.css";
import Button from "@material-ui/core/Button";
import { Box } from "@material-ui/core";
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
  btnSize,
  fullWidth,
  error,
  endIcon,
  textLength,
  required,
  onchange,
  value,
  name,
  disable,
  isUpperCase,
  type,
  size,
  autoComplete,
  classpas,
}) => {
  return (
    <Box display="flex">
      <TextField
        autoComplete={autoComplete}
        placeholder={placeholder ? placeholder : null}
        size={size}
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
        InputLabelProps={{
          shrink: true,
        }}
        classpass={classpas}
      />
      <Button
        onClick={click}
        size={btnSize}
        disabled={disable ? true : false}
        variant="contained"
        color="primary"
        className={styles[`${applyClass}`]}
        startIcon={icon && icon}
      >
        {text}
      </Button>
    </Box>
  );
};

export default InputWithBtn;
