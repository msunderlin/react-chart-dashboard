import React from "react";

import MaterialTable from "material-table";

import { forwardRef } from "react";

import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import RefreshIcon from "@material-ui/icons/Refresh";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Refresh: forwardRef((props, ref) => <RefreshIcon {...props} ref={ref} />),
  Save: forwardRef((props, ref) => <RefreshIcon {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.tableRef = React.createRef();
    this.state = {
      url: this.props.url,
    };
    this.getHeader = null;
  }
  footerData = null;
  is_list = () => {
    if (this.props.actions.length > 4) {
      return [
        {
          icon: tableIcons["Add"],
          tooltip: "Select Dashboard",
          onClick: (event, rowData) =>
            (window.location.href =
              window.location.origin +
              "/dashboard/index.php?dashboard_name=" +
              rowData.dash_name),
        },
      ];
    } else {
      return [];
    }
  };
  render() {
    return (
      <div className={"table-wrapper"}>
        <MaterialTable
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
          icons={tableIcons}
          title={this.props.title}
          options={this.props.options}
          tableRef={this.tableRef}
          columns={this.props.columns}
          actions={this.is_list()}
          data={(query) =>
            new Promise((resolve, reject) => {
              let url = this.state.url;
              url += "&per_page=" + query.pageSize;
              url += "&page=" + (query.page + 1);
              fetch(url)
                .then((response) => response.json())
                .then((result) => {
                  resolve({
                    data: result.data,
                    page: result.page - 1,
                    totalCount: result.total,
                  });
                });
            })
          }
        />
      </div>
    );
  }
}

export default Table;
