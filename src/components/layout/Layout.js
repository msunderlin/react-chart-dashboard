import React from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import { Button } from "@material-ui/core";
import "../../../node_modules/react-grid-layout/css/styles.css";
import "../../../node_modules/react-resizable/css/styles.css";
import "./layout.css";
import EditMenu from "./editMenu";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

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
    savetoDB("layouts", layouts, this.props.charts);
    this.setState({ layouts });
  }
  render() {
    return (
      <>
        <br />

        <EditMenu handleResetLayout={() => this.resetLayout()} handleWidgetAdd={this.props.handleWidgetAdd}/>
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
  await fetch(window.ajax_url, {
    method: "POST",
    headers: {
      Accept: "application/json"
    },
    body: data
  })
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(e => {
      console.error(e);
    });
}
export default Layout;
