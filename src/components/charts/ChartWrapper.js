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
        switch(type){
            case 'bar':
                return (
                <Card variant="outlined" key={this.props.key} className="grid-item" data-grid={chart.defaultpos}>
                    <h1>Bar Chart</h1>
        			<BarChart
	        			data={this.props.feeds[2].data}
		        		title={this.props.feeds[2].title}
			        	color="#7070D1"
			        />
		        </Card>
                );
                break;
            case 'line':
                return (
                <Card variant="outlined" key={this.props.key} className="grid-item" data-grid={chart.defaultpos}>
        			<LineChart
	        			data={this.props.feeds[2].data}
		        		title={this.props.feeds[2].title}
			        	color="#7070D1"
			        />
		        </Card>
                );
                break;
                case 'doughnut':
                return (
                <Card variant="outlined" key={this.props.key} className="grid-item" data-grid={chart.defaultpos}>
        			<DoughnutChart
	        			data={this.props.feeds[2].data}
		        		title={this.props.feeds[2].title}
			        	color="#7070D1"
			        />
		        </Card>
                );
                break;
                case 'pie':
                return (
                <Card variant="outlined" key={this.props.key} className="grid-item" data-grid={chart.defaultpos}>
        			<PieChart
	        			data={this.props.feeds[2].data}
		        		title={this.props.feeds[2].title}
			        	color="#7070D1"
			        />
		        </Card>
                );
                break;
                case 'polar':
                return (
                <Card variant="outlined" key={this.props.key} className="grid-item" data-grid={chart.defaultpos}>
        			<PolarChart
	        			data={this.props.feeds[2].data}
		        		title={this.props.feeds[2].title}
			        	color="#7070D1"
			        />
		        </Card>
                );
                break;
        }
        return <h1>{this.props.chart.type}</h1>;
    }
}

export default ChartWrapper;
