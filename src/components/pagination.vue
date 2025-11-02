<script setup>
import { ref, computed, defineProps, defineEmits } from "vue";

const props = defineProps({
  currentPage: { type: Number, default: 1 },
  perPage: { type: Number, default: 10 },
  total: { type: Number, default: 0 },
});
const emit = defineEmits(["pageChange", "perPageChange"]);

const localPerPage = ref(props.perPage);

const totalPages = computed(() => Math.ceil(props.total / localPerPage.value));
const from = computed(() =>
  props.total === 0 ? 0 : (props.currentPage - 1) * localPerPage.value + 1
);
const to = computed(() =>
  Math.min(props.currentPage * localPerPage.value, props.total)
);

const visiblePages = computed(() => {
  const pages = [];
  if (totalPages.value <= 7) {
    for (let i = 1; i <= totalPages.value; i++) pages.push(i);
  } else {
    pages.push(1);
    let start = Math.max(2, props.currentPage - 2);
    let end = Math.min(totalPages.value - 1, props.currentPage + 2);
    if (props.currentPage <= 4) end = 5;
    else if (props.currentPage >= totalPages.value - 3)
      start = totalPages.value - 4;

    if (start > 2) pages.push("…");
    for (let i = start; i <= end; i++) pages.push(i);
    if (end < totalPages.value - 1) pages.push("…");
    pages.push(totalPages.value);
  }
  return pages;
});

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) emit("pageChange", page);
};
const updatePerPage = () => emit("perPageChange", localPerPage.value);
</script>

<template>
  <BRow class="g-0 text-center text-sm-start align-items-center">
    <!-- Showing info + per-page select -->
    <BCol sm="4" class="d-flex align-items-center gap-3">
      <!-- Showing text -->
      <p class="mb-0 text-muted">
        Showing <span class="fw-semibold">{{ from }}</span> to
        <span class="fw-semibold">{{ to }}</span> of
        <span class="fw-semibold text-decoration-underline">{{ total }}</span>
        entries
      </p>

      <!-- Per-page selector -->
      <BFormSelect
        v-model="localPerPage"
        :options="[10, 20, 30, 50, 100]"
        class="w-auto"
        @change="updatePerPage"
      />
    </BCol>

    <!-- Pagination buttons -->
    <BCol sm="8" class="d-flex justify-content-end">
      <ul class="pagination pagination-separated mb-0">
        <li :class="['page-item', { disabled: props.currentPage <= 1 }]">
          <BLink
            href="#"
            class="page-link"
            @click.prevent="changePage(props.currentPage - 1)"
          >
            Previous
          </BLink>
        </li>

        <li
          v-for="(p, i) in visiblePages"
          :key="i"
          :class="[
            'page-item',
            { active: props.currentPage === p, disabled: p === '…' },
          ]"
        >
          <BLink
            v-if="p !== '…'"
            href="#"
            class="page-link"
            @click.prevent="changePage(p)"
          >
            {{ p }}
          </BLink>
          <span v-else class="page-link">…</span>
        </li>

        <li
          :class="['page-item', { disabled: props.currentPage >= totalPages }]"
        >
          <BLink
            href="#"
            class="page-link"
            @click.prevent="changePage(props.currentPage + 1)"
          >
            Next
          </BLink>
        </li>
      </ul>
    </BCol>
  </BRow>
</template>
