import React from "react";
import { Container, Card } from "@material-ui/core";
import NavBar from "./components/navbar/NavBar";
import Layout from "./components/layout/Layout";
import ChartWrapper from "./components/charts/ChartWrapper";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chart: window.getCharts()
    };
  }

  render() {
    return (
      <div>
        <Container>
          <NavBar>
            <h1>Hello From The NavBar</h1>
          </NavBar>
          <Layout>
            {this.state.chart.map((chart, i) => {
		    console.log(this.state);
              return (
                   
                  <ChartWrapper chart={chart} k={i} />
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
