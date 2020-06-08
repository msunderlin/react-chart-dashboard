import React from "react";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CloseIcon from "@material-ui/icons/Close";
import Container from "@material-ui/core/Container";
import DehazeIcon from "@material-ui/icons/Dehaze";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";

import ChartWrapper from "./components/charts/ChartWrapper";
import CircleLoader from "./components/loader/CircleLoader";
import ContextMenu from "./components/menus/contextMenu";
import EditWidget from "./components/edit/EditWidget";
import Layout from "./components/layout/Layout";
import PopupChart from "./components/layout/PopupChart";
import SideMenu from "./components/menus/sideMenu";
import TopBar from "./components/menus/topBar";
import { isThisTypeNode } from "typescript";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      widgets: [],
      layouts: [],
      user_id: window.getUserID(),
      action: window.getAction(),
      edit_opened: false,
      edit_target: 0,
      edit_target_id: 0,
      show_context: null,
      context_action: null,
      context_param: null,
      context_x: null,
      context_y: null,
      show_popup: false,
      paused: false,
      refreshed_id: 0,
    };
  }
  default_position = {h: 3,
    minH: 2,
    minW: 2,
    moved: false,
    static: false,
    w: 10,
    x: 0,
    y: 0}
 async componentDidMount() {
    await this.initializeData();
  }

  componentDidUpdate() {
   }

  //Context Menu Actions
  handleContextOpenClick = (event, label, i) => {
    console.log(event.target);
    console.log(label);
    console.log(i);
    console.log(this.state.widgets[i]);
    this.setState((state) => ({
      show_context: event.target,
      context_target: JSON.parse(JSON.stringify(state.widgets[i])),
      context_param: label,
      context_x: event.clientX - 2,
      context_y: event.clientY - 4,
    }));
  };
  handleContextClose = () => {
    this.setState((state) => ({
      show_context: null,
      context_x: null,
      context_y: null,
    }));
  };
  handleContextClick = () => {
    this.setState((state) => ({
      show_popup: true,
      show_context: null,
      context_x: null,
      context_y: null,
      paused: true,
    }));
  };
  handlePopupClose = () => {
    this.setState((state) => ({
      show_popup: false,
      paused: false,
    }));
  };
  // Chart Edit window Actions
  handleEditClick = (i) => {
    this.setState((state) => ({
      edit_opened: true,
      edit_target: i,
      edit_target_id: i,
      paused: true,
    }));
  };
  handleEditClose = () => {
    if (this.state.edit_target === "new") {
      this.setState(
        (state) => ({
          edit_opened: false,
          edit_target: 0,
          edit_target_id: 0,
          paused: false,
        }),
        () => {
          this.initializeData();
        }
      );
    } else {
      this.setState(
        (state) => ({
          edit_opened: false,
          edit_target: 0,
          edit_target_id: 0,
          paused: false,

        }));
    }
  };
  //Add Widget
  handleWidgetAdd = (widget) => {
    this.setState((state) => ({
      edit_opened: true,
      edit_target: "new",
      edit_target_id: "new",
      paused: true,
    }));
  };
  //delete Widget
   handleWidgetRemove = async (i) => {
    let charts = this.state.widgets;
    let layouts = JSON.parse(JSON.stringify(this.state.layouts));
    let chart = charts.map((chart, j) => {
      if (chart == i) {
        return j;
      }
    });
    //getchart index
    Object.entries(layouts).forEach((entry) => {
      let key = entry[0];
      layouts[key].splice(chart, 1);
    });

    await this.handleWidgetDelete(i);
    this.setState({
      widgets: [],
      layouts: []
    },async ()=>{
    this.handleLayoutsChange(layouts)
    await this.initializeData()});
  };
  handleLayoutsChange = (layouts) => {
    this.saveLayoutToDB(layouts);
    this.setState((state) => ({
      layouts,
    }));
  };

  handleResetLayout = async (key) => {
    let ls = {};
    const action = "reset_layout";
    const user_id = window.getUserID();
    const dashboard_id = window.getDashboardId();
    const url =
      window.ajax_url +
      "?user_id=" +
      user_id +
      "&action=" +
      action +
      "&dashboard_id=" +
      dashboard_id;
    ls = await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ layouts: data["layouts"] });
        this.saveLayoutToDB(data["layouts"]);
        this.forceUpdate();
        return data;
      })
      .catch(() => {
        return false;
      });
    return ls[key];
  };

  render() {
    if (this.state.widgets.length === 0 || this.state.layouts.length === 0) {
      let wrapper_style = {
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
      return (
        <div style={wrapper_style}>
          <CircleLoader />
        </div>
      );
    } else {
      return (
        <div>
          {this.state.show_popup && 
          <PopupChart
            popupchart={this.state.context_target}
            context_date={this.state.context_param}
            handleClose={this.handlePopupClose}
            show_popup={this.state.show_popup}
          />
    }
{this.state.edit_opened &&
          <EditWidget
            size="small"
            widget_id={this.state.edit_target}
            opened={this.state.edit_opened}
            handleClose={this.handleEditClose}
            handleTitleChange={this.handleTitleChange}
            handleTypeChange={this.handleTypeChange}
            handleStartChange={this.handleStartChange}
            handleEndChange={this.handleEndChange}
            handleIntervalChange={this.handleIntervalChange}
            handleParamDataTypeChange={this.handleParamDataTypeChange}
            handleProductChange={this.handleProductChange}
            handleParamIntervalChange={this.handleParamIntervalChange}
            handleSave={this.handleChartChange}
            products={[]}
          />
}
          <ContextMenu
            visible={this.state.show_context}
            handleContextClose={this.handleContextClose}
            chart={this.state.context_target}
            mouseX={this.state.context_x}
            mouseY={this.state.context_y}
            handleContextClick={this.handleContextClick}
          />
          <Grid container direction="row" spacing={0}>
            <Grid item xs={1}>
              <SideMenu></SideMenu>
            </Grid>
            <Grid item xs={11}>
              <TopBar />
              <Container disableGutters={true} maxWidth={false}>
                <Layout
                  charts={this.state.widgets}
                  layouts={this.state.layouts}
                  handleWidgetAdd={this.handleWidgetAdd}
                  handleLayoutsChange={this.handleLayoutsChange}
                  handleWidgetAdd={this.handleWidgetAdd}
                  handleResetLayout={this.handleResetLayout}
                >
                  {this.state.widgets.map((widget, i) => {
                    var pos = this.state.layouts.lg[i];
                    if(typeof pos === "undefined"){
                      pos = this.default_position;
                    }
                    return (
                      <Card
                        variant="outlined"
                        key={i}
                        className="grid-item no-outline"
                        data-grid={{
                          x: pos.x,
                          y: pos.y,
                          h: pos.h,
                          w: pos.w,
                          minH: pos.minH,
                          minW: pos.minW,
                          static: pos.static,
                        }}
                        style={{ position: "relative" }}
                      >
                        <Button
                          color="primary"
                          size="small"
                          onClick={() => {
                            this.handleEditClick(widget);
                          }}
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            zIndex: 500,
                          }}
                        >
                          <DehazeIcon />
                        </Button>
                        <IconButton
                          size="small"
                          aria-label="delete"
                          onClick={() => {
                            this.handleWidgetRemove(widget);
                          }}
                          style={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                            zIndex: 500,
                          }}
                        >
                          <CloseIcon />
                        </IconButton>
                        <ChartWrapper
                          widget_id={widget}
                          handleContextOpenClick={this.handleContextOpenClick}
                          handleContextClose={this.handleContextClose}
                          chartIndex={i}
                          paused={(this.state.paused && this.state.edit_target == widget)}
                        />
                      </Card>
                    );
                  })}
                </Layout>
              </Container>
            </Grid>
          </Grid>
        </div>
      );
    }
  }

  async getParams() {
    if (window.local_dev) {
      let url = window.location.href;
      let dashboard_name = new URL(url).pathname;
      let user_id = window.getUserID();
      let action = "dashboard_lookup";
      let dashboard_id = null;
      dashboard_name = dashboard_name.replace("/", "");
      if (isNaN(dashboard_name)) {
        dashboard_id = await fetch(
          window.ajax_url +
          "?user_id=" +
          user_id +
          "&action=" +
          action +
          "&dashboard_name=" +
          dashboard_name
        )
          .then((response) => response.json())
          .then((data) => {
            return data.dashboard_id;
          })
          .catch((e) => { });
        if (dashboard_id === false) {
          window.setAction("list");
        } else {
          window.setAction("get_dashboard");
          window.setDashboardId(await dashboard_id);
        }
        return await dashboard_id;
      }
    }
  }

  async getFromDB(key) {
    let ls = {};
    const action = "get_layout";
    const user_id = window.getUserID();
    const dashboard_id = window.getDashboardId();
    const url =
      window.ajax_url +
      "?user_id=" +
      user_id +
      "&action=" +
      action +
      "&dashboard_id=" +
      dashboard_id;
    ls = await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        return JSON.parse(data);
      })
      .catch(() => {
        return false;
      });
    return ls[key];
  }

  async saveChartsToDB(layouts, charts) {
    const action = "set_widgets";
    const user_id = window.getUserID();
    const dashboard_id = window.getDashboardId();
    const data = new FormData();
    data.append("user_id", user_id);
    data.append("dashboard_id", dashboard_id);
    data.append("action", action);
    data.append("widgets", JSON.stringify(charts));
    data.append("positions", JSON.stringify({ layouts }));
    const url = window.ajax_url;
    await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((e) => {
        console.error(e);
      });
  }
  async saveLayoutToDB(layouts) {
    const action = "set_layout";
    const user_id = window.getUserID();
    const dashboard_id = window.getDashboardId();
    const data = new FormData();
    data.append("user_id", user_id);
    data.append("dashboard_id", dashboard_id);
    data.append("action", action);
    data.append("positions", JSON.stringify({ layouts }));
    const url = window.ajax_url;
    await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((e) => {
        console.error(e);
      });
  }

  async handleWidgetDelete(widget_id) {
    const action = "remove_widget";
    const user_id = window.getUserID();
    const dashboard_id = window.getDashboardId();
    const data = new FormData();
    data.append("user_id", user_id);
    data.append("dashboard_id", dashboard_id);
    data.append("action", action);
    data.append("widget_id", widget_id);
    const url = window.ajax_url;
    await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((e) => {
        console.error(e);
      });
  }
  async initializeData() {
    this.getParams()
      .then(async () => {
        window.getWidgets().then((result) => {
          this.setState((state) => ({
            widgets: JSON.parse(JSON.stringify(result)),
          }));
        });
      })
      .then(async () => {
        this.getFromDB("layouts").then((result) => {
          this.setState((state) => ({
            layouts: JSON.parse(JSON.stringify(result)),
          }));
        });
      });
  }
}

export default App;
