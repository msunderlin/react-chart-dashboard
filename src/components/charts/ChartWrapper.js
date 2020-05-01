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
      init_loaded: false
    };

    this.getHeader = null;
  }

  //storing the instance of the set interval here.
  timer = 0;
  //Lifecycle Methods
  async componentDidMount() {
    await this.initalizeData();
    console.log(this.state);
    let url = window.base_url + this.state.widget_url;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          this.setState({ data: data });
        });
    if (this.getHeader) {
    }
    console.log('++++++++++++++++++++++++++++++++++++++++++');
      console.log(this.state);
    console.log('++++++++++++++++++++++++++++++++++++++++++');
       if (this.state.widget.type_id !== "6") {
    this.timer = window.setInterval(() => {
      let url = window.base_url + this.state.widget_url;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          this.setState({ data: data });
        });
    },5000) //this.state.widgetParams[0].interval)

    console.log(this.props.chart);
}
  }
  componentWillUnmount() {
    clearInterval(this.timer);
    this.setState({ data: [] });
  }
  componentDidUpdate() {
    console.log("Chart Wrapper updated");
  }

  render() {
    console.log(this.state);
    const chart = this.state.widget;
    const type = this.state.widget.type_id;
    if(this.state.data.length === 0 ){
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
    }else{
    switch (type) {
      case "1":
        //BarChart
        if (chart.stacked === 1) {
          return (
            <StackedBarChart
              handleContextOpenClick={this.props.handleContextOpenClick}
              chartIndex={this.props.chartIndex}
              source={chart.source}
              params={chart.params}
              data={this.state.data}
              title={chart.title}
              stacked={chart.stacked ? true : false}
              colors={["#4472C4", "#ED7D31", "#A5A5A5"]}
              interval={chart.params.interval}
            />
          );
        }
        return (
          <BarChart
            data={this.state.data}
            title={chart.title}
            stacked={chart.stacked ? true : false}
            color="red"
          />
        );
      case "2":
        //LineChart
        if (chart.stacked === 1) {
          return (
            <StackedLineChart
              handleContextOpenClick={this.props.handleContextOpenClick}
              chartIndex={this.props.chartIndex}
              source={chart.source}
              params={chart.params}
              data={this.state.data}
              title={chart.title}
              stacked={chart.stacked ? true : false}
              colors={["#4472C4", "#ED7D31", "#A5A5A5"]}
              interval={chart.params.interval}
            />
          );
        }
        return <LineChart data={this.state.data} title="" color="#7070D1" />;
      case "3":
        //DoughnutChart
        return (
          <DoughnutChart
            data={this.state.data}
            title={chart.title}
            colors={[
              "#a8e0ff",
              "#8ee3f5",
              "#70cad1",
              "#3e517a",
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
              "#a8e0ff",
              "#8ee3f5",
              "#70cad1",
              "#3e517a",
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
              "#a8e0ff",
              "#8ee3f5",
              "#70cad1",
              "#3e517a",
              "#b08ea2",
              "#BBB6DF",
            ]}
          />
        );
      case "6":
        //Table
        return (
          <Table
            title={chart.title}
            columns={chart.columns}
            actions={chart.actions}
            options={{
              search: false,
              sort: true,
              paging: false,
              headerStyle: { position: "sticky", top: 0 },
              maxBodyHeight: "335px",
              padding: "dense",
            }}
            innerRef={(header) => (this.getHeader = header)}
            url={chart.source}
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
    console.log('----------------------------');
    console.log(source);
    console.log('----------------------------');
    var url = source.source_url;
    for (let i = 0; i < sourceParams.length; i++) {
      if (i === 0) {
        url += "?";
      } else {
        url += "&";
      }
      url += sourceParams[i].param_url_name + "=";
      if (widget.params == null) {
        url += sourceParams[i].default_value;
      } else {
        if (
          typeof widget.params[
            sourceParams[i].param_url_name
          ] == "undefined"
        ) {
          url += sourceParams[i].default_value;
        } else {
          url += widget.params[
            sourceParams[i].param_url_name
          ];
        }
      }
    }
    console.log(url);
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
 async initalizeData(){
                        let widget = await this.getWidget(this.props.widget_id);
                        let widgetParams = JSON.parse(widget.params);
                        let source = await this.getSource(widget.source_id);
                        let sourceParams = await this.getSourceParams(
                          source.source_id
                        );
                        let init_loaded = true;
   let widget_url = await this.buildUrl(widget, source, sourceParams);
   console.log(widget_url);
                        this.setState((state) => ({
                          widget,
                          widgetParams,
                          source,
                          sourceParams,
                          widget_url,
                          init_loaded
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
