import React from 'react';
import BarChart from './components/charts/BarChart'; 
import LineChart from './components/charts/LineChart'; 
import DoughnutChart from './components/charts/DoughnutChart'; 
import PieChart from './components/charts/PieChart'; 
import PolarChart from './components/charts/PolarChart'; 



// Data generation
function getRandomArray(numItems) {
  // Create random array of objects
  let names = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let data = [];
  for (var i = 0; i < numItems; i++) {
    data.push({
      label: names[i],
      value: Math.round(20 + 80 * Math.random()) });

  }
  return data;
}

function getRandomDateArray(numItems) {
  // Create random array of objects (with date)
  let data = [];
  let baseTime = new Date('2018-05-01T00:00:00').getTime();
  let dayMs = 24 * 60 * 60 * 1000;
  for (var i = 0; i < numItems; i++) {
    data.push({
      time: new Date(baseTime + i * dayMs),
      value: Math.round(20 + 80 * Math.random()) });

  }
  return data;
}

function getData() {
  let data = [];

  data.push({
    title: 'Visits',
    data: getRandomDateArray(150) });


  data.push({
    title: 'Categories',
    data: getRandomArray(20) });


  data.push({
    title: 'Categories',
    data: getRandomArray(10) });


  data.push({
    title: 'Data 4',
    data: getRandomArray(6) });

  data.push({
    title: 'Data 5',
    data: getRandomArray(5) });
  data.push({
    title: 'Data 6',
    data: getRandomArray(10) });

  return data;
}



class App extends React.Component{
  constructor(props){
	  super(props);
	  this.state = {
		  feeds:getData()
	  };
  }
	  componentDidMount() {
    window.setInterval(() => {
	    console.log('refreshing');
      this.setState({
        feeds: getData() });

    }, 5000);
  }

render(){
	return (
		<div className="App">
		<div classNmae="main chart-wrapper">
			<LineChart
				data={this.state.feeds[0].data}
				title={this.state.feeds[0].title}
				color="#70CAD1"
			/>
		</div>
		<div className="sub chart-wrapper">
			<BarChart
				data={this.state.feeds[1].data}
				title={this.state.feeds[1].title}
				color="#70CAD1"
			/>
		</div>
		<div className="sub chart-wrapper">
			<BarChart
				data={this.state.feeds[2].data}
				title={this.state.feeds[2].title}
				color="#7070D1"
			/>
		</div>
		<div className="sub chart-wrapper">
			<DoughnutChart
				data={this.state.feeds[3].data}
				title={this.state.feeds[3].title}
		        colors= {['#a8e0ff', '#8ee3f5', '#70cad1', '#3e517a', '#b08ea2', '#BBB6DF'] }
			/>
		</div>
<div className="sub chart-wrapper">
			<PieChart
				data={this.state.feeds[4].data}
				title={this.state.feeds[4].title}
		        colors= {['#a8e0ff', '#8ee3f5', '#70cad1', '#3e517a', '#b08ea2', '#BBB6DF'] }
			/>
		</div>
		<div className="sub chart-wrapper">
			<PolarChart
				data={this.state.feeds[5].data}
				title={this.state.feeds[5].title}
		        colors= {['#a8e0ff', '#8ee3f5', '#70cad1', '#3e517a', '#b08ea2', '#BBB6DF'] }
			/>
		</div>

		</div>
	);
}
}

export default App;
