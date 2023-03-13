<template>
  <div class="w-50 m-auto p-5">
    <h4 class="text-center mb-3">Sign Out Page</h4>
  </div>
</template>

<script setup>
import {useAuthStore} from "../stores/auth.js"
const authStore = useAuthStore()

authStore.logout()

</script>
