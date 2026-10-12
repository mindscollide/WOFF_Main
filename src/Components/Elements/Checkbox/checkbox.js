import React from "react";
import { Checkbox } from "antd";

const CustomCheckbox = ({ label, checkState }) => {
  // function onChange(e) {
  //   console.log(`checked = ${e.target.checked}`);
  // }

  return <Checkbox onChange={checkState}>{label}</Checkbox>;
};

export default CustomCheckbox;
