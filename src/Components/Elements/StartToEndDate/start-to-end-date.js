import React from "react";
import { DatePicker, Space, Typography } from "antd";
import { Box } from "@material-ui/core";
import moment from "moment";
const StartToEndDate = ({ label, width, size, change, DateRange ,startvalue,endvalue}) => {
  const { Text } = Typography;
  const { RangePicker } = DatePicker;
  let dateFormat = "DD-MM-YYYY"
  const picker = (e, dateStr) => {
    const date = {
      name: "dater",
      startDate: dateStr[1] ? dateStr[1] : null,
      endDate: dateStr[0] ? dateStr[0] : null,
    };
    change(date, null);
  };
  const disabledDate = (value) => {
    // Can not select future dates
    return value && value > moment().endOf("day");
  };
  return (
    <Box display="flex" alignItems="center">
      {label ? <Text style={{ width: "25%" }}>{label}</Text> : null}
      <RangePicker
        disabledDate={DateRange ? disabledDate : false}
        onChange={picker}
        value={startvalue && endvalue?[moment(startvalue, dateFormat), moment(endvalue, dateFormat)]:null}
        format={dateFormat}
        size={size}
        style={{ width: `${width}`, marginLeft: "5px" }}
      />
    </Box>
  );
};

export default StartToEndDate;
