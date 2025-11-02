// import store from "@/state/store";

export default [
  // errors routes =====================================================
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    meta: { title: "error 404", authRequired: false },
    component: () => import("../views/errors/404.vue"),
  },
  {
    path: "/page-error-500",
    name: "error500",
    meta: { title: "error 500", authRequired: false },
    component: () => import("../views/errors/500.vue"),
  },

  // landing routes =====================================================
  {
    path: "/",
    name: "landing",
    meta: { title: "Landing", authRequired: false },
    component: () => import("../views/landing/home.vue"),
  },

  {
    path: "/view-vacancies",
    name: "viewVacancies",
    meta: { title: "Vacancies List", authRequired: false },
    component: () => import("../views/landing/jobs.vue"),
  },

  {
    path: "/view-job-details/:code",
    name: "viewJobDetails",
    meta: { title: "Job Details", authRequired: false },
    component: () => import("../views/landing/job-details.vue"),
  },

  // guest routes =====================================================
  {
    path: "/login",
    name: "login",
    meta: { title: "Login", authRequired: false },
    component: () => import("../views/guest/login.vue"),
  },
  {
    path: "/register",
    name: "register",
    meta: { title: "Register", authRequired: false },
    component: () => import("../views/guest/register.vue"),
  },
  {
    path: "/forgot-password",
    name: "forgotPassword",
    meta: { title: "Forgot Password", authRequired: false },
    component: () => import("../views/guest/forgot-password.vue"),
  },
  {
    path: "/reset-password",
    name: "resetPassword",
    meta: { title: "Reset Password", authRequired: false },
    component: () => import("../views/guest/reset-password.vue"),
  },

  {
    path: "/auth-check/:type",
    name: "authCheck",
    meta: { title: "Auth Checker", authRequired: false },
    component: () => import("../views/guest/auth-check.vue"),
  },

  // =====================================================
  {
    path: "/dashboard",
    name: "dashboard",
    meta: { title: "Dashboard", requiresAuth: true },
    component: () => import("../views/main/dashboard/index.vue"),
  },
  {
    path: "/user-logs",
    name: "userLogs",
    meta: { title: "User Logs", requiresAuth: true },
    component: () => import("../views/main/user-logs.vue"),
  },
  {
    path: "/view-profile/:id",
    name: "viewProfile",
    meta: { title: "View Profile Info", requiresAuth: true },
    component: () => import("../views/main/view-profile.vue"),
  },
  {
    path: "/view-notifications",
    name: "viewNotifications",
    meta: { title: "View Notifications", requiresAuth: true },
    component: () => import("../views/main/view-notifications.vue"),
  },
    {
    path: "/announcements",
    name: "announcements",
    meta: { title: "View Announcements", requiresAuth: true },
    component: () => import("../views/main/announces.vue"),
  },
  {
    path: "/reports",
    name: "reports",
    meta: { title: "Report List", requiresAuth: true },
    component: () => import("../views/main/reports.vue"),
  },

  // Profile Menus =====================================================
  {
    path: "/messages",
    name: "messages",
    meta: { title: "Messages", requiresAuth: true },
    component: () => import("../views/main/profile-menus/message.vue"),
  },
  {
    path: "/profile-info",
    name: "profileInfo",
    meta: { title: "Profile Information", requiresAuth: true },
    component: () => import("../views/main/profile-menus/profile-info.vue"),
  },
  {
    path: "/profile-setting",
    name: "profileSetting",
    meta: { title: "Profile Setting", requiresAuth: true },
    component: () => import("../views/main/profile-menus/profile-settings.vue"),
  },

  // Job Seeker =====================================================
  {
    path: "/jobs",
    name: "jobs",
    meta: { title: "Job List", requiresAuth: true },
    component: () => import("../views/main/job-seeker/job-list.vue"),
  },

  {
    path: "/applications",
    name: "applications",
    meta: { title: "Job Applications List", requiresAuth: true },
    component: () => import("../views/main/job-seeker/app-list.vue"),
  },

  // Peso School =====================================================
  {
    path: "/bulk-uploads",
    name: "bulkUploads",
    meta: { title: "Bulk Upload List", requiresAuth: true },
    component: () => import("../views/main/peso-school/resumes.vue"),
  },
];
