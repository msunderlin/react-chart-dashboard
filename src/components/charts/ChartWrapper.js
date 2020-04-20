import React, { Component } from "react";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import DoughnutChart from "./DoughnutChart";
import PieChart from "./PieChart";
import PolarChart from "./PolarChart";
import StackedBarChart from "./StackedBarChart";
import StackedLineChart from "./StackedLineChart";
import Table from "../table/Table";

class ChartWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
	    widget_id: this.props.widget_id,
      widget: [],
      data: [],
      source: [],
      sourceParams: []

    };
   //    let url = window.base_url+this.props.chart.source;
    //    url = window.base_url+"/dashboard/getArray.php?"+this.props.chart.source.split('?').pop();
    //    let query = buildQuery(this.props.chart.params);
    //    fetch(url+ "&" + query)
    //     .then(response => response.json())
    //      .then(data => {
    //        this.setState({ data: data });
    //      });

    this.getHeader = null;
  }

  //storing the instance of the set interval here.
  timer = 0;
  //Lifecycle Methods
  componentDidMount() {
    if (this.getHeader) {
    }
    this.getWidget(this.props.widget_id).then(widget =>

     this.setState(state => ({
      widget
     }))).then( widget =>{
    this.getSource(this.state.widget.source_id).then(source =>
    this.setState(state => ({
     source
    })))}).then(source =>{
      this.getSourceParams(this.state.widget.source_id).then(sourceParams =>
        this.setState(state =>({
          sourceParams
        })))})

    //    if (this.props.chart.type !== "table") {
      /*      this.timer = window.setInterval(() => {
    let url = window.base_url+this.props.chart.source;
    url = window.base_url+"/dashboard/getArray.php?"+this.props.chart.source.split('?').pop();
    let query = buildQuery(this.props.chart.params);
    fetch(url+ "&" + query)
          .then(response => response.json())
          .then(data => {
            this.setState({ data: data });
          });
      }, this.props.chart.interval);
    }
    console.log(this.props.chart);*/
  }
  componentWillUnmount() {
    clearInterval(this.timer);
    this.setState({data:[]});
  }
  componentDidUpdate(){
    console.log('Chart Wrapper updated');
  }

  render() {
    console.log(this.state);
    const chart = this.state.widget;
    const type = this.state.widget.type_id;
    switch (type) {
      case "bar":
        if (chart.stacked === 1) {
          return (
            <StackedBarChart
              handleContextOpenClick={this.props.handleContextOpenClick}
              chartIndex={this.props.chartIndex}
              source={chart.source}
              params={chart.params}
              data={this.state.data}
              title={chart.title}
              stacked={chart.stacked ? true : false}
              colors={["#4472C4", "#ED7D31", "#A5A5A5"]}
              interval={chart.params.interval}
            />
          );
        }
        return (
          <BarChart
            data={this.state.data}
            title={chart.title}
            stacked={chart.stacked ? true : false}
            color="red"
          />
        );
      case "line":
        if (chart.stacked === 1) {
          return (
            <StackedLineChart
              handleContextOpenClick={this.props.handleContextOpenClick}
              chartIndex={this.props.chartIndex}
              source={chart.source}
              params={chart.params}
              data={this.state.data}
              title={chart.title}
              stacked={chart.stacked ? true : false}
              colors={["#4472C4", "#ED7D31", "#A5A5A5"]}
              interval={chart.params.interval}
            />
          );
        }
        return <LineChart data={this.state.data} title="" color="#7070D1" />;
      case "doughnut":
        return (
          <DoughnutChart
            data={this.state.data}
            title={chart.title}
            colors={[
              "#a8e0ff",
              "#8ee3f5",
              "#70cad1",
              "#3e517a",
              "#b08ea2",
              "#BBB6DF"
            ]}
          />
        );
      case "pie":
        return (
          <PieChart
            data={this.state.data}
            title={chart.title}
            colors={[
              "#a8e0ff",
              "#8ee3f5",
              "#70cad1",
              "#3e517a",
              "#b08ea2",
              "#BBB6DF"
            ]}
          />
        );
      case "polar":
        return (
          <PolarChart
            data={this.state.data}
            title={chart.title}
            colors={[
              "#a8e0ff",
              "#8ee3f5",
              "#70cad1",
              "#3e517a",
              "#b08ea2",
              "#BBB6DF"
            ]}
          />
        );
      case "table":
        return (
          <Table
            title={chart.title}
            columns={chart.columns}
            actions={chart.actions}
            options={{
              search: false,
              sort: true,
              paging: false,
              headerStyle: { position: "sticky", top: 0 },
              maxBodyHeight: "335px",
              padding: "dense"
            }}
            innerRef={header => (this.getHeader = header)}
            url={chart.source}
          />
        );
      default:
        return "";
    }
 }
