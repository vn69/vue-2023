<template>
  <div class="w-50 m-auto p-5">
    <h4 class="text-center mb-3">Login Page</h4>
    <el-form :model="form" label-width="120px">
      <el-form-item label="Email">
        <el-input name="email" v-model="form.email" />
      </el-form-item>
      <el-form-item label="Password">
        <el-input
          nam="password"
          type="password"
          v-model="form.password"
          show-password
        />
      </el-form-item>
      <div class="text-center">
        <div>
          <el-button
            :loading="authStore.loading"
            @click="authStore.login(form.email, form.password)"
            type="primary"
            >Login</el-button
          >
          <router-link class="mx-2" to="/register">register</router-link>
        </div>
        <div class="text-danger" v-if="authStore.error">
          {{ authStore.error }}
        </div>
      </div>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, ref, watch, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth.js";

const router = useRouter();
// console.log(123, router);

const authStore = useAuthStore();

// do not use same name with ref
const form = reactive({
  email: "",
  password: "",
});
</script>
