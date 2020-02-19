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
    this.myChart.options.title.text = this.props.title;
     this.myChart.options.scales = {xAxes: [
      {
        type: "time",
        time: {
          unit:(this.props.interval==='hourly')?'hour':'day'
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
    ]};
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
                unit:(this.props.interval==='hourly')?'hour':'day'
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
