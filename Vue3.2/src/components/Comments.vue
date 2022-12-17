<template>
  <div></div>
</template>

<script setup lang="ts">
import { reactive, computed, watch, onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import type { infoType } from "@/types";
import getApi from "@/apis";
import {
  useUserInfoStore,
  useIsLoginStore,
  useLoginDialogVisibleStore,
} from "@/stores";

const useUserInfo = useUserInfoStore(),
  useIsLogin = useIsLoginStore(),
  useLoginDialog = useLoginDialogVisibleStore();
const { sId, type } = defineProps({
  sId: {
    type: [Number, String],
    default: 0,
  },
  type: {
    type: Number,
    default: 0,
  },
});
const info: infoType = reactive({
  msg: "",
  maxLen: 140,
  curId: sId,
  limit: 20,
  offset: 0,
  before: 0,
  hotComments: [],
  comments: [],
  total: 0,
  currentPage: 0,
  isEmpty: false,
  replyCommentId: 0,
  replyIndex: -1,
});

const userInfo = computed(() => useUserInfo.userInfo);
const isLogin = computed(() => useIsLogin.isLogin);
const isShowReply = computed(() => {
  return function (item: { commentId: number }, index: number) {
    return item.commentId === info.replyCommentId && info.replyIndex === index;
  };
});

// 获取页面评论
const getComment = () => {
  // 0: 歌曲 1: mv 2: 歌单 3: 专辑  4: 电台 5: 视频 6: 动态
  switch (type) {
    case 0:
      getCommentList("commentSong");
      break;
    case 1:
      getCommentList("commentMv");
      break;
    case 3:
      getCommentList("albumComment");
      break;
    case 5:
      getCommentList("commentVideo");
      break;
  }
};
const getCommentList = async (type: string) => {
  const { data: res } = await getApi[type]({
    id: info.curId,
    limit: info.limit,
    offset: info.offset,
    before: info.before,
    timestamp: new Date().valueOf(),
  });

  msgHandler(res);
};
const msgHandler = (res: {
  code: number;
  total: number;
  hotComments: never[];
  comments: any;
}) => {
  if (res.code !== 200) {
    return ElMessage.error("数据请求失败");
  }
  info.total = res.total;
  info.hotComments = res.hotComments;
  info.hotComments.map((item) => {
    item.isHot = true;
    return item;
  });
  info.comments = [...info.hotComments, ...res.comments];
  // 当前评论是否为空
  info.isEmpty = info.before === 0 && !info.comments.length;
};
// 发布/删除/回复评论
const commentHandler = async (t: number, content: any, commentId?: number) => {
  const params = {
    t: t, // 0删除 1发送 2回复
    type: type, // 0: 歌曲 1: mv 2: 歌单 3: 专辑  4: 电台 5: 视频 6: 动态
    id: info.curId, // 对应资源id
    content: content, // 发送的内容/对应内容的id
    commentId: commentId, // 回复的评论id
  };
  const { data: res } = await getApi.comment(params);

  if (res.code !== 200) {
    return ElMessage.error("数据请求失败");
  }
  info.msg = "";
  getComment();

  if (t === 0) {
    ElMessage.success("删除评论成功！");
  } else if (t === 1) {
    ElMessage.success("评论成功！");
  } else if (t === 2) {
    ElMessage.success("回复评论成功！");
    info.replyCommentId = 0;
    info.replyIndex = -1;
  }
};
// 发布评论
const subComment = async () => {
  if (!isLogin.value) {
    useLoginDialog.setLoginDialog(true);
    return;
  }
  commentHandler(1, info.msg);
};

// 删除评论
const delComment = (item: { commentId: number }) => {
  ElMessageBox.confirm("确定删除评论？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    center: true,
  })
    .then(() => {
      commentHandler(0, "", item.commentId);
    })
    .catch(() => {});
};

// 回复评论
const replyComment = (item: { commentId: number }, index: number) => {
  if (!isLogin.value) {
    useLoginDialog.setLoginDialog(true);
    return;
  }
  info.replyCommentId =
    info.replyCommentId === item.commentId && info.replyIndex === index
      ? 0
      : item.commentId;
  info.replyIndex = index;
};

const replyMsg = (msg: any) => {
  if (!isLogin.value) {
    useLoginDialog.setLoginDialog(true);
    return;
  }
  commentHandler(2, msg, info.replyCommentId);
};

// 给评论点赞
const likeComment = async (item: { commentId: any; liked: any }) => {
  if (!isLogin.value) {
    useLoginDialog.setLoginDialog(true);
    return;
  }

  const { data: res } = await getApi.commentLike({
    id: info.curId,
    cid: item.commentId,
    t: Number(!item.liked),
    type: type,
  });

  if (res.code !== 200) {
    return ElMessage.error("数据请求失败");
  }
  getComment();
};

