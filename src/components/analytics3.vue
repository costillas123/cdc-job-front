<template>
  <BRow class="mt-4">
    <!-- Applications Chart -->
    <BCol xxl="8">
      <BCard no-body class="border-0 shadow-sm">
        <BCardHeader class="align-items-center d-flex border-0 bg-transparent">
          <BCardTitle class="mb-0 flex-grow-1"
            >Applications Overview</BCardTitle
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
          <apexchart
            type="area"
            height="350"
            :options="applicationsChart.options"
            :series="applicationsChart.series"
          />
        </BCardBody>
      </BCard>
    </BCol>

    <!-- Application Status Distribution -->
    <BCol xxl="4">
      <BCard no-body class="border-0 shadow-sm">
        <BCardBody>
          <!-- Donut Chart -->
          <apexchart
            type="donut"
            height="280"
            :options="statusChart.options"
            :series="statusChart.series"
          />

          <!-- Status List -->
          <ul class="list-group list-group-flush mt-3">
            <li
              v-for="status in applicationStatus"
              :key="status.name"
              class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 py-1"
            >
              <div class="d-flex align-items-center gap-2">
                <i
                  :class="`ri-checkbox-blank-circle-fill text-${status.color}`"
                ></i>
                <span class="text-capitalize">{{ status.name }}</span>
              </div>
              <span class="fw-semibold" :class="`text-${status.color}`">
                {{ status.count }}
              </span>
            </li>
          </ul>
        </BCardBody>
      </BCard>
    </BCol>
  </BRow>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { getAnalytic3, getAvailableYears } from "@/api-request";

const loading = ref(false);
const availableYears = ref([]);
const analyticsData = ref(null);

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

// Application status with numbers
const applicationStatus = ref([
  { name: "Hired", count: 0, color: "success", percentage: 0 },
  { name: "Interview", count: 0, color: "info", percentage: 0 },
  { name: "Pending", count: 0, color: "warning", percentage: 0 },
  { name: "Rejected", count: 0, color: "danger", percentage: 0 },
  { name: "Withdrawn", count: 0, color: "secondary", percentage: 0 },
]);

// Chart data
const applicationsChart = ref({
  series: [
    {
      name: "Applications",
      data: [],
    },
  ],
  options: {
    chart: {
      height: 350,
      type: "area",
      toolbar: {
        show: false,
      },
    },
    colors: ["#3b82f6"],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
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
    },
    yaxis: {
      labels: {
        formatter: function (val) {
          return val.toFixed(0);
        },
      },
    },
    tooltip: {
      x: {
        format: "MMM",
      },
    },
    grid: {
      borderColor: "#f1f1f1",
    },
  },
});

const statusChart = ref({
  series: [0, 0, 0, 0, 0],
  options: {
    chart: {
      type: "donut",
      height: 280,
    },
    labels: ["Hired", "Interview", "Pending", "Rejected", "Withdrawn"],
    colors: ["#28a745", "#17a2b8", "#ffc107", "#dc3545", "#6c757d"],
    legend: {
      position: "bottom",
      labels: {
        colors: "#6c757d",
        useSeriesColors: false,
      },
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["#fff"],
    },
    // ✅ Hide numbers on donut slices
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        donut: {
          size: "65%",
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: "14px",
              color: "#6c757d",
            },
            value: {
              show: false, // hide values inside the donut area
            },
            total: {
              show: true,
              label: "Total",
              formatter: (w) =>
                w.globals.seriesTotals.reduce((a, b) => a + b, 0),
            },
          },
        },
      },
    },
    tooltip: {
      y: {
        formatter: (val) => `${val} applications`,
      },
    },
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

// Fetch analytics data
const fetchAnalyticsData = async () => {
  try {
    loading.value = true;

    const response = await getAnalytic3(selectedYear.value);
    const data = response.data.items;

    analyticsData.value = data;

    // Update applications chart
    if (data.monthly_applications) {
      applicationsChart.value.series[0].data = data.monthly_applications;
    }

    // Update status data
    if (data.application_status) {
      // Update status numbers
      applicationStatus.value = [
        {
          name: "Hired",
          count: data.application_status.hired || 0,
          color: "success",
        },
        {
          name: "Interview",
          count: data.application_status.interview || 0,
          color: "info",
        },
        {
          name: "Pending",
          count: data.application_status.pending || 0,
          color: "warning",
        },
        {
          name: "Rejected",
          count: data.application_status.rejected || 0,
          color: "danger",
        },
        {
          name: "Withdrawn",
          count: data.application_status.withdrawn || 0,
          color: "secondary",
        },
      ];

      // Update donut chart
      statusChart.value.series = [
        data.application_status.hired || 0,
        data.application_status.interview || 0,
        data.application_status.pending || 0,
        data.application_status.rejected || 0,
        data.application_status.withdrawn || 0,
      ];

      statusChart.value.options.labels = [
        "Hired",
        "Interview",
        "Pending",
        "Rejected",
        "Withdrawn",
      ];
    }
  } catch (error) {
    console.error("Error fetching analytics data:", error);

    // Fallback to sample data
    applicationsChart.value.series[0].data = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ];

    applicationStatus.value = [
      { name: "Hired", count: 0, color: "success" },
      { name: "Interview", count: 0, color: "info" },
      { name: "Pending", count: 0, color: "warning" },
      { name: "Rejected", count: 0, color: "danger" },
      { name: "Withdrawn", count: 0, color: "secondary" },
    ];

    statusChart.value.series = [0, 0, 0, 0, 0];
    statusChart.value.options.labels = [
      "Hired",
      "Interview",
      "Pending",
      "Rejected",
      "Withdrawn",
    ];
  } finally {
    loading.value = false;
  }
};

// Auto-refresh data
const startAutoRefresh = () => {
  setInterval(fetchAnalyticsData, 5 * 60 * 1000);
};

onMounted(async () => {
  await fetchAvailableYears();
  await fetchAnalyticsData();
  startAutoRefresh();
});
</script>
