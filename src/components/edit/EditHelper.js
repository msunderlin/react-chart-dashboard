import React, { Component } from "react";
import { isConstTypeReference } from "typescript";

class EditHelper {
  async initalizeData(widget_id) {
    let widget = null;
    let widgetParams = null;
    let source = null;
    let sourceParams = [];
    if (widget_id === "new") {
      widget = {
        widget_id: 0,
        created_by: window.getUserID(),
        updated_by: window.getUserID(),
        dashboard_id: window.getDashboardId(),
        title: " ",
        source_id: 0,
        type_id: 0,
        height: 2,
        width: 2,
        minH: 2,
        minW: 2,
        maxH: 2,
        maxW: 2,
        params: '{"interval":"50000"}',
      };
      widgetParams = { interval: 50000 };
      source = { types: [] };

      return {
        widget,
        widgetParams,
        source,
        sourceParams,
      };

    }
    widget = await this.getWidget(widget_id);
    widgetParams = "";
    if (typeof widget.params === "string") {
      widgetParams = JSON.parse(widget.params);
    } else {
      widgetParams = widget.params;
    }
    source = await this.getSource(widget.source_id);
    sourceParams = await this.getSourceParams(source.source_id);
    let widget_url = await this.buildUrl(widget, source, sourceParams)
    return {
      widget,
      widgetParams,
      widget_url,
      source,
      sourceParams,
    };
  }

  //Helper Functions
  async getWidget(id) {
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
  async buildUrl(widget, source, sourceParams) {
    var url = source.source_url;
    url += "?user_id=" + window.getUserID();
    for (let i = 0; i < sourceParams.length; i++) {
      url += "&";
      url += sourceParams[i].param_url_name + "=";
      if (widget.params == null) {
        url += sourceParams[i].default_value;
      } else {
        let params = JSON.parse(widget.params);
        if (typeof params[sourceParams[i].param_url_name] == "undefined") {
          url += sourceParams[i].default_value;
        } else {
          url += params[sourceParams[i].param_url_name];
        }
      }
    }
    return url;
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
        return data;
      })
      .catch((error) => {
        console.error("Error:", error);
        return false;
      });
    let sourceData = await sources.map((source, i) => {
      return { text: source.source_name, value: source.source_id };
    });
    return await sourceData;
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

  async saveToDB(widget) {
    const action = "set_widget";
    const user_id = window.getUserID();
    const data = new FormData();
    data.append("user_id", user_id);
    data.append("action", action);
    data.append("widget_id", widget.widget_id);
    data.append("created_by", widget.created_by);
    data.append("created_at", widget.created_at);
    data.append("dashboard_id", widget.dashboard_id);
    data.append("height", widget.height);
    data.append("width", widget.width);
    data.append("maxH", widget.maxH);
    data.append("maxW", widget.maxW);
    data.append("minH", widget.minH);
    data.append("minW", widget.minW);
    data.append("params", widget.params);
    data.append("source_id", widget.source_id);
    data.append("title", widget.title);
    data.append("type_id", widget.type_id);
    data.append("updated_at", widget.updated_at);
    data.append("updated_by", widget.updated_by);
    const url = window.ajax_url;
    await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((e) => {
        console.error(e);
      });
  }

  getTypes(types) {
    if (typeof types === "undefined") {
      return [];
    }
    let options = [];
    if (types.length == 0) {
      return options;
    }
    types = types.substring(1, types.length - 1);
    types = types.split(",");
    options = types.map((type) => {
      type = parseInt(type);
      switch (type) {
        case 1:
          return {
            text: "BarChart",
            value: type.toString(),
          };
          break;
        case 2:
          return {
            text: "LineChart",
            value: type.toString(),
          };
          break;
        case 3:
          return {
            text: "DoughnutChart",
            value: type.toString(),
          };
          break;
        case 4:
          return {
            text: "PieChart",
            value: type.toString(),
          };
          break;
        case 5:
          return {
            text: "PolarChart",
            value: type.toString(),
          };
          break;
        case 6:
          return {
            text: "Table",
            value: type.toString(),
          };
          break;
        case 7:
          return {
            text: "Stacked Bar",
            value: type.toString(),
          };
          break;
        case 8:
          return {
            text: "Stacked Line",
            value: type.toString(),
          };
          break;
      }
    });
    return options;
  }

}

export default EditHelper;
