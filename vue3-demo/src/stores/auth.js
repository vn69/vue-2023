import { ref, onMounted, watchEffect } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import { useRouter } from "vue-router";
import { markRaw } from 'vue'


export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const token = ref(null || localStorage.getItem("token"));
  const isAuthenticated = ref(false);
  const loading = ref(false);
  const error = ref(null);
  const router = markRaw(useRouter);

  watchEffect(() => {
    // do when the token changes, set headers axios
    console.log("token", token.value);
    if (token.value) {
      isAuthenticated.value = true;
      axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`;
    } else {
      axios.defaults.headers.common['Authorization'] = ""
    }
  });

  const login = async (email, password) => {
    try {
      error.value = "";
      loading.value = true;
      const res = await axios.post("http://localhost:3003/api/v1/user/login", {
        email,
        password,
      });
      console.log("login data", res);
      if (res.data.message == "ok") {
        // login
        console.log("login ok", res.data);
        isAuthenticated.value = true;
        token.value = res.data.data.token;
        localStorage.setItem("token", token.value);
        router.push("/about");
      } else {
        console.log("login failed", res.data.error);
        error.value = res.data.error;
      }
    } catch (err) {
      console.log("login failed", err);
      if (typeof err.error === "string") {
        error.value = err.error;
      } else {
        error.value = err.message;
      }
    } finally {
      loading.value = false;
    }
  };

  const register = async (name, email, password) => {
    try {
      error.value = "";
      loading.value = true;
      const res = await axios.post("http://localhost:3003/api/v1/user/create", {
        name,
        email,
        password,
      });
      console.log("register data", res);
      if (res.data.message == "ok") {
        console.log("register ok");
        router.push("login");
      } else {
        console.log("register failed", res.data.error);
        error.value = res.data.error;
      }
    } catch (err) {
      console.log("register failed", err);
      if (typeof err.error === "string") {
        error.value = err.error;
      } else {
        error.value = err.message;
      }
    } finally {
      loading.value = false;
    }
  };

  const logout = () => {
    isAuthenticated.value = false;
    token.value = null;
    localStorage.removeItem("token");
    router.push("/");
  };
  return { error, login, logout, register, loading, isAuthenticated, token };
});
