import React from "react";
import Button from "@material-ui/core/Button";

const SubMenu = (props)=> {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
   setAnchorEl(event.currentTarget);
  };
  const lead_status ='{"type":"bar","title":"Lead Status","interval":20000,"stacked":1,"defaultpos":{"h":2,"w":2,"minW":2,"minH":2},"source":"'+window.base_url+'/dashboard/getArray.php?report=stackedline","params":{"start_date":"12/01/2019","end_date":"12/07/2019","product_id":"57","interval":"daily","datatype":"percent"}}';

  const handleClose = (widget) => {
    setAnchorEl(null);
   props.handleWidgetAdd(widget);
  };
  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
       Add Widget 
      </Button>
      {/* <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={()=>{handleClose(lead_status)}}>
            Lead Status
        </MenuItem>
      </Menu> */}
    </div>
  );
}
export default SubMenu;
