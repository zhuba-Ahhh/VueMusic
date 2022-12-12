import { ref } from "vue";
import { defineStore } from "pinia";

// 登录弹窗显示与隐藏
const useLoginDialogVisible = defineStore(
  "loginDialogVisible",
  () => {
    const loginDialogVisible = ref<boolean>(false);

    return { loginDialogVisible };
  },
  {
    // 查看源码==技术文档
    persist: [
      {
        // Key默认为id 即counter，值为 count=x
        paths: ["loginDialogVisible"], // 指定存储的ref数据 这里是count
        storage: localStorage, // 默认是 localStorage 插件没处理好忽略报错即可 添加jsdom配置即可
      },
    ],
  }
);

export default useLoginDialogVisible;
