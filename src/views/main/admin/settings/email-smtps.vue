<template>
  <Layout>
    <BRow>
      <BCol lg="12">
        <BCard no-body id="emailList">
          <!-- Header -->
          <BCardHeader class="border-0">
            <BRow class="align-items-center gy-3">
              <BCol cols="sm">
                <h5 class="card-title mb-0">Settings | Email SMTP</h5>
              </BCol>
              <BCol sm="auto">
                <div class="d-flex gap-2 flex-wrap">
                  <!-- Test Email Button -->
                  <BButton
                    type="button"
                    variant="info"
                    class="test-btn"
                    @click="openTestEmailModal"
                    :disabled="!hasSmtpConfig"
                  >
                    <i class="ri-send-plane-line align-bottom me-1"></i> Test
                    Email
                  </BButton>

                  <!-- Add New SMTP Button -->
                  <BButton
                    type="button"
                    variant="success"
                    class="add-btn"
                    @click="openModal('')"
                  >
                    <i class="ri-add-line align-bottom me-1"></i> Add New SMTP
                  </BButton>
                </div>
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
                      { value: 'active', label: 'Active' },
                      { value: 'inactive', label: 'Inactive' },
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
                    <th>No.</th>
                    <th>Host</th>
                    <th>Port</th>
                    <th>Email</th>
                    <th>Encryption</th>
                    <th>Status</th>
                    <th>Created At</th>
                    <th class="text-center">Action</th>
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
                      <td>{{ data.host }}</td>
                      <td>{{ data.port }}</td>
                      <td>{{ data.email }}</td>
                      <td>{{ data.encryption }}</td>
                      <td>
                        <span
                          :class="
                            data.is_active
                              ? 'badge bg-success-subtle text-success fs-12'
                              : 'badge bg-danger-subtle text-danger fs-12'
                          "
                        >
                          {{ data.is_active ? "Active" : "Inactive" }}
                        </span>
                      </td>
                      <td>{{ formatShortDate(data.created_at) }}</td>
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
                          <BDropdownItem @click="openModal(data)">
                            <i class="ri-pencil-fill me-2 text-muted"></i>Edit
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

      <!-- Create & Update  -->
      <BModal
        v-model="isModalOpen"
        hide-footer
        :title="isEdit ? 'Edit New SMTP' : 'Add New SMTP'"
        class="v-modal-custom"
      >
        <form @submit.prevent="handleSubmit">
          <BRow class="g-3">
            <BCol lg="12">
              <label class="form-label">Email</label>
              <input
                type="text"
                v-model="form.email"
                class="form-control"
                placeholder="Enter email"
              />
            </BCol>

            <BCol lg="12">
              <label class="form-label">Password</label>
              <input
                type="text"
                v-model="form.password"
                class="form-control"
                placeholder="Enter password"
              />
            </BCol>

            <BCol lg="12">
              <label class="form-label">Host</label>
              <input
                type="text"
                v-model="form.host"
                class="form-control"
                placeholder="Enter host"
              />
            </BCol>

            <BCol lg="12">
              <label class="form-label">Port</label>
              <input
                type="text"
                v-model="form.port"
                class="form-control"
                placeholder="Enter port"
              />
            </BCol>

            <BCol lg="12">
              <label class="form-label">Encryption</label>
              <input
                type="text"
                v-model="form.encryption"
                class="form-control"
                placeholder="Enter encryption"
              />
            </BCol>

            <BCol lg="12">
              <label class="form-label">Status</label>
              <div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    id="active"
                    :value="true"
                    v-model="form.is_active"
                  />
                  <label class="form-check-label" for="active">Active</label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    id="inactive"
                    :value="false"
                    v-model="form.is_active"
                  />
                  <label class="form-check-label" for="inactive"
                    >Inactive</label
                  >
                </div>
              </div>
            </BCol>

            <BCol lg="12">
              <div class="hstack gap-2 justify-content-end">
                <BButton
                  type="button"
                  variant="light"
                  @click="isModalOpen = false"
                >
                  Close
                </BButton>

                <BButton type="submit" variant="primary" :disabled="isLoad">
                  <span v-if="isLoad" class="d-flex align-items-center">
                    <span
                      class="spinner-border spinner-border-sm me-2"
                      role="status"
                    >
                      <span class="visually-hidden">Loading...</span>
                    </span>
                    Loading...
                  </span>
                  <span v-else>
                    {{ isEdit ? "Update" : "Submit" }}
                  </span>
                </BButton>
              </div>
            </BCol>
          </BRow>
        </form>
      </BModal>

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

      <!-- Test Email Modal -->
      <BModal
        v-model="showTestEmailModal"
        title="Test Email Configuration"
        hide-footer
        centered
        class="v-modal-custom"
      >
        <form @submit.prevent="sendTestEmail">
          <BRow class="g-3">
            <BCol lg="12">
              <label class="form-label">Recipient Email</label>
              <input
                type="email"
                v-model="recipientEmail"
                class="form-control"
                placeholder="Enter recipient email address"
                required
              />
            </BCol>

            <BCol lg="12">
              <div class="alert alert-info">
                <i class="ri-information-line me-2"></i>
                This will send a test email to verify your SMTP configuration.
              </div>
            </BCol>

            <BCol lg="12">
              <div class="hstack gap-2 justify-content-end">
                <BButton
                  type="button"
                  variant="light"
                  @click="showTestEmailModal = false"
                  :disabled="testingEmail"
                >
                  Cancel
                </BButton>
                <BButton
                  type="submit"
                  variant="primary"
                  :disabled="testingEmail || !recipientEmail"
                >
                  <template v-if="testingEmail">
                    <span class="spinner-border spinner-border-sm me-2"></span>
                    Sending...
                  </template>
                  <template v-else>
                    <i class="ri-send-plane-line me-2"></i>
                    Send Test Email
                  </template>
                </BButton>
              </div>
            </BCol>
          </BRow>
        </form>
      </BModal>
    </BRow>
  </Layout>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
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
  getSettingEmails,
  createSettingEmail,
  updateSettingEmail,
  deleteSettingEmail,
  showSettingEmail,
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

