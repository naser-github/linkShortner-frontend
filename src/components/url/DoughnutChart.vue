<template>
  <h4 class="text-center mb-2">
    <span class="font-fa-weight-bold">Device Variation Chart</span>
  </h4>
  <DoughnutChart :chart-data="data" :options="options" class="chartContainer" />
</template>

<script setup>
import { computed, defineProps, ref } from "vue";

import { DoughnutChart } from "vue-chart-3";

import { Chart, DoughnutController, ArcElement } from "chart.js";
Chart.register(DoughnutController, ArcElement);


const props = defineProps({
  devices: Object,
  key: String
});

const dataValues = ref([
  props.devices.desktop,
  props.devices.mobile,
  props.devices.others,
]);

const data = computed(() => ({
  labels: ["Computer", "Mobile", "Others"],

  datasets: [
    {
      label: "",
      data: dataValues.value,
      backgroundColor: ["#17a2b8", "#ffc107", "#28a745"],
    },
  ],
}));

const options = ref({
  plugins: {
    title: {
      text: "Doughnut",
    },
  },
});
</script>

<style scoped>
.chartContainer {
  max-height: 340px !important;
}
</style>

