<template>
  <div
    class="auth-page-wrapper auth-bg-cover py-5 d-flex justify-content-center align-items-center min-vh-100"
  >
    <div class="bg-overlay"></div>
    <div class="auth-page-content overflow-hidden pt-lg-5">
      <BContainer>
        <BRow class="justify-content-center">
          <BCol lg="8" xl="8">
            <BCard no-body class="overflow-hidden border-0 shadow">
              <BRow class="g-0">
                <BCol lg="12">
                  <div class="p-lg-5 p-4">
                    <!-- Header Section -->
                    <div class="text-center mb-5">
                      <div class="avatar-lg mx-auto mb-3">
                        <div
                          class="avatar-title bg-light text-primary rounded-circle"
                        >
                          <i class="ri-user-add-line fs-2"></i>
                        </div>
                      </div>
                      <h4 class="text-primary fw-bold">
                        Create Your Job Seeker Account
                      </h4>
                      <p class="text-muted mb-0">
                        Join our job portal and start your career journey today.
                      </p>
                    </div>

                    <!-- Registration Form -->
                    <form @submit.prevent="handleSubmit">
                      <!-- Personal Information Section -->
                      <div class="mb-4">
                        <h6 class="text-primary mb-3 border-bottom pb-2">
                          <i class="ri-user-line me-2"></i>Personal Information
                        </h6>
                        <BRow>
                          <BCol md="6" class="mb-3">
                            <label for="name" class="form-label fw-semibold">
                              Full Name <span class="text-danger">*</span>
                            </label>
                            <input
                              id="name"
                              type="text"
                              class="form-control"
                              :class="{ 'is-invalid': errors.name }"
                              placeholder="Juan Dela Cruz"
                              v-model="form.name"
                              :disabled="submitting"
                            />
                            <BFormInvalidFeedback v-if="errors.name">
                              {{ errors.name }}
                            </BFormInvalidFeedback>
                          </BCol>

                          <BCol md="6" class="mb-3">
                            <label for="email" class="form-label fw-semibold">
                              Email Address <span class="text-danger">*</span>
                            </label>
                            <input
                              id="email"
                              type="email"
                              class="form-control"
                              :class="{ 'is-invalid': errors.email }"
                              placeholder="juan.delacruz@example.com"
                              v-model="form.email"
                              :disabled="submitting"
                            />
                            <BFormInvalidFeedback v-if="errors.email">
                              {{ errors.email }}
                            </BFormInvalidFeedback>
                          </BCol>
                        </BRow>
                      </div>

                      <!-- Account Security Section -->
                      <div class="mb-4">
                        <h6 class="text-primary mb-3 border-bottom pb-2">
                          <i class="ri-shield-keyhole-line me-2"></i>Account
                          Security
                        </h6>
                        <BRow>
                          <BCol md="6" class="mb-3">
                            <label
                              for="password"
                              class="form-label fw-semibold"
                            >
                              Password <span class="text-danger">*</span>
                            </label>
                            <div class="position-relative">
                              <input
                                id="password"
                                :type="showPassword ? 'text' : 'password'"
                                class="form-control pe-5"
                                :class="{ 'is-invalid': errors.password }"
                                placeholder="Create a strong password"
                                v-model="form.password"
                                :disabled="submitting"
                              />
                              <BButton
                                variant="link"
                                class="position-absolute end-0 top-0 text-decoration-none text-muted p-2"
                                @click="showPassword = !showPassword"
                                type="button"
                                :disabled="submitting"
                              >
                                <i
                                  :class="
                                    showPassword
                                      ? 'ri-eye-off-fill'
                                      : 'ri-eye-fill'
                                  "
                                  class="fs-5"
                                ></i>
                              </BButton>
                            </div>
                            <div class="form-text">
                              Use 8+ characters with mix of letters, numbers &
                              symbols
                            </div>
                            <BFormInvalidFeedback v-if="errors.password">
                              {{ errors.password }}
                            </BFormInvalidFeedback>
                          </BCol>

                          <BCol md="6" class="mb-3">
                            <label
                              for="password_confirmation"
                              class="form-label fw-semibold"
                            >
                              Confirm Password
                              <span class="text-danger">*</span>
                            </label>
                            <div class="position-relative">
                              <input
                                id="password_confirmation"
                                :type="
                                  showConfirmPassword ? 'text' : 'password'
                                "
                                class="form-control pe-5"
                                :class="{
                                  'is-invalid': errors.password_confirmation,
                                }"
                                placeholder="Re-enter your password"
                                v-model="form.password_confirmation"
                                :disabled="submitting"
                              />
                              <BButton
                                variant="link"
                                class="position-absolute end-0 top-0 text-decoration-none text-muted p-2"
                                @click="
                                  showConfirmPassword = !showConfirmPassword
                                "
                                type="button"
                                :disabled="submitting"
                              >
                                <i
                                  :class="
                                    showConfirmPassword
                                      ? 'ri-eye-off-fill'
                                      : 'ri-eye-fill'
                                  "
                                  class="fs-5"
                                ></i>
                              </BButton>
                            </div>
                            <BFormInvalidFeedback
                              v-if="errors.password_confirmation"
                            >
                              {{ errors.password_confirmation }}
                            </BFormInvalidFeedback>
                          </BCol>
                        </BRow>
                      </div>

                      <!-- Contact Information Section -->
                      <div class="mb-4">
                        <h6 class="text-primary mb-3 border-bottom pb-2">
                          <i class="ri-contacts-line me-2"></i>Contact
                          Information
                        </h6>
                        <BRow>
                          <BCol md="6" class="mb-3">
                            <label
                              for="telephone"
                              class="form-label fw-semibold"
                            >
                              Phone Number <span class="text-danger">*</span>
                            </label>
                            <input
                              id="telephone"
                              type="tel"
                              class="form-control"
                              :class="{ 'is-invalid': errors.telephone }"
                              placeholder="+63 912 345 6789"
                              v-model="form.telephone"
                              :disabled="submitting"
                            />
                            <BFormInvalidFeedback v-if="errors.telephone">
                              {{ errors.telephone }}
                            </BFormInvalidFeedback>
                          </BCol>

                          <BCol md="6" class="mb-3">
                            <label
                              for="date_of_birth"
                              class="form-label fw-semibold"
                            >
                              Date of Birth <span class="text-danger">*</span>
                            </label>
                            <input
                              id="date_of_birth"
                              type="date"
                              class="form-control"
                              :class="{ 'is-invalid': errors.date_of_birth }"
                              v-model="form.date_of_birth"
                              :disabled="submitting"
                            />
                            <BFormInvalidFeedback v-if="errors.date_of_birth">
                              {{ errors.date_of_birth }}
                            </BFormInvalidFeedback>
                          </BCol>

                          <BCol md="6" class="mb-3">
                            <label for="gender" class="form-label fw-semibold">
                              Gender <span class="text-danger">*</span>
                            </label>
                            <select
                              id="gender"
                              class="form-select"
                              :class="{ 'is-invalid': errors.gender }"
                              v-model="form.gender"
                              :disabled="submitting"
                            >
                              <option value="">Select gender</option>
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                              <option value="other">Other</option>
                              <option value="prefer_not_to_say">
                                Prefer not to say
                              </option>
                            </select>
                            <BFormInvalidFeedback v-if="errors.gender">
                              {{ errors.gender }}
                            </BFormInvalidFeedback>
                          </BCol>

                          <BCol md="12" class="mb-3">
                            <label for="address" class="form-label fw-semibold">
                              Complete Address
                            </label>
                            <textarea
                              id="address"
                              class="form-control"
                              :class="{ 'is-invalid': errors.address }"
                              rows="2"
                              placeholder="Enter your complete address including city and province"
                              v-model="form.address"
                              :disabled="submitting"
                            ></textarea>
                            <BFormInvalidFeedback v-if="errors.address">
                              {{ errors.address }}
                            </BFormInvalidFeedback>
                          </BCol>
                        </BRow>
                      </div>

                      <!-- Education & Skills Section -->
                      <div class="mb-4">
                        <h6 class="text-primary mb-3 border-bottom pb-2">
                          <i class="ri-graduation-cap-line me-2"></i>Education &
                          Skills
                        </h6>
                        <BRow>
                          <BCol md="6" class="mb-3">
                            <label
                              for="education_level"
                              class="form-label fw-semibold"
                            >
                              Education Level
                            </label>
                            <select
                              id="education_level"
                              class="form-select"
                              :class="{ 'is-invalid': errors.education_level }"
                              v-model="form.education_level"
                              :disabled="submitting"
                            >
                              <option value="">Select education level</option>
                              <option
                                v-for="level in qualificationDetails"
                                :key="level.id"
                                :value="level.name"
                              >
                                {{ level.name }}
                              </option>
                            </select>
                            <BFormInvalidFeedback v-if="errors.education_level">
                              {{ errors.education_level }}
                            </BFormInvalidFeedback>
                          </BCol>

                          <BCol md="6" class="mb-3">
                            <label
                              for="field_of_study"
                              class="form-label fw-semibold"
                            >
                              Field of Study
                            </label>
                            <input
                              id="field_of_study"
                              type="text"
                              class="form-control"
                              :class="{ 'is-invalid': errors.field_of_study }"
                              placeholder="e.g. Computer Science, Business Administration"
                              v-model="form.field_of_study"
                              :disabled="submitting"
                            />
                            <BFormInvalidFeedback v-if="errors.field_of_study">
                              {{ errors.field_of_study }}
                            </BFormInvalidFeedback>
                          </BCol>

                          <BCol md="12" class="mb-3">
                            <label
                              for="skillsInput"
                              class="form-label fw-semibold"
                            >
                              Skills & Expertise
                            </label>
                            <Multiselect
                              v-model="form.skills"
                              id="skillsInput"
                              mode="tags"
                              :close-on-select="false"
                              :searchable="true"
                              :create-option="true"
                              :options="skillDetails"
                              value-prop="name"
                              track-by="name"
                              label="name"
                              :class="{ 'is-invalid': errors.skills }"
                              placeholder="Select or type your skills (e.g. JavaScript, Project Management)"
                              :disabled="submitting"
                            />
                            <BFormInvalidFeedback v-if="errors.skills">
                              {{ errors.skills }}
                            </BFormInvalidFeedback>
                          </BCol>
                        </BRow>
                      </div>

                      <!-- Job Preferences Section -->
                      <div class="mb-4">
                        <h6 class="text-primary mb-3 border-bottom pb-2">
                          <i class="ri-briefcase-line me-2"></i>Job Preferences
                        </h6>
                        <BRow>
                          <BCol md="6" class="mb-3">
                            <label
                              for="preferred_location"
                              class="form-label fw-semibold"
                            >
                              Preferred Location
                            </label>
                            <input
                              id="preferred_location"
                              type="text"
                              class="form-control"
                              :class="{
                                'is-invalid': errors.preferred_location,
                              }"
                              placeholder="e.g. Manila, Cebu, Remote, Hybrid"
                              v-model="form.preferred_location"
                              disabled
                            />
                            <BFormInvalidFeedback
                              v-if="errors.preferred_location"
                            >
                              {{ errors.preferred_location }}
                            </BFormInvalidFeedback>
                          </BCol>

                          <BCol md="6" class="mb-3">
                            <label class="form-label fw-medium">
                              Expected Salary (₱)
                              <span class="text-muted">(optional)</span>
                            </label>
                            <BFormSelect
                              v-model="form.expected_salary"
                              :options="salaryOptions"
                              :class="{
                                'is-invalid': errors.expected_salary,
                              }"
                            />
                            <BFormInvalidFeedback v-if="errors.expected_salary">
                              {{ errors.expected_salary }}
                            </BFormInvalidFeedback>
                          </BCol>

                          <BCol md="12" class="mb-3">
                            <label
                              for="servicesInput"
                              class="form-label fw-semibold"
                            >
                              Services Interest
                            </label>
                            <Multiselect
                              v-model="form.services"
                              id="servicesInput"
                              mode="tags"
                              :close-on-select="false"
                              :searchable="true"
                              :create-option="false"
                              :options="getSubCategoriesByCategory()"
                              :class="{ 'is-invalid': errors.services }"
                              placeholder="Select services you're interested in"
                              :disabled="submitting"
                            />
                            <BFormInvalidFeedback v-if="errors.services">
                              {{ errors.services }}
                            </BFormInvalidFeedback>
                          </BCol>
                        </BRow>
                      </div>

                      <!-- File Upload Section -->
                      <div class="mb-4">
                        <h6 class="text-primary mb-3 border-bottom pb-2">
                          <i class="ri-file-upload-line me-2"></i>Upload
                          Documents
                        </h6>

                        <!-- File Input -->
                        <div class="mb-3">
                          <label class="form-label fw-semibold">
                            Supporting Documents
                            <span class="text-muted">(Optional)</span>
                          </label>
                          <input
                            type="file"
                            class="form-control"
                            multiple
                            accept=".pdf,.jpg,.jpeg,.png"
                            @change="handleFileSelect"
                            :disabled="submitting"
                          />
                          <div class="form-text">
                            Supported formats: PDF, JPG, PNG (Max 5MB per file)
                          </div>
                          <BFormInvalidFeedback v-if="errors.files">
                            {{ errors.files }}
                          </BFormInvalidFeedback>
                        </div>

                        <!-- Selected Files Preview -->
                        <div
                          v-if="form.files.length > 0"
                          class="selected-files mt-3"
                        >
                          <h6 class="fs-14 mb-2">Selected Files:</h6>
                          <div class="d-flex flex-wrap gap-2">
                            <div
                              v-for="(file, index) in form.files"
                              :key="index"
                              class="file-item bg-light rounded p-2 d-flex align-items-center"
                            >
                              <i
                                class="ri-file-text-line text-primary me-2"
                              ></i>
                              <span class="file-name fs-13">{{
                                file.name
                              }}</span>
                              <BButton
                                variant="link"
                                class="text-danger p-0 ms-2"
                                @click="removeFile(index)"
                                :disabled="submitting"
                              >
                                <i class="ri-close-circle-fill"></i>
                              </BButton>
                            </div>
                          </div>
                        </div>
                      </div>

                      <!-- Submit Button -->
                      <div class="mt-4">
                        <BButton
                          variant="primary"
                          size="lg"
                          class="w-100 py-3 fw-semibold"
                          type="submit"
                          :disabled="submitting"
                        >
                          <template v-if="submitting">
                            <span
                              class="spinner-border spinner-border-sm me-2"
                            ></span>
                            Creating Account...
                          </template>
                          <template v-else>
                            <i class="ri-user-add-line me-2"></i>
                            Create My Account
                          </template>
                        </BButton>
                      </div>
                    </form>

                    <!-- Login Link -->
                    <div class="mt-4 text-center">
                      <p class="mb-0 text-muted">
                        Already have an account?
                        <router-link
                          to="/login"
                          class="fw-semibold text-primary text-decoration-underline"
                        >
                          Sign in here
                        </router-link>
                      </p>
                    </div>
                  </div>
                </BCol>
              </BRow>
            </BCard>
          </BCol>
        </BRow>
      </BContainer>
    </div>

    <!-- Footer -->
    <footer class="footer">
      <BContainer>
        <BRow>
          <BCol lg="12">
            <div class="text-center">
              <p class="mb-0 text-muted">
                &copy; {{ new Date().getFullYear() }} CDC Job Portal. Crafted
                with <i class="ri-heart-fill text-danger"></i> by CDC I.T Team
              </p>
            </div>
          </BCol>
        </BRow>
      </BContainer>
    </footer>
  </div>

  <!-- ✅ Enhanced Data Privacy Consent Modal -->
  <BModal
    v-model="showPrivacyModal"
    title="Data Privacy Consent"
    hide-footer
    hide-header-close
    centered
    size="lg"
    static
    no-close-on-esc
    no-close-on-backdrop
    class="v-modal-custom privacy-consent-modal"
    header-class="border-bottom-0 pb-0"
    body-class="pt-0"
  >
    <div class="text-center px-2">
      <!-- Improved Animation/Icon -->
      <div class="privacy-icon-wrapper mb-4">
        <lottie
          colors="primary:#405189,secondary:#0ab39c"
          trigger="loop"
          :options="privacyAnimationOptions"
          :height="120"
          :width="120"
        />
      </div>

      <!-- Main Content -->
      <div class="privacy-content">
        <h5 class="text-primary mb-3">Data Privacy Agreement</h5>

        <!-- Key Points -->
        <div class="privacy-points text-start mb-4">
          <div class="d-flex align-items-start mb-3">
            <div class="flex-shrink-0">
              <i class="ri-shield-check-fill text-success fs-5"></i>
            </div>
            <div class="flex-grow-1 ms-3">
              <h6 class="fs-14 mb-1">Data Collection Purpose</h6>
              <p class="text-muted mb-0 fs-13">
                Your personal data will be collected and processed solely for
                recruitment, employment, and job matching purposes within our
                platform.
              </p>
            </div>
          </div>

          <div class="d-flex align-items-start mb-3">
            <div class="flex-shrink-0">
              <i class="ri-lock-fill text-info fs-5"></i>
            </div>
            <div class="flex-grow-1 ms-3">
              <h6 class="fs-14 mb-1">Data Protection</h6>
              <p class="text-muted mb-0 fs-13">
                We implement appropriate security measures to protect your data
                from unauthorized access, disclosure, or misuse.
              </p>
            </div>
          </div>

          <div class="d-flex align-items-start">
            <div class="flex-shrink-0">
              <i class="ri-user-settings-fill text-warning fs-5"></i>
            </div>
            <div class="flex-grow-1 ms-3">
              <h6 class="fs-14 mb-1">Your Rights</h6>
              <p class="text-muted mb-0 fs-13">
                You have the right to access, correct, update, or request
                deletion of your personal data at any time in accordance with
                applicable laws.
              </p>
            </div>
          </div>
        </div>

        <!-- Legal Notice -->
        <div class="legal-notice bg-light rounded p-3 mb-4">
          <p class="text-muted mb-2 fs-13">
            By clicking "I Agree", you acknowledge that you have read and
            understood our
            <BLink
              href="#"
              class="text-primary fw-semibold"
              @click="openPrivacyPolicy"
              >Data Privacy Policy</BLink
            >
            and consent to the collection, processing, and storage of your
            personal data as described above.
          </p>
        </div>

        <!-- Action Buttons -->
        <div class="d-flex justify-content-center gap-3 mt-4">
          <BButton
            variant="outline-secondary"
            @click="declinePrivacy"
            class="px-4"
          >
            <i class="ri-close-line me-2"></i>
            I Disagree
          </BButton>
          <BButton variant="primary" @click="acceptPrivacy" class="px-4">
            <i class="ri-check-line me-2"></i>
            I Agree & Continue
          </BButton>
        </div>

        <!-- Additional Info -->
        <div class="mt-3">
          <small class="text-muted">
            Need help? Contact our
            <BLink
              href="#"
              class="text-primary"
              @click="openDataProtectionOffice"
              >Data Protection Office</BLink
            >
          </small>
        </div>
      </div>
    </div>
  </BModal>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";

