<template>
  <div class="content">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <url-details :url="get_urlDetails"></url-details>
            <url-stat></url-stat>
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

  mounted() {
    this.urlDetailPage();
  },
};
</script>