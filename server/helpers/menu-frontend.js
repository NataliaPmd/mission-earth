const getMenuFrontEnd = (role = "USER_ROLE") => {
 const menu =  [{
    title: "Dashboard",
    icon: "mdi mdi-gauge",
    childMenu: [
      {title: "Inicio", url: "/"},
      {title: "Top ten", url: "/top"},
      {title: "Mi centro", url: "/center/:idCenter"},
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
if(role === "ADMIN_ROLE") {
    menu[1].childMenu.unshift({title: "Centros", url: "centers"})
    menu[1].childMenu.unshift({title: "Usuarios", url: "users"})
}
return menu;
}
module.exports = {
    getMenuFrontEnd
}