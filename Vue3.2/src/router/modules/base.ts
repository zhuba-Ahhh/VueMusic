const baseRouters = [
  {
    path: "/index",
    name: "index",
    component: () => import("@/views/index/index.vue"),
  },
  {
    path: "/rank",
    name: "rank",
    component: () => import("@/views/rank/index.vue"),
  },
  {
    path: "/playlist",
    name: "playlist",
    component: () => import("@/views/playlist/index.vue"),
  },
  {
    path: "/playlist/detail",
    name: "playlistdetail",
    component: () => import("@/views/playlist/Detail.vue"),
  },
  {
    path: "/user",
    name: "user",
    component: () => import("@/views/user/index.vue"),
  },
  {
    path: "/song",
    name: "song",
    component: () => import("@/views/song/index.vue"),
  },
  {
    path: "/singer",
    name: "singer",
    component: () => import("@/views/singer/index.vue"),
  },
  {
    path: "/album",
    name: "album",
    component: () => import("@/views/album/index.vue"),
  },
  {
    path: "/artist",
    name: "artist",
    component: () => import("@/views/artist/index.vue"),
  },
  {
    path: "/mvlist",
    name: "mvlist",
    component: () => import("@/views/mvlist/index.vue"),
  },
  {
    path: "/mvlist/mv",
    name: "mv",
    component: () => import("@/views/mvlist/Detail.vue"),
  },
  {
    path: "/dj",
    name: "dj",
    component: () => import("@/views/dj/index.vue"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("@/views/search/index.vue"),
  },
];

export default baseRouters;
