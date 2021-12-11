<template>
  <div class="index">
    <div class="top">
      <div class="box">
        <div class="icon1">
          <div class="icon2">
            <i class="el-icon-s-order"></i>
          </div>
        </div>
        <div class="tit">
          <div class="txt1">{{wait_send}}</div>
          <div class="txt2">产品总数</div>
        </div>
      </div>
      <div class="box">
        <div class="icon1 i1-2">
          <div class="icon2 i1-2">
            <i class="el-icon-s-claim"></i>
          </div>
        </div>
        <div class="tit">
          <div class="txt1">{{wait_check}}</div>
          <div class="txt2">成交总量</div>
        </div>
      </div>
      <div class="box">
        <div class="icon1 i1-3">
          <div class="icon2 i1-3">
            <i class="el-icon-s-release"></i>
          </div>
        </div>
        <div class="tit">
          <div class="txt1">{{wait_refund}}</div>
          <div class="txt2">销售总额</div>
        </div>
      </div>
    </div>
    <!-- <div id="main1"></div>
    <div id="main2"></div>
    <div id="main3"></div>-->
    <!-- 列表 -->
    <div class="nav2">
      <div class="myForm">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="供应商：">
            <el-select size="small" v-model="formInline.category_id" placeholder="请选择">
              <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="时间：">
            <el-date-picker
              style="margin-left: 20px; transform: translateY(1px)"
              size="small"
              v-model="formInline.time"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
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
                      <div class="item">商品分类：{{row.myCategory}}</div>
                    </el-col>
                    <el-col :span="6">
                      <div class="item">商品创建时间：{{row.created_at}}</div>
                    </el-col>
                    <el-col :span="10">
                      <div class="item">描述：{{ row.desc }}</div>
                    </el-col>
                  </el-row>
                  <!-- <div style="margin-top: 16px"></div>
                  <el-row :gutter="20">
                    <el-col :span="6">
                      <div class="item">收藏：3C数码/手机</div>
                    </el-col>
                    <el-col :span="6">
                      <div class="item">虚拟销量：3C数码/手机</div>
                    </el-col>
                  </el-row>-->
                </div>
              </template>
            </template>
          </vxe-table-column>
          <vxe-table-column field="id" title="商品ID"></vxe-table-column>
          <vxe-table-column field="role" title="商品主图">
            <template slot-scope="scope">
              <el-image :src="scope.row.preview_image" fit="fill" style="width: 40px; height: 40px">
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </template>
          </vxe-table-column>
          <vxe-table-column field="name" title="商品名称"></vxe-table-column>
          <vxe-table-column field="price" title="商品售价"></vxe-table-column>
          <vxe-table-column field="totalcount" title="统计数量"></vxe-table-column>
          <!-- <vxe-table-column title="操作状态" width="140">
            <template slot-scope="scope">
              <div class="flex">
                <el-button size="small" @click="toEditShop(scope.row)" type="text">编辑</el-button>
                <el-button size="small" @click="toDelShop(scope.row)" type="text">删除</el-button>
              </div>
            </template>
          </vxe-table-column>-->
        </vxe-table>
        <el-pagination
          class="fenye"
          @size-change="this.handleSizeChange"
          @current-change="this.handleCurrentChange"
          :current-page="this.shouyePage"
          :page-size="10"
          :page-sizes="[10, 15, 20, 30]"
          layout="total,sizes, prev, pager, next, jumper"
          :total="this.total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import * as echarts from "echarts";
