<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card mt-3">
            <div class="card-body">
              <url-details :url='get_urlDetails'></url-details>
              <url-stat :url='get_urlDetails'></url-stat>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

//google chart

import urlDetails from "../../components/url/urlDetails.vue";
import urlStat from "../../components/url/urlStat.vue";

export default {
  components: {
    urlDetails,
    urlStat,
  },

  data() {
    return {
      url: null,
    };
  },

  computed: {
    get_urlDetails() {
      return this.$store.getters["url/get_urlDetails"];
    },
  },

  methods: {
    async urlDetailPage() {
      try {
        this.$store.dispatch("url/urlDetails", {
          id: this.$route.params.id,
        });
      } catch (err) {
        this.error = err.message || "Failed to shorten this url";
      }
    },

    save_urlDetails(){
      this.url = this.get_urlDetails();
    }
  },

  created() {
    this.urlDetailPage();
  },
};
</script>