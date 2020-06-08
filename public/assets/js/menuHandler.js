function getMenu() {
    // get icon names and previews here  
    // change icons to snake_case
    // https://material-ui.com/components/material-icons/
  const menuItems = [
    {
      section: "Views",
      icon: "visibility",
      items: [
        { title: "Dashboard List", link: "/dashboard/index.php?dashboard_name=list" },
        { title: "Testing", link: "/dashboard/index.php?dashboard_name=Testing" },
        { title: "Lead Status", link: "/dashboard/index.php?dashboard_name=lead_status" },
        
      ],
    },
    // {
    //   section: "Testing",
    //   icon: "track_changes",
    //   items: [
    //     { title: "Dashboard List", link: "/list" },
    //     { title: "Testing", link: "/Testing" },
    //     { title: "Lead Status", link: "/lead_status" },
        
    //   ],
    // }
  ];

  return menuItems;
}
