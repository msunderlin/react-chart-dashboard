import React, { Component } from 'react';
import BarChart from './BarChart'; 
import LineChart from './LineChart'; 
import DoughnutChart from './DoughnutChart'; 
import PieChart from './PieChart'; 
import PolarChart from './PolarChart'; 

class ChartWrapper extends Component{
    
    render(){

        const chart = this.props.chart;
        const type = chart.type;
        switch(type){
            case 'bar':
                return (
        			<BarChart
	        			data={this.props.feeds[chart.source].data}
		        		title={this.props.feeds[chart.source].title}
			        	color="#7070D1"
			        />
                );
            case 'line':
                return (
        			<LineChart
	        			data={this.props.feeds[chart.source].data}
		        		title={this.props.feeds[chart.source].title}
			        	color="#7070D1"
			        />
                );
                case 'doughnut':
                return (
        			<DoughnutChart
	        			data={this.props.feeds[chart.source].data}
		        		title={this.props.feeds[chart.source].title}
                        colors= {['#a8e0ff', '#8ee3f5', '#70cad1', '#3e517a', '#b08ea2', '#BBB6DF'] }
			        />
                );
                case 'pie':
                return (
        			<PieChart
	        			data={this.props.feeds[chart.source].data}
		        		title={this.props.feeds[chart.source].title}
                        colors= {['#a8e0ff', '#8ee3f5', '#70cad1', '#3e517a', '#b08ea2', '#BBB6DF'] }
			        />
                );
                case 'polar':
                return (
        			<PolarChart
	        			data={this.props.feeds[chart.source].data}
		        		title={this.props.feeds[chart.source].title}
                        colors= {['#a8e0ff', '#8ee3f5', '#70cad1', '#3e517a', '#b08ea2', '#BBB6DF'] }
			        />
                );
                default:
                    return '';
        }
    }
}

export default ChartWrapper;
