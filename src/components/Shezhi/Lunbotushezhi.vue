<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">积分规则设置</div>
    </div>
    <div class="nav2">
      <div class="myForm">
        <el-row>
          <el-col :span="22">
            <div class="myEditor">
              <div class="txt">积分规则：</div>
              <div id="editor"></div>
            </div>
          </el-col>
        </el-row>
        <div class="btnflex">
          <!-- <el-button size="small" type="primary" @click="submitForm('ruleForm', '3')">下一步</el-button> -->
          <el-button size="small" type="primary" @click="onSubmitForm('ruleForm')">保存</el-button>
        </div>
      </div>
    </div>
    <input
      type="file"
      name="companyLogo"
      id="file0"
      class="displayN"
      multiple="multiple"
      @change="companyLogo($event)"
      ref="fileInputList"
    />
  </div>
</template>

<script>
import E from "wangeditor";
export default {
  data() {
    return {
      editor: null,
      imgFile: "",
      ruleForm: {
        img: "",
        other_url: ""
      },
      content: ""
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const res = await this.$api.getScoreRule();
      console.log(res);
      this.content = res.data.content;
      if (this.content) {
        this.editor.txt.html(this.content);
      }
    },
    async onSubmitForm() {
      this.content = document.getElementsByClassName("w-e-text")[0].innerHTML;
      const res = await this.$api.scoreRule({
        content:this.content
      });
      console.log(res.data);
      if (res.data.status == 0) {
        this.$message({
          message: res.data.message,
          type: "success"
        });
        this.getData();
      }
    },
    readFileAsBuffer(file) {
      const reader = new FileReader();
      return new Promise(resolve => {
        reader.readAsDataURL(file);
        reader.onload = function() {
          const base64File = reader.result.replace(
            /^data:\w+\/\w+;base64,/,
            ""
          );
          resolve(new window.OSS.Buffer(base64File, "base64"));
        };
      });
    }
  },
  async mounted() {
    this.editor = new E("#editor");
    this.editor.config.menus = [
      "head",
      "bold",
      "fontSize",
      "fontName",
      "italic",
      "underline",
      "strikeThrough",
      "indent",
      "lineHeight",
      "foreColor",
      "backColor",
      "list",
      "justify",
      "emoticon",
      "image",
      "table",
      "undo",
      "redo"
    ];
    this.editor.config.uploadImgServer = "/upload-img";
    // this.editor.config.uploadImgShowBase64 = true; // 使用 base64 保存图片
    const res = await this.$api.uploadToken();
    let myData = res.data;
    let client = new window.OSS.Wrapper({
      region: myData.region, //oss地址
      accessKeyId: myData.accessKeyId, //ak
      accessKeySecret: myData.accessKeySecret, //secret
      stsToken: myData.stsToken,
      bucket: myData.bucket //oss名字
    });
    this.editor.config.customUploadImg = async (resultFiles, insertImgFn) => {
      var file_re = await this.readFileAsBuffer(resultFiles[0]);
      client
        .put("myImg", file_re)
        .then(function(res) {
          // 上传图片，返回结果，将图片插入到编辑器中
          console.log(res);
          insertImgFn(res.url);
        })
        .catch(function(err) {
          console.log(err);
        });
    };
    this.editor.create();
    if (this.content) {
      this.editor.txt.html(this.content);
    }
  }
};
</script>

<style lang="scss" scoped>
.index {
}
.nav1 {
  margin: 0 -18px;
  background-color: #fff;
  padding: 20px 32px 0 40px;
  .tit1 {
    color: #17233d;
    font-weight: 500;
    font-size: 20px;
    padding-bottom: 20px;
  }
}
.nav2 {
  margin: 18px 0;
  background: #fff;
  border-radius: 6px;
  padding: 24px;
  .myForm {
    /deep/ .el-form-item__label {
      font-size: 12px;
    }
    /deep/ .el-form-item {
      margin-right: 30px;
      margin-bottom: 0;
    }
  }
  .myImg {
    position: relative;
    width: 200px;
    height: 200px;
    display: inline-block;
    margin-right: 12px;
    .closeBtn {
      position: absolute;
      top: -6px;
      right: -4px;
      width: 20px;
      height: 20px;
      .el-button {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    /deep/ .image-slot {
      border: 1px solid #ddd;
      border-radius: 4px;
      background-color: #fafafa;
      width: 198px;
      height: 198px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      .el-icon-picture-outline {
        font-size: 20px;
      }
    }
  }
}
.displayN {
  display: none;
}
// 商品详情
.myEditor {
  padding-top: 20px;
  display: flex;
  .txt {
    color: #606266;
    width: 90px;
    font-size: 12px;
    margin-right: 12px;
    margin-top: 2px;
    text-align: right;
  }
  #editor {
    transform: translateY(-6px);
  }
}
.btnflex {
  margin-top: 20px;
  margin-left: 101px;
}
</style>