import Lottie from "@/components/widgets/lottie.vue";
import animationData2 from "@/components/widgets/tdrtiskw.json";

import { useJobFilters } from "@/helpers/useJobFilters";
import Toast from "@/helpers/Toast";

import { register } from "@/api-request";

const { skillDetails, qualificationDetails, getSubCategoriesByCategory } =
  useJobFilters();

const showPrivacyModal = ref(true);
const router = useRouter();
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const submitting = ref(false);

const privacyAnimationOptions = { animationData: animationData2 };
const acceptPrivacy = () => {
  showPrivacyModal.value = false;
};

const declinePrivacy = () => {
  router.go(-1);
};

// Form data
const form = ref({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
  telephone: "",
  address: "",
  date_of_birth: "",
  gender: "",
  education_level: "",
  field_of_study: "",
  skills: [],
  services: [],
  files: [],
  preferred_location: "Clark Freeport Zone",
  expected_salary: "",
});

// Data options
const errors = ref({});

const openPrivacyPolicy = () => {
  console.log("test");
};

const openDataProtectionOffice = () => {
  console.log("test");
};

const salaryOptions = [{ value: "", text: "Select salary range" }];
for (let i = 10000; i < 200000; i += 10000) {
  salaryOptions.push({
    value: `${i}-${i + 10000}`,
    text: `₱${i.toLocaleString()} - ₱${(i + 10000).toLocaleString()} / month`,
  });
}
salaryOptions.push({ value: "200000+", text: "₱200,000+ / month" });

