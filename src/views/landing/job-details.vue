<template>
  <div class="layout-wrapper landing">
    <Header />

    <section class="section bg-light">
      <BContainer>
        <!-- Header -->
        <BCard no-body class="mt-n4 mx-n4" v-if="details">
          <div class="bg-warning-subtle">
            <BCardBody class="px-4 pb-4">
              <BRow class="align-items-center justify-content-between mb-3">
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
                            {{ details.company?.name || "N/A" }}
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

                          <div class="d-flex align-items-center">
                            <i
                              class="ri-star-fill me-1 align-bottom text-warning"
                            ></i>
                            {{ details.average_rate || 0 }} Rating
                            <div class="vr mx-2"></div>
                          </div>
                        </div>

                        <div class="hstack gap-3 mt-2 flex-wrap">
                          <div>
                            Post Date:
                            <span class="fw-medium">
                              {{ formatShortDate(details.post_at) }}
                            </span>
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

                <BCol md="auto" class="text-end mt-3">
                  <div class="d-flex gap-2 flex-wrap">
                    <router-link
                      :to="'/register'"
                      class="btn btn-primary d-flex align-items-center apply-btn"
                    >
                      <i class="ri-send-plane-line me-2"></i>
                      <span class="fw-semibold">Apply Now</span>
                    </router-link>
                  </div>
                </BCol>
              </BRow>
            </BCardBody>
          </div>
        </BCard>

        <!-- Job content -->
        <BRow v-if="!isLoading && details" class="mt-n5">
          <BCol xxl="8">
            <BCard no-body>
              <BCardBody>
                <p v-html="details.content"></p>
              </BCardBody>
            </BCard>
          </BCol>

          <BCol xxl="4">
            <!-- Job Overview -->
            <BCard no-body>
              <BCardHeader>
                <h5 class="mb-0">Job Overview</h5>
              </BCardHeader>
              <BCardBody>
                <ul class="list-unstyled mb-0">
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
                      <span class="fw-semibold">{{
                        details.salary || "—"
                      }}</span>
                    </div>
                  </li>

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
                      <span class="fw-semibold">{{
                        details.category || "—"
                      }}</span>
                    </div>
                  </li>

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

            <!-- Company -->
            <BCard no-body class="mt-3">
              <BCardBody>
                <div class="text-center mb-4">
                  <div class="avatar-sm mx-auto">
                    <div class="avatar-title bg-warning-subtle rounded-circle">
                      <img
                        :src="
                          details.company?.avatar
                            ? `${storageBaseUrl()}/${details.company?.avatar}`
                            : require('@/assets/images/task.png')
                        "
                        alt="Company Logo"
                        class="rounded-circle img-fluid"
                      />
                    </div>
                  </div>

                  <h5 class="mt-3 mb-1">{{ details.company?.name || "—" }}</h5>
                  <p class="text-muted fs-13">
                    {{ details.company?.industry || "—" }}
                  </p>
                </div>

                <ul class="list-unstyled mb-0">
                  <!-- Website -->
                  <li class="d-flex align-items-start mb-3">
                    <div class="avatar-xs flex-shrink-0 me-3">
                      <div
                        class="avatar-title bg-light text-primary rounded-circle fs-16"
                      >
                        <i class="ri-global-line"></i>
                      </div>
                    </div>
                    <div>
                      <small class="text-muted d-block">Website</small>

                      <div class="d-flex flex-wrap gap-2 fs-15 mt-1">
                        <template
                          v-if="
                            (details.company?.website || []).filter(
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
                  <li class="d-flex align-items-start mb-3">
                    <div class="avatar-xs flex-shrink-0 me-3">
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
                  <li class="d-flex align-items-start mb-3">
                    <div class="avatar-xs flex-shrink-0 me-3">
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
                  <li class="d-flex align-items-start">
                    <div class="avatar-xs flex-shrink-0 me-3">
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
      </BContainer>
    </section>

    <Footer />

    <BButton
      variant="info"
      @click="topFunction"
      class="btn-icon"
      id="back-to-top"
    >
      <i class="ri-arrow-up-line"></i>
    </BButton>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { formatShortDate } from "@/helpers/useFormats";
import { storageBaseUrl } from "@/helpers/useFormats";

import Footer from "@/components/landing-footer.vue";
import Header from "@/components/landing-sub-header.vue";

import Lottie from "@/components/widgets/lottie.vue";
import animationBox from "@/components/widgets/pvbjsfif.json";

import { viewJobDetails } from "@/api-request";

const defaultbox = { animationData: animationBox };
const route = useRoute();
const details = ref(null);
const isLoading = ref(false);

const jobCode = route.params.code;
const userRating = ref(0);

const fetchDetails = async () => {
  isLoading.value = true;
  try {
    const response = await viewJobDetails(jobCode);

    details.value = response.data;
    userRating.value = Number(response.data.seeker_rate) || 0;
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

onMounted(async () => {
  fetchDetails();

  const backToTop = document.getElementById("back-to-top");

  // Show/hide Back-to-Top button
  if (backToTop) {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        backToTop.style.display = "block";
      } else {
        backToTop.style.display = "none";
      }
    });
  }

  // Sticky navbar
  window.addEventListener("scroll", (ev) => {
    ev.preventDefault();
    const navbar = document.getElementById("navbar");
    if (navbar) {
      if (
        document.body.scrollTop >= 50 ||
        document.documentElement.scrollTop >= 50
      ) {
        navbar.classList.add("is-sticky");
      } else {
        navbar.classList.remove("is-sticky");
      }
    }
  });
});
</script>
