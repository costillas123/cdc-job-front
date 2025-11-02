<template>
  <Layout>
    <template v-if="!isLoading">
      <!-- background photo -->
      <div class="position-relative mx-n4 mt-n4">
        <div class="profile-wid-bg">
          <img
            :src="
              currentUser.cover_photo
                ? `${storageBaseUrl()}/${currentUser.cover_photo}`
                : coverDummy
            "
            alt=""
            class="profile-wid-img"
          />
        </div>
      </div>

      <div class="pt-4 mb-4 mb-lg-3 pb-lg-4 profile-wrapper">
        <BRow class="g-4">
          <!-- avatar -->
          <BCol cols="auto">
            <div
              class="profile-user position-relative d-inline-block mx-auto mb-4"
            >
              <img
                :src="
                  currentUser.avatar
                    ? `${storageBaseUrl()}/${currentUser.avatar}`
                    : userDummy
                "
                alt="user-img"
                class="rounded-circle avatar-xl img-thumbnail user-profile-image"
              />
            </div>
          </BCol>

          <BCol>
            <div class="p-2">
              <h3 class="text-white mb-1">{{ currentUser?.name }}</h3>
              <p class="text-white text-opacity-75">
                {{
                  currentUser?.address
                    ? currentUser?.address
                    : "No Address Found"
                }}
              </p>
              <div class="hstack text-white-50 gap-3">
                <div class="me-2 d-flex align-items-center">
                  <i
                    class="ri-mail-line me-1 text-white text-opacity-75 fs-16 align-middle"
                  ></i>
                  {{ currentUser?.email }}
                </div>
                <div class="d-flex align-items-center">
                  <i
                    class="ri-phone-line me-1 text-white text-opacity-75 fs-16 align-middle"
                  ></i>
                  {{ currentUser?.telephone }}
                </div>
              </div>
            </div>
          </BCol>

          <BCol
            cols="12"
            lg="auto"
            order-lg="0"
            class="order-last text-center text-white-50"
            v-if="userType !== 'admin'"
          >
            <div class="p-3 rounded bg-dark bg-opacity-25 d-inline-block">
              <!-- Icon -->
              <i
                class="fs-3 mb-2 d-block"
                :class="[
                  userType === 'job_seeker'
                    ? currentUser?.job_seeker?.is_available
                      ? 'ri-user-smile-line text-success'
                      : 'ri-user-unfollow-line text-secondary'
                    : currentUser?.is_verified
                    ? 'ri-shield-check-line text-success'
                    : 'ri-shield-cross-line text-secondary',
                ]"
              ></i>

              <!-- Status Text -->
              <h5
                class="mb-1 fw-semibold"
                :class="[
                  userType === 'job_seeker'
                    ? currentUser?.job_seeker?.is_available
                      ? 'text-success'
                      : 'text-secondary'
                    : currentUser?.is_verified
                    ? 'text-success'
                    : 'text-secondary',
                ]"
              >
                {{
                  userType === "job_seeker"
                    ? currentUser?.job_seeker?.is_available
                      ? "Available"
                      : "Not Available"
                    : currentUser?.is_verified
                    ? "Verified"
                    : "Not Verified"
                }}
              </h5>

              <!-- Label -->
              <p class="fs-14 mb-0 text-white-50">
                {{
                  userType === "job_seeker"
                    ? "Availability"
                    : "Verification Status"
                }}
              </p>
            </div>
          </BCol>
        </BRow>
      </div>

      <BRow>
        <BCol lg="12">
          <div>
            <div
              class="d-flex profile-wrapper"
              style="position: absolute; right: 13px; top: 26px"
            >
              <div class="d-flex justify-content-end">
                <BButton
                  variant="outline-secondary"
                  class="d-flex align-items-center"
                  @click="$router.back()"
                >
                  <i class="ri-arrow-left-line me-1"></i> Back
                </BButton>
              </div>
            </div>
            <BTabs
              nav-class=" animation-nav profile-nav gap-2 gap-lg-3  pt-4 text-muted"
              pills
            >
              <BTab title="Overview" class="nav-item pt-4">
                <template #title>
                  <i class="ri-airplay-fill d-inline-block d-md-none"></i>
                  <span class="d-none d-md-inline-block">Overview</span>
                </template>
                <BRow>
                  <BCol xxl="3">
                    <BCard no-body>
                      <BCardBody>
                        <h5 class="card-title mb-5">Complete Your Profile</h5>
                        <BProgress
                          class="animated-progress custom-progress progress-label"
                        >
                          <BProgressBar :value="100" variant="success">
                            <div class="label">100%</div>
                          </BProgressBar>
                        </BProgress>
                      </BCardBody>
                    </BCard>

                    <!-- profile information -->
                    <BCard no-body>
                      <BCardBody>
                        <h5 class="card-title mb-4">Profile Information</h5>

                        <ul class="list-unstyled mb-0">
                          <!-- Name -->
                          <li class="d-flex align-items-center mb-3">
                            <div class="flex-shrink-0 avatar-xs me-3">
                              <div
                                class="avatar-title bg-light text-primary rounded-circle fs-16"
                              >
                                <i class="ri-user-3-line"></i>
                              </div>
                            </div>
                            <div>
                              <small class="text-muted d-block">Name</small>
                              <span class="fw-semibold">{{
                                currentUser?.name || "—"
                              }}</span>
                            </div>
                          </li>

                          <!-- Contact -->
                          <li class="d-flex align-items-center mb-3">
                            <div class="flex-shrink-0 avatar-xs me-3">
                              <div
                                class="avatar-title bg-light text-success rounded-circle fs-16"
                              >
                                <i class="ri-phone-line"></i>
                              </div>
                            </div>
                            <div>
                              <small class="text-muted d-block">Contact</small>
                              <span class="fw-semibold">{{
                                currentUser?.telephone || "—"
                              }}</span>
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
                              <small class="text-muted d-block">E-mail</small>
                              <span class="fw-semibold">{{
                                currentUser?.email || "—"
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
                                currentUser?.address || "—"
                              }}</span>
                            </div>
                          </li>

                          <!-- Joining Date -->
                          <li class="d-flex align-items-center">
                            <div class="flex-shrink-0 avatar-xs me-3">
                              <div
                                class="avatar-title bg-light text-info rounded-circle fs-16"
                              >
                                <i class="ri-calendar-event-line"></i>
                              </div>
                            </div>
                            <div>
                              <small class="text-muted d-block"
                                >Joining Date</small
                              >
                              <span class="fw-semibold">{{
                                formatLongDate(currentUser?.created_at)
                              }}</span>
                            </div>
                          </li>
                        </ul>
                      </BCardBody>
                    </BCard>

                    <!-- Employer Details -->
                    <BCard no-body v-if="userType === 'employer'">
                      <BCardBody>
                        <h5 class="card-title mb-4">Employer Details</h5>

                        <ul class="list-unstyled mb-0">
                          <!-- Name -->
                          <li class="d-flex align-items-center mb-3">
                            <div class="flex-shrink-0 avatar-xs me-3">
                              <div
                                class="avatar-title bg-light text-primary rounded-circle fs-16"
                              >
                                <i class="ri-user-3-line"></i>
                              </div>
                            </div>
                            <div>
                              <small class="text-muted d-block">Name</small>
                              <span class="fw-semibold">{{
                                currentUser?.name || "—"
                              }}</span>
                            </div>
                          </li>

                          <!-- Industry -->
                          <li class="d-flex align-items-center mb-3">
                            <div class="flex-shrink-0 avatar-xs me-3">
                              <div
                                class="avatar-title bg-light text-info rounded-circle fs-16"
                              >
                                <i class="ri-building-4-line"></i>
                              </div>
                            </div>
                            <div>
                              <small class="text-muted d-block">Industry</small>
                              <span class="fw-semibold">{{
                                currentUser?.employer?.industry || "—"
                              }}</span>
                            </div>
                          </li>

                          <!-- Company Size -->
                          <li class="d-flex align-items-center mb-3">
                            <div class="flex-shrink-0 avatar-xs me-3">
                              <div
                                class="avatar-title bg-light text-success rounded-circle fs-16"
                              >
                                <i class="ri-group-line"></i>
                              </div>
                            </div>
                            <div>
                              <small class="text-muted d-block"
                                >Company Size</small
                              >
                              <span class="fw-semibold">{{
                                currentUser?.employer?.company_size || "—"
                              }}</span>
                            </div>
                          </li>
                        </ul>
                      </BCardBody>
                    </BCard>

                    <!-- job seeker -->
                    <span v-if="userType == 'job_seeker'">
                      <BCard no-body>
                        <BCardBody>
                          <h5 class="card-title mb-4">Services</h5>
                          <div class="d-flex flex-wrap gap-2 fs-15">
                            <template v-if="currentUser?.job_seeker?.services">
                              <BLink
                                v-for="(service, index) in getSubCategoryNames(
                                  currentUser?.job_seeker?.services
                                )"
                                :key="index"
                                href="javascript:void(0);"
                                class="badge bg-primary-subtle text-primary"
                              >
                                {{ service }}
                              </BLink>
                            </template>

                            <template v-else>
                              <span class="text-muted">No services listed</span>
                            </template>
                          </div>
                        </BCardBody>
                      </BCard>

                      <BCard no-body>
                        <BCardBody>
                          <h5 class="card-title mb-4">Skills</h5>
                          <div class="d-flex flex-wrap gap-2 fs-15">
                            <template v-if="currentUser?.job_seeker?.skills">
                              <BLink
                                v-for="(skill, index) in currentUser.job_seeker
                                  .skills"
                                :key="index"
                                href="javascript:void(0);"
                                class="badge bg-primary-subtle text-primary"
                              >
                                {{ skill }}
                              </BLink>
                            </template>

                            <template v-else>
                              <span class="text-muted">No skills listed</span>
                            </template>
                          </div>
                        </BCardBody>
                      </BCard>

                      <BCard no-body>
                        <BCardBody>
                          <h5 class="card-title mb-4">Documents</h5>

                          <div class="d-flex flex-wrap gap-2 fs-15">
                            <!-- ✅ Check if there are uploaded documents -->
                            <template
                              v-if="currentUser?.job_seeker_documents?.length"
                            >
                              <div
                                v-for="(
                                  doc, index
                                ) in currentUser.job_seeker_documents"
                                :key="index"
                                class="d-flex align-items-center gap-2"
                              >
                                <BLink
                                  :href="`${storageBaseUrl()}/${doc.file_path}`"
                                  target="_blank"
                                  class="badge bg-primary-subtle text-primary"
                                >
                                  <i class="ri-file-line me-1"></i>
                                  {{ doc.name }}
                                </BLink>
                              </div>
                            </template>

                            <!-- ❌ No documents -->
                            <template v-else>
                              <span class="text-muted"
                                >No documents listed</span
                              >
                            </template>
                          </div>
                        </BCardBody>
                      </BCard>
                    </span>

                    <!-- social media -->
                    <BCard no-body>
                      <BCardBody>
                        <h5 class="card-title mb-4">Social Media</h5>
                        <div
                          class="d-flex flex-wrap align-items-center text-center gap-3"
                        >
                          <div
                            v-for="(media, index) in currentUser.social_medias"
                            :key="index"
                            class="text-center"
                          >
                            <BLink
                              :href="media.url"
                              target="_blank"
                              class="avatar-xs d-block"
                              v-if="media.name && media.url"
                            >
                              <span
                                class="avatar-title rounded-circle fs-16"
                                :class="getSocialMediaClass(media.name)"
                              >
                                <i :class="getSocialMediaIcon(media.name)"></i>
                              </span>
                            </BLink>
                            <small class="d-block mt-1 text-muted">{{
                              getPlatformName(media.name)
                            }}</small>
                          </div>

                          <!-- Empty state -->
                          <div
                            v-if="
                              !currentUser.social_medias ||
                              currentUser.social_medias.length === 0 ||
                              !hasValidSocialMedia()
                            "
                            class="text-center w-100"
                          >
                            <p class="text-muted mb-0">
                              No social media profiles added
                            </p>
                          </div>
                        </div>
                      </BCardBody>
                    </BCard>
                  </BCol>

                  <!-- About and activity -->
                  <BCol xxl="9">
                    <BCard no-body>
                      <BCardBody>
                        <h5 class="card-title mb-3">About</h5>
                        <p
                          class="text-muted mb-0"
                          v-html="
                            currentUser?.bio
                              ? currentUser.bio.replace(/\n/g, '<br>')
                              : '<em class=&quot;text-secondary&quot;>Please provide your bio details to let others know more about you.</em>'
                          "
                        ></p>

                        <BRow class="gy-3 mt-3" v-if="userType == 'job_seeker'">
                          <!-- Designation -->
                          <BCol cols="6" md="4">
                            <div class="d-flex align-items-center">
                              <div class="flex-shrink-0 avatar-xs me-3">
                                <div
                                  class="avatar-title bg-light text-primary rounded-circle fs-16"
                                >
                                  <i class="ri-user-2-fill"></i>
                                </div>
                              </div>
                              <div class="flex-grow-1 overflow-hidden">
                                <p class="text-muted mb-1 small">
                                  Field of Study
                                </p>
                                <h6 class="text-truncate mb-0">
                                  {{
                                    currentUser?.job_seeker?.field_of_study ||
                                    "—"
                                  }}
                                </h6>
                              </div>
                            </div>
                          </BCol>

                          <!-- Education Level -->
                          <BCol cols="6" md="4">
                            <div class="d-flex align-items-center">
                              <div class="flex-shrink-0 avatar-xs me-3">
                                <div
                                  class="avatar-title bg-light text-success rounded-circle fs-16"
                                >
                                  <i class="ri-graduation-cap-line"></i>
                                </div>
                              </div>
                              <div class="flex-grow-1 overflow-hidden">
                                <p class="text-muted mb-1 small">
                                  Education Level
                                </p>
                                <h6 class="text-truncate mb-0">
                                  {{
                                    currentUser?.job_seeker?.education_level ||
                                    "—"
                                  }}
                                </h6>
                              </div>
                            </div>
                          </BCol>

                          <!-- Preferred Location -->
                          <BCol cols="6" md="4">
                            <div class="d-flex align-items-center">
                              <div class="flex-shrink-0 avatar-xs me-3">
                                <div
                                  class="avatar-title bg-light text-warning rounded-circle fs-16"
                                >
                                  <i class="ri-map-pin-2-line"></i>
                                </div>
                              </div>
                              <div class="flex-grow-1 overflow-hidden">
                                <p class="text-muted mb-1 small">
                                  Preferred Location
                                </p>
                                <h6 class="text-truncate mb-0">
                                  {{
                                    currentUser?.job_seeker
                                      ?.preferred_location || "—"
                                  }}
                                </h6>
                              </div>
                            </div>
                          </BCol>

                          <!-- Years of Experience -->
                          <BCol cols="6" md="4">
                            <div class="d-flex align-items-center">
                              <div class="flex-shrink-0 avatar-xs me-3">
                                <div
                                  class="avatar-title bg-light text-info rounded-circle fs-16"
                                >
                                  <i class="ri-briefcase-4-line"></i>
                                </div>
                              </div>
                              <div class="flex-grow-1 overflow-hidden">
                                <p class="text-muted mb-1 small">
                                  Years of Experience
                                </p>
                                <h6 class="text-truncate mb-0">
                                  {{
                                    currentUser?.job_seeker
                                      ?.years_of_experience || "—"
                                  }}
                                  years
                                </h6>
                              </div>
                            </div>
                          </BCol>

                          <!-- Availability -->
                          <BCol cols="6" md="4">
                            <div class="d-flex align-items-center">
                              <div class="flex-shrink-0 avatar-xs me-3">
                                <div
                                  class="avatar-title bg-light text-danger rounded-circle fs-16"
                                >
                                  <i class="ri-time-line"></i>
                                </div>
                              </div>
                              <div class="flex-grow-1 overflow-hidden">
                                <p class="text-muted mb-1 small">
                                  Availability
                                </p>
                                <h6 class="text-truncate mb-0">
                                  {{
                                    currentUser?.job_seeker?.is_available
                                      ? "Available"
                                      : "Not Available"
                                  }}
                                </h6>
                              </div>
                            </div>
                          </BCol>
                        </BRow>
                      </BCardBody>
                    </BCard>
                  </BCol>
                </BRow>
              </BTab>

              <!-- Job Experience Timeline -->
              <BTab class="nav-item pt-4" v-if="userType == 'job_seeker'">
                <template #title>
                  <i class="ri-briefcase-line d-inline-block d-md-none"></i>
                  <span class="d-none d-md-inline-block">Job Experience</span>
                </template>

                <BCard no-body class="bg-light">
                  <BCardBody>
                    <h5 class="card-title mb-4">
                      <i
                        class="ri-time-line align-bottom text-primary me-1"
                      ></i>
                      Job Experience
                    </h5>

                    <!-- If user has job experiences -->
                    <div
                      v-if="currentUser?.job_seeker?.experiences?.length"
                      class="timeline-2"
                    >
                      <div
                        v-for="(exp, index) in currentUser.job_seeker
                          .experiences"
                        :key="exp.id || index"
                      >
                        <div class="timeline-continue">
                          <BRow class="timeline-right">
                            <BCol cols="12">
                              <p class="timeline-date">
                                {{ exp.start_year }} - {{ exp.end_year }}
                              </p>
                            </BCol>
                            <BCol cols="12">
                              <div class="timeline-box">
                                <div class="timeline-text">
                                  <h5>
                                    {{ exp.job_title || "Untitled Position" }}
                                  </h5>
                                  <p class="text-muted mb-0">
                                    {{
                                      exp.job_description ||
                                      "No description provided."
                                    }}
                                  </p>
                                </div>
                              </div>
                            </BCol>
                          </BRow>
                        </div>
                      </div>
                    </div>

                    <!-- Empty state -->
                    <div v-else class="text-center py-4 text-muted">
                      <i class="ri-briefcase-2-line fs-1 d-block mb-2"></i>
                      No job experiences added yet.
                    </div>
                  </BCardBody>
                </BCard>
              </BTab>
            </BTabs>
          </div>
        </BCol>
      </BRow>
    </template>

    <template v-else>
      <!-- Loading -->
      <div class="text-center my-5">
        <lottie
          class="avatar-xl"
          :options="defaultbox"
          :height="120"
          :width="120"
        />
        <h5 class="mt-3">Loading profile details...</h5>
      </div>
    </template>
  </Layout>
