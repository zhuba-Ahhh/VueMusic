<template>
  <h2>HomeView</h2>
  login:{{ useIsLogin.isLogin }}
  <button @click="useIsLogin.setLogin(!useIsLogin.isLogin)">setLogin</button>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { getBanner } from "@/apis/modules";
import { useIsLoginStore } from "@/stores";

const useIsLogin = useIsLoginStore();
type getAlbumType = {
  imageUrl: string;
};
const getAlbumUrl: Array<string> = reactive([]);
// 相关歌单推荐
const getAlbum = async () => {
  const { data: res } = await getBanner();
  res.banners.forEach((item: getAlbumType) => {
    getAlbumUrl.push(item.imageUrl);
  });
};
getAlbum();
</script>

<style scoped></style>
