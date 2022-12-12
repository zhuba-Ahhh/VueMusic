import { reactive, onMounted } from "vue";
import { hotList, playList } from "@/apis/modules";
import { ElMessage } from "element-plus";
import type { paramsType } from "../types";

type tagsName = {
  name: string;
};

type playlist_infoType = {
  playlist_tags: Array<tagsName>;
  playlist_list: Array<string>;
  playlist_index: number;
  playlist_params: paramsType & { offset: number };
  playlist_count: number;
  playlist_loading: boolean;
};

export default function hot_recom() {
  // -------------- 推荐歌单
  // 热门推荐歌单
  const playlist_info: playlist_infoType = reactive({
    playlist_tags: [],
    playlist_list: [],
    playlist_index: 0,
    playlist_params: {
      limit: 6,
      offset: 0,
    },
    playlist_count: 6,
    playlist_loading: true,
  });

  // 获取热门推荐歌单标签
  const getHotTags = async () => {
    const { data: res } = await hotList();

    if (res.code !== 200) {
      return ElMessage.error("数据请求失败");
    }

    res.tags.unshift({
      name: "为您推荐",
    });
    playlist_info["playlist_tags"] = res.tags.splice(0, 6);
  };
  // 切换歌单类别
  const choosePlayListType = (index: number) => {
    playlist_info["playlist_index"] = index;
    playlist_info["playlist_params"]["cat"] =
      index !== 0 ? playlist_info["playlist_tags"][index].name : "";
    playlist_info["playlist_loading"] = true;
    getPlayList(playlist_info["playlist_params"]);
  };

  // 分类歌单列表
  const getPlayList = async (params: {
    limit: number;
    offset: number;
    order?: string;
    cat?: string;
  }) => {
    const { data: res } = await playList(params);

    if (res.code !== 200) {
      return ElMessage.error("数据请求失败");
    }

    playlist_info["playlist_list"] = res.playlists;
    playlist_info["playlist_loading"] = false;
  };

  onMounted(() => {
    getHotTags();
    getPlayList(playlist_info["playlist_params"]);
  });

  return {
    playlist_info,
    getHotTags,
    choosePlayListType,
  };
}
