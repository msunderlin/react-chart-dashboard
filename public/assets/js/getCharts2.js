async function getWidgets() {
  const user_id = getUserID();
  const action = getAction();
  const dashboard_id = getDashboardId();
  const widgets = await fetch(
    window.ajax_url+"?user_id=" +
      user_id +
      "&action=" +
      action +
      "&dashboard_id=" +
      dashboard_id
  )
    .then(response => response.json())
    .then(data => {
      if((typeof data) == "string"){
       data =  JSON.parse(data);
      }
      return data;
    })
    .catch(error => {
      console.error("Error:", error);
      return false;
    });
  return await widgets;
}
