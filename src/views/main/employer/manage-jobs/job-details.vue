<template>
  <Layout>
    <BRow v-if="!isLoading && details">
      <BCol lg="12">
        <BCard no-body class="mt-n4 mx-n4">
          <div class="bg-warning-subtle">
            <BCardBody class="px-4 pb-4">
              <!-- Header Row -->
              <BRow class="align-items-center justify-content-between mb-3">
                <!-- Left side: Job / Company Info -->
                <BCol md="auto">
                  <BRow class="align-items-center g-3">
                    <BCol md="auto">
                      <div class="avatar-md">
                        <div class="avatar-title bg-white rounded-circle">
                          <img
                            :src="
                              details.company?.avatar
                                ? `${storageBaseUrl()}/${
                                    details.company?.avatar
                                  }`
                                : require('@/assets/images/task.png')
                            "
                            alt="logo"
                            class="avatar-md rounded-circle"
                          />
                        </div>
                      </div>
                    </BCol>

                    <BCol md>
                      <div>
                        <h4 class="fw-bold mb-1">{{ details.title }}</h4>
                        <div class="hstack gap-3 flex-wrap text-muted">
                          <div>
                            <i class="ri-building-line me-1 align-bottom"></i>
                            {{ details.company.name || "N/A" }}
                          </div>
                          <div class="vr"></div>
                          <div>
                            <i class="ri-map-pin-2-line me-1 align-bottom"></i>
                            {{ details.job_location || "N/A" }}
                          </div>
                          <div class="vr"></div>
                          <div>
                            <i class="ri-eye-line me-1 align-bottom"></i>
                            {{ details.views || 0 }} Views
                          </div>
                          <div class="vr"></div>

                          <!-- ⭐ Existing Average Rating + Interactive Rating -->
                          <div class="d-flex align-items-center">
                            <i
                              class="ri-star-fill me-1 align-bottom text-warning"
                            ></i>
                            {{ details.average_rate || 0 }} Rating
                            <div class="vr mx-2"></div>

                            <!-- Interactive Rating -->
                            <div
                              class="d-flex align-items-center"
                              v-if="userType === 'job_seeker'"
                            >
                              <span
                                v-for="star in 5"
                                :key="star"
                                @click="rateJob(star)"
                                class="me-1"
                                style="cursor: pointer"
                              >
                                <i
                                  :class="[
                                    'ri-star-fill',
                                    star <= userRating
                                      ? 'text-warning'
                                      : 'text-muted',
                                  ]"
                                ></i>
                              </span>
                              <small class="ms-2 text-muted">
                                (Your rating: {{ userRating }})
                              </small>
                            </div>
                          </div>
                        </div>

                        <div class="hstack gap-3 mt-2 flex-wrap">
                          <div>
                            Post Date:
                            <span class="fw-medium">{{
                              formatShortDate(details.post_at)
                            }}</span>
                          </div>
                          <div class="vr"></div>
                          <div class="badge rounded-pill bg-success fs-12">
                            {{ details.job_type || "Unknown" }}
                          </div>
                        </div>
                      </div>
                    </BCol>
                  </BRow>
                </BCol>

                <!-- Right side: Action Buttons -->
                <BCol md="auto" class="text-end mt-3">
                  <div class="d-flex gap-2 flex-wrap">
                    <BButton
                      variant="outline-secondary"
                      class="d-flex align-items-center"
                      @click="$router.back()"
                    >
                      <i class="ri-arrow-left-line me-1"></i> Back
                    </BButton>

                    <BButton
                      variant="primary"
                      class="d-flex align-items-center apply-btn"
                      @click="openApplyModal"
                      v-if="userType === 'job_seeker' && !details.is_applied"
                    >
                      <i class="ri-send-plane-line me-2"></i>
                      <span class="fw-semibold">Apply Now</span>
                      <BBadge variant="light" class="ms-2 pulse-badge"
                        >Quick Apply</BBadge
                      >
                    </BButton>

                    <BButton
                      variant="outline-success"
                      class="d-flex align-items-center applied-btn"
                      disabled
                      v-if="userType === 'job_seeker' && details.is_applied"
                    >
                      <i class="ri-check-double-line me-2"></i>
                      <span class="fw-semibold">Application Sent</span>
                      <BBadge variant="success" class="ms-2">
                        <i class="ri-checkbox-circle-fill me-1"></i>Confirmed
                      </BBadge>
                    </BButton>
                  </div>
                </BCol>
              </BRow>
            </BCardBody>
          </div>
        </BCard>
      </BCol>
    </BRow>

    <!-- Apply Now Modal -->
    <BModal
      v-model="showApplyModal"
      title="Apply for this Job"
      size="lg"
      class="v-modal-custom"
      hide-footer
    >
      <form @submit.prevent="submitApplication">
        <BFormGroup label="Cover Letter" label-for="coverLetter">
          <BFormTextarea
            id="coverLetter"
            v-model="form.coverLetter"
            rows="5"
            placeholder="Write a short cover letter explaining why you're a great fit..."
            :disabled="isSubmitting"
          ></BFormTextarea>
        </BFormGroup>

        <BFormGroup label="Attach Resume / Supporting Files" class="mt-3">
          <BFormFile
            v-model="form.files"
            multiple
            accept=".pdf,.doc,.docx,.jpg,.png"
            placeholder="Choose one or more files..."
            :disabled="isSubmitting"
          ></BFormFile>
          <small class="text-muted"
            >You can attach multiple files (PDF, DOC, DOCX, JPG, PNG)</small
          >

          <!-- Preview selected files -->
          <ul
            v-if="form.files && form.files.length"
            class="mt-2 list-unstyled small text-muted"
          >
            <li v-for="(file, index) in form.files" :key="index">
              <i class="ri-attachment-line me-1"></i> {{ file.name }}
            </li>
          </ul>
        </BFormGroup>

        <div class="hstack gap-2 justify-content-end">
          <BButton
            variant="secondary"
            class="me-2"
            @click="showApplyModal = false"
          >
            Cancel
          </BButton>

          <BButton type="submit" variant="primary" :disabled="isSubmitting">
            <span v-if="isSubmitting" class="d-flex align-items-center">
              <span class="spinner-border spinner-border-sm me-2" role="status">
                <span class="visually-hidden">Loading...</span>
              </span>
              Loading...
            </span>
            <span v-else> Submit Application</span>
          </BButton>
        </div>
      </form>
    </BModal>

    <!-- Job content -->
    <BRow v-if="!isLoading && details" class="mt-n5">
      <BCol xxl="9">
        <BCard no-body>
          <BCardBody>
            <p v-html="details.content"></p>
          </BCardBody>
        </BCard>
      </BCol>

      <BCol xxl="3">
        <!-- Job Overview -->
        <BCard no-body>
          <BCardHeader>
            <h5 class="mb-0">Job Overview</h5>
          </BCardHeader>
          <BCardBody>
            <ul class="list-unstyled mb-0">
              <!-- Company -->
              <li class="d-flex align-items-center mb-3">
                <div class="flex-shrink-0 avatar-xs me-3">
                  <div
                    class="avatar-title bg-light text-primary rounded-circle fs-16"
                  >
                    <i class="ri-building-line"></i>
                  </div>
                </div>
                <div>
                  <small class="text-muted d-block">Company</small>
                  <span class="fw-semibold">{{
                    details.company?.name || "—"
                  }}</span>
                </div>
              </li>

              <!-- Location -->
              <li class="d-flex align-items-center mb-3">
                <div class="flex-shrink-0 avatar-xs me-3">
                  <div
                    class="avatar-title bg-light text-warning rounded-circle fs-16"
                  >
                    <i class="ri-map-pin-2-line"></i>
                  </div>
                </div>
                <div>
                  <small class="text-muted d-block">Location</small>
                  <span class="fw-semibold">{{
                    details.job_location || "—"
                  }}</span>
                </div>
              </li>

              <!-- Salary -->
              <li class="d-flex align-items-center mb-3">
                <div class="flex-shrink-0 avatar-xs me-3">
                  <div
                    class="avatar-title bg-light text-success rounded-circle fs-16"
                  >
                    <i class="ri-money-dollar-circle-line"></i>
                  </div>
                </div>
                <div>
                  <small class="text-muted d-block">Salary</small>
                  <span class="fw-semibold">{{ details.salary || "—" }}</span>
                </div>
              </li>

              <!-- Personnel Needed -->
              <li class="d-flex align-items-center mb-3">
                <div class="flex-shrink-0 avatar-xs me-3">
                  <div
                    class="avatar-title bg-light text-primary rounded-circle fs-16"
                  >
                    <i class="ri-group-line"></i>
                  </div>
                </div>
                <div>
                  <small class="text-muted d-block">Personnel Needed</small>
                  <span class="fw-semibold">{{
                    details.available || "—"
                  }}</span>
                </div>
              </li>

              <!-- Experience -->
              <li class="d-flex align-items-center mb-3">
                <div class="flex-shrink-0 avatar-xs me-3">
                  <div
                    class="avatar-title bg-light text-info rounded-circle fs-16"
                  >
                    <i class="ri-briefcase-line"></i>
                  </div>
                </div>
                <div>
                  <small class="text-muted d-block">Experience</small>
                  <span class="fw-semibold"
                    >{{ details.job_experience || "—" }} years</span
                  >
                </div>
              </li>

              <!-- Qualification -->
              <li class="d-flex align-items-center mb-3">
                <div class="flex-shrink-0 avatar-xs me-3">
                  <div
                    class="avatar-title bg-light text-danger rounded-circle fs-16"
                  >
                    <i class="ri-book-line"></i>
                  </div>
                </div>
                <div>
                  <small class="text-muted d-block">Qualification</small>
                  <span class="fw-semibold">{{
                    details.job_qualify || "—"
                  }}</span>
                </div>
              </li>

              <!-- Level -->
              <li class="d-flex align-items-center mb-3">
                <div class="flex-shrink-0 avatar-xs me-3">
                  <div
                    class="avatar-title bg-light text-secondary rounded-circle fs-16"
                  >
                    <i class="ri-bar-chart-line"></i>
                  </div>
                </div>
                <div>
                  <small class="text-muted d-block">Level</small>
                  <span class="fw-semibold">{{
                    details.job_level || "—"
                  }}</span>
                </div>
              </li>

              <!-- Category -->
              <li class="d-flex align-items-center mb-3">
                <div class="flex-shrink-0 avatar-xs me-3">
                  <div
                    class="avatar-title bg-light text-success rounded-circle fs-16"
                  >
                    <i class="ri-stack-line"></i>
                  </div>
                </div>
                <div>
                  <small class="text-muted d-block">Category</small>
                  <span class="fw-semibold">{{ details.category || "—" }}</span>
                </div>
              </li>

              <!-- Services / Sub-categories (Array) -->
              <li class="d-flex align-items-center">
                <div class="flex-shrink-0 avatar-xs me-3">
                  <div
                    class="avatar-title bg-light text-warning rounded-circle fs-16"
                  >
                    <i class="ri-service-line"></i>
                  </div>
                </div>
                <div>
                  <small class="text-muted d-block">Services</small>
                  <span class="fw-semibold">
                    {{
                      details.sub_categories?.length
                        ? details.sub_categories.join(", ")
                        : "—"
                    }}
                  </span>
                </div>
              </li>
            </ul>
          </BCardBody>
        </BCard>

        <!-- Company Info Card -->
        <BCard no-body class="mt-3">
          <BCardBody>
            <div class="text-center mb-4">
              <div class="avatar-sm mx-auto">
                <div class="avatar-title bg-warning-subtle rounded">
                  <img
                    :src="
                      details.company?.avatar
                        ? `${storageBaseUrl()}/${details.company?.avatar}`
                        : require('@/assets/images/task.png')
                    "
                    :alt="`${details.company?.name || 'Company'} logo`"
                    class="avatar-sm rounded-circle"
                  />
                </div>
              </div>
              <BLink href="#!">
                <h5 class="mt-3">{{ details.company?.name || "—" }}</h5>
              </BLink>
              <p class="text-muted">{{ details.company?.industry || "—" }}</p>
            </div>

            <ul class="list-unstyled mb-0">
              <!-- Company Size -->
              <li class="d-flex align-items-center mb-3">
                <div class="flex-shrink-0 avatar-xs me-3">
                  <div
                    class="avatar-title bg-light text-primary rounded-circle fs-16"
                  >
                    <i class="ri-building-line"></i>
                  </div>
                </div>
                <div>
                  <small class="text-muted d-block">Company Size</small>
                  <span class="fw-semibold">{{
                    details.company?.size || "—"
                  }}</span>
                </div>
              </li>

              <!-- Website -->
              <li class="d-flex align-items-center mb-3">
                <div class="flex-shrink-0 avatar-xs me-3">
                  <div
                    class="avatar-title bg-light text-success rounded-circle fs-16"
                  >
                    <i class="ri-global-line"></i>
                  </div>
                </div>
                <div>
                  <small class="text-muted d-block">Website</small>
                  <div class="d-flex flex-wrap gap-2 fs-15">
                    <template
                      v-if="
                        details.company?.website?.filter(
                          (site) => site.is_active && site.url
                        ).length
                      "
                    >
                      <BLink
                        v-for="site in details.company.website.filter(
                          (site) => site.is_active && site.url
                        )"
                        :key="site.id"
                        :href="site.url"
                        target="_blank"
                        class="badge bg-primary-subtle text-primary"
                      >
                        {{ site.name }}
                      </BLink>
                    </template>
                    <span v-else>—</span>
                  </div>
                </div>
              </li>

              <!-- Email -->
              <li class="d-flex align-items-center mb-3">
                <div class="flex-shrink-0 avatar-xs me-3">
                  <div
                    class="avatar-title bg-light text-danger rounded-circle fs-16"
                  >
                    <i class="ri-mail-line"></i>
                  </div>
                </div>
                <div>
                  <small class="text-muted d-block">Email</small>
                  <span class="fw-semibold">{{
                    details.company?.email || "—"
                  }}</span>
                </div>
              </li>

              <!-- Phone -->
              <li class="d-flex align-items-center mb-3">
                <div class="flex-shrink-0 avatar-xs me-3">
                  <div
                    class="avatar-title bg-light text-warning rounded-circle fs-16"
                  >
                    <i class="ri-phone-line"></i>
                  </div>
                </div>
                <div>
                  <small class="text-muted d-block">Phone</small>
                  <span class="fw-semibold">{{
                    details.company?.telephone || "—"
                  }}</span>
                </div>
              </li>

              <!-- Location -->
              <li class="d-flex align-items-center">
                <div class="flex-shrink-0 avatar-xs me-3">
                  <div
                    class="avatar-title bg-light text-info rounded-circle fs-16"
                  >
                    <i class="ri-map-pin-2-line"></i>
                  </div>
                </div>
                <div>
                  <small class="text-muted d-block">Location</small>
                  <span class="fw-semibold">{{
                    details.company?.location || "—"
                  }}</span>
                </div>
              </li>
            </ul>
          </BCardBody>
        </BCard>
      </BCol>
    </BRow>

    <!-- Loading -->
    <div v-if="isLoading" class="text-center my-5">
      <lottie
        class="avatar-xl"
        :options="defaultbox"
        :height="75"
        :width="75"
      />
      <h5 class="mt-3">Loading job details...</h5>
    </div>
  </Layout>
