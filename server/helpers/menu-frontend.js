const getMenuFrontEnd = (role = "USER_ROLE") => {
 const menu =  [{
    title: "Dashboard",
    icon: "mdi mdi-gauge",
    childMenu: [
      {title: "Inicio", url: "/"},
      {title: "Barra de progreso", url: "progress"},
      {title: "Promesas", url: "promises"},
      {title: "Rxjs", url: "rxjs"},
      {title: "Perfil de usuario", url: 'profile' }
      


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