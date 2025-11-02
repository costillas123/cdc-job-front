<template>
  <BCard no-body>
    <BCardHeader class="border-0 align-items-center d-flex">
      <BCardTitle class="mb-0 flex-grow-1"
        >Job Applications & Vacancies Overview</BCardTitle
      >
      <div class="hstack gap-1">
        <BFormSelect
          v-model="selectedYear"
          :options="yearOptions"
          style="width: 120px"
          :disabled="loading"
          @change="filterData"
        />
        <BButton
          variant="outline-secondary"
          @click="fetchDashboardData"
          :disabled="loading"
        >
          <i class="bx bx-refresh fs-14" :class="{ 'bx-spin': loading }"></i>
        </BButton>
      </div>
    </BCardHeader>

    <BCardHeader class="p-0 border-0 bg-light-subtle">
      <BRow class="g-0 text-center">
        <BCol cols="6" sm="3">
          <div class="p-3 border border-dashed border-start-0">
            <h5 class="mb-1">
              <CountTo
                :duration="1000"
                :startVal="0"
                :endVal="stats.newApplications"
              />
            </h5>
            <p class="text-muted mb-0">New Applications</p>
          </div>
        </BCol>
        <BCol cols="6" sm="3">
          <div class="p-3 border border-dashed border-start-0">
            <h5 class="mb-1">
              <CountTo
                :duration="1000"
                :startVal="0"
                :endVal="stats.rejected"
              />
            </h5>
            <p class="text-muted mb-0">Rejected</p>
          </div>
        </BCol>
        <BCol cols="6" sm="3">
          <div class="p-3 border border-dashed border-start-0">
            <h5 class="mb-1">
              <CountTo :duration="1000" :startVal="0" :endVal="stats.hired" />
            </h5>
            <p class="text-muted mb-0">Hired</p>
          </div>
        </BCol>
        <BCol cols="6" sm="3">
          <div class="p-3 border border-dashed border-start-0 border-end-0">
            <h5 class="mb-1 text-success">
              <CountTo
                :duration="1000"
                :startVal="0"
                :endVal="stats.totalApplicants"
              />
            </h5>
            <p class="text-muted mb-0">Total Applicants</p>
          </div>
        </BCol>
      </BRow>
    </BCardHeader>
    <BCardBody class="p-0 pb-2">
      <div>
        <apexchart
          class="apex-charts"
          height="374"
          dir="ltr"
          :series="series"
          :options="chartOptions"
        />
      </div>
    </BCardBody>
  </BCard>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { CountTo } from "vue3-count-to";
import getChartColorsArray from "@/common/getChartColorsArray";
import { getAnalytic2, getAvailableYears } from "@/api-request";

// Reactive data
const series = ref([]);
const stats = ref({
  newApplications: 0,
  rejected: 0,
  hired: 0,
  totalApplicants: 0,
});
const loading = ref(false);
const availableYears = ref([]);

// Selected year
const selectedYear = ref(new Date().getFullYear());

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

// Chart options
const chartOptions = ref({
  chart: {
    height: 374,
    type: "line",
    toolbar: {
      show: false,
    },
  },
  stroke: {
    curve: "smooth",
    dashArray: [0, 3, 0],
    width: [0, 1, 0],
  },
  fill: {
    opacity: [1, 0.1, 1],
  },
  markers: {
    size: [0, 4, 0],
    strokeWidth: 2,
    hover: {
      size: 4,
    },
  },
  xaxis: {
    categories: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    axisTicks: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
  },
  grid: {
    show: true,
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: false,
      },
    },
    padding: {
      top: 0,
      right: -2,
      bottom: 15,
      left: 10,
    },
  },
  legend: {
    show: true,
    horizontalAlign: "center",
    offsetX: 0,
    offsetY: -5,
    markers: {
      width: 9,
      height: 9,
      radius: 6,
    },
    itemMargin: {
      horizontal: 10,
      vertical: 0,
    },
  },
  plotOptions: {
    bar: {
      columnWidth: "30%",
      barHeight: "70%",
    },
  },
  colors: getChartColorsArray(
    '["--vz-primary", "--vz-warning", "--vz-success"]'
  ),
  tooltip: {
    shared: true,
    y: [
      {
        formatter: function (y) {
          if (typeof y !== "undefined") {
            return y.toFixed(0) + " applications";
          }
          return y;
        },
      },
      {
        formatter: function (y) {
          if (typeof y !== "undefined") {
            return y.toFixed(0) + " hired";
          }
          return y;
        },
      },
      {
        formatter: function (y) {
          if (typeof y !== "undefined") {
            return y.toFixed(0) + " jobs";
          }
          return y;
        },
      },
    ],
  },
});

// Fetch available years from backend
const fetchAvailableYears = async () => {
  try {
    const response = await getAvailableYears();
    availableYears.value = response.data.years;
    // Set selected year to the most recent year available
    if (availableYears.value.length > 0) {
      selectedYear.value = availableYears.value[0];
    }
  } catch (error) {
    console.error("Error fetching available years:", error);
  }
};

// Fetch data from backend
const fetchDashboardData = async () => {
  loading.value = true;
  try {
    const response = await getAnalytic2(selectedYear.value);
    const data = response.data.items;

    // Update series with backend data
    if (data.monthly) {
      series.value = [
        {
          name: "Job Applications",
          type: "bar",
          data: data.monthly.applications || [],
        },
        {
          name: "Hired Candidates",
          type: "area",
          data: data.monthly.hired || [],
        },
        {
          name: "Job Postings",
          type: "bar",
          data: data.monthly.jobPostings || [],
        },
      ];
    }

    // Update stats with backend data
    if (data.summary) {
      stats.value = {
        newApplications: data.summary.newApplications || 0,
        rejected: data.summary.rejected || 0,
        hired: data.summary.hired || 0,
        totalApplicants: data.summary.totalApplicants || 0,
      };
    }
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
  } finally {
    loading.value = false;
  }
};

// Filter function for years
const filterData = async () => {
  await fetchDashboardData();
};

// Fetch data when component mounts
onMounted(async () => {
  await fetchAvailableYears();
  await fetchDashboardData();
});
</script>
