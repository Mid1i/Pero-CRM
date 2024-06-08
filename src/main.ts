import "@/assets/styles/base.scss";
import { router } from "@/router";
import { createApp } from "vue";
import App from "./App.vue";


const Vue = createApp(App);

Vue.use(router);

Vue.mount('#app');
