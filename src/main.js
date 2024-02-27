import "./assets/scss/main.css";
import store from "./store/store";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
const app = createApp(App);
app.use(router);
app.use(store);
app.component('fas', FontAwesomeIcon)
app.mount("#app");
library.add(fas)
