import { ref, computed, onMounted } from "vue";
import { fetchAttributes, fetchCategories } from "@/api-request";
import Toast from "@/helpers/Toast";

export function useJobFilters() {
  const jobConfigs = ref([]); // For job types, locations, levels, etc.
  const categories = ref([]); // For categories and sub-categories

  // --- Computed Details ---
  const categoryDetails = computed(() => {
    return categories.value || [];
  });

  const subCategoriesDetails = computed(() => {
    return categories.value.flatMap(
      (category) => category.sub_categories || []
    );
  });

  const typeDetails = computed(() => {
    return getJobConfigDetails("types");
  });

  const skillDetails = computed(() => {
    return getJobConfigDetails("skills");
  });

  const levelDetails = computed(() => {
    return getJobConfigDetails("levels");
  });

  const locationDetails = computed(() => {
    return getJobConfigDetails("locations");
  });

  const benefitDetails = computed(() => {
    return getJobConfigDetails("benefits");
  });

  const qualificationDetails = computed(() => {
    return getJobConfigDetails("qualifications");
  });

  const languageDetails = computed(() => {
    return getJobConfigDetails("languages");
  });

  const industryDetails = computed(() => {
    return getJobConfigDetails("industries");
  });

  // Helper function to get job config details by slug
  const getJobConfigDetails = (slug) => {
    const config = jobConfigs.value.find((item) => item.slug === slug);
    return config ? config.sub_attributes : [];
  };

  // Helper function to get sub-categories by category ID
  const getSubCategoriesByCategory = (categoryId) => {
    let subCategories = [];

    if (!categoryId) {
      // Get all sub-categories from all categories
      subCategories = categories.value.flatMap(
        (cat) => cat.sub_categories || []
      );
    } else {
      // Get sub-categories for specific category
      const category = categories.value.find((cat) => cat.id === categoryId);
      subCategories = category?.sub_categories || [];
    }

    // Format the results
    return subCategories.map((subCat) => ({
      value: subCat.id,
      label: subCat.name,
    }));
  };

  const getSubCategoryNames = (subCategoryIds) => {
  return subCategoryIds.map(id => {
    const subCategory = subCategoriesDetails.value.find(sub => sub.id === id);
    return subCategory ? subCategory.name : `Unknown (${id})`;
  });
};

  // --- API Fetch ---
  const fetchAllData = async () => {
    try {
      const [configsRes, categoriesRes] = await Promise.all([
        fetchAttributes(),
        fetchCategories(),
      ]);

      jobConfigs.value = configsRes.data || configsRes;
      categories.value = categoriesRes.data || categoriesRes;
    } catch (error) {
      Toast.fire({
        icon: "error",
        title:
          error.response?.data?.message ||
          "An error occurred while processing.",
      });
    }
  };

  onMounted(() => {
    fetchAllData();
  });

  return {
    categoryDetails,
    subCategoriesDetails,
    typeDetails,
    skillDetails,
    levelDetails,
    locationDetails,
    benefitDetails,
    qualificationDetails,
    languageDetails,
    industryDetails,
    getSubCategoriesByCategory,
    getSubCategoryNames,
    // jobConfigs,
    // categories,
  };
}
