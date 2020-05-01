import React, { Component } from "react";
import { isConstTypeReference } from "typescript";

class EditHelper {
  async initalizeData(widget_id) {
    let widget = await this.getWidget(widget_id);
    let widgetParams = JSON.parse(widget.params);
    let source = await this.getSource(widget.source_id);
    let sourceParams = await this.getSourceParams(source.source_id);
     return {
      widget,
      widgetParams,
      source,
      sourceParams,
    };
  }

  //Helper Functions
  async getWidget(id) {
    console.log(id);
    const action = "get_widget";
    const user_id = window.getUserID();
    const dashboard_id = window.getDashboardId();
    const url =
      window.ajax_url +
      "?user_id=" +
      user_id +
      "&action=" +
      action +
      "&widget_id=" +
      id +
      "&dashboard_id=" +
      dashboard_id;
    const widget = await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error("Error:", error);
        return false;
      });
    return await widget;
  }

  async getSource(id) {
    const action = "get_source";
    const user_id = window.getUserID();
    const url =
      window.ajax_url +
      "?user_id=" +
      user_id +
      "&action=" +
      action +
      "&source_id=" +
      id;
    const source = await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error("Error:", error);
        return false;
      });
    return await source;
  }
  async getSources() {
    const action = "get_sources";
    const user_id = window.getUserID();
    const url = window.ajax_url + "?user_id=" + user_id + "&action=" + action;
    const sources = await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        return data.sources;
      })
      .catch((error) => {
        console.error("Error:", error);
        return false;
      });

    return await sources;
  }
  async getSourceParams(id) {
    const action = "get_sourceparams";
    const user_id = window.getUserID();
    const url =
      window.ajax_url +
      "?user_id=" +
      user_id +
      "&action=" +
      action +
      "&source_id=" +
      id;
    const sourceParams = await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error("Error:", error);
        return false;
      });
    return await sourceParams;
  }

  // State Update Methods
  handleTitleChange = (event) => {
    let edit_target = { ...this.state.edit_target };
    edit_target.title = event.target.value;
    this.setState((state) => ({
      edit_target,
    }));
  };

  handleTypeChange = (event) => {
    let edit_target = { ...this.state.edit_target };
    edit_target.type = event.target.value;
    this.setState((state) => ({
      edit_target,
    }));
  };

  handleStartChange = (date) => {
    let edit_target = { ...this.state.edit_target };
    edit_target.params.start_date = date.format("l");
    this.setState((state) => ({
      edit_target,
    }));
  };
  handleEndChange = (date) => {
    let edit_target = { ...this.state.edit_target };
    edit_target.params.end_date = date.format("l");
    this.setState((state) => ({
      edit_target,
    }));
  };
  handleParamDataTypeChange = (event) => {
    let edit_target = { ...this.state.edit_target };
    edit_target.params.datatype = event.target.value;
    this.setState((state) => ({
      edit_target,
    }));
  };
  handleProductChange = (event) => {
    let edit_target = { ...this.state.edit_target };
    edit_target.params.product_id = event.target.value;
    this.setState((state) => ({
      edit_target,
    }));
  };
  handleParamIntervalChange = (event) => {
    let edit_target = { ...this.state.edit_target };
    edit_target.params.interval = event.target.value;
    this.setState((state) => ({
      edit_target,
    }));
  };

  handleIntervalChange = (event) => {
    let edit_target = { ...this.state.edit_target };
    edit_target.interval = event.target.value;
    this.setState((state) => ({
      edit_target,
    }));
  };
  handleChartChange = () => {
    if (this.state.chart.length > 0) {
      console.log();
      let chart = this.state.chart;
      chart[this.state.edit_target_id] = this.state.edit_target;
      this.setState((state) => ({
        chart,
      }));
      this.saveChartsToDB(this.state.layouts, chart);
    }
  };
}

export default EditHelper;
