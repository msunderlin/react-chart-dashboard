import React from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import { Button } from "@material-ui/core";
import "../../../node_modules/react-grid-layout/css/styles.css";
import "../../../node_modules/react-resizable/css/styles.css";
import "./layout.css";

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const originalLayouts = getFromLS("layouts") || {};
const originalLayoutDB = getFromDB("layouts") || {};

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: props.user_id,
      dashboard_id: props.dashboard_id,
      layouts: props.layouts
    };
  }

  static get defaultProps() {
    return {
      className: "layout",
      cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
      rowHeight: 75
    };
  }

  resetLayout() {
    this.setState({ layouts: {} });
  }
  onLayoutChange(layout, layouts) {
    // saveToLS("layouts", layouts);
    savetoDB("layouts", layouts, this.props.charts);
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
async function getFromDB(key) {
  let ls = {};
  const action = "get_layout";
  const user_id = window.getUserID();
  const dashboard_id = window.getDashboardId();

  ls = await fetch(
    "http://local.admin.admediary.com/test/chartMgmt.php?user_id=" +
      user_id +
      "&action=" +
      action +
      "&dashboard_id=" +
      dashboard_id
  )
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(() => {
      return false;
    });

  return ls[key];
}
function resetLayout() {
  this.setState();
}
async function savetoDB(key, value, charts) {
  const action = "set_layout";
  const user_id = window.getUserID();
  const dashboard_id = window.getDashboardId();
  const data = new FormData();
  data.append("user_id", user_id);
  data.append("dashboard_id", dashboard_id);
  data.append("action", action);
  data.append("widgets", JSON.stringify(charts));
  data.append("positions", JSON.stringify({ [key]: value }));
  const layouts = await fetch(
    "http://local.admin.admediary.com/test/chartMgmt.php",
    {
      method: "POST",
      headers: {
        Accept: "application/json"
      },
      body: data
    }
  )
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(e => {
      console.error(e);
    });
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
