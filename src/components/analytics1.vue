<template>
  <BRow>
    <!-- Total Applications -->
    <BCol xxl="3" md="6">
      <BCard no-body class="card-animate border-0 shadow-sm">
        <BCardBody class="p-4">
          <div class="d-flex align-items-center">
            <div class="flex-grow-1">
              <h5 class="text-muted mb-3">Total Applications</h5>
              <h2 class="mb-2 text-primary">
                <count-to
                  :duration="2000"
                  :startVal="0"
                  :endVal="metrics.totalApplications"
                ></count-to>
              </h2>
              <p class="text-muted mb-0">
                <i class="ri-arrow-up-line text-success me-1"></i>
                {{ metrics.applicationGrowth }}% from last period
              </p>
            </div>
            <div class="flex-shrink-0">
              <lottie :options="applicationsOptions" :height="60" :width="60" />
            </div>
          </div>
        </BCardBody>
      </BCard>
    </BCol>

    <!-- Job Vacancies -->
    <BCol xxl="3" md="6">
      <BCard no-body class="card-animate border-0 shadow-sm">
        <BCardBody class="p-4">
          <div class="d-flex align-items-center">
            <div class="flex-grow-1">
              <h5 class="text-muted mb-3">Job Vacancies</h5>
              <h2 class="mb-2 text-success">
                <count-to
                  :duration="2000"
                  :startVal="0"
                  :endVal="metrics.totalJobs"
                ></count-to>
              </h2>
              <p class="text-muted mb-0">
                <i class="ri-arrow-up-line text-success me-1"></i>
                {{ metrics.jobGrowth }}% active posts
              </p>
            </div>
            <div class="flex-shrink-0">
              <lottie :options="jobsOptions" :height="60" :width="60" />
            </div>
          </div>
        </BCardBody>
      </BCard>
    </BCol>

    <!-- Hired Candidates -->
    <BCol xxl="3" md="6">
      <BCard no-body class="card-animate border-0 shadow-sm">
        <BCardBody class="p-4">
          <div class="d-flex align-items-center">
            <div class="flex-grow-1">
              <h5 class="text-muted mb-3">Hired Candidates</h5>
              <h2 class="mb-2 text-info">
                <count-to
                  :duration="2000"
                  :startVal="0"
                  :endVal="metrics.totalHired"
                ></count-to>
              </h2>
              <p class="text-muted mb-0">
                <i class="ri-arrow-up-line text-success me-1"></i>
                {{ metrics.hireRate }}% success rate
              </p>
            </div>
            <div class="flex-shrink-0">
              <lottie :options="hiredOptions" :height="60" :width="60" />
            </div>
          </div>
        </BCardBody>
      </BCard>
    </BCol>

    <!-- Active Employers -->
    <BCol xxl="3" md="6">
      <BCard no-body class="card-animate border-0 shadow-sm">
        <BCardBody class="p-4">
          <div class="d-flex align-items-center">
            <div class="flex-grow-1">
              <h5 class="text-muted mb-3">Active Employers</h5>
              <h2 class="mb-2 text-warning">
                <count-to
                  :duration="2000"
                  :startVal="0"
                  :endVal="metrics.activeEmployers"
                ></count-to>
              </h2>
              <p class="text-muted mb-0">
                <i class="ri-arrow-up-line text-success me-1"></i>
                {{ metrics.employerGrowth }}% from last month
              </p>
            </div>
            <div class="flex-shrink-0">
              <lottie :options="employersOptions" :height="60" :width="60" />
            </div>
          </div>
        </BCardBody>
      </BCard>
    </BCol>
  </BRow>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { CountTo } from "vue3-count-to";
import Lottie from "@/components/widgets/lottie.vue";

// Import Lottie animations
import applicationsAnimation from "@/components/widgets/sygggnra.json";
import jobsAnimation from "@/components/widgets/pvbjsfif.json";
import hiredAnimation from "@/components/widgets/hfmdczge.json";
import employersAnimation from "@/components/widgets/kkcllwsu.json";

import { getAnalytic1 } from "@/api-request";

// Options with custom colors for each metric
const applicationsOptions = ref({
  animationData: applicationsAnimation,
  loop: true,
  autoplay: true,
});

const jobsOptions = ref({
  animationData: jobsAnimation,
  loop: true,
  autoplay: true,
});

const hiredOptions = ref({
  animationData: hiredAnimation,
  loop: true,
  autoplay: true,
});

const employersOptions = ref({
  animationData: employersAnimation,
  loop: true,
  autoplay: true,
});

const metrics = ref({
  totalApplications: 0,
  totalJobs: 0,
  totalHired: 0,
  activeEmployers: 0,
  applicationGrowth: 0,
  jobGrowth: 0,
  hireRate: 0,
  employerGrowth: 0,
});

const loading = ref(true);
const error = ref(null);

const fetchData = async () => {
  try {
    loading.value = true;
    error.value = null;

    const response = await getAnalytic1();

    const data = response.data.items;

    metrics.value = {
      totalApplications: data?.totalApplications || 0,
      totalJobs: data?.totalJobs || 0,
      totalHired: data?.totalHired || 0,
      activeEmployers: data?.activeEmployers || 0,
      applicationGrowth: data?.applicationGrowth || 0,
      jobGrowth: data?.jobGrowth || 0,
      hireRate: data?.hireRate || 0,
      employerGrowth: data?.employerGrowth || 0,
    };
  } catch (err) {
    console.error("Error fetching dashboard data:", err);
    error.value =
      err.response?.data?.message || "Failed to load analytics data";

    // Set fallback values
    metrics.value = {
      totalApplications: 0,
      totalJobs: 0,
      totalHired: 0,
      activeEmployers: 0,
      applicationGrowth: 0,
      jobGrowth: 0,
      hireRate: 0,
      employerGrowth: 0,
    };
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchData();
});
</script>
