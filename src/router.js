import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
Vue.config.productionTip = false;


const routes = [{
        path: '/',
        name: 'Home',
        component: () => import('./components/Home'),
        children: [{
            path: 'Shouye',
            name: 'Shouye',
            component: () => import('./components/Home/Shouye'),
        }, ]
    }, {
        path: '/Huiyuan',
        name: 'Huiyuan',
        component: () => import('./components/Huiyuan'),
        children: [{
            path: 'Huiyuanguanli',
            name: 'Huiyuanguanli',
            component: () => import('./components/Huiyuan/Huiyuanguanli'),
        }, ]
    },
    {
        path: '/Shenhe',
        name: 'Shenhe',
        component: () => import('./components/Shenhe'),
        children: [{
            path: 'Zhiweiguanli',
            name: 'Zhiweiguanli',
            component: () => import('./components/Shenhe/Zhiweiguanli'),
        }, {
            path: 'Mingpianguanli',
            name: 'Mingpianguanli',
            component: () => import('./components/Shenhe/Mingpianguanli'),
        }, ]
    },
    {
        path: '/Shangpin',
        name: 'Shangpin',
        component: () => import('./components/Shangpin'),
        children: [{
            path: 'Shangpinguanli',
            name: 'Shangpinguanli',
            component: () => import('./components/Shangpin/Shangpinguanli'),
        }, {
            path: 'Tianjiashangping',
            name: 'Tianjiashangping',
            component: () => import('./components/Shangpin/Tianjiashangping'),
        }, {
            path: 'Tianjiajifenshangping',
            name: 'Tianjiajifenshangping',
            component: () => import('./components/Shangpin/Tianjiajifenshangping'),
        }, {
            path: 'Shangpingfenlei',
            name: 'Shangpingfenlei',
            component: () => import('./components/Shangpin/Shangpingfenlei'),
        }, {
            path: 'Shangpingpinglun',
            name: 'Shangpingpinglun',
            component: () => import('./components/Shangpin/Shangpingpinglun'),
        }, {
            path: 'Yunfeimoban',
            name: 'Yunfeimoban',
            component: () => import('./components/Shangpin/Yunfeimoban'),
        }, {
            path: 'Jifenshangpinguanli',
            name: 'Jifenshangpinguanli',
            component: () => import('./components/Shangpin/Jifenshangpinguanli'),
        }, ]
    }, {
        path: '/Dingdan',
        name: 'Dingdan',
        component: () => import('./components/Dingdan'),
        children: [{
            path: 'Dingdanguanli',
            name: 'Dingdanguanli',
            component: () => import('./components/Dingdan/Dingdanguanli'),
        }, {
            path: 'ShopDingdanguanli',
            name: 'ShopDingdanguanli',
            component: () => import('./components/Dingdan/ShopDingdanguanli'),
        }]
    }, {
        path: '/Wenzhang',
        name: 'Wenzhang',
        component: () => import('./components/Wenzhang'),
        children: [{
            path: 'Wenzhangliebiao',
            name: 'Wenzhangliebiao',
            component: () => import('./components/Wenzhang/Wenzhangliebiao'),
        }, {
            path: 'Tianjiawenzhang',
            name: 'Tianjiawenzhang',
            component: () => import('./components/Wenzhang/Tianjiawenzhang'),
        }]
    }, {
        path: '/Yingxiao',
        name: 'Yingxiao',
        component: () => import('./components/Yingxiao'),
        children: [{
            path: 'Pingtuanshangping',
            name: 'Pingtuanshangping',
            component: () => import('./components/Yingxiao/Pingtuanshangping'),
        }, {
            path: 'Tianjiapingtuanshangping',
            name: 'Tianjiapingtuanshangping',
            component: () => import('./components/Yingxiao/Tianjiapingtuanshangping'),
        }, {
            path: 'Pingtuanliebiao',
            name: 'Pingtuanliebiao',
            component: () => import('./components/Yingxiao/Pingtuanliebiao'),
        }, {
            path: 'Maichanghuodong',
            name: 'Maichanghuodong',
            component: () => import('./components/Yingxiao/Maichanghuodong'),
        }, {
            path: 'Jishouliebiao',
            name: 'Jishouliebiao',
            component: () => import('./components/Yingxiao/Jishouliebiao'),
        }, {
            path: 'Pingtuanjilu',
            name: 'Pingtuanjilu',
            component: () => import('./components/Yingxiao/Pingtuanjilu'),
        }, ]
    }, {
        path: '/Yonghu',
        name: 'Yonghu',
        component: () => import('./components/Yonghu'),
        children: [{
            path: 'Yonghuguanli',
            name: 'Yonghuguanli',
            component: () => import('./components/Yonghu/Yonghuguanli'),
        }, {
            path: 'Gongjinshangguanli',
            name: 'Gongjinshangguanli',
            component: () => import('./components/Yonghu/Gongjinshangguanli'),
        }, {
            path: 'Shenheliebiao',
            name: 'Shenheliebiao',
            component: () => import('./components/Yonghu/Shenheliebiao'),
        }, {
            path: 'Shifuguanli',
            name: 'Shifuguanli',
            component: () => import('./components/Yonghu/Shifuguanli'),
        }, {
            path: 'Lianghaoliebiao',
            name: 'Lianghaoliebiao',
            component: () => import('./components/Yonghu/Lianghaoliebiao'),
        }, {
            path: 'Tixianliebiao',
            name: 'Tixianliebiao',
            component: () => import('./components/Yonghu/Tixianliebiao'),
        }]
    }, {
        path: '/Fenxiao',
        name: 'Fenxiao',
        component: () => import('./components/Fenxiao'),
        children: [{
            path: 'Fenxiaoshezhi',
            name: 'Fenxiaoshezhi',
            component: () => import('./components/Fenxiao/Fenxiaoshezhi'),
        }, ]
    }, {
        path: '/Zhiding',
        name: 'Zhiding',
        component: () => import('./components/Zhiding'),
        children: [{
            path: 'Zhidingzhiwei',
            name: 'Zhidingzhiwei',
            component: () => import('./components/Zhiding/Zhidingzhiwei'),
        }, ]
    }, {
        path: '/Caiwu',
        name: 'Caiwu',
        component: () => import('./components/Caiwu'),
        children: [{
            path: 'Tixianshenqing',
            name: 'Tixianshenqing',
            component: () => import('./components/Caiwu/Tixianshenqing'),
        }, {
            path: 'Yongjinjilu',
            name: 'Yongjinjilu',
            component: () => import('./components/Caiwu/Yongjinjilu'),
        }, ]
    }, {
        path: '/Xieyi',
        name: 'Xieyi',
        component: () => import('./components/Xieyi'),
        children: [{
            path: 'Pingtaixieyi',
            name: 'Pingtaixieyi',
            component: () => import('./components/Xieyi/Pingtaixieyi'),
        }, {
            path: 'Yinsizhengce',
            name: 'Yinsizhengce',
            component: () => import('./components/Xieyi/Yinsizhengce'),
        }, ]
    }, {
        path: '/Qita',
        name: 'Qita',
        component: () => import('./components/Qita'),
        children: [{
            path: 'Fankuiliebiao',
            name: 'Fankuiliebiao',
            component: () => import('./components/Qita/Fankuiliebiao'),
        }, {
            path: 'Chengshiliebiao',
            name: 'Chengshiliebiao',
            component: () => import('./components/Qita/Chengshiliebiao'),
        }, {
            path: 'Gudingweizhi',
            name: 'Gudingweizhi',
            component: () => import('./components/Qita/Gudingweizhi'),
        }, {
            path: 'Gudingweizhishangping',
            name: 'Gudingweizhishangping',
            component: () => import('./components/Qita/Gudingweizhishangping'),
        }, {
            path: 'Jiangpingliebiao',
            name: 'Jiangpingliebiao',
            component: () => import('./components/Qita/Jiangpingliebiao'),
        }, {
            path: 'Zhongjiangliebiao',
            name: 'Zhongjiangliebiao',
            component: () => import('./components/Qita/Zhongjiangliebiao'),
        }, ]
    }, {
        path: '/Shezhi',
        name: 'Shezhi',
        component: () => import('./components/Shezhi'),
        children: [{
            path: 'Baoleixin',
            name: 'Baoleixin',
            component: () => import('./components/Shezhi/Baoleixin'),
        },{
            path: 'Huiyuanleixin',
            name: 'Huiyuanleixin',
            component: () => import('./components/Shezhi/Huiyuanleixin'),
        }, {
            path: 'Zhidingleixin',
            name: 'Zhidingleixin',
            component: () => import('./components/Shezhi/Zhidingleixin'),
        }, {
            path: 'Xiaoxiguanli',
            name: 'Xiaoxiguanli',
            component: () => import('./components/Shezhi/Xiaoxiguanli'),
        }, {
            path: 'Zhanghaoguanli',
            name: 'Zhanghaoguanli',
            component: () => import('./components/Shezhi/Zhanghaoguanli'),
        }, {
            path: 'Guanjianci',
            name: 'Guanjianci',
            component: () => import('./components/Shezhi/Guanjianci'),
        }, {
            path: 'Qitashezhi',
            name: 'Qitashezhi',
            component: () => import('./components/Shezhi/Qitashezhi'),
        }, {
            path: 'Lunbotushezhi',
            name: 'Lunbotushezhi',
            component: () => import('./components/Shezhi/Lunbotushezhi'),
        }, {
            path: 'Lunbotuliebiao',
            name: 'Lunbotuliebiao',
            component: () => import('./components/Shezhi/Lunbotuliebiao'),
        }, {
            path: 'Kaipinyeshezhi',
            name: 'Kaipinyeshezhi',
            component: () => import('./components/Shezhi/Kaipinyeshezhi'),
        }, {
            path: 'Shujuzhongxin',
            name: 'Shujuzhongxin',
            component: () => import('./components/Shezhi/Shujuzhongxin'),
        }, {
            path: 'Fapiaoguize',
            name: 'Fapiaoguize',
            component: () => import('./components/Shezhi/Fapiaoguize'),
        }]
    }
]

const router = new VueRouter({
    mode: 'hash',
    routes,
})


export default router