// State Update Methods
  handleTitleChange = event => {
    let edit_target = { ...this.state.edit_target };
    edit_target.title = event.target.value;
    this.setState(state => ({
      edit_target
    }));
  };

  handleTypeChange = event => {
    let edit_target = { ...this.state.edit_target };
    edit_target.type = event.target.value;
    this.setState(state => ({
      edit_target
    }));
  };

  handleStartChange = date => {
    let edit_target = { ...this.state.edit_target };
    edit_target.params.start_date = date.format("l");
    this.setState(state => ({
      edit_target
    }));
  };
  handleEndChange = date => {
    let edit_target = { ...this.state.edit_target };
    edit_target.params.end_date = date.format("l");
    this.setState(state => ({
      edit_target
    }));
  };
  handleParamDataTypeChange = event => {
    let edit_target = { ...this.state.edit_target };
    edit_target.params.datatype = event.target.value;
    this.setState(state => ({
      edit_target
    }));
  };
  handleProductChange = event => {
    let edit_target = { ...this.state.edit_target };
    edit_target.params.product_id = event.target.value;
    this.setState(state => ({
      edit_target
    }));
  };
  handleParamIntervalChange = event => {
    let edit_target = { ...this.state.edit_target };
    edit_target.params.interval = event.target.value;
    this.setState(state => ({
      edit_target
    }));
  };

  handleIntervalChange = event => {
    let edit_target = { ...this.state.edit_target };
    edit_target.interval = event.target.value;
    this.setState(state => ({
      edit_target
    }));
  };
  handleChartChange = () => {
    if (this.state.chart.length > 0) {
      console.log();
      let chart = this.state.chart;
      chart[this.state.edit_target_id] = this.state.edit_target;
      this.setState(state => ({
        chart
      }));
      this.saveChartsToDB(this.state.layouts, chart);
    }
  };
  //Helper Functions
async getWidget(id){
	const action = "get_widget";
	const user_id = window.getUserID();
  const dashboard_id = window.getDashboardId();
	const url = window.ajax_url +"?user_id="+user_id+"&action="+action+"&widget_id="+id+"&dashboard_id="+dashboard_id;
	const widget = await fetch(url)
		.then(response =>response.json())
		.then(data => {
			return data;
})
	.catch(error =>{
		console.error("Error:", error);
		return false;
  });
	return await widget;
}

async getSource(id){
	const action = "get_source";
	const user_id = window.getUserID();
	const url = window.ajax_url +"?user_id="+user_id+"&action="+action+"&source_id="+id;
	const source = await fetch(url)
		.then(response =>response.json())
		.then(data => {
			return data.source;
	})
	.catch(error =>{
		console.error("Error:", error);
		return false;
	});
	return await source;
}
	async getSources(){
		const action = "get_sources";
		const user_id = window.getUserID();
		const url = window.ajax_url +"?user_id="+user_id+"&action="+action;
		const sources = await fetch(url)
			.then(response => response.json())
			.then(data => {
				return data.sources;
			})
			.catch(error => {
				console.error("Error:", error);
			return false;
			});

		return await sources;
  }
	async getSourceParams(id){
	const action = "get_sourceparams";
	const user_id = window.getUserID();
	const url = window.ajax_url +"?user_id="+user_id+"&action="+action+"&source_id="+id;
	const sourceParams = await fetch(url)
		.then(response =>response.json())
		.then(data => {
			return data.source;
	})
	.catch(error =>{
		console.error("Error:", error);
		return false;
	});
	return await sourceParams;
  }
async saveToDb(){
		const action = "save_widget";
		const user_id = window.getUserID();
		const url = window.ajax_url +"?user_id="+user_id+"&action="+action;

		const sources = await fetch(url)
			.then(response => response.json())
			.then(data => {
				return data.sources;
			})
			.catch(error => {
				console.error("Error:", error);
			return false;
			});

		return await sources;

	}

}

export default ChartWrapper;

const buildQuery = data => {
  // If the data is already a string, return it as-is
  if (typeof data === "string") return data;

  // Create a query array to hold the key/value pairs
  var query = [];

  // Loop through the data object
  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      // Encode each key and value, concatenate them into a string, and push them to the array
      query.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]));
    }
  }

  // Join each item in the array with a `&` and return the resulting string
  return query.join("&");
};

