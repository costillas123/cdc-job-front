export default [
  // ============================
  // ⚙️ Manage-jobs Routes
  // ============================

  {
    path: "/manage-jobs/job-lists",
    name: "jobList",
    meta: { title: "List Job", requiresAuth: true },
    component: () => import("../views/main/employer/manage-jobs/job-lists.vue"),
  },
  {
    path: "/manage-jobs/job-create",
    name: "createJob",
    meta: { title: "New Job", requiresAuth: true },
    component: () =>
      import("../views/main/employer/manage-jobs/job-create.vue"),
  },
  {
    path: "/manage-jobs/job-update/:code",
    name: "updateJob",
    meta: { title: "Update Job", requiresAuth: true },
    component: () =>
      import("../views/main/employer/manage-jobs/job-update.vue"),
  },
  {
    path: "/jobs-details/:code",
    name: "jobDetails",
    meta: { title: "Job Details", requiresAuth: true },
    component: () =>
      import("../views/main/employer/manage-jobs/job-details.vue"),
  },
  {
    path: "/manage-jobs/app-lists",
    name: "jobApplications",
    meta: { title: "List Job Applications", requiresAuth: true },
    component: () => import("../views/main/employer/manage-jobs/app-lists.vue"),
  },
];