const isModalOpen = ref(false);
const isEdit = ref(false);
const editId = ref(0);
const form = ref({
  id: null,
  host: "smtp.gmail.com",
  port: "587",
  encryption: "tls",
  email: "",
  password: "",
  is_active: false,
});

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

const openModal = (data = null) => {
  if (data) {
    isEdit.value = true;
    editId.value = data.id;
    form.value = {
      id: data.id,
      host: data.host,
      port: data.port,
      email: data.email,
      encryption: data.encryption,
      password: data.password,
      is_active: data.is_active,
    };
  } else {
    isEdit.value = false;
    editId.value = 0;
    form.value = {
      id: null,
      host: "smtp.gmail.com",
      port: "587",
      encryption: "tls",
      email: "",
      password: "",
      is_active: false,
    };
  }

  isModalOpen.value = true;
};

const openDeleteModal = (item) => {
  deleteItem.value = item;
  isDeleteModalOpen.value = true;
};

// request ==========================
const fetchDataTable = async (pageNumber = 1) => {
  page.value = pageNumber;
  isLoading.value = true;
  try {
    const response = await getSettingEmails({
      search: searchQuery.value,
      status: searchStatus.value,
      per_page: perPage.value,
      page: pageNumber,
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

const handleSubmit = async () => {
  isLoad.value = true;

  try {
    const response = editId.value
      ? await updateSettingEmail(editId.value, form.value)
      : await createSettingEmail(form.value);

    Toast.fire({
      icon: "success",
      title: response?.message || "Process completed successfully.",
    });

    fetchDataTable();
    isModalOpen.value = false;
  } catch (error) {
    console.error("Submit Error:", error);

    Toast.fire({
      icon: "error",
      title:
        error.response?.data?.message || "An error occurred while processing.",
    });
  } finally {
    isLoad.value = false;
  }
};

const confirmDelete = async () => {
  isLoad.value = true;

  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const response = deleteSettingEmail(deleteItem.value.id);

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

// Reactive data
const showTestEmailModal = ref(false);
const testingEmail = ref(false);
const recipientEmail = ref("");

// Computed properties
const hasSmtpConfig = computed(() => tableData.value.length > 0);

// Methods
const openTestEmailModal = async () => {
  if (!tableData.value) {
    Toast(
      "warning",
      "No SMTP configurations available. Please add an SMTP configuration first."
    );
    return;
  }

  // Reset form
  recipientEmail.value = "";

  showTestEmailModal.value = true;
};

const sendTestEmail = async () => {
  testingEmail.value = true;

  try {
    const response = await showSettingEmail(recipientEmail.value);

    Toast.fire({
      icon: "success",
      title: response?.message || "Process completed successfully.",
    });
    showTestEmailModal.value = false;
  } catch (error) {
    console.error("Test email failed:", error);

    Toast.fire({
      icon: "error",
      title:
        error.response?.data?.message || "An error occurred while processing.",
    });
  } finally {
    testingEmail.value = false;
  }
};

onMounted(() => fetchDataTable());
</script>
