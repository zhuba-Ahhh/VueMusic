import { ref } from "vue";
import { defineStore } from "pinia";

// 是否登陆
const useIsLoginStore = defineStore(
  "isLogin",
  () => {
    const isLogin = ref<boolean>(false);
    const setLogin = (val: boolean) => {
      isLogin.value = val;
    };
    return { isLogin, setLogin };
  },
  {
    // 查看源码==技术文档
    persist: [
      {
        // Key默认为id 即counter，值为 count=x
        paths: ["isLogin"], // 指定存储的ref数据 这里是count
        storage: localStorage, // 默认是 localStorage 插件没处理好忽略报错即可 添加jsdom配置即可
      },
    ],
  }
);

export default useIsLoginStore;
