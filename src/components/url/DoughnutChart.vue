<template>
  <DoughnutChart :chart-data="data" :options="options" />
</template>

<script setup>
import { computed, ref } from "vue";
import { DoughnutChart } from "vue-chart-3";
import { Chart, DoughnutController, ArcElement } from "chart.js";
Chart.register(DoughnutController, ArcElement);

import { defineProps } from "vue";

const props = defineProps({
  devices: Object,
  key: String,
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


