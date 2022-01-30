<template>
  <section class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">
                DataTable with minimal features &amp; hover style
              </h3>
            </div>
            <!-- /.card-header -->
            <div class="card-body">
              <table id="myTable" class="table table-striped table-hover">
                <thead class="datatable-header-accent">
                  <tr>
                    <th @click="sort('long_url')">
                      Original Url
                      <i
                        :class="
                          currentSortDir == 'asc'
                            ? 'fas fa-arrow-up'
                            : 'fas fa-arrow-down'
                        "
                      ></i>
                    </th>
                    <th @click="sort('short_url')">
                      Shortened Url
                      <i
                        :class="
                          currentSortDir == 'asc'
                            ? 'fas fa-arrow-up'
                            : 'fas fa-arrow-down'
                        "
                      ></i>
                    </th>
                    <th @click="sort('link_status')">
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
                  <tr v-for="url in get_UrlList" :key="url.id">
                    <td @click="urlDetails(url.id)">
                      <span
                        class="badge badge-button bg-light text-white text-md"
                        style="border-left: 0.7rem solid #43a047"
                      >
                        {{ url.long_url.substring(0, 25) + ".." }}
                      </span>
                    </td>
                    <td @click="urlDetails(url.id)">
                      <span
                        class="badge badge-button bg-light text-white text-md"
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
                        style="
                          background: linear-gradient(45deg, #195647, #43a047);
                        "
                        @click="showModal(url.id)"
                      >
                        <i class="far fa-edit"></i> Edit
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <p>
                <button @click="prevPage">Previous</button>
                <button @click="nextPage">Next</button>
              </p>

              <!-- debug: sort={{ currentSort }}, dir={{ currentSortDir }}, page={{
                currentPage
              }} -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <editUrlModal
      :urlId="editUrlId"
      @close="closeModal"
      :value="isModalVisible"
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

      urlLists: null,
      currentSort: "long_url",
      currentSortDir: "asc",
      currentPage: 1,
      pageSize: 2,
    };
  },
  watch: {
    currentSort() {
      this.sortedList();
    },
    currentSortDir() {
      this.sortedList();
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

    sort(s) {
      if (s === this.currentSort) {
        this.currentSortDir = this.currentSortDir === "asc" ? "desc" : "asc";
      }
      this.currentSort = s;
    },

    sortedList: function () {
      return this.urlLists
        .sort((a, b) => {
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

