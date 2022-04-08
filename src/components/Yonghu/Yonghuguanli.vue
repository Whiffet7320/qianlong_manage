<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">用户管理</div>
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
          <el-form-item label="手机号搜索：">
            <div class="search">
              <el-input
                size="small"
                placeholder="请输入内容"
                v-model="formInline.search"
                class="input-with-select"
              >
                <!-- <el-select
                  class="left-select"
                  v-model="formInline.select"
                  slot="prepend"
                  placeholder="请选择"
                >
                  <el-option label="全部" value="1"></el-option>
                  <el-option label="UID" value="2"></el-option>
                  <el-option label="手机号" value="3"></el-option>
                  <el-option label="用户名称" value="4"></el-option>
                </el-select>-->
              </el-input>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button size="small" icon="el-icon-search" type="primary" @click="onSubmit">搜索</el-button>
            <el-button size="small" @click="onReact">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- <div class="tit1">
        <el-button
          @click="toAddShop"
          size="small"
          type="primary"
          icon="el-icon-plus"
          >添加用户</el-button
        >
      </div>-->
      <div class="myTable">
        <vxe-table height="700" :loading="loading" :data="tableData">
          <vxe-table-column v-if="false" type="expand" width="30" :fixed="null">
            <template #content="{ row }">
              <template>
                <div class="xiala">
                  <el-row :gutter="20">
                    <el-col :span="6">
                      <div class="item">
                        店铺图：
                        <el-image
                          v-if="row.user_info"
                          :src="row.user_info.shop_img"
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
                      <div class="item">店铺名称：{{row.user_info?row.user_info.shop_name:''}}</div>
                    </el-col>
                    <el-col :span="6">
                      <div class="item">店铺联系方式：{{row.user_info? row.user_info.shop_phone:'' }}</div>
                    </el-col>
                    <el-col :span="10">
                      <div
                        class="item"
                        v-if="row.user_info"
                      >地址：{{ row.user_info.area }} {{row.user_infodetail_address}}</div>
                    </el-col>
                  </el-row>
                  <div style="margin-top: 16px"></div>
                  <el-row :gutter="20">
                    <el-col :span="6">
                      <div class="item">邀请码：{{row.invite_code}}</div>
                    </el-col>
                    <el-col :span="6">
                      <div class="item">用户手机号：{{ row.phone }}</div>
                    </el-col>
                  </el-row>
                </div>
              </template>
            </template>
          </vxe-table-column>
          <vxe-table-column field="id" title="ID"></vxe-table-column>
          <vxe-table-column field="avatar" title="用户头像">
            <template slot-scope="scope">
              <el-image
                v-if="scope.row.faceImg"
                :src="scope.row.faceImg"
                fit="fill"
                style="width: 40px; height: 40px"
              >
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </template>
          </vxe-table-column>
          <vxe-table-column field="nickName" title="用户名"></vxe-table-column>
          <vxe-table-column field="phone" title="手机号"></vxe-table-column>
          <vxe-table-column field="myState" title="类型"></vxe-table-column>
          <vxe-table-column field="VipState" title="会员状态"></vxe-table-column>
          <vxe-table-column field="vipUser.endTime" title="到期时间"></vxe-table-column>
          <!-- <vxe-table-column field="user_info.shop_name" title="店铺名称"></vxe-table-column> -->
          <!-- <vxe-table-column field="user_info.shop_phone" title="店铺联系方式"></vxe-table-column> -->
          <vxe-table-column title="操作状态" width="200">
            <template slot-scope="scope">
              <div class="flex">
                <el-button size="small" type="text" @click="tabEdit(scope.row)">设置会员</el-button>
                <el-button size="small" type="text" @click="tabSee(scope.row)">发帖记录</el-button>
                <el-button size="small" type="text" @click="tabDel(scope.row)">删除</el-button>
              </div>
            </template>
          </vxe-table-column>
        </vxe-table>
        <el-pagination
          class="fenye"
          @size-change="this.handleSizeChange"
          @current-change="this.handleCurrentChange"
          :current-page="this.yonghuguanliPage"
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
                  <el-radio-button label="0">名片</el-radio-button>
                  <el-radio-button label="1">职位</el-radio-button>
                  <!-- <el-radio-button label="3">收益明细</el-radio-button> -->
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="myTable">
        <vxe-table v-if="mingxiFrom.rad1 == '1'" :data="mingxiTableData">
          <vxe-table-column field="id" title="ID"></vxe-table-column>
          <vxe-table-column field="jobTitle" title="标题"></vxe-table-column>
          <vxe-table-column field="jobName" title="名称"></vxe-table-column>
          <vxe-table-column field="jobInfo" title="详情"></vxe-table-column>
          <vxe-table-column field="salary" title="薪资"></vxe-table-column>
          <vxe-table-column field="jobNum" title="数量"></vxe-table-column>
          <vxe-table-column field="tags[0].tagName" title="类型"></vxe-table-column>
          <vxe-table-column field="district" title="地点"></vxe-table-column>
          <vxe-table-column field="phone" title="联系电话"></vxe-table-column>
          <!-- <vxe-table-column field="mark" width="250" title="备注"></vxe-table-column> -->
          <!-- <vxe-table-column field="pay_way" width="120" title="支付方式"></vxe-table-column> -->
        </vxe-table>
        <vxe-table v-else :data="mingxiTableData">
          <vxe-table-column field="id" title="ID"></vxe-table-column>
          <vxe-table-column field="jobTypeName" title="名称"></vxe-table-column>
          <vxe-table-column field="info" title="详情"></vxe-table-column>
          <vxe-table-column field="salary" title="薪资"></vxe-table-column>
          <vxe-table-column field="drivingName" title="驾照"></vxe-table-column>
          <vxe-table-column field="workTime" title="工作经验"></vxe-table-column>
          <vxe-table-column field="gender" title="性别"></vxe-table-column>
          <vxe-table-column field="name" title="姓名"></vxe-table-column>
          <vxe-table-column field="phone" title="联系电话"></vxe-table-column>
          <!-- <vxe-table-column field="mark" width="250" title="备注"></vxe-table-column> -->
          <!-- <vxe-table-column field="pay_way" width="120" title="支付方式"></vxe-table-column> -->
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
    <!-- 设置会员时长 -->
    <el-dialog
      title="设置会员时长"
      :visible.sync="addDialogVisible"
      width="700px"
      :before-close="addHandleClose"
    >
      <div class="myAddForm">
        <el-form :model="addForm" ref="addForm" label-width="100px" class="demo-addForm">
          <!-- <el-row>
            <el-col :span="20">
              <el-form-item label="企业名称">
                <el-input size="small" v-model="addForm.nick_name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="店铺名称">
                <el-input size="small" v-model="addForm.shop_name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>-->
          <el-row>
            <el-col :span="20">
              <el-form-item label="会员时长">
                <el-radio-group v-model="addForm.type">
                  <el-radio
                    v-for="item in huiyuanleixinList"
                    :key="item.id"
                    :label="item.id"
                  >{{item.vipName}}</el-radio>
                </el-radio-group>
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
      "yonghuguanliPage",
      "yonghuguanliPageSize",
      "zijinmingxiliebiaoPage",
      "zijinmingxiliebiaoPageSize"
    ])
  },
  watch: {
    yonghuguanliPage: function(page) {
      this.$store.commit("yonghuguanliPage", page);
      this.getData();
    },
    yonghuguanliPageSize: function(pageSize) {
      this.$store.commit("yonghuguanliPageSize", pageSize);
      this.getData();
    },
    zijinmingxiliebiaoPage: function(page) {
      this.$store.commit("zijinmingxiliebiaoPage", page);
      this.getFatieData();
    },
    zijinmingxiliebiaoPageSize: function(pageSize) {
      this.$store.commit("zijinmingxiliebiaoPageSize", pageSize);
      this.getFatieData();
    }
  },
  data() {
    return {
      huiyuanleixinList: [],
      loading: false,
      imgStatus: "",
      addDialogVisible: false,
      addForm: {
        id: "",
        name: "",
        sort: "",
        type: ""
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
        rad1: "0"
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
    this.getHuiyuanleixin();
  },
  methods: {
    async getData() {
      this.loading = true;
      const res = await this.$api.muserGetAll({
        pageSize: this.yonghuguanliPageSize,
        nowPage: this.yonghuguanliPage,
        phone: this.formInline.search
      });
      console.log(res.data);
      this.total = res.data.total;
      this.tableData = res.data.data;
      this.tableData.forEach(ele => {
        if (ele.state) {
          ele.myState =
            ele.state == 0 ? "离职" : ele.state == 1 ? "已工作" : "未设置";
          if (ele.vipUser) {
            ele.VipState = ele.vipUser.state == 0 ? "到期" : "正常";
          } else {
            ele.VipState = "未开通";
          }
        }
      });
      console.log(this.tableData);
      this.loading = false;
    },
    async tabDel(row){
      const res = await this.$api.muserMdelUser({
        userId:row.id
      })
      if (res.status == 0) {
        this.$message({
          message: "已删除",
          type: "success"
        });
        this.getData();
      } else {
        this.$message.error(res.msg);
        this.getData();
      }
    },
    addHandleClose() {
      this.addDialogVisible = false;
    },
    async getHuiyuanleixin() {
      const res = await this.$api.mvipGetVIPTypeAll({
        isDelete: 2
      });
      this.huiyuanleixinList = res.data;
      this.huiyuanleixinList.pop();
    },
    // 删除图片
    delImg(val, i = 0) {
      console.log(i);
      if (val == "tx") {
        this.$set(this.addForm.user_info, "avatar", "");
      } else if (val == "zt") {
        this.$set(this.addForm.user_info, "business_license", "");
      } else if (val == "llt") {
        this.$set(this.addForm.user_info, "shop_img", "");
      }
      ``;
    },
    async AddOnSubmit() {
      console.log(this.addForm);
      const res = await this.$api.mvipUpdateUser({
        id: this.id,
        type: this.addForm.type
      });
      console.log(res);
      if (res.status == 0) {
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
    },
    // 上传图片
    companyList(val) {
      this.imgStatus = val;
      this.$refs.fileInputList.click();
    },
    async companyLogo(event) {
      var file = event.target.files[0];
      this.imgFile = file;
      this.uploading(true);
      this.$refs.fileInputList.value = "";
    },
    //将文件转为blob类型
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
    },
    async uploading(flag) {
      // console.log(document.getElementById("file0").value);
      if (flag) {
        var file_re = await this.readFileAsBuffer(this.imgFile);
        const res = await this.$api.uploadToken();
        let myData = res.data;
        console.log(myData);
        let client = new window.OSS.Wrapper({
          region: myData.region, //oss地址
          accessKeyId: myData.accessKeyId, //ak
          accessKeySecret: myData.accessKeySecret, //secret
          stsToken: myData.stsToken,
          bucket: myData.bucket //oss名字
        });
        var imgtype = this.imgFile.type.substr(6, 4);
        var store = `${new Date().getTime()}.${imgtype}`;
        client.put(store, file_re).then(() => {
          //这个结果就是url
          console.log(store);
          // var oss_imgurl = client.signatureUrl(store);
          var oss_imgurl = `https://${myData.bucket}.${myData.url}/${store}`;
          if (this.imgStatus == "tx") {
            this.$set(this.addForm.user_info, "avatar", oss_imgurl);
          } else if (this.imgStatus == "yyzz") {
            this.addForm.user_info.business_license = oss_imgurl;
          } else if (this.imgStatus == "dpt") {
            this.addForm.user_info.shop_img = oss_imgurl;
          }
          console.log(oss_imgurl);
        });
      }
    },
    tabEdit(row) {
      console.log(row);
      this.id = row.id;
      this.addDialogVisible = true;
    },
    async tabSee(row) {
      console.log(row);
      this.mingxiUser_id = row.id;
      this.getFatieData();
      this.dialogVisible = true;
    },
    async getFatieData() {
      const res = await this.$api.getMyCardOrJob({
        userId: this.mingxiUser_id,
        pageNow: this.zijinmingxiliebiaoPage,
        pageSize: this.zijinmingxiliebiaoPageSize,
        type: this.mingxiFrom.rad1
      });
      console.log(res.data);
      this.mingxiTableData = res.data.data;
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
      this.getFatieData();
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
    async searchGetdata() {
      this.loading = true;
      const res = await this.$api.getUserList({
        phone: this.formInline.search
      });
      console.log(res);
      if (res.status == 0) {
        this.$message({
          message: res.msg,
          type: "success"
        });
        this.editDialogVisible = false;
        this.total = res.data.length;
        this.tableData = res.data;
        this.tableData.forEach(ele => {
          if (ele.state) {
            ele.myState =
              ele.state == 0 ? "离职" : ele.state == 1 ? "已工作" : "未设置";
            if (ele.vipUser) {
              ele.VipState = ele.vipUser.state == 0 ? "到期" : "正常";
            } else {
              ele.VipState = "未开通";
            }
          }
        });
        console.log(this.tableData);
        this.loading = false;
      } else {
        this.$message.error(res.msg);
      }
    },
    onSubmit() {
      console.log(this.formInline);
      this.getData()
      // this.searchGetdata();
    },
    onReact() {
      this.formInline.search = "";
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
      this.$store.commit("yonghuguanliPageSize", val);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("yonghuguanliPage", val);
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
      // margin-top: 5px;
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