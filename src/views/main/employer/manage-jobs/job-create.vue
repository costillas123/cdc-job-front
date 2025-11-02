<template>
  <Layout>
    <PageHeader title="Create New Job" pageTitle="Job Posting" />

    <BRow>
      <BCol lg="12">
        <BCard no-body>
          <BCardBody>
            <BForm @submit.prevent="handleSubmit">
              <BRow class="gx-lg-5">
                <BRow class="gx-lg-5 mb-3">
                  <div class="d-flex gap-3 align-items-center">
                    <!-- Back button -->
                    <BButton
                      variant="outline-secondary btn-sm"
                      @click="$router.back()"
                    >
                      <i class="ri-arrow-left-line me-2"></i> Back
                    </BButton>

                    <!-- Title -->
                    <BCardTitle class="mb-0">New Job Information</BCardTitle>
                  </div>
                </BRow>

                <!-- Left Column -->
                <BCol xl="4" md="8" class="mx-auto">
                  <BCard no-body class="product-img-slider sticky-side-div">
                    <BCardHeader class="align-items-center d-flex">
                      <BCardTitle class="mb-0"> Job Details </BCardTitle>
                    </BCardHeader>

                    <BCardBody>
                      <div class="form-group mt-3">
                        <label class="form-label fw-medium">
                          Title <span class="text-danger">*</span>
                        </label>
                        <BFormInput
                          v-model="form.title"
                          type="text"
                          class="form-control"
                          placeholder="Enter Title"
                          :state="validateField('title')"
                        />
                        <BFormInvalidFeedback>
                          {{ errors.title }}
                        </BFormInvalidFeedback>
                      </div>

                      <!-- Category -->
                      <div class="form-group mt-3">
                        <label class="form-label fw-medium">
                          Job Category <span class="text-danger">*</span>
                        </label>
                        <BFormSelect
                          v-model="form.job_category"
                          :state="validateField('job_category')"
                          @change="handleCategoryChange()"
                        >
                          <option value="">Select Category</option>
                          <option
                            v-for="data in categoryDetails"
                            :key="data.id"
                            :value="data.id"
                          >
                            {{ data.name }}
                          </option>
                        </BFormSelect>
                        <BFormInvalidFeedback>
                          {{ errors.job_category }}
                        </BFormInvalidFeedback>
                      </div>

                      <!-- Sub Categories -->
                      <div class="form-group mt-3">
                        <label for="subCategoriesInput" class="form-label">
                          Sub Categories
                        </label>
                        <Multiselect
                          v-model="form.job_sub_category"
                          id="subCategoriesInput"
                          mode="tags"
                          :close-on-select="false"
                          :searchable="true"
                          :create-option="false"
                          :options="
                            getSubCategoriesByCategory(form.job_category)
                          "
                          :disabled="!form.job_category"
                          placeholder="Select sub categories"
                        />
                        <small
                          class="form-text text-muted"
                          v-if="!form.job_category"
                        >
                          Please select a category first
                        </small>

                        <BFormInvalidFeedback>
                          {{ errors.job_category }}
                        </BFormInvalidFeedback>
                      </div>

                      <div class="form-group mt-3">
                        <label class="form-label fw-medium">
                          Job Location <span class="text-danger">*</span>
                        </label>
                        <BFormSelect
                          v-model="form.job_location"
                          class="form-select"
                          :state="validateField('job_location')"
                        >
                          <option value="">Select Location</option>
                          <option
                            v-for="data in locationDetails"
                            :key="data.id"
                            :value="data.id"
                          >
                            {{ data.name }}
                          </option>
                        </BFormSelect>
                        <BFormInvalidFeedback>
                          {{ errors.job_location }}
                        </BFormInvalidFeedback>
                      </div>

                      <div class="form-group mt-3">
                        <label class="form-label fw-medium">
                          Job Type <span class="text-danger">*</span>
                        </label>
                        <BFormSelect
                          v-model="form.job_type"
                          class="form-select"
                          :state="validateField('job_type')"
                        >
                          <option value="">Select Type</option>
                          <option
                            v-for="data in typeDetails"
                            :key="data.id"
                            :value="data.id"
                          >
                            {{ data.name }}
                          </option>
                        </BFormSelect>
                        <BFormInvalidFeedback>
                          {{ errors.job_type }}
                        </BFormInvalidFeedback>
                      </div>

                      <div class="form-group mt-3">
                        <label class="form-label fw-medium">
                          Job Level <span class="text-danger">*</span>
                        </label>
                        <BFormSelect
                          v-model="form.job_level"
                          class="form-select"
                          :state="validateField('job_level')"
                        >
                          <option value="">Select Level</option>
                          <option
                            v-for="data in levelDetails"
                            :key="data.id"
                            :value="data.id"
                          >
                            {{ data.name }}
                          </option>
                        </BFormSelect>
                        <BFormInvalidFeedback>
                          {{ errors.job_level }}
                        </BFormInvalidFeedback>
                      </div>

                      <div class="form-group mt-3">
                        <label class="form-label fw-medium">
                          Job Qualification <span class="text-danger">*</span>
                        </label>
                        <BFormSelect
                          v-model="form.job_qualify"
                          class="form-select"
                          :state="validateField('job_qualify')"
                        >
                          <option value="">Select Qualification</option>
                          <option
                            v-for="data in qualificationDetails"
                            :key="data.id"
                            :value="data.id"
                          >
                            {{ data.name }}
                          </option>
                        </BFormSelect>
                        <BFormInvalidFeedback>
                          {{ errors.job_qualify }}
                        </BFormInvalidFeedback>
                      </div>

                      <div class="form-group mt-3">
                        <label class="form-label fw-medium">
                          Years of Experience <span class="text-danger">*</span>
                        </label>
                        <BFormSelect
                          v-model="form.job_experience"
                          class="form-select"
                          :state="validateField('job_experience')"
                        >
                          <option value="">Select Years of Experience</option>
                          <option value="0">0 years (Fresh Graduate)</option>
                          <option value="1">1 year</option>
                          <option value="2">2 years</option>
                          <option value="3">3 years</option>
                          <option value="4">4 years</option>
                          <option value="5">5 years</option>
                          <option value="5+">5+ years</option>
                        </BFormSelect>
                        <BFormInvalidFeedback>
                          {{ errors.job_experience }}
                        </BFormInvalidFeedback>
                      </div>

                      <div class="form-group mt-3">
                        <label class="form-label fw-medium">
                          Application Deadline
                          <span class="text-danger">*</span>
                        </label>
                        <flat-pickr
                          v-model="form.deadline"
                          :config="defaultDateConfig"
                          class="form-control"
                          :class="{ 'is-invalid': errors.deadline }"
                          placeholder="Select last apply date"
                        ></flat-pickr>
                        <BFormInvalidFeedback>
                          {{ errors.deadline }}
                        </BFormInvalidFeedback>
                      </div>

                      <div class="form-group mt-3">
                        <label class="form-label fw-medium">
                          Salary Range
                          <span class="text-muted">(optional)</span>
                        </label>
                        <BFormSelect
                          v-model="form.salary"
                          :options="salaryOptions"
                          class="form-control"
                          :state="validateField('salary')"
                        />
                        <BFormInvalidFeedback>
                          {{ errors.salary }}
                        </BFormInvalidFeedback>
                      </div>

                      <!-- Personnel Needed -->
                      <div class="form-group mt-3">
                        <label class="form-label fw-medium">
                          Personnel Needed <span class="text-danger">*</span>
                        </label>
                        <BFormSelect
                          v-model="form.personnel_needed"
                          :options="personnelOptions"
                          class="form-control"
                          :state="validateField('personnel_needed')"
                        />
                        <BFormInvalidFeedback>
                          {{ errors.personnel_needed }}
                        </BFormInvalidFeedback>
                      </div>

                      <div class="form-group mt-3">
                        <label class="form-label fw-medium">
                          Status <span class="text-danger">*</span>
                        </label>
                        <div>
                          <div class="form-check form-check-inline">
                            <input
                              class="form-check-input"
                              type="radio"
                              id="active"
                              :value="true"
                              v-model="form.is_active"
                            />
                            <label class="form-check-label" for="active"
                              >Open</label
                            >
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
                              >Close</label
                            >
                          </div>
                        </div>
                      </div>
                    </BCardBody>
                  </BCard>
                </BCol>

                <!-- Right Column -->
                <BCol xl="8">
                  <BCard no-body>
                    <BCardHeader class="align-items-center d-flex">
                      <BCardTitle class="mb-0"> Job Content </BCardTitle>
                    </BCardHeader>

                    <BCardBody>
                      <div class="form-group">
                        <label class="form-label fw-medium">
                          Job Description <span class="text-danger">*</span>
                        </label>
                        <div class="ckeditor-classic">
                          <Ckeditor
                            v-model="form.content"
                            :editor="ClassicEditor"
                            :config="editorConfig"
                          />
                        </div>
                        <div
                          v-if="errors.content"
                          class="invalid-feedback d-block"
                        >
                          {{ errors.content }}
                        </div>
                      </div>
                    </BCardBody>
                  </BCard>

                  <!-- Submit Button Section -->
                  <BCard no-body class="mt-4">
                    <BCardBody
                      class="d-flex justify-content-between align-items-center"
                    >
                      <BButton
                        variant="outline-secondary"
                        @click="handleReset"
                        :disabled="submitting"
                      >
                        <i class="ri-refresh-line me-2"></i>
                        Reset Form
                      </BButton>

                      <BButton
                        type="submit"
                        variant="primary"
                        :disabled="submitting"
                      >
                        <BSpinner small v-if="submitting" class="me-2" />
                        <i
                          v-if="!submitting"
                          class="ri-send-plane-fill me-2"
                        ></i>
                        {{ submitting ? "Submitting..." : "Publish Job" }}
                      </BButton>
                    </BCardBody>
                  </BCard>
                </BCol>
              </BRow>
            </BForm>
          </BCardBody>
        </BCard>
      </BCol>
    </BRow>
  </Layout>
