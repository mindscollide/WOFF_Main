import React from "react";
import { Input } from "antd";
import { NumericFormat } from "react-number-format";
import styles from "../floating-label.module.css";

export const FormattedInputs = ({
  autoComplete,
  label,
  Label,
  value,
  size,
  change,
  name,
  required,
  disable,
  type,
  textLength,
  minLength,
  fullWidth,
  placeholder,
  onblur,
  maxLength,
}) => {
  // Both label props render the same floating chip on the field's border
  // (as in Fraud main); `label` used to print a bold caption above the field.
  const floating = Label || label;
  return (
    <>
      <div className={floating ? styles.wrapper : undefined}>
        {floating ? (
          <span className={styles.floatingLabel}>
            {floating}
            {required ? <span style={{ color: "#FC4343" }}> *</span> : null}
          </span>
        ) : null}
        {/* react-number-format v5's NumericFormat (NumberFormat in v4); customInput renders antd's Input as the
            actual DOM element and handles all ref-forwarding internally —
            this replaces the previous MUI TextField + inputComponent +
            hand-built forwardRef/inputRef-stripping dance entirely, rather
            than porting it (that plumbing caused a real crash earlier in
            this migration and was fragile). */}
        <NumericFormat
          customInput={Input}
          thousandsGroupStyle="thousand"
          decimalSeparator="."
          thousandSeparator={true}
          decimalScale={2}
          fixedDecimalScale={true}
          type={type}
          value={value === null ? "" : value}
          autoComplete={autoComplete}
          onBlur={onblur}
          placeholder={placeholder}
          size="large"
          name={name}
          disabled={disable}
          maxLength={maxLength}
          minLength={minLength}
          style={{
            width: fullWidth ? "100%" : undefined,
          }}
          onValueChange={(values) => {
            // v5 also fires this when the value prop changes; read-only
            // fields (e.g. the Total boxes) are rendered without a handler
            if (typeof change !== "function") return;
            change({
              target: {
                name: name,
                value: values.value,
              },
            });
          }}
        />
      </div>
    </>
  );
};
