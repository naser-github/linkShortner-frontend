<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card mt-3">
            <div class="card-body">
              <div class="row">
                <div class="col-4">
                  <dashboard-card :data='get_data'></dashboard-card>
                </div>
                <div class="col-8">
                  <dashboard-graph></dashboard-graph>
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

export default {
  components: {
    dashboardCard,
    dashboardGraph,
  },

    data() {
    return {
      data: null,
    };
  },

  computed: {
    get_data() {
      return this.$store.getters["dashboard/get_data"];
    },
  },

  methods: {
    async dashboardPage() {
      try {
        this.$store.dispatch("dashboard/dashboardPage");
      } catch (err) {
        this.error = err.message || "Failed to shorten this url";
      }
    },

    save_urlDetails(){
      this.data = this.get_data();
    }
  },

  created() {
    this.dashboardPage();
  },
};
</script>
