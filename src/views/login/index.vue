<template>
  <div class="login">
    <el-form :model="user" :rules="rules" ref="ruleForm" class="login_form">
      <div class="login_title">购物袋-商城</div>
      <el-form-item prop="userName">
        <el-input v-model="user.userName" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item prop="userPassword">
        <el-input
          v-model="user.userPassword"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item prop="userPassword">
        <el-checkbox v-model="checked"
          >我已阅读并同意用户协议和隐私条款</el-checkbox
        >
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="onLogin('ruleForm')"
          class="login_btn"
          :plain="true"
          :loading="isLoading"
          :disabled="!checked"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import request from "@/utils/request";
export default {
  name: "LoginIndex",
  components: {},
  props: {},
  data() {
    return {
      user: {
        userName: "",
        userPassword: "",
      },
      rules: {
        userName: [
          { required: true, message: "请输入账号", trigger: "blur" },
          {
            min: 3,
            max: 12,
            message: "长度在 3 到 12 个字符",
            trigger: "blur",
          },
        ],
        userPassword: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 12,
            pattern:/(^[1-9]\d*$)/,
            message: "请输入长度在 6 到 12 个数字",
            trigger: "blur",
          },
        ],
      },
      checked: false,
      isLoading: false,
    };
  },
  methods: {
    onLogin(formName) {
      if (!this.checked) {
        alert("请勾选复选框");
        return;
      }
      this.checked = this.checked;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.isLoading = true;
          // 验证通过 发起请求
          request({
            method: "POST",
            url: "/manageUsers",
            data: {
              // 获取表单数据
              userName: this.user.userName,
              userPassword: this.user.userPassword,
            },
          })
            .then((res) => {
              this.isLoading = false;
              if (res.data.message.length === 0) {
                this.$message.error("登陆失败，请重新输入账号或密码");
                return;
              }
              this.$message({
                message: "登录成功",
                type: "success",
              });
            })
            .catch((err) => {
              console.log("登陆失败", err);
              this.isLoading = false;
            });
        } else {
          this.isLoading = false;
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("./login.jpg") no-repeat;
  background-size: cover;
  .login_form {
    background: #ffffff;
    padding: 50px;
    min-width: 300px;
    .login_title {
      color: rgb(245, 83, 78);
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 30px;
    }
  }
  .login_btn {
    width: 100%;
  }
}
</style>
