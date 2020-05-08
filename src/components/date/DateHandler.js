import React from "react";
import DropDown from "../dropdowns/DropDown";
import DatePicker from "../pickers/DatePicker";
import moment from "moment";
import FormControl from "@material-ui/core/FormControl";

class DateHandler extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      is_dynamic: true,
      value: ""
    };
  }
  handleDropdownChange = event => {
    let v = event.target.value;
    this.setState({
      value: v
    });
    if (v === "cdr") {
      this.setState({
        is_dynamic: false
      });
    } else {
      this.setState({
        is_dynamic: true
      });
      this.setDates(v);
    }
  };
  setDates = (single, value) => {
    let date = moment();
    let startDate = moment();
    let endDate = moment();
    switch (value) {
      case "y":
        //yesterday
        if (single) {
          date = date.subtract(1, "d");
        }
        startDate = startDate.subtract(1, "d");
        endDate = startDate;
        break;
      case "tw":
        //this week only modify start date
        startDate = startDate.subtract(7, "d");
        break;
      case "tm":
        startDate = startDate.startOf("month");
        break;
      case "lm":
        startDate = startDate.subtract(1, "M").startOf("month");
        endDate = endDate.subtract(1, "M").endOf("month");
        break;
      case "ty":
        startDate = startDate.startOf("year");
        break;
      case "cdr":
      default:
        break;
    }
    if (single) {

      this.props.handleChange();
      
    } else {
      this.props.handleStartDateChange(startDate);
      this.props.handleEndDateChange(endDate);
    }
  };
  render() {
    if (this.props.single) {
      return (
        <React.Fragment>
          <DropDown
            label="Common"
            size={this.props.size}
            value={this.state.value}
            handleChange={this.handleDropdownChange}
            options={[
              {
                text: "Today",
                value: "t"
              },
              {
                text: "Yesterday",
                value: "y"
              },
              {
                text: "This Week",
                value: "tw"
              },
              {
                text: "This Month",
                value: "tm"
              },
              {
                text: "Last Month",
                value: "lm"
              },
              {
                text: "This Year",
                value: "ty"
              },
              {
                text: "Custom Date Range",
                value: "cdr"
              }
            ]}
            inputProps={{
              name: "set-date-type",
              id: "set-date-type"
            }}
          />
          <React.Fragment>
            <br />
            <FormControl variant="filled">
              <DatePicker
                size={this.props.size}
                date={this.props.startDate}
                label="Start Date"
                handleDateChange={this.props.handleStartDateChange}
                handleChange = {this.props.handlChange}
                variant="dialog"
                id="date-picker-start"
              />
            </FormControl>
            </React.Fragment>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <DropDown
            label="Common"
            size={this.props.size}
            value={this.state.value}
            handleChange={this.handleDropdownChange}
            options={[
              {
                text: "Today",
                value: "t"
              },
              {
                text: "Yesterday",
                value: "y"
              },
              {
                text: "This Week",
                value: "tw"
              },
              {
                text: "This Month",
                value: "tm"
              },
              {
                text: "Last Month",
                value: "lm"
              },
              {
                text: "This Year",
                value: "ty"
              },
              {
                text: "Custom Date Range",
                value: "cdr"
              }
            ]}
            inputProps={{
              name: "set-date-type",
              id: "set-date-type"
            }}
          />
          <React.Fragment>
            <br />
            <FormControl variant="filled">
              <DatePicker
                size={this.props.size}
                date={this.props.startDate}
                label="Start Date"
                handleDateChange={this.props.handleStartDateChange}
                variant="dialog"
                id="date-picker-start"
              />
            </FormControl>
            <FormControl variant="filled">
              <DatePicker
                size={this.props.size}
                date={this.props.endDate}
                label="End Date"
                handleDateChange={this.props.handleEndDateChange}
                variant="dialog"
                id="date-picker-end"
              />
            </FormControl>
          </React.Fragment>
        </React.Fragment>
      );
    }
  }
}

export default DateHandler;
