<template>
  <Layout>
    <BRow>
      <BCol lg="12">
        <BCard no-body id="bulkUploadList">
          <!-- Header -->
          <BCardHeader class="border-0 mb-3">
            <BRow class="align-items-center gy-3">
              <BCol cols="sm">
                <h5 class="card-title mb-0">Bulk Upload Management</h5>
                <p class="text-muted mb-0">
                  Monitor and manage your uploaded bulk files
                </p>
              </BCol>

              <BCol sm="auto" class="d-flex gap-2 align-items-center">
                <!-- Search -->
                <div class="search-box">
                  <input
                    type="text"
                    class="form-control search"
                    v-model="searchQuery"
                    placeholder="Search by filename..."
                    @keyup.enter="fetchDataTable(1)"
                  />
                  <i class="ri-search-line search-icon"></i>
                </div>

                <!-- Refresh Button -->
                <BButton variant="secondary" @click="clearFilters()">
                  <i class="ri-refresh-line me-1"></i>
                </BButton>

                <!-- Upload Button -->
                <BButton variant="primary" @click="showUploadModal = true">
                  <i class="ri-upload-cloud-2-line me-1"></i> Upload New
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
                    <th>Filename</th>
                    <th>File Size</th>
                    <th>Purpose</th>
                    <th>Uploaded By</th>
                    <th>Uploaded At</th>
                    <th>Expired At</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  <!-- Loading -->
                  <tr v-if="isLoading">
                    <td colspan="8" class="text-center">
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
                      <td class="fw-semibold">{{ data.original_filename }}</td>
                      <td>{{ formatFileSize(data.file_size) }}</td>
                      <td>{{ data.purpose || "N/A" }}</td>
                      <td>{{ data.user?.name || "N/A" }}</td>
                      <td>
                        {{
                          formatShortDate(data.uploaded_at || data.created_at)
                        }}
                      </td>
                      <td>
                        {{ formatShortDate(expiredDate(data.created_at)) }}
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

                          <BDropdownItem @click="viewBulkUpload(data)">
                            <i class="ri-eye-fill me-2 text-primary"></i>View
                            Details
                          </BDropdownItem>

                          <BDropdownItem @click="openDeleteModal(data)">
                            <i class="ri-delete-bin-fill me-2 text-muted"></i
                            >Delete
                          </BDropdownItem>
                        </BDropdown>
                      </td>
                    </tr>

                    <tr v-if="!tableData.length">
                      <td colspan="8" class="text-center text-muted">
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
        <!-- Lottie Animation -->
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
            <strong>{{ deleteItem?.email }}</strong
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

    <!-- View Bulk Upload Modal -->
    <BModal
      v-model="showViewModal"
      :title="`Bulk Upload Details - ${selectedUpload?.original_filename}`"
      size="lg"
      centered
      hide-footer
      header-class="border-0 pb-0"
      content-class="rounded-3"
      class="v-modal-custom"
    >
      <div v-if="selectedUpload" class="view-upload-content">
        <!-- Header with Status -->
        <div class="d-flex align-items-center justify-content-between mb-4">
          <div class="d-flex align-items-center">
            <div
              class="avatar-sm flex-shrink-0 me-3"
              :class="getStatusBadgeClass(selectedUpload.status)"
            >
              <div class="avatar-title rounded-circle bg-opacity-10 fs-16">
                <i :class="getStatusIcon(selectedUpload.status)"></i>
              </div>
            </div>
            <div>
              <h5 class="mb-1">{{ selectedUpload.original_filename }}</h5>
              <!-- <BBadge :variant="getStatusVariant(selectedUpload.status)">
                {{ selectedUpload.status.toUpperCase() }}
              </BBadge> -->
              <small class="fw-semibold">Uploaded</small>
            </div>
          </div>
          <div class="text-end">
            <small class="text-muted d-block">Uploaded</small>
            <small class="fw-semibold">{{
              formatShortDate(selectedUpload.created_at)
            }}</small>
          </div>
        </div>

        <!-- File Information -->
        <BCard class="border-0 shadow-sm mb-4">
          <BCardBody>
            <h6 class="mb-3 text-muted">
              <i class="ri-file-info-line me-2"></i>File Information
            </h6>
            <BRow class="g-3">
              <BCol md="6">
                <div class="d-flex justify-content-between border-bottom pb-2">
                  <span class="text-muted">Original Name:</span>
                  <span class="fw-semibold">{{
                    selectedUpload.original_filename
                  }}</span>
                </div>
              </BCol>
              <BCol md="6">
                <div class="d-flex justify-content-between border-bottom pb-2">
                  <span class="text-muted">File Type:</span>
                  <span class="fw-semibold text-capitalize">{{
                    selectedUpload.extension
                  }}</span>
                </div>
              </BCol>
              <BCol md="6">
                <div class="d-flex justify-content-between border-bottom pb-2">
                  <span class="text-muted">File Size:</span>
                  <span class="fw-semibold">{{
                    formatFileSize(selectedUpload.file_size)
                  }}</span>
                </div>
              </BCol>
              <BCol md="6">
                <div class="d-flex justify-content-between border-bottom pb-2">
                  <span class="text-muted">Uploaded By:</span>
                  <span class="fw-semibold">{{
                    selectedUpload.user?.name || "Unknown"
                  }}</span>
                </div>
              </BCol>
              <BCol md="6">
                <div class="d-flex justify-content-between border-bottom pb-2">
                  <span class="text-muted">Purpose:</span>
                  <span class="fw-semibold">{{
                    selectedUpload.purpose || "Not specified"
                  }}</span>
                </div>
              </BCol>
              <BCol md="6">
                <div class="d-flex justify-content-between border-bottom pb-2">
                  <span class="text-muted">Upload Date:</span>
                  <span class="fw-semibold">{{
                    formatShortDate(selectedUpload.uploaded_at)
                  }}</span>
                </div>
              </BCol>
            </BRow>
          </BCardBody>
        </BCard>

        <!-- Action Buttons -->
        <div
          class="d-flex justify-content-between align-items-center mt-4 pt-3 border-top"
        >
          <BButton variant="light" @click="showViewModal = false" class="px-4">
            <i class="ri-close-line me-2"></i>Close
          </BButton>

          <div class="d-flex gap-2">
            <BLink
              :href="`${storageBaseUrl()}/${selectedUpload.file_path}`"
              target="_blank"
              class="btn btn-outline-primary px-4"
            >
              <i class="ri-file-line me-2"></i>View File
            </BLink>

            <BButton
              variant="outline-danger"
              @click="openDeleteModal(selectedUpload)"
              class="px-4"
            >
              <i class="ri-delete-bin-line me-2"></i>Delete
            </BButton>
          </div>
        </div>
      </div>
    </BModal>

    <!-- Upload Modal -->
    <BModal
      v-model="showUploadModal"
      title="Upload Bulk CVs"
      size="lg"
      centered
      hide-footer
      header-class="border-0 pb-0"
      content-class="rounded-3"
      class="v-modal-custom"
    >
      <form @submit.prevent="handleFileUpload">
        <!-- Upload Zone -->
        <div class="upload-zone mb-4">
          <div
            class="border-2 border-dashed rounded-3 p-5 text-center position-relative"
            :class="[
              isDragOver
                ? 'border-primary bg-primary-soft'
                : 'border-light-subtle',
              form.files.length > 0 ? 'bg-success-soft border-success' : '',
            ]"
            @drop.prevent="handleDrop"
            @dragover.prevent="isDragOver = true"
            @dragleave.prevent="isDragOver = false"
            @dragenter.prevent
          >
            <!-- Upload Icon -->
            <div class="avatar-xl mx-auto mb-3">
              <div
                class="avatar-title rounded-circle bg-light text-muted"
                :class="
                  form.files.length > 0 ? 'bg-success-soft text-success' : ''
                "
              >
                <i class="ri-folder-upload-line fs-24"></i>
              </div>
            </div>

            <!-- Upload Text -->
            <h5 class="mb-2">
              {{
                form.files.length > 0
                  ? "Files Ready to Upload"
                  : "Drop your files here"
              }}
            </h5>
            <p class="text-muted mb-3">
              {{
                form.files.length > 0
                  ? `${form.files.length} file${
                      form.files.length > 1 ? "s" : ""
                    } selected`
                  : "or click to browse"
              }}
            </p>

            <!-- Upload Stats -->
            <div v-if="form.files.length > 0" class="upload-stats mb-3">
              <BRow class="g-3 text-center">
                <BCol>
                  <div class="bg-white rounded p-2 shadow-sm">
                    <h6 class="mb-1 text-primary">{{ form.files.length }}</h6>
                    <small class="text-muted">Files</small>
                  </div>
                </BCol>
                <BCol>
                  <div class="bg-white rounded p-2 shadow-sm">
                    <h6 class="mb-1 text-success">
                      {{ formatFileSize(totalSize) }}
                    </h6>
                    <small class="text-muted">Total Size</small>
                  </div>
                </BCol>
                <BCol>
                  <div class="bg-white rounded p-2 shadow-sm">
                    <h6 class="mb-1 text-info">{{ validFilesCount }}</h6>
                    <small class="text-muted">Valid Files</small>
                  </div>
                </BCol>
              </BRow>
            </div>

            <!-- File Input (Hidden) -->
            <input
              type="file"
              ref="fileInput"
              class="d-none"
              multiple
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.csv,.xlsx"
              @change="handleFileSelect"
              :disabled="submitting"
            />

            <!-- Upload Button -->
            <BButton
              variant="primary"
              class="rounded-pill px-4"
              @click="$refs.fileInput.click()"
              :disabled="submitting"
            >
              <i class="ri-folder-open-line me-2"></i>
              {{ form.files.length > 0 ? "Add More Files" : "Browse Files" }}
            </BButton>

            <!-- Supported Formats -->
            <div class="mt-3">
              <small class="text-muted">
                Supported formats: PDF, DOC, DOCX, JPG, PNG, CSV, XLSX (Max 5MB
                per file)
              </small>
            </div>
          </div>
        </div>

        <!-- Selected Files List -->
        <div v-if="form.files.length > 0" class="selected-files mb-4">
          <h6 class="mb-3 d-flex align-items-center">
            <i class="ri-attachment-2 me-2 text-primary"></i>
            Selected Files
            <BBadge variant="primary" class="ms-2">{{
              form.files.length
            }}</BBadge>
          </h6>

          <div class="files-list">
            <div
              v-for="(file, index) in form.files"
              :key="index"
              class="file-item card border-0 shadow-sm mb-2"
              :class="getFileStatusClass(file)"
            >
              <div class="card-body py-3">
                <div class="d-flex align-items-center">
                  <!-- File Icon -->
                  <div class="flex-shrink-0 me-3">
                    <div class="avatar-sm">
                      <div
                        class="avatar-title rounded bg-light text-muted fs-16"
                      >
                        <i :class="getFileIcon(file)"></i>
                      </div>
                    </div>
                  </div>

                  <!-- File Info -->
                  <div class="flex-grow-1">
                    <h6 class="mb-1 fs-14 text-truncate" :title="file.name">
                      {{ file.name }}
                    </h6>
                    <div class="d-flex align-items-center text-muted">
                      <small class="me-3">
                        <i class="ri-file-info-line me-1"></i>
                        {{ formatFileSize(file.size) }}
                      </small>
                      <small>
                        <i class="ri-time-line me-1"></i>
                        {{ getFileType(file) }}
                      </small>
                    </div>
                  </div>

                  <!-- File Actions -->
                  <div class="flex-shrink-0">
                    <BButton
                      variant="link"
                      class="text-danger p-0"
                      @click="removeFile(index)"
                      :disabled="submitting"
                      title="Remove file"
                    >
                      <i class="ri-close-circle-fill fs-16"></i>
                    </BButton>
                  </div>
                </div>

                <!-- Progress Bar (for upload) -->
                <div v-if="file.uploadProgress !== undefined" class="mt-2">
                  <BProgress
                    :value="file.uploadProgress"
                    :variant="
                      file.uploadProgress === 100 ? 'success' : 'primary'
                    "
                    height="4px"
                    animated
                  />
                  <small class="text-muted d-block text-end mt-1">
                    {{ file.uploadProgress }}% uploaded
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Validation Summary -->
        <div v-if="invalidFiles.length > 0" class="validation-alert mb-4">
          <BAlert variant="warning" show class="border-0">
            <div class="d-flex align-items-center">
              <i class="ri-alert-line fs-18 me-2"></i>
              <div>
                <h6 class="alert-heading mb-1">Some files couldn't be added</h6>
                <p class="mb-0">
                  {{ invalidFiles.length }} file{{
                    invalidFiles.length > 1 ? "s" : ""
                  }}
                  exceeded size limit or have unsupported format
                </p>
              </div>
            </div>
          </BAlert>
        </div>

        <!-- Action Buttons -->
        <div
          class="d-flex justify-content-between align-items-center pt-3 border-top"
        >
          <div>
            <small class="text-muted">
              Total: {{ form.files.length }} file{{
                form.files.length > 1 ? "s" : ""
              }}
              •
              {{ formatFileSize(totalSize) }}
            </small>
          </div>

          <div class="d-flex gap-2">
            <BButton
              variant="outline-secondary"
              @click="clearAllFiles"
              :disabled="submitting || form.files.length === 0"
            >
              <i class="ri-delete-bin-line me-1"></i>
              Clear All
            </BButton>

            <BButton
              variant="secondary"
              @click="showUploadModal = false"
              :disabled="submitting"
            >
              Cancel
            </BButton>

            <BButton
              type="submit"
              variant="primary"
              :disabled="submitting || form.files.length === 0"
              class="px-4"
            >
              <i class="ri-upload-cloud-line me-2"></i>
              {{
                submitting
                  ? "Uploading..."
                  : `Upload ${form.files.length} File${
                      form.files.length > 1 ? "s" : ""
                    }`
              }}
            </BButton>
          </div>
        </div>
      </form>
    </BModal>
  </Layout>
