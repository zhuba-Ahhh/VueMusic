<template>
  <div v-if="videoOptions.src" class="mv-detail">
    <div class="mv-main">
      <div class="mv-info-hd">
        <div class="info-name">
          <i class="iconfont icon-mv"></i>{{ mvDetail.name }}
        </div>
        <router-link
          :to="{ path: '/singer', query: { id: author.id } }"
          class="song-author"
          v-for="(author, k) in mvDetail.artists"
          :key="author.name"
          >{{ k !== 0 ? " / " + author.name : author.name }}</router-link
        >
      </div>
      <div class="video-main">
        <videoPlay
          width="100%"
          height="100%"
          :poster="videoOptions.poster"
          :src="videoOptions.src"
        />
      </div>
      <div class="mv-comment">
        <comment-list :type="type" :sId="mId"></comment-list>
      </div>
    </div>
    <div class="aside-box">
      <div class="mv-info">
        <h3 class="aside-title">MV简介</h3>
        <div class="mv-info-count">
          <div class="info-time">发布时间：{{ mvDetail.publishTime }}</div>
          <div class="info-count">
            播放量：{{ formartNum(mvDetail.playCount) }}
          </div>
        </div>
        <div class="mv-desc">
          {{ mvDetail.desc ? mvDetail.desc : "暂无简介" }}
        </div>
      </div>
      <div class="simi-mv">
        <h3 class="aside-title">相似MV</h3>
        <div class="aside-main mv-main">
          <div
            class="item"
            :key="'' + item.id + index"
            v-for="(item, index) in simiMv"
          >
            <router-link
              :to="{ path: '/mvlist/mv', query: { id: item.id } }"
              class="faceImg"
            >
              <i class="iconfont icon-play"></i>
              <el-image :src="item.cover || item.imgurl">
                <div slot="placeholder" class="image-slot">
                  <i class="iconfont icon-placeholder"></i>
                </div>
              </el-image>
            </router-link>
            <div class="info">
              <router-link
                :to="{ path: '/mvlist/mv', query: { id: item.id } }"
                class="mv-name"
                >{{ item.name }}</router-link
              >
              <router-link
                :to="{ path: '/singer', query: { id: item.artistId } }"
                class="mv-author"
                v-if="!item.publishTime"
                >{{ item.artistName }}</router-link
              >
              <div class="mv-playCount">
                <i class="iconfont icon-mvlist"></i>
                {{ formartNum(item.playCount) }}
              </div>
              <div class="mv-time" v-if="item.publishTime">
                发布时间：{{ item.publishTime }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CommentList from "@/components/Comments.vue";

import { onMounted, reactive, toRefs } from "vue";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
import { videoPlay } from "vue3-video-play";
import { ElMessage } from "element-plus";
import "vue3-video-play/dist/style.css";
import {
  mvDetail as GetMvDetail,
  mvUrl,
  simiMv as GetsimiMv,
} from "@/apis/modules";
import { useIsPlayedStore } from "@/stores";
import type { mvType } from "@/types";
import { formartNum } from "@/utils/util";

type artistsType = { id: string; name: string };
type mvDetailType = mvType & { artists?: artistsType[] };
type infoType = {
  mId: string;
  mvDetail: mvDetailType;
  type: number;
  videoOptions: { src: string; poster: string };
  simiMv: any[];
};
const route = useRoute();
const useIsPlayed = useIsPlayedStore();
const info: infoType = reactive({
  mId: "0",
  mvDetail: {} as mvType,
  type: 1, // 0: 歌曲 1: mv 2: 歌单 3: 专辑  4: 电台 5: 视频 6: 动态
  videoOptions: {
    src: "", //视频源
    poster: "",
  },
  simiMv: [],
});
const { mId, mvDetail, type, videoOptions, simiMv } = toRefs(info);

const getMvDetail = async () => {
  const { data: res } = await GetMvDetail({ id: info.mId });

  if (res.code !== 200) {
    return ElMessage.error("数据请求失败");
  }

  info.mvDetail = res.data;
  info.videoOptions.poster = res.data.cover;
};

const getMvUrl = async (r: any = null) => {
  const { data: res } = await mvUrl({ id: info.mId, r });

  if (res.code !== 200) {
    return ElMessage.error("数据请求失败");
  }

  info.videoOptions.src = res.data.url;
};

const getSimiMv = async () => {
  const { data: res } = await GetsimiMv({ id: info.mId });

  if (res.code !== 200) {
    return ElMessage.error("数据请求失败");
  }

  info.simiMv = res.mvs;
};

const init = () => {
  getMvDetail();
  getMvUrl();
  getSimiMv();
};

onBeforeRouteUpdate((to) => {
  info["mId"] = to.query.id as string;
  init();
});

onMounted(() => {
  info["mId"] = route.query.id as string;
  init();
  useIsPlayed.setPlayStatus(false);
});
</script>

<style scoped></style>
