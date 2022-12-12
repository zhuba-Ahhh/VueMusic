import { ref } from "vue";
import { defineStore } from "pinia";

// 添加及播放成功后，播放列表按钮提示的文字
const useIsShowPlayListTips = defineStore(
  "isShowPlayListTips",
  () => {
    const isShowPlayListTips = ref<boolean>(false);

    return { isShowPlayListTips };
  },
  {
    // 查看源码==技术文档
    persist: [
      {
        // Key默认为id 即counter，值为 count=x
        paths: ["isShowPlayListTips"], // 指定存储的ref数据 这里是count
        storage: localStorage, // 默认是 localStorage 插件没处理好忽略报错即可 添加jsdom配置即可
      },
    ],
  }
);

export default useIsShowPlayListTips;