// Handle form submission
const handleSubmit = async () => {
  // Clear previous errors
  errors.value = {};
  submitting.value = true;

  try {
    // Create FormData for file upload
    const formData = new FormData();

    // Append all form fields
    Object.keys(form.value).forEach((key) => {
      if (key === "files") {
        // Append each file individually
        form.value.files.forEach((file) => {
          formData.append("files[]", file);
        });
      } else if (Array.isArray(form.value[key])) {
        // Handle arrays (skills, services)
        form.value[key].forEach((item) => {
          formData.append(`${key}[]`, item);
        });
      } else {
        // Handle regular fields
        formData.append(key, form.value[key]);
      }
    });

    const response = await register(formData);

    Toast.fire({
      icon: "success",
      title: response?.message || "Account created successfully!",
    });

    // Reset form
    resetForm();

    // Redirect to login page after successful registration
    setTimeout(() => {
      router.push("/login");
    }, 2000);
  } catch (error) {
    console.error("Registration Error:", error);

    // Handle backend validation errors
    if (error.response?.data?.errors) {
      const backendErrors = error.response.data.errors;

      // Flatten to first message per field
      Object.keys(backendErrors).forEach((field) => {
        errors.value[field] = Array.isArray(backendErrors[field])
          ? backendErrors[field][0]
          : backendErrors[field];
      });

      Toast.fire({
        icon: "error",
        title: "Please fix the validation errors below",
      });
    } else {
      Toast.fire({
        icon: "error",
        title:
          error.response?.data?.message ||
          "An error occurred while creating your account. Please try again.",
      });
    }
  } finally {
    submitting.value = false;
  }
};

