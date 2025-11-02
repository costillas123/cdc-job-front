<template>
  <BRow>
    <!-- Line Chart -->
    <BCol xxl="12" xl="12">
      <BCard class="shadow-sm border-0">
        <BCardHeader class="bg-transparent border-0 d-flex align-items-center">
          <BCardTitle class="mb-0 flex-grow-1"
            >Jobs & Applicants by Category</BCardTitle
          >
          <div class="flex-shrink-0">
            <div class="hstack gap-1">
              <BFormSelect
                v-model="selectedYear"
                :options="yearOptions"
                style="width: 120px"
                :disabled="loading"
                @change="fetchAnalyticsData"
              />
              <BButton
                variant="outline-secondary"
                @click="fetchAnalyticsData"
                :disabled="loading"
              >
                <i
                  class="ri-refresh-line fs-14"
                  :class="{ 'ri-loader-4-line bx-spin': loading }"
                ></i>
              </BButton>
            </div>
          </div>
        </BCardHeader>
        <BCardBody>
          <div v-if="loading" class="text-center py-5">
            <lottie :options="defaultOptions" :height="120" :width="120" />
            <h6 class="mt-3 text-muted">Loading analytics...</h6>
          </div>

          <div
            v-else-if="categoryChart.series[0].data.length === 0"
            class="text-center py-5"
          >
            <div class="avatar-lg mx-auto mb-3">
              <div class="avatar-title bg-light text-muted rounded-circle">
                <i class="ri-bar-chart-line fs-24"></i>
              </div>
            </div>
            <h5 class="text-muted">No Data Available</h5>
            <p class="text-muted mb-0">
              No job data found for the selected year.
            </p>
          </div>

          <div v-else>
            <apexchart
              type="line"
              height="350"
              :options="categoryChart.options"
              :series="categoryChart.series"
            />
          </div>
        </BCardBody>
      </BCard>
    </BCol>

    <!-- Top 10 Categories Table -->
    <BCol xxl="12" xl="12">
      <BCard class="shadow-sm border-0">
        <BCardHeader class="bg-transparent border-0 d-flex align-items-center">
          <BCardTitle class="mb-0 flex-grow-1">Top 10 Categories</BCardTitle>
        </BCardHeader>
        <BCardBody class="p-0">
          <div v-if="loading" class="text-center py-5">
            <lottie :options="defaultOptions" :height="100" :width="100" />
          </div>

          <div v-else-if="!topCategories.length" class="text-center py-5">
            <div class="avatar-lg mx-auto mb-3">
              <div class="avatar-title bg-light text-muted rounded-circle">
                <i class="ri-folder-line fs-24"></i>
              </div>
            </div>
            <h6 class="text-muted">No Categories Found</h6>
            <p class="text-muted mb-0">
              No active categories with jobs for this year.
            </p>
          </div>

          <div v-else>
            <div class="table-responsive">
              <table class="table table-borderless align-middle mb-0">
                <thead class="table-light">
                  <tr>
                    <th class="ps-3">#</th>
                    <th>Category</th>
                    <th class="text-center">Jobs</th>
                    <th class="text-center">Applicants</th>
                    <th class="text-center">Growth</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in topCategories" :key="item.id">
                    <td class="ps-3">
                      <BBadge variant="light" class="fs-12">
                        {{ index + 1 }}
                      </BBadge>
                    </td>
                    <td>
                      <div class="d-flex align-items-center">
                        <div class="flex-shrink-0 me-2">
                          <div class="avatar-xs">
                            <div
                              class="avatar-title bg-light text-muted rounded"
                            >
                              <i class="ri-folder-line"></i>
                            </div>
                          </div>
                        </div>
                        <div class="flex-grow-1">
                          <h6 class="mb-0 fs-14">{{ item.category }}</h6>
                          <small class="text-muted text-truncate d-block">
                            {{ item.description || "No description" }}
                          </small>
                        </div>
                      </div>
                    </td>
                    <td class="text-center">
                      <span class="fw-semibold text-primary">{{
                        item.total_jobs.toLocaleString()
                      }}</span>
                    </td>
                    <td class="text-center">
                      <span class="fw-semibold text-info">{{
                        item.total_applicants.toLocaleString()
                      }}</span>
                    </td>
                    <td class="text-center">
                      <div
                        v-if="item.growth !== null"
                        class="d-flex align-items-center justify-content-center"
                      >
                        <i
                          class="fs-16 me-1"
                          :class="getGrowthIcon(item.growth)"
                          :style="`color: ${getGrowthColor(item.growth)}`"
                        ></i>
                        <span
                          class="fw-semibold"
                          :style="`color: ${getGrowthColor(item.growth)}`"
                        >
                          {{ formatGrowth(item.growth) }}
                        </span>
                      </div>
                      <span v-else class="text-muted">N/A</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </BCardBody>
      </BCard>
    </BCol>
  </BRow>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import Lottie from "@/components/widgets/lottie.vue";
import animationData from "@/components/widgets/fhtaantg.json";
import { getAnalytic4, getAvailableYears } from "@/api-request";

const availableYears = ref([]);
const loading = ref(false);
const selectedYear = ref(new Date().getFullYear());
const defaultOptions = { animationData };

