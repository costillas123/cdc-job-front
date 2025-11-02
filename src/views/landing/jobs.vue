<template>
  <div class="layout-wrapper landing">
    <Header />

    <section class="section bg-light">
      <BContainer>
        <BRow class="justify-content-center">
          <BCol lg="12">
            <!-- Search Card -->
            <BCard no-body class="search-header-card">
              <BCardBody class="p-4">
                <!-- rounded-0 bg-success-subtle border-top -->
                <BRow class="align-items-center">
                  <!-- Left Side (Content) -->
                  <BCol lg="9" class="">
                    <!-- Title and Results -->
                    <div
                      class="d-flex align-items-center justify-content-between mb-4"
                    >
                      <!-- Left side: Title + description -->
                      <div>
                        <h4 class="card-title mb-1">Find Your Dream Job</h4>
                        <p class="text-muted mb-0">
                          <strong class="text-primary"
                            >{{ displayed }} of {{ total }}</strong
                          >
                          jobs matched your search criteria. Explore the best
                          opportunities tailored for you!
                        </p>
                      </div>
                    </div>

                    <BRow class="g-2 align-items-center mb-4">
                      <BCol lg="9">
                        <div class="search-box position-relative">
                          <input
                            type="text"
                            class="form-control search bg-light border-light pe-5"
                            placeholder="Search for jobs, companies, or keywords..."
                            v-model="searchQuery"
                            @keyup.enter="searchJobs"
                          />
                          <i class="ri-search-line search-icon"></i>

                          <!-- Clear text icon -->
                          <button
                            v-if="searchQuery"
                            type="button"
                            class="btn position-absolute top-50 end-0 translate-middle-y border-0 bg-transparent pe-3"
                            @click="clearSearch"
                          >
                            <i class="ri-close-circle-line text-muted fs-5"></i>
                          </button>
                        </div>
                      </BCol>

                      <BCol lg="3" class="d-flex gap-2 justify-content-end">
                        <BButton
                          variant="primary"
                          class="flex-fill"
                          @click="searchJobs"
                        >
                          <i class="ri-search-line me-1"></i>
                          Search
                        </BButton>

                        <BButton
                          variant="outline-secondary"
                          class="flex-fill"
                          @click="clearAll"
                        >
                          <i class="ri-refresh-line me-1 fs-16"></i>
                        </BButton>
                      </BCol>
                    </BRow>

                    <!-- Quick Filters Row -->
                    <BRow class="g-3">
                      <!-- Category -->
                      <BCol lg="6" md="6">
                        <div class="filter-group">
                          <label
                            class="form-label fs-12 fw-semibold text-muted mb-1"
                            >Category</label
                          >

                          <!-- Custom Searchable Dropdown -->
                          <div class="category-dropdown position-relative">
                            <!-- Search / Input -->
                            <div class="dropdown-trigger">
                              <BFormInput
                                v-model="searchCategory"
                                placeholder="Search category..."
                                @focus="openDropdown = true"
                                class="form-control"
                              />
                            </div>

                            <!-- Dropdown Menu -->
                            <transition name="fade">
                              <div
                                v-if="openDropdown"
                                class="dropdown-menu-custom shadow border rounded bg-white mt-1 p-2 position-absolute w-100"
                                style="
                                  z-index: 1000;
                                  max-height: 300px;
                                  overflow-y: auto;
                                "
                              >
                                <div
                                  v-for="cat in filteredCategories"
                                  :key="cat.id"
                                  class="category-group mb-2"
                                >
                                  <!-- Main Category Checkbox -->
                                  <div
                                    class="d-flex justify-content-between align-items-center py-1 px-2 hover-bg rounded"
                                    @click="toggleCategory(cat)"
                                  >
                                    <BFormCheckbox
                                      v-model="form.selectedCategory"
                                      :value="cat.id"
                                      name="main-category"
                                      class="fw-semibold"
                                      @change="selectResetPage()"
                                    >
                                      {{ cat.name }}
                                    </BFormCheckbox>

                                    <i
                                      :class="[
                                        'ri-arrow-down-s-line text-muted transition',
                                        expandedCategory === cat.id
                                          ? 'rotate-180'
                                          : '',
                                      ]"
                                    ></i>
                                  </div>

                                  <!-- Subcategories -->
                                  <transition name="slide">
                                    <div
                                      v-if="expandedCategory === cat.id"
                                      class="subcategories ps-4 border-start mt-2"
                                    >
                                      <div
                                        v-for="sub in getSubCategoriesByCategory(
                                          cat.id
                                        )"
                                        :key="sub.value"
                                        class="d-flex justify-content-between align-items-center py-1"
                                      >
                                        <BFormCheckbox
                                          v-model="form.selectedSubCategories"
                                          :value="sub.value"
                                          name="sub-category"
                                          @change="selectResetPage()"
                                        >
                                          {{ sub.label }}
                                        </BFormCheckbox>
                                      </div>
                                    </div>
                                  </transition>
                                </div>

                                <div
                                  v-if="filteredCategories.length === 0"
                                  class="text-center py-2 text-muted"
                                >
                                  No results found
                                </div>
                              </div>
                            </transition>
                          </div>
                        </div>
                      </BCol>

                      <!-- Experience Level -->
                      <BCol lg="3" md="6">
                        <div class="filter-group">
                          <label
                            class="form-label fs-12 fw-semibold text-muted mb-1"
                            >Experience</label
                          >
                          <BFormSelect
                            v-model="form.experience"
                            @change="selectResetPage()"
                          >
                            <option value="">Job Experience</option>
                            <option value="0">0 years (Fresh Grad)</option>
                            <option value="1">1 year</option>
                            <option value="2">2 years</option>
                            <option value="3">3 years</option>
                            <option value="4">4 years</option>
                            <option value="5">5 years</option>
                            <option value="5+">5+ years</option>
                          </BFormSelect>
                        </div>
                      </BCol>

                      <!-- Sort By -->
                      <BCol lg="3" md="6">
                        <div class="filter-group">
                          <label
                            class="form-label fs-12 fw-semibold text-muted mb-1"
                          >
                            Sort By
                          </label>

                          <div class="position-relative">
                            <BFormSelect
                              v-model="form.sort"
                              class="form-select pe-5"
                              @change="selectResetPage()"
                            >
                              <option value="latest">Newest First</option>
                              <option value="salary_high">
                                Highest Salary
                              </option>
                              <option value="salary_low">Lowest Salary</option>
                              <option value="oldest">Oldest First</option>
                            </BFormSelect>
                          </div>
                        </div>
                      </BCol>
                    </BRow>
                  </BCol>

                  <!-- Right Side (Illustration) -->
                  <BCol lg="3" class="text-end d-none d-lg-block">
                    <div class="position-relative">
                      <img
                        src="@/assets/images/faq-img.png"
                        alt="Job Search"
                        class="img-fluid search-banner"
                      />
                    </div>
                  </BCol>
                </BRow>
              </BCardBody>
            </BCard>

            <!-- Loading State -->
            <template v-if="isLoading">
              <div
                class="top-0 start-0 w-100 h-50 d-flex flex-column justify-content-center align-items-center bg-light bg-opacity-50"
              >
                <lottie
                  class="avatar-xl"
                  :options="defaultOptions"
                  :height="75"
                  :width="75"
                />
                <h5 class="mt-3 text-muted">Loading jobs...</h5>
              </div>
            </template>

            <!-- Job List -->
            <template v-else>
              <div id="job-list" class="mt-4 space-y-4">
                <BCard
                  v-for="job in jobDatas"
                  :key="job.id"
                  class="joblist-card shadow-sm border-0 hover-card transition-all"
                >
                  <BCardBody class="p-4">
                    <!-- Header: Title + Company Info -->
                    <div
                      class="d-flex flex-wrap justify-content-between align-items-start mb-3"
                    >
                      <div class="d-flex align-items-center gap-3">
                        <!-- Company Logo -->

                        <div class="position-relative d-inline-block">
                          <div class="avatar-md">
                            <img
                              :src="
                                job.company?.avatar
                                  ? `${storageBaseUrl()}/${job.company?.avatar}`
                                  : require('@/assets/images/task.png')
                              "
                              alt="company-logo"
                              class="rounded-circle img-fluid border border-light"
                            />
                          </div>

                          <!-- Active indicator -->
                          <span
                            class="position-absolute top-0 start-100 translate-middle p-1 bg-success border border-2 border-white rounded-circle"
                            title="Active Job"
                          ></span>
                        </div>

                        <!-- Job Title + Details -->
                        <div>
                          <h5 class="fw-semibold mb-1">
                            {{ job.title }}
                            <BBadge
                              v-if="isDateNew(job.post_at)"
                              variant="success"
                              class="ms-2 fs-11"
                            >
                              <i class="ri-flashlight-fill me-1"></i> New
                            </BBadge>
                          </h5>

                          <div class="text-muted fs-13 d-flex flex-wrap gap-3">
                            <span
                              ><i class="ri-building-2-line me-1"></i>
                              {{ job.company.name }}</span
                            >
                            <span
                              ><i class="ri-map-pin-line me-1"></i>
                              {{ job.job_location }}</span
                            >
                            <span
                              class="text-success"
                              v-if="job.company.is_verified"
                            >
                              <i class="ri-verified-badge-fill me-1"></i>
                              Verified Company
                            </span>
                          </div>

                          <!-- Sub Categories -->
                          <div v-if="job.sub_categories?.length" class="mt-2">
                            <BBadge
                              v-for="(sub, index) in job.sub_categories"
                              :key="index"
                              variant="info"
                              class="me-1 mb-1"
                            >
                              <i class="ri-price-tag-3-line me-1"></i> {{ sub }}
                            </BBadge>
                          </div>
                        </div>
                      </div>

                      <!-- Apply Button -->
                      <BButton
                        size="sm"
                        variant="primary"
                        class="rounded-pill px-3 mt-2 mt-sm-0"
                        @click="showdetail(job)"
                      >
                        <i class="ri-eye-line me-1"></i> View Details
                      </BButton>
                    </div>

                    <!-- Job Details Grid -->
                    <div class="row g-3 my-3">
                      <div
                        v-for="(detail, index) in jobDetails(job)"
                        :key="index"
                        class="col-sm-6 col-lg-4"
                      >
                        <div
                          class="d-flex align-items-center p-2 bg-light rounded h-100"
                        >
                          <div class="avatar-xs flex-shrink-0">
                            <span class="avatar-title bg-white rounded-circle">
                              <i
                                :class="detail.icon + ' text-primary fs-18'"
                              ></i>
                            </span>
                          </div>
                          <div class="flex-grow-1 ms-2">
                            <span class="fs-12 text-muted">{{
                              detail.label
                            }}</span>
                            <div
                              class="fw-medium fs-13"
                              :class="detail.class || ''"
                            >
                              {{ detail.value }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Footer: Posted Info + Actions -->
                    <div
                      class="d-flex justify-content-between align-items-center pt-3 border-top flex-wrap gap-2"
                    >
                      <div
                        class="d-flex align-items-center text-muted fs-12 flex-wrap gap-2"
                      >
                        <div class="d-flex align-items-center">
                          <i class="ri-time-line me-1"></i> Posted
                          {{ dateAgo(job.post_at) }}
                        </div>

                        <!-- <span class="text-muted">•</span> -->
                      </div>

                      <div
                        class="d-flex align-items-center text-muted fs-12 flex-wrap gap-2"
                      >
                        <div class="d-flex align-items-center">
                          <i class="ri-eye-line me-1"></i>
                          {{ job.views }} views
                        </div>

                        <span class="text-muted">•</span>

                        <!-- ⭐ Rating Section -->
                        <div class="d-flex align-items-center">
                          <i class="ri-star-fill text-warning me-1"></i>
                          <span>{{ job.average_rate }}</span>
                          <span class="text-muted ms-1">/ 5</span>
                        </div>
                      </div>
                    </div>
                  </BCardBody>
                </BCard>
              </div>
            </template>

            <!-- Load More -->
            <div
              id="infinite-scroll-sentinel"
              class="text-center py-3 text-muted"
              v-if="hasMore && !isLoading"
            >
              <i
                v-if="isLoadingMore"
                class="mdi mdi-loading mdi-spin fs-20 me-2"
              ></i>
              <span v-if="isLoadingMore">Loading more...</span>
            </div>

            <div
              v-else-if="displayed === total && !isLoading"
              class="text-center py-3 text-muted"
            >
              <span>No more jobs to load.</span>
            </div>
          </BCol>
        </BRow>
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
import { ref, onMounted, onUnmounted, watch, nextTick, computed } from "vue";
import Footer from "@/components/landing-footer.vue";
import Header from "@/components/landing-sub-header.vue";

import Lottie from "@/components/widgets/lottie.vue";
import animationData from "@/components/widgets/pvbjsfif.json";
import Toast from "@/helpers/Toast";
import { viewJobs } from "@/api-request";
import { formatLongDate, dateAgo, isDateNew } from "@/helpers/useFormats";
import { useJobFilters } from "@/helpers/useJobFilters";

const { categoryDetails, getSubCategoriesByCategory } = useJobFilters();

import { useRouter } from "vue-router";
const router = useRouter();

const defaultOptions = { animationData };

const isLoading = ref(false);
const isLoadingMore = ref(false);
const jobDatas = ref([]);
const page = ref(1);
const hasMore = ref(true);

// ------------------------------- select category & subcategory -------------------------------
const searchQuery = ref("");
const form = ref({
  selectedCategory: "",
  selectedSubCategories: [],
  experience: "",
  sort: "latest",
});

const openDropdown = ref(false);
const expandedCategory = ref(null);
const searchCategory = ref("");
const total = ref(0);
const displayed = ref(0);

const toggleCategory = (cat) => {
  expandedCategory.value = expandedCategory.value === cat.id ? null : cat.id;
  form.value.selectedCategory = cat.id;
  searchCategory.value = cat.name;
};

const filteredCategories = computed(() => {
  const cats = Array.isArray(categoryDetails.value)
    ? categoryDetails.value
    : categoryDetails;

  return cats.filter((cat) =>
    cat.name.toLowerCase().includes(searchCategory.value.toLowerCase())
  );
});

import { storageBaseUrl } from "@/helpers/useFormats";

// Close dropdown on outside click
document.addEventListener("click", (e) => {
  if (!e.target.closest(".category-dropdown")) {
    openDropdown.value = false;
  }
});

const clearSearch = () => {
  searchQuery.value = "";
  page.value = 1;
  fetchJob(false);
};

const searchJobs = () => {
  page.value = 1;
  fetchJob(false);
};

const selectResetPage = () => {
  if (form.value.selectedCategory) {
    const foundCategory = categoryDetails.value.find(
      (cat) => cat.id === form.value.selectedCategory
    );
    searchCategory.value = foundCategory?.name || "";
  } else {
    form.value.selectedCategory = "";
    form.value.selectedSubCategories = [];
    searchCategory.value = "";
  }

  page.value = 1;
  fetchJob(false);
};

const clearAll = () => {
  searchCategory.value = "";
  searchQuery.value = "";
  form.value = {
    selectedCategory: "",
    selectedSubCategories: [],
    experience: "",
    sort: "latest",
  };
  fetchJob();
};

const jobDetails = (job) => [
  {
    icon: "ri-service-line",
    label: "Job Category",
    value: job.category,
  },
  {
    icon: "ri-graduation-cap-line",
    label: "Qualification",
    value: job.job_qualify,
  },
  {
    icon: "ri-briefcase-2-line",
    label: "Experience",
    value: job.job_experience + " years",
  },
  {
    icon: "ri-user-star-line",
    label: "Level",
    value: job.job_level,
  },
  {
    icon: "ri-currency-line",
    label: "Salary",
    value: job.salary,
    class: "text-success",
  },
  {
    icon: "ri-calendar-event-line",
    label: "Deadline",
    value: formatLongDate(job.deadline),
    class: "text-success",
  },
];

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

const showdetail = (job) => {
  router.push(`/view-job-details/${job.code}`);
};

const loadMore = () => {
  if (isLoadingMore.value || !hasMore.value) return;
  page.value++;
  fetchJob(true);
};

// Fetch Job Listings
const fetchJob = async (append = false) => {
  if (!append) isLoading.value = true;
  else isLoadingMore.value = true;

  try {
    const response = await viewJobs({
      page: page.value,
      per_page: 3,
      search: searchQuery.value,
      selectedCategory: form.value.selectedCategory,
      subCategories: form.value.selectedSubCategories,
      experience: form.value.experience,
      sort: form.value.sort,
    });

    const res = response?.data;

    if (append) {
      jobDatas.value.push(...res.items);
    } else {
      jobDatas.value = res.items;
    }

    total.value = res.total;
    displayed.value = res.displayed;

    hasMore.value = res.current_page < Math.ceil(res.total / res.per_page);
  } catch (error) {
    console.error(error);
    Toast.fire({
      icon: "error",
      title: "Failed to load job data",
    });
  } finally {
    isLoading.value = false;
    isLoadingMore.value = false;
  }
};

// -------------------------------
// 🔍 Observe when sentinel appears
// -------------------------------
let observer;

const observeSentinel = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  await nextTick();
  const sentinel = document.querySelector("#infinite-scroll-sentinel");

  if (!sentinel) {
    return;
  }

  if (observer) observer.disconnect();

  observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (entry.isIntersecting && hasMore.value && !isLoadingMore.value) {
        loadMore();
      }
    },
    {
      root: null,
      rootMargin: "100px",
      threshold: 0.1,
    }
  );

  observer.observe(sentinel);
};

onMounted(async () => {
  await fetchJob();

  watch(
    () => isLoading.value,
    (loading) => {
      if (!loading) observeSentinel();
    },
    { immediate: true }
  );

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

onUnmounted(() => {
  if (observer) observer.disconnect();
});
</script>
