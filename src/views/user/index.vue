<template>
  <div class="user">
    <el-card class="box-card" v-show="isShow">
      <div class="user_breadcrumb">
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right article_breadcrumb">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>个人信息</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="table">
        <template>
          <el-table
            :data="tableData"
            style="width: 100%"
            border
            :header-cell-style="{ 'text-align': 'center' }"
            :cell-style="{ 'text-align': 'center' }"
          >
            <el-table-column prop="id" label="商品id"> </el-table-column>
            <el-table-column prop="name" label="管理员名称"> </el-table-column>
            <el-table-column prop="userName" label="管理员账户">
            </el-table-column>
            <!-- <el-table-column
              :prop="isdel === 0 ? '未注销' : '已注销'"
              label="是否注销账户"
            >
            </el-table-column> -->
            <el-table-column label="是否注销账户">
              <template slot-scope="scope">
                <span
                  :style="
                    scope.row.isdel === 0
                      ? { color: 'seagreen' }
                      : { color: 'red' }
                  "
                  >{{ scope.row.isdel === 0 ? "未注销" : "已注销" }}</span
                >
              </template>
            </el-table-column>
            <el-table-column prop="userPassword" label="管理员密码">
            </el-table-column>
            <el-table-column label="头像">
              <template slot-scope="scope">
                <el-image
                  fit="cover"
                  :src="require('@/assets/'+scope.row.image)"
                  style="width: 50%; heigth: 50px"
                  lazy
                >
                  <div slot="placeholder" class="image-slot">
                    加载中<span class="dot">...</span>
                  </div>
                </el-image>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                :disabled="scope.row.isdel === 1 ? true : false"
                  size="mini"
                  type="primary"
                  @click="handleEdit(scope.$index, scope.row)"
                  circle
                  icon="el-icon-edit"
                ></el-button>
                <el-button
                  :disabled="scope.row.isdel === 1 ? true : false"
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                  circle
                  icon="el-icon-delete"
                ></el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </div>
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
    </el-card>
    <Edit v-show="!isShow" :editData="editData" @gobackIshow="gobackIshowData"/>
  </div>
</template>
<script>

import Edit from './edit';
import { userAllData, userDelData } from "@/api/user.js"
export default {
  name: "user",
  data() {
    return {
      OrginList: [],
      tableData: [],
      searchString: "",
      total: 0,
      curPage: 1,
      pageSize: 10,
      isShow:true,
      editData:[]
    };
  },
  components:{
    Edit
  },
  mounted() {
    this.getData();
  },
  methods: {
    // 获取所有管理员信息
    getData() {
      userAllData().then((res) => {
        this.OrginList = res.data.message;
        this.handleFilter();
        // console.log(res, this.OrginList, this.tableData);
      });
    },
    // 分页功能
    handleFilter() {
      let tempList = [];
      this.OrginList.forEach((element) => {
        if (element.name.indexOf(this.searchString) !== -1)
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
      this.editData = []
      this.editData.push(row)
      // console.log(this.editData,'this.editData');
      this.isShow = false
      // console.log(index, row, "编辑操作");
    },
    // 删除操作
    handleDelete(index, row) {
      console.log(index, row, "删除操作");
      this.getUserDelData(
        {
          id:row.id,
          isdel:1,
          name:row.name,
          userName:row.userName,
          userPassword:row.userPassword,
        },
        row.id
      );
    },
    // 注销管理员
    getUserDelData(data, id) {
      userDelData(data, id).then((res) => {
        if(res.data.message === '编辑成功'){
          alert('注销成功')
          this.getData()
        }
      });
    },
    // 获取返回的数据
    gobackIshowData(data){
      this.isShow = data
      this.getData();
    }
  },
};
</script>
<style lang='less' scoped>
.user {
  padding: 20px;
  .user_breadcrumb {
    padding-bottom: 20px;
  }
  .comprehensive_pagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
}
</style>
