import React from "react";
import { Container, Card } from "@material-ui/core";
import NavBar from "./components/navbar/NavBar";
import Layout from "./components/layout/Layout";
import ChartWrapper from "./components/charts/ChartWrapper";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chart: window.getCharts(window.getUserID()),
      user_id: window.getUserID()
    };
  }

  render() {
    return (
      <div>
        <Container disableGutters={false}maxWidth="lg">
          <NavBar>
            <h1>Hello From The NavBar</h1>
          </NavBar>
          <Layout>
            {this.state.chart.map((chart, i) => {
              console.log((chart.type === 'table'));
              if(chart.type === 'table'){
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
                      minW: chart.defaultpos.minW,
                     maxH:chart.defaultpos.minH,
                    }}
                  >
                    <ChartWrapper chart={chart} />
                  </Card>
                );
                }else{
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
                        minW: chart.defaultpos.minW,
                      }}
                    >
                      <ChartWrapper chart={chart} />
                    </Card>
                  );
                }
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
