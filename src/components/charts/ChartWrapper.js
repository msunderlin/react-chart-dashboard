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
                return ();
                break;
        }
        return <h1>{this.props.chart.type}</h1>;
    }
}

export default ChartWrapper;
