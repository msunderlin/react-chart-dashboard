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
    };
  }
  editHelper = null;
  async componentDidUpdate() {
    let widget = this.state.widget;
    console.log("--------------------------------------------------");
    console.log(this.props.widget_id);
    console.log("--------------------------------------------------");

    if (this.props.widget_id === 0) {
    } else {
      if (this.state.widget_id !== this.props.widget_id) {
        this.setState((state) => ({
          widget_id: this.props.widget_id,
        }));
        widget = null;
      }

      if (widget === null) {
        console.log("==================================================");
        console.log(this.props.widget_id);
        console.log("==================================================");
        this.editHelper = new EditHelper();
        let widget = await this.editHelper.initalizeData(this.props.widget_id);
        console.log(widget);
        this.setState((state) => ({
          widget,
        }));
        new Promise((resolve, reject) => {
          let url = window.ajax_url + "?user_id=59&action=get_products";
          fetch(url)
            .then((response) => response.json())
            .then((result) => {
              resolve(
                this.setState({
                  products: JSON.parse(result),
                })
              );
            });
        });
      }
    }
  }
  handleTitleChange = (event) => {

    let widget = { ...this.state.widget };
    widget.widget.title = event.target.value;
    this.setState((state) => ({
      widget,
    }));

  }
  handleChange = (event) => {
    let node = event.target.name;
    let widget = { ...this.state.widget };
    let params = widget.widgetParams;
    if (typeof params == "string") {
      params = JSON.parse(params);
    }
    console.log(params);
    params[node] = event.target.value;
    params = JSON.stringify(params);
    console.log(params);
    widget.widgetParams = params;
    widget.widget.params = params;
    this.setState((state) => ({
      widget,
    }));
  };

  handleClose = () => {
    this.editHelper.saveToDB(this.state.widget.widget);
    this.props.handleClose();
  };

  getValue = (field) => {
    //first we check if the property is set in tne widget.
    let w_params = { ...this.state.widget };
    w_params = w_params.widgetParams;
    if (typeof w_params == "string") {
      w_params = JSON.parse(w_params);
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
      console.log(this.state);
      const widget = this.state.widget;
      console.log(widget);

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
                  if (param.table_columns === "ajax") {

                  } else {
                    data = eval(param.table_actions);
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
                        />
                      </div>
                      <br />
                    </React.Fragment>
                  );
                  break;
                case "date":
                  console.log("rendering Date");
                  return (
                    <React.Fragment key={param.source_param_id}>
                      <div>
                        <DateHandler
                          label={param.param_name}
                          size={this.props.size}
                          name={param.param_url_name}
                          handleChange={this.handleChange}
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
                  let end_date = this.state.widget.sourceParams.filter(
                    function (el) {
                      return (el.data_type = "end_date");
                    }
                  );
                  return (
                    <React.Fragment key={param.source_param_id}>
                      <div>
                        <DateHandler
                          startDate={this.props.chart.params.start_date}
                          size={this.props.size}
                          endDate={this.props.chart.params.end_date}
                          handleStartDateChange={this.props.handleStartChange}
                          handleEndDateChange={this.props.handleEndChange}
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
