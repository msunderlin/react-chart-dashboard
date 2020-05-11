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

  async saveToDB(widget){
        console.log(widget);
        const action = "set_widget";
        const user_id = window.getUserID();
      const data = new FormData();
      data.append("user_id", user_id);
      data.append("action", action);
      data.append("widget_id",widget.widget_id);
      data.append("created_by",widget.created_by);
      data.append("created_at",widget.created_at);
      data.append("dashboard_id",widget.dashboard_id);
      data.append("height",widget.height);
      data.append("width",widget.width);
      data.append("maxH",widget.maxH);
      data.append("maxW",widget.maxW);
      data.append("minH",widget.minH);
      data.append("minW",widget.minW);
      data.append("params",widget.params);
      data.append("source_id",widget.source_id);
      data.append("title",widget.title);
      data.append("type_id",widget.type_id);
      data.append("updated_at",widget.updated_at);
      data.append("updated_by",widget.updated_by);
      const url = window.ajax_url;
      await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json"
        },
        body: data
      })
        .then(response => response.json())
        .then(data => {
          return data;
        })
        .catch(e => {
          console.error(e);
        });
    }

}

export default EditHelper;
