import React, { Component } from "react";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import DoughnutChart from "./DoughnutChart";
import PieChart from "./PieChart";
import PolarChart from "./PolarChart";
import StackedBarChart from "./StackedBarChart";
import StackedLineChart from "./StackedLineChart";
import Table from "../table/Table";
import moment from "moment";
class ChartWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feeds: [],

    };

      let query = buildQuery(this.props.chart.params);
    fetch(this.props.chart.source+'&'+query)
      .then(response => response.json())
      .then(data => {
        this.setState({ feeds: data });
      });
    this.getHeader = null;
  }

  componentDidMount() {
    if (this.getHeader) {
    }
    if (this.props.chart.type !== "table") {
      window.setInterval(() => {
      let query = buildQuery(this.props.chart.params);
    fetch(this.props.chart.source+'&'+query)
          .then(response => response.json())
          .then(data => {
            this.setState({ feeds: data });
          });
      }, this.props.chart.interval);
    }
  }

  render() {
    const chart = this.props.chart;
    const type = chart.type;
    switch (type) {
      case "bar":
        if (chart.stacked === 1) {
          return (
            <StackedBarChart
              data={this.state.feeds}
              title={chart.title}
              stacked={chart.stacked ? true : false}
              colors={["#7070D1", "#ff0000"]}
            />
          );
        }
        return (
          <BarChart
            data={this.state.feeds}
            title={chart.title}
            stacked={chart.stacked ? true : false}
            color="red"
          />
        );
      case "line":
        if(chart.stacked === 1){
          return (
           <StackedLineChart
            data={this.state.feeds}
            title={chart.title}
            stacked={chart.stacked?true:false}
              colors={["#4472C4", "#ED7D31","#A5A5A5"]}
              interval={chart.params.interval}
           /> 
          )
        }
        return <LineChart data={this.state.feeds} title="" color="#7070D1" />;
      case "doughnut":
        return (
          <DoughnutChart
            data={this.state.feeds}
            title={chart.title}
            colors={[
              "#a8e0ff",
              "#8ee3f5",
              "#70cad1",
              "#3e517a",
              "#b08ea2",
              "#BBB6DF"
            ]}
          />
        );
      case "pie":
        return (
          <PieChart
            data={this.state.feeds}
            title={chart.title}
            colors={[
              "#a8e0ff",
              "#8ee3f5",
              "#70cad1",
              "#3e517a",
              "#b08ea2",
              "#BBB6DF"
            ]}
          />
        );
      case "polar":
        return (
          <PolarChart
            data={this.state.feeds}
            title={chart.title}
            colors={[
              "#a8e0ff",
              "#8ee3f5",
              "#70cad1",
              "#3e517a",
              "#b08ea2",
              "#BBB6DF"
            ]}
          />
        );
      case "table":
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
              padding: "dense"
            }}
            innerRef={header => (this.getHeader = header)}
            url={chart.source}
          />
        );
      default:
        return "";
    }
  }
}

export default ChartWrapper;


const buildQuery = (data) => {

	// If the data is already a string, return it as-is
	if (typeof (data) === 'string') return data;

	// Create a query array to hold the key/value pairs
	var query = [];

	// Loop through the data object
	for (var key in data) {
		if (data.hasOwnProperty(key)) {

			// Encode each key and value, concatenate them into a string, and push them to the array
			query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
		}
	}

	// Join each item in the array with a `&` and return the resulting string
	return query.join('&');

};