</template>

<script setup>
import Layout from "@/layouts/main.vue";
import { ref, onMounted, computed } from "vue";

import userDummy from "@/assets/images/users/user-dummy-img.jpg";
import coverDummy from "@/assets/images/profile-bg.jpg";
import { storageBaseUrl } from "@/helpers/useFormats";

import { formatLongDate } from "@/helpers/useFormats";
import { useJobFilters } from "@/helpers/useJobFilters";
import { showUser } from "@/api-request";

import Toast from "@/helpers/Toast";
import Lottie from "@/components/widgets/lottie.vue";
import animationBox from "@/components/widgets/dklbhvrt.json";

const defaultbox = { animationData: animationBox };

const { getSubCategoryNames } = useJobFilters();

import { useRoute } from "vue-router";
const route = useRoute();
const userId = route.params.id;

const userDetails = ref({});
const currentUser = computed(() => userDetails.value);
const userType = computed(() => userDetails.value?.user_type ?? "");

const isLoading = ref(false);

// Methods for social media display
const getSocialMediaIcon = (platform) => {
  const icons = {
    facebook: "ri-facebook-fill",
    linkedin: "ri-linkedin-fill",
    twitter: "ri-twitter-fill",
    instagram: "ri-instagram-fill",
    github: "ri-github-fill",
    portfolio: "ri-global-fill",
    other: "ri-share-fill",
  };
  return icons[platform] || "ri-share-fill";
};

