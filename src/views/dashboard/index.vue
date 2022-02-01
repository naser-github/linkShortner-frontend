<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card mt-3">
            <div class="card-body">
              <div class="row">
                <div class="col-6">
                  <div class="card">
                    <div class="card-body bg-gradient-light ">
                      <dashboard-graph
                        :devices="get_clientDevices" v-if="renderComponent"
                      ></dashboard-graph>
                    </div>
                  </div>
                </div>
                <div class="col-1"></div>
                <div class="col-4">
                  <dashboard-card :data="get_data"></dashboard-card>
                </div>
                <div class="col-1">
                  {{ clickData }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dashboardCard from "../../components/dashboard/dashboardCard.vue";
import dashboardGraph from "../../components/dashboard/dashboardGraph.vue";

import { Chart, Legend, Title, Tooltip } from "chart.js";
Chart.register(Legend, Title, Tooltip);

export default {
  components: {
    dashboardCard,
    dashboardGraph,
  },

  data(){
    return {
      clickData: {
        desktop: null,
        mobile: null,
        others: null,
      },
      renderComponent: true
    }
  },

  watch:{
    clickData(val, oldVal){
      console.log('watch',val, oldVal);
    }
  },

  computed: {
    get_data() {
      return this.$store.getters["dashboard/get_clicksDetails"];
    },
    get_clientDevices() {
      return this.$store.getters["dashboard/get_clientDevices"];
    },
  },

  methods: {
    async dashboardPage() {
      try {
        await this.$store.dispatch("dashboard/dashboardPage");
      } catch (err) {
        this.error = err.message || "Failed to shorten this url";
      }
        this.renderComponent = false;
        this.$nextTick(() => {
          this.renderComponent = true;
        });
         await this.saveData();
    },

    saveData(){
      this.clickData = this.get_clientDevices;
    },
  },

  mounted() {
    this.dashboardPage();
  },
};
</script>
