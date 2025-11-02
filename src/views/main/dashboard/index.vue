<template>
  <Layout>
    <PageHeader title="Job Dashboard" pageTitle="Dashboards" />

    <template
      v-if="
        ['admin', 'secretariat', 'employer', 'manpower_agency'].includes(
          userType
        )
      "
    >
      <JobWidgets />

      <Analytics2 />
    </template>

    <BRow>
      <BCol xl="8">
        <BCard no-body class="card-height-100">
          <BCardHeader class="border-bottom-dashed d-flex align-items-center">
            <BCardTitle class="mb-0 flex-grow-1">
              System Announcements
            </BCardTitle>
            <div class="flex-shrink-0">
              <BButton
                variant="soft-primary"
                size="sm"
                @click="viewAnnouncements"
              >
                View All Announcements
              </BButton>
            </div>
          </BCardHeader>

          <BCardBody class="p-0">
            <simplebar data-simplebar style="max-height: 364px" class="p-3">
              <!-- Announcements Available -->
              <template v-if="announcements && announcements.length > 0">
                <div class="profile-timeline">
                  <div
                    class="accordion accordion-flush"
                    id="announcementAccordion"
                  >
                    <div
                      class="accordion-item border-0"
                      v-for="item in announcements"
                      :key="item.id"
                    >
                      <!-- Header -->
                      <div class="accordion-header" :id="`heading-${item.id}`">
                        <BLink
                          class="accordion-button p-2 shadow-none"
                          :v-b-toggle="`collapse-${item.id}`"
                        >
                          <div class="d-flex">
                            <div class="flex-shrink-0">
                              <div
                                class="avatar-xs rounded-circle d-flex align-items-center justify-content-center bg-primary-subtle text-primary"
                              >
                                <i class="ri-notification-3-line"></i>
                              </div>
                            </div>
                            <div class="flex-grow-1 ms-3">
                              <h6 class="fs-14 mb-1 text-truncate">
                                {{ item.title }}
                              </h6>
                              <small class="text-muted">
                                {{ dateAgo(item.created_at) }}
                              </small>
                            </div>
                          </div>
                        </BLink>
                      </div>

                      <!-- Body -->
                      <BCollapse id="collapseOne" visible>
                        <div
                          class="accordion-body ms-2 ps-5"
                          v-html="item.content"
                        ></div>
                      </BCollapse>
                    </div>
                  </div>
                </div>
              </template>

              <!-- Empty State -->
              <div v-else class="text-center text-muted py-5">
                <i class="bx bx-bell fs-1 mb-2 d-block opacity-50"></i>
                <p class="mb-0 fs-14">
                  No announcements available at the moment.
                </p>
              </div>
            </simplebar>
          </BCardBody>
        </BCard>
      </BCol>

      <BCol xl="4">
        <BCard no-body class="card-height-100">
          <BCardHeader class="border-bottom-dashed d-flex align-items-center">
            <BCardTitle class="mb-0 flex-grow-1">Recent Activity</BCardTitle>
            <div class="flex-shrink-0">
              <BButton
                variant="soft-primary"
                size="sm"
                @click="viewAllActivity"
              >
                View All Activity
              </BButton>
            </div>
          </BCardHeader>

          <BCardBody class="p-0">
            <simplebar data-simplebar style="max-height: 364px" class="p-3">
              <div v-if="logs.length" class="activity-timeline activity-main">
                <div
                  class="activity-item d-flex mb-3"
                  v-for="log in logs"
                  :key="log.id"
                >
                  <div class="flex-shrink-0 avatar-xs activity-avatar">
                    <div
                      class="avatar-title bg-success-subtle text-success rounded-circle"
                    >
                      <i class="ri-time-line"></i>
                    </div>
                  </div>
                  <div class="flex-grow-1 ms-3">
                    <h6 class="mb-1">{{ log.user?.name || "System" }}</h6>
                    <p class="text-muted mb-1">{{ log.action }}</p>
                    <small class="text-muted">{{
                      formatDateTime(log.created_at)
                    }}</small>
                  </div>
                </div>
              </div>

              <!-- Show if no logs -->
              <div v-else class="text-center text-muted py-4">
                <i class="ri-file-list-3-line fs-24 d-block mb-2"></i>
                <span>No recent activity found</span>
              </div>
            </simplebar>
          </BCardBody>
        </BCard>
      </BCol>
    </BRow>
  </Layout>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import PageHeader from "@/components/page-header";
import Layout from "@/layouts/main.vue";
import { formatDateTime, dateAgo } from "@/helpers/useFormats";

import JobWidgets from "@/components/job-widgets.vue";
import Analytics2 from "@/components/analytics2.vue";

// import { userTypeMap } from "@/helpers/useFormats";
import simplebar from "simplebar-vue";
import { getUserLogs, getSystemAnnounces } from "@/api-request";
import Toast from "@/helpers/Toast";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const router = useRouter();
const store = useStore();

const userType = computed(() => currentUser.value?.user_type ?? "");
const currentUser = computed(() => store.state.auth.user);

const logs = ref([]);
const announcements = ref([]);

const viewAllActivity = () => {
  router.push("/user-logs");
};

const viewAnnouncements = () => {
  router.push("/announcements");
};

const fetchAllData = async () => {
  try {
    const [userLogRes, anouncefRes] = await Promise.all([
      getUserLogs({
        type: "user",
      }),
      getSystemAnnounces({
        per_page: 5,
        page: 1,
      }),
    ]);

    logs.value = userLogRes?.data?.items || [];
    announcements.value = anouncefRes.data.items || [];
  } catch (error) {
    console.error("Error fetching data:", error);
    Toast.fire({
      icon: "error",
      title: "Failed to load form options. Please refresh the page.",
    });
  }
};

onMounted(() => {
  fetchAllData();
});
</script>
