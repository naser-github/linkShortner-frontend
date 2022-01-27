<template>
  <nav class="main-header navbar navbar-expand-md navbar-dark" style="margin-left: 0;">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">
        <span class="brand-text font-weight-600">Link Shortener</span>
      </router-link>
      <button
        class="navbar-toggler order-1"
        type="button"
        data-toggle="collapse"
        data-target="#navbarCollapse"
        aria-controls="navbarCollapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse order-3" id="navbarCollapse">
        <!-- Left navbar links -->
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" aria-current="page" to="/homepage">
              Home
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/dashboard"
              >Dashboard</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/urlList">URLs</router-link>
          </li>
        </ul>
      </div>

      <!-- Right navbar links -->
      <ul class="order-1 order-md-3 navbar-nav navbar-no-expand ml-auto">
        <li class="nav-item dropdown">
          <a
            id="dropdownSubMenu1"
            href="#"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            class="nav-link dropdown-toggle"
          >
            {{ getUserName }}
          </a>
          <ul
            aria-labelledby="dropdownSubMenu1"
            class="dropdown-menu border-0 shadow"
          >
            <li>
              <router-link class="dropdown-item" to="/profile"
                >Profile</router-link
              >
            </li>
            <li class="dropdown-divider"></li>
            <li>
              <a class="dropdown-item" style="cursor: pointer" @click="logout"
                >Logout</a
              >
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
    getUserName() {
      return this.$store.getters.getUserName;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout").then(this.$router.replace("/login"));
    },
  },
};
</script>
