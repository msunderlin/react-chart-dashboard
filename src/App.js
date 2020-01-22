import React from 'react';
import {Container, Card} from '@material-ui/core';
import NavBar from './components/navbar/NavBar';
import Layout from './components/layout/Layout';
import ChartWrapper from './components/charts/ChartWrapper';

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


 function getCharts(){
	let data = [];
	data.push({
		type:'line',
		interval:0,
		defaultpos: {h:2,w:2,minW:2,minH:2},
		source:0
	});
	data.push({
		type:'bar',
		interval:0,
		defaultpos: {h:2,w:2,minW:2,minH:2},
		source:2
	});
	data.push({
		type:'bar',
		interval:0,
		defaultpos: {h:2,w:2,minW:2,minH:2},
		source: 2
	});
	data.push({
		type:'pie',
		interval:0,
		defaultpos: {h:2,w:2,minW:2,minH:2},
		source:4
	});
	data.push({
		type:'doughnut',
		interval:0,
		defaultpos: {h:2,w:2,minW:2,minH:2},
		source:4
	});
	data.push({
		type:'polar',
		interval:0,
		defaultpos: {h:2,w:2,minW:2,minH:2},
		source:4
	});
	return data;

}

class App extends React.Component{
  constructor(props){
	  super(props);
	  this.state = {
		  chart:getCharts(),
		  feeds:getData()
	  };
  }
	  componentDidMount() {
    window.setInterval(() => {
	    console.log('refreshing');
      this.setState({
		  chart:getCharts(),
		  feeds:getData()
      });

    }, 5000);
  }

render(){
	return (
<div>	
		<Container>
		<NavBar>
			<h1>Hello From The NavBar</h1>
		</NavBar>
		<Layout>
			{this.state.chart.map((chart,i)=>{
				return (	
                <Card variant="outlined" key={i} className="grid-item" data-grid={{
						x: chart.defaultpos.h * i,
						y: chart.defaultpos.w * i,
						h: chart.defaultpos.h,
						w: chart.defaultpos.w,
						minH: chart.defaultpos.minH,
						minW: chart.defaultpos.minW,

				}}
				
				>
					<ChartWrapper chart={chart}  feeds={this.state.feeds}/>
				</Card>
				);
			})
		}
		</Layout>
	
		</Container>
		</div>
	);
}
}

export default App;
