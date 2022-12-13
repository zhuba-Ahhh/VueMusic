import usePlayListStore from "./modules/playList"; // 播放列表
import usePlayIndexStore from "./modules/playIndex"; // 当前播放歌曲在播放列表的所有位置
import useIsPlayedStore from "./modules/isPlayed"; // 当前播放状态

import type { songType } from "@/types";
import util from "@/utils/util";

// 一些需要调用多个状态的方法

const PlayList = usePlayListStore(),
  PlayIndex = usePlayIndexStore(),
  PlayStatus = useIsPlayedStore();

// 合并歌曲到播放列表查重
export const concatPlayList = (list: songType[]) => {
  // filter过滤无版权及vip歌曲
  return util.concatPlayList(
    list.filter((item) => {
      return !item.license && !item.vip;
    }),
    PlayList.playList
  );
};
// 当前歌曲在播放列表的索引
export const findIndex = (list: songType, playList: songType[]) => {
  return playList.findIndex((d) => {
    return d.id === list.id;
  });
};

// 播放歌曲列表里全部歌曲（清空当前播放列表）
export const playAll = (list: songType[] = []) => {
  PlayList.setPlayList(concatPlayList(list));
  PlayStatus.setPlayStatus(true);
  PlayIndex.setPlayIndex(0);
};
// 播放当前选中的歌曲
export const selectPlay = (list: songType[] = []) => {
  PlayList.setPlayList(concatPlayList(list));
  PlayStatus.setPlayStatus(true);
  PlayIndex.setPlayIndex(findIndex(list[0], PlayList.playList));
};
// 添加歌曲到当前播放列表
export const addList = (list: songType[] = []) => {
  PlayList.setPlayList(concatPlayList(list));
  PlayStatus.setPlayStatus(true);
};

export default { playAll, findIndex, concatPlayList, selectPlay, addList };
