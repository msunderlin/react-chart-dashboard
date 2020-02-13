import React, { Component } from "react";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import DoughnutChart from "./DoughnutChart";
import PieChart from "./PieChart";
import PolarChart from "./PolarChart";
import StackedBarChart from "./StackedBarChart";
import Table from "../table/Table";
import DatePicker from "../pickers/DatePicker";
import moment from "moment";
import Container from "@material-ui/core/Container";
class ChartWrapper extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      feeds: [],
      startDate: moment(),
      endDate: moment(),
      title: this.props.chart.title + " " + moment().format("L"),
      source: this.props.chart.source
    };
    fetch(this.props.chart.source + "&date=" + moment().format("L"))
      .then(response => response.json())
      .then(data => {
        this.setState({ feeds: data });
      });
    this.getHeader = null;
  }
  handleStartDateChange = date => {
    this.setState({
      startDate: date,
      title: this.props.chart.title + " " + date.format("L"),
      feeds: [],
      source: this.props.chart.source + "&date=" + date.format("L")
    });

    fetch(this.props.chart.source + "&date=" + date.format("L"))
      .then(response => response.json())
      .then(data => {
        this.setState({ feeds: data });
      });
  };

  handleEndDateChange = date => {
    this.setState({ endDate: date });
  };
  componentDidMount() {
    if (this.getHeader) {
    }
    if (this.props.chart.type !== "table") {
      window.setInterval(() => {
        fetch(this.state.source)
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
          <React.Fragment>
            <Container>
              <DatePicker
                date={this.state.startDate}
                label="Start Date"
                handleDateChange={this.handleStartDateChange}
                variant="dialog"
                id="date-picker-start"
              />
            </Container>
            <BarChart
              data={this.state.feeds}
              title={this.state.title}
              stacked={chart.stacked ? true : false}
              color="red"
            />
          </React.Fragment>
        );
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
          <React.Fragment>
            <Container>
              <DatePicker
                date={this.state.startDate}
                label="Start Date"
                handleDateChange={this.handleStartDateChange}
                variant="dialog"
                id="date-picker-start"
              />
            </Container>
            
          <PieChart
            data={this.state.feeds}
            title={this.state.title}
            colors={[
              "#a8e0ff",
              "#8ee3f5",
              "#70cad1",
              "#3e517a",
              "#b08ea2",
              "#BBB6DF"
            ]}
          />
          </React.Fragment>
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
