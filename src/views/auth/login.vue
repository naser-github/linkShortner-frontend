<template>

  <div class="content-wrapper">
    <div class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-11">
            <div class="row">
              <div class="col-5"></div>
              <div class="col-7">
                <div
                  class="card bg-dark text-white"
                  style="width: 20rem; margin-top: 8rem; opacity: 0.8"
                >
                  <div class="card-header bg-secondary">Login</div>
                  <div class="card-body">
                    <form @submit.prevent="submitForm">
                      <div class="mb-3">
                        <label for="email" class="form-label">Email</label>
                        <input
                          type="email"
                          class="form-control"
                          id="email"
                          v-model.trim="email"
                          required
                        />
                      </div>
                      <div class="mb-3">
                        <label for="password" class="form-label"
                          >Password</label
                        >
                        <input
                          type="password"
                          class="form-control"
                          id="password"
                          v-model.trim="password"
                          required
                        />
                      </div>

                      <div class="text-center">
                        <p>Need an account?</p>
                      </div>

                      <button class="btn btn-success">Log In</button>
                      <!-- <button class="btn btn-outline-success text-white">Sign Up</button> -->
                    </form>
                  </div>
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
export default {
  data() {
    return {
      email: "",
      password: "",
      mode: "login",
      isValid: true,
    };
  },

  methods: {
    async submitForm() {
      this.isValid = true;

      if (
        this.email === "" ||
        !this.email.includes("@") ||
        this.password.length < 6
      ) {
        this.isValid = false;
        alert("invalid");
        return;
      }

      try {
        if (this.mode === "login") {
          await this.$store.dispatch("login", {
            email: this.email,
            password: this.password,
          });
        } else {
          this.$store.dispatch("signUp", {
            email: this.email,
            password: this.password,
          });
        }

        this.$router.replace("/");
      } catch (err) {
        this.error = err.message || "Failed to authenticate";
      }
    },
  },

  created() {
    if (this.$store.getters.getToken) {
      this.$toast.error(`Already Logged in`,{position: "top-right"});
      this.$router.replace("/");
    }
  },
};
</script>

<style scoped>
.content-wrapper {
  background-image: url("../../../public/images/logo.png");
  background-size: cover;
}
</style>
