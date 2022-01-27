<template>
  <section>
    <div class="mt-2 mb-5">
      <div class="sun primary"></div>
      <div class="sun secondary"></div>
      <div class="sun ternary"></div>
    </div>
    <div class="sand mt-5 mb-5">
      <div class="pendulums">
        <div class="pendulum">
          <div class="bar"></div>
          <div class="motion">
            <div class="string"></div>
            <div class="weight"></div>
          </div>
        </div>
        <div class="pendulum shadow">
          <div class="bar"></div>
          <div class="motion">
            <div class="string"></div>
            <div class="weight"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="pyramid"></div>
    <div class="text">
      <h1 class="title">
        Shorten your problems with
        <strong>Link-Shortener</strong>
      </h1>
      <form @submit.prevent="submitForm">
        <div class="row mt-5">
          <div class="col-11">
            <input
              type="text"
              class="form-control form-control-lg"
              id="url"
              v-model="url"
              placeholder="place your url here."
              style="
                transform: translateX(-5rem) translateY(0.9rem);
                width: 140%;
              "
            />
          </div>
          <div class="col-1">
            <button
              type="submit"
              class="btn btn-lg bg-gradient-warning text-white"
              style="transform: translateX(5rem)"
            >
              <strong>Shorten</strong>
            </button>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      url: "",
      isValid: true,
    };
  },

  computed: {
    get_createdUrlId() {
      return this.$store.getters["url/get_createdUrlId"];
    },
  },

  methods: {
    async submitForm() {
      this.isValid = true;

      if (this.url === "") {
        this.isValid = false;
        alert("invalid");
        return;
      }

      try {
        await this.$store
          .dispatch("url/shortURL", {
            long_url: this.url,
          })
          .then(() => this.$router.replace(`/url/${this.get_createdUrlId}`));
      } catch (err) {
        this.error = err.message || "Failed to shorten this url";
      }
    },
  },
};
</script>


<style scoped>
.sand {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 10vw;
  top: 26vw;
  left: 0;
  min-height: 10rem;
  background: #f5b041;
  transform: translateY(20%);
}

.sun {
  position: relative;
  border-radius: 50%;
  background: #f5b041;
}

.sun.primary {
  position: absolute;
  top: 14vw;
  left: 6vw;
  width: 1rem;
  height: 1rem;
}

.sun.secondary {
  position: absolute;
  top: 4vw;
  left: 9vw;
  width: 16vw;
  max-width: 6rem;
  height: 16vw;
  max-height: 6rem;
}

.sun.ternary {
  top: 4vw;
  right: 10vw;
  transform: translateX(25rem);
  width: 480px;
  max-width: 480px;
  height: 480px;
  max-height: 480px;
}

.pendulums {
  position: absolute;
  width: 50px;
  height: 200px;
  right: 35vw;
  top: -120px;
  perspective: 400px;
}

.pendulum {
  position: absolute;
  width: 50px;
  height: 200px;
  right: 44%;
  top: 0;
  left: 50%;
  transform: translateZ(-300px) translateX(-50%);
}

.pendulum.shadow {
  top: 269%;
  left: -87%;
  bottom: 0;
  transform-origin: 200% 0;
  transform: translateX(-50%) scaleY(-1) scaleZ(2) rotateY(-30deg)
    rotateX(-75deg) translateZ(302px);
}

.pendulum .bar {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
  display: block;
  width: 20px;
  height: 200px;
  background: #333;
}

.pendulum .string {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 145px;
  background: #333;
}

.pendulum .weight {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 10px;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: #333;
}

.pendulum .motion {
  position: absolute;
  height: 200px;
  width: 50px;
  transform-origin: 50% 10px;
  animation: swing 1600ms infinite ease-in-out;
}

.pendulum.shadow .bar,
.pendulum.shadow .string,
.pendulum.shadow .weight {
  background: #3d3a34;
}

@import url(https://fonts.googleapis.com/css?family=Oswald:300,400,700);

.text {
  position: absolute;
  width: auto;
  top: 11vw;
  right: 16vw;
  bottom: calc(63vh);
  transform: translateY(50%);
  font-size: 2.8rem;
}

.title {
  text-align: center;
  font-size: 0.6em;
  font-family: "Oswald";
  font-weight: 300;
  text-transform: uppercase;
  line-height: 1.3em;
  margin: 0;
  color: #222;
}

.title strong {
  display: block;
  font-weight: 700;
  font-size: 2.3em;
  line-height: 1em;
}

@keyframes swing {
  0% {
    transform: rotate(-45deg);
  }
  50% {
    transform: rotate(45deg);
  }
  100% {
    transform: rotate(-45deg);
  }
}

@media only screen and (orientation: portrait) {
  .text {
    right: 50%;
    top: 10%;
    transform: translateX(50%);
    font-size: 7vw;
  }
  .title {
    font-size: 1em;
  }
}
</style>