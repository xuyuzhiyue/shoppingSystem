<template>
  <div class="comprehensivePublish">
    <el-card class="box-card">
      <div slot="header" class="comprehensivePublishClearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right article_breadcrumb">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>综合商品发布</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="comprehensivePublishRow">
        <div class="comprehensivePublishRow_title">
          <i class="iconfont iconwodefabu"></i>
          添加商品内容(带*号的是必填选项)
        </div>
        <div class="comprehensivePublish_context">
          <el-form
            :model="comprehensiveForm"
            :rules="rules"
            label-position="left"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="商品id" prop="goods_id">
              <el-input
                v-model="comprehensiveForm.goods_id"
                style="width: 320px"
              ></el-input>
            </el-form-item>
            <el-form-item label="商品名称" prop="goods_name">
              <el-input
                v-model="comprehensiveForm.goods_name"
                style="width: 320px"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="商品类型"
              prop="goodsType"
              style="width: 420px"
            >
              <el-select
                v-model="comprehensiveForm.goodsType"
                placeholder="请选择活动区域"
                style="width: 320px"
              >
                <el-option
                  :label="item"
                  :value="item"
                  v-for="(item, index) in goodsType"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="商品视频"
              prop="image_src"
              style="width: 420px"
            >
              <el-input v-model="comprehensiveForm.image_src"></el-input>
              <el-button
                type="text"
                style="margin-left: 20px"
                @click="btnDialogVisible('image_src')"
                >查看格式要求</el-button
              >
            </el-form-item>
            <el-form-item
              label="商品图片"
              prop="goods_small_logo"
              style="width: 420px"
            >
              <el-input v-model="comprehensiveForm.goods_small_logo"></el-input>
              <el-button
                type="text"
                style="margin-left: 20px"
                @click="btnDialogVisible('goods_small_logo')"
                >查看格式要求</el-button
              >
            </el-form-item>
            <el-form-item
              label="商品价格"
              prop="goods_price"
              style="width: 420px"
            >
              <el-input v-model="comprehensiveForm.goods_price"></el-input>
            </el-form-item>
            <el-form-item
              label="热销数量"
              prop="hot_number"
              style="width: 420px"
            >
              <el-input
                style="width: 340px"
                v-model="comprehensiveForm.hot_number"
              ></el-input>
            </el-form-item>
            <el-form-item label="商品大类型" prop="cat_type">
              <el-select
                v-model="comprehensiveForm.cat_type"
                placeholder="请选择活动区域"
                style="width: 320px"
              >
                <el-option
                  :label="item"
                  :value="item"
                  v-for="(item, index) in cat_type"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="comprehensivePublishBtn">
        <el-button type="primary" @click="btnPublish('ruleForm')"
          >点击发布</el-button
        >
      </div>
    </el-card>

    <!-- 模态框 -->
    <el-dialog
      title="格式为线上地址-例子如下"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      :append-to-body="true"
    >
      <div class="publish_introduce" v-html="publish_introduce">
          {{publish_introduce}}
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { addComprehensive } from "@/api/user.js";
export default {
  name: "comprehensivePublishIndex",
  components: {},
  props: {},
  data() {
    return {
      comprehensiveForm: {
        goodsType: "",
        image_src: "",
        cat_type: "",
        hot_number: "",
        goods_name: "",
        goods_id: "",
        goods_price: "",
        goods_small_logo: "",
      },
      cat_type: [
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
      goodsType: [
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
        goods_id: [
          { required: true, message: "请输入商品数量", trigger: "blur" },
          {
            pattern: /(^[1-9]\d*$)/,
            min: 1,
            max: 255,
            message: "正整数 长度在 1 到 255 ",
            trigger: "blur",
          },
        ],
        goodsType: [
          { required: true, message: "请输入商品类型", trigger: "blur" },
        ],
        cat_type: [
          { required: true, message: "请输入商品大类型", trigger: "blur" },
        ],
        image_src: [
          { required: true, message: "请输入商品图片", trigger: "blur" },
          {
            min: 1,
            max: 255,
            message: "长度在 1 到 255 个字符",
            trigger: "blur",
          },
        ],
        goods_small_logo: [
          { required: true, message: "请输入商品视频", trigger: "blur" },
          {
            min: 1,
            max: 255,
            message: "长度在 1 到 255 个字符",
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
        hot_number: [
          { required: true, message: "请输入商品数量", trigger: "blur" },
          {
            pattern: /^(0|\+?[1-9][0-9]*)$/,
            min: 1,
            max: 255,
            message: "0 或 正整数 长度在 1 到 255 ",
            trigger: "blur",
          },
        ],
      },
      //   传入的接口
      allDataList: {},
      //   模态框
      dialogVisible: false,
      publish_introduce:""
    };
  },
  methods: {
    btnPublish(formName) {
      const that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.allDataList = {
            goodsType: this.comprehensiveForm.goodsType,
            image_src: this.comprehensiveForm.image_src,
            cat_type: this.comprehensiveForm.cat_type,
            hot_number: this.comprehensiveForm.cat_number,
            goods_name: this.comprehensiveForm.goods_name,
            goods_id: this.comprehensiveForm.goods_id,
            goods_price: this.comprehensiveForm.goods_price,
            goods_small_logo: this.comprehensiveForm.goods_small_logo,
          };
          this.$confirm("此操作将发布商品信息, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              this.getaddComprehensive(this.allDataList);
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
    //   获取添加接口
    getaddComprehensive(data) {
      addComprehensive(data).then((res) => {
        this.$message({
          type: res.data.message === "添加失败" ? "warning" : "success",
          message:
            res.data.message === "添加失败"
              ? "该商品id已有，请重新输入"
              : "发布成功!",
        });
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
    // 点击模态框弹出
    btnDialogVisible(data){
        if(data === "goods_small_logo"){
            this.publish_introduce = "https://img13.360buyimg.com/n1/s200x200_jfs/t29524/286/1623830899/611422/4b877c52/5ce5151cNfed4578c.jpg"
            this.dialogVisible = true
        }else{
            this.publish_introduce = "https://vod.300hu.com/4c1f7a6atransbjngwcloud1oss/0087ef41212299394757234689/v.f30.mp4?dockingId=0c09db95-630a-45ab-b034-62e79de258031"
            this.dialogVisible = true
        }
    }
  },
};
</script>
<style lang='less' scoped>
.comprehensivePublish {
  padding: 20px;
  .box-card {
    width: 100%;
    .comprehensivePublishClearfix {
    }
    .comprehensivePublishRow {
      .comprehensivePublishRow_title {
        color: #66b1ff;
        font-size: 24px;
        margin-bottom: 20px;
        .iconfont {
          font-size: 24px;
        }
      }
      .comprehensivePublish_context {
        .demo-ruleForm {
          display: flex;
          flex-wrap: wrap;
          /deep/.el-form-item {
            flex: 50%;
          }
        }
        /deep/.el-form-item__content {
          display: flex;
        }
      }
    }
    .comprehensivePublishBtn {
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
</style>