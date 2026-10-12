import React from "react";
import styles from "./error.module.css";
import Fade from "@material-ui/core/Fade";
import Typography from "@material-ui/core/Typography";
const ErrorBar = ({ errorText }) => {
  return (
    <Fade in timeout={1000}>
      <div className={styles.error}>
        {" "}
        <Typography variant="caption" display="block">
          {errorText}
        </Typography>
      </div>
    </Fade>
  );
};

export default ErrorBar;
