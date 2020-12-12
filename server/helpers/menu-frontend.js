const getMenuFrontEnd = (role = "USER_ROLE", centerId) => {
 const menu =  [{
    title: "Dashboard",
    icon: "mdi mdi-gauge",
    childMenu: [
      {title: "Inicio", url: "/"},
      {title: "Top ten", url: "top"},
      {title: "Favoritos", url: "favorites"},
    ]
  },
  {
    title: "Admin panel",
    icon: "mdi mdi-folder-lock-open",
    childMenu: [
      {title: "Proyectos", url: "projects"}
    ]
  }
];
if(role === "MODERATOR_ROLE" || role === "ADMIN_ROLE") {
  menu[1].childMenu.unshift({title: "Usuarios", url: "users"})
}

if(role === "ADMIN_ROLE") {
    menu[1].childMenu.unshift({title: "Centros", url: "centers"})
}
if(centerId) {
  menu[0].childMenu.push({title: "Mi centro", url: "center/" + centerId})
}
return menu;
}
module.exports = {
    getMenuFrontEnd
}