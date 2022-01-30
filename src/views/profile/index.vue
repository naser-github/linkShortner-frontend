<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-3">
        <side-bar :profile="get_profileData"></side-bar>
      </div>
      <div class="col-9">
          <main-page :profile="get_profileData"></main-page>
      </div>
    </div>
  </div>
</template>

<script>
import sideBar from "../../components/profile/sideBar.vue";
import mainPage from "../../components/profile/mainpage.vue";
export default {
  components: { sideBar, mainPage },
  
  computed: {
    get_profileData() {
      return this.$store.getters["profile/get_profileData"];
    },
  },
  methods: {
    async fetch_profileData() {
      try {
        await this.$store.dispatch("profile/fetch_profileData");
      } catch (err) {
        this.error = err.message || "Failed to fetch data";
      }
    },
  },
  async created() {
    await this.fetch_profileData();
  },

};
</script>
