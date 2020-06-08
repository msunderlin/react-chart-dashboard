import React from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import "../../../node_modules/react-grid-layout/css/styles.css";
import "../../../node_modules/react-resizable/css/styles.css";
import "./layout.css";
import CircleLoader from "../loader/CircleLoader";
import EditMenu from "../menus/editMenu";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: props.user_id,
      dashboard_id: props.dashboard_id,
      layouts: props.layouts,
      was_reset: false,
    };
  }

  wrapper_style = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    position: "absolute",
    top: "0",
    left: "0",
    height: "100vh",
    width: "100%",
  };

  static get defaultProps() {
    return {
      className: "layout",
      cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
      rowHeight: 75,
    };
  }
  resetLayout() {
    this.props.handleResetLayout("lg");
  }
  onLayoutChange(layout, layouts) {
      this.props.handleLayoutsChange(layouts)
  }
  render() {
    return (
     <React.Fragment>
        <br />

        <EditMenu
          handleResetLayout={() => this.resetLayout()}
          handleWidgetAdd={this.props.handleWidgetAdd}
        />
        {JSON.stringify(this.props.layouts) !== '[]' &&
        <ResponsiveReactGridLayout
          //width={2400}
          className="layout"
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={75}
          verticalCompact={true}
          layouts={this.props.layouts}
          onLayoutChange={(layout, layouts) =>
            this.onLayoutChange(layout, layouts)
          }
        >
          {this.props.children}
        </ResponsiveReactGridLayout>
  }
  
        {JSON.stringify(this.props.layouts) === '[]' &&
        <div style={this.wrapper_style}>
        <CircleLoader />
      </div>
  }
     </React.Fragment> 
    );
  }
}

export default Layout;
