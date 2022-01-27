import axios from "axios";

export default {
  namespace: true,
  state() {
    return {};
  },
  actions: {
    async shortURL(context, payload) {
      const response = await axios
        .post("http://127.0.0.1:8000/api/login", {
          email: payload.email,
          password: payload.password,
        })
        .catch(function (error) {
          console.log(error);
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
  },
  getters: {},
  mutations: {},
};