// Reset form
const resetForm = () => {
  form.value = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    telephone: "",
    address: "",
    date_of_birth: "",
    gender: "",
    education_level: "",
    field_of_study: "",
    skills: [],
    services: [],
    files: [],
    preferred_location: "",
    expected_salary: "",
  };
};

// Handle file selection
const handleFileSelect = (event) => {
  const selectedFiles = Array.from(event.target.files);

  // Validate files
  const validFiles = selectedFiles.filter((file) => {
    const isValidType = validateFileType(file);
    const isValidSize = validateFileSize(file);

    if (!isValidType) {
      Toast.fire({
        icon: "error",
        title: `Invalid file type: ${file.name}. Supported types: PDF, JPG, PNG`,
      });
      return false;
    }

    if (!isValidSize) {
      Toast.fire({
        icon: "error",
        title: `File too large: ${file.name}. Max size: 5MB`,
      });
      return false;
    }

    return true;
  });

  // Add valid files to form
  form.value.files = [...form.value.files, ...validFiles];

  // Reset input
  event.target.value = "";
};

// Validate file type
const validateFileType = (file) => {
  const allowedTypes = [
    "application/pdf",
    // "application/msword",
    // "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "image/jpeg",
    "image/jpg",
    "image/png",
  ];
  return allowedTypes.includes(file.type);
};

// Validate file size (5MB max)
const validateFileSize = (file) => {
  const maxSize = 5 * 1024 * 1024; // 5MB in bytes
  return file.size <= maxSize;
};

// Remove file from selection
const removeFile = (index) => {
  form.value.files.splice(index, 1);
};
</script>

<style scoped>
.avatar-lg {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.shadow {
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
}

.border-0 {
  border: 0 !important;
}
</style>
