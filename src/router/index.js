import { createWebHistory, createRouter } from "vue-router";
import appConfig from "../../app.config";
import store from "@/state/store";
// import axios from 'axios';
// import defaultRoutes from './default-routes';

import main from "./main-routes";
import admin from "./admin-routes";
import employer from "./employer-routes";

const routes = [...main, ...admin, ...employer];

// import routes from "./main-routes";

const router = createRouter({
  history: createWebHistory(),
  routes,
  mode: "history",
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0, left: 0 };
    }
  },
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters["auth/isAuthenticated"]
  const requiresAuth = to.meta.requiresAuth === true

  if (requiresAuth && !isAuthenticated) {
    return next("/login")
  }

  if (
    isAuthenticated &&
    (to.path === "/login" || to.path === "/register")
  ) {
    return next("/dashboard")
  }

  next()
})

router.beforeResolve(async (routeTo, routeFrom, next) => {
  // Create a `beforeResolve` hook, which fires whenever
  // `beforeRouteEnter` and `beforeRouteUpdate` would. This
  // allows us to ensure data is fetched even when params change,
  // but the resolved route does not. We put it in `meta` to
  // indicate that it's a hook we created, rather than part of
  // Vue Router (yet?).
  try {
    // For each matched route...
    for (const route of routeTo.matched) {
      await new Promise((resolve, reject) => {
        // If a `beforeResolve` hook is defined, call it with
        // the same arguments as the `beforeEnter` hook.
        if (route.meta && route.meta.beforeResolve) {
          route.meta.beforeResolve(routeTo, routeFrom, (...args) => {
            // If the user chose to redirect...
            if (args.length) {
              // If redirecting to the same route we're coming from...
              // Complete the redirect.
              next(...args);
              reject(new Error("Redirected"));
            } else {
              resolve();
            }
          });
        } else {
          // Otherwise, continue resolving the route.
          resolve();
        }
      });
    }
    // If a `beforeResolve` hook chose to redirect, just return.
  } catch (error) {
    return;
  }

  document.title = routeTo.meta.title + " | " + appConfig.title;
  // If we reach this point, continue resolving the route.
  next();
});

export default router;