export default {
  computed: {
    ...mapState(["shouyePage", "shouyePageSize", "tabIndex"])
  },
  watch: {
    shouyePage: function(page) {
      this.$store.commit("shouyePage", page);
      this.getData3();
    },
    shouyePageSize: function(pageSize) {
      this.$store.commit("shouyePageSize", pageSize);
      this.getData3();
    },
    tabIndex: function() {
      this.activeName = this.tabIndex;
      console.log(this.activeName);
      this.getData3();
    }
  },
  data() {
    return {
      wait_send: 0,
      wait_check: 0,
      wait_refund: 0,
      nowTime: "",
      //
      activeName: "1",
      formInline: {
        category_id: "",
        time: ""
      },
      options: [],
      tableData: [],
      total: 0
    };
  },
  created() {
    // this.getData();
    // this.getData2();
    this.getNowTime();
    this.getData3();
    this.getsupplier()
  },
  methods: {
    async getData() {
      const res = await this.$api.dashboard();
      console.log(res);
      this.wait_send = res.data.wait_send;
      this.wait_check = res.data.wait_check;
      this.wait_refund = res.data.wait_refund;
      var chartDom1 = document.getElementById("main1");
      var myChart1 = echarts.init(chartDom1);
      var chartDom2 = document.getElementById("main2");
      var myChart2 = echarts.init(chartDom2);
      var chartDom3 = document.getElementById("main3");
      var myChart3 = echarts.init(chartDom3);
      var option1 = {
        title: {
          x: "20",
          text: "近7天订单数"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["订单数"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          x: "180",
          y: "-2",
          feature: {
            saveAsImage: {
              //保存图片
              show: true
            }
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "订单数",
            type: "line",
            stack: "总量"
          }
        ]
      };
      var option2 = {
        title: {
          x: "20",
          text: "近7天新增用户数"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["新增用户数"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          x: "180",
          y: "-2",
          feature: {
            saveAsImage: {
              //保存图片
              show: true
            }
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "新增用户数",
            type: "line",
            stack: "总量",
            itemStyle: {
              normal: {
                color: "#ff9900",
                borderColor: "#ff9900" //拐点边框颜色
              }
            }
          }
        ]
      };
      var option3 = {
        title: {
          x: "20",
          text: "近7天活跃用户数"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["活跃用户数"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          x: "180",
          y: "-2",
          feature: {
            saveAsImage: {
              //保存图片
              show: true
            }
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "活跃用户数",
            type: "line",
            stack: "总量",
            itemStyle: {
              normal: {
                color: "#19be6b",
                borderColor: "#19be6b" //拐点边框颜色
              }
            }
          }
        ]
      };
      let week_orderKeyArr = [];
      let week_orderZhiArr = [];
      for (const key in res.data.week_order) {
        week_orderKeyArr.push(key);
        week_orderZhiArr.push(res.data.week_order[key]);
      }
      option1.xAxis.data = week_orderKeyArr;
      option1.series[0].data = week_orderZhiArr;
      option1 && myChart1.setOption(option1);
      let week_new_userKeyArr = [];
      let week_new_userZhiArr = [];
      for (const key in res.data.week_new_user) {
        week_new_userKeyArr.push(key);
        week_new_userZhiArr.push(res.data.week_new_user[key]);
      }
      option2.xAxis.data = week_new_userKeyArr;
      option2.series[0].data = week_new_userZhiArr;
      option2 && myChart2.setOption(option2);
      let week_activity_userKeyArr = [];
      let week_activity_userZhiArr = [];
      for (const key in res.data.week_activity_user) {
        week_activity_userKeyArr.push(key);
        week_activity_userZhiArr.push(res.data.week_activity_user[key]);
      }
      option3.xAxis.data = week_activity_userKeyArr;
      option3.series[0].data = week_activity_userZhiArr;
      option3 && myChart3.setOption(option3);
    },
    async getsupplier(){
      const res = await this.$api.supplier({
        page:1,
        limit:10000
      })
      console.log(res)
      this.options = res.data.data;
    },
    async getData3() {
      const res = await this.$api.statistics({
        limit: this.shouyePageSize,
        page: this.shouyePage,
        start_day: this.formInline.time[0],
        end_day: this.formInline.time[1],
        supplier_id:this.formInline.category_id
      });
      this.wait_send = res.data.item_count;
      this.wait_check = res.data.orders_count;
      this.wait_refund = res.data.orders_sumprice;
      this.tableData = res.data.list;
      this.total = res.data.total;
    },
    async getData2() {
      // const res2 = await this.$api.categories();
      // console.log(res2);
      // this.options = res2.data;

      this.activeName = this.tabIndex;
      const res = await this.$api.items({
        limit: this.shouyePageSize,
        page: this.shouyePage
      });
      console.log(res);
      this.total = res.data.total;
      this.tableData = res.data.data;
      this.tableData.forEach(ele => {
        ele.ri = Math.ceil(Math.random() * 2);
        ele.yue = ele.ri * Math.ceil(Math.random() * 30);
        ele.ji = ele.yue * Math.ceil(Math.random() * 3) + ele.yue;
        ele.nian = ele.ji * Math.ceil(Math.random() * 4) + ele.ji;
      });
    },
    getNowTime() {
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      if (day < 10) {
        day = `0${day}`;
      }
      // var hh = date.getHours();
      // var mm = date.getMinutes();
      // var ss = date.getSeconds();
      this.nowTime = `${year}-${month}-${day}`;
      var date2 = new Date(this.nowTime);
      date2.setDate(date.getDate() - 7);
      var year2 = date2.getFullYear();
      var month2 = date2.getMonth() + 1;
      var day2 = date2.getDate();
      if (day2 < 10) {
        day2 = `0${day2}`;
      }
      this.sevenTime = `${year2}-${month2}-${day2}`;
      console.log(this.nowTime, this.sevenTime);
      this.formInline.time = [this.sevenTime, this.nowTime];
    },
    onSubmit() {
      console.log(this.formInline);
      this.$store.commit("shouyePage", 1);
      this.getData3()
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.$store.commit("shouyePageSize", val);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("shouyePage", val);
    }
  }
};
</script>

<style lang="scss" scoped>
.index {
}
.top {
  width: 100%;
  display: flex;
  align-items: center;
  margin: 0 0 20px 0;
  height: 120px;
  .box {
    &:nth-child(3) {
      margin-right: 0px;
    }
    border-radius: 10px;
    height: 100%;
    width: 33.3%;
    background: #ffffff;
    margin-right: 16px;
    display: flex;
    align-items: center;
    padding: 0 25px;
    .icon1.i1-2 {
      background: #fff3e0;
      .icon2.i1-2 {
        background: #ffab2b;
      }
    }
    .icon1.i1-3 {
      background: #eaf9e1;
      .icon2.i1-3 {
        background: #6dd230;
      }
    }
    .icon1 {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: #e4ecff;
      .icon2 {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background: #4d7cfe;
        .el-icon-s-order {
          font-size: 26px;
          color: #ffffff;
        }
        .el-icon-s-release {
          font-size: 26px;
          color: #ffffff;
        }
        .el-icon-s-claim {
          font-size: 26px;
          color: #ffffff;
        }
      }
    }
    .tit {
      margin-left: 30px;
      height: 50px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .txt1 {
        color: rgb(37, 38, 49);
        font-size: 24px;
      }
      .txt2 {
        color: rgb(152, 169, 188);
        font-size: 12px;
      }
    }
  }
}
#main1 {
  width: 100%;
  height: 300px;
  background: #ffffff;
  padding: 14px 0px;
  border-radius: 10px;
}
#main2 {
  margin-top: 20px;
  width: 100%;
  height: 300px;
  background: #ffffff;
  padding: 14px 0px;
  border-radius: 10px;
}
#main3 {
  margin-top: 20px;
  width: 100%;
  height: 300px;
  background: #ffffff;
  padding: 14px 0px;
  border-radius: 10px;
}
//
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
</style>