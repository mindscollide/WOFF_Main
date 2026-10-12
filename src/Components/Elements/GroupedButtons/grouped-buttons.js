import React from "react";
import { Box } from "@material-ui/core";
import { Space } from "antd";
import Button from "../Button/button";

const GroupedButtons = ({ data }) => {
  console.log("handleDescription a",data.primaryButton.disable)
  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        style={{ width: "100%!important" }}
        justifyContent="center"
      >
        <Space>
          <Button
            applyClass={data.primaryButton.class}
            text={data.primaryButton.text}
            click={data.primaryButton.click}
            size={data.primaryButton.size}
            icon={data.primaryButton.icon}
            endIcon={data.primaryButton.endIcon}
            disableBtn={data.primaryButton.disable}
          />
          <Button
            applyClass={data.secondaryButton.class}
            text={data.secondaryButton.text}
            click={data.secondaryButton.click}
            size={data.secondaryButton.size}
            icon={data.secondaryButton.icon}
            endIcon={data.secondaryButton.endIcon}
            disableBtn={data.secondaryButton.disable}
          />
        </Space>
      </Box>
    </>
  );
};

export default GroupedButtons;
