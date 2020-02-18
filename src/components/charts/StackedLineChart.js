import React from "react";
import Chart from "chart.js";
class StackedLineChart extends React.Component {
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
      type: "line",
      options: {
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              type: "time",
              time: {
                unit: "day"
              }
            }
          ],
          yAxes: [
            {
              stacked:true,
              ticks: {
                min: 0
              }
            }
          ]
        },
        title: { display: true, text: this.props.title },
        legend: {
          position: "bottom"
        }
      },
      data:this.props.data 
    });
    
  }


  render() {
    return <canvas ref={this.canvasRef} />;
  }
}

export default StackedLineChart;
