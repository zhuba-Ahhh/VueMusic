import { reactive } from "vue";
import { defineStore } from "pinia";
import type { songType } from "@/types";

// 播放列表
const usePlayListStore = defineStore(
  "playList",
  () => {
    let playList: songType[] = reactive([]);
    const setPlayList = (val: songType[]) => {
      playList = val;
    };
    return { playList, setPlayList };
  },
  {
    // 查看源码==技术文档
    persist: [
      {
        // Key默认为id 即counter，值为 count=x
        paths: ["playList"], // 指定存储的ref数据 这里是count
        storage: localStorage, // 默认是 localStorage 插件没处理好忽略报错即可 添加jsdom配置即可
      },
    ],
  }
);

export default usePlayListStore;
