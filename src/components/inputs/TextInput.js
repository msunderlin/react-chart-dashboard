import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";

const TextInput = props => {
  return (
    <React.Fragment>
      <InputLabel>{props.label}</InputLabel>
      <TextField
        onChange={props.handleChange}
        variant={props.variant}
        value={props.value}
      />
    </React.Fragment>
  );
};

export default TextInput;
