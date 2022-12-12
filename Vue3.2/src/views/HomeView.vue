<template>
  <h2>HomeView</h2>
  <h3>{{ counter.count }}</h3>
  <button @click="counter.increment()">+1</button>
  <ul>
    <li v-for="item in getAlbumUrl"><img :src="item" /></li>
  </ul>
</template>

<script setup lang="ts">
import { onMounted, reactive } from "vue";
import { getBanner } from "@/apis/modules";
import { useCounterStore } from "@/stores";

const counter = useCounterStore();

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
