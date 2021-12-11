<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">关键词设置</div>
    </div>
    <div class="nav2">
      <!-- <div class="myForm">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-row>
            <el-col :span="20">
              <el-form-item label="类型：">
                <el-radio-group @change="changeRad" v-model="formInline.rad1" size="small">
                  <el-radio-button v-for="(item,i) in radioArr" :key="i" :label="i">{{item}}</el-radio-button>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>-->
      <div class="tit1">
        <el-button @click="addWenzhang" size="small" type="primary" icon="el-icon-plus">添加关键词</el-button>
      </div>
      <div class="myTable">
        <vxe-table :data="tableData">
          <vxe-table-column field="id" title="ID"></vxe-table-column>
          <vxe-table-column field="keyword" title="关键词"></vxe-table-column>
          <vxe-table-column title="操作状态" width="160">
            <template slot-scope="scope">
              <div class="flex">
                <el-button size="small" @click="tabEdit(scope.row)" type="text">编辑</el-button>
                <el-button size="small" @click="tabDel(scope.row)" type="text">删除</el-button>
              </div>
            </template>
          </vxe-table-column>
        </vxe-table>
        <el-pagination
          class="fenye"
          @size-change="this.handleSizeChange"
          @current-change="this.handleCurrentChange"
          :current-page="this.guanjianciPage"
          :page-size="10"
          :page-sizes="[10, 15, 20, 30]"
          layout="total,sizes, prev, pager, next, jumper"
          :total="this.total"
        ></el-pagination>
      </div>
    </div>
    <!-- 添加/编辑关键词 -->
    <el-dialog
      title="添加/编辑关键词"
      :visible.sync="addDialogVisible"
      width="400px"
      :before-close="addHandleClose"
    >
      <div class="myAddForm">
        <el-form :model="lhForm" ref="lhForm" label-width="60px" class="demo-addForm">
          <el-row>
            <el-col :span="20">
              <el-form-item label="设置关键词：">
                <el-input size="small" placeholder="请输入设置关键词" v-model="lhForm.keyword"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item>
                <el-button size="small" type="primary" @click="AddOnSubmit">提交</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["guanjianciPage", "guanjianciPageSize"])
  },
  watch: {
    guanjianciPage: function(page) {
      this.$store.commit("guanjianciPage", page);
      this.getData();
    },
    guanjianciPageSize: function(pageSize) {
      this.$store.commit("guanjianciPageSize", pageSize);
      this.getData();
    }
  },
  data() {
    return {
      addDialogVisible: false,
      editor: null,
      tableData: [],
      total: 0,
      lhDialogVisible: false,
      lhForm: {
        keyword: ""
      },
      imgFile: null,
      isAdd: false
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const res = await this.$api.search_itemkeyslist({
        limit: this.guanjianciPageSize,
        page: this.guanjianciPage
      });
      this.tableData = res.data;
      // this.total = res.data.total;
    },
    addHandleClose() {
      this.addDialogVisible = false;
    },
    async AddOnSubmit() {
      // 添加
      if (this.isAdd) {
        const res = await this.$api.search_itemkeys({
          id: 0,
          keyword: this.lhForm.keyword
        });
        console.log(res);
        if (res) {
          this.$message({
            message: '添加成功',
            type: "success"
          });
          this.isAdd = false;
          this.getData();
          this.addDialogVisible = false;
        } else {
          this.$message.error(res.msg);
        }
      } else {
        const res = await this.$api.search_itemkeys({
          id: this.id,
          keyword: this.lhForm.keyword
        });
        console.log(res);
        if (res) {
          this.$message({
            message: "修改成功",
            type: "success"
          });
          this.getData();
          this.addDialogVisible = false;
        } else {
          this.$message.error(res.msg);
        }
      }
    },
    async submitForm() {
      // 添加
      if (this.isAdd) {
        const res = await this.$api.article_add({
          ...this.lhForm
        });
        console.log(res);
        if (res) {
          this.$message({
            message: res.msg,
            type: "success"
          });
          this.getData();
          this.lhDialogVisible = false;
        } else {
          this.$message.error(res.msg);
        }
      } else {
        //  修改
        const res = await this.$api.article_edit({
          ...this.lhForm,
          id: this.id
        });
        console.log(res);
        if (res) {
          this.$message({
            message: res.msg,
            type: "success"
          });
          this.getData();
          this.lhDialogVisible = false;
        } else {
          this.$message.error(res.msg);
        }
      }
    },
    // 编辑
    tabEdit(row) {
      console.log(row.id)
      this.id = row.id;
      this.lhForm.keyword = row.keyword;
      this.addDialogVisible = true;
    },
    // 删除
    async tabDel(row) {
      const res = await this.$api.delSearch_itemkeys(row.id);
      if (res) {
        this.$message({
          message: '删除成功',
          type: "success"
        });
        this.getData();
        this.addDialogVisible = false;
      } else {
        this.$message.error(res.msg);
      }
    },
    addWenzhang() {
      this.lhForm = {
        keyword: ""
      };
      this.isAdd = true;
      this.addDialogVisible = true;
    },
    lhHandleClose() {
      this.lhDialogVisible = false;
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.$store.commit("guanjianciPageSize", val);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("guanjianciPage", val);
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
  .tit2 {
    margin-top: 10px;
    /deep/ .el-tabs--top .el-tabs__item.is-top:nth-child(2) {
      padding-left: 20px;
    }
    /deep/ .el-tabs__header {
      margin: 0 0 1px;
    }
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
    .search {
      /deep/ .el-select {
        width: 100px;
      }
    }
  }
  .tit1 {
    margin-top: 10px;
  }
  .myTable {
    margin-top: 10px;
    .xiala {
      padding: 10px 20px;
      .item {
        font-size: 12px;
      }
    }
    .flex {
      display: flex;
      align-items: center;
    }
    .fenye {
      margin-top: 10px;
    }
    /deep/ .vxe-table--render-default .vxe-body--column {
      line-height: 14px;
      vertical-align: middle;
    }
    /deep/ .vxe-cell--label {
      font-size: 12px;
    }
    /deep/ .vxe-cell--title {
      font-size: 12px;
    }
    /deep/ .image-slot {
      width: 38px;
      height: 38px;
      border: 1px solid #ddd;
      line-height: 38px;
      text-align: center;
      border-radius: 4px;
    }
  }
}
.lhmyForm {
  /deep/ .el-form-item__label {
    font-size: 12px;
  }
  /deep/ .el-form-item {
    margin-right: 30px;
    margin-bottom: 20px;
  }
  .search {
    margin-top: 3px;
    /deep/ .el-select {
      width: 100px;
    }
  }
}
.myImg {
  position: relative;
  width: 60px;
  height: 60px;
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
    width: 58px;
    height: 58px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    .el-icon-picture-outline {
      font-size: 20px;
    }
  }
}
// 详情
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
.myAddForm {
  /deep/ .el-select {
    width: 100%;
  }
  /deep/ .el-form-item__label {
    font-size: 12px;
    width: 100px !important;
  }
  /deep/ .el-form-item__content {
    margin-left: 100px !important;
  }
  /deep/ .el-radio__label {
    font-size: 12px;
  }
  /deep/ .el-button {
    width: 100%;
  }
}
</style>