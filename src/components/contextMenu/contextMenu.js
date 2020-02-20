import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

class ContextMenu extends React.Component {
  render() {
    return (
      <Menu
        open={Boolean(this.props.visible)}
        onClose={this.props.handleContextClose}
        anchorReference="anchorPosition"
        anchorPosition={
          this.props.mouseY !== null && this.props.mouseX !== null
            ? { top: this.props.mouseY, left: this.props.mouseX }
            : undefined
        }
      >
        <MenuItem onClick={this.props.handleContextClick}>Hourly</MenuItem>
      </Menu>
    );
  }
}

export default ContextMenu;
