import axios from "axios";

import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({
  /* options */
});

export default {
  namespaced: true,
  state() {
    return {
      clicksDetails: {
        visitedToday: "",
        linkToday: "",
        totalLinks: "",
      },
      clientDevices: {
        desktop: 0,
        mobile: 0,
        others: 0,
      },
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
        deviceTypes: responseData.deviceTypes,
      });
    },
  },
  getters: {
    get_clicksDetails(state) {
      return state.clicksDetails;
    },
    get_clientDevices(state) {
      return state.clientDevices;
    },
  },
  mutations: {
    save_data(state, payload) {
      state.clicksDetails.visitedToday = payload.visitedToday;
      state.clicksDetails.linkToday = payload.linkToday;
      state.clicksDetails.totalLinks = payload.totalLinks;

      // clientDevice
      payload.deviceTypes.forEach((device) => {
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
