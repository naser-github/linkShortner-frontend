import axios from "axios";

import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({
  /* options */
});

export default {
  namespaced: true,
  state() {
    return {
      data : {
        visitedToday: "",
        linkToday: "",
        totalLinks: "",
      }
    };
  },
  actions: {
    
    async dashboardPage(context) {
      const response = await axios
        .get(`${context.rootState.base_url}/dashboard`, {
          headers: {
            Authorization: `Bearer ${context.rootState.auth.token}`,
          },
        })
        .catch((err) => {
          console.log(err.response.data.message);
          toaster.error(`${err.response.data.message}`, {
            position: "top-right",
          });
        });

      const responseData = await response.data;
      
      context.commit("save_data", {
        visitedToday: responseData.visitedToday,
        linkToday: responseData.linkToday,
        totalLinks: responseData.totalLinks,
      });
    },
  },
  getters: {

    get_data(state) {
      return state.data;
    },
  },
  mutations: {
    save_data(state, payload) {

      state.data.visitedToday = payload.visitedToday;
      state.data.linkToday = payload.linkToday;
      state.data.totalLinks = payload.totalLinks;
    },
  },
};
