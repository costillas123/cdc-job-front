import { createStore } from "vuex";
import modules from "./modules";
import auth from "./modules/auth";

const store = createStore({
  modules: {
    ...modules,
    auth,
  },
  strict: process.env.NODE_ENV !== "production",
});

export default store;