// Year options from backend
const yearOptions = computed(() => {
  if (availableYears.value.length === 0) {
    return [{ value: selectedYear.value, text: selectedYear.value.toString() }];
  }
  return availableYears.value.map((year) => ({
    value: year,
    text: year.toString(),
  }));
});

// Fetch available years from backend
const fetchAvailableYears = async () => {
  try {
    const response = await getAvailableYears();
    availableYears.value = response.data.years;
    // Set selected year to the most recent year available
    if (availableYears.value.length > 0) {
      selectedYear.value = Math.max(...availableYears.value);
    }
  } catch (error) {
    console.error("Error fetching available years:", error);
  }
};

const summary = ref({
  total_categories: 0,
  total_jobs: 0,
  total_applicants: 0,
  avg_applications_per_job: 0,
});

const categoryChart = ref({
  series: [
    { name: "Job Vacancies", data: [] },
    { name: "Applicants", data: [] },
  ],
  options: {
    chart: {
      type: "line",
      height: 350,
      toolbar: { show: true },
      zoom: { enabled: true },
    },
    stroke: {
      width: 3,
      curve: "smooth",
    },
    markers: {
      size: 5,
      hover: {
        size: 7,
      },
    },
    xaxis: {
      categories: [],
      labels: {
        rotate: -45,
        style: {
          fontSize: "12px",
        },
      },
      title: {
        text: "Job Categories",
      },
    },
    yaxis: {
      title: { text: "Count" },
      labels: {
        formatter: function (val) {
          return val.toFixed(0);
        },
      },
    },
    colors: ["#3b82f6", "#10b981"],
    legend: {
      position: "top",
      horizontalAlign: "center",
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val.toLocaleString();
        },
      },
    },
    grid: {
      borderColor: "#f1f1f1",
    },
    dataLabels: {
      enabled: false,
    },
  },
});

const topCategories = ref([]);

// Helper functions for growth display
const getGrowthColor = (growth) => {
  if (growth > 0) return "#10b981"; // green for positive
  if (growth < 0) return "#ef4444"; // red for negative
  return "#6b7280"; // gray for zero
};

const getGrowthIcon = (growth) => {
  if (growth > 0) return "ri-arrow-up-line";
  if (growth < 0) return "ri-arrow-down-line";
  return "ri-minus-line";
};

const formatGrowth = (growth) => {
  if (growth === null) return "N/A";
  return `${growth > 0 ? "+" : ""}${growth.toFixed(1)}%`;
};

// Calculate growth percentage (current vs previous month)
const calculateGrowth = (current, previous) => {
  if (!previous || previous === 0) return null;
  return ((current - previous) / previous) * 100;
};

const fetchAnalytics = async () => {
  try {
    loading.value = true;
    const response = await getAnalytic4(selectedYear.value);
    const data = response.data.data;
    const responseSummary = response.data.summary;

    // Update summary
    summary.value = {
      total_categories: responseSummary?.total_categories || 0,
      total_jobs: responseSummary?.total_jobs || 0,
      total_applicants: responseSummary?.total_applicants || 0,
      avg_applications_per_job: responseSummary?.avg_applications_per_job || 0,
    };

    if (data && data.length > 0) {
      const categories = data.map((item) => item.category);
      const vacancies = data.map((item) => item.total_jobs);
      const applicants = data.map((item) => item.total_applicants);

      categoryChart.value.series[0].data = vacancies;
      categoryChart.value.series[1].data = applicants;
      categoryChart.value.options.xaxis.categories = categories;

      // Get top 10 categories sorted by total jobs and add growth data
      topCategories.value = [...data]
        .sort((a, b) => b.total_jobs - a.total_jobs)
        .slice(0, 10)
        .map((item) => ({
          ...item,
          // Simulate growth data (in real app, this would come from backend)
          growth: calculateGrowth(
            item.total_jobs,
            Math.max(0, item.total_jobs - Math.floor(Math.random() * 10))
          ),
        }));
    } else {
      // Reset data if no results
      categoryChart.value.series[0].data = [];
      categoryChart.value.series[1].data = [];
      categoryChart.value.options.xaxis.categories = [];
      topCategories.value = [];
    }
  } catch (error) {
    console.error("Failed to load analytics data:", error);

    // Reset data on error
    categoryChart.value.series[0].data = [];
    categoryChart.value.series[1].data = [];
    categoryChart.value.options.xaxis.categories = [];
    topCategories.value = [];
    summary.value = {
      total_categories: 0,
      total_jobs: 0,
      total_applicants: 0,
      avg_applications_per_job: 0,
    };
  } finally {
    loading.value = false;
  }
};

// Fix the method name to match the template
const fetchAnalyticsData = () => {
  fetchAnalytics();
};

onMounted(async () => {
  await fetchAvailableYears();
  fetchAnalytics();
});
</script>

<style scoped>
.card-animate {
  transition: all 0.3s ease;
}

.card-animate:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1) !important;
}

.spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.badge-soft {
  font-weight: 500;
}

.table > :not(caption) > * > * {
  padding: 0.75rem 0.5rem;
}

/* Ranking badge styles */
.badge[variant="light"] {
  background-color: #f8f9fa;
  color: #6c757d;
  font-weight: 600;
  min-width: 30px;
}

/* Growth indicator styles */
.growth-positive {
  color: #10b981;
}

.growth-negative {
  color: #ef4444;
}

.growth-neutral {
  color: #6b7280;
}
</style>
