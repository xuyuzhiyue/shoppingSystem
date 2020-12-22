<template>
  <div class="article">
    <div class="article_top">
      <!-- 面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right article_breadcrumb">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- from -->
      <el-form
        ref="form"
        :model="form"
        label-width="80px"
        class="article_form"
        label-position="left"
      >
        <el-form-item label="状态">
          <el-radio-group v-model="form.resource">
            <el-radio label="全部"></el-radio>
            <el-radio label="一半"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="活动时间">
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.date1"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="article_bottom">
      <Table/>
    </div>
  </div>
</template>
<script>
import Table from './components/table'
export default {
  name: "articleIndex",
  components: {
      Table
  },
  props: {},
  data() {
    return {
      form: {
        region: "",
        date1: "",
        date2: "",
        type: [],
        resource: "",
      },
      
    };
  },
  computed: {},
  methods: {
    onSubmit() {
      console.log("submit!");
    },
  },
};
</script>
<style lang='less' scoped>
.article {
  padding: 20px;
  .article_top {
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: 2px 2px 2px 2px #cccccc;
    .el-breadcrumb {
      border-bottom: 1px solid #cccccc;
      padding-bottom: 20px;
    }
    .article_form {
    }
  }
  .article_bottom {
    padding: 20px;
    box-shadow: 2px 2px 2px 2px #cccccc;
  }
}
</style>