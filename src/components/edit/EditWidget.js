import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DateHandler from "../date/DateHandler";
import moment from "moment";
import TextInput from "../inputs/TextInput";

class EditWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(),
      endDate: moment(),
      open:props.opened,
      chart:props.chart,
      title: "title"
    };
  }
  handleStartDateChange = date => {
    this.setState({ startDate: date });
  };

  handleEndDateChange = date => {
    this.setState({ endDate: date });
  };

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  handleTitleChange = event => {
    let v = event.target.value;
    this.setState({ title: v });
  };
  render() {
    return (
      <div>
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
              handleChange={this.handleTitleChange}
              value={this.state.title}
            />
            <DateHandler
              handleStartDateChange={this.handleStartDateChange}
              handleEndDateChange={this.handleEndDateChange}
              startDate={this.state.startDate}
              endDate={this.state.endDate}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} variant="contained">
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
      </div>
    );
  }
}

export default EditWidget;
