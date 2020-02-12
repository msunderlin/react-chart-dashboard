import React from "react";
import Chart from "chart.js";

class StackedBarChart extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidUpdate() {
    this.myChart.data.labels = this.props.data.labels;
    this.myChart.data.datasets = this.props.data.datasets;
    this.myChart.update();
  }

  componentDidMount() {
    this.myChart = new Chart(this.canvasRef.current, {
      type: "bar",
      options: {
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              stacked: this.props.stacked ? true : false,
              ticks: {
                min: 0,
                max: 100
              }
            }
          ]
        },
        title: { display: true, text: this.props.title },
        legend: {
          position: "bottom"
        }
      },
      data: this.props.data
    });
  }

  render() {
    return React.createElement("canvas", { ref: this.canvasRef });
  }
}

export default StackedBarChart;
