import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DropDown from '../dropdowns/DropDown';
import DateHandler from "../date/DateHandler";
import moment from "moment";
import TextInput from "../inputs/TextInput";

class EditWidget extends Component {


 handleClose = () => {
    this.props.handleSave();
    this.props.handleClose();
  };

  render() {
    return (
        <Dialog
          open={this.props.opened}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Edit Widget</DialogTitle>
          <DialogContent>
            <TextInput
              variant="filled"
              label="Title"
              handleChange={this.props.handleTitleChange}
              value={this.props.title}
            />
            <DropDown label="Chart Type" handleChange={this.props.handleTypeChange}
            value = {this.props.chart.type}
                  options={[
                    {
                      text: "Bar",
                      value: "bar"
                    },
                    {
                      text:"Pie",
                      value:"pie"
                    },
                    {
                      text:"Line",
                      value:"line"
                    },
                    {
                      text:"Polar",
                      value:"polar"
                    },
                    {
                      text:"Doughnut",
                      value:"doughnut"
                    }
                  ]}
                  />
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

export default EditWidget;