</template>

<script setup>
import Layout from "@/layouts/main.vue";
import { onMounted, ref, computed } from "vue";
import { useRoute } from "vue-router";
import { formatShortDate } from "@/helpers/useFormats";
import Lottie from "@/components/widgets/lottie.vue";
import Toast from "@/helpers/Toast";
import { storageBaseUrl } from "@/helpers/useFormats";

import animationBox from "@/components/widgets/pvbjsfif.json";
import {
  showSeekerJobList,
  updateSeekerJobList,
  storeSeekerJob,
} from "@/api-request";

// import animationPaper from "@/components/widgets/sygggnra.json";
// const defaultPeper = { animationData: animationPaper };

import { useStore } from "vuex";
const store = useStore();
const userType = computed(() => store.state.auth.user.user_type);

const route = useRoute();
const details = ref(null);
const isLoading = ref(false);
const showApplyModal = ref(false);
const isSubmitting = ref(false);
const defaultbox = { animationData: animationBox };

const form = ref({
  coverLetter: "",
  files: null,
});

const openApplyModal = () => {
  showApplyModal.value = true;
};

const jobCode = route.params.code;
const userRating = ref(0);

const submitApplication = async () => {
  isSubmitting.value = true;

  try {
    const formData = new FormData();
    formData.append("job_id", details.value.id);
    formData.append("coverLetter", form.value.coverLetter);

    if (form.value.files && form.value.files.length > 0) {
      for (const file of form.value.files) {
        formData.append("files[]", file);
      }
    }

    const response = await storeSeekerJob(formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    details.value = {
      ...details.value,
      is_applied: true,
    };

    Toast.fire({
      icon: "success",
      title: response?.message || "Application submitted successfully.",
    });

    showApplyModal.value = false;
    form.value = { coverLetter: "", files: null };
  } catch (error) {
    console.error(error);
    Toast.fire({
      icon: "error",
      title:
        error.response?.data?.message ||
        "An error occurred while submitting the application.",
    });
  } finally {
    isSubmitting.value = false;
  }
};

const rateJob = async (rating) => {
  userRating.value = rating;

  try {
    const response = await updateSeekerJobList(jobCode, {
      rate: rating,
    });

    details.value = {
      ...details.value,
      average_rate: response.data.average_rate,
    };

    Toast.fire({
      icon: "success",
      title: "Thank you for rating this job!",
    });
  } catch (error) {
    console.error(error);
    Toast.fire({
      icon: "error",
      title: "Failed to submit your rating",
    });
  }
};

const fetchDetails = async () => {
  isLoading.value = true;
  try {
    const response = await showSeekerJobList(jobCode);

    details.value = response.data;
    userRating.value = Number(response.data.seeker_rate) || 0;
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => fetchDetails());
</script>
