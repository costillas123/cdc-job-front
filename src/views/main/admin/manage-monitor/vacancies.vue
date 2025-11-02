<template>
  <Layout>
    <BRow>
      <BCol lg="12">
        <BCard no-body id="vacancyList">
          <!-- Header -->
          <BCardHeader class="border-0">
            <BRow class="align-items-center gy-3">
              <BCol cols="sm">
                <h5 class="card-title mb-0">Job Vacancies List</h5>
              </BCol>
            </BRow>
          </BCardHeader>

          <!-- Filters -->
          <BCardBody
            class="border border-dashed border-end-0 border-start-0 mb-2"
          >
            <BForm>
              <BRow class="g-3">
                <BCol xxl="3" sm="6">
                  <div class="search-box">
                    <input
                      type="text"
                      class="form-control search"
                      v-model="searchQuery"
                      placeholder="Search..."
                    />
                    <i class="ri-search-line search-icon"></i>
                  </div>
                </BCol>

                <BCol xxl="2" sm="4">
                  <Multiselect
                    class="form-control"
                    v-model="searchStatus"
                    :close-on-select="true"
                    :searchable="true"
                    :options="[
                      { value: 'all', label: 'All' },
                      { value: 1, label: 'Active' },
                      { value: 0, label: 'Inactive' },
                    ]"
                  />
                </BCol>

                <BCol xxl="2" sm="4" class="d-flex gap-2">
                  <BButton
                    type="button"
                    variant="primary"
                    class="w-auto"
                    @click="fetchDataTable(1)"
                  >
                    <i class="ri-equalizer-fill me-1 align-bottom"></i> Filters
                  </BButton>

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
            </BForm>
          </BCardBody>

          <!-- Table -->
          <BCardBody class="pt-0">
            <div class="table-responsive table-card mb-1">
              <table class="table table-nowrap align-middle">
                <thead class="text-muted table-light">
                  <tr class="text-uppercase">
                    <th>Title</th>
                    <th>Company</th>
                    <th>Status</th>
                    <th>Deadline</th>
                    <th>Created At</th>
                    <th class="text-center">Action</th>
                  </tr>
                </thead>

                <tbody>
                  <!-- Loading -->
                  <tr v-if="isLoading">
                    <td colspan="7" class="text-center">
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
                    <tr v-for="data in tableData" :key="data.id">
                      <td>{{ data.title }}</td>
                      <td>{{ data?.employer?.user?.name }}</td>
                      <td>
                        <span
                          class="badge"
                          :class="data.is_active ? 'bg-success' : 'bg-danger'"
                        >
                          {{ data.is_active ? "Active" : "Inactive" }}
                        </span>
                      </td>
                      <td>{{ formatShortDate(data.deadline) }}</td>
                      <td>{{ formatShortDate(data.created_at) }}</td>
                      <td class="text-center">
                        <BDropdown
                          boundary="viewport"
                          variant="link"
                          toggle-class="btn btn-soft-secondary btn-sm dropdown arrow-none"
                          menu-class="dropdown-menu-end"
                          :offset="{
                            alignmentAxis: -130,
                            crossAxis: 0,
                            mainAxis: 10,
                          }"
                        >
                          <template #button-content
                            ><i class="ri-more-fill align-middle"></i
                          ></template>
                          <!-- 🔹 View -->
                          <BDropdownItem
                            as="router-link"
                            :to="`/jobs-details/${data.code}`"
                          >
                            <i class="ri-eye-fill me-2 text-muted"></i> View
                          </BDropdownItem>

                          <!-- 🔹 Delete -->
                          <BDropdownItem @click="openDeleteModal(data)">
                            <i class="ri-delete-bin-fill me-2 text-muted"></i>
                            Delete
                          </BDropdownItem>
                        </BDropdown>
                      </td>
                    </tr>

                    <tr v-if="!tableData.length">
                      <td colspan="7" class="text-center text-muted">
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

      <!-- ✅ Delete Confirmation Modal -->
      <BModal
        v-model="isDeleteModalOpen"
        hide-footer
        hide-header-close
        centered
        no-close-on-backdrop
        class="v-modal-custom"
      >
        <div class="modal-body text-center">
          <lottie
            colors="primary:#f7b84b,secondary:#405189"
            trigger="loop"
            :options="deleteAnimationOptions"
            :height="130"
            :width="130"
          />

          <div class="mt-4">
            <h4 class="mb-3 text-danger">Confirm Delete</h4>
            <p class="text-muted mb-4">
              Are you sure you want to delete
              <strong>{{ deleteItem?.title }}</strong
              >?<br />
              This action cannot be undone.
            </p>

            <div class="hstack gap-2 justify-content-center">
              <BButton
                variant="link"
                class="fw-medium text-muted"
                @click="isDeleteModalOpen = false"
              >
                <i class="ri-close-line me-1 align-middle"></i> Cancel
              </BButton>

              <BButton
                type="button"
                variant="danger"
                :disabled="isLoad"
                @click="confirmDelete()"
              >
                <span v-if="isLoad" class="d-flex align-items-center">
                  <span
                    class="spinner-border spinner-border-sm me-2"
                    role="status"
                  >
                    <span class="visually-hidden">Loading...</span>
                  </span>
                  Loading...
                </span>
                <span v-else>Delete</span>
              </BButton>
            </div>
          </div>
        </div>
      </BModal>
    </BRow>
  </Layout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";
import Layout from "@/layouts/main.vue";
import Lottie from "@/components/widgets/lottie.vue";
import animationData from "@/components/widgets/msoeawqm.json";
import animationData2 from "@/components/widgets/tdrtiskw.json";
import PaginationComponent from "@/components/pagination.vue";
import { formatShortDate } from "@/helpers/useFormats";

import Toast from "@/helpers/Toast";
import {
  getJobVacancies,
  deleteJobVacancy,
  // toggleJobStatus,
} from "@/api-request";

const isLoad = ref(false);
const isLoading = ref(false);
const perPage = ref(10);
const page = ref(1);
const totalItems = ref(0);

const searchStatus = ref("all");
const searchQuery = ref("");
const tableData = ref([]);
const defaultOptions = { animationData };
const deleteAnimationOptions = { animationData: animationData2 };

const isDeleteModalOpen = ref(false);
const deleteItem = ref(null);

const clearFilters = () => {
  searchQuery.value = "";
  searchStatus.value = "all";
  fetchDataTable(1);
};

const updatePerPage = (size) => {
  perPage.value = size;
  fetchDataTable(1);
};

const openDeleteModal = (data) => {
  deleteItem.value = data;
  isDeleteModalOpen.value = true;
};

// Fetch table data
const fetchDataTable = async (pageNumber = 1) => {
  page.value = pageNumber;
  isLoading.value = true;
  try {
    const response = await getJobVacancies({
      search: searchQuery.value,
      status: searchStatus.value !== "all" ? searchStatus.value : null,
      per_page: perPage.value,
      page: pageNumber,
      type: "admin",
    });

    const data = response.data;

    tableData.value = data.items || [];
    totalItems.value = data.total || 0;
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

// Delete job
const confirmDelete = async () => {
  isLoad.value = true;
  try {
    await deleteJobVacancy(deleteItem.value.id);
    Toast.fire({
      icon: "success",
      title: "Job deleted successfully",
    });
    isDeleteModalOpen.value = false;
    fetchDataTable(page.value);
  } catch (error) {
    console.error(error);
    Toast.fire({
      icon: "error",
      title: error.response?.data?.message || "Failed to delete job",
    });
  } finally {
    isLoad.value = false;
  }
};

onMounted(() => fetchDataTable());
</script>
