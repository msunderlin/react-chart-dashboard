import React from 'react';
import Layout from './components/layout/Layout';
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
<div>
		<Layout >
		<div key="a" className="grid-item" data-grid={{x:0, y:0,w:4,h:50,static:true}}>
			<div><h1>This is the nav bar</h1></div>
		</div>
		<div key="b" className="grid-item" data-grid={{x:4,y:0,w:18,h:4,minH:8,minW:8}}>

			<LineChart
				data={this.state.feeds[0].data}
				title={this.state.feeds[0].title}
				color="#70CAD1"
			/>
		</div>
		<div key="c" className="grid-item" data-grid={{x:4, y:0,w:8,h:8,minH:8,minW:8}}>
			
			<BarChart
				data={this.state.feeds[2].data}
				title={this.state.feeds[2].title}
				color="#7070D1"
			/>
		</div>
		<div key="d" className="grid-item" data-grid={{x:4,y:0,w:6,h:8,minH:8,minW:8}}>
			
			<BarChart
				data={this.state.feeds[2].data}
				title={this.state.feeds[2].title}
				color="#70CAD1"
			/>
		</div>
		<div key="e" className="grid-item" data-grid={{x:8, y:0,w:6,h:8,minH:8,minW:8}}>
			<PieChart 
				data={this.state.feeds[4].data}
				title={this.state.feeds[4].title}
		        colors= {['#a8e0ff', '#8ee3f5', '#70cad1', '#3e517a', '#b08ea2', '#BBB6DF'] }
			/>
		</div>
		<div key="f" className="grid-item" data-grid={{x:8, y:0,w:6,h:8,minH:8,minW:8}}>
			<DoughnutChart
				data={this.state.feeds[4].data}
				title={this.state.feeds[4].title}
		        colors= {['#a8e0ff', '#8ee3f5', '#70cad1', '#3e517a', '#b08ea2', '#BBB6DF'] }
			/>
		</div>
		<div key="g" className="grid-item" data-grid={{x:4, y:0,w:6,h:8,minH:8,minW:8}}>
			<PolarChart 
				data={this.state.feeds[4].data}
				title={this.state.feeds[4].title}
		        colors= {['#a8e0ff', '#8ee3f5', '#70cad1', '#3e517a', '#b08ea2', '#BBB6DF'] }
			/>
		</div>
		</Layout>
		</div>
	);
}
}

export default App;
