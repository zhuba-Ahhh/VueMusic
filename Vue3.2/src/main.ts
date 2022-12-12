import { createApp } from "vue";
import store from "./stores";

import App from "@/App.vue";
import router from "@/router";
import "@/assets/style/global.less";
import "@/assets/style/main.less";
import "@/assets/style/reset.less";

const app = createApp(App);

app.use(store);
app.use(router);

app.mount("#app");
