import React, { useState } from "react";
import styles from "./upload.module.css";
import { Input } from "antd";
import Button from "@material-ui/core/Button";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import { Box } from "@material-ui/core";

const CustomUpload = () => {
  const [uploadedFile, setUploadedFile] = useState(null);

  const uploadHandler = (e) => {
    const uplaodFilePath = e.target.value;
    setUploadedFile(uplaodFilePath);
  };

  return (
    <Box display="flex">
      <Input value={uploadedFile} disabled={uploadedFile ? false : true} />
      <input
        className={styles.uploadText}
        id="contained-button-file"
        type="file"
        onChange={uploadHandler}
      />
      <label htmlFor="contained-button-file">
        <Button
          variant="contained"
          color="primary"
          component="span"
          className={styles.uploadButton}
          disabled
        >
          <ArrowUpwardIcon />
        </Button>
      </label>
    </Box>
  );
};

export default CustomUpload;
