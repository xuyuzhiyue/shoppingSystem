<template>
  <div class="article">
    <div class="article_top">
      <!-- 面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right article_breadcrumb">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="article_form">
        <div class="article_filter">
          <i class="iconfont iconxuanze"></i>
          商品筛选条件
        </div>
        <!-- from -->
        <el-form
          ref="form"
          label-width="80px"
          class="article_form"
          label-position="left"
        >
          <el-form-item label="商品类型">
            <el-select
              v-model="selectVal"
              placeholder="请选择活动区域"
              @change="changeVal"
            >
              <el-option
                :label="item"
                :value="item"
                v-for="(item, index) in selectValList"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品发布时间">
            <el-col :span="11">
              <el-date-picker
                v-model="date"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="changeDate"
              >
              </el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="商品名称">
            <el-input
              size="medium"
              v-model="searchString"
              style="width: 250px"
              placeholder="请输入关键字搜索"
            />
            <el-button type="primary" @click="handleQuery">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="table">
      <div class="article_bottom_title">
        <span>筛选后的数据内容 : </span>
        <span
          >{{ searchString }} 总计{{ total }}条数据，本页共{{
            tableData.length
          }}条</span
        >
      </div>
      <el-table
        :data="tableData"
        style="width: 100%"
        border
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
      >
        <el-table-column prop="goods_id" label="商品id"> </el-table-column>
        <el-table-column prop="goods_name" label="商品名称"> </el-table-column>
        <el-table-column prop="goodsType" label="商品类型"> </el-table-column>
        <el-table-column prop="cat_type" label="商品大项类型">
        </el-table-column>
        <el-table-column prop="goods_number" label="商品数量">
        </el-table-column>
        <el-table-column prop="goods_big_logo" label="商品图片">
          <template slot-scope="scope">
            <el-image
              fit="cover"
              :src="scope.row.goods_big_logo"
              style="width: 100%; heigth: 50px"
              lazy
            >
              <div slot="placeholder" class="image-slot">
                加载中<span class="dot">...</span>
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="goods_price" label="商品价格"> </el-table-column>
        <el-table-column prop="hot_mumber" label="商品热销数">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.$index, scope.row)"
              circle
              icon="el-icon-edit"
            ></el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              circle
              icon="el-icon-delete"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="curPage"
        :page-sizes="[10, 20, 30, 40, 50, 100]"
        :page-size="pageSize"
        :total="total"
        layout="sizes,prev,pager,next"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import {
  getUserMessage,
  SearchGoodsType,
  dateSearchGoodsType,
  deleteGoods
} from "@/api/user.js";

import moment from "moment"; //导入文件
export default {
  name: "articleIndex",
  components: {},
  props: {},
  data() {
    return {
      selectVal: "",
      selectValList: [
        "",
        "曲面电视",
        "海信",
        "夏普",
        "创维",
        "TCL",
        "PPTV",
        "小米",
        "长虹",
        "变频空调",
        "立柜空调",
        "挂壁空调",
        "中央空调",
        "移动空调",
        "海尔",
        "三菱重工",
      ],
      GoodsType: "",
      GoodsTypeData: {},
      date: "",
      //   开始时间
      startTime: "",
      // 结束时间
      endTime: "",
      //   分页数据
      searchString: "",
      OrginList: [],
      tableData: [],
      total: 0,
      curPage: 1,
      pageSize: 10,
      // 加载中
      loading: true,
    };
  },
  mounted() {
    this.getGoods();
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    // 删除操作
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.deleteGoods(index + 1)
          this.getGoods()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    // 获取商品的所有信息
    getGoods() {
      getUserMessage().then((res) => {
        if (res.data.err_code !== 0) {
          console.log("获取信息失败");
          return;
        }
        this.OrginList = res.data.message;
        this.loading = false;
        this.handleFilter();
      });
    },
    // 根据商品类型获取商品的所有信息
    getGoodsType() {
      SearchGoodsType(this.GoodsTypeData).then((res) => {
        if (res.data.err_code !== 0) {
          console.log("获取信息失败");
          return;
        }
        this.OrginList = res.data.message;
        this.loading = false;
        this.handleFilter();
      });
    },
    // 根据商品时间获取商品的所有信息
    getDateSearch() {
      dateSearchGoodsType(this.GoodsTypeData).then((res) => {
        if (res.data.err_code !== 0) {
          console.log("获取信息失败");
          return;
        }
        this.OrginList = res.data.message;
        this.loading = false;
        this.handleFilter();
      });
    },
    // 根据goods_id删除商品
    deleteGoods(id){
      deleteGoods(id).then(res => {
        console.log(res);
      })
    },
    // 分页功能
    handleFilter() {
      let tempList = [];
      this.OrginList.forEach((element) => {
        if (element.goods_name.indexOf(this.searchString) !== -1)
          tempList.push(element);
      });
      this.paging(tempList);
    },
    paging(data) {
      // debugger
      this.total = data.length;
      let start = (this.curPage - 1) * this.pageSize;
      let end;
      if (start + this.pageSize > data.length) {
        end = data.length;
      } else {
        end = start + this.pageSize;
      }
      this.tableData = data.slice(start, end);
    },
    handleCurrentChange(val) {
      this.curPage = val;
      this.handleFilter();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.curPage = 1;
      this.handleFilter();
    },
    // 点击查询
    handleQuery() {
      if (this.GoodsType) {
        if (this.startTime === "" && this.endTime === "") {
          this.GoodsTypeData = {
            goodsType: this.GoodsType,
          };
        } else {
          this.GoodsTypeData = {
            goodsType: this.GoodsType,
            startTime: this.startTime,
            endTime: this.endTime,
          };
        }
        this.getGoodsType();
        console.log("已选择类型");
      } else if (this.startTime !== "" && this.endTime !== "") {
        this.GoodsTypeData = {
          startTime: this.startTime,
          endTime: this.endTime,
        };
        this.getDateSearch();
        console.log("已选择时间类型");
      } else {
        this.getGoods();
        console.log("类型为空");
      }
      this.curPage = 1;
      this.handleFilter();
    },
    // 下来选择框
    changeVal(e) {
      this.GoodsType = e;
    },
    //获取时间
    changeDate(e) {
      console.log(e);
      //  moment(this.date).format("dddd")
      if (e !== null) {
        this.startTime = moment(e[0]).format("YYYY-MM-DD h:mm:ss");
        this.endTime = moment(e[1]).format("YYYY-MM-DD h:mm:ss");
      } else {
        this.startTime = "";
        this.endTime = "";
      }
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
    .article_form {
      padding-top: 10px;
      .article_filter {
        color: rgb(241, 43, 43);
        margin-bottom: 10px;
      }
    }
    .el-breadcrumb {
      border-bottom: 1px solid #cccccc;
      padding-bottom: 20px;
    }
    .el-button--primary {
      margin-left: 20px;
    }
  }
  .table {
    padding: 20px;
    box-shadow: 2px 2px 2px 2px #cccccc;
    .article_bottom_title {
      margin-bottom: 20px;
    }
    .el-pagination {
      display: flex;
      justify-content: flex-end;
      padding: 20px 0;
    }
  }
}
</style>