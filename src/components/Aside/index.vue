<template>
  <div class="aside">
    <!-- <div class="nav4" @click="loginOut">
      <img class="pic1" src="../../assets/image/组191.png" alt="" />
      <div class="tit1">切换账号</div>
    </div>-->
    <div class="menu">
      <div class="myisCollBtn">
        <el-button @click="myisColl">
          <i class="el-icon-menu"></i>
        </el-button>
      </div>

      <el-menu
        :default-active="menuActiveIndex"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        background-color="#001529"
        text-color="#fff"
        router
      >
        <el-menu-item :route="{ name: 'Shouye' }" index="1-1">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-s-goods"></i>
            <span>商品</span>
          </template>
          <el-menu-item :route="{ name: 'Shangpinguanli' }" index="2-1">商品管理</el-menu-item>
          <el-menu-item :route="{ name: 'Jifenshangpinguanli' }" index="2-5">积分商品管理</el-menu-item>
          <el-menu-item :route="{ name: 'Shangpingfenlei' }" index="2-2">商品分类</el-menu-item>
          <!-- <el-menu-item :route="{ name: 'Shangpingpinglun' }" index="2-3"
            >商品评论</el-menu-item
          >-->
          <el-menu-item :route="{ name: 'Yunfeimoban' }" index="2-4">运费模板</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-s-order"></i>
            <span>订单</span>
          </template>
          <el-menu-item :route="{ name: 'Dingdanguanli' }" index="3-1">订单管理</el-menu-item>
          <el-menu-item :route="{ name: 'ShopDingdanguanli' }" index="3-2">售后单列表</el-menu-item>
        </el-submenu>
        <!-- <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-s-ticket"></i>
            <span>营销</span>
          </template>
          <el-submenu index="4-1">
            <span slot="title">拼团管理</span>
            <el-menu-item :route="{ name: 'Pingtuanshangping' }" index="4-1-1">拼团商品</el-menu-item>
            <el-menu-item :route="{ name: 'Pingtuanliebiao' }" index="4-1-2">拼团列表</el-menu-item>
            <el-menu-item :route="{ name: 'Jishouliebiao' }" index="4-1-3">寄售列表</el-menu-item>
            <el-menu-item :route="{ name: 'Pingtuanjilu' }" index="4-1-4">拼团记录</el-menu-item>
          </el-submenu>
          <el-submenu index="4-2">
            <span slot="title">卖场活动</span>
            <el-menu-item :route="{ name: 'Maichanghuodong' }" index="4-2-1">活动列表</el-menu-item>
          </el-submenu>
        </el-submenu>-->
        <el-submenu index="5">
          <template slot="title">
            <i class="el-icon-s-custom"></i>
            <span>用户</span>
          </template>
          <el-menu-item :route="{ name: 'Yonghuguanli' }" index="5-1">用户管理</el-menu-item>
          <el-menu-item :route="{ name: 'Shenheliebiao' }" index="5-5">用户审核管理</el-menu-item>
          <el-menu-item :route="{ name: 'Gongjinshangguanli' }" index="5-6">供应商管理</el-menu-item>
          <!-- <el-menu-item :route="{ name: 'Shifuguanli' }" index="5-4">师傅管理</el-menu-item> -->
          <!-- <el-menu-item :route="{ name: 'Lianghaoliebiao' }" index="5-2">靓号列表</el-menu-item> -->
          <!-- <el-menu-item :route="{ name: 'Tixianliebiao' }" index="5-3">提现列表</el-menu-item> -->
        </el-submenu>
        <!-- <el-submenu index="6">
          <template slot="title">
            <i class="el-icon-share"></i>
            <span>分销</span>
          </template>
          <el-menu-item :route="{ name: 'Fenxiaoshezhi' }" index="6-1">分销设置</el-menu-item>
        </el-submenu>-->
        <!-- <el-submenu index="7">
          <template slot="title">
            <i class="el-icon-s-check"></i>
            <span>财务</span>
          </template>
          <el-submenu index="7-1">
            <span slot="title">财务操作</span>
            <el-menu-item :route="{ name: 'Tixianshenqing' }" index="7-1-1"
              >提现申请</el-menu-item
            >
          </el-submenu>
          <el-submenu index="7-2">
            <span slot="title">佣金记录</span>
            <el-menu-item :route="{ name: 'Yongjinjilu' }" index="7-2-1"
              >佣金记录</el-menu-item
            >
          </el-submenu>
        </el-submenu>-->
        <!-- <el-submenu index="9">
          <template slot="title">
            <i class="el-icon-s-finance"></i>
            <span>文章</span>
          </template>
          <el-menu-item :route="{ name: 'Wenzhangliebiao' }" index="9-1">文章列表</el-menu-item>
        </el-submenu>-->
        <el-submenu index="8">
          <template slot="title">
            <i class="el-icon-s-tools"></i>
            <span>设置</span>
          </template>
          <!-- <el-menu-item :route="{ name: 'Xiaoxiguanli' }" index="8-1">消息管理</el-menu-item> -->
          <el-menu-item :route="{ name: 'Qitashezhi' }" index="8-2">其他设置</el-menu-item>
          <el-menu-item :route="{ name: 'Lunbotushezhi' }" index="8-3">积分规则</el-menu-item>
          <el-menu-item :route="{ name: 'Fapiaoguize' }" index="8-9">发票规则</el-menu-item>
          <el-menu-item :route="{ name: 'Guanjianci' }" index="8-10">关键词设置</el-menu-item>
          <!-- <el-menu-item :route="{ name: 'Lunbotuliebiao' }" index="8-4">轮播图列表</el-menu-item> -->
          <!-- <el-menu-item :route="{ name: 'Kaipinyeshezhi' }" index="8-5">开屏页设置</el-menu-item> -->
          <!-- <el-menu-item :route="{ name: 'Shujuzhongxin' }" index="8-6">数据中心</el-menu-item> -->
        </el-submenu>
        <!-- <el-submenu index="10">
          <template slot="title">
            <i class="el-icon-s-finance"></i>
            <span>其他</span>
          </template>
          <el-menu-item :route="{ name: 'Jiangpingliebiao' }" index="10-5">奖品列表</el-menu-item>
          <el-menu-item :route="{ name: 'Zhongjiangliebiao' }" index="10-6">中奖列表</el-menu-item>
          <el-menu-item :route="{ name: 'Chengshiliebiao' }" index="10-2">城市列表</el-menu-item>
          <el-menu-item :route="{ name: 'Fankuiliebiao' }" index="10-1">反馈意见列表</el-menu-item>
          <el-menu-item :route="{ name: 'Gudingweizhi' }" index="10-3">固定位置列表</el-menu-item>
          <el-menu-item :route="{ name: 'Gudingweizhishangping' }" index="10-4">固定位置商品列表</el-menu-item>
        </el-submenu>-->
        <el-submenu index="11">
          <template slot="title">
            <i class="el-icon-s-finance"></i>
            <el-badge :is-dot="overallIsDot" class="item">
              <span>客服</span>
            </el-badge>
          </template>
          <el-menu-item :route="{ name: 'WebSocket' }" index="11-1">聊天室</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["overallIsDot"])
  },
  watch: {
    $route(to) {
      console.log(to.path); //到哪去
      if (to.path == "/Shouye") {
        this.menuActiveIndex = "1-1";
        this.$store.commit("headerTit", "首页");
      } else if (to.path == "/Shangpin/Shangpinguanli") {
        this.menuActiveIndex = "2-1";
        this.$store.commit(
          "headerTit",
          `商品 / <span style="color: #515a61;
        font-weight: 700;">商品管理</span>`
        );
      } else if (to.path == "/Shangpin/Tianjiashangping") {
        this.$store.commit(
          "headerTit",
          `商品 / 商品管理 / <span style="color: #515a61;
        font-weight: 700;">添加/修改商品</span>`
        );
      } else if (to.path == "/Shangpin/Tianjiajifenshangping") {
        this.$store.commit(
          "headerTit",
          `商品 / 商品管理 / <span style="color: #515a61;
        font-weight: 700;">添加/修改积分商品</span>`
        );
      } else if (to.path == "/Shangpin/Shangpingfenlei") {
        this.menuActiveIndex = "2-2";
        this.$store.commit(
          "headerTit",
          `商品 / <span style="color: #515a61;
        font-weight: 700;">商品分类</span>`
        );
      } else if (to.path == "/Shangpin/Shangpingpinglun") {
        this.menuActiveIndex = "2-3";
        this.$store.commit(
          "headerTit",
          `商品 / <span style="color: #515a61;
        font-weight: 700;">商品评论</span>`
        );
      } else if (to.path == "/Shangpin/Yunfeimoban") {
        this.menuActiveIndex = "2-4";
        this.$store.commit(
          "headerTit",
          `商品 / <span style="color: #515a61;
        font-weight: 700;">运费模板</span>`
        );
      } else if (to.path == "/Shangpin/Jifenshangpinguanli") {
        this.menuActiveIndex = "2-5";
        this.$store.commit(
          "headerTit",
          `商品 / <span style="color: #515a61;
        font-weight: 700;">积分商品分类</span>`
        );
      } else if (to.path == "/Dingdan/Dingdanguanli") {
        this.menuActiveIndex = "3-1";
        this.$store.commit(
          "headerTit",
          `订单 / <span style="color: #515a61;
        font-weight: 700;">服务订单管理</span>`
        );
      } else if (to.path == "/Dingdan/ShopDingdanguanli") {
        this.menuActiveIndex = "3-2";
        this.$store.commit(
          "headerTit",
          `订单 / <span style="color: #515a61;
        font-weight: 700;">售后单列表</span>`
        );
      } else if (to.path == "/Yingxiao/Pingtuanshangping") {
        this.menuActiveIndex = "4-1-1";
        this.$store.commit(
          "headerTit",
          `营销 / 拼团管理 / <span style="color: #515a61;
        font-weight: 700;">拼团商品</span>`
        );
      } else if (to.path == "/Yingxiao/Tianjiapingtuanshangping") {
        this.menuActiveIndex = "4-1-1";
        this.$store.commit(
          "headerTit",
          `营销 / 拼团管理 / 拼团商品 / <span style="color: #515a61;
        font-weight: 700;">添加/编辑商品</span>`
        );
      } else if (to.path == "/Yingxiao/Pingtuanliebiao") {
        this.menuActiveIndex = "4-1-2";
        this.$store.commit(
          "headerTit",
          `营销 / 拼团管理 / <span style="color: #515a61;
        font-weight: 700;">拼团列表</span>`
        );
      } else if (to.path == "/Yingxiao/Jishouliebiao") {
        this.menuActiveIndex = "4-1-3";
        this.$store.commit(
          "headerTit",
          `营销 / 拼团管理 / <span style="color: #515a61;
        font-weight: 700;">寄售列表</span>`
        );
      } else if (to.path == "/Yingxiao/Pingtuanjilu") {
        this.menuActiveIndex = "4-1-4";
        this.$store.commit(
          "headerTit",
          `营销 / 拼团管理 / <span style="color: #515a61;
        font-weight: 700;">拼团记录</span>`
        );
      } else if (to.path == "/Yingxiao/Maichanghuodong") {
        this.menuActiveIndex = "4-2-1";
        this.$store.commit(
          "headerTit",
          `营销 / 卖场活动 / <span style="color: #515a61;
        font-weight: 700;">活动列表</span>`
        );
      } else if (to.path == "/Yonghu/Yonghuguanli") {
        this.menuActiveIndex = "5-1";
        this.$store.commit(
          "headerTit",
          `用户 / <span style="color: #515a61;
        font-weight: 700;">用户管理</span>`
        );
      } else if (to.path == "/Yonghu/Shenheliebiao") {
        this.menuActiveIndex = "5-5";
        this.$store.commit(
          "headerTit",
          `用户 / <span style="color: #515a61;
        font-weight: 700;">用户审核管理</span>`
        );
      } else if (to.path == "/Yonghu/Gongjinshangguanli") {
        this.menuActiveIndex = "5-6";
        this.$store.commit(
          "headerTit",
          `用户 / <span style="color: #515a61;
        font-weight: 700;">供应商管理</span>`
        );
      } else if (to.path == "/Yonghu/Lianghaoliebiao") {
        this.menuActiveIndex = "5-2";
        this.$store.commit(
          "headerTit",
          `用户 / <span style="color: #515a61;
        font-weight: 700;">靓号列表</span>`
        );
      } else if (to.path == "/Yonghu/Tixianliebiao") {
        this.menuActiveIndex = "5-3";
        this.$store.commit(
          "headerTit",
          `用户 / <span style="color: #515a61;
        font-weight: 700;">提现列表</span>`
        );
      } else if (to.path == "/Yonghu/Shifuguanli") {
        this.menuActiveIndex = "5-4";
        this.$store.commit(
          "headerTit",
          `用户 / <span style="color: #515a61;
        font-weight: 700;">师傅管理</span>`
        );
      } else if (to.path == "/Fenxiao/Fenxiaoshezhi") {
        this.menuActiveIndex = "6-1";
        this.$store.commit(
          "headerTit",
          `分销 / <span style="color: #515a61;
        font-weight: 700;">分销设置</span>`
        );
      } else if (to.path == "/Caiwu/Tixianshenqing") {
        this.menuActiveIndex = "7-1-1";
        this.$store.commit(
          "headerTit",
          `财务 / 财务操作 / <span style="color: #515a61;
        font-weight: 700;">提现申请</span>`
        );
      } else if (to.path == "/Caiwu/Yongjinjilu") {
        this.menuActiveIndex = "7-2-1";
        this.$store.commit(
          "headerTit",
          `财务 / 佣金记录 / <span style="color: #515a61;
        font-weight: 700;">佣金记录</span>`
        );
      } else if (to.path == "/Shezhi/Xiaoxiguanli") {
        this.menuActiveIndex = "8-1";
        this.$store.commit(
          "headerTit",
          `设置 / <span style="color: #515a61;
        font-weight: 700;">消息管理</span>`
        );
      } else if (to.path == "/Shezhi/Qitashezhi") {
        this.menuActiveIndex = "8-2";
        this.$store.commit(
          "headerTit",
          `设置 / <span style="color: #515a61;
        font-weight: 700;">其他设置</span>`
        );
      } else if (to.path == "/Shezhi/Lunbotushezhi") {
        this.menuActiveIndex = "8-3";
        this.$store.commit(
          "headerTit",
          `设置 / <span style="color: #515a61;
        font-weight: 700;">积分规则</span>`
        );
      } else if (to.path == "/Shezhi/Fapiaoguize") {
        this.menuActiveIndex = "8-9";
        this.$store.commit(
          "headerTit",
          `设置 / <span style="color: #515a61;
        font-weight: 700;">发票规则</span>`
        );
      } else if (to.path == "/Shezhi/Guanjianci") {
        this.menuActiveIndex = "8-10";
        this.$store.commit(
          "headerTit",
          `设置 / <span style="color: #515a61;
        font-weight: 700;">关键词设置</span>`
        );
      } else if (to.path == "/Shezhi/Lunbotuliebiao") {
        this.menuActiveIndex = "8-4";
        this.$store.commit(
          "headerTit",
          `设置 / <span style="color: #515a61;
        font-weight: 700;">轮播图列表</span>`
        );
      } else if (to.path == "/Shezhi/Kaipinyeshezhi") {
        this.menuActiveIndex = "8-5";
        this.$store.commit(
          "headerTit",
          `设置 / <span style="color: #515a61;
        font-weight: 700;">开屏页设置</span>`
        );
      } else if (to.path == "/Shezhi/Shujuzhongxin") {
        this.menuActiveIndex = "8-6";
        this.$store.commit(
          "headerTit",
          `设置 / <span style="color: #515a61;
        font-weight: 700;">数据中心</span>`
        );
      } else if (to.path == "/Shezhi/Chengshiliebiao") {
        this.menuActiveIndex = "8-7";
        this.$store.commit(
          "headerTit",
          `设置 / <span style="color: #515a61;
        font-weight: 700;">城市列表</span>`
        );
      } else if (to.path == "/Wenzhang/Wenzhangliebiao") {
        this.menuActiveIndex = "9-1";
        this.$store.commit(
          "headerTit",
          `文章 / <span style="color: #515a61;
        font-weight: 700;">文章列表</span>`
        );
      } else if (to.path == "/Wenzhang/Tianjiawenzhang") {
        this.$store.commit(
          "headerTit",
          `文章 / 文章列表 / <span style="color: #515a61;
        font-weight: 700;">添加/修改文章</span>`
        );
      } else if (to.path == "/Qita/Fankuiliebiao") {
        this.menuActiveIndex = "10-1";
        this.$store.commit(
          "headerTit",
          `其他 / <span style="color: #515a61;
        font-weight: 700;">反馈意见列表</span>`
        );
      } else if (to.path == "/Qita/Chengshiliebiao") {
        this.menuActiveIndex = "10-2";
        this.$store.commit(
          "headerTit",
          `其他 / <span style="color: #515a61;
        font-weight: 700;">城市列表</span>`
        );
      } else if (to.path == "/Qita/Gudingweizhi") {
        this.menuActiveIndex = "10-3";
        this.$store.commit(
          "headerTit",
          `其他 / <span style="color: #515a61;
        font-weight: 700;">固定位置列表</span>`
        );
      } else if (to.path == "/Qita/Gudingweizhishangping") {
        this.menuActiveIndex = "10-4";
        this.$store.commit(
          "headerTit",
          `其他 / <span style="color: #515a61;
        font-weight: 700;">固定位置商品列表</span>`
        );
      } else if (to.path == "/Qita/Jiangpingliebiao") {
        this.menuActiveIndex = "10-5";
        this.$store.commit(
          "headerTit",
          `其他 / <span style="color: #515a61;
        font-weight: 700;">奖品列表</span>`
        );
      } else if (to.path == "/Qita/Zhongjiangliebiao") {
        this.menuActiveIndex = "10-6";
        this.$store.commit(
          "headerTit",
          `其他 / <span style="color: #515a61;
        font-weight: 700;">中奖列表</span>`
        );
      } else if (to.path == "/Kefu/WebSocket") {
        this.menuActiveIndex = "11-1";
        this.$store.commit(
          "headerTit",
          `客服 / <span style="color: #515a61;
        font-weight: 700;">聊天室</span>`
        );
      }
    }
  },
  data() {
    return {
      activeIndex: 0,
      menuActiveIndex: "",
      userInfo: null,
      isCollapse: false
    };
  },
  methods: {
    myisColl() {
      this.isCollapse = !this.isCollapse;
    },
    loginOut() {
      sessionStorage.setItem("token", null);
      sessionStorage.setItem("isLogin", null);
      this.$router.go(0);
      this.$router.push({ path: "/login" });
    }
  }
};
</script>

<style lang="scss" scoped>
.aside {
  .menu {
    /deep/ .el-menu {
      border-right: 0px;
    }
    /deep/ .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 200px;
    }
    .myisCollBtn {
      margin-top: 10px;
      display: flex;
      justify-content: center;
    }
  }
}
/deep/ .el-badge.item {
  sup {
    transform: translate(20px, 14px);
  }
}
</style>