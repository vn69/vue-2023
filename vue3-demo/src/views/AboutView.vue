<template>
  <h1>{{ authStore.isAuthenticated ? "you are login!" : "who are you?" }}</h1>
  <h5>product</h5>

  <el-form class="w-25" :model="productForm" label-width="120px">
    <el-form-item label="name">
      <el-input v-model="productForm.name" />
    </el-form-item>
    <el-form-item label="price">
      <el-input v-model.number="productForm.price" />
    </el-form-item>
    <el-form-item label="quantity">
      <el-input v-model.number="productForm.quantity" />
    </el-form-item>
    <div class="text-center">
      <div>
        <el-button
          :loading="productForm.loading"
          @click="addProduct"
          type="primary"
          >Add Product</el-button
        >
      </div>
      <div class="text-danger" v-if="productForm.error">
        {{ productForm.error }}
      </div>
    </div>
  </el-form>

  <el-table :data="listProduct" style="width: 100%">
    <el-table-column label="#" width="20">
      <template #default="scope">
        <div>{{ scope.$index }}</div>
      </template>
    </el-table-column>
    <el-table-column label="Name" width="180">
      <template #default="scope">
        <div>{{ scope.row.name }}</div>
      </template>
    </el-table-column>
    <el-table-column label="Price" width="180">
      <template #default="scope">
        <div>{{ scope.row.price }}</div>
      </template>
    </el-table-column>
    <el-table-column label="Quantity" width="180">
      <template #default="scope">
        <div>{{ scope.row.quantity }}</div>
      </template>
    </el-table-column>
    <el-table-column label="Operations">
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.row)">Edit</el-button>
        <el-button size="small" type="danger" @click="handleDelete(scope.row)"
          >Delete</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import axios from "axios";
import { reactive, ref, watchEffect } from "vue";
import { useAuthStore } from "../stores/auth.js";
const authStore = useAuthStore();

const listProduct = ref([]);
const productForm = reactive({
  name: "",
  quantity: "",
  price: "",
  loading: false,
  error: "",
});

const resetForm = () => {
  productForm.name = "";
  productForm.quantity = "";
  productForm.price = "";
  productForm.loading = false;
  productForm.error = "";
};

const getAllProduct = async () => {
  const res = await axios.get("http://localhost:3003/api/v1/product/get-all");
  console.log("listProduct", res);
  listProduct.value = res.data.data;
};

watchEffect(() => {
  getAllProduct();
});

const addProduct = async () => {
  productForm.loading = true;
  const product = {
    name: productForm.name,
    quantity: productForm.quantity,
    price: productForm.price,
  };
  try {
    const data = await axios.post(
      "http://localhost:3003/api/v1/product/create",
      product
    );
    if (data.data.message == "ok") {
      console.log("added product", data.data);
      getAllProduct();
      resetForm();
    } else {
      console.log("failed to add product", data.data);
      productForm.error = data.data.error;
    }
  } catch (err) {
    console.log("login failed", err);
    if (typeof err.error === "string") {
      productForm.error = err.error;
    } else {
      productForm.error = err.message;
    }
  } finally {
    productForm.loading = false;
  }
};

const handleDelete = async (item) => {
  console.log("delete", item);
  try {
    const data = await axios.delete(
      "http://localhost:3003/api/v1/product/delete",
      {
        data: {
          _id: item._id,
        },
      }
    );
    if (data.data.message == "ok") {
      console.log("delete product", data.data);
      getAllProduct();
    } else {
      console.log("failed to delete product", data.data);
    }
  } catch (err) {
    console.log("delete failed", err);
  }
};
const handleEdit = () => {};
</script>
