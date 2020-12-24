<template>
  <div class="comprehensive">
    <el-card class="box-card">
      <div class="comprehensive_breadcrumb">
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right article_breadcrumb">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>综合商品</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="comprehensive_table_title">
        <i class="iconfont iconxuanze"></i>
        商品筛选条件
      </div>
      <div class="comprehensive_check">
        <el-input
          size="medium"
          v-model="searchString"
          style="width: 250px"
          placeholder="请输入关键字搜索"
        />
        <el-button type="primary" @click="handleQuery">查询</el-button>
      </div>
      <div class="comprehensive_table">
        <div class="article_bottom_title">
          <span>筛选后的数据内容 : </span>
          <span
            >{{ searchString }} 总计{{ total }}条数据，本页共{{
              tableData.length
            }}条</span
          >
        </div>
        <div class="comprehensive_table_contain">
          <el-table
            :data="tableData"
            style="width: 100%"
            border
            :header-cell-style="{ 'text-align': 'center' }"
            :cell-style="{ 'text-align': 'center' }"
          >
            <el-table-column prop="goods_id" label="商品id">
            </el-table-column>
            <el-table-column prop="goods_name" label="商品名称">
            </el-table-column>
            <el-table-column prop="goodsType" label="商品类型">
            </el-table-column>
            <el-table-column prop="cat_type" label="商品大类型">
            </el-table-column>
            <el-table-column prop="hot_number" label="商品数量">
            </el-table-column>
            <el-table-column prop="goods_price" label="商品价格">
            </el-table-column>
            <el-table-column prop="goods_small_logo" label="商品图片">
              <template slot-scope="scope">
                <el-image
                  fit="cover"
                  :src="scope.row.goods_small_logo"
                  style="width: 50%; heigth: 50px"
                  lazy
                >
                  <div slot="placeholder" class="image-slot">
                    加载中<span class="dot">...</span>
                  </div>
                </el-image>
              </template>
            </el-table-column>
            <el-table-column prop="image_src" label="商品视频">
              <template slot-scope="scope">
                <video  style="width: 100%; heigth:100%" :src="scope.row.image_src" controls="controls"></video>
              </template>
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
          <div class="comprehensive_pagination">
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
      </div>
    </el-card>
  </div>
</template>
<script>
import { Comprehensive,deleteComprehensive } from "@/api/user.js";
export default {
  name: "comprehensive",
  components: {},
  props: {},
  data() {
    return {
      OrginList: [],
      tableData: [],
      total: 0,
      curPage: 1,
      pageSize: 10,
      searchString: "",
    };
  },
  mounted() {
    this.getComprehensive();
  },
  methods: {
    // 查询接口
    getComprehensive() {
      Comprehensive().then((res) => {
        console.log(res);
        this.OrginList = res.data.message;
        this.handleFilter();
      });
    },
    // 删除接口
    getdeleteComprehensive(id){
      deleteComprehensive(id).then(res=>{
        console.log(res);
      })
    },
    // 点击查询
    handleQuery() {
      this.handleFilter();
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
    // 编辑操作
        handleEdit(index, row) {
      // console.log(index, row);
    },
    // 删除操作
    handleDelete(index, row) {
      let id =  row.goods_id
      this.$confirm("此操作将永久删除该商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.getdeleteComprehensive(id)
          this.getComprehensive();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>
<style lang='less' scoped>
.comprehensive {
  padding: 20px;
  .comprehensive_breadcrumb {
    border-bottom: 1px solid #cccccc;
    padding-bottom: 20px;
  }
  .comprehensive_check {
    margin-top: 20px;
    .el-button--primary {
      margin-left: 20px;
    }
  }

  .comprehensive_table_title {
    margin: 20px 0;
    color: #f12b2b;
  }
  .comprehensive_table {
    .article_bottom_title {
      margin: 20px 0;
    }
  }
  .comprehensive_pagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
}
</style>
