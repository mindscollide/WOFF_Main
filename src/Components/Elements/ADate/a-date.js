import React from "react";
import { DatePicker, Space, Typography } from "antd";
import { Box } from "@material-ui/core";

const ADate = ({ label,width,size,placeholder }) => {
  const { Text } = Typography;


  function onChange(date, dateString) {
    console.log(date, dateString);
  }

  return (
 
      <Box display="flex" alignItems="center">
        <Space size={12}>
          <Text>{label}</Text>
          <DatePicker placeholder={placeholder}  onChange={onChange} size={size} style={{width:`${width}`}}/>
        </Space>
      </Box>
    
  );
};

export default ADate;
