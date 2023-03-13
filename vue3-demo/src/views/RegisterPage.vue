<template>
  <div class="w-50 m-auto p-5">
    <h4 class="text-center mb-3">Register Page</h4>
    <el-form :model="form" label-width="120px">
      <el-form-item label="Your name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="Email">
        <el-input v-model="form.email" />
      </el-form-item>
      <el-form-item label="Password">
        <el-input v-model="form.password" show-password />
      </el-form-item>
      <div class="text-center">
        <div>
          <el-button :loading="authStore.loading" @click="authStore.register(form.name, form.email, form.password)" type="primary">Register</el-button>
          <router-link class="ms-2" to="/login">login</router-link>
        </div>
        <div class="text-danger" v-if="authStore.error">{{ authStore.error }}</div>
      </div>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import {useRouter} from "vue-router"
import {useAuthStore} from "../stores/auth.js"
const authStore = useAuthStore()

// do not use same name with ref
const form = reactive({
  name: "",
  email: "",
  password: "",
});
const router = useRouter()

const createUser = async (form) => {
  
};
</script>