</template>

<script setup>
import { ref, computed, reactive, onMounted } from "vue";
import Layout from "@/layouts/main.vue";
import Lottie from "@/components/widgets/lottie.vue";
import animationData from "@/components/widgets/msoeawqm.json";
import animationData2 from "@/components/widgets/tdrtiskw.json";
import PaginationComponent from "@/components/pagination.vue";
import { formatShortDate } from "@/helpers/useFormats";
import { storageBaseUrl } from "@/helpers/useFormats";
import Toast from "@/helpers/Toast";

import {
  gePesoBulkUploadLists,
  storePesoBulkUpload,
  deletePesoBulkUpload,
} from "@/api-request";

const isLoading = ref(false);
const perPage = ref(10);
const page = ref(1);
const totalItems = ref(0);
const searchQuery = ref("");
const tableData = ref([]);
const defaultOptions = { animationData };
const showUploadModal = ref(false);

// const statusVariant = (status) => {
//   switch (status) {
//     case "completed":
//       return "success";
//     case "processing":
//       return "warning";
//     case "failed":
//       return "danger";
//     default:
//       return "secondary";
//   }
// };

const clearFilters = () => {
  searchQuery.value = "";
  fetchDataTable(1);
};

const updatePerPage = (size) => {
  perPage.value = size;
  fetchDataTable(1);
};

