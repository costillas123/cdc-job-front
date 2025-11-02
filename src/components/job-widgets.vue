<template>
  <BCol xl="12">
    <div class="d-flex flex-column h-100">
      <BRow>
        <!-- Total Jobs -->
        <BCol xl="4" md="6">
          <BCard no-body class="card-animate overflow-hidden">
            <div
              class="position-absolute start-0 widget-pattern"
              style="z-index: 0"
            >
              <svg
                version="1.2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 200 120"
                width="200"
                height="120"
              >
                <path
                  id="Shape 8"
                  class="s0"
                  d="m189.5-25.8c0 0 20.1 46.2-26.7 71.4 0 0-60 15.4-62.3 65.3-2.2 49.8-50.6 59.3-57.8 61.5-7.2 2.3-60.8 0-60.8 0l-11.9-199.4z"
                />
              </svg>
            </div>
            <BCardBody style="z-index: 1">
              <div class="d-flex align-items-center">
                <div class="flex-grow-1 overflow-hidden">
                  <p
                    class="text-uppercase fw-medium text-muted text-truncate mb-3"
                  >
                    Total Jobs
                  </p>
                  <h4 class="fs-22 fw-semibold ff-secondary mb-0">
                    <count-to
                      :startVal="0"
                      :endVal="widgetsData.totalJobs"
                      :duration="2000"
                    ></count-to>
                  </h4>
                </div>
                <div class="flex-shrink-0">
                  <apexchart
                    class="apex-charts"
                    dir="ltr"
                    width="105px"
                    height="90px"
                    :series="[widgetsData.totalJobsPercentage || 0]"
                    :options="{ ...chartOptions }"
                  ></apexchart>
                </div>
              </div>
            </BCardBody>
          </BCard>
        </BCol>

        <!-- Apply Jobs -->
        <BCol xl="4" md="6">
          <BCard no-body class="card-animate overflow-hidden">
            <div
              class="position-absolute start-0 widget-pattern"
              style="z-index: 0"
            >
              <svg
                version="1.2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 200 120"
                width="200"
                height="120"
              >
                <path
                  id="Shape 8"
                  class="s0"
                  d="m189.5-25.8c0 0 20.1 46.2-26.7 71.4 0 0-60 15.4-62.3 65.3-2.2 49.8-50.6 59.3-57.8 61.5-7.2 2.3-60.8 0-60.8 0l-11.9-199.4z"
                />
              </svg>
            </div>
            <BCardBody style="z-index: 1">
              <div class="d-flex align-items-center">
                <div class="flex-grow-1 overflow-hidden">
                  <p
                    class="text-uppercase fw-medium text-muted text-truncate mb-3"
                  >
                    Total Applications
                  </p>
                  <h4 class="fs-22 fw-semibold ff-secondary mb-0">
                    <count-to
                      :startVal="0"
                      :endVal="widgetsData.totalApplications"
                      :duration="2000"
                    ></count-to>
                  </h4>
                </div>
                <div class="flex-shrink-0">
                  <apexchart
                    class="apex-charts"
                    dir="ltr"
                    width="105px"
                    height="90px"
                    :series="[widgetsData.totalApplicationsPercentage || 0]"
                    :options="{ ...chartOptions }"
                  ></apexchart>
                </div>
              </div>
            </BCardBody>
          </BCard>
        </BCol>

        <!-- New Jobs -->
        <BCol xl="4" md="6">
          <BCard no-body class="card-animate overflow-hidden">
            <div
              class="position-absolute start-0 widget-pattern"
              style="z-index: 0"
            >
              <svg
                version="1.2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 200 120"
                width="200"
                height="120"
              >
                <path
                  id="Shape 8"
                  class="s0"
                  d="m189.5-25.8c0 0 20.1 46.2-26.7 71.4 0 0-60 15.4-62.3 65.3-2.2 49.8-50.6 59.3-57.8 61.5-7.2 2.3-60.8 0-60.8 0l-11.9-199.4z"
                />
              </svg>
            </div>
            <BCardBody style="z-index: 1">
              <div class="d-flex align-items-center">
                <div class="flex-grow-1 overflow-hidden">
                  <p
                    class="text-uppercase fw-medium text-muted text-truncate mb-3"
                  >
                    New Jobs This Month
                  </p>
                  <h4 class="fs-22 fw-semibold ff-secondary mb-0">
                    <count-to
                      :startVal="0"
                      :endVal="widgetsData.newJobs"
                      :duration="2000"
                    ></count-to>
                  </h4>
                </div>
                <div class="flex-shrink-0">
                  <apexchart
                    class="apex-charts"
                    dir="ltr"
                    width="105px"
                    height="90px"
                    :series="[widgetsData.newJobsPercentage || 0]"
                    :options="{ ...chartOptions }"
                  ></apexchart>
                </div>
              </div>
            </BCardBody>
          </BCard>
        </BCol>

        <!-- Interview -->
        <BCol xl="4" md="6">
          <BCard no-body class="card-animate overflow-hidden">
            <div
              class="position-absolute start-0 widget-pattern"
              style="z-index: 0"
            >
              <svg
                version="1.2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 200 120"
                width="200"
                height="120"
              >
                <path
                  id="Shape 8"
                  class="s0"
                  d="m189.5-25.8c0 0 20.1 46.2-26.7 71.4 0 0-60 15.4-62.3 65.3-2.2 49.8-50.6 59.3-57.8 61.5-7.2 2.3-60.8 0-60.8 0l-11.9-199.4z"
                />
              </svg>
            </div>
            <BCardBody style="z-index: 1">
              <div class="d-flex align-items-center">
                <div class="flex-grow-1 overflow-hidden">
                  <p
                    class="text-uppercase fw-medium text-muted text-truncate mb-3"
                  >
                    Interview
                  </p>
                  <h4 class="fs-22 fw-semibold ff-secondary mb-0">
                    <count-to
                      :startVal="0"
                      :endVal="widgetsData.interview"
                      :duration="2000"
                    ></count-to>
                  </h4>
                </div>
                <div class="flex-shrink-0">
                  <apexchart
                    class="apex-charts"
                    dir="ltr"
                    width="105px"
                    height="90px"
                    :series="[widgetsData.interviewPercentage || 0]"
                    :options="{ ...chartOptions, ...interviewChartColors }"
                  ></apexchart>
                </div>
              </div>
            </BCardBody>
          </BCard>
        </BCol>

        <!-- Hired -->
        <BCol xl="4" md="6">
          <BCard no-body class="card-animate overflow-hidden">
            <div
              class="position-absolute start-0 widget-pattern"
              style="z-index: 0"
            >
              <svg
                version="1.2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 200 120"
                width="200"
                height="120"
              >
                <path
                  id="Shape 8"
                  class="s0"
                  d="m189.5-25.8c0 0 20.1 46.2-26.7 71.4 0 0-60 15.4-62.3 65.3-2.2 49.8-50.6 59.3-57.8 61.5-7.2 2.3-60.8 0-60.8 0l-11.9-199.4z"
                />
              </svg>
            </div>
            <BCardBody style="z-index: 1">
              <div class="d-flex align-items-center">
                <div class="flex-grow-1 overflow-hidden">
                  <p
                    class="text-uppercase fw-medium text-muted text-truncate mb-3"
                  >
                    Hired
                  </p>
                  <h4 class="fs-22 fw-semibold ff-secondary mb-0">
                    <count-to
                      :startVal="0"
                      :endVal="widgetsData.hired"
                      :duration="2000"
                    ></count-to>
                  </h4>
                </div>
                <div class="flex-shrink-0">
                  <apexchart
                    class="apex-charts"
                    dir="ltr"
                    width="105px"
                    height="90px"
                    :series="[widgetsData.hiredPercentage || 0]"
                    :options="{ ...chartOptions, ...hiredChartColors }"
                  ></apexchart>
                </div>
              </div>
            </BCardBody>
          </BCard>
        </BCol>

        <!-- Rejected -->
        <BCol xl="4" md="6">
          <BCard no-body class="card-animate overflow-hidden">
            <div
              class="position-absolute start-0 widget-pattern"
              style="z-index: 0"
            >
              <svg
                version="1.2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 200 120"
                width="200"
                height="120"
              >
                <path
                  id="Shape 8"
                  class="s0"
                  d="m189.5-25.8c0 0 20.1 46.2-26.7 71.4 0 0-60 15.4-62.3 65.3-2.2 49.8-50.6 59.3-57.8 61.5-7.2 2.3-60.8 0-60.8 0l-11.9-199.4z"
                />
              </svg>
            </div>
            <BCardBody style="z-index: 1">
              <div class="d-flex align-items-center">
                <div class="flex-grow-1 overflow-hidden">
                  <p
                    class="text-uppercase fw-medium text-muted text-truncate mb-3"
                  >
                    Rejected
                  </p>
                  <h4 class="fs-22 fw-semibold ff-secondary mb-0">
                    <count-to
                      :startVal="0"
                      :endVal="widgetsData.rejected"
                      :duration="2000"
                    ></count-to>
                  </h4>
                </div>
                <div class="flex-shrink-0">
                  <apexchart
                    class="apex-charts"
                    dir="ltr"
                    width="105px"
                    height="90px"
                    :series="[widgetsData.rejectedPercentage || 0]"
                    :options="{ ...chartOptions, ...rejectedChartColors }"
                  ></apexchart>
                </div>
              </div>
            </BCardBody>
          </BCard>
        </BCol>
      </BRow>
    </div>
  </BCol>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { CountTo } from "vue3-count-to";
