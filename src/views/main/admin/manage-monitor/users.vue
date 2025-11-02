<template>
  <Layout>
    <BRow>
      <BCol lg="12">
        <BCard no-body id="orderList">
          <!-- Header -->
          <BCardHeader class="border-0">
            <BRow class="align-items-center gy-3">
              <BCol cols="sm">
                <h5 class="card-title mb-0">User Manage</h5>
              </BCol>
              <BCol sm="auto" v-if="userRole === 'admin'">
                <div class="d-flex gap-1 flex-wrap">
                  <BButton
                    type="button"
                    variant="success"
                    class="add-btn"
                    id="create-btn"
                    @click="openModal"
                  >
                    <i class="ri-add-line align-bottom me-1"></i>
                    Register Account
                  </BButton>
                </div>
              </BCol>
            </BRow>
          </BCardHeader>

          <!-- Filters -->
          <BCardBody class="border border-dashed border-end-0 border-start-0">
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

                <BCol xxl="3" sm="6">
                  <flat-pickr
                    placeholder="Select date"
                    v-model="searchDate"
                    :config="config"
                    class="form-control flatpickr-input"
                  />
                </BCol>

                <BCol xxl="2" sm="4">
                  <Multiselect
                    class="form-control"
                    v-model="searchStatus"
                    :close-on-select="true"
                    :searchable="true"
                    :create-option="true"
                    :options="[
                      { value: '', label: 'Status' },
                      { value: 'all', label: 'All' },
                      { value: true, label: 'Active' },
                      { value: false, label: 'Inactive' },
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
                    @click="clearFilters()"
                  >
                    <i class="ri-close-circle-line align-bottom"></i>
                  </BButton>
                </BCol>
              </BRow>
            </BForm>
          </BCardBody>

          <ul
            class="nav nav-tabs nav-tabs-custom nav-success mb-3"
            role="tablist"
          >
            <!-- All Users -->
            <li class="nav-item">
              <BLink
                class="nav-link py-3"
                :class="{ active: selectedType === '' }"
                data-bs-toggle="tab"
                id="All"
                role="tab"
                @click="changecategory('')"
                aria-selected="selectedType === ''"
              >
                <i class="ri-group-fill me-1 align-bottom"></i>
                All Users
                <BBadge variant="secondary" class="align-middle ms-1">
                  {{ countUserTypes.all || 0 }}
                </BBadge>
              </BLink>
            </li>

            <!-- Job Seeker -->
            <li class="nav-item">
              <BLink
                class="nav-link py-3"
                :class="{ active: selectedType === 'job_seeker' }"
                data-bs-toggle="tab"
                id="JobSeeker"
                role="tab"
                @click="changecategory('job_seeker')"
                aria-selected="selectedType === 'job_seeker'"
              >
                <i class="ri-user-search-line me-1 align-bottom"></i>
                Job Seeker
                <BBadge variant="secondary" class="align-middle ms-1">
                  {{ countUserTypes.job_seeker || 0 }}
                </BBadge>
              </BLink>
            </li>

            <!-- Employer / Locator -->
            <li class="nav-item">
              <BLink
                class="nav-link py-3"
                :class="{ active: selectedType === 'employer' }"
                data-bs-toggle="tab"
                id="Employer"
                role="tab"
                @click="changecategory('employer')"
                aria-selected="selectedType === 'employer'"
              >
                <i class="ri-briefcase-4-fill me-1 align-bottom"></i>
                Employer / Locator
                <BBadge variant="secondary" class="align-middle ms-1">
                  {{ countUserTypes.employer || 0 }}
                </BBadge>
              </BLink>
            </li>

            <!-- PESO / School -->
            <li class="nav-item">
              <BLink
                class="nav-link py-3"
                :class="{ active: selectedType === 'peso_school' }"
                data-bs-toggle="tab"
                id="PESO"
                role="tab"
                @click="changecategory('peso_school')"
                aria-selected="selectedType === 'peso_school'"
              >
                <i class="ri-bank-line me-1 align-bottom"></i>
                PESO / School
                <BBadge variant="secondary" class="align-middle ms-1">
                  {{ countUserTypes.peso_school || 0 }}
                </BBadge>
              </BLink>
            </li>

            <!-- Manpower Agency -->
            <li class="nav-item">
              <BLink
                class="nav-link py-3"
                :class="{ active: selectedType === 'manpower_agency' }"
                data-bs-toggle="tab"
                id="Agency"
                role="tab"
                @click="changecategory('manpower_agency')"
                aria-selected="selectedType === 'manpower_agency'"
              >
                <i class="ri-team-fill me-1 align-bottom"></i>
                Manpower Agency
                <BBadge variant="secondary" class="align-middle ms-1">
                  {{ countUserTypes.manpower_agency || 0 }}
                </BBadge>
              </BLink>
            </li>

            <!-- CDC Sec. -->
            <li class="nav-item">
              <BLink
                class="nav-link py-3"
                :class="{ active: selectedType === 'secretariat' }"
                data-bs-toggle="tab"
                id="Secretariat"
                role="tab"
                @click="changecategory('secretariat')"
                aria-selected="selectedType === 'secretariat'"
              >
                <i class="ri-shield-user-fill me-1 align-bottom"></i>
                CDC Secretariats
                <BBadge variant="secondary" class="align-middle ms-1">
                  {{ countUserTypes.secretariat || 0 }}
                </BBadge>
              </BLink>
            </li>

            <!-- CDC Admins -->
            <li class="nav-item">
              <BLink
                class="nav-link py-3"
                :class="{ active: selectedType === 'admin' }"
                data-bs-toggle="tab"
                id="Admins"
                role="tab"
                @click="changecategory('admin')"
                aria-selected="selectedType === 'admin'"
              >
                <i class="ri-admin-fill me-1 align-bottom"></i>
                CDC Admins
                <BBadge variant="secondary" class="align-middle ms-1">
                  {{ countUserTypes.admin || 0 }}
                </BBadge>
              </BLink>
            </li>
          </ul>

          <!-- Table -->
          <BCardBody class="pt-0">
            <div class="table-responsive table-card mb-3">
              <table class="table align-middle table-nowrap mb-0">
                <thead class="text-muted table-light">
                  <tr class="text-uppercase">
                    <th>Account Name</th>
                    <th>Email Address</th>
                    <th>Contact</th>
                    <th>Status</th>
                    <th>User Type</th>
                    <th>Register At</th>
                    <th class="text-center">Action</th>
                  </tr>
                </thead>

                <tbody class="list form-check-all">
                  <!-- Loading -->
                  <tr v-if="isLoading">
                    <td colspan="7" class="text-center mt-8">
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
                      <td>{{ data.name }}</td>
                      <td>{{ data.email }}</td>
                      <td>{{ data.telephone }}</td>
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
                      <td>
                        <i
                          :class="[
                            userTypeMap[data.user_type]?.icon ||
                              userTypeMap.default.icon,
                            'me-1',
                            'align-middle',
                          ]"
                        ></i>
                        {{
                          userTypeMap[data.user_type]?.label ||
                          userTypeMap.default.label
                        }}
                      </td>
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

                          <BDropdownItem
                            as="router-link"
                            :to="`/view-profile/${data?.id}`"
                          >
                            <i class="ri-eye-fill me-2 text-muted"></i> View
                          </BDropdownItem>

                          <BDropdownItem @click="openEditModal(data)">
                            <i class="ri-pencil-fill me-2 text-muted"></i>Edit
                          </BDropdownItem>

                          <li class="dropdown-divider"></li>
                          <BDropdownItem @click="openDeleteModal(data)">
                            <i class="ri-delete-bin-fill me-2 text-muted"></i
                            >Delete
                          </BDropdownItem>
                        </BDropdown>
                      </td>
                    </tr>

                    <tr v-if="!tableData.length">
                      <td colspan="7" class="text-center mt-8 text-muted">
                        <h5 class="mt-2">No Result Found</h5>
                        <p class="mb-0">
                          We didn't find any records for your search.
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

    <!-- Register Modal -->
    <BModal
      v-model="showModal"
      :title="isEditMode ? 'Edit Account' : 'Create New Account'"
      size="lg"
      centered
      hide-footer
      class="v-modal-custom"
      header-class="border-0 pb-0"
      content-class="rounded-3"
    >
      <BForm @submit.prevent="handleSubmit" class="needs-validation" novalidate>
        <!-- Progress Steps -->
        <div class="mb-4">
          <div
            class="d-flex align-items-center justify-content-between position-relative"
          >
            <div
              v-for="(step, index) in steps"
              :key="index"
              class="d-flex flex-column align-items-center position-relative"
              style="flex: 1"
            >
              <!-- Step Circle -->
              <div
                class="rounded-circle d-flex align-items-center justify-content-center mb-2"
                :class="[
                  currentStep > index
                    ? 'bg-primary text-white'
                    : currentStep === index
                    ? 'bg-primary text-white'
                    : 'bg-light text-muted',
                  'border border-3',
                  currentStep >= index ? 'border-primary' : 'border-light',
                ]"
                style="width: 40px; height: 40px; z-index: 2"
              >
                <i v-if="currentStep > index" class="ri-check-line fs-5"></i>
                <span v-else class="fw-semibold">{{ index + 1 }}</span>
              </div>

              <!-- Step Label -->
              <small
                class="text-nowrap fw-medium"
                :class="currentStep >= index ? 'text-primary' : 'text-muted'"
              >
                {{ step }}
              </small>
            </div>

            <!-- Progress Line -->
            <div
              class="position-absolute top-20 start-0 end-0"
              style="height: 3px; z-index: 1"
            >
              <div
                class="bg-primary h-100 rounded-pill"
                :style="{ width: progressWidth }"
              ></div>
              <div
                class="bg-light h-100 rounded-pill position-absolute top-0 start-0 end-0"
              ></div>
            </div>
          </div>
        </div>

        <!-- Step 1: Account Type & Basic Info -->
        <div v-if="currentStep === 0" class="step-content">
          <div class="row g-4">
            <!-- User Type Selection -->
            <div class="col-12">
              <label class="form-label fw-semibold fs-6 mb-3">
                Select Your Role <span class="text-danger">*</span>
              </label>

              <div class="row g-3">
                <div
                  v-for="type in userTypes"
                  :key="type.value"
                  class="col-md-6 col-lg-4"
                >
                  <div
                    class="card card-hover border-2 h-100"
                    :class="[
                      form.user_type === type.value
                        ? 'border-primary bg-primary-soft'
                        : 'border-light',
                    ]"
                    @click="!isEditMode && (form.user_type = type.value)"
                  >
                    <div class="card-body text-center p-4">
                      <div
                        class="rounded-circle bg-light d-inline-flex align-items-center justify-content-center mb-3"
                        :class="
                          form.user_type === type.value
                            ? 'text-primary'
                            : 'text-muted'
                        "
                        style="width: 60px; height: 60px"
                      >
                        <i class="fs-4" :class="type.icon"></i>
                      </div>
                      <h6 class="fw-semibold mb-1">{{ type.text }}</h6>
                      <small class="text-muted">{{ type.description }}</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Basic Information -->
            <div class="col-12">
              <h6 class="fw-semibold mb-3 text-muted">BASIC INFORMATION</h6>
              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label fw-semibold">
                    Full Name <span class="text-danger">*</span>
                  </label>
                  <BFormInput
                    v-model="form.name"
                    type="text"
                    placeholder="Enter your full name"
                    required
                    class="py-2"
                  />
                </div>
                <div class="col-md-6">
                  <label class="form-label fw-semibold">
                    Email Address <span class="text-danger">*</span>
                  </label>
                  <BFormInput
                    v-model="form.email"
                    type="email"
                    placeholder="Enter your email"
                    required
                    class="py-2"
                  />
                  <div class="form-text text-danger" v-if="emailError">
                    {{ emailError }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Step 2: Security & Contact -->
        <div v-if="currentStep === 1" class="step-content">
          <div class="row g-4">
            <!-- Security -->
            <div v-if="!isEditMode" class="col-12">
              <h6 class="fw-semibold mb-3 text-muted">SECURITY</h6>
              <div class="row g-3">
                <!-- Password -->
                <div class="col-md-6">
                  <label class="form-label fw-semibold">
                    Password <span class="text-danger">*</span>
                  </label>
                  <div class="input-group">
                    <BFormInput
                      v-model="form.password"
                      :type="showPassword ? 'text' : 'password'"
                      placeholder="Create a strong password"
                      class="py-2"
                    />

                    <BButton
                      variant="outline-secondary"
                      @click="togglePassword"
                      class="d-flex align-items-center"
                    >
                      <i
                        :class="
                          showPassword ? 'ri-eye-off-line' : 'ri-eye-line'
                        "
                      ></i>
                    </BButton>
                  </div>
                  <div class="form-text">
                    <small class="text-danger" v-if="passwordError"
                      >{{ passwordError }} <br
                    /></small>

                    Use 8+ characters with a mix of letters, numbers & symbols
                  </div>
                </div>

                <!-- Confirm Password -->
                <div class="col-md-6">
                  <label class="form-label fw-semibold">
                    Confirm Password <span class="text-danger">*</span>
                  </label>
                  <div class="input-group">
                    <BFormInput
                      v-model="form.confirmPassword"
                      :type="showConfirmPassword ? 'text' : 'password'"
                      placeholder="Confirm your password"
                      class="py-2"
                    />

                    <BButton
                      variant="outline-secondary"
                      @click="toggleConfirmPassword"
                      class="d-flex align-items-center"
                    >
                      <i
                        :class="
                          showConfirmPassword
                            ? 'ri-eye-off-line'
                            : 'ri-eye-line'
                        "
                      ></i>
                    </BButton>
                  </div>

                  <div class="form-text">
                    <small class="text-danger" v-if="confirmPasswordError">{{
                      confirmPasswordError
                    }}</small>
                  </div>
                </div>
              </div>
            </div>

            <!-- Contact Information -->
            <div class="col-12">
              <h6 class="fw-semibold mb-3 text-muted">CONTACT INFORMATION</h6>
              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label fw-semibold">Phone Number</label>
                  <BFormInput
                    v-model="form.telephone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    class="py-2"
                  />
                </div>
                <div class="col-md-6">
                  <label class="form-label fw-semibold">Address</label>
                  <BFormInput
                    v-model="form.address"
                    type="text"
                    placeholder="Enter your address"
                    class="py-2"
                  />
                </div>
              </div>
            </div>

            <!-- Employer Specific Fields -->
            <div v-if="form.user_type === 'employer'" class="col-12">
              <h6 class="fw-semibold mb-3 text-muted">COMPANY INFORMATION</h6>
              <div class="row g-3">
                <div class="col-md-4">
                  <label class="form-label fw-semibold">Company Size</label>
                  <BFormSelect
                    v-model="form.company_size"
                    :options="companySizeOptions"
                    class="py-2"
                  >
                    <template #first>
                      <option value="" disabled>Select company size</option>
                    </template>
                  </BFormSelect>
                </div>
                <div class="col-md-4">
                  <label for="industry" class="form-label fw-semibold">
                    Industry
                  </label>
                  <select
                    id="industry"
                    class="form-select"
                    v-model="form.industry"
                  >
                    <option value="">Select Industry</option>
                    <option
                      v-for="industry in industryDetails"
                      :key="industry.id"
                      :value="industry.name"
                    >
                      {{ industry.name }}
                    </option>
                  </select>
                </div>
                <div class="col-md-4">
                  <label class="form-label fw-semibold">Locator Number</label>
                  <BFormInput
                    v-model="form.locator_number"
                    type="text"
                    placeholder="Enter locator number"
                    class="py-2"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Step 3: Profile & Bio -->
        <div v-if="currentStep === 2" class="step-content">
          <div class="row g-4">
            <!-- Profile Information -->
            <div class="col-12">
              <h6 class="fw-semibold mb-3 text-muted">PROFILE INFORMATION</h6>

              <!-- Bio -->
              <div class="mb-4">
                <label class="form-label fw-semibold">
                  {{
                    form.user_type === "employer"
                      ? "Company Description"
                      : "About You"
                  }}
                </label>
                <BFormTextarea
                  v-model="form.bio"
                  rows="4"
                  :placeholder="
                    form.user_type === 'employer'
                      ? 'Tell us about your company, culture, and what you do...'
                      : 'Tell us about yourself, your experience, or your organization...'
                  "
                  class="py-2"
                />
                <div class="form-text">
                  {{ form.bio ? form.bio.length : 0 }}/500 characters
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation Buttons -->
        <div
          class="d-flex justify-content-between align-items-center mt-5 pt-3 border-top"
        >
          <BButton
            variant="light"
            @click="previousStep"
            :disabled="currentStep === 0 || loading"
            class="px-4"
          >
            <i class="ri-arrow-left-line me-2"></i>Back
          </BButton>

          <div class="d-flex gap-2">
            <BButton
              variant="outline-secondary"
              @click="showModal = false"
              :disabled="loading"
              class="px-4"
            >
              Cancel
            </BButton>

            <BButton
              v-if="currentStep < 2"
              variant="primary"
              @click="nextStep"
              :disabled="!canProceed"
              class="px-4"
            >
              Continue <i class="ri-arrow-right-line ms-2"></i>
            </BButton>

            <BButton
              v-else
              type="submit"
              variant="success"
              :disabled="loading"
              class="px-4 d-flex align-items-center justify-content-center"
            >
              <template v-if="loading">
                <span
                  class="spinner-border spinner-border-sm me-2"
                  role="status"
                >
                  <span class="visually-hidden">Loading...</span>
                </span>
                {{ isEditMode ? "Saving..." : "Creating..." }}
              </template>

              <template v-else>
                <i
                  :class="
                    isEditMode ? 'ri-save-line me-2' : 'ri-user-add-line me-2'
                  "
                ></i>
                {{ isEditMode ? "Save Changes" : "Complete Registration" }}
              </template>
            </BButton>
          </div>
        </div>
      </BForm>
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
  </Layout>
</template>

<script setup>
import { ref, onMounted, computed, reactive } from "vue";
import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";

import Toast from "@/helpers/Toast";
import Layout from "@/layouts/main.vue";

import PaginationComponent from "@/components/pagination.vue";
import { getUsers, createUser, updateUser, deleteUser } from "@/api-request";
import { formatShortDate, userTypeMap } from "@/helpers/useFormats";

import Lottie from "@/components/widgets/lottie.vue";
import animationData2 from "@/components/widgets/tdrtiskw.json";
import animationData from "@/components/widgets/msoeawqm.json";

import { useJobFilters } from "@/helpers/useJobFilters";
const { industryDetails } = useJobFilters();

import { useStore } from "vuex";
const store = useStore();
const userRole = computed(() => store.state.auth.user?.user_type ?? "");

const isLoading = ref(false);
const perPage = ref(10);
const page = ref(1);
const totalItems = ref(0);

const searchStatus = ref("all");
const searchQuery = ref("");
const searchDate = ref(null);
const searchType = ref("");

const defaultOptions = { animationData };
const tableData = ref([]);

const config = {
  wrap: true,
  altFormat: "M j, Y",
  altInput: true,
  dateFormat: "d M, Y",
  mode: "range",
};

const selectedType = ref("");
const countUserTypes = ref({
  all: 0,
  job_seeker: 0,
  employer: 0,
  peso_school: 0,
  manpower_agency: 0,
  admin: 0,
});

const changecategory = (value) => {
  searchType.value = value;
  fetchDataTable(1);
};

const clearFilters = () => {
  searchQuery.value = "";
  searchDate.value = "";
  searchStatus.value = "all";
  fetchDataTable(1);
};

const fetchDataTable = async (pageNumber = 1) => {
  page.value = pageNumber;
  isLoading.value = true;
  try {
    const response = await getUsers({
      search: searchQuery.value,
      date: searchDate.value,
      status: searchStatus.value,
      type: searchType.value,
      per_page: perPage.value,
      page: pageNumber,
    });

    const data = response.data;

    tableData.value = data.items || [];
    totalItems.value = data.total;
    countUserTypes.value = data.count_user_types;
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

// Modal state ==========================================================================
const isEditMode = ref(false);
const showModal = ref(false);
const loading = ref(false);
const currentStep = ref(0);

const showPassword = ref(false);
const showConfirmPassword = ref(false);

const togglePassword = () => (showPassword.value = !showPassword.value);
const toggleConfirmPassword = () =>
  (showConfirmPassword.value = !showConfirmPassword.value);

const emailError = computed(() => {
  if (!form.email) return "";
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    ? ""
    : "Please enter a valid email address";
});

const passwordValid = computed(() => {
  if (isEditMode.value && !form.password) return true;
  return (
    form.password &&
    form.password.length >= 8 &&
    /[A-Za-z]/.test(form.password) &&
    /\d/.test(form.password) &&
    /[^A-Za-z0-9]/.test(form.password)
  );
});

const confirmPasswordValid = computed(() => {
  if (!form.confirmPassword) return false;
  return form.password === form.confirmPassword;
});

const passwordError = computed(() => {
  if (!form.password) return "";
  if (form.password.length < 8)
    return "Password must be at least 8 characters long.";
  if (!/[A-Za-z]/.test(form.password))
    return "Password must include at least one letter.";
  if (!/\d/.test(form.password))
    return "Password must include at least one number.";
  if (!/[^A-Za-z0-9]/.test(form.password))
    return "Password must include at least one symbol.";
  return "";
});

const confirmPasswordError = computed(() => {
  if (!form.confirmPassword) return "";
  return form.password === form.confirmPassword
    ? ""
    : "Passwords do not match.";
});

const formId = ref("");

// Form data
const form = reactive({
  user_type: "",
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  telephone: "",
  address: "",
  bio: "",
  // Employer specific fields
  company_size: "",
  industry: "",
  locator_number: "",
});

// Steps configuration
const steps = ref(["Account Type", "Details", "Complete"]);

// User types
const userTypes = ref([
  {
    value: "job_seeker",
    text: "Job Seeker",
    icon: "ri-user-search-line",
    description: "Find and apply for job opportunities",
  },
  {
    value: "employer",
    text: "Employer",
    icon: "ri-building-line",
    description: "Post jobs and hire talented professionals",
  },
  {
    value: "peso_school",
    text: "PESO School",
    icon: "ri-graduation-cap-line",
    description: "Educational institution partner for job placement",
  },
  {
    value: "manpower_agency",
    text: "Manpower Agency",
    icon: "ri-team-line",
    description: "Recruitment agency providing staffing solutions",
  },
  {
    value: "secretariat",
    text: "Secretariat",
    icon: "ri-admin-line",
    description: "Administrative support and system management",
  },
  {
    value: "admin",
    text: "Admin",
    icon: "ri-shield-user-line",
    description: "System administrator with full access",
  },
]);

// delete =========================================================================
const deleteAnimationOptions = { animationData: animationData2 };
const isDeleteModalOpen = ref(false);
const deleteItem = ref(null);
const isLoad = ref(false);

const openDeleteModal = (item) => {
  deleteItem.value = item;
  isDeleteModalOpen.value = true;
};

const confirmDelete = async () => {
  isLoad.value = true;

  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const response = deleteUser(deleteItem.value.id);

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

// Company size options
const companySizeOptions = ref([
  { value: "1-10", text: "1-10 employees" },
  { value: "11-50", text: "11-50 employees" },
  { value: "51-200", text: "51-200 employees" },
  { value: "201-500", text: "201-500 employees" },
  { value: "501-1000", text: "501-1000 employees" },
  { value: "1000+", text: "1000+ employees" },
]);

// Computed properties
const progressWidth = computed(() => {
  return `${((currentStep.value + 1) / steps.value.length) * 100}%`;
});

const canProceed = computed(() => {
  switch (currentStep.value) {
    case 0: {
      const emailValid =
        form.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);

      return form.user_type && form.name && emailValid;
    }

    case 1: {
      let valid = true;

      if (!isEditMode.value) {
        valid = passwordValid.value && confirmPasswordValid.value;
      }

      if (form.user_type === "employer") {
        valid = valid && form.company_size && form.industry;
      }

      return valid;
    }

    default:
      return false;
  }
});

// Methods
const nextStep = () => {
  if (currentStep.value < steps.value.length - 1) {
    currentStep.value++;
  }
};

const previousStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--;
  }
};

const resetForm = () => {
  Object.assign(form, {
    user_type: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    telephone: "",
    address: "",
    bio: "",
    company_size: "",
    industry: "",
    locator_number: "",
  });
  currentStep.value = 0;
};

const handleSubmit = async () => {
  loading.value = true;
  try {
    let response;
    if (isEditMode.value) {
      response = await updateUser(formId.value, form);
    } else {
      response = await createUser(form);
    }

    const data = response.data;

    showModal.value = false;
    resetForm();
    fetchDataTable(1);

    Toast.fire({
      icon: "success",
      title: data?.message || "Process completed successfully.",
    });
  } catch (error) {
    console.error("Registration failed:", error);

    Toast.fire({
      icon: "error",
      title: error.response?.data?.message || "Failed to process",
    });
  } finally {
    loading.value = false;
  }
};

// Open modal method (if needed from parent)
const openEditModal = (data) => {
  showModal.value = true;
  isEditMode.value = true;
  formId.value = data.id;

  // Reset and assign base fields
  Object.assign(form, {
    user_type: data.user_type || "",
    name: data.name || "",
    email: data.email || "",
    password: "",
    confirmPassword: "",
    telephone: data.telephone || "",
    address: data.address || "",
    bio: data.bio || "",
    company_size: "",
    industry: "",
    locator_number: "",
  });

  // Merge employer-specific info if applicable
  if (data.user_type === "employer" && data.employer) {
    form.company_size = data.employer.company_size || "";
    form.industry = data.employer.industry || "";
    form.locator_number = data.employer.locator_number || "";
  }

  // Optional: jump to step 0
  currentStep.value = 0;
};

const openModal = () => {
  resetForm();
  showModal.value = true;
};

const updatePerPage = (size) => {
  perPage.value = size;
  fetchDataTable(1);
};

onMounted(() => fetchDataTable());
</script>

<style scoped>
.card-hover {
  transition: all 0.3s ease;
  cursor: pointer;
}

.card-hover:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.bg-primary-soft {
  background-color: rgba(13, 110, 253, 0.05) !important;
}

.top-20 {
  top: 20px;
}

.step-content {
  min-height: 300px;
}

.v-modal-custom .modal-header {
  padding: 1.5rem 1.5rem 0.5rem 1.5rem;
}

.v-modal-custom .modal-body {
  padding: 1.5rem;
}

.input-group .btn {
  border-color: #ced4da;
}
</style>
