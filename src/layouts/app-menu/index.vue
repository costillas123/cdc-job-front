<template>
  <div>
    <div id="layout-wrapper">
      <NavBar />
      <div class="app-menu navbar-menu">
        <div class="navbar-brand-box">
          <router-link to="/" class="logo logo-dark">
            <span class="logo-sm">
              <img src="@/assets/images/logo-sm.png" alt="" height="22" />
            </span>
            <span class="logo-lg">
              <img src="@/assets/images/logo-dark.png" alt="" height="17" />
            </span>
          </router-link>

          <router-link to="/" class="logo logo-light">
            <span class="logo-sm">
              <img src="@/assets/images/logo-sm.png" alt="" height="22" />
            </span>
            <span class="logo-lg">
              <img src="@/assets/images/logo-light.png" alt="" height="17" />
            </span>
          </router-link>

          <BButton
            size="sm"
            class="p-0 fs-20 header-item float-end btn-vertical-sm-hover"
            id="vertical-hover"
          >
            <i class="ri-record-circle-line"></i>
          </BButton>
        </div>

        <div id="scrollbar">
          <BContainer fluid>
            <ul class="navbar-nav h-100" id="navbar-nav">
              <li class="menu-title">
                <span data-key="t-menu">Dashboard</span>
              </li>

              <li class="nav-item">
                <router-link class="nav-link menu-link" to="/dashboard">
                  <i class="ri-dashboard-2-line"></i>
                  <span data-key="t-dashboards">Dashboard</span>
                </router-link>
              </li>

              <!-- Bulk Upload -->
              <li class="nav-item" v-if="['peso_school'].includes(role)">
                <router-link class="nav-link menu-link" to="/bulk-uploads">
                  <i class="ri-upload-cloud-2-line"></i>
                  <span data-key="t-bulk-upload">Bulk Upload</span>
                </router-link>
              </li>

              <!-- jobs list -->
              <li
                class="nav-item"
                v-if="['job_seeker', 'peso_school'].includes(role)"
              >
                <router-link class="nav-link menu-link" to="/jobs">
                  <i class="ri-briefcase-line"></i>
                  <span data-key="t-dashboards">Jobs</span>
                </router-link>
              </li>

              <!-- applications -->
              <li class="nav-item" v-if="role == 'job_seeker'">
                <router-link class="nav-link menu-link" to="/applications">
                  <i class="ri-file-list-line"></i>
                  <span data-key="t-dashboards">Applications</span>
                </router-link>
              </li>

              <!-- Manage jobs -->
              <li class="nav-item" v-if="role == 'employer'">
                <BLink
                  class="nav-link"
                  href="#sidebarJobConfig"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarJobConfig"
                >
                  <i class="ri-briefcase-line"></i>
                  <span>Manage Jobs</span>
                </BLink>

                <div class="collapse menu-dropdown" id="sidebarJobConfig">
                  <ul class="nav nav-sm flex-column">
                    <li class="nav-item">
                      <router-link
                        class="nav-link menu-link"
                        to="/manage-jobs/job-lists"
                      >
                        <i class="ri-briefcase-4-line me-2"></i>
                        Vacancies
                      </router-link>
                    </li>
                    <li class="nav-item">
                      <router-link
                        class="nav-link menu-link"
                        to="/manage-jobs/app-lists"
                      >
                        <i class="ri-user-2-line me-2"></i>
                        Applications
                      </router-link>
                    </li>
                  </ul>
                </div>
              </li>

              <!-- Manage & Monitor -->
              <li
                class="nav-item"
                v-if="['admin', 'secretariat'].includes(role)"
              >
                <BLink
                  class="nav-link"
                  href="#sidebarManageMonitor"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarManageMonitor"
                  data-key="t-manage-monitor"
                >
                  <i class="ri-organization-chart"></i>
                  <span data-key="t-manage-monitor">Manage & Monitor</span>
                </BLink>

                <div class="collapse menu-dropdown" id="sidebarManageMonitor">
                  <ul class="nav nav-sm flex-column">
                    <!-- Manage Users -->
                    <li class="nav-item">
                      <router-link
                        class="nav-link menu-link"
                        to="/manage-monitor/users"
                      >
                        <i class="ri-user-settings-line me-1"></i>
                        <span>Manage Users</span>
                      </router-link>
                    </li>

                    <!-- Monitor Vacancies -->
                    <li class="nav-item">
                      <router-link
                        class="nav-link menu-link"
                        to="/manage-monitor/vacancies"
                      >
                        <i class="ri-briefcase-line me-1"></i>
                        <span>Monitor Vacancies</span>
                      </router-link>
                    </li>

                    <!-- Monitor Applications -->
                    <li class="nav-item">
                      <router-link
                        class="nav-link menu-link"
                        to="/manage-monitor/applications"
                      >
                        <i class="ri-file-list-3-line me-1"></i>
                        <span>Monitor Applications</span>
                      </router-link>
                    </li>
                  </ul>
                </div>
              </li>

              <!-- Settings -->
              <li
                class="nav-item"
                v-if="['admin', 'secretariat'].includes(role)"
              >
                <BLink
                  class="nav-link"
                  href="#sidebarSettings"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarSettings"
                  data-key="t-settings"
                >
                  <i class="ri-settings-4-line"></i>
                  <span data-key="t-settings">Settings</span>
                </BLink>

                <div class="collapse menu-dropdown" id="sidebarSettings">
                  <ul class="nav nav-sm flex-column">
                    <!-- 🗂 Job Classifications -->
                    <li class="nav-item">
                      <router-link
                        class="nav-link menu-link"
                        to="/settings/categories"
                      >
                        <i class="ri-folders-line me-1"></i>
                        Main Categories
                      </router-link>
                    </li>

                    <li class="nav-item">
                      <router-link
                        class="nav-link menu-link"
                        to="/settings/subcategories"
                      >
                        <i class="ri-folder-keyhole-line me-1"></i>
                        Sub Categories
                      </router-link>
                    </li>

                    <li class="nav-item">
                      <router-link
                        class="nav-link menu-link"
                        to="/settings/attributes"
                      >
                        <i class="ri-list-settings-line me-1"></i>
                        Job Attributes
                      </router-link>
                    </li>

                    <li class="nav-item">
                      <router-link
                        class="nav-link menu-link"
                        to="/settings/sub-attributes"
                      >
                        <i class="ri-list-check-2 me-1"></i>
                        Job Sub Attributes
                      </router-link>
                    </li>

                    <!-- ⚙️ System Management -->
                    <li class="nav-item">
                      <router-link
                        class="nav-link menu-link"
                        to="/settings/system-logs"
                      >
                        <i class="ri-file-list-3-line me-1"></i>
                        System Logs
                      </router-link>
                    </li>

                    <li class="nav-item">
                      <router-link
                        class="nav-link menu-link"
                        to="/settings/announcements"
                      >
                        <i class="ri-megaphone-line me-1"></i>
                        Announcement
                      </router-link>
                    </li>

                    <li class="nav-item">
                      <router-link
                        class="nav-link menu-link"
                        to="/settings/email-smtps"
                      >
                        <i class="ri-mail-settings-line me-1"></i>
                        Email SMTP
                      </router-link>
                    </li>
                  </ul>
                </div>
              </li>

              <!-- messages -->
              <li
                class="nav-item"
                v-if="role === 'employer' || role === 'job_seeker'"
              >
                <router-link class="nav-link menu-link" to="/messages">
                  <i class="ri-message-2-line"></i>
                  <span data-key="t-messages">Messages</span>
                </router-link>
              </li>

              <!-- Reports -->
              <li
                class="nav-item"
                v-if="
                  [
                    'peso_school',
                    'admin',
                    'secretariat',
                    'manpower_agency',
                  ].includes(role)
                "
              >
                <router-link class="nav-link menu-link" to="/reports">
                  <i class="ri-bar-chart-line"></i>
                  <span data-key="t-reports">Reports</span>
                </router-link>
              </li>

              <!-- Activity Logs -->
              <li class="nav-item">
                <router-link
                  to="/user-logs"
                  class="nav-link menu-link d-flex align-items-center"
                >
                  <i class="ri-time-line me-2"></i>
                  <span data-key="t-activity-logs">Activity Logs</span>
                </router-link>
              </li>
            </ul>
          </BContainer>
        </div>

        <div class="vertical-overlay"></div>
      </div>

      <div class="main-content">
        <div class="page-content">
          <BContainer fluid>
            <slot />
          </BContainer>
        </div>
        <Footer />
      </div>
      <RightBar />
    </div>
  </div>
