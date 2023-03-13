<template>
  <component :is="layout">
    <RouterView />
  </component>
</template>

<script setup>
import { computed } from "vue";
import { RouterView, useRoute } from "vue-router";
import DefaultLayout from "./layout/DefaultLayout.vue";
import Base from "./layout/base.vue";

const router = useRoute();
const layout = computed(() => {
  switch (router.meta.layout) {
    case "default":
      return DefaultLayout;
    case "base":
      return Base;

    default:
      return DefaultLayout;
  }
});
</script>

<style scoped></style>
