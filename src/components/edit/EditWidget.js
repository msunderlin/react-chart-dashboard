import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DropDown from "../dropdowns/DropDown";
import DateHandler from "../date/DateHandler";
import TextInput from "../inputs/TextInput";
import EditHelper from "./EditHelper";

class EditWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      widget_id: this.props.widget_id,
      widget: null,
      sources: null,
      is_ajax: false
    };
  }
  editHelper = null;
  async componentDidMount() {
    this.editHelper = new EditHelper();
    let dataSources = await this.editHelper.getSources();
    this.setState((state) => ({
      sources: dataSources,
    }));
  }
  async componentDidUpdate() {
    let widget = this.state.widget;
    if (this.props.widget_id === 0) {
    } else {
      if (this.state.widget_id !== this.props.widget_id) {
        this.setState((state) => ({
          widget_id: this.props.widget_id,
        }));
        widget = null;
      }

      if (widget === null) {
        this.editHelper.initalizeData(this.props.widget_id).then((widget) => {
          this.setState((state) => ({
            widget,
          }));
        });
      }
    }
  }

  handleChange = (event) => {
    let node = event.target.name;
    let widget = { ...this.state.widget };
    let params = "";
    if (typeof widget.widgetParams === "string") {
      params = JSON.parse(widget.widgetParams);
    } else {
      params = widget.widgetParams;
    }
    params[node] = event.target.value;
    params = JSON.stringify(params);
    widget.widgetParams = params;
    widget.widget.params = params;
    this.setState((state) => ({
      widget,
    }));
  };
  handleSourceChange = async (event) => {
    let source_id = event.target.value;
    let widget = { ...this.state.widget };
    widget.widget.source_id = source_id;
    widget.source = await this.editHelper.getSource(source_id);
    widget.sourceParams = await this.editHelper.getSourceParams(source_id);
    let params = { interval: 50000 };
    params = JSON.stringify(params);
    widget.widgetParams = params;
    widget.widget.params = params;
    this.setState((state) => ({
      widget,
    }));
  };
  // edge cases
  handleTitleChange = (event) => {
    let widget = { ...this.state.widget };
    widget.widget.title = event.target.value;
    this.setState((state) => ({
      widget,
    }));
  };
  handleTypeChange = (event) => {
    let widget = { ...this.state.widget };
    widget.widget.type_id = event.target.value;
    this.setState((state) => ({
      widget,
    }));
  };
  handleIntervalChange = (event) => {
    let widget = { ...this.state.widget };
    widget.widget.title = event.target.value;
    this.setState((state) => ({
      widget,
    }));
  };
  handleDateChange = (date) => {
    let widget = { ...this.state.widget };
    let params = "";
    if (typeof widget.widgetParams === "string") {
      params = JSON.parse(widget.widgetParams);
    } else {
      params = widget.widgetParams;
    }
    params.date = date.format("l");
    params = JSON.stringify(params);
    widget.widget.params = params;
    widget.widgetParams = params;
    this.setState({
      widget,
    });
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
    this.setState({
      widget,
    });
  };
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
    this.setState({
      widget,
    });
  };

  handleStartEndDateChange =(startDate, endDate) =>{
    let widget = { ...this.state.widget };
    let params = "";
    if (typeof widget.widgetParams === "string") {
      params = JSON.parse(widget.widgetParams);
    } else {
      params = widget.widgetParams;
    }
    params.start_date = startDate.format("l")
    params.end_date = endDate.format("l");
    params = JSON.stringify(params);
    widget.widgetParams = params;
    widget.widget.params = params;
    this.setState({
      widget,
    });
  }

  handleClose = () => {
    this.editHelper.saveToDB(this.state.widget.widget);

    this.props.handleClose();
  };

  getValue = (field) => {
    //first we check if the property is set in tne widget.
    let w_params = { ...this.state.widget };
    if (typeof w_params.widgetParams === "string") {
      w_params = JSON.parse(w_params.widgetParams);
    } else {
      w_params = w_params.widgetParams;
    }
    if (typeof w_params[field] != "undefined") {
      if (w_params[field]) {
        return w_params[field];
      }
    }
    let default_value = this.state.widget.sourceParams.map((param, i) => {
      if (param.param_url_name == field) {
        return param.default_value;
      } else {
        return false;
      }
    });

    default_value = default_value.filter((el) => {
      return el;
    });
    return default_value[0];
  };

  render() {
    if (this.state.widget === null) {
      let wrapper_style = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
        alignItems: "center",
        position: "absolute",
        top: "0",
        left: "0",
        height: "100vh",
        width: "100%",
      };
      return <div style={wrapper_style}>{/* <CircleLoader /> */}</div>;
    } else {
      const widget = this.state.widget;

      return (
        <Dialog
          open={this.props.opened}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Edit Widget</DialogTitle>
          <DialogContent>
            <div>
              <TextInput
                variant="outlined"
                size={this.props.size}
                label="Title"
                name="title"
                InputLabelProps={{
                  shrink: this.state.widget.widget.title ? true : false,
                }}
                handleChange={this.handleTitleChange}
                value={this.state.widget.widget.title}
              />
            </div>
            <br />
            <div>
              <TextInput
                variant="outlined"
                size={this.props.size}
                label="Refresh Interval"
                name="interval"
                InputLabelProps={{
                  shrink: this.state.widget.widget.interval ? true : false,
                }}
                handleChange={this.handleChange}
                value={this.getValue("interval")}
              />
            </div>
            <br />

            <div>
              <DropDown
                label="Data Source"
                variant="outlined"
                name="source_id"
                size={this.props.size}
                handleChange={this.handleSourceChange}
                value={this.state.widget.widget.source_id}
                options={this.state.sources}
              />
            </div>
            <br />
            <div>
              <DropDown
                label="Widget Type"
                variant="outlined"
                name="type_id"
                size={this.props.size}
                handleChange={this.handleTypeChange}
                value={this.state.widget.widget.type_id}
                options={this.editHelper.getTypes(this.state.widget.source.types)}
              />
            </div>
            <br />
            {this.state.widget.sourceParams.map((param, i) => {
              let comp = null;
              switch (param.data_type) {
                case "text":
                case "numeric":
                  return (
                    <React.Fragment key={param.source_param_id}>
                      <div>
                        <TextInput
                          variant="outlined"
                          size={this.props.size}
                          label={param.param_name}
                          name={param.param_url_name}
                          InputLabelProps={{
                            shrink: this.state.widget.widget.title
                              ? true
                              : false,
                          }}
                          handleChange={this.handleChange}
                          value={this.getValue(param.param_url_name)}
                        />
                      </div>
                      <br />
                    </React.Fragment>
                  );
                  break;
                case "dropdown":
                  let data = null;
                  let is_ajax = false;
                  if (param.table_columns === "ajax") {
                    //todo create ajax call
                   data =   window.ajax_url + param.table_actions;
                   is_ajax = true;
                  } else {
                    data = eval(param.table_actions);
                    is_ajax = false;
                    
                  }
                  return (
                    <React.Fragment key={param.source_param_id}>
                      <div>
                        <DropDown
                          label={param.param_name}
                          variant="outlined"
                          name={param.param_url_name}
                          size={this.props.size}
                          handleChange={this.handleChange}
                          value={this.getValue(param.param_url_name)}
                          options={data}
                          is_ajax ={is_ajax}
                        />
                      </div>
                      <br />
                    </React.Fragment>
                  );
                  break;
                case "date":
                  return (
                    <React.Fragment key={param.source_param_id}>
                      <div>
                        <DateHandler
                          label={param.param_name}
                          size={this.props.size}
                          name={param.param_url_name}
                          handleDateChange={this.handleDateChange}
                          value={this.getValue(param.param_url_name)}
                          date={this.getValue(param.param_url_name)}
                          single={true}
                        />
                      </div>
                      <br />
                    </React.Fragment>
                  );
                  break;
                case "start_date":
                  return (
                    <React.Fragment key={param.source_param_id}>
                      <div>
                        <DateHandler
                          startDate={this.getValue("start_date")}
                          size={this.props.size}
                          endDate={this.getValue("end_date")}
                          handleStartDateChange={this.handleStartDateChange}
                          handleEndDateChange={this.handleEndDateChange}
                          handleStartEndDateChange = {this.handleStartEndDateChange}
                          single={false}
                        />
                      </div>
                      <br />
                    </React.Fragment>
                  );
                  break;
                default:
                  break;
              }
              /*
            <div>
              <DropDown
                label="Chart Type"
                variant="outlined"
                size={this.props.size}
                handleChange={this.props.handleTypeChange}
                value={this.state.widget.type}
                options={[
                  {
                    text: "Bar",
                    value: "bar",
                  },

                  {
                    text: "Line",
                    value: "line",
                  },
                ]}
              />
            </div>
            <br />
            <div>
              <DropDown
                variant="outlined"
                label="Interval"
                size={this.props.size}
                handleChange={this.props.handleParamIntervalChange}
                value={this.props.chart.params.interval}
                options={[
                  {
                    text: "Hourly",
                    value: "hourly",
                  },
                  {
                    text: "Daily",
                    value: "daily",
                  },
                ]}
              />
            </div>
            <br />
            <div>
              <DropDown
                label="Product"
                variant="outlined"
                size={this.props.size}
                handleChange={this.props.handleProductChange}
                value={this.props.chart.params.product_id}
                options={this.state.products}
              />
            </div>
            <br />
            <div>
              <DropDown
                variant="outlined"
                label="Data Display Type"
                size={this.props.size}
                handleChange={this.props.handleParamDataTypeChange}
                value={this.props.chart.params.datatype}
                options={[
                  {
                    text: "Percent",
                    value: "percent",
                  },
                  {
                    text: "Count",
                    value: "count",
                  },
                ]}
              />
            </div>
            <br />
            <div>
              <DateHandler
                startDate={this.props.chart.params.start_date}
                size={this.props.size}
                endDate={this.props.chart.params.end_date}
                handleStartDateChange={this.props.handleStartChange}
                handleEndDateChange={this.props.handleEndChange}
              />
            </div> */
            })}
          </DialogContent>
          <DialogActions style={{ justifyContent: "flex-start" }}>
            <Button
              onClick={this.handleClose}
              variant="contained"
              color="primary"
            >
              Save
            </Button>
            <Button onClick={this.props.handleClose} variant="contained">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      );
    }
  }
}

export default EditWidget;
