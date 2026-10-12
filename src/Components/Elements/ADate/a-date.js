import React from "react";
import { DatePicker, Space, Typography } from "antd";

const ADate = ({ label,width,size,placeholder }) => {
  const { Text } = Typography;


  function onChange(date, dateString) {
    console.log(date, dateString);
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center"
      }}>
      <Space size={12}>
        <Text>{label}</Text>
        <DatePicker placeholder={placeholder}  onChange={onChange} size={size} style={{width:`${width}`}}/>
      </Space>
    </div>
  );
};

export default ADate;
