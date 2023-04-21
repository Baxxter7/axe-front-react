import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import usuarios from "views/examples/usuarios";
import centroeducativo from "views/examples/centroeducativo";
import donaciones from "views/examples/donaciones";
import donantes from "views/examples/donantes";
import evaluacion from "views/examples/evaluacion";
import roles from "views/examples/roles";
import Permisos from "views/examples/permisos";
import contrasnia from "views/examples/recuperar_contrasenia";

var routes = [
  {
    path: "/index",
    name: "Menu principal",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin"
  },
  {
    path: "/usuarios",
    name: "usuarios",
    icon: "ni ni-single-02 text-blue",
    component: usuarios,
    layout: "/admin"
  },
  {
    path: "/centroeducativo",
    name: "Centros educativos",
    icon: "ni ni-building text-blue",
    component: centroeducativo,
    layout: "/admin"
  },
 
  {
    path: "/donaciones",
    name: "Donaciones",
    icon: "ni ni-bullet-list-67 text-red",
    component:  donaciones,
    layout: "/admin",
    /*children: [
      {
        path: "/maps/submenu1",
        name: "Submenú 1",
        component: Maps1
      },
      {
        path: "/maps/submenu2",
        name: "Submenú 2",
        component: Maps2
      }
    ]*/
  },
  {
    path: "/donantes",
    name: "Donantes",
    icon: "ni ni-badge text-red",
    component:  donantes,
    layout: "/admin"
  },
  {
    path: "/evaluacion",
    name: "Evaluacion donantes",
    icon: "ni ni-badge text-red",
    component:  evaluacion,
    layout: "/admin"
  },
  {
    path: "/contrasenia",
    name: "Recuperacion de Contraseña",
    icon: "ni ni-badge text-red",
    component:  contrasnia,
    layout: "/admin"
  },
  {
    path: "/permisos",
    name: "Permisos",
    icon: "ni ni-badge text-red",
    component:  Permisos,
    layout: "/admin"
  },
  {
    path: "/roles",
    name: "Roles",
    icon: "ni ni-badge text-red",
    component:  roles,
    layout: "/admin"
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth"
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin"
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth"
  }
];

export default routes;
