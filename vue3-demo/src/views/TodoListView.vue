<template>
  <div class="container w-50">
    <h4>Todo List</h4>
    <div class="d-flex">
      <el-input @keypress.enter="addTodo" ref="inputRef" class="me-2" v-model="todoName" placeholder="Please input" />
      <el-button :disabled="!todoName.length" @click="addTodo" type="primary">Add</el-button>
    </div>
    <div class="my-2">
      <transition-group name="fade">
        <div v-for="todo in todoFilter" :key="todo.id" class="item d-flex justify-content-between">
          <el-checkbox v-model="todo.isDone" :label="todo.name" size="large" />
          <el-button type="danger" @click="deleteItem(todo.id)">delete</el-button>
        </div>
      </transition-group>
    </div>
    <div class="my-2 d-flex" v-if="todoList.length">
      <el-radio-group class="me-2" v-model="selectOption">
        <el-radio-button label="all">All</el-radio-button>
        <el-radio-button label="complete">Complete</el-radio-button>
        <el-radio-button label="uncomplete">Uncomplete</el-radio-button>
      </el-radio-group>
      <el-button type="primary" @click="checkAllDone">Check All</el-button>
      <el-button type="primary" @click="clearAllDone">Clear</el-button>
    </div>
  </div>
</template>
anh

<script setup>
import { ref, computed, watch } from "vue";
const todoStoreName = "todo-list-stoge";
const todoName = ref("");
const selectOption = ref("all");
const todoList = ref(JSON.parse(localStorage.getItem(todoStoreName)) || []);
const inputRef = ref(null);

const todoFilter = computed(() => {
  switch (selectOption.value) {
    case "all":
      return todoList.value;
    case "complete":
      return todoList.value.filter((e) => e.isDone);
    case "uncomplete":
      return todoList.value.filter((e) => !e.isDone);

    default:
      return todoList.value;
  }
});

const addTodo = () => {
  const name = todoName.value.trim();
  if (name) {
    const newTodo = {
      id: Date.now(),
      name,
      isDone: false,
    };
    todoList.value.push(newTodo);
    todoName.value = "";
    inputRef.value?.focus();
  }
};
const deleteItem = (id) => {
  todoList.value = todoList.value.filter((e) => e.id !== id);
};
const clearAllDone = () => {
  todoList.value = todoList.value.filter((e) => !e.isDone);
};
const checkAllDone = () => {
  todoList.value.filter((e) => (e.isDone = true));
};
watch(
  () => todoList.value,
  () => {
    localStorage.setItem(todoStoreName, JSON.stringify(todoList.value));
  }
);
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity .3s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
