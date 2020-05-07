import React from "react";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import DehazeIcon from "@material-ui/icons/Dehaze";
import CircleLoader from "./components/loader/CircleLoader";
import Layout from "./components/layout/Layout";
import ChartWrapper from "./components/charts/ChartWrapper";
import EditWidget from "./components/edit/EditWidget";
import ContextMenu from "./components/contextMenu/contextMenu";
import PopupChart from "./components/layout/PopupChart";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.getParams();
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
      show_popup: false
    };
  }

  componentDidMount() {
    this.getParams().then(async () => {
      window.getWidgets().then(result => {
        this.setState(state => ({
          widgets: JSON.parse(JSON.stringify(result))
        }));
      });
    });

    this.getParams().then(async () => {
      this.getFromDB("layouts").then(result => {
        this.setState(state => ({
          layouts: JSON.parse(JSON.stringify(result))
        }));
      });
    });
  }

  componentDidUpdate() {
    console.log("App.js updated");
  }

  //Context Menu Actions
  handleContextOpenClick = (event, label, i) => {
    this.setState(state => ({
      show_context: event.target,
      context_target: JSON.parse(JSON.stringify(state.widgets[i])),
      context_param: label,
      context_x: event.clientX - 2,
      context_y: event.clientY - 4
    }));
  };
  handleContextClose = () => {
    this.setState(state => ({
      show_context: null,
      context_x: null,
      context_y: null
    }));
  };
  handleContextClick = () => {
    this.setState(state => ({
      show_popup: true,
      show_context: null,
      context_x: null,
      context_y: null
    }));
  };
  handlePopupClose = () => {
    this.setState(state => ({
      show_popup: false
    }));
  };
  // Chart Edit window Actions
  handleEditClick = i => {
    this.setState(state => ({
      edit_opened: true,
      edit_target: this.state.widgets[i],
      edit_target_id: i
    }));
  };
  handleEditClose = () => {
    this.setState(state => ({
      edit_opened: false,
      edit_target: []
    }));
  };
  //Add Widget
  handleWidgetAdd = widget => {
    let chart = this.state.widgets;
    chart.push(JSON.parse(widget));
    this.setState(
      state => ({
        chart
      }),
      () => {
        this.saveChartsToDB(this.state.layouts, chart);
      }
    );
  };
  //delete Widget
  handleWidgetRemove = i => {
    console.log(i);

    let chart = JSON.parse(JSON.stringify(this.state.widgets));
    let layouts = JSON.parse(JSON.stringify(this.state.layouts));

    chart.splice(i, 1);
    Object.entries(layouts).forEach(entry => {
      let key = entry[0];
      layouts[key].splice(i, 1);
    });
    this.setState(state => ({
      chart,
      layouts
    }));
    this.saveChartsToDB(layouts, chart);
  };
  handleLayoutsChange = layouts => {
    this.setState(state => ({
      layouts
    }));
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
        width: "100%"
      };
      return (
        <div style={wrapper_style}>
          <CircleLoader />
        </div>
      );
    } else {
      return (
        <div>
          <PopupChart
            popupchart={this.state.context_target}
            context_date={this.state.context_param}
            handleClose={this.handlePopupClose}
            show_popup={this.state.show_popup}
          />

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
            title={this.state.edit_target.title}
            products={[]}
          />
          <ContextMenu
            visible={this.state.show_context}
            handleContextClose={this.handleContextClose}
            chart={this.state.context_target}
            mouseX={this.state.context_x}
            mouseY={this.state.context_y}
            handleContextClick={this.handleContextClick}
          />
          <Container disableGutters={false} maxWidth="lg">
            <Layout
              //charts={this.state.widgets}
              layouts={this.state.layouts}
              handleWidgetAdd={this.handleWidgetAdd}
              handleLayoutsChange={this.handleLayoutsChange}
            >
              {this.state.widgets.map((widget, i) => {
                var pos = this.state.layouts.lg[i];
                console.log(pos);
                return (
                  <Card
                    variant="outlined"
                    key={i}
                    className="grid-item"
                    data-grid={{
                      x: pos.h * i,
                      y: pos.w * i,
                      h: pos.h,
                      w: pos.w,
                      minH: pos.minH,
                      minW: pos.minW
                    }}
                    style={{ position: "relative" }}
                  >
                    <Button
                      color="primary"
                      size="small"
                      onClick={() => {
                        this.handleEditClick(i);
                      }}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        zIndex: 500
                      }}
                    >
                      <DehazeIcon />
                    </Button>
                    <IconButton
                      size="small"
                      aria-label="delete"
                      onClick={() => {
                        this.handleWidgetRemove(i);
                      }}
                      style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        zIndex: 500
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                    <ChartWrapper
                      widget_id={widget}
                      handleContextOpenClick={this.handleContextOpenClick}
                      handleContextClose={this.handleContextClose}
                      chartIndex={i}
                    />
                  </Card>
                );
              })}
            </Layout>
          </Container>
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
          .then(response => response.json())
          .then(data => {
            return data.dashboard_id;
          })
          .catch(e => {});
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
      .then(response => response.json())
      .then(data => {
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
}

export default App;
