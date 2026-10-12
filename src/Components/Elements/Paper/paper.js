import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const CustomPaper = ({
  children,
  variant,
  height,
  padding,
  mt,
  mb,
  ml,
  mr,
}) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexWrap: "wrap",
      "& > *": {
        width: "100%",
        height: `${height}`,
        padding: `${padding}%`,
        marginTop: `${mt}%`,
        marginBottom: `${mb}%`,
        marginLeft: `${ml}%`,
        marginRight: `${mr}%`,
      },
    },
  }));

  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <Paper variant={variant && "outlined"} elevation={0}>
          {children}
        </Paper>
      </div>
    </>
  );
};

export default CustomPaper;
