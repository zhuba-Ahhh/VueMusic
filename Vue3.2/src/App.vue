<script setup lang="ts">
import Sidebar from "@/components/Sidebar.vue";
import Header from "@/components/Header.vue";
import Login from "@/components/Login.vue";

import { computed, onMounted } from "vue";
import { useLoginDialogVisibleStore } from "@/stores";

const useLoginDialogVisible = useLoginDialogVisibleStore();
const loginDialogVisible = computed(
  () => useLoginDialogVisible.loginDialogVisible
);

onMounted(() => {
  const $script = document.createElement("script");

  $script.src =
    "https://s9.cnzz.com/z_stat.php?id=1280869713&web_id=1280869713";
  $script.type = "text/javascript";
  document.body.appendChild($script);
});
</script>

<template>
  <el-container>
    <el-aside>
      <Sidebar />
    </el-aside>
    <el-main>
      <Header />
      <router-view></router-view>
    </el-main>
    <Login v-show="loginDialogVisible" />
    <play-bar></play-bar>
  </el-container>
</template>

<style scoped lang="less"></style>
