import React from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import { Button } from "@material-ui/core";
import "../../../node_modules/react-grid-layout/css/styles.css";
import "../../../node_modules/react-resizable/css/styles.css";
import "./layout.css";

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const originalLayouts = getFromLS("layouts") || {};
const originalLayoutDB = getFromDB() || {};

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: props.user_id,
      dashboard_id: props.dashboard_id,
      layouts: JSON.parse(JSON.stringify(originalLayouts)),
    };
  }
  static get defaultProps() {
    return {
      className: "layout",
      cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
      rowHeight: 75,
      verticalCompact: true
    };
  }
  resetLayout() {
    console.log("fired!");
    this.setState({ layouts: {} });
  }
  onLayoutChange(layout, layouts) {
    saveToLS("layouts", layouts);
    savetoDB(layouts,this.props.charts);
    this.setState({ layouts });
  }
  render() {
    return (
      <>
        <br />
        <Button
          variant="contained"
          color="primary"
          onClick={() => this.resetLayout()}
        >
          Reset Layout
        </Button>
        <ResponsiveReactGridLayout
          width={2400}
          className="layout"
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={75}
          verticalCompact={true}
          layouts={this.state.layouts}
          onLayoutChange={(layout, layouts) =>
            this.onLayoutChange(layout, layouts)
          }
        >
          {this.props.children}
        </ResponsiveReactGridLayout>
      </>
    );
  }
}
function getFromLS(key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem("rgl-8")) || {};
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls[key];
}
async function getFromDB() {
  const action = "get_layout";
  const user_id = window.getUserID();
  const dashboard_id = window.getDashboardId();

  const layouts = await fetch(
     "http://local.admin.admediary.com/test/chartMgmt.php?user_id=" +
      user_id +
      "&action=" +
      action +
      "&dashboard_id=" +
      dashboard_id
  )
    .then(response => response.json())
    .then(data => {
      console.log(data[0]);
      return JSON.parse(data[0]);
    }).catch(()=>{
      return false;
    });

  return layouts;
}
function savetoDB(value, charts){
  const action = "get_layout";
  const user_id = window.getUserID();
  const dashboard_id = window.getDashboardId();
  const layouts = await fetch(
    "http://local.admin.admediary.com/test/chartMgmt.php",
    {
      method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
     
        user_id: user_id,
        action:action,
        dashboard_id:dashboard_id,
        widgets:  
        positions: JSON.stringify(value)
    });
  });
  const content = await rawResponse.json();
    }
function saveToLS(key, value) {
  if (global.localStorage) {
    global.localStorage.setItem(
      "rgl-8",
      JSON.stringify({
        [key]: value
      })
    );
  }
}
export default Layout;
