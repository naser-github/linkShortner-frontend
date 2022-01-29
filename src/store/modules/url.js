import axios from "axios";

import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({
  /* options */
});

export default {
  namespaced: true,
  state() {
    return {
      url: {
        urlId: "",
        longUrl: "",
        shortUrl: "",
      },
      clickDetails: {
        avgClicks: 0,
        dailyClicks: 0,
        totalClicks: 0,
      },
      clientDevices: {
        desktop: 0,
        mobile: 0,
        others: 0,
      },
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
      toaster.success(`${responseData.msg}`, { position: "top-right" });
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

      await context.commit("save_urlDetails", {
        link: responseData.link,
        deviceTypes: responseData.deviceTypes,

        avgClicks: responseData.averageClicks,
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

    get_clickDetails(state) {
      return state.clickDetails;
    },

    get_clientDevices(state) {
      return state.clientDevices;
    },
  },
  mutations: {
    save_createdUrlId(state, payload) {
      state.url.urlId = payload.urlId;
    },

    async save_urlDetails(state, payload) {
      //url
      state.url.longUrl = payload.link.long_url;
      state.url.shortUrl = payload.link.short_url;

      //clickDetails
      state.clickDetails.avgClicks = payload.avgClicks;
      state.clickDetails.dailyClicks = payload.dailyClicks;
      state.clickDetails.totalClicks = payload.totalClicks;

      // clientDevice
      await payload.deviceTypes.forEach((device) => {
        if (device.client_device == "desktop") {
          state.clientDevices.desktop = device.total_client_device;
        } else if (device.client_device == "mobile") {
          state.clientDevices.mobile = device.total_client_device;
        } else {
          state.clientDevices.others = device.total_client_device;
        }
      });
    },
  },
};
