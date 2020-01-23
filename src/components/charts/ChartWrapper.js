import React, { Component } from "react";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import DoughnutChart from "./DoughnutChart";
import PieChart from "./PieChart";
import PolarChart from "./PolarChart";

class ChartWrapper extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = { feeds: []};
    fetch(this.props.chart.source)
    .then(response => response.json())
    .then(data=>{
        this.setState({feeds:data});
    });

  }

  componentDidMount() {
    window.setInterval(() => {
        fetch(this.props.chart.source)
        .then(response => response.json())
        .then(data=>{
            this.setState({feeds:data});
        });
    }, this.props.chart.interval);
  }
  render() {
      console.log(this.state.feeds)
    const chart = this.props.chart;
    const type = chart.type;
    switch (type) {
      case "bar":
        return <BarChart data={this.state.feeds} title="" color="#7070D1" />;
      case "line":
        return <LineChart data={this.state.feeds} title="" color="#7070D1" />;
      case "doughnut":
        return (
          <DoughnutChart
            data={this.state.feeds}
            title=""
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
            title=""
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
            title=""
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
      default:
        return "";
    }
  }
}

export default ChartWrapper;
