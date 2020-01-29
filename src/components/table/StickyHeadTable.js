import React from "react";

import MaterialTable from "material-table";




class Table extends React.Component{
    constructor(props){
      super(props);
      fetch(this.props.chart.source) 
      .then(response => response.json())
      .then(data=>{
          this.setState({data:data});
      });
    }
    componentDidMount() {
      window.setInterval(() => {
          fetch(this.props.chart.source)
          .then(response => response.json())
          .then(data=>{
              this.setState({data:data});
          });
      }, this.props.chart.interval);
    }
  render(){
    return (
      <TableMaterialTable   
        title={this.props.}
      />
    );
  }

}