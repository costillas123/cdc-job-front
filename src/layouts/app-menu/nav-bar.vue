<template>
  <header id="page-topbar">
    <div class="layout-width">
      <div class="navbar-header">
        <div class="d-flex">
          <!-- LOGO -->
          <div class="navbar-brand-box horizontal-logo">
            <router-link to="/" class="logo logo-dark">
              <span class="logo-sm">
                <img src="@/assets/images/clark-dark.png" alt="" height="55" />
              </span>
              <span class="logo-lg">
                <img src="@/assets/images/clark-dark.png" alt="" height="55" />
              </span>
            </router-link>

            <router-link to="/" class="logo logo-light">
              <span class="logo-sm">
                <img src="@/assets/images/clark-light.png" alt="" height="55" />
              </span>
              <span class="logo-lg">
                <img src="@/assets/images/clark-light.png" alt="" height="55" />
              </span>
            </router-link>
          </div>

          <BButton
            variant="white"
            class="btn btn-sm px-3 fs-16 header-item vertical-menu-btn topnav-hamburger"
            id="topnav-hamburger-icon"
            @click="toggleHamburgerMenu"
          >
            <span class="hamburger-icon">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </BButton>
        </div>

        <div class="d-flex align-items-center">
          <div class="ms-1 header-item d-none d-sm-flex">
            <BButton
              type="button"
              variant="ghost-secondary"
              class="btn-icon btn-topbar rounded-circle"
              data-toggle="fullscreen"
              @click="toggleFullScreen()"
            >
              <i class="bx bx-fullscreen fs-22"></i>
            </BButton>
          </div>

          <div class="ms-1 header-item d-none d-sm-flex">
            <BButton
              type="button"
              variant="ghost-secondary"
              class="btn-icon btn-topbar rounded-circle light-dark-mode"
              @click="toggleDarkMode()"
            >
              <i class="bx bx-moon fs-22"></i>
            </BButton>
          </div>

          <!-- Notifications -->
          <BDropdown
            variant="ghost-dark"
            dropstart
            class="ms-1 dropdown"
            :offset="{ alignmentAxis: 57, crossAxis: 0, mainAxis: -42 }"
            toggle-class="btn-icon btn-topbar rounded-circle arrow-none"
            id="page-header-notifications-dropdown"
            menu-class="dropdown-menu-lg dropdown-menu-end p-0"
            auto-close="outside"
            @show="handleBellClick"
          >
            <template #button-content>
              <i class="bx bx-bell fs-22"></i>
              <span
                v-if="unreadCount > 0"
                class="position-absolute topbar-badge fs-10 translate-middle badge rounded-pill bg-danger"
              >
                <span class="notification-badge">{{ unreadCount }}</span>
                <span class="visually-hidden">unread messages</span>
              </span>
            </template>

            <div
              class="dropdown-head bg-primary bg-pattern rounded-top dropdown-menu-lg"
            >
              <div class="p-3">
                <div class="d-flex justify-content-between align-items-center">
                  <h6 class="m-0 fs-16 fw-semibold text-white">
                    Notifications
                  </h6>
                  <span
                    class="bg-light-subtle text-body fs-13 px-2 py-1 rounded"
                  >
                    {{ unreadCount }} New
                  </span>
                </div>
              </div>
            </div>

            <div class="p-2" style="max-height: 300px; overflow-y: auto">
              <template v-if="notifications.length">
                <div
                  v-for="notif in notifications"
                  :key="notif.id"
                  class="notification-item d-flex align-items-start p-2 border-bottom"
                >
                  <div class="avatar-xs me-3 flex-shrink-0">
                    <span
                      class="avatar-title bg-info-subtle text-info rounded-circle fs-16"
                    >
                      <i class="bx bx-bell"></i>
                    </span>
                  </div>
                  <div class="flex-grow-1">
                    <h6 class="mb-1">{{ notif.title }}</h6>
                    <p class="mb-1 text-muted small">{{ notif.message }}</p>
                    <p class="mb-0 fs-11 fw-medium text-uppercase text-muted">
                      <i class="mdi mdi-clock-outline"></i>
                      {{ new Date(notif.created_at).toLocaleString() }}
                    </p>
                  </div>
                </div>

                <div class="text-center mt-2">
                  <button
                    class="btn btn-md btn-soft-success"
                    type="button"
                    @click="viewNotifications()"
                  >
                    View All Notifications
                    <i class="ri-arrow-right-line align-middle"></i>
                  </button>
                </div>
              </template>

              <template v-else>
                <div class="text-center py-4">
                  <img
                    src="@/assets/images/svg/bell.svg"
                    class="img-fluid w-25 mb-2"
                  />
                  <h6 class="fs-16 fw-semibold lh-base text-muted">
                    You have no notifications
                  </h6>
                </div>
              </template>
            </div>
          </BDropdown>

          <BDropdown
            variant="link"
            class="ms-sm-3 header-item topbar-user"
            toggle-class="rounded-circle arrow-none"
            menu-class="dropdown-menu-end"
            :offset="{ alignmentAxis: -14, crossAxis: 0, mainAxis: 0 }"
          >
            <template #button-content>
              <span class="d-flex align-items-center">
                <img
                  class="rounded-circle header-profile-user"
                  :src="
                    currentUser.avatar
                      ? `${storageBaseUrl()}/${currentUser.avatar}`
                      : userDummy
                  "
                  alt="Header Avatar"
                />
                <span class="text-start ms-xl-2">
                  <span
                    class="d-none d-xl-inline-block ms-1 fw-medium user-name-text"
                    >{{ currentUser?.name }}</span
                  >
                  <span class="d-none d-xl-block ms-1 fs-12 user-name-sub-text">
                    {{
                      userTypeMap[currentUser?.user_type]?.label ||
                      userTypeMap.default.label
                    }}
                  </span>
                </span>
              </span>
            </template>
            <h6 class="dropdown-header">Welcome {{ currentUser?.name }}!</h6>
            <router-link class="dropdown-item" to="/profile-info"
              ><i
                class="mdi mdi-account-circle text-muted fs-16 align-middle me-1"
              ></i>
              <span class="align-middle"> Profile</span>
            </router-link>
            <router-link
              class="dropdown-item"
              to="/messages"
              v-if="role === 'employer' || role === 'job_seeker'"
            >
              <i
                class="mdi mdi-message-text-outline text-muted fs-16 align-middle me-1"
              ></i>
              <span class="align-middle"> Messages</span>
            </router-link>
            <RouterLink class="dropdown-item" to="/user-logs">
              <i class="ri-history-line text-muted fs-16 align-middle me-1"></i>
              <span class="align-middle">Activity Logs</span>
            </RouterLink>

            <div class="dropdown-divider"></div>
            <router-link class="dropdown-item" to="/profile-setting">
              <i
                class="mdi mdi-cog-outline text-muted fs-16 align-middle me-1"
              ></i>
              <span class="align-middle"> Settings</span>
            </router-link>
            <BButton class="dropdown-item" @click="logout"
              ><i class="mdi mdi-logout text-muted fs-16 align-middle me-1"></i>
              <span class="align-middle" data-key="t-logout"> Logout</span>
            </BButton>
          </BDropdown>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

