async function getCharts() {
  const user_id = getUserID();
  const action = getAction();
  const dashboard_id = getDashboardId();
  const charts = await fetch(
    "http://local.admin.admediary.com/dashboard/chartMgmt.php?user_id=" +
      user_id +
      "&action=" +
      action +
      "&dashboard_id=" +
      dashboard_id
  )
    .then(response => response.json())
    .then(data => {
      console.log(typeof data);
      if((typeof data) == "string"){
       data =  JSON.parse(data);
      }
      return data; 
    })
    .catch(error => {
      console.error("Error:", error);
      return false;
    });
  return await charts;
}
