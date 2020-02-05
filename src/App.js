import React from "react";
import { Container, Card } from "@material-ui/core";
import NavBar from "./components/navbar/NavBar";
import Layout from "./components/layout/Layout";
import ChartWrapper from "./components/charts/ChartWrapper";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.getParams();
    this.state = {
      chart: [],
      user_id: window.getUserID(),
      action: window.getAction()
    };
  }

  async componentDidMount() {
    await this.getParams().then(async () => {
      console.log(window.getUserID());
      console.log(window.getAction());
      window.getCharts().then(result => {
        this.setState({
          chart: JSON.parse(JSON.stringify(result)),
          user_id: window.getUserID(),
          action: window.getAction()
        });
      });
    });
  }

  render() {
    return (
      <div>
        <Container disableGutters={false} maxWidth="lg">
          <NavBar>
            <h1>Hello From The NavBar</h1>
          </NavBar>
          <Layout 
           charts={this.state.charts} 
          >
            {this.state.chart.map((chart, i) => {
 
              if (chart.type === "table") {
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
                      maxH: chart.defaultpos.minH
                    }}
                  >
                    <ChartWrapper chart={chart} />
                  </Card>
                );
              } else {
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

  async getParams(){
    let url = window.location.href;
    let dashboard_name = new URL(url).pathname;
    let user_id = window.getUserID();
    let action = 'dashboard_lookup';
    let dashboard_id = null;
    dashboard_name = dashboard_name.replace('/','');
    if(isNaN(dashboard_name)){
dashboard_id = await fetch(
      "http://local.admin.admediary.com/test/chartMgmt.php?user_id=" +
      user_id +
      "&action=" +
      action +
      "&dashboard_name=" +
      dashboard_name
      )
      .then(response => response.json())
      .then(data => {
      return data.dashboard_id;
      }).catch(()=>{
      return false;
      });
      console.log(dashboard_id);
      if(dashboard_id === false){
        window.setAction('list');
      }else{
      window.setAction('get_dashboard'); 
        window.setDashboardId(await dashboard_id);
      }
      return await dashboard_id; 
      }

     
  }
}

export default App;
