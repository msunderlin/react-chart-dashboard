import 'moment';
import React from 'react';
import MomentUtils from '@date-io/moment';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
  

const DatePicker = (props)=>{

    return (
        <MuiPickersUtilsProvider utils={MomentUtils}>
 <KeyboardDatePicker
 disableToolbar
variant={props.variant}
          margin="normal"
          id={props.id}
          label={props.label}
          format="MM/DD/YYYY"
          value={props.date}
          onChange={props.handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
            </MuiPickersUtilsProvider>
    );
}



export default DatePicker;