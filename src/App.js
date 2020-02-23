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
      chart: [],
      layouts: [],
      user_id: window.getUserID(),
      action: window.getAction(),
      edit_opened: false,
      edit_target: [],
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
      window.getCharts().then(result => {
        this.setState({ chart: JSON.parse(JSON.stringify(result)) });
      });
    });

    this.getParams().then(async () => {
      this.getFromDB("layouts").then(result => {
        this.setState({ layouts: JSON.parse(JSON.stringify(result)) });
      });
    });
  }

  //Context Menu Actions
  handleContextOpenClick = (event, label, i) => {
    this.setState({
      show_context: event.target,
      context_target: JSON.parse(JSON.stringify(this.state.chart[i])),
      context_param: label,
      context_x: event.clientX - 2,
      context_y: event.clientY - 4
    });
  };
  handleContextClose = () => {
    this.setState({
      show_context: null,
      context_x: null,
      context_y: null
    });
  };
  handleContextClick = () => {
    this.setState({
      show_popup: true,
      show_context: null,
      context_x: null,
      context_y: null
    });
  };
  handlePopupClose = () => {
    this.setState({
      show_popup: false
    });
  };
  // Chart Edit window Actions
  handleEditClick = i => {
    this.setState({
      edit_opened: true,
      edit_target: this.state.chart[i],
      edit_target_id: i
    });
  };
  handleEditClose = () => {
    this.setState({
      edit_opened: false,
      edit_target: []
    });
  };
  //Add Widget
  handleWidgetAdd = widget => {
    let chart = this.state.chart;
    chart.push(JSON.parse(widget));
    this.setState({ chart }, () => {
      this.saveChartsToDB(this.state.layouts, chart);
    });
  };
  //delete Widget
  handleWidgetRemove = i => {
    console.log(i);
    let chart = this.state.chart;
    let layouts = this.state.layouts;

    chart.splice(i, 1);
    layouts.lg.splice(i, 1);

    this.setState({ chart, layouts }, () => {
      this.saveChartsToDB(layouts, chart);
    });
  };
  // State Update Methods
  handleTitleChange = event => {
    let edit_target = { ...this.state.edit_target };
    edit_target.title = event.target.value;
    this.setState({
      edit_target
    });
  };

  handleTypeChange = event => {
    let edit_target = { ...this.state.edit_target };
    edit_target.type = event.target.value;
    this.setState({
      edit_target
    });
  };

  handleStartChange = date => {
    let edit_target = { ...this.state.edit_target };
    edit_target.params.start_date = date.format("l");
    this.setState({
      edit_target
    });
  };
  handleEndChange = date => {
    let edit_target = { ...this.state.edit_target };
    edit_target.params.end_date = date.format("l");
    this.setState({
      edit_target
    });
  };
  handleParamDataTypeChange = event => {
    let edit_target = { ...this.state.edit_target };
    edit_target.params.datatype = event.target.value;
    this.setState({
      edit_target
    });
  };
  handleProductChange = event => {
    let edit_target = { ...this.state.edit_target };
    edit_target.params.product_id = event.target.value;
    this.setState({
      edit_target
    });
  };
  handleParamIntervalChange = event => {
    let edit_target = { ...this.state.edit_target };
    edit_target.params.interval = event.target.value;
    this.setState({
      edit_target
    });
  };

  handleIntervalChange = event => {
    let edit_target = { ...this.state.edit_target };
    edit_target.interval = event.target.value;
    this.setState({
      edit_target
    });
  };
  handleChartChange = () => {
    if (this.state.chart.length > 0) {
      let chart = this.state.chart;
      chart[this.state.edit_target_id] = this.state.edit_target;
      this.setState({ chart }, () => {
        this.saveChartsToDB(this.state.layouts, chart);
      });
    }
  };

  render() {
    if (this.state.chart.length === 0 || this.state.layouts.length === 0) {
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
            chart={this.state.edit_target}
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
              charts={this.state.chart}
              layouts={this.state.layouts}
              handleWidgetAdd={this.handleWidgetAdd}
            >
              {this.state.chart.map((chart, i) => {
                if (chart.type === "table") {
                  return (
                    <Card
                      variant="outlined"
                      key={i}
                      className="grid-item"
                      data-grid={{
                        x: chart.defaultpos.h * i,
                        y: chart.defaultpos.w * i,
                        h: chart.defaultpos.h,
                        w: chart.defaultpos.w,
                        minH: chart.defaultpos.minH,
                        minW: chart.defaultpos.minW,
                        maxH: chart.defaultpos.minH
                      }}
                    >
                      <Button
                        color="primary"
                        size="small"
                        onClick={() => {
                          this.handleEditClick(i);
                        }}
                        style={{ position: "absolute", top: 0, left: 0 }}
                      >
                        <DehazeIcon />
                      </Button>
                      <IconButton
                        aria-label="delete"
                        onClick={() => {
                          this.handleWidgetRemove(i);
                        }}
                      >
                        <CloseIcon />
                      </IconButton>
                      <ChartWrapper
                        chart={chart}
                        handleContextOpenClick={this.handleContextOpenClick}
                        chartIndex={i}
                      />
                    </Card>
                  );
                } else {
                  return (
                    <Card
                      variant="outlined"
                      key={i}
                      className="grid-item"
                      data-grid={{
                        x: chart.defaultpos.h * i,
                        y: chart.defaultpos.w * i,
                        h: chart.defaultpos.h,
                        w: chart.defaultpos.w,
                        minH: chart.defaultpos.minH,
                        minW: chart.defaultpos.minW
                      }}
                      style={{ position: "relative" }}
                    >
                      <Button
                        color="primary"
                        size="small"
                        onClick={() => {
                          this.handleEditClick(i);
                        }}
                        style={{ position: "absolute", top: 0, left: 0 }}
                      >
                        <DehazeIcon />
                      </Button>
                      {/* <IconButton
                        size="small"
                        aria-label="delete"
                        onClick={() => {
                          this.handleWidgetRemove(i);
                        }}
                        style={{ position: "absolute", top: 0, right: 0 }}
                      >
                        <CloseIcon />
                      </IconButton> */}
                      <ChartWrapper
                        chart={chart}
                        handleContextOpenClick={this.handleContextOpenClick}
                        handleContextClose={this.handleContextClose}
                        chartIndex={i}
                      />
                    </Card>
                  );
                }
              })}
            </Layout>
          </Container>
        </div>
      );
    }
  }

  async getParams() {
    let url = window.location.href;
    let dashboard_name = new URL(url).pathname;
    let user_id = window.getUserID();
    let action = "dashboard_lookup";
    let dashboard_id = null;
    dashboard_name = dashboard_name.replace("/", "");
    if (isNaN(dashboard_name)) {
      dashboard_id = await fetch(
        "http://local.admin.admediary.com/dashboard/chartMgmt.php?user_id=" +
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

  async getFromDB(key) {
    let ls = {};
    const action = "get_layout";
    const user_id = window.getUserID();
    const dashboard_id = window.getDashboardId();

    ls = await fetch(
      "http://local.admin.admediary.com/dashboard/chartMgmt.php?user_id=" +
        user_id +
        "&action=" +
        action +
        "&dashboard_id=" +
        dashboard_id
    )
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
    await fetch("http://local.admin.admediary.com/dashboard/chartMgmt.php", {
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