import { getJobWidgets } from "@/api-request";

// Reactive data for widgets
const widgetsData = ref({
  totalJobs: 0,
  totalJobsPercentage: 0,
  totalApplications: 0,
  totalApplicationsPercentage: 0,
  newJobs: 0,
  newJobsPercentage: 0,
  interview: 0,
  interviewPercentage: 0,
  hired: 0,
  hiredPercentage: 0,
  rejected: 0,
  rejectedPercentage: 0,
});

// Chart options
const chartOptions = ref({
  chart: {
    type: "radialBar",
    width: 105,
    sparkline: {
      enabled: true,
    },
  },
  dataLabels: {
    enabled: false,
  },
  plotOptions: {
    radialBar: {
      hollow: {
        margin: 0,
        size: "70%",
      },
      track: {
        margin: 1,
      },
      dataLabels: {
        show: true,
        name: {
          show: false,
        },
        value: {
          show: true,
          fontSize: "16px",
          fontWeight: 600,
          offsetY: 8,
        },
      },
    },
  },
  colors: ["#0ab39c"],
});

// Different colors for different statuses
const interviewChartColors = ref({
  colors: ["#f7b84b"],
});

const hiredChartColors = ref({
  colors: ["#0ab39c"],
});

const rejectedChartColors = ref({
  colors: ["#f06548"],
});

