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
                  <h3>{{ this.url.dailyClicks }}</h3>

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
                  <h3>{{ this.url.totalClicks }}</h3>

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
                  <h3>{{ this.url.avgClicks }}</h3>

                  <p>Average Visit</p>
                </div>
                <div class="icon">
                  <i class="ion ion-pie-graph"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-1"></div>
        <!-- <div class="col-7 mt-lg-2 pr-lg-5">
          <div>
            <GChart
              type="ColumnChart"
              :data="chartData"
              :options="chartOptions"
            />
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
// import { GChart } from "vue-google-charts";

export default {
  props: ["url"],
  components: {
    // GChart,
  },
  data() {
    return {
      // Array will be automatically processed with visualization.arrayToDataTable function
      chartData: [
        ["Year", "Sales", "Expenses", "Profit"],
        ["2014", 1000, 400, 200],
        ["2015", 1170, 460, 250],
        ["2016", 660, 1120, 300],
        ["2017", 1030, 540, 350],
      ],
      chartOptions: {
        chart: {
          title: "Company Performance",
          subtitle: "Sales, Expenses, and Profit: 2014-2017",
        },
      },
    };
  },
};
</script>

