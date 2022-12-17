<template>
  <div class="progress" @click.stop="point" ref="progress">
    <div class="progress-line"></div>
    <div class="progress-bg" :style="{ width: progressWidth }">
      <div
        class="progress-btn"
        @mousedown.self.stop="move()"
        v-if="isShowBtn"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
const emit = defineEmits(["setProgressLine"]);

const { progressWidth, isShowBtn } = defineProps({
  progressWidth: {
    type: String,
    default: "0",
  },
  isShowBtn: {
    type: Boolean,
    default: true,
  },
});
type offsetParentType = { offsetParent?: any; offsetLeft?: number };
type progressType = {
  offsetWidth?: number;
  offsetLeft?: number;
  offsetParent?: offsetParentType;
};
const progress: progressType | null = reactive({});
// 进度条拖拽
const move = () => {
  document.onmousemove = (e) => {
    setProgressLine(e, false);
  };

  // 拖拽进度条的时候 禁止页面文字选中
  document.body.onselectstart = function () {
    return false;
  };

  document.onmouseup = function (e) {
    // 拖拽结束时候 设置当前音频时间
    setProgressLine(e);
    document.onmousemove =
      document.onmouseup =
      document.body.onselectstart =
        null;
  };

  return false;
};
const setProgressLine = (e: MouseEvent, flag = true) => {
  const $progress = progress;
  //  实时获取鼠标横坐标，若是超过进度条最大宽度，则值为进度条的宽度
  const curProgress =
    e.clientX - getOffsetLeft($progress) >= $progress.offsetWidth
      ? $progress.offsetWidth
      : e.clientX - getOffsetLeft($progress) <= 0
      ? 0
      : e.clientX - getOffsetLeft($progress);

  emit("setProgressLine", {
    val: curProgress / $progress.offsetWidth,
    flag: flag,
  });
};

// 获取元素到浏览器左侧距离
const getOffsetLeft = (obj: progressType) => {
  let oLeft: number = obj.offsetLeft;
  let oParent: offsetParentType = obj.offsetParent;

  while (oParent !== null) {
    oLeft += Number(oParent.offsetLeft);
    oParent = oParent.offsetParent;
  }

  return oLeft;
};

// 点击音频进度条
const point = (e: MouseEvent) => {
  setProgressLine(e);
};
</script>

<style scoped></style>
