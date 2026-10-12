import { Checkbox } from "antd";
import { Box } from "@material-ui/core";
function onChange(checkedValues) {
  console.log("checked = ", checkedValues);
}
const Styles={
 parentCheckBox:{
  color: "#025f5c",
  fontWeight: "600",
 },
 childCheckbox:{
   marginTop:10
 }
}
const CheckBoxesList = () => {
  return (
    <>
      <Checkbox.Group style={{ width: "100%" ,padding:10}} onChange={onChange}>
        <Box display="flex" flexDirection="column" fullWidth>
          <Checkbox value="CaptureWriteOff">
            <span  style={Styles.parentCheckBox}> Capture Write Off</span>
          </Checkbox>
          <Checkbox value="AddWriteOff" style={Styles.childCheckbox}>Add Write Off</Checkbox>
          <Checkbox value="EditWriteOff" style={Styles.childCheckbox}>Edit Write Off</Checkbox>
        </Box>
      </Checkbox.Group>

      <div style={{ marginTop: "20px" }} />
      <Checkbox.Group style={{ width: "100%" }} onChange={onChange}>
        <Box display="flex" flexDirection="column">
          <Checkbox value="Reports">
            <span style={Styles.parentCheckBox}>Reports</span>
          </Checkbox>
          <Checkbox value="CompleteReport" style={Styles.childCheckbox}>Complete Report</Checkbox>
          <Checkbox value="Credit Policy" style={Styles.childCheckbox}>Credit Policy</Checkbox>
          <Checkbox value="Balance Sheet Format" style={Styles.childCheckbox}>Balance Sheet Format</Checkbox>
        </Box>
      </Checkbox.Group>
      <div style={{ marginTop: "20px" }} />
      <Checkbox.Group style={{ width: "100%" }} onChange={onChange}>
        <Box display="flex" flexDirection="column">
          <Checkbox value="Audit rail">
            <span style={Styles.parentCheckBox}> Audit Trail</span>
          </Checkbox>
          <Checkbox value="UserActivity" style={Styles.childCheckbox}>User Activity</Checkbox>
          <Checkbox value="UserLoginHistory" style={Styles.childCheckbox}>User Login History</Checkbox>
          <Checkbox value="CurrentlyLoggedinUsers" style={Styles.childCheckbox}>
            Currently Logged in Users
          </Checkbox>
        </Box>
      </Checkbox.Group>
    </>
  );
};

export default CheckBoxesList;
