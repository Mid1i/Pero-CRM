import { router } from "@/router/index.js";
import { createApp } from "vue";
import "@/assets/styles/base.scss";
import App from "./App.vue";

const Vue = createApp(App);

Vue.use(router);

Vue.mount('#app');