const expiredDate = (createdAt) => {
  if (!createdAt) return "N/A";
  const date = new Date(createdAt);
  const expired = new Date(date);
  expired.setMonth(expired.getMonth() + 6);
  return expired;
};

// Fetch data
const fetchDataTable = async (pageNumber = 1) => {
  page.value = pageNumber;
  isLoading.value = true;
  try {
    const response = await gePesoBulkUploadLists({
      search: searchQuery.value,
      per_page: perPage.value,
      page: pageNumber,
    });

    const res = response.data;
    tableData.value = res.items || [];
    totalItems.value = res.total || 0;
  } catch (error) {
    console.error(error);
    Toast.fire({
      icon: "error",
      title:
        error.response?.data?.message ||
        "An error occurred while fetching data.",
    });
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => fetchDataTable());

// =========================================================
const isLoad = ref(false);
const deleteAnimationOptions = { animationData: animationData2 };
const isDeleteModalOpen = ref(false);
const deleteItem = ref(null);

const openDeleteModal = (item) => {
  deleteItem.value = item;
  isDeleteModalOpen.value = true;
};

const confirmDelete = async () => {
  isLoad.value = true;

  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const response = deletePesoBulkUpload(deleteItem.value.id);

    Toast.fire({
      icon: "success",
      title: response?.message || "Process completed successfully.",
    });

    isDeleteModalOpen.value = false;
    fetchDataTable(page.value);
  } catch (error) {
    console.error(error);

    Toast.fire({
      icon: "error",
      title:
        error.response?.data?.message || "An error occurred while processing.",
    });
  } finally {
    isLoad.value = false;
  }
};

