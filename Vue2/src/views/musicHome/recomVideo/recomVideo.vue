<template>
  <div class="recomVideo">
    <div id="headTab">
      <!-- 头部导航栏 -->
      <headTab />
    </div>
    <div>
      <!-- 二级路由 -->
      <router-view id="secondRoute" />
    </div>
  </div>
</template>

<script>
import headTab from "@/components/musicHome/recomVideo/headTab/headTab";
export default {
  name: "recomVideo",
  components: {
    headTab,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
#headTab {
  /* width: 100%; */
  width: 450px;
  height: 70px;
  margin-left: 60%;
  transform: translateX(-50%);
}
#secondRoute:hover {
  overflow-y: overlay;
}

#secondRoute {
  padding-right: 17px;
  padding-left: 3px;
  height: 100vh;
  width: 100%;
  overflow-y: hidden;
  overflow-x: hidden;
}
</style>
