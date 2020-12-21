<template>
  <div class="layout">
    <el-container class="layout_container">
      <el-aside width="200px" class="layout_aside"><AppAside class="aside_menu"/></el-aside>
      <el-container>
        <el-header class="layout_header">顶部导航栏</el-header>
        <el-main class="layout_main">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import AppAside from './components/aside'
export default {
  name: "layoutIndex",
  components: {
      AppAside
  },
  props: {},
  data() {
    return {};
  },
};
</script>
<style lang='less' scoped>
.layout_container {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
  .layout_aside {
    .aside_menu{
        height: 100%;
    }
  }
  .layout_header {
    background-color: saddlebrown;
  }
  .layout_main {
    background-color: #a9a9a9;
  }
}
</style>