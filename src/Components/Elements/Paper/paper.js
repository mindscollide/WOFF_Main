import React from "react";

// A plain div (MUI's Paper was always elevation={0} with square corners): the
// only visual effect is the optional 1px border when `variant` is truthy.
//
// `section`: one block of a Capture Write-Off add / edit / view form, shown
// as a rounded light-teal (#E8F3F3) card. Stacked sections sit 20px apart
// (App.less, .form-section).
//
// `page`: wraps a whole page (reports, approved / revert cases). The main card
// already provides the page padding, so this adds none of its own — every
// page then starts at the same left and right edge.
const CustomPaper = ({
  children,
  variant,
  height,
  padding,
  mt,
  mb,
  ml,
  mr,
  section,
  page,
}) => {
  return (
    <div
      className={section ? "form-section" : undefined}
      style={{ display: "flex", flexWrap: "wrap" }}
    >
      <div
        style={{
          width: "100%",
          height: `${height}`,
          padding: section ? "4px 20px 20px" : page ? 0 : `${padding}%`,
          marginTop: `${mt}%`,
          marginBottom: `${mb}%`,
          marginLeft: `${ml}%`,
          marginRight: `${mr}%`,
          border: variant ? "1px solid rgba(0,0,0,0.12)" : "none",
          borderRadius: section ? 12 : 0,
          background: section ? "#E8F3F3" : "#FFFFFF",
          position: section ? "relative" : undefined,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default CustomPaper;
