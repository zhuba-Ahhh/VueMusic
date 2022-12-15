<template>
  <audio
    v-if="curSongInfo"
    ref="myAudio"
    preload="auto"
    @canplay="canplaySong"
    @playing="playSong"
    @ended="endedSong"
    @error="errorSong"
    @timeupdate="updateSongTime"
    :src="curSongInfo.url"
  ></audio>
</template>

<script setup lang="ts">
import { computed, nextTick, reactive, ref, watch } from "vue";
import {
  useIsPlayedStore,
  usePlayListStore,
  usePlayIndexStore,
} from "@/stores";

const useIsPlayed = useIsPlayedStore(),
  usePlayList = usePlayListStore(),
  usePlayIndex = usePlayIndexStore();

const emit = defineEmits(["inFocus", "setCurrentTime"]);

const myAudio = ref(null);
const info = reactive({
  initAudioReady: false, // 初始化音频准备
  playMode: 0, // 播放模式  0循环播放、1单曲循环、2随机播放
});

// 获取播放列表
const playIndex = computed(() => usePlayIndex.playIndex);
const playList = computed(() => usePlayList.playList);
const isPlayed = computed(() => useIsPlayed.isPalyed);

// 获取当前播放歌曲信息
const curSongInfo = computed(() => playList.value[playIndex.value]);

// 音乐 播放/暂停/上一首/下一首
const playAudioType = (type: string) => {
  if (type === "play") {
    useIsPlayed.setPlayStatus(!isPlayed.value);
    usePlayIndex.setPlayIndex(playIndex.value);
  } else {
    changeSong(type);
  }
};

// 播放模式：随机、循环、单曲
const playAudioMode = (type: number) => {
  info["playMode"] = type;
};

// 音量禁音及取消操作
const setVolumeHandler = (Volume: any) => {
  const $myAudio = myAudio.value;
  $myAudio.muted = Volume;
};
const setvolumeProgress = (val: any) => {
  const $myAudio = myAudio.value;
  $myAudio.volume = val;
  $myAudio.muted = val ? 0 : 1;
};

// 点击拖拽进度条，设置当前时间
const setAudioProgress = (t: any) => {
  const $myAudio = myAudio.value;
  $myAudio.currentTime = t;
};

// 解决刷新页面时候，音频准备就绪
const canplaySong = (e: any) => {
  info["initAudioReady"] = true;
};

// 音频播放时候 初始化状态，获取音频总时长
const playSong = (e: any) => {
  info["initAudioReady"] = true;
  useIsPlayed.setPlayStatus(true);
};

// 音频播放结束 自动播放下一首
const endedSong = (e: any) => {
  if (info["playMode"] === 1) {
    loopSong();
  } else {
    changeSong("next");
  }
};

// 手动切换歌曲
const changeSong = (type: string) => {
  // type: prev/next  上一首/下一首
  if (playList.value.length !== 1) {
    // 若播放列表只有一首歌则单曲循环
    let index = playIndex.value;
    if (info["playMode"] === 2) {
      // 随机模式
      index = Math.floor(Math.random() * playList.value.length - 1) + 1;
    } else {
      if (type === "prev") {
        index = index === 0 ? playList.value.length - 1 : --index;
      } else {
        index = index >= playList.value.length - 1 ? 0 : ++index;
      }
    }

    info["initAudioReady"] = false;
    useIsPlayed.setPlayStatus(false);
    usePlayIndex.setPlayIndex(index);
  } else {
    loopSong();
  }
};

// 单曲循环歌曲
const loopSong = () => {
  const $myAudio = myAudio.value;

  $myAudio.currentTime = 0;
  $myAudio.play();
  useIsPlayed.setPlayStatus(true);
};

// 监听音频时间， 实时更新当前播放时间
const updateSongTime = (e: any) => {
  if (!info.initAudioReady) {
    return;
  }
  emit("setCurrentTime", e.target.currentTime);
};

watch(
  curSongInfo,
  (newSong, oldSong) => {
    if (!newSong || (oldSong && newSong.id === oldSong.id)) {
      return;
    }
    // 当前播放歌曲变化的时候  重置状态及当前播放的时长
    info["initAudioReady"] = false;
    info["currentTime"] = 0;
    emit("setCurrentTime", 0);

    nextTick(() => {
      const $myAudio = myAudio.value;

      if ($myAudio) {
        $myAudio.play();
      }
    });
  },
  { deep: true }
);

watch(
  () => isPlayed.value,
  (playing) => {
    // 等待音频加载成功完成后播放
    if (!info.initAudioReady) {
      return;
    }

    nextTick(() => {
      const $myAudio = myAudio.value;

      if ($myAudio) {
        playing ? $myAudio.play() : $myAudio.pause();
      }
    });
  }
);
</script>

<style scoped lang="less"></style>
