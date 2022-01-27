import axios from "axios";

import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({
  /* options */
});

export default {
  namespaced: true,
  state() {
    return {
      url : {
        urlId: "",
        longUrl: "",
        shortUrl: "",
        
        avgClicks: "",
        dailyClicks: "",
        totalClicks: "",
      }
    };
  },
  actions: {
    async shortURL(context, payload) {
      const response = await axios
        .post(
          `${context.rootState.base_url}/shorten-url`,
          {
            long_url: payload.long_url,
          },
          {
            headers: {
              Authorization: `Bearer ${context.rootState.auth.token}`,
            },
          }
        )
        .catch((err) => {
          console.log(err.response.data.message);
          toaster.error(`${err.response.data.message}`, {
            position: "top-right",
          });
        });

      const responseData = await response.data;

      context.commit("save_createdUrlId", {
        urlId: responseData.url,
      });
      toaster.success(`${responseData.msg}`,{position: "top-right"});
    },

    async urlDetails(context, payload) {
      const response = await axios
        .get(`${context.rootState.base_url}/url-details/${payload.id}`, {
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
      
      context.commit("save_urlDetails", {
        link: responseData.link,

        avgClicks: responseData.avgClicks,
        dailyClicks: responseData.dailyClicks,
        totalClicks: responseData.totalClicks,
      });
    },
  },
  getters: {
    get_createdUrlId(state) {
      return state.url.urlId;
    },

    get_urlDetails(state) {
      return state.url;
    },
  },
  mutations: {
    save_createdUrlId(state, payload) {
      state.url.urlId = payload.urlId;
    },

    save_urlDetails(state, payload) {
      state.url.longUrl = payload.link.long_url;
      state.url.shortUrl = payload.link.short_url;

      state.url.avgClicks = payload.avgClicks;
      state.url.dailyClicks = payload.dailyClicks;
      state.url.totalClicks = payload.totalClicks;
    },
  },
};
