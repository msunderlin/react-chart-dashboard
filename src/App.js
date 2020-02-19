import React from "react";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import DehazeIcon from "@material-ui/icons/Dehaze";
import NavBar from "./components/navbar/NavBar";
import CircleLoader from "./components/loader/CircleLoader";
import Layout from "./components/layout/Layout";
import ChartWrapper from "./components/charts/ChartWrapper";
import EditWidget from "./components/edit/EditWidget";
import { formatMs } from "@material-ui/core";

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
      edit_target_id: 0
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
  handleEditClick = i => {
    console.log(i);
    this.setState({
      edit_opened: true,
      edit_target: this.state.chart[i],
      edit_target_id: i
    });
  };
  handleEditClose = () => {
    this.setState({
      edit_opened: false
    });
  };

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
    edit_target.params.start_date = date.format('l');
    this.setState({
      edit_target
    });
  };
  handleEndChange = date=> {
    let edit_target = { ...this.state.edit_target };
    edit_target.params.end_date = date.format('l');
    this.setState({
      edit_target
    });
  };

  handleProductChange = event => {
    let edit_target = { ...this.state.edit_target };
    edit_target.params.end_date = event.target.value;
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

  handleIntervalChange = event =>{
    let edit_target = { ...this.state.edit_target };
    edit_target.interval = event.target.value;
    this.setState({
      edit_target
    });
  }
  handleChartChange = () => {
    if (this.state.chart.length > 0) {
      let chart = this.state.chart;
      chart[this.state.edit_target_id] = this.state.edit_target;
      this.setState({ chart });
      this.saveChartsToDB(this.state.layouts, chart);
      this.forceUpdate();
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
          <EditWidget
            chart={this.state.edit_target}
            opened={this.state.edit_opened}
            handleClose={this.handleEditClose}
            handleTitleChange={this.handleTitleChange}
            handleTypeChange={this.handleTypeChange}
            handleStartChange={this.handleStartChange}
            handleEndChange={this.handleEndChange}
            handleIntervalChange={this.handleIntervalChange}
            handleProductChange={this.handleProductChange}
            handleParamIntervalChange={this.handleParamIntervalChange}
            handleSave={this.handleChartChange}
            title={this.state.edit_target.title}
          />

          <Container disableGutters={false} maxWidth="lg">
            <NavBar>
              <h1>Hello From The NavBar</h1>
            </NavBar>
            <Layout charts={this.state.chart} layouts={this.state.layouts}>
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
                        onClick={() => {
                          this.handleEditClick(i);
                        }}
                        style={{ position: "absolute", top: 0, left: 0 }}
                      >
                        <DehazeIcon />
                      </Button>
                      <ChartWrapper chart={chart} />
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
                        onClick={() => {
                          this.handleEditClick(i);
                        }}
                        style={{ position: "absolute", top: 0, left: 0 }}
                      >
                        <DehazeIcon />
                      </Button>
                      <ChartWrapper chart={chart} />
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
        "http://local.admin.admediary.com/test/chartMgmt.php?user_id=" +
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
      "http://local.admin.admediary.com/test/chartMgmt.php?user_id=" +
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
    console.log(charts);
    data.append("widgets", JSON.stringify(charts));
    data.append("positions", JSON.stringify({ layouts }));
    await fetch("http://local.admin.admediary.com/test/chartMgmt.php", {
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
