import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import EditHelper from "../edit/EditHelper";
import moment from "moment";

import PopupChartWrapper from "../charts/PopupChartWrapper";
class PopupChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = { widget: null };
  }
  editWidget = null;
  async componentDidMount() {
    if (!this.props.show_popup) {
      return "";
    }
    this.editWidget = new EditHelper();
    let widget = await this.editWidget
      .initalizeData(this.props.popupchart)
      .then((widget) => {
        this.setState({ widget });
      });
  }
  async componentDidUpdate() {
    if (this.editWidget === null) {
      this.editWidget = new EditHelper();
    }
    if (!this.props.show_popup) {
      return "";
    }
    if(this.state.widget !== null){
      return "";
    }
    let props = this.props;
    let widget = await this.editWidget
      .initalizeData(this.props.popupchart)
      .then((widget) => {
        this.setState({ widget });
      });
    widget = this.state.widget;
    let params = widget.widgetParams;
    let popupchart = props.popupchart;
    let year = moment(params.start_date).year();
    let start_date = moment(props.context_date)
      .year(year)
      .startOf("day")
      .format("YYYY-MM-DD HH:mm:ss");
    let end_date = moment(props.context_date)
      .year(year)
      .endOf("day")
      .format("YYYY-MM-DD HH:mm:ss");
    params.data_interval = "hourly";
    params.start_date = start_date;
    params.interval = 50000;
    widget.widgetParams.end_date = end_date;
    params = JSON.stringify(params);
    widget.widgetParams = params;
    widget.widget.params = params;
    widget.widget_url = await this.editWidget.buildUrl(
      widget.widget,
      widget.source,
      widget.sourceParams
    );
    console.log(widget);
    this.setState((state) => ({
      widget,
    }));
  }
  handleStartDateChange = (date) => {
    let widget = { ...this.state.widget };
    let params = "";
    if (typeof widget.widgetParams === "string") {
      params = JSON.parse(widget.widgetParams);
    } else {
      params = widget.widgetParams;
    }
    params.start_date = date.format("l");
    params = JSON.stringify(params);
    widget.widgetParams = params;
    widget.widget.params = params;
    this.setState((state) => ({
      widget,
    }));
  };
  handleEndDateChange = (date) => {
    let widget = { ...this.state.widget };
    let params = "";
    if (typeof widget.widgetParams === "string") {
      params = JSON.parse(widget.widgetParams);
    } else {
      params = widget.widgetParams;
    }
    params.end_date = date.format("l");
    params = JSON.stringify(params);
    widget.widgetParams = params;
    widget.widget.params = params;
    this.setState((state) => ({
      widget,
    }));
  };
  render() {
    let props = this.props;

    if (!props.show_popup || this.state.widget === null) {
      return "";
    } else {
      let widget = this.state.widget;
      let popupchart = props.popupchart;
      let year = moment(this.state.widget.widgetParams.start_date).year();
      let date = moment(props.context_date).year(year).format("l");
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
                <PopupChartWrapper
                  chart={widget}
                  key={"popup"}
                  widget_id={popupchart}
                  paused={false}
                />
              </div>
            </DialogContent>
          </Dialog>
        )
      );
    }
  }
}

export default PopupChart;
