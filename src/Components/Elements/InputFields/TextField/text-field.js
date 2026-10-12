import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { TextField, Box } from "@material-ui/core";
// import NumberFormat from 'react-number-format';
import InputMask from "react-input-mask";
const CustomTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "white",
    },
    "& label": {
      fontSize: "0.9rem",
      color: "#b4b4b4",
    },

    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        border: "1px solid #dee6e6",
        borderRadius: 0,
      },
      "&:hover fieldset": {
        border: "1px solid #dee6e6",
        borderRadius: 0,
      },
      "&.Mui-focused fieldset": {
        border: "1px solid #12B0E8",
        borderRadius: 0,
      },
    },
  },
})(TextField);

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

const CustomizedTextField = ({
  ref,
  id,
  focus,
  pattern,
  value,
  label,
  text,
  width,
  required,
  disable,
  icon,
  click,
  type,
  validation,
  size,
  helper,
  error,
  fullWidth,
  multiline,
  rows,
  placeholder,
  textLength,
  margin,
  change,
  name,
  minLength,
  isUpperCase,
  numLength,
  autoComplete,
  classpass,
}) => {
  const classes = useStyles();

  return (
    <>
      <CustomTextField
        ref={ref && ref}
        id={id && id}
        onFocus={focus}
        name={name && name}
        onChange={change}
        style={{
          width: `${width}`,
          margin: `${margin}`,
          webkitTextSecurity: classpass,
        }}
        placeholder={placeholder && placeholder}
        rows={rows}
        pattern={pattern}
        multiline={multiline}
        value={value === null ? "" : value}
        fullWidth={fullWidth}
        label={label && <small>{label}</small>}
        variant="outlined"
        size={size}
        autoComplete={autoComplete}
        helperText={error && helper}
        error={error}
        type={type}
        disabled={disable}
        required={required ? true : false}
        inputProps={{
          maxLength: textLength,
          minLength: minLength,
          style: { textTransform: isUpperCase ? "uppercase" : "none" },
        }}
        // onInput={(e) => {
        //   e.target.value = numLength
        //     ? Math.max(0, parseInt(e.target.value))
        //         .toString()
        //         .slice(0, numLength)
        //     : e.target.value;
        // }}
      />
    </>
  );
};
export default CustomizedTextField;
