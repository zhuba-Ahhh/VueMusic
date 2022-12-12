import { reactive } from "vue";
import { defineStore } from "pinia";

type bannerType = Array<string>;

const useBannerStore = defineStore(
  "Banner",
  () => {
    let Banner: bannerType = reactive([""]);
    const setBanner = function (newBanner: bannerType) {
      Banner = [...Banner, ...newBanner];
    };
    const addBanner = function (newBanner: string) {
      Banner.push(newBanner);
    };
    return { Banner, setBanner, addBanner };
  },
  {
    // 查看源码==技术文档
    persist: [
      {
        // Key默认为id 即counter，值为 count=x
        paths: ["Banner"], // 指定存储的ref数据 这里是count
        storage: localStorage, // 默认是 localStorage 插件没处理好忽略报错即可 添加jsdom配置即可
      },
    ],
  }
);

export default useBannerStore;
