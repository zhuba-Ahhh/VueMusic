import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import useIsLoginStore from "./modules/isLogin"; // 是否登陆
import useIsPlayedStore from "./modules/isPlayed"; // 当前播放状态
import useIsShowPlayListStore from "./modules/isShowPlayListTips"; // 添加及播放成功后，播放列表按钮提示的文字
import useUserInfoStore from "./modules/userInfo"; // 登录用户信息
import usePlayListStore from "./modules/playList"; // 播放列表
import usePlayIndexStore from "./modules/playIndex"; // 当前播放歌曲在播放列表的所有位置
import useLoginDialogVisibleStore from "./modules/loginDialogVisible"; // 登录弹窗显示与隐藏
import useBannerStore from "./assets/Banner";

const store = createPinia();
store.use(piniaPluginPersistedstate);

export default store;
export {
  useUserInfoStore,
  useIsLoginStore,
  useIsPlayedStore,
  usePlayListStore,
  usePlayIndexStore,
  useIsShowPlayListStore,
  useLoginDialogVisibleStore,
  useBannerStore,
};
