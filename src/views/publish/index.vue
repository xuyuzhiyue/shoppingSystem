<template>
  <div class="publish">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right article_breadcrumb">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>发布管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="pulish_title">
        <i class="iconfont iconwodefabu"></i>
        添加商品内容(带*号的是必填选项)
      </div>
      <el-form
        :model="rulesForm"
        :rules="rules"
        ref="ruleForm"
        label-width="160px"
        class="publishForm"
        label-position="left"
      >
        <el-form-item label="商品名称" prop="goods_name">
          <el-input
            v-model="rulesForm.goods_name"
            style="width: 220px"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品goodsType类型" prop="goodsType" required>
          <el-select v-model="rulesForm.goodsType" placeholder="请选择活动区域">
            <el-option
              :label="item"
              :value="item"
              v-for="(item, index) in selectGoodsType"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品cat_type类型" prop="cat_type" required>
          <el-select v-model="rulesForm.cat_type" placeholder="请选择活动区域">
            <el-option
              :label="item"
              :value="item"
              v-for="(item, index) in selectCat_type"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品数量" prop="goods_number">
          <el-input
            v-model="rulesForm.goods_number"
            style="width: 220px"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="goods_price">
          <el-input
            v-model="rulesForm.goods_price"
            style="width: 220px"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品时间" required>
          <el-date-picker
            v-model="date"
            type="daterange"
            range-separator="至"
            start-placeholder="发布日期"
            end-placeholder="下架日期"
            @change="changeDate"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="商品图片" prop="goods_small_logo" required>
          <el-input
            v-model="rulesForm.goods_small_logo"
            style="width: 220px"
          ></el-input>
          <el-button
            type="text"
            style="margin-left: 20px"
            @click="btnBialogVisible('image')"
            >查看格式要求</el-button
          >
        </el-form-item>
        <el-form-item label="商品详情介绍" prop="goods_introduce" required>
          <el-input
            v-model="rulesForm.goods_introduce"
            style="width: 220px"
          ></el-input>
          <el-button
            type="text"
            style="margin-left: 20px"
            @click="btnBialogVisible('introduce')"
            >查看格式要求</el-button
          >
        </el-form-item>
        <el-form-item label="商品详情图片1" prop="pics_mid1">
          <el-input
            v-model="rulesForm.pics_mid1"
            style="width: 220px"
          ></el-input>
          <el-button
            type="text"
            style="margin-left: 20px"
            @click="btnBialogVisible('image')"
            >查看格式要求</el-button
          >
        </el-form-item>
        <el-form-item label="商品详情图片2" prop="pics_mid2">
          <el-input
            v-model="rulesForm.pics_mid2"
            style="width: 220px"
          ></el-input>
          <el-button
            type="text"
            style="margin-left: 20px"
            @click="btnBialogVisible('image')"
            >查看格式要求</el-button
          >
        </el-form-item>
        <el-form-item label="商品详情图片3" prop="pics_mid3">
          <el-input
            v-model="rulesForm.pics_mid3"
            style="width: 220px"
          ></el-input>
          <el-button
            type="text"
            style="margin-left: 20px"
            @click="btnBialogVisible('image')"
            >查看格式要求</el-button
          >
        </el-form-item>
        <el-form-item label="商品热销" prop="hot_munber">
          <el-input
            v-model="rulesForm.hot_munber"
            style="width: 220px"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="publish_btn">
        <el-button type="primary" @click="btnPublish('ruleForm')"
          >点击发布</el-button
        >
      </div>
    </el-card>

    <!-- 模态框 -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      :append-to-body="true"
    >
      <div v-text="format" class="publish_introduce"></div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import moment from "moment";
import { insertGoodsDetail } from "@/api/user.js";

