<template>
  <div class="search-detail">
    <div class="search-container">
      <div class="search-hd">
        <el-select
          class="search-box"
          clearable
          filterable
          remote
          placeholder="请输入歌名、歌词、歌手或专辑"
        >
          <el-option-group>
            <el-option class="item">
              <template> </template>
              <template> - <span class="artists"></span> </template>
            </el-option>
          </el-option-group>
        </el-select>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.search-detail {
  display: flex;
  padding: 40px 0;
  margin-left: -150px;

  .search-container {
    width: 70%;
    margin: 0 auto;
  }
}

.search-hd {
  padding: 20px;
  background: #fff;
  border-radius: 12px 12px 0 0;
  box-shadow: 0 20px 27px rgb(0 0 0 / 5%);
}
.search-box {
  display: block;
  position: relative;
  width: 50%;
  padding: 30px 0;
  margin: 0 auto;

  :deep(input) {
    height: 50px;
    border: 1px solid rgb(217, 217, 217);
    border-radius: 4px;
  }
}

.search-main {
  position: relative;
  padding: 20px;
  margin-top: 3px;
  background: #fff;
  border-radius: 0 0 12px 12px;
  box-shadow: 0 20px 27px rgb(0 0 0 / 5%);

  h5 {
    font-size: 24px;
    line-height: 30px;

    em {
      display: inline-block;
      width: 150px;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      padding: 0 10px;
      vertical-align: top;
    }
  }
}

.search-tab {
  position: absolute;
  right: -80px;

  .tab-item {
    width: 80px;
    line-height: 14px;
    padding: 15px 0;
    margin-bottom: 15px;
    text-align: center;
    background: #fff;
    border-radius: 0 12px 12px 0;
    box-shadow: 10px 0px 10px rgb(0 0 0 / 5%);
    cursor: pointer;

    &:hover {
      background: #fafafa;
    }

    &.active {
      color: #fff;
      background: var(--color-text-height);
    }
  }
}
.search-list {
  min-height: 550px;
}

.el-skeleton.albums {
  :deep(.ske-img) {
    width: 97px;
    height: 97px;
    line-height: 120px;
  }
}
.el-skeleton.play {
  :deep(.ske-img) {
    height: calc(@mainWidth / 6 * 0.7 - 40px);
    line-height: calc(@mainWidth / 6 * 0.7 - 40px);
  }
}

.pagination {
  padding: 30px 0;
  text-align: center;
}
</style>
