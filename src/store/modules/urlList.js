import axios from "axios";

import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({
  /* options */
});

export default {
  namespaced: true,
  state() {
    return {
      urlList: null,
    };
  },
  actions: {
    async fetch_UrlList(context) {
      const response = await axios
        .get(`${context.rootState.base_url}/my-urls`, {
          headers: {
            Authorization: `Bearer ${context.rootState.auth.token}`,
          },
        })
        .catch((err) => {
          console.log(err.response.data.message);
          toaster.error(`Something went wrong!!!`, {
            position: "top-right",
          });
        });

        const responseData = await response.data;
      
        context.commit("save_UrlList", {
          urlList: responseData.urlList,
        });
    },
  },
  getters: {
    get_UrlList(state) {
      return state.urlList;
    },
  },
  mutations: {
    save_UrlList(state, payload) {
      state.urlList = payload.urlList;
    },
  },
};