// =========================================================
const showViewModal = ref(false);
const selectedUpload = ref(null);

// const getStatusVariant = (status) => {
//   const variants = {
//     pending: "warning",
//     processing: "info",
//     completed: "success",
//     failed: "danger",
//   };
//   return variants[status] || "secondary";
// };

const getStatusIcon = (status) => {
  const icons = {
    pending: "ri-time-line text-warning",
    processing: "ri-loader-4-line text-info",
    completed: "ri-checkbox-circle-line text-success",
    failed: "ri-close-circle-line text-danger",
  };
  return icons[status] || "ri-question-line text-secondary";
};

const getStatusBadgeClass = (status) => {
  const classes = {
    pending: "bg-warning bg-opacity-10",
    processing: "bg-info bg-opacity-10",
    completed: "bg-success bg-opacity-10",
    failed: "bg-danger bg-opacity-10",
  };
  return classes[status] || "bg-secondary bg-opacity-10";
};

// Action methods
const viewBulkUpload = async (upload) => {
  try {
    selectedUpload.value = upload;
    showViewModal.value = true;
  } catch (error) {
    Toast.fire({
      icon: "error",
      title: "Failed to load upload details",
    });
  }
};

// ======================================================

// Reactive data
const isDragOver = ref(false);
const submitting = ref(false);
const invalidFiles = ref([]);

