import React from "react";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";

const DropDown = props => {
  return (
    <React.Fragment>
      <InputLabel>{props.label}</InputLabel>
      <Select
        native
        variant={props.variant}
        size={props.size}
        lable={props.label}
        value={props.value}
        onChange={props.handleChange}
        inputProps={props.inputProps}
      >
        <option value="" />
        {props.options.map((o, i) => {
          return (
            <option key={i} value={o.value}>
              {o.text}
            </option>
          );
        })}
      </Select>
    </React.Fragment>
  );
};

export default DropDown;
