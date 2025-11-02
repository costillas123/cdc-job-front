export default [
  {
    path: "/others/icons",
    name: "otherIcons",
    meta: { title: "Icons Remix" },
    component: () => import("../views/main/remix.vue"),
  },

  // ============================
  // ⚙️ Manage Monitor Routes
  // ============================
  {
    path: "/manage-monitor/users",
    name: "manageMonitorUsers",
    meta: { title: "Manage Users" },
    component: () => import("../views/main/admin/manage-monitor/users.vue"),
  },
  {
    path: "/manage-monitor/vacancies",
    name: "manageMonitorVacancies",
    meta: { title: "Monitor Vacancies" },
    component: () => import("../views/main/admin/manage-monitor/vacancies.vue"),
  },
  {
    path: "/manage-monitor/applications",
    name: "manageMonitorApplications",
    meta: { title: "Monitor Applications" },
    component: () =>
      import("../views/main/admin/manage-monitor/applications.vue"),
  },

  // ============================
  // ⚙️ Settings Routes
  // ============================
  {
    path: "/settings/system-logs",
    name: "settingsSystemLogs",
    meta: { title: "System Logs" },
    component: () => import("../views/main/admin/settings/system-logs.vue"),
  },
  {
    path: "/settings/announcements",
    name: "settingsAnnouncements",
    meta: { title: "Announcements" },
    component: () => import("../views/main/admin/settings/announcements.vue"),
  },
  {
    path: "/settings/email-smtps",
    name: "settingsEmailSmtps",
    meta: { title: "Email SMTPs" },
    component: () => import("../views/main/admin/settings/email-smtps.vue"),
  },
  {
    path: "/settings/categories",
    name: "settingsCategories",
    meta: { title: "Job Categories" },
    component: () => import("../views/main/admin/settings/categories.vue"),
  },
  {
    path: "/settings/subcategories",
    name: "settingsSubCategories",
    meta: { title: "Job Sub Categories" },
    component: () => import("../views/main/admin/settings/sub-categories.vue"),
  },
  {
    path: "/settings/attributes",
    name: "settingsAttributes",
    meta: { title: "Job Attributes" },
    component: () => import("../views/main/admin/settings/attributes.vue"),
  },
  {
    path: "/settings/sub-attributes",
    name: "settingsSubAttributes",
    meta: { title: "Job Sub Attributes" },
    component: () => import("../views/main/admin/settings/sub-attributes.vue"),
  },
];
