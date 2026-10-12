import React, { useState } from "react";
import styles from "./upload.module.css";
import { Input, Button } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";

const CustomUpload = () => {
  const [uploadedFile, setUploadedFile] = useState(null);

  const uploadHandler = (e) => {
    const uplaodFilePath = e.target.value;
    setUploadedFile(uplaodFilePath);
  };

  return (
    <div className="u-display-flex">
      <Input value={uploadedFile} disabled={uploadedFile ? false : true} />
      <input
        className={styles.uploadText}
        id="contained-button-file"
        type="file"
        onChange={uploadHandler}
      />
      <label htmlFor="contained-button-file">
        <Button type="primary" className={styles.uploadButton} disabled>
          <ArrowUpOutlined />
        </Button>
      </label>
    </div>
  );
};

export default CustomUpload;
