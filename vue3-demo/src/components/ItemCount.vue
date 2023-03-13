<script setup>
const props = defineProps({
  count: Number,
  obj: Object,
});
const test = () => {
  console.log("test")
  props.obj.a += 1
  props.obj.b.c += 1
}
</script>

<template>
  <div class="">
    <h3>Count Item</h3>
    <div>{{ count }}</div>
    <button @click="$emit('add')">Click In CPN</button>
    <div>{{ obj }}</div>
    <button @click="test">click</button>
  </div>
</template>