import userDummy from "@/assets/images/users/user-dummy-img.jpg";
import { storageBaseUrl } from "@/helpers/useFormats";

import { userTypeMap } from "@/helpers/useFormats";
// import simplebar from "simplebar-vue";
import Loading from "@/helpers/Loading";
import {
  logout as authLogout,
  fetchUnreadNotif,
  markAllAsRead,
} from "@/api-request";

// ✅ Vue Router & Vuex
const router = useRouter();
const store = useStore();

// ✅ Vuex state
const currentUser = computed(() => store.state.auth.user);
const mode = computed(() => store.state.layout.mode);
const role = computed(() => store.state.auth.user?.user_type ?? "");

// ✅ Logout
async function logout() {
  Loading.show("Logging out...");
  try {
    await authLogout();
    store.commit("auth/clearUser");
    router.push("/login");
  } catch (error) {
    console.error("Logout failed:", error);
  } finally {
    Loading.close();
  }
}

// ✅ Toggle Fullscreen
function toggleFullScreen() {
  const doc = document;
  const docEl = doc.documentElement;

  if (
    !doc.fullscreenElement &&
    !doc.mozFullScreenElement &&
    !doc.webkitFullscreenElement &&
    !doc.msFullscreenElement
  ) {
    if (docEl.requestFullscreen) {
      docEl.requestFullscreen();
    } else if (docEl.mozRequestFullScreen) {
      docEl.mozRequestFullScreen();
    } else if (docEl.webkitRequestFullscreen) {
      docEl.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    } else if (docEl.msRequestFullscreen) {
      docEl.msRequestFullscreen();
    }
  } else {
    if (doc.exitFullscreen) {
      doc.exitFullscreen();
    } else if (doc.mozCancelFullScreen) {
      doc.mozCancelFullScreen();
    } else if (doc.webkitExitFullscreen) {
      doc.webkitExitFullscreen();
    } else if (doc.msExitFullscreen) {
      doc.msExitFullscreen();
    }
  }
}

