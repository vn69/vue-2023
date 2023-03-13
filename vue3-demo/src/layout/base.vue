<template>
  <header class="w-100 d-flex justify-content-center">
    <RouterLink to="/">Home</RouterLink> | <RouterLink to="/about">About</RouterLink> | <RouterLink to="/cat-gpt">CatGPT</RouterLink> | <RouterLink to="/todo-list">Todo List</RouterLink> |
    <RouterLink v-if="!authStore.isAuthenticated" to="/login">Login</RouterLink> | <RouterLink v-if="!authStore.isAuthenticated"  to="/register">Register</RouterLink> |
    <RouterLink v-if="authStore.isAuthenticated"  to="/sign-out">signOut</RouterLink> |
  </header>
  <slot></slot>
</template>

<script setup>
import { RouterLink } from "vue-router";
import {useAuthStore} from "../stores/auth.js"
const authStore = useAuthStore()

console.log("render layout base");
</script>
