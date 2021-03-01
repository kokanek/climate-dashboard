/*!

=========================================================
* Black Dashboard React v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import C02 from "views/C02.js";
import Fossil from "views/Fossil.js";
import SeaNGlaciers from "views/SeaNGlaciers.js";
import Icons from "views/Icons.js";
import Map from "views/Map.js";
import Notifications from "views/Notifications.js";
import Rtl from "views/Rtl.js";
import Events from "views/Events.js";
import Typography from "views/Typography.js";
import UserProfile from "views/UserProfile.js";

var routes = [
  {
    path: "/events",
    name: "NASA EVENTS",
    rtlName: "قائمة الجدول",
    icon: "tim-icons icon-globe-2",
    component: Events,
    layout: "/admin",
  },
  {
    path: "/c02",
    name: "CO2 CONCENTRATION",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: C02,
    layout: "/admin",
  },
  {
    path: "/fossil",
    name: "CARBON EMISSION",
    rtlName: "الرموز",
    icon: "tim-icons icon-chart-bar-32",
    component: Fossil,
    layout: "/admin",
  },
  {
    path: "/sea-level",
    name: "SEA LEVEL & GLACIER MASS",
    rtlName: "الرموز",
    icon: "tim-icons icon-map-big",
    component: SeaNGlaciers,
    layout: "/admin",
  },
  {
    path: "/green-check",
    name: "Green Check",
    rtlName: "خرائط",
    icon: "tim-icons icon-heart-2",
    component: Map,
    layout: "/admin",
  },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   rtlName: "إخطارات",
  //   icon: "tim-icons icon-bell-55",
  //   component: Notifications,
  //   layout: "/admin",
  // },
  // {
  //   path: "/my-weather",
  //   name: "My Weather",
  //   rtlName: "ملف تعريفي للمستخدم",
  //   icon: "tim-icons icon-single-02",
  //   component: UserProfile,
  //   layout: "/admin",
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   rtlName: "طباعة",
  //   icon: "tim-icons icon-align-center",
  //   component: Typography,
  //   layout: "/admin",
  // },
  // {
  //   path: "/rtl-support",
  //   name: "RTL Support",
  //   rtlName: "ار تي ال",
  //   icon: "tim-icons icon-world",
  //   component: Rtl,
  //   layout: "/rtl",
  // },
];
export default routes;
