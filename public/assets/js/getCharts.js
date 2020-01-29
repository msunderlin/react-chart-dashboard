function getCharts() {
  let data = [];

  // data.push({
  //   type: "bar",
  //   title: "Daily PL 01/05/2020",
  //   stacked: 1,
  //   interval: 20000,
  //   defaultpos: { h: 2, w: 2, minW: 2, minH: 2 },
  //   source:
  //     "http://local.admin.admediary.com/test/getArray.php?report=dailyplstacked&date=01/05/2020"
  // });
  // data.push({
  //   type: "pie",
  //   interval: 10000,
  //   title: "Daily PL 01/05/2020",
  //   defaultpos: { h: 2, w: 2, minW: 2, minH: 2 },
  //   source:
  //     "http://local.admin.admediary.com/test/getArray.php?report=dailyplpie&date=01/05/2020"
  // });
  // data.push({
  //   type: "bar",
  //   title: "Daily PL 01/07/2020",
  //   stacked: 1,
  //   interval: 20000,
  //   defaultpos: { h: 2, w: 2, minW: 2, minH: 2 },
  //   source:
  //     "http://local.admin.admediary.com/test/getArray.php?report=dailyplstacked&date=01/07/2020"
  // });
  // data.push({
  //   type: "bar",
  //   title: "Daily PL 01/07/2020",
  //   interval: 20000,
  //   defaultpos: { h: 2, w: 2, minW: 2, minH: 2 },
  //   source:
  //     "http://local.admin.admediary.com/test/getArray.php?report=dailypl&date=01/07/2020"
  // });
  data.push({
    type: "table",
    interval: 10000,
    columns: [
      {title:"Type",field: "affiliate_id"},
      {title:"Affiliate ID",field: "sub_id",type:"numeric"},
      {title:"Affiliate Name",field: "affiliate_name"},
      {title:"Count",field: "count",type:"numeric"},
      {title:"Earned (4)",field: "earned",type:"numeric"},
      {title:"Cost ($)",field: "cost",type:"numeric"},
      {title:"Profit ($)",field: "profit",type:"numeric"},
      {title:"Margin ($)",field: "margin",type:"numeric"},
      {title:"Sold",field: "sold",type:"numeric"},
      {title:"Unsold",field: "unsold",type:"numeric"},
      {title:"Paid",field: "paid",type:"numeric"},
    ],
    title: "Daily PL 01/05/2020",
    defaultpos: { h: 2, w: 2, minW: 2, minH: 2 },
    source:
      "http://local.admin.admediary.com/test/getArray.php?report=dailyplreport&date=01/05/2020"
  });

  return data;
}
