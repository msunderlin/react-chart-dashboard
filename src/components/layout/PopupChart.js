import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import moment from "moment";

import ChartWrapper from "../charts/ChartWrapper";

const PopupChart = props => {
  if (!props.show_popup) {
    return "";
  } else {
    let year = moment(props.popupchart.params.start_date).year();
    let date = moment(props.context_date)
      .year(year)
      .format("l");

    let popupchart = props.popupchart;

    popupchart.params.start_date = moment(props.context_date)
      .year(year)
      .startOf("day")
      .format("YYYY-MM-DD HH:mm:ss");
    popupchart.params.end_date = moment(props.context_date)
      .year(year)
      .endOf("day")
      .format("YYYY-MM-DD HH:mm:ss");
    popupchart.params.interval = "hourly";
    return (
      props.show_popup && (
        <Dialog
          maxWidth={false}
          open={Boolean(props.show_popup)}
          onClose={props.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            {popupchart.title} - Hourly Detail for {date}
          </DialogTitle>
          <DialogContent>
            <div style={{ height: "60vh", width: "60vw" }}>
              <ChartWrapper chart={popupchart} key={"popup"} />
            </div>
          </DialogContent>
        </Dialog>
      )
    );
  }
};

export default PopupChart;
