<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">用户审核管理</div>
      <div class="tit2">
        <!-- <el-tabs v-model="activeName" @tab-click="tabsHandleClick">
          <el-tab-pane label="全部" name="1"></el-tab-pane>
          <el-tab-pane label="微信公众号" name="2"></el-tab-pane>
          <el-tab-pane label="微信小程序" name="3"></el-tab-pane>
        </el-tabs>-->
      </div>
    </div>
    <div class="nav2">
      <div class="myForm">
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
      </div>
      <div class="tit1">
        <!-- <el-button
          @click="toAddShop"
          size="small"
          type="primary"
          icon="el-icon-plus"
          >添加商品</el-button
        >-->
      </div>
      <div class="myTable">
        <vxe-table :data="tableData">
          <vxe-table-column type="expand" width="30" :fixed="null">
            <template #content="{ row }">
              <template>
                <div class="xiala">
                  <el-row :gutter="20">
                    <el-col :span="6">
                      <div class="item">
                        店铺图：
                        <el-image
                          v-if="row.shop_img"
                          :src="row.shop_img"
                          fit="fill"
                          style="width: 80px; height: 80px"
                        >
                          <div slot="error" class="image-slot">
                            <i class="el-icon-picture-outline"></i>
                          </div>
                        </el-image>
                      </div>
                    </el-col>
                  </el-row>
                  <div style="margin-top: 16px"></div>
                  <el-row :gutter="20">
                    <el-col :span="6">
                      <div class="item">店铺名称：{{row?row.shop_name:''}}</div>
                    </el-col>
                    <el-col :span="6">
                      <div class="item">店铺联系方式：{{row? row.shop_phone:'' }}</div>
                    </el-col>
                    <el-col :span="10">
                      <div class="item" v-if="row">地址：{{ row.area }} {{row.detail_address}}</div>
                    </el-col>
                  </el-row>
                </div>
              </template>
            </template>
          </vxe-table-column>
          <vxe-table-column field="id" title="ID"></vxe-table-column>
          <vxe-table-column field="avatar" title="企业图标/头像">
            <template slot-scope="scope">
              <el-image
                v-if="scope.row"
                :src="scope.row.avatar"
                fit="fill"
                style="width: 40px; height: 40px"
              >
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </template>
          </vxe-table-column>
          <vxe-table-column field="avatar" title="企业营业执照">
            <template slot-scope="scope">
              <el-image
                v-if="scope.row"
                :src="scope.row.business_license"
                fit="fill"
                style="width: 40px; height: 40px"
              >
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </template>
          </vxe-table-column>
          <vxe-table-column field="nick_name" title="企业名称"></vxe-table-column>
          <vxe-table-column field="myType" title="类型"></vxe-table-column>
          <vxe-table-column field="myUser_infoStatus" title="审核状态"></vxe-table-column>
          <!-- <vxe-table-column field="user_info.shop_name" title="店铺名称"></vxe-table-column> -->
          <!-- <vxe-table-column field="user_info.shop_phone" title="店铺联系方式"></vxe-table-column> -->
          <vxe-table-column title="操作状态" width="150">
            <template slot-scope="scope">
              <div class="flex">
                <el-button size="small" @click="tongguo(scope.row)" type="text">通过</el-button>
                <el-button size="small" @click="jujue(scope.row)" type="text">拒绝</el-button>
                <el-button size="small" @click="quxiao(scope.row)" type="text">取消</el-button>
              </div>
            </template>
          </vxe-table-column>
        </vxe-table>
        <el-pagination
          class="fenye"
          @size-change="this.handleSizeChange"
          @current-change="this.handleCurrentChange"
          :current-page="this.yonghushenhePage"
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
        <el-form ref="mingxiFrom" :model="mingxiFrom" label-width="80px">
          <el-row>
            <el-col :span="20">
              <el-form-item label="状态：">
                <el-radio-group @change="changeMingxiRadio" v-model="mingxiFrom.rad1" size="small">
                  <el-radio-button label="1">资金余额明细</el-radio-button>
                  <el-radio-button label="2">积分明细</el-radio-button>
                  <!-- <el-radio-button label="3">收益明细</el-radio-button> -->
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="myTable">
        <vxe-table :data="mingxiTableData">
          <vxe-table-column field="user_id" title="ID"></vxe-table-column>
          <vxe-table-column field="myPm" title="支出/获得"></vxe-table-column>
          <vxe-table-column field="value" title="变动金额"></vxe-table-column>
          <vxe-table-column field="after_money" title="变动后金额"></vxe-table-column>
          <!-- <vxe-table-column field="mark" width="250" title="备注"></vxe-table-column> -->
          <!-- <vxe-table-column field="pay_way" width="120" title="支付方式"></vxe-table-column> -->
          <vxe-table-column field="created_at" title="时间"></vxe-table-column>
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
      :visible.sync="editDialogVisible"
      width="30%"
      :before-close="editHandleClose"
    >
      <div class="editForm">
        <el-form :model="editForm" ref="editForm" label-width="140px" class="demo-ruleForm">
          <el-form-item label="用户等级：">
            <el-input size="small" v-model="editForm.level"></el-input>
          </el-form-item>
          <el-form-item label="用户密码：">
            <el-input size="small" v-model="editForm.pwd"></el-input>
          </el-form-item>
          <el-form-item label="用户自身的邀请码：">
            <el-input size="small" v-model="editForm.uniqid"></el-input>
          </el-form-item>
          <el-form-item label="邀请人ID：">
            <el-input size="small" v-model="editForm.spread_uid"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" @click="submitForm">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState([
      "yonghushenhePage",
      "yonghushenhePageSize",
      "zijinmingxiliebiaoPage",
      "zijinmingxiliebiaoPageSize"
    ])
  },
  watch: {
    yonghushenhePage: function(page) {
      this.$store.commit("yonghushenhePage", page);
      this.getData();
    },
    yonghushenhePageSize: function(pageSize) {
      this.$store.commit("yonghushenhePageSize", pageSize);
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
    this.getData();
  },
  methods: {
    async getData() {
      const res = await this.$api.userexamineList({
        limit: this.yonghushenhePageSize,
        page: this.yonghushenhePage,
        keyword:this.formInline.search
      });
      console.log(res.data);
      this.total = res.data.total;
      this.tableData = res.data.data;
      this.tableData.forEach(ele => {
        if (ele) {
          ele.myType =
            ele.type == 0 ? "企业" : ele.type == 1 ? "个体工商户" : "小微";
          ele.myUser_infoStatus =
            ele.status == 0
              ? "审核中"
              : ele.status == 1
              ? "审核通过"
              : "审核未通过";
        }
      });
      console.log(this.tableData);
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
    async tongguo(row) {
      const res = await this.$api.userexamine(
        {
          status: 1
        },
        row.id
      );
      if (res) {
        this.$message({
          message: "已通过审核",
          type: "success"
        });
        this.getData();
      } else {
        this.$message.error(res.message);
        this.getData();
      }
    },
    async jujue(row) {
      const res = await this.$api.userexamine(
        {
          status: 2
        },
        row.id
      );
      if (res) {
        this.$message({
          message: "已拒绝审核",
          type: "success"
        });
        this.getData();
      } else {
        this.$message.error(res.message);
        this.getData();
      }
    },
    async quxiao(row) {
      const res = await this.$api.delUserexamine(row.id);
      if (res) {
        this.$message({
          message: "已取消",
          type: "success"
        });
        this.getData();
      } else {
        this.$message.error(res.message);
        this.getData();
      }
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
      this.$store.commit("yonghushenhePageSize", val);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("yonghushenhePage", val);
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
</style>