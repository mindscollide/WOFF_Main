import React from "react";
import styles from "./error.module.css";
// MUI's <Fade in timeout={1000}> + <Typography variant="caption" display="block">,
// reproduced with a CSS fade-in and a block-level caption-sized span.
const ErrorBar = ({ errorText }) => {
  return (
    <div className={`${styles.error} ${styles.fadeIn}`}>
      {" "}
      <span className={styles.caption}>{errorText}</span>
    </div>
  );
};

export default ErrorBar;
