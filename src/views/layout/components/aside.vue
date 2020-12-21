<template>
  <div class="aside">
      
    <el-menu
      default-active="/"
      class="aside-menu"
      background-color="#002033"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >
    <div class="aside_title">购物袋-商城</div>
      <el-menu-item index="/">
        <i class="el-icon-location"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="/article">
        <i class="el-icon-menu"></i>
        <span slot="title">内容管理</span>
      </el-menu-item>
      <el-menu-item index="/image">
        <i class="el-icon-document"></i>
        <span slot="title">素材管理</span>
      </el-menu-item>
      <el-menu-item index="/publish">
        <i class="el-icon-setting"></i>
        <span slot="title">发布文章</span>
      </el-menu-item>
      <el-menu-item index="/comment">
        <i class="el-icon-setting"></i>
        <span slot="title">评论管理</span>
      </el-menu-item>
      <el-menu-item index="/fans">
        <i class="el-icon-setting"></i>
        <span slot="title">粉丝管理</span>
      </el-menu-item>
      <el-menu-item index="/setting">
        <i class="el-icon-setting"></i>
        <span slot="title">个人设置</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: "asideIndex",
  components: {},
  props: {},
  data() {
    return {};
  },
  methods: {
  },
};
</script>
<style lang='less' scoped>
.aside {
  .aside-menu {
    height: 100%;
    .aside_title{
        color: rgb(245, 83, 78);
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
    }
  }
}
</style>