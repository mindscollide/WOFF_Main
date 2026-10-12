import React from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import styles from "../floating-label.module.css";

// lets dayjs parse "DD-MM-YYYY"-style strings with an explicit format
dayjs.extend(customParseFormat);
const CustomDatePicker = ({
  label,
  width,
  size,
  placeholder,
  change,
  name,
  disable,
  value,
  DateRange,
  required,
}) => {
  let dateFormat = "DD-MM-YYYY";
  function onChange(date, dateString) {
    change({ target: { name: name, value: dateString } });
  }

  const disabledDate = (value) => {
    return value && value > dayjs().endOf("day");
  };
  return (
    <>
      {required ? <i className="u-font-size-0_7rem u-color-red">*</i> : null}
      <div className={`${label ? styles.wrapper : undefined} u-display-flex u-align-items-center`}>
        {label ? <span className={styles.floatingLabel}>{label}</span> : null}
        <DatePicker
          disabledDate={DateRange ? disabledDate : false}
          disabled={disable}
          format={dateFormat}
          value={value ? dayjs(value, dateFormat) : null}
          placeholder={placeholder}
          onChange={onChange}
          size={size}
          style={{ width: `${width}`, marginLeft: label ? 0 : "5px" }}
          required={required}
        />
      </div>
    </>
  );
};
export default CustomDatePicker;
