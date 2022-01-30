<template>
  <div class="col-md-12">
    <div class="card card-success card-outline mt-4">
      <div class="card-header">Edit Profile Details</div>
      <div class="card-body">
        <form class="form-horizontal" @submit.prevent="updateProfile">
          <div class="form-group row">
            <label for="inputName" class="col-sm-2 col-form-label">Name</label>
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                id="inputName"
                placeholder="Name"
                v-model.trim="name"
              />
            </div>
          </div>
          <div class="form-group row">
            <label for="inputEmail" class="col-sm-2 col-form-label"
              >Email</label
            >
            <div class="col-sm-10">
              <input
                class="form-control"
                id="inputEmail"
                v-model.trim="email"
                readonly
              />
            </div>
          </div>

          <div class="form-group row">
            <label for="password" class="col-sm-2 col-form-label">Password</label>
            <div class="col-sm-10">
              <input
                class="form-control"
                id="password"
                placeholder="password"
                v-model.trim="password"
              />
            </div>
          </div>

          <div class="form-group row">
            <label for="phone" class="col-sm-2 col-form-label">Phone</label>
            <div class="col-sm-10">
              <input
                class="form-control"
                id="phone"
                placeholder="phone"
                v-model.trim="phone"
              />
            </div>
          </div>

          <div class="form-group row">
            <label for="phone" class="col-sm-2 col-form-label">Status</label>
            <div class="col-sm-10">
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
          </div>

          <div class="form-group row">
            <div class="offset-sm-2 col-sm-10">
              <button type="submit" class="btn btn-lg btn-success mt-2">
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
      <!-- /.card-body -->
    </div>
    <!-- /.card -->
  </div>
</template>

<script>
export default {
  props: ["profile"],
  data() {
    return {
      name: this.profile.name,
      password: "",
      email: this.profile.email,
      status: this.profile.user_status,
      phone: this.profile.user_phone,
    };
  },
  methods: {
    async updateProfile() {
      try {
        await this.$store.dispatch("profile/updateProfile", {
          id: this.profile.id,
          name: this.name,
          password: this.password,
          email: this.email,
          status: this.status,
          phone: this.phone,
        });
      } catch (err) {
        this.error = err.message || "Failed to authenticate";
      }
    },
  },
};
</script>