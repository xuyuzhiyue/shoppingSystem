<template>
  <div class="layout">
    <el-container class="layout_container">
      <el-aside width="auto" class="layout_aside"
        ><AppAside class="aside_menu" :isCollapse="isCollapse"
      /></el-aside>
      <el-container>
        <el-header class="layout_header">
          <div class="layout_header_title">
            <i
              @click="btnIsCollapse"
              :class="{
                'el-icon-s-fold': isCollapse,
                'el-icon-s-unfold': !isCollapse,
              }"
            ></i>
            <div>计科3班-风华正茂</div>
          </div>
          <el-dropdown>
            <div class="layout_wrap">
              <img class="avatar"   :src="require('@/assets/'+userdata.image)"  alt="" />
              <span
                >{{ userdata.name
                }}<i class="el-icon-arrow-down el-icon--right"></i
              ></span>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人设置</el-dropdown-item>
              <el-dropdown-item @click.native="clickOut"
                >用户退出</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <el-main class="layout_main">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import AppAside from "./components/aside";
export default {
  name: "layoutIndex",
  components: {
    AppAside,
  },
  props: {},
  data() {
    return {
      userMessage: {},
      userdata: {},
      isCollapse: false, //侧边菜单栏展开
    };
  },
  created() {
    this.getUserMessage();
  },
  methods: {
    // 获取用户信息
    getUserMessage() {
      this.userMessage = JSON.parse(window.localStorage.getItem("user"));
      this.userdata = this.userMessage.message[0];
    },
    // 张开
    btnIsCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    // 退出登陆
    clickOut() {
      this.$confirm("是否退出登录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "退出成功成功!",
          });

          //把用户的登录状态清除 跳转到登陆页面
          window.localStorage.removeItem("user");
          this.$router.push("/login");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消登录",
          });
        });
    },
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
    .aside_menu {
      height: 100%;
    }
  }
  .layout_header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
    .layout_header_title {
      display: flex;
      justify-content: center;
      align-items: center;
      & > i {
        margin-right: 10px;
      }
    }
    .layout_wrap {
      display: flex;
      align-items: center;
      .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 10px;
      }
    }
  }
  .layout_main {
    padding: 0;
  }
}
</style>