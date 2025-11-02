<template>
  <Layout>
    <BRow>
      <BCol lg="12">
        <BCard no-body id="vacancyList">
          <!-- Header -->
          <BCardHeader class="border-0 pb-0">
            <BRow class="align-items-center mb-3 gy-3">
              <BCol cols="sm">
                <h5 class="card-title mb-0">
                  <i
                    class="ri-briefcase-line align-bottom me-1 text-primary"
                  ></i>
                  Job Applications List
                </h5>
              </BCol>

              <BCol sm="auto">
                <div class="d-flex align-items-center flex-wrap gap-2">
                  <!-- Search Input -->

                  <div class="search-box position-relative">
                    <input
                      type="text"
                      class="form-control search"
                      v-model="searchQuery"
                      placeholder="Search..."
                    />
                    <i class="ri-search-line search-icon"></i>
                  </div>

                  <!-- Buttons -->
                  <BButton
                    variant="primary"
                    class="d-flex align-items-center"
                    @click="fetchDataTable(1)"
                  >
                    <i class="ri-equalizer-fill me-2 align-bottom"></i>Find
                  </BButton>

                  <BButton
                    variant="outline-danger"
                    class="d-flex align-items-center"
                    @click="clearFilters"
                  >
                    <i class="ri-refresh-line me-1 align-bottom"></i>
                  </BButton>
                </div>
              </BCol>
            </BRow>
          </BCardHeader>

          <ul
            class="nav nav-tabs nav-tabs-custom nav-success mb-3"
            role="tablist"
          >
            <!-- All Applications -->
            <li class="nav-item">
              <BLink
                class="nav-link py-3 d-flex align-items-center"
                :class="{ active: searchStatus === 'all' }"
                role="tab"
                @click="changecategory('all')"
              >
                <i class="ri-folder-2-line me-1 align-bottom"></i>
                All Applications
                <BBadge variant="secondary" class="align-middle ms-1">
                  {{ countTypes.all || 0 }}
                </BBadge>
              </BLink>
            </li>

            <!-- Pending -->
            <li class="nav-item">
              <BLink
                class="nav-link py-3 d-flex align-items-center"
                :class="{ active: searchStatus === 'pending' }"
                role="tab"
                @click="changecategory('pending')"
              >
                <i class="ri-time-line me-1 align-bottom text-warning"></i>
                Pending
                <BBadge variant="secondary" class="align-middle ms-1">
                  {{ countTypes.pending || 0 }}
                </BBadge>
              </BLink>
            </li>

            <!-- Withdrawnlisted -->
            <li class="nav-item">
              <BLink
                class="nav-link py-3 d-flex align-items-center"
                :class="{ active: searchStatus === 'withdrawn' }"
                role="tab"
                @click="changecategory('withdrawn')"
              >
                <i
                  class="ri-arrow-go-back-line me-1 align-bottom text-info"
                ></i>
                Withdrawn
                <BBadge variant="secondary" class="align-middle ms-1">
                  {{ countTypes.withdrawn || 0 }}
                </BBadge>
              </BLink>
            </li>

            <!-- Interview -->
            <li class="nav-item">
              <BLink
                class="nav-link py-3 d-flex align-items-center"
                :class="{ active: searchStatus === 'interview' }"
                role="tab"
                @click="changecategory('interview')"
              >
                <i class="ri-discuss-line me-1 align-bottom text-primary"></i>
                Interview
                <BBadge variant="secondary" class="align-middle ms-1">
                  {{ countTypes.interview || 0 }}
                </BBadge>
              </BLink>
            </li>

            <!-- Rejected -->
            <li class="nav-item">
              <BLink
                class="nav-link py-3 d-flex align-items-center"
                :class="{ active: searchStatus === 'rejected' }"
                role="tab"
                @click="changecategory('rejected')"
              >
                <i
                  class="ri-close-circle-line me-1 align-bottom text-danger"
                ></i>
                Rejected
                <BBadge variant="secondary" class="align-middle ms-1">
                  {{ countTypes.rejected || 0 }}
                </BBadge>
              </BLink>
            </li>

            <!-- Hired -->
            <li class="nav-item">
              <BLink
                class="nav-link py-3 d-flex align-items-center"
                :class="{ active: searchStatus === 'hired' }"
                role="tab"
                @click="changecategory('hired')"
              >
                <i
                  class="ri-user-follow-line me-1 align-bottom text-success"
                ></i>
                Hired
                <BBadge variant="secondary" class="align-middle ms-1">
                  {{ countTypes.hired || 0 }}
                </BBadge>
              </BLink>
            </li>
          </ul>

          <!-- Table -->
          <BCardBody class="pt-0">
            <div class="table-responsive table-card mb-1">
              <table class="table table-nowrap align-middle">
                <thead class="text-muted table-light">
                  <tr class="text-uppercase">
                    <th>Applicant</th>
                    <th>Skills</th>
                    <th>Apply for</th>
                    <th>Date Applied</th>
                    <th>Status</th>
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
                      <td class="d-lg-flex align-items-center">
                        <div class="flex-shrink-0">
                          <div class="avatar-sm rounded">
                            <img
                              :src="
                                data.job_seeker.user.avatar
                                  ? `${storageBaseUrl()}/${
                                      data.job_seeker.user.avatar
                                    }`
                                  : require('@/assets/images/users/user-dummy-img.jpg')
                              "
                              alt="User avatar"
                              class="member-img img-fluid d-block rounded"
                            />
                          </div>
                        </div>
                        <div class="ms-3">
                          <h5 class="fs-16 mb-2">
                            {{ data.job_seeker.user.name }}
                          </h5>
                          <p class="text-muted mb-0">
                            {{ data.job_seeker.user.email }}
                          </p>
                        </div>
                      </td>
                      <td>
                        <div class="d-flex flex-wrap gap-1">
                          <span
                            v-for="skill in data.job_seeker.skills"
                            :key="skill"
                            class="badge bg-primary"
                          >
                            {{ skill }}
                          </span>
                        </div>
                      </td>
                      <td>{{ data.job_vacancy.title }}</td>
                      <td>{{ formatShortDate(data.created_at) }}</td>
                      <td>
                        <span
                          class="badge d-inline-flex align-items-center gap-1 px-3 py-2 text-capitalize"
                          :class="getStatusClass(data.status)"
                        >
                          <i :class="getStatusIcon(data.status)"></i>
                          {{ data.status }}
                        </span>
                      </td>

                      <td class="text-center">
                        <BDropdown
                          boundary="viewport"
                          variant="link"
                          toggle-class="btn btn-soft-secondary btn-sm arrow-none"
                          menu-class="dropdown-menu-end text-nowrap"
                        >
                          <template #button-content>
                            <i class="ri-more-fill align-middle"></i>
                          </template>

                          <!-- View Details -->
                          <BDropdownItem @click="viewApplication(data)">
                            <i class="ri-eye-fill me-2 text-primary"></i>
                            View Details
                          </BDropdownItem>

                          <!-- Process -->
                          <BDropdownItem @click="processApplication(data)">
                            <i class="ri-pencil-fill me-2 text-success"></i>
                            Process
                          </BDropdownItem>

                          <!-- View Transactions -->
                          <BDropdownItem
                            v-if="
                              data.status !== 'pending' &&
                              data.job_application_transactions?.length
                            "
                            @click="viewTransactions(data)"
                          >
                            <i class="ri-file-list-3-line me-2 text-info"></i>
                            Transactions
                          </BDropdownItem>

                          <!-- Divider -->
                          <BDropdownDivider></BDropdownDivider>

                          <!-- Delete -->
                          <BDropdownItem @click="openDeleteModal(data)">
                            <i class="ri-delete-bin-fill me-2 text-danger"></i>
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

      <!-- View Application Modal -->
      <BModal
        v-model="showViewModal"
        title="Application Details"
        size="lg"
        hide-footer
        centered
        class="v-modal-custom"
      >
        <div v-if="selectedApplication" class="application-details">
          <!-- Header with Applicant & Status -->
          <div
            class="d-flex justify-content-between align-items-start border-bottom pb-3 mb-4"
          >
            <div class="d-flex align-items-center">
              <img
                :src="
                  selectedApplication.job_seeker.user.avatar
                    ? `${storageBaseUrl()}/${
                        selectedApplication.job_seeker.user.avatar
                      }`
                    : require('@/assets/images/users/user-dummy-img.jpg')
                "
                alt="avatar"
                class="rounded-circle me-3"
                width="70"
                height="70"
              />
              <div>
                <h5 class="mb-1">
                  {{ selectedApplication.job_seeker.user.name }}

                  <router-link
                    :to="`/view-profile/${selectedApplication.job_seeker.user.id}`"
                    class="btn btn-sm btn-outline-primary ms-2"
                  >
                    <i class="ri-eye-line align-middle me-1"></i> View Profile
                  </router-link>
                </h5>
                <p class="mb-1 text-muted">
                  <i class="ri-mail-line me-1"></i>
                  {{ selectedApplication.job_seeker.user.email }}
                </p>
                <p class="mb-0 text-muted">
                  <i class="ri-phone-line me-1"></i>
                  {{ selectedApplication.job_seeker.user.phone }}
                </p>
              </div>
            </div>
            <span
              class="badge d-inline-flex align-items-center gap-1 px-3 py-2 text-capitalize fs-6"
              :class="getStatusClass(selectedApplication.status)"
            >
              <i :class="getStatusIcon(selectedApplication.status)"></i>
              {{ selectedApplication.status }}
            </span>
          </div>

          <!-- Two Column Layout -->
          <div class="row">
            <!-- Left Column - Job & Applicant Details -->
            <div class="col-md-6">
              <!-- Applied Job Card -->
              <div class="card border-0 shadow-sm mb-4">
                <div class="card-body">
                  <h6 class="card-title text-success mb-3">
                    <i class="ri-briefcase-line me-2"></i>
                    Applied Position
                  </h6>
                  <h5 class="mb-2">
                    {{ selectedApplication.job_vacancy.title }}
                  </h5>
                  <div class="d-flex flex-wrap gap-2 mb-2">
                    <span class="badge bg-light border">
                      <span class="text-muted mb-0">
                        <i class="ri-money-dollar-circle-line me-1"></i>
                        {{ selectedApplication.job_vacancy.salary }}
                      </span>
                    </span>
                    <span class="badge bg-light border">
                      <span class="text-muted mb-0">
                        <i class="ri-calendar-line me-1"></i>
                        {{
                          formatShortDate(
                            selectedApplication.job_vacancy.created_at
                          )
                        }}
                      </span>
                    </span>
                  </div>
                  <p class="text-muted small mb-0">
                    Job Code: {{ selectedApplication.job_vacancy.code }}
                  </p>

                  <div class="mt-3">
                    <strong class="d-block mb-2">Sub-Categories:</strong>
                    <div class="d-flex flex-wrap gap-1">
                      <span
                        v-for="(subCategoryName, index) in getSubCategoryNames(
                          selectedApplication.job_vacancy.job_sub_category
                        )"
                        :key="index"
                        class="badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25"
                      >
                        {{ subCategoryName }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Applicant Profile Card -->
              <div class="card border-0 shadow-sm">
                <div class="card-body">
                  <h6 class="card-title text-primary mb-3">
                    <i class="ri-user-settings-line me-2"></i>
                    Applicant Profile
                  </h6>

                  <div class="row small">
                    <div class="col-6 mb-2">
                      <strong>Experience:</strong>
                      <p class="text-muted mb-0">
                        {{ selectedApplication.job_seeker.years_of_experience }}
                        years
                      </p>
                    </div>
                    <div class="col-6 mb-2">
                      <strong>Education:</strong>
                      <p class="text-muted mb-0">
                        {{ selectedApplication.job_seeker.education_level }}
                      </p>
                    </div>
                    <div class="col-6 mb-2">
                      <strong>Location:</strong>
                      <p class="text-muted mb-0">
                        {{ selectedApplication.job_seeker.current_location }}
                      </p>
                    </div>
                    <div class="col-6 mb-2">
                      <strong>Expected Salary:</strong>
                      <p class="text-muted mb-0">
                        ₱{{
                          Number(
                            selectedApplication.job_seeker.expected_salary
                          ).toLocaleString()
                        }}
                      </p>
                    </div>
                  </div>

                  <!-- Skills -->
                  <div class="mt-3">
                    <strong class="d-block mb-2">Skills:</strong>
                    <div class="d-flex flex-wrap gap-1">
                      <span
                        v-for="(skill, index) in selectedApplication.job_seeker
                          .skills"
                        :key="index"
                        class="badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25"
                      >
                        {{ skill }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right Column - Cover Letter & Attachments -->
            <div class="col-md-6">
              <!-- Cover Letter Card -->
              <div class="card border-0 shadow-sm mb-4">
                <div class="card-body">
                  <h6 class="card-title text-info mb-3">
                    <i class="ri-file-text-line me-2"></i>
                    Cover Letter
                  </h6>
                  <div
                    class="cover-letter-content"
                    style="max-height: 200px; overflow-y: auto"
                  >
                    <p class="text-muted mb-0" style="line-height: 1.6">
                      {{
                        selectedApplication.cover_letter ||
                        "No cover letter provided."
                      }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- Attachments Card -->
              <div
                class="card border-0 shadow-sm"
                v-if="selectedApplication.attachments?.length"
              >
                <div class="card-body">
                  <h6 class="card-title text-warning mb-3">
                    <i class="ri-attachment-2 me-2"></i>
                    Attachments ({{ selectedApplication.attachments.length }})
                  </h6>
                  <div class="attachments-list">
                    <div
                      v-for="(file, index) in selectedApplication.attachments"
                      :key="index"
                      class="d-flex align-items-center justify-content-between p-2 border rounded mb-2"
                    >
                      <div class="d-flex align-items-center">
                        <i class="ri-file-pdf-line text-danger me-2 fs-5"></i>
                        <div>
                          <p class="mb-0 fw-medium small">{{ file.name }}</p>
                          <p class="mb-0 text-muted tiny">{{ file.type }}</p>
                        </div>
                      </div>
                      <a
                        :href="`${storageBaseUrl()}/${file.file_path}`"
                        target="_blank"
                        class="btn btn-sm btn-outline-primary"
                        title="View File"
                      >
                        <i class="ri-external-link-line"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Application Timeline -->
              <div class="card border-0 shadow-sm mt-4">
                <div class="card-body">
                  <h6 class="card-title text-secondary mb-3">
                    <i class="ri-time-line me-2"></i>
                    Application Timeline
                  </h6>
                  <div class="timeline">
                    <div class="d-flex align-items-center mb-2">
                      <i class="ri-checkbox-circle-fill text-success me-2"></i>
                      <div>
                        <p class="mb-0 small fw-medium">Applied</p>
                        <p class="mb-0 text-muted tiny">
                          {{ formatShortDate(selectedApplication.created_at) }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BModal>

      <!-- PROCESS APPLICATION MODAL -->
      <BModal
        v-model="showProcessModal"
        title="Process Application"
        size="md"
        centered
        hide-footer
        class="v-modal-custom"
      >
        <div v-if="selectedApplication">
          <div class="mb-3">
            <label class="form-label fw-semibold">Applicant</label>
            <input
              type="text"
              class="form-control"
              :value="selectedApplication.job_seeker.user.name"
              readonly
            />
          </div>

          <div class="mb-3">
            <label class="form-label fw-semibold">Applied Position</label>
            <input
              type="text"
              class="form-control"
              :value="selectedApplication.job_vacancy.title"
              readonly
            />
          </div>

          <div class="mb-3">
            <label class="form-label fw-semibold">Update Status</label>
            <select
              v-model="processForm.status"
              class="form-select"
              :disabled="isLoad"
            >
              <option disabled value="">Select new status</option>
              <option value="pending">Pending</option>
              <option value="withdrawn">Withdrawn</option>
              <option value="interview">Interview</option>
              <option value="rejected">Rejected</option>
              <option value="hired">Hired</option>
            </select>
          </div>

          <div class="mb-3">
            <label class="form-label fw-semibold">Admin Notes</label>
            <textarea
              v-model="processForm.notes"
              rows="3"
              class="form-control"
              placeholder="Add remarks or decisions here..."
              :disabled="isLoad"
            ></textarea>
          </div>

          <div class="d-flex justify-content-end mt-4 gap-2">
            <BButton variant="light" @click="showProcessModal = false"
              >Cancel</BButton
            >

            <BButton
              type="button"
              variant="success"
              :disabled="isLoad"
              @click="submitProcess()"
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
              <span v-else>Save Changes</span>
            </BButton>
          </div>
        </div>
      </BModal>

      <!-- View Transactions Modal -->
      <BModal
        v-model="showTransactionsModal"
        size="lg"
        :title="`Transactions for ${
          selectedApplication?.job_seeker?.user?.name || ''
        }`"
        centered
        class="v-modal-custom"
      >
        <div v-if="transactions.length">
          <table class="table align-middle mb-0">
            <thead class="table-light">
              <tr>
                <th>#</th>
                <th>Status</th>
                <th>Notes</th>
                <th>Processed By</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(tx, index) in transactions" :key="tx.id">
                <td>{{ index + 1 }}</td>
                <td>
                  <span
                    class="badge text-capitalize"
                    :class="getStatusClass(tx.status)"
                  >
                    <i :class="getStatusIcon(tx.status)"></i>
                    {{ tx.status }}
                  </span>
                </td>
                <td>{{ tx.notes }}</td>
                <td>{{ tx.processed_by?.name ?? "Admin" }}</td>
                <td>{{ formatShortDate(tx.created_at) }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-else class="text-center text-muted my-3">
          <i class="ri-inbox-2-line fs-2 mb-2"></i>
          <p>No transaction history found.</p>
        </div>

        <template #footer>
          <BButton variant="secondary" @click="showTransactionsModal = false">
            Close
          </BButton>
        </template>
      </BModal>
    </BRow>
  </Layout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Layout from "@/layouts/main.vue";
import Lottie from "@/components/widgets/lottie.vue";
import animationData from "@/components/widgets/msoeawqm.json";
import animationData2 from "@/components/widgets/tdrtiskw.json";
import PaginationComponent from "@/components/pagination.vue";
import {
  formatShortDate,
  getStatusClass,
  getStatusIcon,
  storageBaseUrl,
} from "@/helpers/useFormats";

import { useJobFilters } from "@/helpers/useJobFilters";
const { getSubCategoryNames } = useJobFilters();

import Toast from "@/helpers/Toast";
import {
  getApplicationJobLists,
  deleteApplicationJobList,
  storeApplicationJobList,
} from "@/api-request";

const selectedApplication = ref(null);

// fetching data ===============================================
const defaultOptions = { animationData };
const deleteAnimationOptions = { animationData: animationData2 };

const isLoading = ref(false);
const perPage = ref(10);
const page = ref(1);
const totalItems = ref(0);
const searchStatus = ref("all");
const searchQuery = ref("");
const tableData = ref([]);
const countTypes = ref({
  pending: 0,
  withdrawnlisted: 0,
  interview: 0,
  rejected: 0,
  hired: 0,
  all: 0,
});

const fetchDataTable = async (pageNumber = 1) => {
  page.value = pageNumber;
  isLoading.value = true;
  try {
    const response = await getApplicationJobLists({
      search: searchQuery.value,
      status: searchStatus.value,
      per_page: perPage.value,
      page: pageNumber,
    });

    const data = response.data;

    tableData.value = data.items || [];
    totalItems.value = data.total || 0;
    countTypes.value = data.count_types || countTypes.value;
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

const changecategory = (value) => {
  searchStatus.value = value;
  fetchDataTable(1);
};

const clearFilters = () => {
  searchQuery.value = "";
  searchStatus.value = "all";
  fetchDataTable(1);
};

const updatePerPage = (size) => {
  perPage.value = size;
  fetchDataTable(1);
};

// viewing data ===============================================
const showViewModal = ref(false);

const viewApplication = (item) => {
  selectedApplication.value = item;
  showViewModal.value = true;
};

// process data ===============================================
const showProcessModal = ref(false);

const processForm = ref({
  job_application_id: "",
  status: "",
  notes: "",
});

const processApplication = (application) => {
  selectedApplication.value = application;

  processForm.value.job_application_id = application.id || "";
  processForm.value.status = application.status || "pending";
  processForm.value.notes = application.admin_notes || "";
  showProcessModal.value = true;
};

const submitProcess = async () => {
  isLoad.value = true;
  try {
    const response = await storeApplicationJobList(processForm.value);

    Toast.fire({
      icon: "success",
      title: response?.message || "Process completed successfully.",
    });

    showProcessModal.value = false;
    fetchDataTable(page.value);
  } catch (error) {
    console.error(error);
    Toast.fire({
      icon: "error",
      title: error.response?.data?.message || "Failed to process",
    });
  } finally {
    isLoad.value = false;
  }
};

// delete data ===============================================
const isLoad = ref(false);
const isDeleteModalOpen = ref(false);
const deleteItem = ref(null);

const openDeleteModal = (data) => {
  deleteItem.value = data;
  isDeleteModalOpen.value = true;
};

// Delete job
const confirmDelete = async () => {
  isLoad.value = true;
  try {
    await deleteApplicationJobList(deleteItem.value.id);
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

// view transactions data ===============================================
const showTransactionsModal = ref(false);
const transactions = ref([]);

const viewTransactions = (application) => {
  selectedApplication.value = application;
  transactions.value = application.job_application_transactions || [];
  showTransactionsModal.value = true;
};

onMounted(() => fetchDataTable());
</script>
