import { ref } from "vue";
import { defineStore } from "pinia";

// 当前播放歌曲在播放列表的所有位置
const usePlayIndex = defineStore(
  "playIndex",
  () => {
    const playIndex = ref<number>(0);

    return { playIndex };
  },
  {
    // 查看源码==技术文档
    persist: [
      {
        // Key默认为id 即counter，值为 count=x
        paths: ["playIndex"], // 指定存储的ref数据 这里是count
        storage: localStorage, // 默认是 localStorage 插件没处理好忽略报错即可 添加jsdom配置即可
      },
    ],
  }
);

export default usePlayIndex;
