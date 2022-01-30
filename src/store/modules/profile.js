import axios from "axios";

import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({
  /* options */
});

export default {
  namespaced: true,
  state() {
    return {
      profileData: null,
    };
  },
  actions: {
    async fetch_profileData(context) {
      const response = await axios
        .get(`${context.rootState.base_url}/profile/${localStorage.userId}`, {
          headers: {
            Authorization: `Bearer ${context.rootState.auth.token}`,
          },
        })
        .catch((err) => {
          console.log(err.response.data.message);
          toaster.error("something went wrong", {
            position: "top-right",
          });
        });

      const responseData = await response.data;

      await context.commit("save_data", {
        user: responseData.user,
      });
    },

    async updateProfile(context, payload) {
      const response = await axios
        .patch(
          `${context.rootState.base_url}/profile/${payload.id}`,
          {
            name: payload.name,
            email: payload.email,
            password: payload.password,
            status: payload.status,
            phone: payload.phone,
          },
          {
            headers: {
              Authorization: `Bearer ${context.rootState.auth.token}`,
            },
          }
        )
        .catch(function (error) {
          console.log(error.response.data.message);
          toaster.error(`${"something went wrong"}`, {
            position: "top-right",
          });
        });

      const responseData = await response.data;
      if (response.status === 201) {
        toaster.success(`${responseData.msg}`, {
          position: "top-right",
        });
      } else {
        toaster.error(`${responseData.msg}`, {
          position: "top-right",
        });
      }

      await context.commit("update_urlDetails", {
        link: responseData.link,
      });
    },
  },
  getters: {
    get_profileData(state) {
      return state.profileData;
    },
  },
  mutations: {
    save_data(state, payload) {
      state.profileData = payload.user;
    },
  },
};
