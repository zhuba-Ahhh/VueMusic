<template>
  <div class="mv">
    <div class="mv-container">
      <div class="mv-main">
        <div
          class="wrapper infinite-list"
          v-infinite-scroll="loadMv"
          infinite-scroll-disabled="isLoadMv"
          infinite-scroll-distance="50"
        >
          <mv-list
            :mvList="list"
            :loading="mv_loading"
            :num="mv_count"
          ></mv-list>
          <template v-if="isLoading">
            <Loading />
          </template>
        </div>
      </div>
      <div class="aside-box">
        <el-affix :offset="140">
          <div class="aside-menu">
            <h3 class="aside-title">排序</h3>
            <div class="filter-main">
              <em
                v-for="(item, index) in order"
                :class="index === orderIndex ? 'active' : ''"
                :key="index"
                @click="selectType('order', index)"
                >{{ item }}</em
              >
            </div>
            <h3 class="aside-title">区域</h3>
            <div class="filter-main">
              <em
                v-for="(item, index) in area"
                :class="Number(index) === areaIndex ? 'active' : ''"
                :key="index"
                @click="selectType('area', index)"
                >{{ item }}</em
              >
            </div>
            <h3 class="aside-title">类型</h3>
            <div class="filter-main">
              <em
                v-for="(item, index) in type"
                :class="Number(index) === typeIndex ? 'active' : ''"
                :key="index"
                @click="selectType('type', index)"
                >{{ item }}</em
              >
            </div>
          </div>
        </el-affix>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MvList from "@/components/MvList.vue";
import Loading from "@/components/Loading.vue";
import { onMounted, watchEffect, reactive, toRefs } from "vue";
import { ElMessage } from "element-plus";
import MV_AREA from "@/common";
import MV_TYPE from "@/common";
import { mv } from "@/apis/modules";

const info = reactive({
  area: MV_AREA,
  type: MV_TYPE,
  order: ["上升最快", "最新"],
  areaIndex: 0,
  typeIndex: 0,
  orderIndex: 0,
  params: {
    area: "",
    type: "",
    order: "",
    limit: 30,
    offset: 0,
  },
  list: [],
  mv_count: 20,
  mv_loading: true,
  isLoading: true,
  isLoadMv: true,
});

const {
  area,
  type,
  order,
  areaIndex,
  typeIndex,
  orderIndex,
  params,
  list,
  mv_count,
  mv_loading,
  isLoading,
  isLoadMv,
} = toRefs(info);

const getMv = async (params: {
  area: string;
  type: string;
  order: string;
  limit: number;
  offset: number;
}) => {
  const { data: res } = await mv(params);

  if (res.code !== 200) {
    return ElMessage.error("数据请求失败");
  }

  info.list = info.params.offset !== 0 ? [...info.list, ...res.data] : res.data;
  info.isLoadMv = !res.hasMore;
  info.isLoading = res.hasMore;
  info.mv_loading = false;
};

const selectType = (type: string, index: string | number) => {
  info[type + "Index"] = index;
  info.list = [];
  info.params.offset = 0;
  info.params[type] = info[type][index];
  info.mv_loading = true;
};

const loadMv = () => {
  info.isLoadMv = true;
  info.params.offset = info.list.length;
};

onMounted(() => {
  info.params.area = info.area[info.areaIndex];
  info.params.type = info.type[info.typeIndex];
  info.params.order = info.order[info.orderIndex];
});

watchEffect(() => {
  getMv(info.params);
});
</script>

<style lang="less" scoped>
.mv-container {
  display: flex;
  padding-top: 40px;

  .mv-main {
    flex: 1;
    margin-top: -20px;
  }
}

.aside-menu {
  padding: 20px 20px 1px;
  margin-bottom: 25px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 20px 27px rgb(0 0 0 / 5%);
}
// .aside-title {
// }
.filter-main {
  margin: 5px 0 20px;

  em {
    position: relative;
    z-index: 1;
    display: inline-block;
    padding: 5px 0;
    margin-right: 15px;
    font-style: normal;
    cursor: pointer;

    &.active {
      &::after {
        position: absolute;
        content: "";
        left: 0;
        bottom: 5px;
        width: 100%;
        height: 6px;
        background: #ff641e;
        z-index: -1;
      }
    }
  }
}
</style>
