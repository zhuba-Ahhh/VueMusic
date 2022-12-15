<template>
  <div>
    <div class="lyrics-main" :style="{ maxHeight: maxH + 'px' }">
      <div
        class="lyrics"
        ref="lyrics"
        v-if="lyricObj.length"
        :style="transform"
      >
        <p
          :class="[isCurLyric(index)]"
          v-for="(item, index) in lyricObj"
          :key="index"
        >
          {{ item.txt }}
        </p>
      </div>
      <div v-else class="lyric-empty">
        <p v-if="lyric">纯音乐，无歌词</p>
        <p v-else>歌词加载中......</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, toRefs } from "vue";
import { ElMessage } from "element-plus";
import { lyrics } from "@/apis/modules";

const { sId, currentTime, maxH } = defineProps({
  sId: {
    type: [Number, String],
    default: 0,
  },
  currentTime: {
    type: Number,
    default: 0,
  },
  maxH: {
    type: [Number, String],
    default: 390,
  },
});
type lyricObjType = {
  t: number;
  txt: string;
};

type infoType = {
  lyric: boolean | null;
  lyricObj: lyricObjType[];
  curIndex: number;
  isFull: boolean;
};

const info: infoType = reactive({
  lyric: null,
  lyricObj: [],
  curIndex: 0,
  isFull: false,
});
const { lyric, lyricObj, curIndex, isFull } = toRefs(info);

const isCurLyric = computed(() => {
  return (index: number) => {
    return index === info["curIndex"] && currentTime ? "active" : "";
  };
});

// 歌词实时滚动
const transform = computed(() => {
  if (info["curIndex"] > 6) {
    return `transform: translateY(-${30 * (info["curIndex"] - 6)}px)`;
  } else {
    return "transform: translateY(0)";
  }
});

const formartLyric = (lrc: { lyric: string | null }) => {
  const lrcReg = /^\[(\d{2}):(\d{2}.\d{2,})\]\s*(.+)$/;

  if (!lrc.lyric) {
    info["lyric"] = true;
    return;
  }
  const lyricLis = lrc.lyric.split("\n");

  info["lyric"] = lrc.lyric === "true";
  lyricLis.forEach((item) => {
    const arr = lrcReg.exec(item);

    if (!arr) {
      return;
    }

    info["lyricObj"].push({
      t: Number(arr[1]) * 60 * 1 + Number(arr[2]) * 1,
      txt: arr[3],
    });
  });

  // 根据时间轴重排顺序
  info["lyricObj"].sort((a, b) => {
    return a.t - b.t;
  });
};

const getLyrics = async (id: any) => {
  const { data: res } = await lyrics({ id: id });

  if (res.code !== 200) {
    return ElMessage.error("数据请求失败");
  }

  formartLyric(res.lrc);
};
</script>

<style scoped lang="less">
.lyrics-main {
  height: 100%;
  overflow-y: auto;
  transition: all 1.5s ease-in-out;
}

.lyrics {
  font-size: 0;
  transform: translateY(0);
  transition: transform 1.5s ease-in-out;

  :deep(p) {
    margin: 0;
    line-height: 30px;
    font-size: 14px;
    font-weight: 300;

    &.active {
      color: var(--color-text-height);
    }
  }
}
.lyric-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 100px;
  font-size: 14px;
  color: var(--color-text-height);

  ~ .more-lyric {
    display: none;
  }
}
.page-lyrics {
  color: #666;
  overflow: hidden;

  .lyric-empty {
    justify-content: left;
  }

  &.fullLyrics {
    max-height: none;
  }
}

.lyric-more span {
  display: inline-block;
  line-height: 30px;
  cursor: pointer;
  color: var(--color-text-height);
}
</style>
