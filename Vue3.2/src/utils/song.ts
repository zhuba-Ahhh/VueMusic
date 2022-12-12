import util from "@/utils/util";
import type { songType } from "@/types";

export default class Song {
  id: string;
  name: string;
  mvId: any;
  singer: any;
  album: any;
  alia: any;
  duration: string;
  url: string;
  vip: boolean;
  license: boolean;
  publishTime: string;
  constructor(song: songType) {
    this.id = song.id;
    this.name = song.name;
    this.mvId = song.mvId;
    this.singer = song.singer;
    this.album = song.album;
    this.alia = song.alia;
    this.duration = song.duration;
    this.url = song.url;
    this.vip = song.vip;
    this.license = song.license;
    this.publishTime = song.publishTime;
  }
}

export function formatSongInfo(params: {
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
}) {
  return new Song({
    id: String(params.id),
    name: params.name,
    mvId: params.mv,
    singer: params.ar,
    album: params.al,
    alia: params.alia,
    vip: params.fee === 1,
    license: params.license,
    duration: util.formatSongTime(params.dt),
    url: `https://music.163.com/song/media/outer/url?id=${params.id}.mp3`,
    publishTime: util.formatMsgTime(params.publishTime),
  });
}
