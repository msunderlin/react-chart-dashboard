import React from "react";
import Chart from "chart.js";

class BarChart extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidUpdate() {
    this.myChart.data.labels = this.props.data.map(d => d.label);
    this.myChart.data.datasets[0].data = this.props.data.map(d => d.value);
    this.myChart.options.title.text = this.props.title;
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
              }
            }
          ]
        },
        title: { display: true, text: this.props.title },
        legend: {
          position: "bottom"
        }
      },
      data: {
        labels: this.props.data.map(d => d.label),
        datasets: [
          {
            label: this.props.data.map(d => d.label),
            data: this.props.data.map(d => d.value),
            backgroundColor: this.props.color
          }
        ]
      }
    });
  }

  render() {
    return React.createElement("canvas", { ref: this.canvasRef });
  }
}

export default BarChart;
