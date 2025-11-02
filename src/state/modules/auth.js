export default {
  namespaced: true,
  state: () => ({
    token: localStorage.getItem("token") || null,
    user: JSON.parse(localStorage.getItem("user")) || {},
  }),
  mutations: {
    setUser(state, payload) {
      state.token = payload.token
      state.user = payload.user
      localStorage.setItem("token", payload.token)
      localStorage.setItem("user", JSON.stringify(payload.user))
    },
    clearUser(state) {
      state.token = null
      state.user = {}
      localStorage.removeItem("token")
      localStorage.removeItem("user")
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    currentUser: (state) => state.user,
  },
}

// export default {
//   namespaced: true,
//   state: () => ({
//     token: localStorage.getItem("token") || null,
//     user: JSON.parse(localStorage.getItem("user")) || null,
//     mode: localStorage.getItem("mode") || "light",
//   }),
//   mutations: {
//     setUser(state, payload) {
//       state.token = payload.token;
//       state.user = payload.user;
//       localStorage.setItem("token", payload.token);
//       localStorage.setItem("user", JSON.stringify(payload.user));
//     },
//     clearUser(state) {
//       state.token = null;
//       state.user = null;
//       localStorage.removeItem("token");
//       localStorage.removeItem("user");
//     },
//     setMode(state, mode) {
//       state.mode = mode;
//       localStorage.setItem("mode", mode);
//       document.documentElement.setAttribute("data-bs-theme", mode);
//     },
//   },
//   getters: {
//     isAuthenticated: (state) => !!state.token,
//     currentUser: (state) => state.user,
//     currentMode: (state) => state.mode,
//     isDarkMode: (state) => state.mode === "dark",
//   },
// };
