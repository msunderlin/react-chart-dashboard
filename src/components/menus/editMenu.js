import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

 const EditMenu = (props) =>{
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
   setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {

    setAnchorEl(null);
  };
const handleResetClose = () =>{
    setAnchorEl(null);
    props.handleResetLayout();
}
const handleAddClose = () =>{
  setAnchorEl(null);
  props.handleWidgetAdd();
}
  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        Edit
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleResetClose}>Reset Layout</MenuItem>
        <MenuItem onClick={handleAddClose}>
            Add Widget
        </MenuItem>
      </Menu>
    </div>
  );
}

export default EditMenu;
