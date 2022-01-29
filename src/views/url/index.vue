<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card mt-3">
            <div class="card-body">
              <url-details :url='get_urlDetails' :key="$route.fullPath"></url-details>
              <url-stat :clickDetails='get_clickDetails' :key="$route.fullPath"></url-stat>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import urlDetails from "../../components/url/urlDetails.vue";
import urlStat from "../../components/url/urlStat.vue";

export default {
  components: {
    urlDetails,
    urlStat,
  },

  computed: {
    get_urlDetails() {
      return this.$store.getters["url/get_urlDetails"];
    },

    get_clickDetails(){
      return this.$store.getters["url/get_clickDetails"];
    }
  },

  methods: {
    async urlDetailPage() {
      try {
        await this.$store.dispatch("url/urlDetails", {
          id: this.$route.params.id,
        });
      } catch (err) {
        this.error = err.message || "Failed to shorten this url";
      }
    },
  },

  async created() {
    await this.urlDetailPage();
  },
};
</script>