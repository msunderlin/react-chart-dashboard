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
    this.myChart.title = this.props.title;
    this.myChart.update();
  }

  componentDidMount() {
    document.addEventListener("contextmenu", this._handleContextMenu);
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
          ],
          xAxes: [
            {
              stacked: this.props.stacked ? true : false
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
    return <canvas ref={this.canvasRef} />;
  }

  handleOnClick = event => {
    let firstpoint = this.myChart.getElementAtEvent(event)[0];

    if (firstpoint) {
      var label = this.myChart.data.labels[firstpoint._index];
      this.props.handleContextOpenClick(event, label, this.props.chartIndex);
    }
  };

  _handleContextMenu = event => {
    event.preventDefault();
    this.handleOnClick(event);
  };
}

export default StackedBarChart;