// 留言分页
const currentChange = (page: number) => {
  info.offset = (page - 1) * info.limit;
};

onMounted(() => {
  getComment();
});

watch(
  () => sId,
  (newVal, oldVal) => {
    info["curId"] = newVal;
    info["offset"] = 0;
    getComment();
  }
);

watch(
  () => info.msg,
  () => {
    info.msg =
      info.maxLen >= Number(info.msg)
        ? info.msg
        : info.msg.substring(0, info.maxLen);
  }
);
</script>

<style scoped lang="less">
.comments {
  padding-top: 30px;
}

.comment_hd {
  display: flex;
  align-items: center;
  height: 60px;
  font-size: 0;

  h2 {
    flex: 1;
    font-size: 24px;
    line-height: 24px;
    font-weight: normal;

    em {
      padding-left: 20px;
      font-size: 14px;
      line-height: 14px;
      font-style: normal;
      color: #999;
    }
  }

  .userInfo {
    .avatar {
      width: 30px;
      height: 30px;
      border-radius: 4px;
      vertical-align: top;
    }

    span {
      display: inline-block;
      padding: 0 20px;
      line-height: 30px;
      font-size: 14px;
      color: #666;
    }
  }
}

.comment_box {
  .comment_textarea {
    position: relative;
    border: 1px solid #e9e9e9;
    border-radius: 4px;
    background: #fff;
  }

  .pre {
    visibility: hidden;
  }

  .inp-paragraph {
    position: absolute;
    top: 0;
    left: 0;
    height: calc(100% - 20px);
    resize: none;
    width: auto;
    padding: 0;
    border: 0;
    margin: 0;
    font-family: inherit;
    border-radius: 0;
    box-shadow: none;
    overflow: hidden;
  }

  .inp-paragraph,
  .pre {
    width: calc(100% - 30px);
    padding: 10px 15px;
    line-height: 24px;
    min-height: 90px;
    font-size: 14px;
    color: #333;
    border-radius: 4px;
    white-space: pre-wrap;
    word-wrap: break-word;
  }

  .comment_box_footer {
    display: flex;
    padding: 15px 0 50px;
    justify-content: space-between;
  }

  .comment_limit {
    display: inline-block;
    line-height: 28px;
    padding: 0 0 0 20px;
    font-size: 14px;
    color: #666;

    em {
      font-style: normal;
    }
  }
}

.comments_status {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;

  .loading {
    font-size: 14px;
    line-height: 24px;
    color: #999;
  }

  .empty {
    text-align: center;

    p {
      font-size: 14px;
      line-height: 24px;
      color: #999;
    }

    .icon-empty-main {
      line-height: 140px;
      font-size: 100px;
      color: #bbb;
      opacity: 0.8;
    }
  }
}

.comment_item {
  position: relative;
  display: flex;
  padding: 20px;
  margin-bottom: 15px;
  box-shadow: 0 20px 27px rgb(0 0 0 / 5%);
  border-radius: 6px;
  background: #fff;

  .comment_avatar {
    display: in;
    width: 40px;
    height: 40px;
    border-radius: 100%;
    overflow: hidden;
  }

  .comment_info {
    flex: 1;
    padding-left: 20px;

    a {
      display: inline-block;
      padding-bottom: 10px;
      line-height: 14px;
      color: #999;

      &:hover {
        color: var(--color-text);
      }
    }
  }

  .comment_content {
    line-height: 24px;
  }

  .comment_reply {
    padding: 10px;
    line-height: 28px;
    margin: 5px 0;
    color: #666;
    background: #fafafa;
    border-radius: 6px;
    box-shadow: 0 0px 27px rgb(0 0 0 / 6%) inset;

    a {
      display: inline-block;
      line-height: 28px;
      padding: 0;
    }
  }

  .comment_footer {
    display: flex;
    color: #999;

    .comment_time {
      display: inline-block;
      line-height: 28px;
    }

    .comment_oper {
      flex: 1;
      text-align: right;

      span {
        display: inline-block;
        margin-left: 15px;
        line-height: 28px;
        cursor: pointer;

        &.active,
        &.active .iconfont {
          color: var(--color-text);
        }
      }
    }
  }

  .isHot {
    position: absolute;
    right: 0;
    top: -8px;
    z-index: 1;
    // transform: rotate(45deg);

    .icon-choicest {
      font-size: 60px;
      color: var(--color-text);
      opacity: 0.8;
    }
  }

  .comment_del {
    cursor: pointer;
    display: none;
  }

  &:hover {
    .comment_del {
      display: inline-block;
    }
  }

  &:last-child {
    border: none;
  }
}

.pagination {
  padding: 30px 0;
  text-align: center;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
