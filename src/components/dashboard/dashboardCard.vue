<template>
  <section>
    <div class="row">
      <div class="col-12">
        <div class="small-box bg-info">
          <div class="inner">
            <h3>{{this.data.linkToday}}</h3>

            <p>LINKS CREATED TODAY</p>
          </div>
          <div class="icon">
            <i class="ion ion-stats-bars"></i>
          </div>
        </div>
      </div>

      <div class="col-12">
        <div class="small-box bg-success">
          <div class="inner">
            <h3>{{this.data.totalLinks}}</h3>

            <p>TOTAL LINKS CREATED</p>
          </div>
          <div class="icon">
            <i class="ion ion-stats-bars"></i>
          </div>
        </div>
      </div>

      <div class="col-12">
        <div class="small-box bg-warning">
          <div class="inner">
            <h3>{{this.data.visitedToday}}</h3>

            <p>LINKS VISITED TODAY</p>
          </div>
          <div class="icon">
            <i class="ion ion-pie-graph"></i>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ["data"],
};
</script>
