<template>
  <div class="card">
    <div class="card-title">
      <div class="mb-3 text-center mt-lg-3">
        <h4 class="mb-0 font-weight-semibold">Stats</h4>
        <h6><span class="text-muted d-block">Url Statistics</span></h6>
      </div>
    </div>
    <div class="card-body">
      <div class="row">
        <div class="col-4">
          <div class="row">
            <div class="col-12 mt-3">
              <div class="small-box bg-info">
                <div class="inner">
                  <h3>{{ clickDetails.dailyClicks }}</h3>

                  <p>TODAY'S VISIT</p>
                </div>
                <div class="icon">
                  <i class="fas fa-hand-pointer"></i>
                </div>
              </div>
            </div>

            <div class="col-12">
              <div class="small-box bg-success">
                <div class="inner">
                  <h3>{{ clickDetails.totalClicks }}</h3>

                  <p>TOTAL VISIT</p>
                </div>
                <div class="icon">
                  <i class="fas fa-database"></i>
                </div>
              </div>
            </div>

            <div class="col-12">
              <div class="small-box bg-warning">
                <div class="inner">
                  <h3>{{ clickDetails.avgClicks }}</h3>

                  <p>Average Visit</p>
                </div>
                <div class="icon">
                  <i class="fas fa-chart-pie"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-1"></div>
        <div class="col-7">
          <doughnut-chart
            :devices="get_clientDevices"
            :key="$route.fullPath"
          ></doughnut-chart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Chart, Legend, Title, Tooltip } from "chart.js";
Chart.register(Legend, Title, Tooltip);

import DoughnutChart from "./DoughnutChart.vue";

export default {
  components: {
    DoughnutChart,
  },

  props:['clickDetails'],

  computed: {

    get_clientDevices() {
      return this.$store.getters["url/get_clientDevices"];
    },
  },

  watch: {
    deviceData(val) {
      console.log("val", val);
    },
  },

  // created(){
  //   console.log(this.key);
  // }
};
</script>