</template>

<script setup>
import { ref } from "vue";
import Layout from "@/layouts/main.vue";
import PageHeader from "@/components/page-header";
import { useRouter } from "vue-router";

import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";

// ✅ CKEditor
import { Ckeditor } from "@ckeditor/ckeditor5-vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useJobFilters } from "@/helpers/useJobFilters";

import Toast from "@/helpers/Toast";
import { createJobVacancy } from "@/api-request";

const router = useRouter();

const {
  categoryDetails,
  locationDetails,
  typeDetails,
  levelDetails,
  qualificationDetails,
  getSubCategoriesByCategory,
} = useJobFilters();

const defaultDateConfig = {
  dateFormat: "d M, Y",
  defaultDate: "",
  minDate: "today",
};

const editorConfig = {
  toolbar: [
    "undo",
    "redo",
    "|",
    "heading",
    "|",
    "bold",
    "italic",
    "link",
    "bulletedList",
    "numberedList",
    "blockQuote",
  ],
};

// ✅ Form data and validation
const submitting = ref(false);
const form = ref({
  title: "",
  content: "<p>Type your job description here...</p>",
  job_category: "",
  job_sub_category: [],
  job_location: "",
  job_type: "",
  job_qualify: "",
  job_level: "",
  job_experience: "",
  salary: "",
  deadline: "",
  personnel_needed: 1,
  is_active: false,
});

