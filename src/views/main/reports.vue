<template>
  <Layout>
    <PageHeader title="Reports & Analytics" pageTitle="Dashboard" />

    <!-- Report Filters -->
    <BCard no-body class="border-0 shadow-sm mb-4">
      <BCardBody>
        <div class="d-flex flex-wrap align-items-end gap-3">
          <!-- Date Range Picker -->

          <div style="width: 300px">
            <label for="range-datepicker" class="form-label fw-semibold">
              Date Range
            </label>
            <div class="input-group">
              <span class="input-group-text" id="basic-addon1">
                <i class="ri-calendar-2-line"></i>
              </span>
              <flat-pickr
                v-model="filters.dateRange"
                :config="rangeDateconfig"
                class="form-control"
                id="range-datepicker"
                placeholder="Select date range"
              />
            </div>
          </div>

          <!-- Report Type -->
          <div style="max-width: 200px">
            <label class="form-label fw-semibold">Report Type</label>
            <BFormSelect v-model="filters.reportType" :options="reportTypes" />
          </div>

          <!-- User Type (conditional) -->
          <div v-if="filters.reportType === 'users'" style="max-width: 180px">
            <label class="form-label fw-semibold">User Type</label>
            <BFormSelect v-model="filters.userType" :options="userTypes" />
          </div>

          <!-- Status -->
          <div style="max-width: 180px">
            <label class="form-label fw-semibold">Status</label>
            <BFormSelect v-model="filters.status" :options="statusOptions" />
          </div>

          <div style="max-width: 180px">
            <label class="form-label fw-semibold">Generate Type</label>
            <BFormSelect
              v-model="filters.format"
              :options="[
                { value: '', text: 'Select Type' },
                { value: 'pdf', text: 'PDF' },
                { value: 'excel', text: 'Excel' },
              ]"
              aria-label="Select generate type"
            />
          </div>

          <!-- Generate Button -->
          <div class="ms-auto">
            <BButton variant="primary" class="me-2" @click="generateReport">
              <i class="ri-refresh-line me-1"></i>Generate Report
            </BButton>
          </div>
        </div>
      </BCardBody>
    </BCard>

    <!-- Analytics -->
    <Analytics1 />

    <Analytics2 />

    <Analytics3 />

    <Analytics4 />

    <!-- Loading Modal -->
    <BModal
      v-model="showLoading"
      centered
      hide-footer
      hide-header
      class="v-modal-custom"
    >
      <div class="text-center p-4">
        <lottie :options="loadingOptions" :height="100" :width="100" />
        <h5 class="mt-3">Generating Report...</h5>
        <p class="text-muted mb-0">Please wait while we prepare your report.</p>
      </div>
    </BModal>
  </Layout>
</template>

<script setup>
import { ref } from "vue";

import PageHeader from "@/components/page-header";
import Layout from "@/layouts/main.vue";

import Lottie from "@/components/widgets/lottie.vue";
import animationData from "@/components/widgets/msoeawqm.json";

import Analytics1 from "@/components/analytics1.vue";
import Analytics2 from "@/components/analytics2.vue";
import Analytics3 from "@/components/analytics3.vue";
import Analytics4 from "@/components/analytics4.vue";

import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";

import { processReportSelected } from "@/api-request";

const loadingOptions = { animationData };

// Reactive data
const rangeDateconfig = {
  mode: "range",
  dateFormat: "d M, Y",
};

const filters = ref({
  dateRange: [],
  format: "",
  reportType: "",
  userType: "all",
  status: "all",
  chartPeriod: "month",
});
const showLoading = ref(false);

// Sample data
const reportTypes = [
  { value: "", text: "Select Report" },
  { value: "applications", text: "Applications Report" },
  { value: "jobs", text: "Jobs Vacancies Report" },
  { value: "users", text: "Users Report" },
];

const userTypes = [
  { value: "all", text: "All Users" },
  { value: "job_seeker", text: "Job Seekers" },
  { value: "employer", text: "Employers" },
  { value: "peso_school", text: "Peso School" },
];

const statusOptions = [
  { value: "all", text: "All Status" },
  { value: "active", text: "Active" },
  { value: "inactive", text: "Inactive" },
  { value: "pending", text: "Pending" },
];

// Action methods
import Toast from "@/helpers/Toast";

const getReportFilename = (type) => {
  const item = reportTypes.find((rt) => rt.value === type);
  if (!item) return "report";

  return item.text.toLowerCase().replace(/ /g, "_");
};

const generateReport = async () => {
  // ✅ Validate date range
  if (!filters.value.dateRange?.length || filters.value.dateRange.length < 2) {
    Toast.fire({
      icon: "warning",
      title: "Please select a valid date range before generating the report.",
    });
    return;
  }

  // ✅ Validate report type
  if (!filters.value.reportType) {
    Toast.fire({
      icon: "warning",
      title: "Please select a report type before generating the report.",
    });
    return;
  }

  // ✅ Validate format
  if (!filters.value.format) {
    Toast.fire({
      icon: "warning",
      title: "Please select a format (PDF or Excel).",
    });
    return;
  }

  showLoading.value = true;

  try {
    const response = await processReportSelected(filters.value);

    // ✅ Build filename dynamically
    const baseName = getReportFilename(filters.value.reportType);
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const extension = filters.value.format === "excel" ? "xlsx" : "pdf";

    const filename = `${baseName}_${timestamp}.${extension}`;

    // ✅ Detect MIME type
    const contentType =
      response.headers["content-type"] ||
      (filters.value.format === "excel"
        ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        : "application/pdf");

    const blob = new Blob([response.data], { type: contentType });
    const url = URL.createObjectURL(blob);

    // ✅ Trigger browser download
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);

    Toast.fire({
      icon: "success",
      title: "Report generated successfully!",
    });
  } catch (error) {
    console.error("Failed to generate report:", error);
    Toast.fire({
      icon: "error",
      title: "Failed to generate the report. Please try again.",
    });
  } finally {
    showLoading.value = false;
  }
};

// const generateReport = async () => {
//   // ✅ Validation before proceeding
//   if (!filters.value.dateRange?.length || filters.value.dateRange.length < 2) {
//     Toast.fire({
//       icon: "warning",
//       title: "Please select a valid date range before generating the report.",
//     });
//     return;
//   }

//   if (!filters.value.reportType) {
//     Toast.fire({
//       icon: "warning",
//       title: "Please select a report type before generating the report.",
//     });
//     return;
//   }

//   // ✅ Proceed if validation passes
//   showLoading.value = true;

//   try {
//     const response = await processReportSelected(filters.value);

//     const blob = new Blob([response.data], { type: "application/pdf" });
//     const link = document.createElement("a");
//     link.href = URL.createObjectURL(blob);
//     link.download = `Job_Vacancies_Report_${new Date().toISOString()}.pdf`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);

//     // ✅ Success toast
//     Toast.fire({
//       icon: "success",
//       title: response?.message || "Report generated successfully!",
//     });
//   } catch (error) {
//     console.error("Failed to generate report:", error);
//     Toast.fire({
//       icon: "error",
//       title: "Failed to generate the report. Please try again.",
//     });
//   } finally {
//     showLoading.value = false;
//   }
// };
</script>
