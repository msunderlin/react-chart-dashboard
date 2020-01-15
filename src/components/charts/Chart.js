import React, { Component } from 'react';
import BarChart from './components/charts/BarChart'; 
import LineChart from './components/charts/LineChart'; 
import DoughnutChart from './components/charts/DoughnutChart'; 
import PieChart from './components/charts/PieChart'; 
import PolarChart from './components/charts/PolarChart'; 

const ChartWrapper = ()=>{
    //build out chart
    let data = this.props.chart;
    console.log(data);

}

export default ChartWrapper;
