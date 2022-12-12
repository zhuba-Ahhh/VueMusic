<template>
  <div class="list-container">
    <template> </template>
    <template> </template>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
const { list, loading } = defineProps(["list", "loading"]);
</script>

<style scoped lang="less">
.list-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-bottom: 40px;
  margin-right: -40px;

  &::after {
    content: "";
    width: 30%;
  }
}
</style>
