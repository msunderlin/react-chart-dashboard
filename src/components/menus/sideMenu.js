import React from "react";

import CreateIcon from "@material-ui/icons/Create";
import Icon from "@material-ui/core/Icon";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";
import PersonIcon from "@material-ui/icons/Person";

class SideMenu extends React.Component {
  render() {
    const menuItems = window.getMenu();
    return (
      <Paper
        variant="outlined"
        style={{
          minHeight: "100vh",
          height: "100%",
          backgroundColor: "#2c2e33",
          color: "#fff",
          marginTop: 0,
          paddingTop: 0,
          fontFamily: "Roboto",
          fontSize: "1rem",
        }}
        square={true}
      >
        <List disablePadding={true} dense={true}>
          <ListItem style={{ backgroundColor: "#29c7ca" }}>
            <h2>DashBoard</h2>
          </ListItem>
          <ListItem style={{ backgroundColor: "#2badaf", color: "#353942" }}>
            <ListItemIcon>
              <PersonIcon fontSize="small" style={{ color: "#353942" }} />
            </ListItemIcon>
            <p>Test User</p>
          </ListItem>
          <ListItem>
            <Divider></Divider>
          </ListItem>
          {menuItems.map((header, i) => {
            return (
              <React.Fragment key={i}>
                <ListItem>
                  <ListItemIcon>
                    <Icon style={{ color: "#2badaf" }} fontSize="small">
                      {header.icon}
                    </Icon>
                  </ListItemIcon>
                  <ListItemText style={{ color: "#2badaf" }} fontSize="small">
                    {header.section}
                  </ListItemText>
                </ListItem>
                {header.items.map((item, i) => {
                  return (
                    <ListItem
                      component="a"
                      button
                      href={window.base_url+ item.link}
                      key={i}
                    >
                      <ListItemIcon></ListItemIcon>
                      <ListItemText style={{ color: "#fff" }} fontSize="small">
                        {item.title}
                      </ListItemText>
                    </ListItem>
                  );
                })}
              </React.Fragment>
            );
          })}
        </List>
      </Paper>
    );
    return (
      <Paper
        variant="outlined"
        style={{
          minHeight: "100vh",
          height: "100%",
          backgroundColor: "#2c2e33",
          color: "#fff",
          marginTop: 0,
          paddingTop: 0,
          fontFamily: "Roboto",
        }}
        square={true}
      >
        <List disablePadding={true} dense={true}>
          <ListItem style={{ backgroundColor: "#29c7ca" }}>
            <h2>DashBoard</h2>
          </ListItem>
          <ListItem style={{ backgroundColor: "#2badaf", color: "#353942" }}>
            <ListItemIcon>
              <PersonIcon style={{ color: "#353942" }} />
            </ListItemIcon>
            <p>Test User</p>
          </ListItem>
          <ListItem>
            <Divider></Divider>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CreateIcon style={{ color: "#2badaf" }} />
            </ListItemIcon>
            <ListItemText style={{ color: "#2badaf" }}>Posts</ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon></ListItemIcon>
            <ListItemText style={{ color: "#fff" }}>New Entry</ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon></ListItemIcon>
            <ListItemText style={{ color: "#fff" }}>
              View All Entries
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CreateIcon style={{ color: "#2badaf" }} />
            </ListItemIcon>
            <ListItemText style={{ color: "#2badaf" }}>Posts</ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon></ListItemIcon>
            <ListItemText style={{ color: "#fff" }}>New Entry</ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon></ListItemIcon>
            <ListItemText style={{ color: "#fff" }}>
              View All Entries
            </ListItemText>
          </ListItem>
        </List>
      </Paper>
    );
  }
}

export default SideMenu;
