import React from "react";

import moment from "moment";
import FormControl from "@material-ui/core/FormControl";

class DateHelper {
  singleDateHandler = (date) => {
    let date2 = moment();
    switch (date) {
      case "y":
        date2 = date2.subtract(1, "d");
        break;
      case "t":
        date2 = date2;
        break;
      case "cdr":
      case "":
        date2 = false;
      default:
        let parsed = date.split("|");
        if (parsed[0] === "cdr") {
          date2 = moment(parsed[1]);
        } else {
          date2 = moment(date);
        }
        break;
    }
    if (date2 !== false) {
      date2 = date2.startOf("day")
      .format("YYYY-MM-DD HH:mm:ss");
    }
    return date2;
  };

  startDateHandler = (startDate) => {
    let date = moment();
    switch (startDate) {
      case "t":
        date = date;
        break;
      case "t-1":
        date = date.subtract(1, "d");
        break;
      case "t-2":
        date = date.subtract(2, "d");
        break;
      case "t-3":
        date = date.subtract(3, "d");
        break;
      case "y":
        date = date.subtract(1, "d");
        break;
      case "tw":
        date = date.subtract(7, "d");
        break;
      case "tm":
        date = date.startOf("month");
        break;
      case "lm":
        date = date.subtract(1, "M").startOf("month");
        break;
      case "ty":
        date = date.startOf("year");
        break;
      case "cdr":
      case "":
        date = false;
      default:
        let parsed = startDate.split("|");
        if (parsed[0] === "cdr") {
          date = moment(parsed[1]);
        } else {
          date = moment(startDate);
        }
        break;
    }
    if (date !== false) {
      date = date.startOf("day")
      .format("YYYY-MM-DD HH:mm:ss");
    }
    return date;
  };

  endDateHandler = (endDate) => {
    let date = moment();
    switch (endDate) {
      case "y":
        date = date.subtract(1, "d");
        break;
      case "lm":
        date = date.subtract(1, "M").endOf("month");
        break;
      case "cdr":
      case "":
        date = false;
        break;
      case "t":
      case "t-1":
      case "t-2":
      case "t-3":
      case "tw":
      case "tm":
      case "ty":
        date = date;
        break;
      default:
        let parsed = endDate.split("|");
        if (parsed[0] === "cdr") {
          date = moment(parsed[1]);
        } else {
          date = moment(endDate);
        }
    }
    if (date !== false) {
      date = date.endOf("day")
      .format("YYYY-MM-DD HH:mm:ss");
    }
    return date;
  };
}

export default DateHelper;
