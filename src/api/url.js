export default {
    // 线上地址 http://car_admin.5laoye.com/ 账号和密码都是admin
    // 千龙后台
    // baseUrl: 'http://101.34.36.105:8090/',
    // baseUrl: 'https://manager.nmwzp.cn',
    baseUrl: 'api',
    login: '/auth/login', //登录
    getUserList: '/muser/getUserList', //电话筛选用户
    muserGetAll: '/muser/getAll', //	查询用户列表
    muserMaddUser: '/muser/maddUser', //添加用户
    mvipGetVIPTypeAll: '/mvip/getVIPTypeAll', //会员列表
    mvipUpdateVIPType:'/mvip/updateVIPType',//修改会员类型
    mvipUpdateUser: '/mvip/updateUser', //修改会员
    mvipAddUser: '/mvip/addUser', //	添加会员
    morderGetUserOrders: '/morder/getUserOrders', //查询用户订单
    financeYearIncome: '/finance/yearIncome', //统计年收入
    financeMonthIncome: '/finance/monthIncome', //统计月收入
    financeTotalIncome: '/finance/totalIncome', //统计总收入
    countCountCard:'/count/countCard',//统计名片
    countCountJob:'/count/countJob',//统计职位
    countCountUser:'/count/countUser',//统计用户
    getMyCardOrJob:'/muser/getMyCardOrJob',//查看用户的发帖记录
    getUnCheckCard:'/check/getUnCheckCard',//查询未审核的卡片
    getUnCheckJob:'/check/getUnCheckJob',//查询未审核的职位
    checkCard:'/check/checkCard',//审核名片
    checkJob:'/check/checkJob',//审核职位
    getOrders:'/morder/getOrders',//	订单列表
    getList:'/agreement/getList',//	查看协议列表
    update:'/agreement/update',//修改协议
    agreementGetDetail:'/agreement/getDetail',//查看协议详情
    mjobTopAdd:'/mjobTop/add',//添加置顶职位
    mjobTopGetJobTopInfo:'/mjobTop/getJobTopInfo',//查询置顶信息
    mjobTopUpdateJobTop:'/mjobTop/updateJobTop',//修改置顶职位
    mjobTopDelete:'/mjobTop/delete',//删除置顶职位
    getManagerList:'/manager/getManagerList',//	管理员列表
    getProvince:'/md/getProvince',//查询省份
    getDistricts:'/md/getDistricts',//查询子区域
    managerCreate:'/manager/create',//创建管理员
    authAuthArea:'/auth/authArea',//分配区域权限
    authAward:'/auth/award',//授予管理员权限
    authGetDisAuth:'/auth/getDisAuth',//查询区域权限
    managerGetManagerPower:'/manager/getManagerPower',//	查询管理员权限信息
    authDeleteAuthArea:'/auth/deleteAuthArea',//删除区域权限
    managerUpdate:'/manager/update',//修改管理员
    managerDelete:'/manager/delete',//删除管理员
    jobTopTypeGetList:'/jobTopType/getList',//查询置顶类型信息
    jobTopTypeUpdateJobTpe:'/jobTopType/updateJobTpe',//修改置顶类型信息
    jobTopTypeRefresh:'/jobTopType/refresh',//刷新包列表
    jobTopTypeUpRefresh:'/jobTopType/up-refresh',//修改刷新包信息
}