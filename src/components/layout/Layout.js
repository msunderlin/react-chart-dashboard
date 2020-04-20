import React from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
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
//    savetoDB("layouts", layouts, this.props.charts);
    this.setState((state)=>({ layouts }),this.props.handleLayoutsChange(layouts));
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

export default Layout;
