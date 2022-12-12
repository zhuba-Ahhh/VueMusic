import { ref, computed } from "vue";
import { defineStore } from "pinia";

const useCounterStore = defineStore(
  "counter",
  () => {
    const count = ref(0);
    const doubleCount = computed(() => count.value * 2);
    function increment() {
      count.value++;
    }

    return { count, doubleCount, increment };
  },
  {
    // 查看源码==技术文档
    persist: [
      {
        // Key默认为id 即counter，值为 count=x
        paths: ["count"], // 指定存储的ref数据 这里是count
        storage: sessionStorage, // 默认是 localStorage 插件没处理好忽略报错即可 添加jsdom配置即可
      },
    ],
  }
);

export default useCounterStore;