// ✅ Toggle Dark Mode
function toggleDarkMode() {
  const newMode = mode.value === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-bs-theme", newMode);
  store.dispatch("layout/changeMode", { mode: newMode });
}

// ✅ Toggle Hamburger Menu (📱 mobile + 🖥 desktop)
function toggleHamburgerMenu() {
  const windowSize = document.documentElement.clientWidth;
  const layoutType = document.documentElement.getAttribute("data-layout");

  document.documentElement.setAttribute("data-sidebar-visibility", "show");
  const visibilityType = document.documentElement.getAttribute(
    "data-sidebar-visibility"
  );

  // Animate hamburger icon (for desktop)
  if (windowSize > 767) {
    const hamburger = document.querySelector(".hamburger-icon");
    if (hamburger) hamburger.classList.toggle("open");
  }

  // Collapse horizontal menu
  if (layoutType === "horizontal") {
    document.body.classList.toggle("menu");
  }

  // Collapse vertical menu
  if (
    visibilityType === "show" &&
    (layoutType === "vertical" || layoutType === "semibox")
  ) {
    if (windowSize < 1025 && windowSize > 767) {
      document.body.classList.remove("vertical-sidebar-enable");
      const sidebarSize =
        document.documentElement.getAttribute("data-sidebar-size");
      document.documentElement.setAttribute(
        "data-sidebar-size",
        sidebarSize === "sm" ? "" : "sm"
      );
    } else if (windowSize > 1025) {
      document.body.classList.remove("vertical-sidebar-enable");
      const sidebarSize =
        document.documentElement.getAttribute("data-sidebar-size");
      document.documentElement.setAttribute(
        "data-sidebar-size",
        sidebarSize === "lg" ? "sm" : "lg"
      );
    } else if (windowSize <= 767) {
      document.body.classList.add("vertical-sidebar-enable");
      document.documentElement.setAttribute("data-sidebar-size", "lg");
    }
  }

  // Two-column menu layout
  if (layoutType === "twocolumn") {
    document.body.classList.toggle("twocolumn-panel");
  }
}

const viewNotifications = () => {
  router.push("/view-notifications");
};

const notifications = ref([]);
const unreadCount = ref(0);

const fetchNotifications = async () => {
  try {
    const { data } = await fetchUnreadNotif();

    notifications.value = data.data;
    unreadCount.value = data.unread_count;
  } catch (error) {
    console.error("Failed to fetch notifications", error);
  }
};

const handleBellClick = async () => {
  try {
    await markAllAsRead();

    setTimeout(() => {
      unreadCount.value = 0;
    }, 10000);
  } catch (error) {
    console.error("Failed to fetch notifications", error);
  }
};

// ✅ Lifecycle
onMounted(() => {
  fetchNotifications();

  document.addEventListener("scroll", () => {
    const pageTopbar = document.getElementById("page-topbar");
    if (pageTopbar) {
      if (
        document.body.scrollTop >= 50 ||
        document.documentElement.scrollTop >= 50
      ) {
        pageTopbar.classList.add("topbar-shadow");
      } else {
        pageTopbar.classList.remove("topbar-shadow");
      }
    }
  });
});
</script>
