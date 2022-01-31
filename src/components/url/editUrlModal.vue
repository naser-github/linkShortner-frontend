<template>
  <transition name="modal-fade">
    <div class="modal-backdrop" v-show="value">
      <div
        class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header
          class="modal-header bg-dark font-weight-bold"
          style="background: linear-gradient(170deg, #195647, #43a047)"
          id="modalTitle"
        >
          <slot name="header" class="modal-title"> Edit Url Details </slot>
          <button
            type="button"
            class="close"
            @click="close"
            aria-label="Close modal"
          >
            x
          </button>
        </header>
        <form @submit.prevent="updateUrl">
          <section class="modal-body" id="modalDescription">
            <slot name="body">
              <div class="form-group">
                <label>Long Url: *</label>
                <input
                  class="form-control"
                  type="text"
                  v-model.trim="longUrl"
                />
              </div>

              <div class="form-group">
                <label>Short Url: *</label>
                <input
                  class="form-control"
                  type="text"
                  v-model.trim="shortUrl"
                />
              </div>
              <div class="form-group">
                <label>Select Status:</label>
                <select
                  data-placeholder="Select Status"
                  class="form-control"
                  v-model.trim="status"
                  required
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </slot>
          </section>

          <footer class="modal-footer justify-content-between">
            <slot name="footer"></slot>
            <button
              type="button"
              class="btn btn-default"
              @click="close"
              aria-label="Close modal"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="btn text-white"
              style="background: linear-gradient(45deg, #195647, #43a047)"
              @click="closeAfterUpdate"
              aria-label="Close modal"
            >
              Update
            </button>
          </footer>
        </form>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Modal",
  props: ["urlId", "value"],

  data() {
    return {
      longUrl: "",
      shortUrl: "",
      status: "",
    };
  },
  watch: {
    value(isActive) {
      if (isActive && this.urlId) {
        this.urlDetailPage();
      }
    },
  },
  computed: {
    get_url() {
      return this.$store.getters["url/get_urlDetails"];
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
    closeAfterUpdate() {
      this.$emit(
        "update-url",
        this.urlId,
        this.longUrl,
        this.shortUrl,
        this.status
      );
      this.$emit("close");
    },

    async urlDetailPage() {
      try {
        await this.$store.dispatch("url/urlDetails", {
          id: this.urlId,
        });
      } catch (err) {
        this.error = err.message || "Failed to shorten this url";
      }
      const url = await this.get_url;

      this.longUrl = url.longUrl;
      this.shortUrl = url.shortUrl;
      this.status = url.status;
    },

    async updateUrl() {
      try {
        await this.$store.dispatch("url/updateUrl", {
          id: this.urlId,
          longUrl: this.longUrl,
          shortUrl: this.shortUrl,
          status: this.status,
        });
      } catch (err) {
        this.error = err.message || "Failed to authenticate";
      }
    },
  },
};
</script>

<style>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
}

.modal {
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;

  max-height: 430px;
  max-width: 50%;
  margin: 80px 25% 0 25%;
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>