<template>
  <section class="hold-transition layout-top-nav">
    <div class="wrapper">
      <!-- Navbar -->
      <nav-bar v-if="this.$store.getters.getToken"></nav-bar>
      <!-- /.navbar -->
      <router-view :key="$route.fullPath" />

      <!-- <page-footer></page-footer> -->
    </div>
  </section>
</template>


<script>
import navBar from "./components/partials/navBar.vue";
// import pageFooter from "./components/partials/footer.vue";

export default {
  components: {
    navBar,
    // pageFooter,
  },

  created() {
    this.$store.dispatch("checkLogin");
    if (!this.$store.getters.getToken) {
      this.$router.replace("/login");
    }
  },
};
</script>
