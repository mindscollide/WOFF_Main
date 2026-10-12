import * as React from 'react';
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from "@material-ui/core/styles";
import NumberFormat from 'react-number-format';
import TextField from '@material-ui/core/TextField';
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
export const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(props, ref) {
  const { onChange,textLength, ...other } = props;
  return (
    <NumberFormat
    thousandsGroupStyle="thousand"
    decimalSeparator="."
    displayType="input"
    type={props.type}
    value={props.value}
    thousandSeparator={true}
    fixedDecimalScale={true}
    decimalScale={2} 
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
    />
  );
});

NumberFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export const FormattedInputs = ({
    label,
    Label,
    value,
    size,
    change,
    name,
    variant,
    required,
    numLength,
    disable,
    type,
    textLength,
    minLength,
    fullWidth,
    placeholder,
    onblur
})=> {
  return (
    <>
   {label?<b style={{ fontSize: "0.7rem" }}>{label}
   {required?<i style={{ fontSize: "0.7rem" ,color:"red"}}>*</i>:null}</b>:null} 
     <CustomTextField
        onBlur={onblur}
        placeholder={placeholder}
        label={Label && <small>{Label}</small>}
        value={value === null ? "" : value}
        type={type}
        size={size}
        onChange={change}
        name={name}
        disabled={disable}
        id="formatted-numberformat-input"
        InputProps={{
          maxLength: textLength,
          minLength: minLength,
          inputComponent: NumberFormatCustom,
        }}
        variant="outlined"
        fullWidth={fullWidth}
        required={required}
      />
    </>
     
  );
}


















