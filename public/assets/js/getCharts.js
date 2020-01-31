function getCharts() {
  let data = [];

  data.push({
    type: "bar",
    title: "Daily PL 01/05/2020",
    interval: 20000,
    defaultpos: { h: 2, w: 2, minW: 2, minH: 2 },
    source:
      "http://local.admin.admediary.com/test/getArray.php?report=dailypl&date=01/05/2020"
  });
  data.push({
    type: "pie",
    interval: 10000,
    title: "Daily PL 01/05/2020",
    defaultpos: { h: 2, w: 2, minW: 2, minH: 2 },
    source:
      "http://local.admin.admediary.com/test/getArray.php?report=dailyplpie&date=01/05/2020"
  });
  data.push({
    type: "bar",
    title: "Daily PL 01/07/2020",
    interval: 20000,
    defaultpos: { h: 2, w: 2, minW: 2, minH: 2 },
    source:
      "http://local.admin.admediary.com/test/getArray.php?report=dailypl&date=01/07/2020"
  });
  data.push({
    type: "pie",
    title: "Daily PL 01/07/2020",
    interval: 20000,
    defaultpos: { h: 2, w: 5, minW: 2, minH: 2 },
    source:
    "http://local.admin.admediary.com/test/getArray.php?report=dailyplpie&date=01/07/2020"
  });
  data.push({
    type: "table",
    interval: 10000,
    columns: [
      {title:"Type",field: "affiliate_id",headerStyle: {minWidth: 50}, cellStyle: {minWidth: 50} },
      {title:"Affiliate ID",field: "sub_id",type:"numeric",headerStyle: {minWidth: 50}, cellStyle: {minWidth: 50} },
      {title:"Affiliate Name",field: "affiliate_name"},
      {title:"Count",field: "count",type:"numeric",headerStyle: {minWidth: 50}, cellStyle: {minWidth: 50} },
      {title:"Earned (4)",field: "earned",type:"numeric",headerStyle: {minWidth: 50}, cellStyle: {minWidth: 50} },
      {title:"Cost ($)",field: "cost",type:"numeric",headerStyle: {minWidth: 50}, cellStyle: {minWidth: 50} },
      {title:"Profit ($)",field: "profit",type:"numeric",headerStyle: {minWidth: 50}, cellStyle: {minWidth: 50} },
      {title:"Margin (%)",field: "margin",type:"numeric",headerStyle: {minWidth: 50}, cellStyle: {minWidth: 50} },
      {title:"Sold",field: "sold",type:"numeric",headerStyle: {minWidth: 50}, cellStyle: {minWidth: 50} },
      {title:"Unsold",field: "unsold",type:"numeric",headerStyle: {minWidth: 50}, cellStyle: {minWidth: 50} },
      {title:"Paid",field: "paid",type:"numeric",headerStyle: {minWidth: 50}, cellStyle: {minWidth: 50} },
    ],
    title: "Daily PL 01/05/2020",
    defaultpos: { h: 5, w: 6, minW: 6, minH: 5 },
    source:
      "http://local.admin.admediary.com/test/getArray.php?report=dailyplreport&date=01/05/2020"
  });
  data.push({
    type: "table",
    interval: 10000,
    columns: [
      {title:"Type",field: "affiliate_id",headerStyle: {minWidth: 50}, cellStyle: {minWidth: 50} },
      {title:"Affiliate ID",field: "sub_id",type:"numeric",headerStyle: {minWidth: 50}, cellStyle: {minWidth: 50} },
      {title:"Affiliate Name",field: "affiliate_name"},
      {title:"Count",field: "count",type:"numeric",headerStyle: {minWidth: 50}, cellStyle: {minWidth: 50} },
      {title:"Earned (4)",field: "earned",type:"numeric",headerStyle: {minWidth: 50}, cellStyle: {minWidth: 50} },
      {title:"Cost ($)",field: "cost",type:"numeric",headerStyle: {minWidth: 50}, cellStyle: {minWidth: 50} },
      {title:"Profit ($)",field: "profit",type:"numeric",headerStyle: {minWidth: 50}, cellStyle: {minWidth: 50} },
      {title:"Margin (%)",field: "margin",type:"numeric",headerStyle: {minWidth: 50}, cellStyle: {minWidth: 50} },
      {title:"Sold",field: "sold",type:"numeric",headerStyle: {minWidth: 50}, cellStyle: {minWidth: 50} },
      {title:"Unsold",field: "unsold",type:"numeric",headerStyle: {minWidth: 50}, cellStyle: {minWidth: 50} },
      {title:"Paid",field: "paid",type:"numeric",headerStyle: {minWidth: 50}, cellStyle: {minWidth: 50} },
    ],
    title: "Daily PL 01/07/2020",
    defaultpos: { h: 5, w: 6, minW: 6, minH: 5 },
    source:
      "http://local.admin.admediary.com/test/getArray.php?report=dailyplreport&date=01/07/2020"
  });


  return data;
}
