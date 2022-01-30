import { createStore } from "vuex";

import auth from "./modules/auth";
import dashboard from "./modules/dashboard";
import profile from "./modules/profile";
import tag from "./modules/tag";
import url from "./modules/url";
import urlList from "./modules/urlList";

const store = createStore({
  modules: {
    auth: auth,
    dashboard: dashboard,
    profile: profile,
    tag: tag,
    url: url,
    urlList: urlList,
  },
  state() {
    return {
      base_url: "http://127.0.0.1:8000/api",
    };
  },
  actions: {},
  getters: {},
  mutations: {},
});

export default store;
