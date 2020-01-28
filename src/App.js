import React from "react";
import { Container, Card } from "@material-ui/core";
import NavBar from "./components/navbar/NavBar";
import Layout from "./components/layout/Layout";
import ChartWrapper from "./components/charts/ChartWrapper";
// import StickyHeadTable from "./components/table/StickyHeadTable";

// Data generation
function getRandomArray(numItems) {
  // Create random array of objects
  let names = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let data = [];
  for (var i = 0; i < numItems; i++) {
    data.push({
      label: names[i],
      value: Math.round(20 + 80 * Math.random())
    });
  }
  return data;
}

function getRandomDateArray(numItems) {
  // Create random array of objects (with date)
  let data = [];
  let baseTime = new Date("2018-05-01T00:00:00").getTime();
  let dayMs = 24 * 60 * 60 * 1000;
  for (var i = 0; i < numItems; i++) {
    data.push({
      time: new Date(baseTime + i * dayMs),
      value: Math.round(20 + 80 * Math.random())
    });
  }
  return data;
}

function getData() {
  let data = [];

  data.push({
    title: "Visits",
    data: getRandomDateArray(150)
  });

  data.push({
    title: "Categories",
    data: getRandomArray(20)
  });

  data.push({
    title: "Categories",
    data: getRandomArray(10)
  });

  data.push({
    title: "Data 4",
    data: getRandomArray(6)
  });

  data.push({
    title: "Data 5",
    data: getRandomArray(5)
  });
  data.push({
    title: "Data 6",
    data: getRandomArray(10)
  });

  return data;
}



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chart: window.getCharts()
    };
  }

  render() {
    console.log(getData());
    return (
      <div>
        <Container>
          <NavBar>
            <h1>Hello From The NavBar</h1>
          </NavBar>
          <Layout>
            {this.state.chart.map((chart, i) => {
              return (
                <Card
                  variant="outlined"
                  key={i}
                  className="grid-item"
                  data-grid={{
                    x: chart.defaultpos.h * i,
                    y: chart.defaultpos.w * i,
                    h: chart.defaultpos.h,
                    w: chart.defaultpos.w,
                    minH: chart.defaultpos.minH,
                    minW: chart.defaultpos.minW
                  }}
                >
                  <ChartWrapper chart={chart}  />
                </Card>
              );
            })}
            {/* <Card
             variant="outlined"
             key={5}
             className="grid-item"
             data-grid={{
               x: 0,
               y:12,
               h: 4,
               w: 4,
               minH: 4,
               minW:4
             }}
            >
            <StickyHeadTable title="I'm a table"></StickyHeadTable>
            </Card> */}
          </Layout>
          
        </Container>
      </div>
    );
  }
}

export default App;
