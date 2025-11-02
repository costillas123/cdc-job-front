<template>
  <Layout>
    <BRow>
      <BCol lg="12">
        <BCard no-body id="logList">
          <!-- Header -->
          <BCardHeader class="border-0 mb-3">
            <BRow class="align-items-center gy-3">
              <BCol cols="sm">
                <h5 class="card-title mb-0">Settings | System Logs</h5>
              </BCol>

              <BCol sm="auto" class="d-flex gap-2 align-items-center">
                <!-- Search -->
                <div class="search-box">
                  <input
                    type="text"
                    class="form-control search"
                    v-model="searchQuery"
                    placeholder="Search by user or action..."
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
                    <th>Account Name</th>
                    <th>Action</th>
                    <th>Created At</th>
                  </tr>
                </thead>

                <tbody>
                  <!-- Loading -->
                  <tr v-if="isLoading">
                    <td colspan="4" class="text-center">
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
                      <td>{{ data.user.name }}</td>
                      <td>{{ data.action }}</td>
                      <td>{{ formatDateTime(data.created_at) }}</td>
                    </tr>

                    <tr v-if="!tableData.length">
                      <td colspan="4" class="text-center text-muted">
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
import { getUserLogs } from "@/api-request";

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

// request ==========================
const fetchDataTable = async (pageNumber = 1) => {
  page.value = pageNumber;
  isLoading.value = true;
  try {
    const response = await getUserLogs({
      search: searchQuery.value,
      per_page: perPage.value,
      page: pageNumber,
      type: "admin",
    });

    const data = response.data;

    tableData.value = data.items || [];
    totalItems.value = data.total || 0;
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