</template>

<script setup>
import { onMounted, watch, computed } from "vue";
import { useRoute } from "vue-router";

import NavBar from "./nav-bar";
import RightBar from "./right-bar.vue";
import Footer from "./footer";

const route = useRoute();

const initActiveMenu = (ele) => {
  setTimeout(() => {
    const navbar = document.querySelector("#navbar-nav");
    if (!navbar) return;

    const a = navbar.querySelector(`[href="${ele}"]`);
    if (!a) return;

    a.classList.add("active");
    const parentCollapseDiv = a.closest(".collapse.menu-dropdown");
    if (parentCollapseDiv) {
      parentCollapseDiv.classList.add("show");
      const parent = parentCollapseDiv.parentElement.children[0];
      parent.classList.add("active");
      parent.setAttribute("aria-expanded", "true");

      const upperParent = parentCollapseDiv.parentElement.closest(
        ".collapse.menu-dropdown"
      );
      if (upperParent) {
        upperParent.classList.add("show");
        const upperTrigger = upperParent.previousElementSibling;
        if (upperTrigger) upperTrigger.classList.add("active");
      }
    }
  }, 1000);
};

const onRouteChange = (to) => {
  initActiveMenu(to.path);
};

import { useStore } from "vuex";
const store = useStore();
const role = computed(() => store.state.auth.user?.user_type ?? "");

