import type { albumArea } from "./types";

// 歌手类型
interface Artist {
  label: string;
  val: number;
}

// 专辑
const ALBUM_AREA: albumArea[] = [
  {
    name: "全部",
    code: "all",
  },
  {
    name: "华语",
    code: "zh",
  },
  {
    name: "欧美",
    code: "ea",
  },
  {
    name: "韩国",
    code: "kr",
  },
  {
    name: "日本",
    code: "jp",
  },
];

// MV
const MV_AREA: string[] = ["全部", "内地", "港台", "欧美", "日本", "韩国"];
const MV_TYPE: string[] = ["全部", "官方版", "原生", "现场版", "网易出品"];

// 歌手
const ARTIST_AREA: Artist[] = [
  {
    label: "全部",
    val: -1,
  },
  {
    label: "华语",
    val: 7,
  },
  {
    label: "欧美",
    val: 96,
  },
  {
    label: "日本",
    val: 8,
  },
  {
    label: "韩国",
    val: 16,
  },
  {
    label: "其他",
    val: 0,
  },
];
const ARTIST_TYPE: Artist[] = [
  {
    label: "全部",
    val: -1,
  },
  {
    label: "男歌手",
    val: 1,
  },
  {
    label: "女歌手",
    val: 2,
  },
  {
    label: "乐队",
    val: 3,
  },
];

export default {
  ALBUM_AREA,
  MV_AREA,
  MV_TYPE,
  ARTIST_AREA,
  ARTIST_TYPE,
};
