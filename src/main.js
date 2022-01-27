import { createApp } from "vue";

// root importers
import App from "./App.vue";
import router from "./router/index";
import store from "./store/index";

//axios imports
import axios from "axios";
import VueAxios from "vue-axios";

//toast js
import Toaster from "@meforma/vue-toaster";

//google chart
// import VueGoogleCharts from "vue-google-charts";

//css admin-lte
import("admin-lte/plugins/fontawesome-free/css/all.min.css");
// import("admin-lte/fonts/ionicons.min.css");
import("admin-lte/plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css");
import("admin-lte/plugins/icheck-bootstrap/icheck-bootstrap.min.css");
import("admin-lte/plugins/jqvmap/jqvmap.min.css");
import("admin-lte/dist/css/adminlte.min.css");
import("admin-lte/plugins/overlayScrollbars/css/OverlayScrollbars.min.css");
import("admin-lte/plugins/daterangepicker/daterangepicker.css");
import("admin-lte/plugins/summernote/summernote-bs4.css");
// import("admin-lte/fonts/index.css");

//script
import("admin-lte/plugins/jquery/jquery.min.js");
import("admin-lte/plugins/jquery-ui/jquery-ui.min.js");
// {/* <script>$.widget.bridge("uibutton", $.ui.button);</script> */}
import("admin-lte/plugins/bootstrap/js/bootstrap.bundle.min.js");
import("admin-lte/plugins/chart.js/Chart.min.js");
import("admin-lte/plugins/sparklines/sparkline.js");
import("admin-lte/plugins/jqvmap/jquery.vmap.min.js");
import("admin-lte/plugins/jqvmap/maps/jquery.vmap.usa.js");
import("admin-lte/plugins/jquery-knob/jquery.knob.min.js");
import("admin-lte/plugins/tempusdominus-bootstrap-4/js/tempusdominus-bootstrap-4.min.js");
import("admin-lte/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js");
import("admin-lte/dist/js/adminlte.js");


const app = createApp(App);

// app.use(VueGoogleCharts)
app.use(Toaster);
app.use(VueAxios, axios);

app.config.productionTip = false;

app.use(router);
app.use(store);
app.mount("#app");