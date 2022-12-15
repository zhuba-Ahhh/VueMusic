<template>
  <div class="list-container">
    <template v-for="item in list">
      <artist-item :item="item"></artist-item>
    </template>
    <template v-if="loading">
      <Loading />
    </template>
  </div>
</template>

<script setup lang="ts">
import Loading from "@/components/Loading.vue";
import ArtistItem from "@/components/ArtistItem.vue";

const { list, loading } = defineProps({
  list: {
    // 歌手信息
    type: Array,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});
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
