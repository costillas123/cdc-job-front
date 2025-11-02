<template>
  <Layout>
    <!-- Header -->
    <BCardHeader class="border-0">
      <BRow class="align-items-center gy-3">
        <BCol cols="sm">
          <h5 class="card-title mb-3">Announcements</h5>
        </BCol>
      </BRow>
    </BCardHeader>

    <!-- Body -->
    <BCardBody class="pt-0">
      <!-- Loading -->
      <div v-if="isLoading" class="text-center py-5">
        <lottie
          class="avatar-xl"
          :options="defaultOptions"
          :height="75"
          :width="75"
        />
        <h5 class="mt-2">Loading...</h5>
      </div>

      <!-- Announcements Loop -->
      <template v-else>
        <div v-for="item in tableData" :key="item.id" class="card mb-3">
          <div class="card-body">
            <div class="row g-4">
              <!-- Image -->
              <div class="col-xxl-3 col-lg-5">
                <img
                  src="@/assets/images/blog/img-1.jpg"
                  alt=""
                  class="img-fluid rounded w-100 object-fit-cover"
                />
              </div>

              <!-- Content -->
              <div class="col-xxl-9 col-lg-7">
                <h5 class="fs-15 fw-semibold">{{ item.title }}</h5>

                <div class="d-flex align-items-center gap-2 mb-3 flex-wrap">
                  <span class="text-muted">
                    <i class="ri-calendar-event-line me-1"></i>
                    {{ formatShortDate(item.created_at) }}
                  </span>
                  |
                  <span class="text-muted">
                    <i class="ri-user-3-line me-1"></i> Admin
                  </span>
                </div>

                <p v-html="item.content"></p>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty state -->
        <div v-if="!tableData.length" class="text-center text-muted py-5">
          <h5>No Announcements Found</h5>
          <p class="mb-0">There are currently no announcements.</p>
        </div>
      </template>

      <!-- Pagination -->
      <PaginationComponent
        class="my-3"
        :currentPage="page"
        :perPage="perPage"
        :total="totalItems"
        @pageChange="fetchDataTable"
        @perPageChange="updatePerPage"
      />
    </BCardBody>
  </Layout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import "@vueform/multiselect/themes/default.css";
import Layout from "@/layouts/main.vue";
import Lottie from "@/components/widgets/lottie.vue";
import animationData from "@/components/widgets/msoeawqm.json";

import PaginationComponent from "@/components/pagination.vue";
import { formatShortDate } from "@/helpers/useFormats";
import Toast from "@/helpers/Toast";
import { getSystemAnnounces } from "@/api-request";

const isLoading = ref(false);
const perPage = ref(10);
const page = ref(1);
const totalItems = ref(0);

const tableData = ref([]);
const searchQuery = ref("");
const searchStatus = ref("all");
const defaultOptions = { animationData };

const updatePerPage = (size) => {
  perPage.value = size;
  fetchDataTable(1);
};

const fetchDataTable = async (pageNumber = 1) => {
  page.value = pageNumber;
  isLoading.value = true;

  try {
    const response = await getSystemAnnounces({
      search: searchQuery.value,
      status: searchStatus.value,
      per_page: perPage.value,
      page: pageNumber,
    });

    const data = response.data;
    tableData.value = data.items || [];
    totalItems.value = data.total || 0;
  } catch (error) {
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
