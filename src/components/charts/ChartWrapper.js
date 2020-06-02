import React, { Component } from "react";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import DoughnutChart from "./DoughnutChart";
import PieChart from "./PieChart";
import PolarChart from "./PolarChart";
import StackedBarChart from "./StackedBarChart";
import StackedLineChart from "./StackedLineChart";
import Table from "../table/Table";
import CircleLoader from "../loader/CircleLoader";
import { parseIsolatedEntityName } from "typescript";
import { forwardRef } from "react";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import RefreshIcon from "@material-ui/icons/Refresh";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Refresh: forwardRef((props, ref) => <RefreshIcon {...props} ref={ref} />),
  Save: forwardRef((props, ref) => <RefreshIcon {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

class ChartWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      widget_id: this.props.widget_id,
      widget_url: "",
      widget: [],
      widgetParams: [],
      data: [],
      source: [],
      sourceParams: [],
      loaded: false,
      init_loaded: false,
    };

    this.getHeader = null;
  }

  //storing the instance of the set interval here.
  timer = 0;
  //Lifecycle Methods
  async componentDidMount() {
    this.timer = 3;
    await this.initalizeData();

    if (this.state.widget.type_id !== "6") {
      let url = window.base_url + this.state.widget_url;
    console.log(url);
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          this.setState({ data: data });
        });
    }
    if (this.getHeader) {
    }
    if (this.state.widget.type_id !== "6") {
      this.timer = setInterval(() => {
        let url = window.base_url + this.state.widget_url;
        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            this.setState({ data: data });
          });
      }, this.state.widgetParams.interval);
    }
  }
  componentWillUnmount() {
    clearInterval(this.timer);
    this.setState({ data: [] });
  }
  componentDidUpdate() {
    if (this.props.paused) {
      if (this.timer > 0) {
        clearInterval(this.timer);
        this.timer = 0;
      }
    } else {
      if (this.state.widget.type_id !== "6") {
        if (this.timer === 0) {
          this.initalizeData().then(() => {
            clearInterval(this.timer);
            this.timer = 3;
            let url = window.base_url + this.state.widget_url;
            fetch(url)
              .then((response) => response.json())
              .then((data) => {
                this.setState({ data: data });
              });
            this.timer = setInterval(() => {
              fetch(url)
                .then((response) => response.json())
                .then((data) => {
                  this.setState({ data: data });
                });
            }, this.state.widgetParams.interval);
          });
        }
      }
    }
  }

  render() {
    const chart = this.state.widget;
    console.log(chart);
    const type = this.state.widget.type_id;
    if (this.state.data.length === 0 && type !== "6") {
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
      switch (type) {
        case "1":
          //BarChart
         
          return (
            <BarChart
              data={this.state.data}
              title={chart.title}
              stacked={chart.stacked ? true : false}
              color="#29a6ca"
            />
          );
        case "2":
          //LineChart
        
          return <LineChart data={this.state.data} title="" color="#7070D1" />;
        case "3":
          //DoughnutChart
          return (
            <DoughnutChart
              data={this.state.data}
              title={chart.title}
              colors={[
                "#29a6ca",
                "#29c7ca",
                "#82ddbe",
                "#0091ff",
                "#b08ea2",
                "#BBB6DF",
              ]}
            />
          );
        case "4":
          //PieChart
          return (
            <PieChart
              data={this.state.data}
              title={chart.title}
              colors={[
                "#29a6ca",
                "#29c7ca",
                "#82ddbe",
                "#0091ff",
                "#b08ea2",
                "#BBB6DF",
              ]}
            />
          );
        case "5":
          //PolarChart
          return (
            <PolarChart
              data={this.state.data}
              title={chart.title}
              colors={[
                "#29a6ca",
                "#29c7ca",
                "#82ddbe",
                "#0091ff",
                "#b08ea2",
                "#BBB6DF",
              ]}
            />
          );
        case "6":
          //Table
          let columns = this.state.sourceParams
            .map((param, i) => {
              if (param.table_columns.length > 10) {
                return JSON.parse(param.table_columns);
              }
            })
            .filter((a) => a != null);
            console.log(columns)
          columns = [...columns[0]];
          let actions = this.state.sourceParams
            .map((param, i) => {
              if (param.table_actions.length > 10) {
                return param.table_actions;
              }
            })
            .filter((a) => a != null);
            actions = JSON.stringify(actions);
          return (
            <Table
              title={chart.title}
              columns={columns}
              actions={actions}
              options={{
                search: false,
                sort: true,
                paging: false,
                headerStyle: { position: "sticky", top: 0, backgroundColor:"#29c7ca",color:"#fff"},
                padding: "dense",
              }}
              innerRef={(header) => (this.getHeader = header)}
              url={window.base_url + this.state.widget_url}
            />
          );
        case "7":
          return (
            <StackedBarChart
              handleContextOpenClick={this.props.handleContextOpenClick}
              chartIndex={this.props.chartIndex}
              source={chart.source}
              params={chart.params}
              data={this.state.data}
              title={chart.title}
              // stacked={chart.stacked ? true : false}
              stacked = {false}
              colors={[
                "#29a6ca",
                "#29c7ca",
                "#82ddbe",
                "#0091ff",
                "#b08ea2",
                "#BBB6DF",
              ]}
              interval={chart.params.interval}
            />
          );
          case "8":
            return (
              <StackedLineChart
                handleContextOpenClick={this.props.handleContextOpenClick}
                chartIndex={this.props.chartIndex}
                source={chart.source}
                params={chart.params}
                data={this.state.data}
                title={chart.title}
                stacked={chart.stacked ? true : false}
                colors={[
                  "#29a6ca",
                  "#29c7ca",
                  "#82ddbe",
                  "#0091ff",
                  "#b08ea2",
                  "#BBB6DF",
                ]}
                interval={chart.params.interval}
              />
            );
        default:
          return "";
      }
    }
  }

  //Helper Functions
  async getWidget(id) {
    const action = "get_widget";
    const user_id = window.getUserID();
    const dashboard_id = window.getDashboardId();
    const url =
      window.ajax_url +
      "?user_id=" +
      user_id +
      "&action=" +
      action +
      "&widget_id=" +
      id +
      "&dashboard_id=" +
      dashboard_id;
    const widget = await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error("Error:", error);
        return false;
      });
    return await widget;
  }

  async getSource(id) {
    const action = "get_source";
    const user_id = window.getUserID();
    const url =
      window.ajax_url +
      "?user_id=" +
      user_id +
      "&action=" +
      action +
      "&source_id=" +
      id;
    const source = await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error("Error:", error);
        return false;
      });
    return await source;
  }
  async getSources() {
    const action = "get_sources";
    const user_id = window.getUserID();
    const url = window.ajax_url + "?user_id=" + user_id + "&action=" + action;
    const sources = await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        return data.sources;
      })
      .catch((error) => {
        console.error("Error:", error);
        return false;
      });

    return await sources;
  }
  async getSourceParams(id) {
    const action = "get_sourceparams";
    const user_id = window.getUserID();
    const url =
      window.ajax_url +
      "?user_id=" +
      user_id +
      "&action=" +
      action +
      "&source_id=" +
      id;
    const sourceParams = await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error("Error:", error);
        return false;
      });
    return await sourceParams;
  }

  async buildUrl(widget, source, sourceParams) {
    var url = source.source_url;
    url += "?user_id=" + window.getUserID();
    for (let i = 0; i < sourceParams.length; i++) {
      url += "&";
      url += sourceParams[i].param_url_name + "=";
      if (widget.params == null) {
        url += sourceParams[i].default_value;
      } else {
        let params = JSON.parse(widget.params);
        if (typeof params[sourceParams[i].param_url_name] == "undefined") {
          url += sourceParams[i].default_value;
        } else {
          url += params[sourceParams[i].param_url_name];
        }
      }
    }
    return url;
  }
  async saveToDb() {
    const action = "save_widget";
    const user_id = window.getUserID();
    const url = window.ajax_url + "?user_id=" + user_id + "&action=" + action;

    const sources = await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        return data.sources;
      })
      .catch((error) => {
        console.error("Error:", error);
        return false;
      });

    return await sources;
  }
  async initalizeData() {
    let widget = await this.getWidget(this.props.widget_id);
    let widgetParams = JSON.parse(widget.params);
    let source = await this.getSource(widget.source_id);
    let sourceParams = await this.getSourceParams(source.source_id);
    let init_loaded = true;
    let widget_url = await this.buildUrl(widget, source, sourceParams);
    this.setState((state) => ({
      widget,
      widgetParams,
      source,
      sourceParams,
      widget_url,
      init_loaded,
    }));
  }
}

export default ChartWrapper;

const buildQuery = (data) => {
  // If the data is already a string, return it as-is
  if (typeof data === "string") return data;

  // Create a query array to hold the key/value pairs
  var query = [];

  // Loop through the data object
  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      // Encode each key and value, concatenate them into a string, and push them to the array
      query.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]));
    }
  }

  // Join each item in the array with a `&` and return the resulting string
  return query.join("&");
};
