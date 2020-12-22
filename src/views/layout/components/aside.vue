<template>
  <div class="aside">
    <el-menu
      default-active="/"
      class="aside-menu"
      background-color="#002033"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
      :collapse="isCollapse"
    >
      <div class="aside_title">
        <i class="iconfont icondwg"></i>
        <span v-if="!isCollapse">购物袋-商城</span> 
      </div>
      <el-menu-item index="/">
        <i class="iconfont iconshouye"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="/article">
        <i class="iconfont iconneirongzixunmoren-"></i>
        <span slot="title">内容管理</span>
      </el-menu-item>
      <el-menu-item index="/image">
        <i class="iconfont iconsucai"></i>
        <span slot="title">素材管理</span>
      </el-menu-item>
      <el-menu-item index="/publish">
        <i class="iconfont iconpublish"></i>
        <span slot="title">发布文章</span>
      </el-menu-item>
      <el-menu-item index="/comment">
        <i class="iconfont iconpinglun"></i>
        <span slot="title">评论管理</span>
      </el-menu-item>
      <el-menu-item index="/fans">
        <i class="iconfont iconfensi1-copy"></i>
        <span slot="title">粉丝管理</span>
      </el-menu-item>
      <el-menu-item index="/setting">
        <i class="iconfont iconshezhi"></i>
        <span slot="title">个人设置</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: "asideIndex",
  components: {},
  props: ['isCollapse'],
  data() {
    return {
    };
  },
  methods: {},
};
</script>
<style lang='less' scoped>
.aside {
  .aside-menu {
    height: 100%;
    .iconfont {
      margin-right: 5px;
    }
    .aside_title {
      color: rgb(245, 83, 78);
      display: flex;
      justify-content: center;
      align-items: center;
      // margin-top: 20px;
      margin: 20px 20px 0 20px;
    }
  }
}
/deep/    .horizontal-collapse-transition { 
        transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out; 
    } 
</style>