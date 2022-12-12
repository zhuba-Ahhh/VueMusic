import HomeView from "@/views/HomeView.vue";
const baseRouters = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/search",
    name: "search",
    component: () => import("@/views/search/index.vue"),
  },
];

export default baseRouters;
