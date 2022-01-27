import axios from "axios";

import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ /* options */ });

export default {
  state() {
    return {
      token: null,
      userId: null,
      userName: null,
      email: null,
    };
  },
  actions: {
    async login(context, payload) {
      const response = await axios
        .post(`${context.rootState.base_url}/login`, {
          email: payload.email,
          password: payload.password,
        })
        .catch(function (error) {
          console.log(error.response.data.message);
          toaster.error(`${error.response.data.message}`,{position: "top-right"});
          
        });

      const responseData = await response.data;

      localStorage.setItem("token", responseData.token);
      localStorage.setItem("userId", responseData.user.id);
      localStorage.setItem("userName", responseData.user.name);
      localStorage.setItem("userEmail", responseData.user.email);

      context.commit("saveLoggedUser", {
        token: responseData.token,
        userId: responseData.user.id,
        userName: responseData.user.name,
        userEmail: responseData.user.email,
      });
    },

    async checkLogin(context) {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      const userName = localStorage.getItem("userName");
      const userEmail = localStorage.getItem("userEmail");

      if (token) {
        context.commit("saveLoggedUser", {
          token: token,
          userId: userId,
          userName: userName,
          userEmail: userEmail,
        });
      }
    },

    logout(context) {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("userName");
      localStorage.removeItem("userEmail");

      context.commit("saveLoggedUser", {
        token: null,
        userId: null,
        userName: null,
        userEmail: null,
      });
    },
  },
  getters: {
    getToken(state) {
      return state.token;
    },
    getUserName(state) {
      return state.userName;
    },
  },
  mutations: {
    saveLoggedUser(state, payload) {
      state.token = payload.token;
      state.userId = payload.userId;
      state.userName = payload.userName;
      state.email = payload.email;
    },
  },
};
