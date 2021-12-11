<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">供应商管理</div>
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
                <el-select
                  class="left-select"
                  v-model="formInline.select"
                  slot="prepend"
                  placeholder="请选择"
                >
                  <el-option label="全部" value="1"></el-option>
                  <el-option label="UID" value="2"></el-option>
                  <el-option label="手机号" value="3"></el-option>
                  <el-option label="用户名称" value="4"></el-option>
                </el-select>
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
        <el-button @click="toAddShop" size="small" type="primary" icon="el-icon-plus">添加供应商</el-button>
      </div>
      <div class="myTable">
        <vxe-table :data="tableData">
          <vxe-table-column field="id" title="ID"></vxe-table-column>
          <vxe-table-column field="name" title="供应商名称"></vxe-table-column>
          <vxe-table-column field="realname" title="供应商联系人姓名"></vxe-table-column>
          <vxe-table-column field="mobile" title="供应商联系电话"></vxe-table-column>
          <vxe-table-column title="操作状态" width="150">
            <template slot-scope="scope">
              <div class="flex">
                <el-button size="small" type="text" @click="tabEdit(scope.row)">编辑</el-button>
                <el-button size="small" type="text" @click="delEdit(scope.row)">删除</el-button>
                <el-button size="small" type="text" @click="see(scope.row)">oe码列表</el-button>
              </div>
            </template>
          </vxe-table-column>
        </vxe-table>
        <el-pagination
          class="fenye"
          @size-change="this.handleSizeChange"
          @current-change="this.handleCurrentChange"
          :current-page="this.gongyingshangPage"
          :page-size="10"
          :page-sizes="[10, 15, 20, 30]"
          layout="total,sizes, prev, pager, next, jumper"
          :total="this.total"
        ></el-pagination>
      </div>
    </div>
    <!-- 查看明细 -->
    <el-dialog title="查看明细" :visible.sync="dialogVisible" width="80%" :before-close="handleClose">
      <div class="myForm">
        <div class="tit1">
          <el-button @click="toAddoe" size="small" type="primary" icon="el-icon-plus">添加供应商所属oe码</el-button>
        </div>
      </div>
      <div class="myTable">
        <vxe-table :data="oeTableData">
          <vxe-table-column field="id" width="120" title="ID"></vxe-table-column>
          <vxe-table-column field="name" title="oe码"></vxe-table-column>
          <vxe-table-column title="操作状态" width="120">
            <template slot-scope="scope">
              <div class="flex">
                <el-button size="small" type="text" @click="taboeEdit(scope.row)">编辑</el-button>
                <el-button size="small" type="text" @click="deloeEdit(scope.row)">删除</el-button>
              </div>
            </template>
          </vxe-table-column>
        </vxe-table>
        <el-pagination
          class="fenye"
          @size-change="this.zijinmingxiHandleSizeChange"
          @current-change="this.zijinmingxiHandleCurrentChange"
          :current-page="this.zijinmingxiliebiaoPage"
          :page-size="10"
          :page-sizes="[10, 15, 20, 30]"
          layout="total,sizes, prev, pager, next, jumper"
          :total="this.mingxiTotal"
        ></el-pagination>
      </div>
    </el-dialog>
    <!-- 编辑 -->
    <el-dialog
      title="编辑"
      :visible.sync="addDialogVisible"
      width="700px"
      :before-close="addHandleClose"
    >
      <div class="myAddForm">
        <el-form :model="addForm" ref="addForm" label-width="160px" class="demo-addForm">
          <el-row>
            <el-col :span="20">
              <el-form-item label="供应商名称">
                <el-input size="small" v-model="addForm.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="供应商联系人姓名">
                <el-input size="small" v-model="addForm.realname"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="供应商联系电话">
                <el-input size="small" v-model="addForm.mobile"></el-input>
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
    <!-- 编辑 -->
    <el-dialog
      title="编辑"
      :visible.sync="addoeDialogVisible"
      width="700px"
      :before-close="addoeHandleClose"
    >
      <div class="myAddForm">
        <el-form :model="addoeForm" ref="addoeForm" label-width="160px" class="demo-addForm">
          <el-row>
            <el-col :span="20">
              <el-form-item label="oe码">
                <el-input size="small" v-model="addoeForm.oe"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item>
                <el-button size="small" type="primary" @click="AddoeOnSubmit">提交</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-dialog>
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
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState([
      "gongyingshangPage",
      "gongyingshangPageSize",
      "zijinmingxiliebiaoPage",
      "zijinmingxiliebiaoPageSize"
    ])
  },
  watch: {
    gongyingshangPage: function(page) {
      this.$store.commit("gongyingshangPage", page);
      this.getData();
    },
    gongyingshangPageSize: function(pageSize) {
      this.$store.commit("gongyingshangPageSize", pageSize);
      this.getData();
    },
    zijinmingxiliebiaoPage: function(page) {
      this.$store.commit("zijinmingxiliebiaoPage", page);
      this.getData();
    },
    zijinmingxiliebiaoPageSize: function(pageSize) {
      this.$store.commit("zijinmingxiliebiaoPageSize", pageSize);
      this.getData();
    }
  },
  data() {
    return {
      isoeAdd: false,
      oeTotal: "",
      oeTableData: [],
      addoeForm: {
        oe: ""
      },
      addoeDialogVisible: false,
      isAdd: false,
      addDialogVisible: false,
      addForm: {
        name: "",
        realname: "",
        mobile: ""
      },
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
      editId: "",
      oeId: ""
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const res = await this.$api.supplier({
        limit: this.gongyingshangPageSize,
        page: this.gongyingshangPage
      });
      console.log(res.data);
      this.total = res.data.total;
      this.tableData = res.data.data;
      // this.tableData.forEach(ele => {
      //   if (ele.user_info) {
      //     ele.myType =
      //       ele.user_info.type == 0
      //         ? "企业"
      //         : ele.user_info.type == 1
      //         ? "个体工商户"
      //         : "小微";
      //     ele.myUser_infoStatus = ele.user_info.status == 0 ? '审核中' : ele.user_info.status == 1 ? '审核通过' : '审核未通过';
      //   }
      // });
      // console.log(this.tableData);
    },
    toAddoe() {
      this.isoeAdd = true;
      this.addoeForm.oe = '';
      this.addoeDialogVisible = true;
    },
    toAddShop() {
      this.isAdd = true;
      this.addForm.name = "";
      this.addForm.realname = "";
      this.addForm.mobile = "";
      this.addDialogVisible = true;
    },
    addHandleClose() {
      this.addDialogVisible = false;
    },
    addoeHandleClose() {
      this.addoeDialogVisible = false;
    },
    async deloeEdit(row){
      console.log(this.id)
      const res = await this.$api.deleteSupplierIdOelist({oe_id:row.id},this.id);
      if (res) {
          this.$message({
            message: res.message,
            type: "success"
          });
          this.getoeData();
          this.addoeDialogVisible = false;
        } else {
          this.$message.error(res.message);
        }
    },
    taboeEdit(row) {
      this.oeId = row.id;
      this.isoeAdd = false;
      this.addoeForm.oe = row.name;
      this.addoeDialogVisible = true;
    },
    async getoeData() {
      const res = await this.$api.supplierIdOelist(
        {
          page: this.zijinmingxiliebiaoPage,
          limit: this.zijinmingxiliebiaoPageSize
        },
        this.id
      );
      console.log(res);
      this.oeTableData = res.data.data;
      this.oeTotal = res.data.total;
    },
    async AddOnSubmit() {
      console.log(this.addForm);
      if (this.isAdd) {
        const res = await this.$api.addSupplier({
          ...this.addForm
        });
        console.log(res);
        if (res) {
          this.$message({
            message: res.message,
            type: "success"
          });
          this.getData();
          this.addDialogVisible = false;
        } else {
          this.$message.error(res.message);
        }
      } else {
        const res = await this.$api.upDateSupplier(
          {
            ...this.addForm
          },
          this.id
        );
        console.log(res);
        if (res) {
          this.$message({
            message: res.message,
            type: "success"
          });
          this.getData();
          this.addDialogVisible = false;
        } else {
          this.$message.error(res.message);
        }
      }
    },
    async AddoeOnSubmit() {
      if (this.isoeAdd) {
        const res = await this.$api.addSupplierIdOelist(
          {
            ...this.addoeForm,
          },
          this.id
        );
        if (res) {
          this.$message({
            message: res.message,
            type: "success"
          });
          this.getoeData();
          this.addoeDialogVisible = false;
        } else {
          this.$message.error(res.message);
        }
      } else {
        const res = await this.$api.upDateSupplierIdOelist(
          {
            ...this.addoeForm,
            oe_id:this.oeId
          },
          this.id
        );
        if (res) {
          this.$message({
            message: res.message,
            type: "success"
          });
          this.getoeData();
          this.addoeDialogVisible = false;
        } else {
          this.$message.error(res.message);
        }
      }
    },
    // 删除图片
    delImg(val) {
      if (val == "tb") {
        this.$set(this.addForm, "pic", "");
      } else if (this.imgStatus == "dt") {
        this.$set(this.addForm, "big_pic", "");
      }
    },
    // 上传图片
    companyList(val) {
      this.imgStatus = val;
      this.$refs.fileInputList.click();
    },
    async companyLogo(event) {
      const that = this;
      var file = event.target.files[0];
      var fileSize = file.size; //文件大小
      var filetType = file.type; //文件类型
      //创建文件读取对象
      // console.log(file);
      if (fileSize <= 10240 * 1024) {
        if (
          filetType == "image/png" ||
          filetType == "image/jpeg" ||
          filetType == "image/gif"
        ) {
          this.imgFile = new FormData();
          this.imgFile.append("image[]", file);
          sessionStorage.setItem("img", 123);
          const res = await that.$api.productUpload(this.imgFile);
          console.log(res.data[0]);
          if (this.imgStatus == "tb") {
            this.$set(this.addForm, "pic", res.data[0]);
          } else if (this.imgStatus == "dt") {
            this.$set(this.addForm, "big_pic", res.data[0]);
          }
          that.$refs.fileInputList.value = "";
        } else {
          this.$message.error("图片格式不正确");
        }
      } else {
        this.$message.error("图片大小不正确");
      }
    },
    async delEdit(row) {
      const res = await this.$api.deleteSupplier(row.id);
      if (res) {
        this.$message({
          message: res.message,
          type: "success"
        });
        this.getData();
        this.addDialogVisible = false;
      } else {
        this.$message.error(res.message);
      }
    },
    tabEdit(row) {
      console.log(row);
      this.id = row.id;
      this.isAdd = false;
      this.addForm = { ...row };
      this.addDialogVisible = true;
    },
    async see(row) {
      console.log(row);
      this.id = row.id;
      this.$store.commit("zijinmingxiliebiaoPage", 1);
      this.getoeData();
      this.dialogVisible = true;
    },
    async getMingxiData() {
      const res = await this.$api.usersIdMoneyRecords({
        id: this.mingxiUser_id,
        page: this.zijinmingxiliebiaoPage,
        limit: this.zijinmingxiliebiaoPageSize
      });
      console.log(res.data);
      this.mingxiTableData = res.data.data;
      this.mingxiTableData.forEach(ele => {
        ele.myPm = ele.is_in == "1" ? "获得" : "支出";
      });
      this.mingxiTotal = res.data.total;
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
    changeMingxiRadio() {
      this.getMingxiData();
    },
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
    async seeMingxi(row) {
      console.log(row);
      this.mingxiUser_id = row.id;
      this.getMingxiData();
      this.dialogVisible = true;
    },
    toPingtuanjilu(row) {
      this.$router.push({
        name: "Pingtuanjilu",
        params: {
          userId: row.user_id
        }
      });
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
      this.$store.commit("gongyingshangPageSize", val);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("gongyingshangPage", val);
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
      margin-top: 5px;
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
.displayN {
  display: none;
}
</style>