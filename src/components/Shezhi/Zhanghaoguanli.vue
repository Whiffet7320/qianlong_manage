<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">账号管理</div>
      <div class="tit2">
        <!-- <el-tabs v-model="activeName" @tab-click="tabsHandleClick">
          <el-tab-pane label="全部" name="1"></el-tab-pane>
          <el-tab-pane label="微信公众号" name="2"></el-tab-pane>
          <el-tab-pane label="微信小程序" name="3"></el-tab-pane>
        </el-tabs>-->
      </div>
    </div>
    <div class="nav2">
      <!-- <div class="myForm">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="用户搜索：">
            <div class="search">
              <el-input
                size="small"
                placeholder="请输入内容"
                v-model="formInline.search"
                class="input-with-select"
              >
              </el-input>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button size="small" icon="el-icon-search" type="primary" @click="onSubmit">搜索</el-button>
            <el-button size="small" @click="onReact">重置</el-button>
          </el-form-item>
        </el-form>
      </div>-->
      <div class="tit1">
        <el-button @click="toZhanghao" size="small" type="primary" icon="el-icon-plus">添加账号</el-button>
      </div>
      <div class="myTable">
        <vxe-table height="700" :loading="loading" :data="tableData">
          <vxe-table-column field="id" title="ID"></vxe-table-column>
          <vxe-table-column field="phone" title="用户名"></vxe-table-column>
          <vxe-table-column field="qx" title="权限"></vxe-table-column>
          <!-- <vxe-table-column field="user_info.shop_name" title="店铺名称"></vxe-table-column> -->
          <!-- <vxe-table-column field="user_info.shop_phone" title="店铺联系方式"></vxe-table-column> -->
          <vxe-table-column title="操作状态" width="150">
            <template slot-scope="scope">
              <div class="flex">
                <el-button size="small" @click="tabEdit(scope.row)" type="text">修改</el-button>
                <el-button size="small" @click="tabDel(scope.row)" type="text">删除</el-button>
              </div>
            </template>
          </vxe-table-column>
        </vxe-table>
        <el-pagination
          class="fenye"
          @size-change="this.handleSizeChange"
          @current-change="this.handleCurrentChange"
          :current-page="this.ZhanghaobiaoPage"
          :page-size="10"
          :page-sizes="[10, 15, 20, 30]"
          layout="total,sizes, prev, pager, next, jumper"
          :total="this.total"
        ></el-pagination>
      </div>
    </div>
    <!-- 添加/编辑账号 -->
    <el-dialog
      title="添加/编辑账号"
      :visible.sync="addDialogVisible"
      width="700px"
      :before-close="addHandleClose"
    >
      <div class="myAddForm">
        <el-form :model="addForm" ref="addForm" label-width="100px" class="demo-addForm">
          <el-row>
            <el-col :span="20">
              <el-form-item label="用户名：">
                <el-input :disabled='!isAdd' size="small" placeholder="请输入用户名" v-model="addForm.username"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="密码：">
                <el-input size="small" v-model="addForm.userpass"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="权限：">
                <el-tree
                  default-expand-all
                  :data="quanxianList"
                  ref="tree"
                  show-checkbox
                  node-key="id"
                  :props="defaultProps"
                ></el-tree>
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
    ...mapState(["ZhanghaobiaoPage", "ZhanghaobiaoPageSize"])
  },
  watch: {
    ZhanghaobiaoPage: function(page) {
      this.$store.commit("ZhanghaobiaoPage", page);
      this.getData();
    },
    ZhanghaobiaoPageSize: function(pageSize) {
      this.$store.commit("ZhanghaobiaoPageSize", pageSize);
      this.getData();
    }
  },
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "label"
      },
      id: "",
      loading: false,
      fuquanxuan: false,
      ziCheckList: [],
      isAdd: false,
      checkList: [],
      quanxianList: [],
      addForm: {
        username: "",
        userpass: ""
      },
      addDialogVisible: false,
      activeName: "1",
      formInline: {
        search: "",
        select: ""
      },
      options: [],
      tableData: [],
      total: 51,
      dialogVisible: false,
      mingxiFrom: {
        rad1: "1"
      },
      mingxiTableData: [],
      mingxiTotal: 0,
      mingxiUser_id: "",
      editDialogVisible: false,
      editForm: {
        level: "",
        pwd: "",
        uniqid: "",
        spread_uid: ""
      },
      editId: ""
    };
  },
  created() {
    Array.prototype.indexOf = function(val) {
      for (var i = 0; i < this.length; i++) {
        if (this[i] == val) {
          return i;
        }
      }
      return -1;
    };
    Array.prototype.remove = function(val) {
      var index = this.indexOf(val);
      if (index > -1) {
        this.splice(index, 1);
      }
    };
    this.getData();
    this.getQXdata();
  },
  methods: {
    async getQXdata() {
      const res = await this.$api.manage_limit();
      console.log(res);
      this.quanxianList = res.data;
      this.quanxianList = JSON.parse(
        JSON.stringify(this.quanxianList).replace(/name/g, "label")
      );
      this.quanxianList = JSON.parse(
        JSON.stringify(this.quanxianList).replace(/sub_menu/g, "children")
      );
    },
    async getData() {
      this.loading = true;
      const res = await this.$api.manage_list({
        limit: this.ZhanghaobiaoPageSize,
        page: this.ZhanghaobiaoPage
      });
      console.log(res.data);
      this.total = res.data.total;
      res.data.data.forEach(async ele => {
        ele.qx = "";
        const res2 = await this.$api.manage_limitview({
          ids: ele.user_limit
        });
        console.log(res2);
        var arr = [];
        res2.data.forEach(ele2 => {
          arr.push(ele2.name);
        });
        console.log(arr.toString());
        this.$set(ele, "qx", arr.toString());
      });
      setTimeout(() => {
        this.tableData = res.data.data;
        this.loading = false;
      }, 1000);
      console.log(this.tableData);
    },
    addHandleClose() {
      this.addDialogVisible = false;
    },
    toZhanghao() {
      for (const key in this.addForm) {
        this.addForm[key] = "";
      }
      this.$refs.tree.setCheckedKeys([]);
      this.isAdd = true;
      this.addDialogVisible = true;
    },
    async submitForm() {
      const res = await this.$api.updat_user_info({
        user_id: this.editId,
        ...this.editForm
      });
      console.log(res);
      if (res.code == 200) {
        this.$message({
          message: res.msg,
          type: "success"
        });
        this.getData();
        this.editDialogVisible = false;
      } else {
        this.$message.error(res.msg);
      }
    },
    // changeMingxiRadio() {
    //   this.getMingxiData();
    // },
    tabsHandleClick(tab, event) {
      console.log(tab, event);
    },
    toEdit(row) {
      this.editForm = {
        level: "",
        pwd: "",
        uniqid: "",
        spread_uid: ""
      };
      this.editId = row.user_id;
      this.editDialogVisible = true;
    },
    // async seeMingxi(row) {
    //   console.log(row);
    //   this.mingxiUser_id = row.id;
    //   this.getMingxiData();
    //   this.dialogVisible = true;
    // },
    toPingtuanjilu(row) {
      this.$router.push({
        name: "Pingtuanjilu",
        params: {
          userId: row.user_id
        }
      });
    },
    changeFu(e) {
      console.log(e);
    },
    changeZi(check, item) {
      console.log(check, item);
      let checkedCount = check.length;
      item.checkAll = checkedCount == item.sub_menu.length;
      if (item.sub_menu.length == 1) {
        item.isIndeterminate =
          checkedCount > 0 && checkedCount <= item.sub_menu.length;
      } else {
        item.isIndeterminate =
          checkedCount > 0 && checkedCount < item.sub_menu.length;
      }
      console.log(item.checkAll, item.isIndeterminate);
      this.$set(item, "isIndeterminate", item.isIndeterminate);
      this.$set(item, "checkAll", item.checkAll);
    },
    changeZiquanxian(check, item) {
      console.log(check, item);
    },
    changeFuquanxian(check, item) {
      console.log(check, item, "changeFuquanxian");
      var arr = [];
      item.sub_menu.forEach(ele => {
        arr.push(ele.id);
      });
      item.ziCheckList = check ? arr : [];
      this.$set(item, "isIndeterminate", false);
      this.$set(item, "checkAll", check);
    },
    async tabDel(row) {
      //  manage_del
      const res = await this.$api.manage_del(row.id)
      if (res) {
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.getData();
          this.addDialogVisible = false;
        } else {
          this.$message.error(res.msg);
          this.getData();
        }
    },
    async tabEdit(row) {
      this.id = row.id;
      this.isAdd = false;
      console.log(row);
      this.addForm.username = row.phone;
      this.addDialogVisible = true;
      const res = await this.$api.manage_viewId(row.id);
      console.log(res.data.menu);
      var arr = [];
      res.data.menu.forEach(ele => {
        if (ele.sub_menu) {
          ele.sub_menu.forEach(ele2 => {
            arr.push(ele2.id);
          });
        }
      });
      console.log(arr);
      console.log(this.$refs);
      this.$refs.tree.setCheckedKeys(arr);
      // res.data.menu.forEach(ele => {
      //   this.checkList.push(ele.id);
      //   // this.$set(this.quanxianList.ziCheckList)
      //   this.quanxianList.forEach(ele2 => {
      //     if (ele.id == ele2.id) {
      //       ele.sub_menu.forEach(sub => {
      //         console.log(sub);
      //         ele2.ziCheckList.push(sub.id);
      //       });
      //       this.$set(
      //         ele2,
      //         "checkAll",
      //         ele.sub_menu.length == ele2.sub_menu.length ? true : false
      //       );
      //       if (ele2.sub_menu.length == 1) {
      //         this.$set(
      //           ele2,
      //           "isIndeterminate",
      //           ele.sub_menu.length == ele2.sub_menu.length ? true : false
      //         );
      //       } else if (
      //         ele.sub_menu.length > 0 &&
      //         ele.sub_menu.length < ele2.sub_menu.length
      //       ) {
      //         this.$set(ele2, "isIndeterminate", true);
      //       } else {
      //         this.$set(ele2, "isIndeterminate", false);
      //       }
      //       console.log(
      //         ele.sub_menu.length,
      //         ele2.sub_menu.length,
      //         ele2.isIndeterminate
      //       );
      //     }
      //   });
      // });
    },
    async AddOnSubmit() {
      var arr = [];
      arr = [
        ...this.$refs.tree.getCheckedKeys(false),
        ...this.$refs.tree.getHalfCheckedKeys(true)
      ];
      console.log(arr.toString());
      if (this.isAdd) {
        // 添加
        const res = await this.$api.manage_add({
          ...this.addForm,
          limit: [...new Set(arr)].toString()
        });
        console.log(res);
        if (res) {
          this.$message({
            message: "添加成功",
            type: "success"
          });
          this.getData();
          this.addDialogVisible = false;
        } else {
          this.$message.error(res.msg);
          this.getData();
        }
      } else {
        const res = await this.$api.manage_update(
          {
            ...this.addForm,
            limit: [...new Set(arr)].toString()
          },
          this.id
        );
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
          this.getData();
        }
      }
    },
    onSubmit() {
      console.log(this.formInline);
      this.getData();
    },
    onReact() {
      this.formInline.search = "";
      this.formInline.select = "";
      this.getData();
    },
    handleClose() {
      this.dialogVisible = false;
    },
    editHandleClose() {
      this.editDialogVisible = false;
    },
    formatDate(date1) {
      var date = new Date(date1);
      var YY = date.getFullYear() + "-";
      var MM =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var DD = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var hh =
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
      var mm =
        (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
        ":";
      var ss =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return YY + MM + DD + " " + hh + mm + ss;
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.$store.commit("ZhanghaobiaoPageSize", val);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("ZhanghaobiaoPage", val);
    },
    zijinmingxiHandleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.$store.commit("zijinmingxiliebiaoPageSize", val);
    },
    zijinmingxiHandleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("zijinmingxiliebiaoPage", val);
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/ .el-tree-node__label {
  font-size: 12px;
}
/deep/ .el-checkbox {
  transform: translateY(-1px);
}
/deep/ .el-checkbox__label {
  font-size: 12px;
}
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
      vertical-align: text-top;
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
        display: flex;
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
.myForm {
  /deep/ .el-form-item__label {
    font-size: 12px;
  }
  /deep/ .el-form-item {
    margin-right: 30px;
    margin-bottom: 0;
    vertical-align: middle;
  }
}
.myTable {
  margin-top: 10px;
  .xiala {
    padding: 10px 20px;
    .item {
      font-size: 12px;
      display: flex;
      // align-items: center;
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
.editForm {
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
.myAddForm {
  /deep/ .el-select {
    width: 100%;
  }
  /deep/ .el-form-item__label {
    font-size: 12px;
    width: 130px !important;
  }
  /deep/ .el-form-item__content {
    margin-left: 130px !important;
  }
  /deep/ .el-radio__label {
    font-size: 12px;
  }
  /deep/ .el-button {
    width: 100%;
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
}
</style>