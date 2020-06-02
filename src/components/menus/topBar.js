import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import SpeedIcon from "@material-ui/icons/Speed";
import TimelineIcon from "@material-ui/icons/Timeline";

class TopBar extends React.Component {
  render() {
    return (
      <Grid
      container
        disableGutters={true}
        direction="row"
        alignItems="flex-end"
        justify="center"
        maxWidth={false}
        style={{
          position: "relative",
          backgroundColor: "#2c2e33",
          borderRadius: "0px",
          color: "#fff",
          height: "135px",
        }}
      >

        <ButtonGroup style={{height:"75px"}}>
          <Button
            variant="contained"
            style={{
              backgroundColor: "#29c7ca",
              borderRadius: "0px",
              color: "#fff",
            }}
            startIcon={<SpeedIcon />}
          >
            
            DASHBOARD
          </Button>
          <Button
            variant="contained"
            style={{
              backgroundColor: "#353942",
              borderRadius: "0px",
              color: "#9a9ca1",
            }}
            startIcon={<TimelineIcon />}
          >
            
            VISITS
          </Button>
          <Button
            variant="contained"
            style={{
              backgroundColor: "#353942",
              borderRadius: "0px",
              color: "#9a9ca1",
            }}
            startIcon={<PersonAddIcon />}
          >
            
           Sign UPS 
          </Button>
        </ButtonGroup>
      </Grid>
    );
  }
}

export default TopBar;
