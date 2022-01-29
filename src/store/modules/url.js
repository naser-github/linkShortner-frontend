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
        status: "",
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
          toaster.error(`${"something went wrong"}`, {
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
          toaster.error(`${"something went wrong"}`, {
            position: "top-right",
          });
        });

      const responseData = await response.data;

      await context.commit("save_urlDetails", {
        link: responseData.link,
        deviceTypes: responseData.deviceTypes,
        link_status: responseData.link_status,

        avgClicks: responseData.averageClicks,
        dailyClicks: responseData.dailyClicks,
        totalClicks: responseData.totalClicks,
      });
    },

    async updateUrl(context, payload) {
      const response = await axios
        .patch(
          `${context.rootState.base_url}/update-url/${payload.id}`,
          {
            longUrl: payload.longUrl,
            shortUrl: payload.shortUrl,
            status: payload.status,
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
      }else{
        toaster.error(`${responseData.msg}`, {
          position: "top-right",
        });
      }
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
      state.url.status = payload.link.link_status;

      //clickDetails
      state.clickDetails.avgClicks = payload.avgClicks.toFixed(2);
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
