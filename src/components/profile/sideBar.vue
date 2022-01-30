<template>
  <section class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12 mt-4 ml-2">
          <!-- Profile Image -->
          <div class="card card-success card-outline" style="padding-bottom:100px;">
            <div class="card-body box-profile mt-lg-5">
              <div class="text-center">
                <img
                  class="profile-user-img img-fluid img-circle"
                  style="width: 170px; height: 170px"
                  src="../../../public/images/avatar.png"
                  alt="User profile picture"
                />
              </div>

              <h3 class="profile-username text-center">{{profile.name}}</h3>

              <p class="text-muted text-center">
                  <span class="badge badge-pill bg-gradient-success text-md">operator</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ["profile"],
};
</script>
