import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DropDown from "../dropdowns/DropDown";
import DateHandler from "../date/DateHandler";
import TextInput from "../inputs/TextInput";

class EditWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: props.products
    };
  }

  componentDidMount() {
    new Promise((resolve, reject) => {
      let url =
        "http://local.admin.admediary.com/dashboard/chartMgmt.php?user_id=59&action=get_products";
      fetch(url)
        .then(response => response.json())
        .then(result => {
          let parsed = JSON.parse(result);
          resolve(
            this.setState({
              products: JSON.parse(result)
            })
          );
        });
    });
  }
  handleClose = () => {
    this.props.handleSave();
    this.props.handleClose();
  };

  render() {
    if (this.props.chart.length === 0) {
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
        width: "100%"
      };
      return <div style={wrapper_style}>{/* <CircleLoader /> */}</div>;
    } else {
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
                InputLabelProps={{ shrink: this.props.title ? true : false }}
                handleChange={this.props.handleTitleChange}
                value={this.props.title}
              />
            </div>
            <br />
            <div>
              <DropDown
                label="Chart Type"
                variant="outlined"
                size={this.props.size}
                handleChange={this.props.handleTypeChange}
                value={this.props.chart.type}
                options={[
                  {
                    text: "Bar",
                    value: "bar"
                  },

                  {
                    text: "Line",
                    value: "line"
                  }
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
                    value: "hourly"
                  },
                  {
                    text: "Daily",
                    value: "daily"
                  }
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
                    value: "percent"
                  },
                  {
                    text: "Count",
                    value: "count"
                  }
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
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleClose} variant="contained">
              Cancel
            </Button>
            <Button
              onClick={this.handleClose}
              variant="contained"
              color="primary"
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      );
    }
  }
}

export default EditWidget;
