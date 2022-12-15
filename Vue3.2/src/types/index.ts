// 专辑
export interface albumArea {
  name: string;
  code: string;
}
// 歌手类型
export interface artistType {
  label: string;
  val: number;
}
// 经过处理的可以使用
export interface songType {
  id: string;
  name: any;
  mvId: any;
  singer: any;
  album: any;
  alia: any;
  vip: boolean;
  license: boolean;
  duration: string;
  url: string;
  publishTime: string;
  picUrl?: string;
  type?: string;
  artist?: any;
}
// 需要处理的
export interface addSongType {
  id: any;
  name: any;
  mv: any;
  ar: any;
  al: any;
  alia: any;
  fee: number;
  license: any;
  dt: number | undefined;
  publishTime: Date;
}
// mv
export interface mvType {
  id: string;
  name: any;
  mvId: any;
  singer: any;
  album: any;
  alia: any;
  vip: boolean;
  license: boolean;
  duration: string;
  url: string;
  publishTime: string;
  cover: string;
  imgurl: string;
  artistId: number;
  artistName: string;
  playCount: number;
  tags: string[];
  trackCount: number;
  coverImgUrl: string;
}

export type typeListType = {
  k: number;
  v: string;
  t: string;
};
