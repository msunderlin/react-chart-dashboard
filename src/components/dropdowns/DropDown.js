import React from "react";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";

class DropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
    };
  }
  fetching = false;
  async componentDidMount() {

    if (this.props.is_ajax) {
      this.fetching = true;
      await fetch(this.props.options)
        .then((response) => response.json())
        .then((result) => {
          this.setState({
            options: JSON.parse(result),
          });
        });
          this.fetching = false;
    } else {
      console.log(typeof this.props.options);
      console.log(this.props.options);
      this.setState((state) => ({
        options: this.props.options,
      }));
    }
  }

  async componentDidUpdate() {
    if (this.state.options != this.props.options) {
      if (this.props.is_ajax) {
        if(this.fetching === false){
          this.fetching = true;
        await fetch(this.props.options)
          .then((response) => response.json())
          .then((result) => {
            this.setState({
              options: JSON.parse(result),
            });
          });
          this.fetching = false;
        }
      } else {
        console.log(typeof this.props.options);
        console.log(this.props.options);
        this.setState((state) => ({
          options: this.props.options,
        }));
      }
    }
  }
  componentWillUnmount() {
    this.setState({
      options: [],
    });
  }

  render() {
    let props = this.props;
    return (
      <React.Fragment>
        <InputLabel>{props.label}</InputLabel>
        <Select
          native
          name={props.name}
          variant={props.variant}
          size={props.size}
          lable={props.label}
          value={props.value}
          onChange={props.handleChange}
          inputProps={props.inputProps}
        >
          <option value="" />
          {this.state.options.map((o, i) => {
            console.log(o);
            return (
              <option key={i} value={o.value}>
                {o.text}
              </option>
            );
          })}
        </Select>
      </React.Fragment>
    );
  }
}

export default DropDown;