const form = reactive({
  files: [],
});

// Computed properties
const totalSize = computed(() => {
  return form.files.reduce((total, file) => total + file.size, 0);
});

const validFilesCount = computed(() => {
  return form.files.filter((file) => validateFile(file)).length;
});

// File handling methods
const handleDrop = (event) => {
  isDragOver.value = false;
  const droppedFiles = Array.from(event.dataTransfer.files);
  processFiles(droppedFiles);
};

const handleFileSelect = (event) => {
  const selectedFiles = Array.from(event.target.files);
  processFiles(selectedFiles);
  event.target.value = ""; // Reset input
};

const processFiles = (files) => {
  invalidFiles.value = [];

  files.forEach((file) => {
    if (validateFile(file)) {
      // Add upload progress tracking
      file.uploadProgress = 0;
      form.files.push(file);
    } else {
      invalidFiles.value.push(file);
    }
  });
};

const validateFile = (file) => {
  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "image/jpeg",
    "image/jpg",
    "image/png",
    "text/csv",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];

  const maxSize = 5 * 1024 * 1024; // 5MB

  const isValidType = allowedTypes.includes(file.type);
  const isValidSize = file.size <= maxSize;

  return isValidType && isValidSize;
};

const removeFile = (index) => {
  form.files.splice(index, 1);
};

const clearAllFiles = () => {
  form.files = [];
  invalidFiles.value = [];
};

// Helper methods
const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

const getFileIcon = (file) => {
  const iconMap = {
    "application/pdf": "ri-file-pdf-line text-danger",
    "application/msword": "ri-file-word-line text-primary",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      "ri-file-word-line text-primary",
    "image/jpeg": "ri-image-line text-success",
    "image/jpg": "ri-image-line text-success",
    "image/png": "ri-image-line text-success",
    "text/csv": "ri-file-excel-line text-success",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
      "ri-file-excel-line text-success",
  };
  return iconMap[file.type] || "ri-file-line text-muted";
};

const getFileType = (file) => {
  const typeMap = {
    "application/pdf": "PDF",
    "application/msword": "DOC",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      "DOCX",
    "image/jpeg": "JPEG",
    "image/jpg": "JPG",
    "image/png": "PNG",
    "text/csv": "CSV",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "XLSX",
  };
  return typeMap[file.type] || file.type.split("/")[1]?.toUpperCase() || "File";
};

const getFileStatusClass = (file) => {
  if (file.uploadProgress === 100) return "border-success";
  if (file.uploadProgress > 0) return "border-primary";
  return "";
};

// Upload method
const handleFileUpload = async () => {
  if (form.files.length === 0) return;

  submitting.value = true;

  try {
    // Simulate upload progress
    for (const file of form.files) {
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise((resolve) => setTimeout(resolve, 100));
        file.uploadProgress = progress;
      }
    }

    // Prepare FormData
    const formData = new FormData();
    form.files.forEach((file) => formData.append("files[]", file));

    // Actual upload
    await storePesoBulkUpload(formData);

    Toast.fire({
      icon: "success",
      title: `Successfully uploaded ${form.files.length} files!`,
    });

    fetchDataTable(page.value);

    showUploadModal.value = false;
    clearAllFiles();
  } catch (error) {
    Toast.fire({
      icon: "error",
      title: "Upload failed. Please try again.",
    });
  } finally {
    submitting.value = false;
  }
};
</script>