// Fetch widgets data from backend
const fetchWidgetsData = async () => {
  try {
    const response = await getJobWidgets();
    const data = response.data;

    // Update widgets data with backend response
    widgetsData.value = {
      totalJobs: data.totalJobs || 0,
      totalJobsPercentage: data.totalJobsPercentage || 0,
      totalApplications: data.totalApplications || 0,
      totalApplicationsPercentage: data.totalApplicationsPercentage || 0,
      newJobs: data.newJobs || 0,
      newJobsPercentage: data.newJobsPercentage || 0,
      interview: data.interview || 0,
      interviewPercentage: data.interviewPercentage || 0,
      hired: data.hired || 0,
      hiredPercentage: data.hiredPercentage || 0,
      rejected: data.rejected || 0,
      rejectedPercentage: data.rejectedPercentage || 0,
    };
  } catch (error) {
    console.error("Error fetching widgets data:", error);
    // Set default values in case of error
    widgetsData.value = {
      totalJobs: 0,
      totalJobsPercentage: 0,
      totalApplications: 0,
      totalApplicationsPercentage: 0,
      newJobs: 0,
      newJobsPercentage: 0,
      interview: 0,
      interviewPercentage: 0,
      hired: 0,
      hiredPercentage: 0,
      rejected: 0,
      rejectedPercentage: 0,
    };
  }
};

// Fetch data when component mounts
onMounted(() => {
  fetchWidgetsData();
});
</script>