// Watch route changes
watch(
  () => route,
  (val) => onRouteChange(val),
  { immediate: true, deep: true }
);

onMounted(() => {
  const collapses = document.querySelectorAll(".navbar-nav .collapse");
  if (!collapses.length) return;

  collapses.forEach((collapse) => {
    // Handle sibling collapses
    collapse.addEventListener("show.bs.collapse", (e) => {
      e.stopPropagation();
      const closestCollapse = collapse.parentElement.closest(".collapse");

      if (closestCollapse) {
        const siblingCollapses = closestCollapse.querySelectorAll(".collapse");
        siblingCollapses.forEach((siblingCollapse) => {
          if (siblingCollapse.classList.contains("show")) {
            siblingCollapse.classList.remove("show");
            siblingCollapse.parentElement.firstChild.setAttribute(
              "aria-expanded",
              "false"
            );
          }
        });
      } else {
        const getSiblings = (elem) => {
          const siblings = [];
          let sibling = elem.parentNode.firstChild;
          while (sibling) {
            if (sibling.nodeType === 1 && sibling !== elem) {
              siblings.push(sibling);
            }
            sibling = sibling.nextSibling;
          }
          return siblings;
        };

        const siblings = getSiblings(collapse.parentElement);
        siblings.forEach((item) => {
          if (item.childNodes.length > 2) {
            item.firstElementChild.setAttribute("aria-expanded", "false");
            item.firstElementChild.classList.remove("active");
          }
          const ids = item.querySelectorAll("*[id]");
          ids.forEach((item1) => {
            item1.classList.remove("show");
            item1.parentElement.firstChild.setAttribute(
              "aria-expanded",
              "false"
            );
            item1.parentElement.firstChild.classList.remove("active");
            if (item1.childNodes.length > 2) {
              const val = item1.querySelectorAll("ul li a");
              val.forEach((subitem) => {
                if (subitem.hasAttribute("aria-expanded"))
                  subitem.setAttribute("aria-expanded", "false");
              });
            }
          });
        });
      }
    });

    // Hide nested collapses
    collapse.addEventListener("hide.bs.collapse", (e) => {
      e.stopPropagation();
      const childCollapses = collapse.querySelectorAll(".collapse");
      childCollapses.forEach((childCollapse) => {
        childCollapse.classList.remove("show");
        childCollapse.parentElement.firstChild.setAttribute(
          "aria-expanded",
          "false"
        );
      });
    });
  });
});
</script>
