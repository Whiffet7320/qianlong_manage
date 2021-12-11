<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">订单管理</div>
      <div class="tit2">
        <!-- <el-tabs v-model="activeName" @tab-click="tabsHandleClick">
          <el-tab-pane label="全部订单" name="1"></el-tab-pane>
          <el-tab-pane label="普通订单" name="2"></el-tab-pane>
          <el-tab-pane label="拼团订单" name="3"></el-tab-pane>
        </el-tabs>-->
      </div>
    </div>
    <!-- <div class="nav2">
      <el-row :gutter="10">
        <el-col :span="6"><div class="box"></div></el-col>
        <el-col :span="6"><div class="box"></div></el-col>
        <el-col :span="6"><div class="box"></div></el-col>
        <el-col :span="6"><div class="box"></div></el-col>
      </el-row>
    </div>-->
    <div class="nav3">
      <div class="myForm">
        <el-form ref="form" :model="form" label-width="80px">
          <el-row>
            <el-col :span="20">
              <el-form-item label="订单状态：">
                <el-radio-group v-model="form.rad1" size="small" @change='changRad1'>
                  <el-radio-button label="-2">全部</el-radio-button>
                  <el-radio-button label="0">未支付</el-radio-button>
                  <el-radio-button label="1">待发货</el-radio-button>
                  <el-radio-button label="2">待收货</el-radio-button>
                  <el-radio-button label="3">交易完成</el-radio-button>
                  <el-radio-button label="-1">已取消</el-radio-button>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- <el-row>
            <el-col :span="20">
              <el-form-item label="支付方式：">
                <el-radio-group v-model="form.rad2" size="small">
                  <el-radio-button label="全部"></el-radio-button>
                  <el-radio-button label="微信支付"></el-radio-button>
                  <el-radio-button label="支付宝支付"></el-radio-button>
                  <el-radio-button label="余额支付"></el-radio-button>
                  <el-radio-button label="线下支付"></el-radio-button>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="创建时间：">
                <el-date-picker
                  size="small"
                  v-model="form.time"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row> -->
          <el-row>
            <el-col :span="8">
              <el-form-item label="搜索：">
                <div class="search">
                  <el-input
                    size="small"
                    placeholder="请输入内容"
                    v-model="form.search"
                    class="input-with-select"
                  >
                    <!-- <el-select
                      class="left-select"
                      v-model="form.select"
                      slot="prepend"
                      placeholder="请选择"
                    >
                      <el-option label="全部" value="1"></el-option>
                      <el-option label="订单号" value="2"></el-option>
                      <el-option label="UID" value="3"></el-option>
                      <el-option label="用户名称" value="4"></el-option>
                      <el-option label="用户电话" value="5"></el-option>
                      <el-option label="商品名称" value="6"></el-option>
                    </el-select> -->
                    <el-button
                      @click="onSubmit"
                      slot="append"
                      icon="el-icon-search"
                    ></el-button>
                  </el-input>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="myTable">
        <vxe-table :data="tableData">
          <vxe-table-column type="expand" width="30" :fixed="null">
            <template #content="{ row }">
              <template>
                <div class="xiala">
                  <el-row :gutter="20">
                    <el-col :span="6">
                      <div class="item">快递单号：{{ row.delivery_num ? row.delivery_num :'无'}}</div>
                    </el-col>
                    <!-- <el-col :span="6">
                      <div
                        class="item"
                      >师傅名称：{{ row.selected_quote? row.selected_quote.user_info.nick_name:'无' }}</div>
                    </el-col>
                    <el-col :span="6">
                      <div
                        class="item"
                      >师傅电话：{{ row.selected_quote?row.selected_quote.user.phone:'无' }}</div>
                    </el-col> -->
                  </el-row>
                  <!-- <el-row :gutter="20">
                    <el-col :span="6">
                      <div class="item">快递单号：{{ row.delivery_code }}</div>
                    </el-col>
                    <el-col :span="6">
                      <div class="item">快递名称：{{ row.delivery_name }}</div>
                    </el-col>
                    <el-col :span="6">
                      <div class="item">购买数量：{{ row.info.buy_num }}</div>
                    </el-col>
                    <el-col :span="6">
                      <div class="item">邮费：{{ row.info.postage }}</div>
                    </el-col>
                  </el-row>-->
                  <!-- <div style="margin-top: 16px"></div>
                  <el-row :gutter="20">
                    <el-col :span="20">
                      <div class="item">用户备注：{{ row.intro ? row.intro : '无' }}</div>
                    </el-col>
                    <el-col :span="6">
                      <div class="item">虚拟销量：3C数码/手机</div>
                    </el-col>
                  </el-row> -->
                </div>
              </template>
            </template>
          </vxe-table-column>
          <vxe-table-column field="order_num" min-width="180" title="订单号"></vxe-table-column>
          <vxe-table-column min-width="80" field="myStatus" title="订单状态"></vxe-table-column>
          <vxe-table-column min-width="80" field="address.name" title="用户信息"></vxe-table-column>
          <!-- <vxe-table-column min-width="120" field="myAble_delivery" title="是否要求发货"></vxe-table-column> -->          <vxe-table-column
            min-width="180"
            title="商品信息"
          >
            <template slot-scope="scope">
              <div class="shopxx" v-for="ele2 in scope.row.order_items" :key="ele2.id">
                <img class="shopImg" :src="ele2.image" alt />
                <div class="txt">
                  {{ ele2.name }}（数量:{{ele2.count}}件{{ele2.sku != '' ? ` 规格:${ele2.sku}` : ''}}） 
                  <!-- {{ scope.row.info.product_detail.attr_info.suk }} -->
                </div>
              </div>
            </template>
          </vxe-table-column>
          <vxe-table-column field="pay_time" min-width="160" title="支付时间"></vxe-table-column>
          <vxe-table-column field="total_price" min-width="80" title="实际支付"></vxe-table-column>
          <!-- <vxe-table-column field="myBuy_way" min-width="80" title="支付状态"></vxe-table-column> -->
          <vxe-table-column title="操作状态" width="130">
            <template slot-scope="scope">
              <div class="flex">
                <el-button
                  :disabled='scope.row.status != 1'
                  size="small"
                  @click="fahuo(scope.row)"
                  type="text"
                >发货</el-button>
                <el-button size="small" @click="seeFapiao(scope.row)" type="text">发票详情</el-button>
                <!-- <el-button size="small" @click="toEditShop(scope.row)" type="text">删除</el-button> -->
              </div>
            </template>
          </vxe-table-column>
        </vxe-table>
        <el-pagination
          class="fenye"
          @size-change="this.handleSizeChange"
          @current-change="this.handleCurrentChange"
          :current-page="this.dingdanliebiaoPage"
          :page-size="10"
          :page-sizes="[10, 15, 20, 30]"
          layout="total,sizes, prev, pager, next, jumper"
          :total="this.total"
        ></el-pagination>
      </div>
    </div>
    <!-- 发货 -->
    <el-dialog
      title="发货"
      :visible.sync="fahuoDialogVisible"
      width="30%"
      :before-close="fahuoHandleClose"
    >
      <div class="fahuomyForm">
        <el-form
          :model="fahuoForm"
          :rules="rules"
          ref="fahuoForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="快递单号" prop="delivery_code">
            <el-input size="small" v-model="fahuoForm.delivery_code"></el-input>
          </el-form-item>
          <!-- <el-form-item label="快递名称" prop="delivery_name">
            <el-input size="small" v-model="fahuoForm.delivery_name"></el-input>
          </el-form-item> -->
          <el-form-item>
            <el-button size="small" type="primary" @click="submitForm('fahuoForm')">发货</el-button>
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
    ...mapState(["dingdanliebiaoPage", "dingdanliebiaoPageSize"])
  },
  watch: {
    dingdanliebiaoPage: function(page) {
      this.$store.commit("dingdanliebiaoPage", page);
      this.getData();
    },
    dingdanliebiaoPageSize: function(pageSize) {
      this.$store.commit("dingdanliebiaoPageSize", pageSize);
      this.getData();
    }
  },
  data() {
    return {
      activeName: "3",
      form: {
        rad1: "-2",
        rad2: "",
        time: [],
        search: "",
        select: ""
      },
      tableData: [],
      total: 0,
      fahuoId: "",
      fahuoDialogVisible: false,
      fahuoForm: {
        delivery_code: "",
        delivery_name: ""
      },
      rules: {
        delivery_code: [
          { required: true, message: "请输入快递单号", trigger: "blur" }
        ],
        delivery_name: [
          { required: true, message: "请输入快递名称", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const res = await this.$api.orders({
        page: this.dingdanliebiaoPage,
        limit: this.dingdanliebiaoPageSize,
        keyword:this.form.search,
        status:this.form.rad1
      });
      console.log(res.data);
      this.total = res.data.total;
      this.tableData = res.data.data;
      console.log(this.tableData)
      this.tableData.forEach(ele => {
        ele.myStatus =
          ele.status == -2
            ? "已过期"
            : ele.status == -1
            ? "已取消"
            : ele.status == 0
            ? "未支付"
            : ele.status == 1
            ? "待发货"
            : ele.status == 2
            ? "已发货"
            : "已完成";
      });
    },
    changRad1(e){
      console.log(e)
      this.getData()
    },
    async submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const res = await this.$api.ordersFahuo({
            delivery_num: this.fahuoForm.delivery_code,
          },this.fahuoId);
          console.log(res);
          if (res) {
            this.$message({
              message: '发货成功',
              type: "success"
            });
            this.getData();
            this.fahuoDialogVisible = false;
          } else {
            this.$message.error(res.msg);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    onSubmit() {
      console.log(this.form);
      this.getData()
    },
    fahuo(row) {
      console.log(row);
      this.fahuoId = row.id;
      this.fahuoDialogVisible = true;
    },
    async seeFapiao(row){
      const res = await this.$api.orderBillXiangqin(row.id)
      console.log(res)
    },
    async shouhou(row) {
      const res = await this.$api.ordersId({
        status:5
      },row.order.id);
      console.log(res)
      if (res.code == 200) {
        this.$message({
          message: '修改成功',
          type: "success"
        });
        this.getData();
      }
    },
    async toEditShop(row) {
      console.log(row);
      const res = await this.$api.orderDel({
        id: row.id
      });
      console.log(res);
      if (res.code == 200) {
        this.$message({
          message: res.msg,
          type: "success"
        });
        this.getData();
      }
    },
    tabsHandleClick(tab, event) {
      console.log(tab, event);
    },
    fahuoHandleClose() {
      this.fahuoDialogVisible = false;
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.$store.commit("dingdanliebiaoPageSize", val);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("dingdanliebiaoPage", val);
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
  margin-top: 20px;
  height: 110px;
  .box {
    background: #fff;
    height: 110px;
    box-shadow: 0px 0 4px 2px #dddddd !important;
  }
}
.nav3 {
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
      margin-top: 3px;
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
    /deep/ .vxe-cell {
      white-space: normal !important;
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
.shopxx {
  display: flex;
  align-items: center;
  margin: 4px 0;
  .shopImg {
    width: 40px;
    height: 40px;
    margin-right: 6px;
  }
  .txt {
    font-size: 12px;
    line-height: 16px;
  }
}
.fahuomyForm {
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