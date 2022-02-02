<template>
  <section class="content">
    <div class="row">
      <div class="col-12">
        <div class="card-header card-dark card-outline mt-2">
          <h3 class="card-title font-weight-bolder">Url Lists</h3>
        </div>
        <div class="card-body card-dark card-outline">
          <table id="myTable" class="table table-striped table-hover">
            <thead class="datatable-header-accent">
              <tr>
                <th @click="sorted('long_url')">
                  Original Url
                  <i
                    :class="
                      currentSortDir == 'asc'
                        ? 'fas fa-arrow-up'
                        : 'fas fa-arrow-down'
                    "
                  ></i>
                </th>
                <th @click="sorted('short_url')">
                  Shortened Url
                  <i
                    :class="
                      currentSortDir == 'asc'
                        ? 'fas fa-arrow-up'
                        : 'fas fa-arrow-down'
                    "
                  ></i>
                </th>
                <th @click="sorted('link_status')">
                  Status
                  <i
                    :class="
                      currentSortDir == 'asc'
                        ? 'fas fa-arrow-up'
                        : 'fas fa-arrow-down'
                    "
                  ></i>
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="url in show_urlList()" :key="url.id">
                <td @click="urlDetails(url.id)">
                  <span
                    class="badge badge-pill bg-light text-white text-md"
                    style="border-left: 0.7rem solid #43a047"
                  >
                    {{ url.long_url.substring(0, 25) + ".." }}
                  </span>
                </td>
                <td @click="urlDetails(url.id)">
                  <span
                    class="badge badge-pill bg-light text-white text-md"
                    style="border-left: 0.7rem solid #43a047"
                  >
                    {{ url.short_url }}
                  </span>
                </td>
                <td @click="urlDetails(url.id)">
                  <span
                    class="badge-pill text-white"
                    :style="
                      url.link_status == 'active'
                        ? 'background: linear-gradient(45deg,#195647,#43a047);'
                        : 'background: linear-gradient(180deg,#828a91,#6c757d);}'
                    "
                  >
                    {{ url.link_status }}
                  </span>
                </td>
                <td>
                  <button
                    class="btn btn-sm text-white"
                    style="background: linear-gradient(45deg, #195647, #43a047)"
                    @click="showModal(url.id)"
                  >
                    <i class="far fa-edit"></i> Edit
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <p class="mt-2 text-right">
            <button class="btn btn-success mr-2" @click="prevPage">
              Previous
            </button>
            <button class="btn btn-success" @click="nextPage">Next</button>
          </p>
        </div>
      </div>
    </div>

    <editUrlModal
      :urlId="editUrlId"
      :value="isModalVisible"
      @close="closeModal"
      @update-url="updateUrl"
    />
  </section>
</template>

<script>
import editUrlModal from "../../components/url/editUrlModal.vue";
export default {
  components: {
    editUrlModal,
  },

  data() {
    return {
      //modal opening key
      isModalVisible: false,
      editUrlId: null,

      urlLists: {
        a: 'b',
        b: 'a',
      },
      currentSort: "long_url",
      currentSortDir: "asc",
      currentPage: 1,
      pageSize: 10,
    };
  },
  watch: {
    currentSort() {
      this.sortedList();
    },
    currentSortDir() {
      this.sortedList();
    },
    currentPage(val) {
      console.log(val);
    },
  },

  computed: {
    get_UrlList() {
      return this.$store.getters["urlList/get_UrlList"];
    },

    show_urlList() {
      return this.sortedList;
    },
  },

  methods: {
    //fetch url data function
    async fetch_UrlList() {
      try {
        await this.$store.dispatch("urlList/fetch_UrlList");
        this.urlLists = this.get_UrlList;
      } catch (err) {
        this.error = err.message || "Failed to fetch url list";
      }
    },

    //go to url details function
    urlDetails(id) {
      this.$router.replace(`/url/${id}`);
    },

    //modal functions
    showModal(id) {
      this.editUrlId = id;
      this.isModalVisible = true;
      // console.log(this.editUrlId, this.isModalVisible);
    },

    closeModal() {
      this.isModalVisible = false;
    },

    //emit
    updateUrl(id, longUrl, shortUrl, status) {
      const updatedUrl = this.urlLists.find((url) => url.id === id);
      console.log(updatedUrl);
      updatedUrl.long_url = longUrl;
      updatedUrl.short_url = shortUrl;
      updatedUrl.link_status = status;
    },

    sorted(s) {
      if (s === this.currentSort) {
        this.currentSortDir = this.currentSortDir === "asc" ? "desc" : "asc";
      }
      this.currentSort = s;
    },

    sortedList() {
      return this.urlLists.sort((a, b) => {
          let modifier = 1;
          if (this.currentSortDir === "desc") modifier = -1;
          if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
          if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
          return 0;
        })
        .filter((row, index) => {
          let start = (this.currentPage - 1) * this.pageSize;
          let end = this.currentPage * this.pageSize;
          if (index >= start && index < end) return true;
        });
    },

    nextPage() {
      if (this.currentPage * this.pageSize < this.urlLists.length)
        this.currentPage++;
    },

    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
  },

  async created() {
    await this.fetch_UrlList();
  },
};
</script>
