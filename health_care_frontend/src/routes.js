import { createWebHistory, createRouter } from "vue-router";
import login from "./components/login.vue";
import password from "./components/Password.vue";
import register from "./components/register.vue";
import setSchedule from "./components/set_schedule.vue";
import showSchedules from "./components/showSchedules.vue";
import showDetails from  "./components/ShowDetails.vue";
import updateSchedule from "./components/updateSchedule.vue";
const routes = [
  {
    name: "login",
    component: login,
    path: "/login",
    props: true,
  },
  {
    name: "register",
    component: register,
    path: "/",
    props:true
  },
  {
    name: "password",
    component: password,
    path: "/createPass",
    props: true,
  },
  {
    name: "setSchedule",
    component: setSchedule,
    path: "/setSchedule",
    props:true
  },
  {
    name: "showSchedules",
    component: showSchedules,
    path: "/showSchedules",
    props:true
  },
  {
    name:"showDetails",
    component:showDetails,
    path:"/showDetails",
    props:true
  },
  {
    name:"updateSchedule",
    component:updateSchedule,
    path:"/updateSchedule",
    props:true
  }
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
