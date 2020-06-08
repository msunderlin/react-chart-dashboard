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
    this.myChart.options.title.text = this.props.title;
    this.myChart.update();
  }
  componentWillUnmount(){
    this.myChart.destroy();
  }
  componentDidMount() {
    document.addEventListener("contextmenu", this._handleContextMenu);
    this.myChart = new Chart(this.canvasRef.current, {
      type: "bar",
      options: {
        tooltips: {
          mode: "index",
          callbacks: {
            label: (tooltipItem, data) => {
              let datatype = this.props.params.datatype;
              let sum = 0;
              if(datatype==='count'){
              data.datasets.forEach(function(dataset) {
                sum += Number(dataset.data[tooltipItem.index]);
              });
            }
              var label = data.datasets[tooltipItem.datasetIndex].label || "";

              if (label) {
                label += ": ";
              }
                label += Math.round(tooltipItem.yLabel * 10) / 10;

              if(datatype==='count'){
                label+= ' (';
                  label += (tooltipItem.yLabel === 0)?0: Math.round((tooltipItem.yLabel / sum)*10);
                  label += '%)';
              }
              return label;
            },
            footer: (tooltipItems, data) =>{
              let datatype = this.props.params.datatype;
              if(datatype==='count'){
              let sum = 0;
              tooltipItems.forEach(function(tooltipItem) {
                sum += Number(
                  data.datasets[tooltipItem.datasetIndex].data[
                    tooltipItem.index
                  ]
                );
              });
              return "Total : " + sum;
            }
          }
          }
        },
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              stacked:  false,
              ticks: {
                min: 0
              }
            }
          ],
          xAxes: [
            {
              display:false,
              stacked:  false
            }
          ]
        },
        title: { display: true, text: this.props.title },
        legend: {
          display:false,
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
