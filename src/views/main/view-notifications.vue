<template>
  <Layout>
    <BRow>
      <BCol lg="12">
        <BCard no-body id="logList">
          <!-- Header -->
          <BCardHeader class="border-0 mb-3">
            <BRow class="align-items-center gy-3">
              <BCol cols="sm">
                <h5 class="card-title mb-0">Notifications</h5>
              </BCol>

              <BCol sm="auto" class="d-flex gap-2 align-items-center">
                <!-- Search -->
                <div class="search-box">
                  <input
                    type="text"
                    class="form-control search"
                    v-model="searchQuery"
                    placeholder="Search..."
                    @keyup.enter="fetchDataTable(1)"
                  />
                  <i class="ri-search-line search-icon"></i>
                </div>

                <!-- Filter Button -->
                <BButton
                  type="button"
                  variant="primary"
                  class="w-auto"
                  @click="fetchDataTable(1)"
                >
                  <i class="ri-equalizer-fill me-1 align-bottom"></i>
                  Filters
                </BButton>

                <!-- Clear Button -->
                <BButton
                  type="button"
                  variant="danger"
                  class="w-auto"
                  @click="clearFilters"
                >
                  <i class="ri-close-circle-line align-bottom"></i>
                </BButton>
              </BCol>
            </BRow>
          </BCardHeader>

          <!-- Table -->
          <BCardBody class="pt-0">
            <div class="table-responsive table-card mb-1">
              <table class="table table-nowrap align-middle">
                <thead class="text-muted table-light">
                  <tr class="text-uppercase">
                    <th>No.</th>
                    <th>Title</th>
                    <th>Status</th>
                    <th>Created</th>
                    <th class="text-center">Action</th>
                  </tr>
                </thead>

                <tbody>
                  <!-- Loading -->
                  <tr v-if="isLoading">
                    <td colspan="5" class="text-center">
                      <lottie
                        class="avatar-xl"
                        :options="defaultOptions"
                        :height="75"
                        :width="75"
                      />
                      <h5 class="mt-2">Loading...</h5>
                    </td>
                  </tr>

                  <!-- Table Content -->
                  <template v-else>
                    <tr v-for="(data, index) in tableData" :key="data.id">
                      <td>{{ (page - 1) * perPage + index + 1 }}</td>
                      <td>{{ data.title }}</td>
                      <td>
                        <span
                          :class="
                            data.is_read
                              ? 'badge bg-success-subtle text-success fs-12'
                              : 'badge bg-danger-subtle text-danger fs-12'
                          "
                        >
                          {{ data.is_read ? "Read" : "Unread" }}
                        </span>
                      </td>
                      <td>{{ formatDateTime(data.created_at) }}</td>
                      <td class="text-center">
                        <BButton
                          size="sm"
                          variant="soft-primary"
                          @click="openModal(data)"
                        >
                          <i class="ri-eye-line"></i> View
                        </BButton>
                      </td>
                    </tr>

                    <tr v-if="!tableData.length">
                      <td colspan="5" class="text-center text-muted">
                        <h5 class="mt-2">No Result Found</h5>
                        <p class="mb-0">
                          We didn’t find any records for your search.
                        </p>
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>

            <!-- Pagination -->
            <PaginationComponent
              :currentPage="page"
              :perPage="perPage"
              :total="totalItems"
              @pageChange="fetchDataTable"
              @perPageChange="updatePerPage"
            />
          </BCardBody>
        </BCard>
      </BCol>
    </BRow>

    <!-- ================= VIEW MODAL ================= -->
    <BModal
      v-model="showModal"
      size="lg"
      centered
      :title="selectedNotif ? selectedNotif.title : 'Notification Details'"
      class="v-modal-custom"
      hide-header-close
      no-close-on-backdrop
    >
      <div v-if="selectedNotif" class="notification-content pb-2">
        <!-- Header with Icon and Status -->
        <div class="notification-header mb-4">
          <div class="d-flex align-items-center gap-3">
            <div
              class="notification-icon"
              :class="getNotificationTypeClass(selectedNotif.type)"
            >
              <i :class="getNotificationIcon(selectedNotif.type)"></i>
            </div>

            <div class="flex-grow-1">
              <h5 class="notification-title mb-1">{{ selectedNotif.title }}</h5>

              <div class="d-flex align-items-center gap-2 flex-wrap">
                <span
                  class="badge"
                  :class="getTypeBadgeClass(selectedNotif.type)"
                >
                  {{ formatNotificationType(selectedNotif.type) }}
                </span>

                <span class="badge bg-success" v-if="selectedNotif.is_read">
                  <i class="ri-check-double-line me-1"></i> Read
                </span>

                <span class="badge bg-warning text-dark" v-else>
                  <i class="ri-check-line me-1"></i> Unread
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Main Content Grid -->
        <BRow class="g-4">
          <!-- Message Content -->
          <BCol lg="8">
            <BCard class="h-100 border-0 shadow-sm">
              <BCardBody>
                <h6 class="card-title text-primary mb-3">
                  <i class="ri-message-2-line me-2"></i>Message Details
                </h6>

                <p class="notification-message text-muted">
                  {{ selectedNotif.message }}
                </p>

                <hr />

                <h6 class="card-title text-primary mb-3 mt-4">
                  <i class="ri-database-2-line me-2"></i>Notification Data
                </h6>

                <div
                  v-if="
                    selectedNotif.meta && Object.keys(selectedNotif.meta).length
                  "
                >
                  <div
                    v-for="(value, key) in selectedNotif.meta"
                    :key="key"
                    class="d-flex justify-content-between border-bottom py-2"
                  >
                    <strong class="me-2">{{ formatKey(key) }}:</strong>
                    <span class="text-muted text-end">{{ value }}</span>
                  </div>
                </div>

                <p class="text-muted" v-else>
                  <em>No extra metadata provided.</em>
                </p>
              </BCardBody>
            </BCard>
          </BCol>

          <!-- Meta Information -->
          <BCol lg="4">
            <BCard class="h-100 border-0 shadow-sm">
              <BCardBody>
                <h6 class="card-title text-primary mb-3">
                  <i class="ri-information-line me-2"></i>Information
                </h6>

                <div class="meta-list">
                  <div class="meta-item d-flex align-items-center mb-3">
                    <i class="ri-time-line text-muted me-2"></i>
                    <div>
                      <small class="text-muted d-block">Received</small>
                      <strong>{{
                        formatDateTime(selectedNotif.created_at)
                      }}</strong>
                    </div>
                  </div>

                  <div class="meta-item d-flex align-items-center mb-3">
                    <i class="ri-user-line text-muted me-2"></i>
                    <div>
                      <small class="text-muted d-block">Sender</small>
                      <strong>{{ getUserName(selectedNotif.user) }}</strong>
                    </div>
                  </div>

                  <div class="meta-item d-flex align-items-center">
                    <i class="ri-refresh-line text-muted me-2"></i>
                    <div>
                      <small class="text-muted d-block">Last Updated</small>
                      <strong>{{
                        formatDateTime(selectedNotif.updated_at)
                      }}</strong>
                    </div>
                  </div>
                </div>
              </BCardBody>
            </BCard>
          </BCol>
        </BRow>
      </div>

      <!-- Footer -->
      <template #footer>
        <div class="w-100 d-flex justify-content-end">
          <BButton variant="outline-secondary" @click="showModal = false">
            <i class="ri-close-line me-1"></i>Close
          </BButton>
        </div>
      </template>
    </BModal>
  </Layout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Layout from "@/layouts/main.vue";