export default {
  name: "publishIndex",
  components: {},
  props: {},
  data() {
    return {
      rulesForm: {
        goods_name: "",
        goodsType: "",
        cat_type: "",
        goods_number: "",
        goods_price: "",
        goods_small_logo: "",
        hot_munber: "",
        pics_mid1: "",
        pics_mid2: "",
        pics_mid3: "",
        goods_introduce: "",
      },
      date: "",
      add_time: "",
      upd_time: "",
      rules: {
        goods_name: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          {
            min: 1,
            max: 255,
            message: "长度在 1 到 255 个字符",
            trigger: "blur",
          },
        ],
        goods_number: [
          { required: true, message: "请输入商品数量", trigger: "blur" },
          {
            pattern: /^(0|\+?[1-9][0-9]*)$/,
            min: 1,
            max: 255,
            message: "0 或 正整数 长度在 1 到 255 ",
            trigger: "blur",
          },
        ],
        goods_price: [
          { required: true, message: "请输入商品价格", trigger: "blur" },
          {
            pattern: /^\d+(\.\d+)?$/,
            min: 1,
            max: 255,
            message: "0 或 正整数 长度在 1 到 255 ",
            trigger: "blur",
          },
        ],
        hot_munber: [
          { required: false, message: "请输入商品数量", trigger: "blur" },
          {
            pattern: /^(0|\+?[1-9][0-9]*)$/,
            min: 1,
            max: 255,
            message: "0 或 正整数 长度在 1 到 255 ",
            trigger: "blur",
          },
        ],
      },
      selectGoodsType: [
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
        "滚筒洗衣机",
        "波轮洗衣机",
        "大容量洗衣机",
        "迷你洗衣机",
        "双缸洗衣机",
        "干衣机",
        "洗衣机服务",
        "对开门冰箱",
        "多门冰箱",
        "三门冰箱",
        "十字对开门",
        "商用冷柜",
        "双门冰箱",
        "西门子",
        "护肤套装",
        "面膜",
        "巧克力",
        "儿童玩具",
        "平板电脑",
        "童装童鞋",
        "笔记本",
        "苹果手机",
        "巴黎水",
        "爱他美",
        "花王",
        "戴森",
        "ReFa",
        "童车童床",
        "营养辅食",
        "婴儿用品",
        "婴儿洗护",
        "童装童鞋",
      ],
      selectCat_type: [
        "",
        "电视",
        "空调",
        "洗衣机",
        "冰箱",
        "圣诞狂欢",
        "电脑整机",
        "国际名牌",
        "母婴儿童",
        "美妆",
        "个护",
        "营养保健",
        "食品",
        "数码家电",
        "服饰箱包",
        "大牌推荐",
        "搞机达人",
        "手机配件",
        "摄影摄像",
        "相机配件",
      ],
      allDataList: {},
      format:
        '<div class="lazyimg"><div moduleid="R0503002_2" modulename="关联推荐"><p><a href="https://shop.suning.com/30000011/index.html" target="_blank"><img data-src="https://image.suning.cn/uimg/sop/commodity/152418403963754690151350_x.jpg?from=mobile&amp;format=80q.webp" alt="" src="https://image.suning.cn/uimg/sop/commodity/152418403963754690151350_x.jpg?from=mobile&format=80q.webp" width="100%" height="auto"></a></p> <table style="width: 100%; height: auto;"> <tbody> <tr> <td><a href="https://product.suning.com/0000000000/721034170.html" target="_blank"><img data-src="https://image.suning.cn/uimg/sop/commodity/674265889569958711135500_x.jpg?from=mobile&amp;format=80q.webp" alt="" src="https://image.suning.cn/uimg/sop/commodity/674265889569958711135500_x.jpg?from=mobile&format=80q.webp" width="100%" height="auto"></a></td> <td><a href="https://product.suning.com/0030000011/659973806.html" target="_blank"><img data-src="https://image.suning.cn/uimg/sop/commodity/580804888269630832171600_x.jpg?from=mobile&amp;format=80q.webp" alt="" src="https://image.suning.cn/uimg/sop/commodity/580804888269630832171600_x.jpg?from=mobile&format=80q.webp" width="100%" height="auto"></a></td> <td><a href="https://product.suning.com/0000000000/646332415.html" target="_blank"><img data-src="https://image.suning.cn/uimg/sop/commodity/164947314370596747459900_x.jpg?from=mobile&amp;format=80q.webp" alt="" src="https://image.suning.cn/uimg/sop/commodity/164947314370596747459900_x.jpg?from=mobile&format=80q.webp" width="100%" height="auto"></a></td> </tr> <tr> <td><a href="https://product.suning.com/0030000011/719579209.html" target="_blank"><img data-src="https://image.suning.cn/uimg/sop/commodity/109859084335308009815860_x.jpg?from=mobile&amp;format=80q.webp" alt="" src="https://image.suning.cn/uimg/sop/commodity/109859084335308009815860_x.jpg?from=mobile&format=80q.webp" width="100%" height="auto"></a></td> <td><a href="https://product.suning.com/0000000000/154158097.html" target="_blank"><img data-src="https://image.suning.cn/uimg/sop/commodity/139086270826280834777770_x.jpg?from=mobile&amp;format=80q.webp" alt="" src="https://image.suning.cn/uimg/sop/commodity/139086270826280834777770_x.jpg?from=mobile&format=80q.webp" width="100%" height="auto"></a></td> <td><a href="https://product.suning.com/0000000000/683246685.html" target="_blank"><img data-src="https://image.suning.cn/uimg/sop/commodity/212695348731710262086520_x.jpg?from=mobile&amp;format=80q.webp" alt="" src="https://image.suning.cn/uimg/sop/commodity/212695348731710262086520_x.jpg?from=mobile&format=80q.webp" width="100%" height="auto"></a></td> </tr> </tbody> </table></div><div moduleid="R0503002_3" modulename="商品详情"><p><img data-src="//image.suning.cn/uimg/sop/commodity/323128866134590684049660_x.jpg?from=mobile&amp;format=80q.webp" alt="" src="//image.suning.cn/uimg/sop/commodity/323128866134590684049660_x.jpg?from=mobile&format=80q.webp" width="100%" height="auto"></p></div><div moduleid="R0503002_6" modulename="安装说明"><table style="width: 100%; height: auto;"> <tbody> <tr> <td><a href="https://sale.suning.com/shfw/cdaz/index.html#suning" target="_blank"><img data-src="https://sale.suning.com/shfw/cdazpic/images/all.jpg?from=mobile&amp;format=80q.webp" alt="" src="https://sale.suning.com/shfw/cdazpic/images/all.jpg?from=mobile&format=80q.webp" width="100%" height="auto"></a></td> </tr> </tbody> </table></div></div>',
      //   模态框
      dialogVisible: false,
      dialogTitle: "",
    };
  },
  methods: {
    // 点击发布
    btnPublish(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid && this.startTime !== "" && this.endTime !== "") {
          (this.allDataList = {
            goodsType: this.rulesForm.goodsType,
            add_time: this.startTime,
            upd_time: this.endTime,
            cat_type: this.rulesForm.cat_type,
            hot_munber:
              this.rulesForm.hot_munber !== "" ? this.rulesForm.hot_munber : 0,
            goods_small_logo: this.rulesForm.goods_small_logo,
            goods_number: this.rulesForm.goods_number,
            goods_price: this.rulesForm.goods_price,
            goods_introduce: this.rulesForm.goods_introduce,
            pics_mid1:
              this.rulesForm.pics_mid1 !== ""
                ? this.rulesForm.pics_mid1
                : "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2538900509,1871187037&fm=26&gp=0.jpg",
            pics_mid2:
              this.rulesForm.pics_mid2 !== ""
                ? this.rulesForm.pics_mid2
                : "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2538900509,1871187037&fm=26&gp=0.jpg",
            pics_mid3:
              this.rulesForm.pics_mid3 !== ""
                ? this.rulesForm.pics_mid3
                : "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2538900509,1871187037&fm=26&gp=0.jpg",
            goods_name: this.rulesForm.goods_name,
          }),
            this.$confirm("此操作将发布商品信息, 是否继续?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            })
              .then(() => {
                this.$message({
                  type: "success",
                  message: "发布成功!",
                });
                this.getInsertData(this.allDataList);
              })
              .catch(() => {
                this.$message({
                  type: "info",
                  message: "已取消发布",
                });
              });
        } else {
          alert("请填写完带*号的内容");
          return false;
        }
      });
    },
    //获取时间
    changeDate(e) {
      this.startTime = moment(e[0]).format("YYYY-MM-DD h:mm:ss");
      this.endTime = moment(e[1]).format("YYYY-MM-DD h:mm:ss");
    },
    // 获取数据
    getInsertData(data) {
      insertGoodsDetail(data).then((res) => {
        console.log(res);
      });
    },
    // 模态框关闭按钮
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    // 模态框点击操作
    btnBialogVisible(data) {
      if (data === "introduce") {
        this.format =
          '<div class="lazyimg"><div moduleid="R0503002_2" modulename="关联推荐"><p><a href="https://shop.suning.com/30000011/index.html" target="_blank"><img data-src="https://image.suning.cn/uimg/sop/commodity/152418403963754690151350_x.jpg?from=mobile&amp;format=80q.webp" alt="" src="https://image.suning.cn/uimg/sop/commodity/152418403963754690151350_x.jpg?from=mobile&format=80q.webp" width="100%" height="auto"></a></p> <table style="width: 100%; height: auto;"> <tbody> <tr> <td><a href="https://product.suning.com/0000000000/721034170.html" target="_blank"><img data-src="https://image.suning.cn/uimg/sop/commodity/674265889569958711135500_x.jpg?from=mobile&amp;format=80q.webp" alt="" src="https://image.suning.cn/uimg/sop/commodity/674265889569958711135500_x.jpg?from=mobile&format=80q.webp" width="100%" height="auto"></a></td> <td><a href="https://product.suning.com/0030000011/659973806.html" target="_blank"><img data-src="https://image.suning.cn/uimg/sop/commodity/580804888269630832171600_x.jpg?from=mobile&amp;format=80q.webp" alt="" src="https://image.suning.cn/uimg/sop/commodity/580804888269630832171600_x.jpg?from=mobile&format=80q.webp" width="100%" height="auto"></a></td> <td><a href="https://product.suning.com/0000000000/646332415.html" target="_blank"><img data-src="https://image.suning.cn/uimg/sop/commodity/164947314370596747459900_x.jpg?from=mobile&amp;format=80q.webp" alt="" src="https://image.suning.cn/uimg/sop/commodity/164947314370596747459900_x.jpg?from=mobile&format=80q.webp" width="100%" height="auto"></a></td> </tr> <tr> <td><a href="https://product.suning.com/0030000011/719579209.html" target="_blank"><img data-src="https://image.suning.cn/uimg/sop/commodity/109859084335308009815860_x.jpg?from=mobile&amp;format=80q.webp" alt="" src="https://image.suning.cn/uimg/sop/commodity/109859084335308009815860_x.jpg?from=mobile&format=80q.webp" width="100%" height="auto"></a></td> <td><a href="https://product.suning.com/0000000000/154158097.html" target="_blank"><img data-src="https://image.suning.cn/uimg/sop/commodity/139086270826280834777770_x.jpg?from=mobile&amp;format=80q.webp" alt="" src="https://image.suning.cn/uimg/sop/commodity/139086270826280834777770_x.jpg?from=mobile&format=80q.webp" width="100%" height="auto"></a></td> <td><a href="https://product.suning.com/0000000000/683246685.html" target="_blank"><img data-src="https://image.suning.cn/uimg/sop/commodity/212695348731710262086520_x.jpg?from=mobile&amp;format=80q.webp" alt="" src="https://image.suning.cn/uimg/sop/commodity/212695348731710262086520_x.jpg?from=mobile&format=80q.webp" width="100%" height="auto"></a></td> </tr> </tbody> </table></div><div moduleid="R0503002_3" modulename="商品详情"><p><img data-src="//image.suning.cn/uimg/sop/commodity/323128866134590684049660_x.jpg?from=mobile&amp;format=80q.webp" alt="" src="//image.suning.cn/uimg/sop/commodity/323128866134590684049660_x.jpg?from=mobile&format=80q.webp" width="100%" height="auto"></p></div><div moduleid="R0503002_6" modulename="安装说明"><table style="width: 100%; height: auto;"> <tbody> <tr> <td><a href="https://sale.suning.com/shfw/cdaz/index.html#suning" target="_blank"><img data-src="https://sale.suning.com/shfw/cdazpic/images/all.jpg?from=mobile&amp;format=80q.webp" alt="" src="https://sale.suning.com/shfw/cdazpic/images/all.jpg?from=mobile&format=80q.webp" width="100%" height="auto"></a></td> </tr> </tbody> </table></div></div>';
        this.dialogTitle = "格式为文本-例子如下";
      } else {
        this.format =
          "https://img13.360buyimg.com/n1/s200x200_jfs/t29524/286/1623830899/611422/4b877c52/5ce5151cNfed4578c.jpg";
        this.dialogTitle = "格式为线上地址-例子如下";
      }
      this.dialogVisible = true;
    },
  },
};
</script>
<style lang='less' scoped>
.publish {
  padding: 20px;
  .box-card {
    .clearfix {
    }
    .pulish_title {
      color: #66b1ff;
      font-size: 24px;
      margin-bottom: 20px;
      .iconfont {
        font-size: 24px;
      }
    }
    .publishForm {
      display: flex;
      flex-wrap: wrap;
      .el-form-item {
        flex: 50%;
      }
    }
    .publish_btn {
      display: flex;
      justify-content: center;
    }
  }
}
//   模态框
.publish_introduce {
  width: 100%;
  box-shadow: 2px 2px 2px 2px slategrey;
}
.dialog-footer {
  display: flex;
  justify-content: center;
}
</style>