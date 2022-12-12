import { ref } from "vue";
import { defineStore } from "pinia";

// 登录用户信息
const useUserInfo = defineStore(
  "userInfo",
  () => {
    const userInfo = ref<boolean>(false);

    return { userInfo };
  },
  {
    // 查看源码==技术文档
    persist: [
      {
        // Key默认为id 即counter，值为 count=x
        paths: ["userInfo"], // 指定存储的ref数据 这里是count
        storage: localStorage, // 默认是 localStorage 插件没处理好忽略报错即可 添加jsdom配置即可
      },
    ],
  }
);

export default useUserInfo;