import Lottie from "@/components/widgets/lottie.vue";
import animationData from "@/components/widgets/msoeawqm.json";

import PaginationComponent from "@/components/pagination.vue";
import { formatDateTime } from "@/helpers/useFormats";

import Toast from "@/helpers/Toast";
import { fetchAllNotif } from "@/api-request";

const isLoading = ref(false);
const perPage = ref(10);
const page = ref(1);
const totalItems = ref(0);

const searchQuery = ref("");
const tableData = ref([]);
const defaultOptions = { animationData };

const clearFilters = () => {
  searchQuery.value = "";
  fetchDataTable(1);
};

const updatePerPage = (size) => {
  perPage.value = size;
  fetchDataTable(1);
};

const showModal = ref(false);
const selectedNotif = ref(null);

const openModal = (notif) => {
  selectedNotif.value = {
    ...notif,
    meta: notif.data ? JSON.parse(notif.data) : {},
  };
  showModal.value = true;
};

const getNotificationTypeClass = (type) => {
  const typeMap = {
    contact_message: "contact-type",
    system_alert: "system-type",
    user_action: "user-type",
    default: "default-type",
  };
  return typeMap[type] || typeMap.default;
};

const getNotificationIcon = (type) => {
  const iconMap = {
    contact_message: "ri-contacts-line",
    system_alert: "ri-alarm-warning-line",
    user_action: "ri-user-follow-line",
    default: "ri-notification-line",
  };
  return iconMap[type] || iconMap.default;
};

const getTypeBadgeClass = (type) => {
  const badgeMap = {
    contact_message: "bg-primary",
    system_alert: "bg-warning text-dark",
    user_action: "bg-info",
    default: "bg-secondary",
  };
  return badgeMap[type] || badgeMap.default;
};

const formatKey = (key) => {
  return key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
};

const getUserName = (user) => {
  return user?.name || "System Generated";
};

const formatNotificationType = (type) => {
  return type
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// request ==========================
const fetchDataTable = async (pageNumber = 1) => {
  page.value = pageNumber;
  isLoading.value = true;
  try {
    const response = await fetchAllNotif({
      search: searchQuery.value,
      per_page: perPage.value,
      page: pageNumber,
      type: "user",
    });

    const res = response.data;

    tableData.value = res.items || [];
    totalItems.value = res.total || 0;
  } catch (error) {
    console.error(error);

    Toast.fire({
      icon: "error",
      title:
        error.response?.data?.message || "An error occurred while processing.",
    });
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => fetchDataTable());
</script>
