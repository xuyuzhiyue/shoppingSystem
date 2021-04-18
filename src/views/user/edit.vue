<template>
  <div class="edit">
    <div class="title">
      <span>修改个人信息</span>
    </div>
    <div class="box">
      <el-form
        :model="ruleForm"
        :rules="rules"
        label-position="left"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="管理员id" style="width: 420px">
          <span>{{ editData[0].id }}</span>
        </el-form-item>
        <el-form-item label="管理员名称" prop="name" style="width: 420px">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="管理员账号" style="width: 420px">
          <span>{{ editData[0].userName }}</span>
        </el-form-item>
        <el-form-item
          label="管理员密码"
          prop="userPassword"
          style="width: 420px"
        >
          <el-input v-model="ruleForm.userPassword"></el-input>
        </el-form-item>
        <el-form-item label="头像" style="width: 420px">
          <el-upload
            name="imgfile"
            class="upload-demo"
            action="http://127.0.0.1:8800/uploadImage"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="perhandleSuccess"
            :file-list="fileList"
            list-type="picture"
            :limit="1"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div>
        <el-button @click="edit('ruleForm')">修改成功</el-button>
        <el-button @click="goBack">返回</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { userDelData } from "@/api/user.js";
export default {
  name: "edit",
  data() {
    return {
      ruleForm: {
        name: "",
        userPassword: "",
      },
      image: "",
      fileList: [],
      rules: {
        name: [
          { required: true, message: "请输入管理员名称", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" },
        ],
        userPassword: [
          { required: true, message: "请输入管理员密码", trigger: "blur" },
          { min: 6, max: 12, message: "长度在 6到 12 个字符", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    this.data = this.editData;
  },
  methods: {
    // 修改
    getedit(data,id) {
      userDelData(data,id).then((res) => {
        console.log(res, "修改");
      });
    },
    // 修改成功
    edit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.image === "") {
            alert("请上传图片");
            return;
          }
          alert("修改成功!");
          this.getedit(
            {
              id: this.editData[0].id,
              isdel: this.editData[0].isdel,
              name: this.ruleForm.name,
              userName: this.editData[0].userName,
              userPassword: this.ruleForm.userPassword,
              image:this.image
            },
            this.editData[0].id
          );
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 返回
    goBack() {
      this.$emit("gobackIshow", true);
    },
    handleRemove(file, fileList) {
      this.image = "";
      this.fileList = [];
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    perhandleSuccess(response, file, fileList) {
      this.image = response.imgUrl;
      console.log(response, file, fileList, this.image, "this.image ");
    },
  },
  props: {
    editData: Array,
    required: true,
  },
};
</script>
<style lang='less' scoped>
</style>