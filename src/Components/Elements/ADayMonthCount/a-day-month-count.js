import React from "react";

import { Select } from "antd";

const ADayMonthCount = ({size,givenWidth,placeholder,data}) => {
  console.log(data)
  const { Option } = Select;
  const givenData=[...data];
  const children = [];
  for (let i = 0; i < givenData.length; i++) {
    children.push(
      <Option key={i}>{givenData[i]}</Option>
    );
  }

  function handleChange(value) {
    console.log(`selected ${value}`);
  }
  return (
    <>
      <Select
        size={size}
        style={{ width: givenWidth }}
        mode="multiple"
        allowClear
        placeholder={placeholder}
        // defaultValue={["a10", "c12"]}
        onChange={handleChange}
      >
        {children}
      </Select>
    </>
  );
};

export default ADayMonthCount;
