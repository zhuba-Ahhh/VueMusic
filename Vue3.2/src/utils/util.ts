import { formatSongInfo } from "./song";
import type { addSongType, songType } from "@/types";
type optTpye = {
  yyyy: number;
  MM: string;
  dd: string;
  HH: string;
  mm: string;
  ss: string;
};

// 数字过万的处理
export const formartNum = (val: number): string => {
  let num: string = "0";
  if (val > 9999) {
    num = Math.round((val / 10000) * 10) / 10 + "万";
  } else {
    num = "" + val;
  }

  return num;
};
// 时间毫秒格式化处理 2022-10-30 09:30:00
export const formartDate = (originVal: Date, fmt: string) => {
  const dt: Date = new Date(originVal);
  const opt: optTpye & { [key: string]: any } = {
    yyyy: dt.getFullYear(),
    MM: (dt.getMonth() + 1 + "").padStart(2, "0"),
    dd: (dt.getDate() + "").padStart(2, "0"),
    HH: (dt.getHours() + "").padStart(2, "0"),
    mm: (dt.getMinutes() + "").padStart(2, "0"),
    ss: (dt.getSeconds() + "").padStart(2, "0"),
  };

  for (let key in opt) {
    const ret: RegExpExecArray | null = new RegExp("(" + key + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], key);
    }
  }

  return fmt;
};
// 歌曲转毫秒格式化处理 03:30 => (3*60+30) * 1000
export const formatSongSecond = (duration: string) => {
  let arr: number[] = duration.split(":").map((item) => Number(item)),
    second: number = 0;

  for (let i = 0, l = arr.length; i < l; i++) {
    second += arr[i] * 60 * (arr.length - 1 - i);
  }

  second += arr[arr.length - 1] * 1;

  return second;
};
// 歌曲毫秒格式化处理 03:30
export const formatSongTime = (duration: number = 0): string => {
  duration = duration >= 0 ? duration / 1000 : 0;
  const m: string = (Math.floor(duration / 60) + "").padStart(2, "0");
  const s: string = (Math.floor(duration % 60) + "").padStart(2, "0");
  return `${m}:${s}`;
};
// 评论时间格式化处理
export const formatMsgTime = (duration: Date) => {
  let result = "";
  const NOW = new Date();
  const PAST = new Date(duration);

  // 判断是当天的时间 显示格式 10：30
  if (NOW.toDateString() === PAST.toDateString()) {
    result = formartDate(duration, "HH:mm");
    // 时间为当年 显示月日 时间戳
  } else if (PAST.getFullYear() === NOW.getFullYear()) {
    result = formartDate(duration, "MM月dd日 HH:mm");
  } else {
    result = formartDate(duration, "yyyy年MM月dd日");
  }

  return result;
};
// 添加歌曲到播放列表，过滤重复的歌曲
export const concatPlayList = (
  newList: songType[] = [],
  oldList: songType[] = []
): songType[] => {
  const arr: songType[] = [...oldList, ...newList];
  const map: Map<string, songType> = new Map();

  for (const item of arr) {
    if (!map.has(item.id)) {
      map.set(item.id, item);
    }
  }

  return [...map.values()];
};
// 处理歌曲
export const formatSongs = (
  list: addSongType[],
  privileges: { [x: string]: { cp: any } }
) => {
  const ret: songType[] = [];
  list.map((item, index) => {
    if (item.id) {
      // 是否有版权播放
      item.license = !privileges[index].cp;
      ret.push(formatSongInfo(item));
    }
  });
  return ret;
};

export default {
  formartNum,
  formartDate,
  formatSongSecond,
  formatSongTime,
  formatMsgTime,
  concatPlayList,
  formatSongs,
};
