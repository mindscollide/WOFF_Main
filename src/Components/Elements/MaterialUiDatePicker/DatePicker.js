import 'date-fns';
import React from 'react';
import { withStyles, makeStyles } from "@material-ui/core/styles";
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
const CustomDatepicker = withStyles({
    root: {
      "& label.Mui-focused": {
        color: "white",
      },
      "& label": {
        fontSize: "0.9rem",
        color: "#b4b4b4",
      },
      
      "& .MuiOutlinedInput-root": {
        // height: 40,
        "& fieldset": {
          border: "1px solid #dee6e6",
          borderRadius: 0,
        },
        "&:hover fieldset": {
          border: "1px solid #dee6e6",
          borderRadius: 0,
        },
        "&.Mui-focused fieldset": {
          border: "1px solid #12B0E8",
          borderRadius: 0,
        },
      },
      
    },
  })(KeyboardDatePicker);
  
export default function MaterialUIPickers({
    name,
    value,
    change,
    size,
    DateRange,
    label
}) {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

  const handleDateChange = (date,value) => {
      console.log(date,value)
    setSelectedDate(date);
    change({ target: { name: name, value: value } });
  };
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <CustomDatepicker
          disableFuture={DateRange}
          disableToolbar
          size={size}
          variant="inline"
          name={name}
          format="dd-mm-yyyy"
          margin="normal"
          id="date-picker-inline"
          label={label}
          value={selectedDate}
          onChange={handleDateChange}
          inputVariant="outlined"
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
    </MuiPickersUtilsProvider>
  );
}
