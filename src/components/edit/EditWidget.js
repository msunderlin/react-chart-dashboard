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
      widget: null
    };
  }
  editHelper = null;
  async componentDidUpdate() {
    console.log(this.props.widget_id);
    if (this.props.widget_id === 0) {
    } else {
      if(this.state.widget === null){
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
    }}
  }

  handleChange = (event)=>{
    let node = event.target.name.split('.');
    console.log(this.state.widget[node[0]]);
    let widget = {...this.state.widget};
    widget[node[0]][node[1]] = event.target.value;
    this.setState((state)=>({
      widget
    }))

  }


  handleClose = () => {
this.editHelper.saveToDB(this.state.widget.widget);
    
    this.props.handleClose();
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
                name='widget.title'
                InputLabelProps={{ shrink: this.state.widget.widget.title? true : false }}
                handleChange={this.handleChange}
                value={this.state.widget.widget.title}
              />
            </div><br />
            {/* 
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
            </div> */}
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
