import React, { Component } from 'react';
import {Card } from '@material-ui/core';
import BarChart from './BarChart'; 
import LineChart from './LineChart'; 
import DoughnutChart from './DoughnutChart'; 
import PieChart from './PieChart'; 
import PolarChart from './PolarChart'; 

class ChartWrapper extends Component{
    
    render(){

        const chart = this.props.chart;
        const type = chart.type;
        const source = chart.source;
        const pos = chart.defaultpos;
        switch(type){
            case 'bar':
                return (
                <Card variant="outlined" key={this.props.key} className="grid-item" data-grid={pos}>
                    <h1>Bar Chart</h1>
        			<BarChart
	        			data={this.props.feeds[chart.source].data}
		        		title={this.props.feeds[chart.source].title}
			        	color="#7070D1"
			        />
		        </Card>
                );
                break;
            case 'line':
                return (
                <Card variant="outlined" key={this.props.key} className="grid-item" data-grid={pos}>
                    <h1>Line Chart</h1>
        			<LineChart
	        			data={this.props.feeds[chart.source].data}
		        		title={this.props.feeds[chart.source].title}
			        	color="#7070D1"
			        />
		        </Card>
                );
                break;
                case 'doughnut':
                return (
                <Card variant="outlined" key={this.props.key} className="grid-item" data-grid={pos}>
                    <h1>Doughnut Chart</h1>
        			<DoughnutChart
	        			data={this.props.feeds[chart.source].data}
		        		title={this.props.feeds[chart.source].title}
	        			data={this.props.feeds[2].data}
                        title={this.props.feeds[2].title}
                        colors= {['#a8e0ff', '#8ee3f5', '#70cad1', '#3e517a', '#b08ea2', '#BBB6DF'] }
			        />
		        </Card>
                );
                break;
                case 'pie':
                return (
                <Card variant="outlined" key={this.props.key} className="grid-item" data-grid={pos}>
                    <h1>Pie Chart</h1>
        			<PieChart
	        			data={this.props.feeds[chart.source].data}
		        		title={this.props.feeds[chart.source].title}
                        colors= {['#a8e0ff', '#8ee3f5', '#70cad1', '#3e517a', '#b08ea2', '#BBB6DF'] }
			        />
		        </Card>
                );
                break;
                case 'polar':
                return (
                <Card variant="outlined" key={this.props.key} className="grid-item" data-grid={pos}>
                    <h1>Polar Chart</h1>
        			<PolarChart
	        			data={this.props.feeds[chart.source].data}
		        		title={this.props.feeds[chart.source].title}
                        colors= {['#a8e0ff', '#8ee3f5', '#70cad1', '#3e517a', '#b08ea2', '#BBB6DF'] }
			        />
		        </Card>
                );
                break;
                default:
                    return '';
                    break;
        }
    }
}

export default ChartWrapper;
