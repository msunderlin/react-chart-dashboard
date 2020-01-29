import React, { Component } from "react";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import DoughnutChart from "./DoughnutChart";
import PieChart from "./PieChart";
import PolarChart from "./PolarChart";
import StackedBarChart from "./StackedBarChart";
import Table from "../table/Table";

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
    this.getHeader = null;
  }

  componentDidMount() {
    if(this.getHeader) {
      console.log(this.getHeader);
      }
    if(this.props.chart.type !== 'table'){
    window.setInterval(() => {
        fetch(this.props.chart.source)
        .then(response => response.json())
        .then(data=>{
            this.setState({feeds:data});
        });
    }, this.props.chart.interval);
  }
  }
  render() {
      console.log(this.state.feeds)
    const chart = this.props.chart;
    const type = chart.type;
    switch (type) {
      case "bar":
        if(chart.stacked === 1){
        return <StackedBarChart data={this.state.feeds} title={chart.title} stacked={(chart.stacked)?true:false} colors={["#7070D1","#ff0000"]} />;
        }
        return <BarChart data={this.state.feeds} title={chart.title} stacked={(chart.stacked)?true:false} color="#7070D1" />;
      case "line":
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
            <Table title={chart.title} columns={chart.columns} options={{
              search:false,
              sort:true,
              paging:false,
              headerStyle: { position: 'sticky', top: 0 }, 
              maxBodyHeight: '650px',
              padding:"dense",
            }}
            innerRef={(header) => this.getHeader = header}
            url={chart.source}
          /> 
          );
      default:
        return "";
    }
  }
}

export default ChartWrapper;
