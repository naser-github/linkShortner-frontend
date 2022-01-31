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
                        :devices="get_clientDevices"
                      ></dashboard-graph>
                    </div>
                  </div>
                </div>
                <div class="col-1"></div>
                <div class="col-4">
                  <dashboard-card :data="get_data"></dashboard-card>
                </div>
                <div class="col-1"></div>
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
      clickData: null,
    }
  },

  watch:{
    clickData(val, oldVal){
      console.log(val, oldVal);
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
        this.$store.dispatch("dashboard/dashboardPage");
      } catch (err) {
        this.error = err.message || "Failed to shorten this url";
      }
      await this.saveData();
    },

    saveData(){
      this.clickData = this.get_clientDevices();
    }
  },

  beforeMount() {
    this.dashboardPage();
  },
};
</script>
