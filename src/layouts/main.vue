<script>
import { layoutComputed } from "@/state/helpers";
import Horizontal from "./app-menu";

export default {
  components: {
    Horizontal,
  },
  data() {
    return {};
  },
  computed: {
    ...layoutComputed,
  },
  mounted() {
    // document.querySelector("html").setAttribute('dir', 'rtl');
  },
};
</script>

<template>
  <div>
    <Horizontal v-if="layoutType === 'horizontal'" :layout="layoutType">
      <slot />
    </Horizontal>
  </div>
</template>
