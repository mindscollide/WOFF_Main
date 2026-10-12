import React from "react";
import { DatePicker, Typography } from "antd";
import { Box } from "@material-ui/core";
import moment from "moment"
const CustomDatePicker = ({
  label,
  width,
  size,
  placeholder,
  change,
  name,
  disable,
  value,
  DateRange
}) => {
  const { Text } = Typography;
  let dateFormat = "DD-MM-YYYY"
  function onChange(date, dateString) {
    change({ target: { name: name, value: dateString } });
  }

  const disabledDate = (value) => {
    return value && value > moment().endOf('day');
  }
  return (
    <Box display="flex" alignItems="center">
      <Text>{label}</Text>
      <DatePicker
        disabledDate={DateRange?disabledDate:false}
        disabled={disable}
        format={dateFormat}
        value={value?moment(value, dateFormat):null}
        placeholder={placeholder}
        onChange={onChange}
        size={size}
        style={{ width: `${width}`, marginLeft: "5px" }}
      />
    </Box>
  );
};
export default CustomDatePicker;