const getSocialMediaClass = (platform) => {
  const classes = {
    facebook: "bg-primary text-white",
    linkedin: "bg-info text-white",
    twitter: "bg-info text-white",
    instagram: "bg-danger text-white",
    github: "bg-dark text-white",
    portfolio: "bg-success text-white",
    other: "bg-secondary text-white",
  };
  return classes[platform] || "bg-light text-body";
};

const getPlatformName = (platform) => {
  const names = {
    facebook: "Facebook",
    linkedin: "LinkedIn",
    twitter: "Twitter",
    instagram: "Instagram",
    github: "GitHub",
    portfolio: "Portfolio",
    other: "Other",
  };
  return names[platform] || platform;
};

const hasValidSocialMedia = () => {
  return currentUser.value.social_medias?.some(
    (media) => media.name && media.url
  );
};

// Fetch initial data for dropdowns
const fetchAllData = async () => {
  isLoading.value = true;
  try {
    const [userInfoRes] = await Promise.all([showUser(userId)]);

    userDetails.value = userInfoRes?.data || [];
  } catch (error) {
    console.error("Error fetching data:", error);
    Toast.fire({
      icon: "error",
      title: "Failed to load form options. Please refresh the page.",
    });
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchAllData();
});
</script>

<style scoped>
.tamp {
  position: absolute;
  top: 17px;
  right: 16px;
}

.user-profile-image {
  width: 120px;
  height: 120px;
  object-fit: cover;
}
</style>
