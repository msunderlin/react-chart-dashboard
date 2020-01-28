function getCharts() {
  let data = [];

  data.push({
    type: "bar",
    title: "Daily PL 01/05/2020",
    stacked: 1,
    interval: 20000,
    defaultpos: { h: 2, w: 2, minW: 2, minH: 2 },
    source:
      "http://local.admin.admediary.com/test/getArray.php?report=dailyplstacked&date=01/05/2020"
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
    stacked: 1,
    interval: 20000,
    defaultpos: { h: 2, w: 2, minW: 2, minH: 2 },
    source:
      "http://local.admin.admediary.com/test/getArray.php?report=dailyplstacked&date=01/07/2020"
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
    interval: 10000,
    title: "Daily PL 01/07/2020",
    defaultpos: { h: 2, w: 2, minW: 2, minH: 2 },
    source:
      "http://local.admin.admediary.com/test/getArray.php?report=dailyplpie&date=01/07/2020"
  });

  return data;
}
