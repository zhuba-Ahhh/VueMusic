import { ref } from "vue";
import { defineStore } from "pinia";

// 当前播放状态
const useIsPalyedStore = defineStore(
  "isPalyed",
  () => {
    const isPalyed = ref<boolean>(false);

    return { isPalyed };
  },
  {
    // 查看源码==技术文档
    persist: [
      {
        // Key默认为id 即counter，值为 count=x
        paths: ["isPalyed"], // 指定存储的ref数据 这里是count
        storage: localStorage, // 默认是 localStorage 插件没处理好忽略报错即可 添加jsdom配置即可
      },
    ],
  }
);

export default useIsPalyedStore;