const formData = {
  title: "",
  content: "<p>Type your job description here...</p>",
  job_category: "",
  job_sub_category: [],
  job_location: "",
  job_type: "",
  job_qualify: "",
  job_level: "",
  job_experience: "",
  salary: "",
  deadline: "",
  personnel_needed: 1,
  is_active: false,
};

const errors = ref({});

// Validation function
const validateField = (fieldName) => {
  if (!errors.value[fieldName]) return null;
  return false;
};

const handleCategoryChange = () => {
  form.value.job_sub_category = [];
};

// ✅ Salary Options (₱10k → ₱200k)
const salaryOptions = [{ value: "", text: "Select salary range" }];
for (let i = 10000; i < 200000; i += 10000) {
  salaryOptions.push({
    value: `${i}-${i + 10000}`,
    text: `₱${i.toLocaleString()} - ₱${(i + 10000).toLocaleString()} / month`,
  });
}
salaryOptions.push({ value: "200000+", text: "₱200,000+ / month" });

// ✅ Personnel Options (1–100)
const personnelOptions = [{ value: "", text: "Select number of personnel" }];
for (let i = 1; i <= 100; i++) {
  personnelOptions.push({
    value: i,
    text: `${i} ${i === 1 ? "Person" : "People"}`,
  });
}
personnelOptions.push({ value: "100+", text: "100+ People" });

const handleSubmit = async () => {
  submitting.value = true;
  errors.value = {};

  try {
    const response = await createJobVacancy(form.value);

    Toast.fire({
      icon: "success",
      title: response?.message || "Job created successfully!",
    });

    handleReset();

    setTimeout(() => {
      router.push("/manage-jobs/job-lists");
    }, 3000);
  } catch (error) {
    console.error("Submit Error:", error);

    // Handle backend validation errors
    if (error.response?.data?.errors) {
      const backendErrors = error.response.data.errors;

      // flatten to first message
      Object.keys(backendErrors).forEach((field) => {
        backendErrors[field] = backendErrors[field][0];
      });

      errors.value = backendErrors;

      Toast.fire({
        icon: "error",
        title: "Please fix the validation errors below",
      });
    } else {
      Toast.fire({
        icon: "error",
        title:
          error.response?.data?.message ||
          "An error occurred while processing.",
      });
    }
  } finally {
    submitting.value = false;
  }
};

const handleReset = () => {
  form.value = { ...formData };
  errors.value = {};
};
</script>
