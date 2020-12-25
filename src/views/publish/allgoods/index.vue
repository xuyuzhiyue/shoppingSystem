<template>
  <div class="allgoodsPublish">
    <el-card class="box-card">
      <div slot="header" class="allgoodsPublishClearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right article_breadcrumb">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>商品类型发布</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="allgoodsPublishRow">
        <div class="allgoodsPublishRow_title">
          <i class="iconfont iconwodefabu"></i>
          添加商品内容(带*号的是必填选项)
        </div>
        <div class="allgoodsPublish_context">
          <el-form
            :model="allgoodsForm"
            :rules="rules"
            label-position="left"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="商品类型" prop="cat_name" style="width: 420px">
              <el-select
                v-model="allgoodsForm.cat_name"
                placeholder="请选择活动区域"
                style="width: 320px"
              >
                <el-option
                  :label="item"
                  :value="item"
                  v-for="(item, index) in cat_name"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="商品图片" prop="cat_icon" style="width: 420px">
              <el-input v-model="allgoodsForm.cat_icon"></el-input>
              <el-button
                type="text"
                style="margin-left: 20px"
                @click="dialogVisible = true"
                >查看格式要求</el-button
              >
            </el-form-item>
            <el-form-item
              label="商品数量"
              prop="cat_number"
              style="width: 420px"
            >
              <el-input v-model="allgoodsForm.cat_number"></el-input>
            </el-form-item>
            <el-form-item label="商品大类型" prop="cat_type">
              <el-select
                v-model="allgoodsForm.cat_type"
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
      <div class="allgoodsPublishBtn">
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
      <div class="publish_introduce">
        https://img13.360buyimg.com/n1/s200x200_jfs/t29524/286/1623830899/611422/4b877c52/5ce5151cNfed4578c.jpg
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { addAllgoodsType } from "@/api/user.js";
export default {
  name: "allgoodsPublishIndex",
  components: {},
  props: {},
  data() {
    return {
      allgoodsForm: {
        cat_name: "",
        cat_icon: "",
        cat_type: "",
        cat_number: "",
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
      cat_name: [
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
        cat_name: [
          { required: true, message: "请输入商品类型", trigger: "blur" },
        ],
        cat_type: [
          { required: true, message: "请输入商品大类型", trigger: "blur" },
        ],
        cat_icon: [
          { required: true, message: "请输入商品图片", trigger: "blur" },
          {
            min: 1,
            max: 255,
            message: "长度在 1 到 255 个字符",
            trigger: "blur",
          },
        ],
        cat_number: [
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
    };
  },
  methods: {
    btnPublish(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.allDataList = {
            cat_name: this.allgoodsForm.cat_name,
            cat_icon: this.allgoodsForm.cat_icon,
            cat_type: this.allgoodsForm.cat_type,
            cat_number: this.allgoodsForm.cat_number,
          };
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
              this.getAddAllgoodsType(this.allDataList);
              console.log(this.allDataList);
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
    getAddAllgoodsType(data) {
      addAllgoodsType(data).then((res) => {
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
  },
};
</script>
<style lang='less' scoped>
.allgoodsPublish {
  padding: 20px;
  .box-card {
    .allgoodsPublishClearfix {
    }
    .allgoodsPublishRow {
      .allgoodsPublishRow_title {
        color: #66b1ff;
        font-size: 24px;
        margin-bottom: 20px;
        .iconfont {
          font-size: 24px;
        }
      }
      .allgoodsPublish_context {
        /deep/.el-form-item__content {
          display: flex;
        }
      }
    }
    .allgoodsPublishBtn {
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