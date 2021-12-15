import axios from 'axios';
import Vue from 'vue'
import router from '../router.js';
import urls from './url.js';
const vue = new Vue()
axios.defaults.headers['Content-Type'] = "application/json;charset=UTF-8";
let myPost = axios.create({
    baseURL: urls.baseUrl,
    method: 'post',
})
let myGet = axios.create({
    baseURL: urls.baseUrl,
    method: 'get',
})
let myDelete = axios.create({
    baseURL: urls.baseUrl,
    method: 'delete',
})
let myPut = axios.create({
    baseURL: urls.baseUrl,
    method: 'put',
})

myPut.interceptors.request.use(config => {
    if (sessionStorage.getItem("token")) {
        config.headers = {
            // 'X-Token': sessionStorage.getItem("token"),
            'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
        }
    }
    return config;
}, error => {
    console.log(error);
    return Promise.reject();
})
myDelete.interceptors.request.use(config => {
    if (sessionStorage.getItem("token")) {
        config.headers = {
            // 'X-Token': sessionStorage.getItem("token"),
            'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
            // 'Access-Control-Allow-Origin': '*',
            // "access-control-allow-credentials": "true"
        }
    }
    return config;
}, error => {
    console.log(error);
    return Promise.reject();
})
myPost.interceptors.request.use(config => {
    if (sessionStorage.getItem("token")) {
        config.headers = {
            // 'X-Token': sessionStorage.getItem("token"),
            'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
        }
    }
    return config;
}, error => {
    console.log(error);
    return Promise.reject();
})

myGet.interceptors.request.use(config => {
    if (sessionStorage.getItem("token")) {
        config.headers = {
            'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
        }
    }
    return config;
}, error => {
    console.log(error);
    return Promise.reject();
})
myPost.interceptors.response.use(response => {
    // console.log(response)
    if (response.status >= 200 && response.status <= 300) {
        return response
    }
    // if (response.status === 200 && response.data.code == '200') {
    //     vue.$message({
    //         message: response.data.msg,
    //         type: "success",
    //     });
    //     return response.data;
    // }
    else {
        vue.$message.error(response.data.info);
        Promise.reject();
    }
}, error => {
    //错误跳转
    console.log(error)
    if (error.response.status === 500) {
        console.log(vue)
        if (error.response.data.info != '参数错误') {
            vue.$message.error(error.response.data.message);
        }
    } else if (error.response.status === 401) {
        sessionStorage.setItem("isLogin", false);
        console.log(sessionStorage.getItem("isLogin"));
        router.push({
            path: "/"
        })
        router.go(0)
        return Promise.reject();
    } else if (error.response.status === 404) {
        vue.$alert('页面不存在', '404错误', {
            confirmButtonText: '确定',
        });
        return Promise.reject();
    } else if (error.response.status === 402) {
        vue.$alert('请求次数限制', '402错误', {
            confirmButtonText: '确定',
        });
        return Promise.reject();
    } else {
        vue.$message.error(error.response.data.message);
    }
})
myGet.interceptors.response.use(response => {
    if (response.status >= 200 && response.status <= 300) {
        return response
    }
    // if (response.status === 200 && response.data.code == '200') {
    //     vue.$message({
    //         message: response.data.msg,
    //         type: "success",
    //     });
    //     return response.data;
    // }
    else {
        vue.$message.error(response.data.info);
        Promise.reject();
    }
}, error => {
    //错误跳转
    console.log(error);
    if (error.response.status === 500) {
        if (error.response.data.info != '参数错误') {
            vue.$message.error(error.response.data.message);
        }
    } else if (error.response.status === 401) {
        sessionStorage.setItem("isLogin", false);
        console.log(sessionStorage.getItem("isLogin"));
        router.push({
            path: "/"
        })
        router.go(0)
        return Promise.reject();
    } else if (error.response.status === 404) {
        vue.$alert('页面不存在', '404错误', {
            confirmButtonText: '确定',
        });
        return Promise.reject();
    } else if (error.response.status === 402) {
        vue.$alert('请求次数限制', '402错误', {
            confirmButtonText: '确定',
        });
        return Promise.reject();
    } else {
        vue.$message.error(error.response.data.message);
    }
})
myPut.interceptors.response.use(response => {
    // console.log(response)
    if (response.status >= 200 && response.status <= 300) {
        return response
    }
    // if (response.status === 200 && response.data.code == '200') {
    //     vue.$message({
    //         message: response.data.msg,
    //         type: "success",
    //     });
    //     return response.data;
    // }
    else {
        vue.$message.error(response.data.info);
        Promise.reject();
    }
}, error => {
    //错误跳转
    console.log(error)
    if (error.response.status === 500) {
        console.log(vue)
        if (error.response.data.info != '参数错误') {
            vue.$message.error(error.response.data.message);
        }
    } else if (error.response.status === 401) {
        sessionStorage.setItem("isLogin", false);
        console.log(sessionStorage.getItem("isLogin"));
        router.push({
            path: "/"
        })
        router.go(0)
        return Promise.reject();
    } else if (error.response.status === 404) {
        vue.$alert('页面不存在', '404错误', {
            confirmButtonText: '确定',
        });
        return Promise.reject();
    } else if (error.response.status === 402) {
        vue.$alert('请求次数限制', '402错误', {
            confirmButtonText: '确定',
        });
        return Promise.reject();
    } else {
        vue.$message.error(error.response.data.message);
    }
})
myDelete.interceptors.response.use(response => {
    // console.log(response)
    if (response.status >= 200 && response.status <= 300) {
        return response
    }
    // if (response.status === 200 && response.data.code == '200') {
    //     vue.$message({
    //         message: response.data.msg,
    //         type: "success",
    //     });
    //     return response.data;
    // }
    else {
        vue.$message.error(response.data.info);
        Promise.reject();
    }
}, error => {
    //错误跳转
    console.log(error)
    if (error.response.status === 500) {
        console.log(vue)
        if (error.response.data.info != '参数错误') {
            vue.$message.error(error.response.data.message);
        }
    } else if (error.response.status === 401) {
        sessionStorage.setItem("isLogin", false);
        console.log(sessionStorage.getItem("isLogin"));
        router.push({
            path: "/"
        })
        router.go(0)
        return Promise.reject();
    } else if (error.response.status === 404) {
        vue.$alert('页面不存在', '404错误', {
            confirmButtonText: '确定',
        });
        return Promise.reject();
    } else if (error.response.status === 402) {
        vue.$alert('请求次数限制', '402错误', {
            confirmButtonText: '确定',
        });
        return Promise.reject();
    } else {
        vue.$message.error(error.response.data.message);
    }
})

export default {
    login(obj) {
        return myPost({
            url: urls.login,
            data: {
                ...obj
            }
        })
    },
    users(obj) {
        return myGet({
            url: urls.users,
            params: {
                ...obj
            }
        })
    },
    updateUsers(obj, id) {
        return myPut({
            url: `${urls.users}/${id}`,
            data: {
                ...obj
            }
        })
    },
    usersIdMoneyRecords(obj) {
        return myGet({
            url: `${urls.usersIdMoneyRecords}/${obj.id}/money-records`,
            params: {
                ...obj
            }
        })
    },
    categories(obj) {
        return myGet({
            url: urls.categories,
            params: {
                ...obj
            }
        })
    },
    addCategories(obj) {
        return myPost({
            url: urls.addCategories,
            data: {
                ...obj
            }
        })
    },
    updateCategories(obj, id) {
        return myPut({
            url: `${urls.updateCategories}/${id}`,
            data: {
                ...obj
            }
        })
    },
    area(obj) {
        return myGet({
            url: urls.area,
            params: {
                ...obj
            }
        })
    },
    items(obj) {
        return myGet({
            url: urls.items,
            params: {
                ...obj
            }
        })
    },
    scoreItems(obj) {
        return myGet({
            url: urls.scoreItems,
            params: {
                ...obj
            }
        })
    },
    addScoreItems(obj) {
        return myPost({
            url: urls.scoreItems,
            data: {
                ...obj
            }
        })
    },
    postage(obj) {
        return myGet({
            url: urls.postage,
            params: {
                ...obj
            }
        })
    },
    addPostage(obj) {
        return myPost({
            url: urls.postage,
            data: {
                ...obj
            }
        })
    },
    upDatePostage(obj, id) {
        return myPut({
            url: `${urls.postage}/${id}`,
            data: {
                ...obj
            }
        })
    },
    deletePostage(id) {
        return myDelete({
            url: `${urls.postage}/${id}`,
        })
    },
    upDateScoreItems(obj, id) {
        return myPut({
            url: `${urls.scoreItems}/${id}`,
            data: {
                ...obj
            }
        })
    },
    deleteScoreItems(id) {
        return myDelete({
            url: `${urls.scoreItems}/${id}`,
        })
    },
    addItems(obj) {
        return myPost({
            url: urls.items,
            data: {
                ...obj
            }
        })
    },
    upDateItems(obj, id) {
        return myPut({
            url: `${urls.items}/${id}`,
            data: {
                ...obj
            }
        })
    },
    deleteItems(id) {
        return myDelete({
            url: `${urls.items}/${id}`,
        })
    },
    scoreItemSku(obj) {
        return myGet({
            url: urls.scoreItemSku,
            params: {
                ...obj
            }
        })
    },
    addScoreItemSku(obj) {
        return myPost({
            url: urls.scoreItemSku,
            data: {
                ...obj
            }
        })
    },
    deleteScoreItemSku(id) {
        return myDelete({
            url: `${urls.scoreItemSku}/${id}`,
        })
    },
    upDateScoreItemSku(obj, id) {
        return myPut({
            url: `${urls.scoreItemSku}/${id}`,
            data: {
                ...obj
            }
        })
    },
    uploadToken() {
        return myGet({
            url: urls.uploadToken,
        })
    },
    idCards(obj, id) {
        return myPut({
            url: `${urls.idCards}/${id}`,
            data: {
                ...obj
            }
        })
    },
    demandQuotes(obj) {
        return myGet({
            url: urls.demandQuotes,
            params: {
                ...obj
            }
        })
    },
    ordersId(obj, id) {
        return myPut({
            url: `${urls.ordersId}/${id}`,
            data: {
                ...obj
            }
        })
    },
    afterSaleStatus(id) {
        return myGet({
            url: `${urls.afterSaleStatus}/${id}`,
        })
    },
    search_itemkeyslist(obj) {
        return myGet({
            url: urls.search_itemkeyslist,
            params: {
                ...obj
            }
        })
    },
    articles(obj) {
        return myGet({
            url: urls.articles,
            params: {
                ...obj
            }
        })
    },
    search_itemkeys(obj) {
        return myPost({
            url: urls.search_itemkeys,
            data: {
                ...obj
            }
        })
    },
    delSearch_itemkeys(id) {
        return myDelete({
            url: `${urls.search_itemkeys}/${id}`,
        })
    },
    addArticles(obj) {
        return myPost({
            url: urls.articles,
            data: {
                ...obj
            }
        })
    },
    userexamineList(obj) {
        return myGet({
            url: urls.userexamineList,
            params: {
                ...obj
            }
        })
    },
    userexamine(obj, id) {
        return myPut({
            url: `${urls.userexamine}/${id}`,
            data: {
                ...obj
            }
        })
    },
    delUserexamine(id) {
        return myGet({
            url: `${urls.userexamine}/${id}/cancel`,
        })
    },
    supplier(obj) {
        return myGet({
            url: urls.supplier,
            params: {
                ...obj
            }
        })
    },
    addSupplier(obj) {
        return myPost({
            url: urls.supplier,
            data: {
                ...obj
            }
        })
    },
    upDateSupplier(obj, id) {
        return myPut({
            url: `${urls.supplier}/${id}`,
            data: {
                ...obj
            }
        })
    },
    deleteSupplier(id) {
        return myDelete({
            url: `${urls.supplier}/${id}`,
        })
    },
    supplierIdOelist(obj, id) {
        return myGet({
            url: `${urls.supplierIdOelist}/${id}/oelist`,
            params: {
                ...obj
            }
        })
    },
    addSupplierIdOelist(obj, id) {
        return myPost({
            url: `${urls.supplierIdOelist}/${id}/addoe`,
            data: {
                ...obj
            }
        })
    },
    upDateSupplierIdOelist(obj, id) {
        return myPost({
            url: `${urls.supplierIdOelist}/${id}/updateoe`,
            data: {
                ...obj
            }
        })
    },
    deleteSupplierIdOelist(obj, id) {
        return myGet({
            url: `${urls.supplierIdOelist}/${id}/deloe`,
            params: {
                ...obj
            }
        })
    },
    statistics(obj) {
        return myGet({
            url: urls.statistics,
            params: {
                ...obj
            }
        })
    },
    upDateArticles(obj, id) {
        return myPut({
            url: `${urls.articles}/${id}`,
            data: {
                ...obj
            }
        })
    },
    deleteArticles(id) {
        return myDelete({
            url: `${urls.articles}/${id}`,
        })
    },
    scoreRule(obj) {
        return myPut({
            url: `${urls.scoreRule}`,
            data: {
                ...obj
            }
        })
    },
    manage_limit() {
        return myGet({
            url: urls.manage_limit,
        })
    },
    manage_list(obj) {
        return myGet({
            url: urls.manage_list,
            params: {
                ...obj
            }
        })
    },
    manage_add(obj) {
        return myPost({
            url: urls.manage_add,
            data: {
                ...obj
            }
        })
    },
    itemsSearch_oe(obj) {
        return myPost({
            url: urls.itemsSearch_oe,
            data: {
                ...obj
            }
        })
    },
    getScoreRule() {
        return myGet({
            url: urls.scoreRule,
        })
    },
    billRule(obj) {
        return myPut({
            url: `${urls.billRule}`,
            data: {
                ...obj
            }
        })
    },
    getBillRule() {
        return myGet({
            url: urls.billRule,
        })
    },
    articlesTypes() {
        return myGet({
            url: urls.articlesTypes,
        })
    },
    orders(obj) {
        return myGet({
            url: urls.orders,
            params: {
                ...obj
            }
        })
    },
    orderBillXiangqin(id) {
        return myGet({
            url: `${urls.orders}/${id}/bill`,
        })
    },
    ordersFahuo(obj, id) {
        return myPut({
            url: `${urls.orders}/${id}/delivery`,
            data: {
                ...obj
            }
        })
    },
    manage_limitview(obj) {
        return myPost({
            url: urls.manage_limitview,
            data: {
                ...obj
            }
        })
    },
    manage_del(id) {
        return myPost({
            url: `${urls.manage_del}/${id}`,
        })
    },
    manage_viewId(id) {
        return myGet({
            url: `${urls.manage_view}/${id}`,
        })
    },
    manage_update(obj,id) {
        return myPost({
            url: `${urls.manage_update}/${id}`,
            data:{
                ...obj
            }
        })
    },
    chatRooms(obj) {
        return myGet({
            url: urls.chatRooms,
            params: {
                ...obj
            }
        })
    },
    chatHistory(obj) {
        return myGet({
            url: urls.chatHistory,
            params: {
                ...obj
            }
        })
    },
    afterSale(obj) {
        return myGet({
            url: urls.afterSale,
            params: {
                ...obj
            }
        })
    },
    upDateAfterSale(obj, id) {
        return myPut({
            url: `${urls.afterSale}/${id}`,
            data: {
                ...obj
            }
        })
    },
    banners(obj) {
        return myGet({
            url: urls.banners,
            params: {
                ...obj
            }
        })
    },
    addBanners(obj) {
        return myPost({
            url: urls.banners,
            data: {
                ...obj
            }
        })
    },
    upDateBanners(obj, id) {
        return myPut({
            url: `${urls.banners}/${id}`,
            data: {
                ...obj
            }
        })
    },
    deleteBanners(id) {
        return myDelete({
            url: `${urls.banners}/${id}`,
        })
    },
    bannersPositions() {
        return myGet({
            url: urls.bannersPositions,
        })
    },
    bannersJumpTypes() {
        return myGet({
            url: urls.bannersJumpTypes,
        })
    },
    globalConfigs(obj) {
        return myGet({
            url: urls.globalConfigs,
            data: {
                ...obj
            }
        })
    },
    upDateGlobalConfigs(obj, id) {
        return myPut({
            url: `${urls.globalConfigs}/${id}`,
            data: {
                ...obj
            }
        })
    },
    areas(obj) {
        return myGet({
            url: urls.areas,
            params: {
                ...obj
            }
        })
    },
    feedbacks(obj) {
        return myGet({
            url: urls.feedbacks,
            params: {
                ...obj
            }
        })
    },
    upDatefeedbacks(obj, id) {
        return myPut({
            url: `${urls.feedbacks}/${id}`,
            data: {
                ...obj
            }
        })
    },
    withdraw(obj) {
        return myGet({
            url: urls.withdraw,
            params: {
                ...obj
            }
        })
    },
    upDateWithdraw(obj, id) {
        return myPut({
            url: `${urls.withdraw}/${id}`,
            data: {
                ...obj
            }
        })
    },
    fixedPosition(obj) {
        return myGet({
            url: urls.fixedPosition,
            params: {
                ...obj
            }
        })
    },
    positions() {
        return myGet({
            url: urls.positions,
        })
    },
    addFixedPosition(obj) {
        return myPost({
            url: urls.fixedPosition,
            data: {
                ...obj
            }
        })
    },
    upDateFixedPosition(obj, id) {
        return myPut({
            url: `${urls.fixedPosition}/${id}`,
            data: {
                ...obj
            }
        })
    },
    deleteFixedPosition(id) {
        return myDelete({
            url: `${urls.fixedPosition}/${id}`,
        })
    },
    fixedPositionItem(obj) {
        return myGet({
            url: urls.fixedPositionItem,
            params: {
                ...obj
            }
        })
    },
    addFixedPositionItem(obj) {
        return myPost({
            url: urls.fixedPositionItem,
            data: {
                ...obj
            }
        })
    },
    upDateFixedPositionItem(obj, id) {
        return myPut({
            url: `${urls.fixedPositionItem}/${id}`,
            data: {
                ...obj
            }
        })
    },
    deleteFixedPositionItem(id) {
        return myDelete({
            url: `${urls.fixedPositionItem}/${id}`,
        })
    },
    itemAll() {
        return myGet({
            url: urls.itemAll,
        })
    },
    turntableItem(obj) {
        return myGet({
            url: urls.turntableItem,
            params: {
                ...obj
            }
        })
    },
    addTurntableItem(obj) {
        return myPost({
            url: urls.turntableItem,
            data: {
                ...obj
            }
        })
    },
    upDateTurntableItem(obj, id) {
        return myPut({
            url: `${urls.turntableItem}/${id}`,
            data: {
                ...obj
            }
        })
    },
    deleteTurntableItem(id) {
        return myDelete({
            url: `${urls.turntableItem}/${id}`,
        })
    },
    awards(obj) {
        return myGet({
            url: urls.awards,
            params: {
                ...obj
            }
        })
    },
    upDateAwards(obj, id) {
        return myPut({
            url: `${urls.awards}/${id}`,
            data: {
                ...obj
            }
        })
    },
    goodsOrder(obj) {
        return myGet({
            url: urls.goodsOrder,
            params: {
                ...obj
            }
        })
    },
    goodsOrderFahuo(obj, id) {
        return myPut({
            url: `${urls.goodsOrder}/${id}/delivery`,
            data: {
                ...obj
            }
        })
    },
    // 


    productList(obj) {
        return myGet({
            url: urls.productList,
            params: {
                ...obj
            }
        })
    },
    async productUpload(image) {
        var configs = {
            headers: {
                "Content-Type": "multipart/form-data;charse=UTF-8",
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
            },
        };
        const res = await axios
            .post(`${urls.baseUrl}/admin/product/upload`, image, configs)
        return res.data
    },
    loginInfo() {
        return myGet({
            url: urls.loginInfo,
        })
    },
    categorySave(obj) {
        return myPost({
            url: urls.categorySave,
            data: {
                ...obj
            }
        })
    },
    categoryIndex(obj) {
        return myGet({
            url: urls.categoryIndex,
            params: {
                ...obj
            }
        })
    },
    productSave(obj) {
        return myPost({
            url: urls.productSave,
            data: {
                ...obj
            }
        })
    },
    categoryDel(id) {
        return myPost({
            url: urls.categoryDel,
            data: {
                id
            }
        })
    },
    productAttrs(id) {
        return myGet({
            url: urls.productAttrs,
            params: {
                id
            }
        })
    },
    productDescription(id) {
        return myGet({
            url: urls.productDescription,
            params: {
                id
            }
        })
    },
    combinationSave(obj) {
        return myPost({
            url: urls.combinationSave,
            data: {
                ...obj
            }
        })
    },
    combinationList(obj) {
        return myGet({
            url: urls.combinationList,
            params: {
                ...obj
            }
        })
    },
    combinationAttrs(id) {
        return myGet({
            url: urls.combinationAttrs,
            params: {
                id
            }
        })
    },
    combinationDescription(id) {
        return myGet({
            url: urls.combinationDescription,
            params: {
                id
            }
        })
    },
    combinationShow(obj) {
        return myPost({
            url: urls.combinationShow,
            data: {
                ...obj
            }
        })
    },
    productShow(obj) {
        return myPost({
            url: urls.productShow,
            data: {
                ...obj
            }
        })
    },
    activitySave(obj) {
        return myPost({
            url: urls.activitySave,
            data: {
                ...obj
            }
        })
    },
    activityIndex(obj) {
        return myGet({
            url: urls.activityIndex,
            params: {
                ...obj
            }
        })
    },
    activityDel(obj) {
        return myPost({
            url: urls.activityDel,
            data: {
                ...obj
            }
        })
    },
    orderIndex(obj) {
        return myGet({
            url: urls.orderIndex,
            params: {
                ...obj
            }
        })
    },
    activityAdd_product(obj) {
        return myPost({
            url: urls.activityAdd_product,
            data: {
                ...obj
            }
        })
    },
    activityList_product(obj) {
        return myGet({
            url: urls.activityList_product,
            params: {
                ...obj
            }
        })
    },
    orderDelivery(obj) {
        return myPost({
            url: urls.orderDelivery,
            data: {
                ...obj
            }
        })
    },
    activityList_gift() {
        return myGet({
            url: urls.activityList_gift,
        })
    },
    activityAdd_gift(obj) {
        return myPost({
            url: urls.activityAdd_gift,
            data: {
                ...obj
            }
        })
    },
    activityDel_gift(obj) {
        return myPost({
            url: urls.activityDel_gift,
            data: {
                ...obj
            }
        })
    },
    activityDel_cate_gift(obj) {
        return myPost({
            url: urls.activityDel_cate_gift,
            data: {
                ...obj
            }
        })
    },
    activityAdd_cate_gift(obj) {
        return myPost({
            url: urls.activityAdd_cate_gift,
            data: {
                ...obj
            }
        })
    },
    activityDel_product(obj) {
        return myPost({
            url: urls.activityDel_product,
            data: {
                ...obj
            }
        })
    },
    uniqidIndex(obj) {
        return myGet({
            url: urls.uniqidIndex,
            params: {
                ...obj
            }
        })
    },
    uniqidAdd(obj) {
        return myPost({
            url: urls.uniqidAdd,
            data: {
                ...obj
            }
        })
    },
    uniqidDel(obj) {
        return myPost({
            url: urls.uniqidDel,
            data: {
                ...obj
            }
        })
    },
    combinationAdd_product_cate(obj) {
        return myPost({
            url: urls.combinationAdd_product_cate,
            data: {
                ...obj
            }
        })
    },
    combinationList_product_cate(obj) {
        return myGet({
            url: urls.combinationList_product_cate,
            params: {
                ...obj
            }
        })
    },
    combinationDel_product_cate(obj) {
        return myPost({
            url: urls.combinationDel_product_cate,
            data: {
                ...obj
            }
        })
    },
    userIndex(obj) {
        return myGet({
            url: urls.userIndex,
            params: {
                ...obj
            }
        })
    },
    webconfigSave(obj) {
        return myPost({
            url: urls.webconfigSave,
            data: {
                ...obj
            }
        })
    },
    webconfigIndex() {
        return myGet({
            url: urls.webconfigIndex,
        })
    },
    sell_order_list(obj) {
        return myGet({
            url: urls.sell_order_list,
            params: {
                ...obj
            }
        })
    },
    confirm_sell_order(obj) {
        return myPost({
            url: urls.confirm_sell_order,
            data: {
                ...obj
            }
        })
    },
    save_shipping_templates(obj) {
        return myPost({
            url: urls.save_shipping_templates,
            data: {
                ...obj
            }
        })
    },
    list_shipping_templates(obj) {
        return myGet({
            url: urls.list_shipping_templates,
            params: {
                ...obj
            }
        })
    },
    detail_shipping_templates(obj) {
        return myGet({
            url: urls.detail_shipping_templates,
            params: {
                ...obj
            }
        })
    },
    del_shipping_templates(obj) {
        return myPost({
            url: urls.del_shipping_templates,
            data: {
                ...obj
            }
        })
    },
    dashboard() {
        return myGet({
            url: urls.dashboard,
        })
    },
    user_bill_log(obj) {
        return myGet({
            url: urls.user_bill_log,
            params: {
                ...obj
            }
        })
    },
    template_message_list(obj) {
        return myGet({
            url: urls.template_message_list,
            params: {
                ...obj
            }
        })
    },
    template_message_save(obj) {
        return myPost({
            url: urls.template_message_save,
            data: {
                ...obj
            }
        })
    },
    user_extract(obj) {
        return myGet({
            url: urls.user_extract,
            params: {
                ...obj
            }
        })
    },
    async upload_pic(image) {
        var configs = {
            headers: {
                "Content-Type": "multipart/form-data;charse=UTF-8",
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
            },
        };
        const res = await axios
            .post(`${urls.baseUrl}/admin/upload_pic`, image, configs)
        return res.data
    },
    banner_add(obj) {
        return myPost({
            url: urls.banner_add,
            data: {
                ...obj
            }
        })
    },
    banner_list(obj) {
        return myGet({
            url: urls.banner_list,
            params: {
                ...obj
            }
        })
    },
    banner_edit(obj) {
        return myPost({
            url: urls.banner_edit,
            data: {
                ...obj
            }
        })
    },
    banner_del(obj) {
        return myPost({
            url: urls.banner_del,
            data: {
                ...obj
            }
        })
    },
    open_pic_add(obj) {
        return myPost({
            url: urls.open_pic_add,
            data: {
                ...obj
            }
        })
    },
    open_pic() {
        return myGet({
            url: urls.open_pic,
        })
    },
    open_pic_edit(obj) {
        return myPost({
            url: urls.open_pic_edit,
            data: {
                ...obj
            }
        })
    },
    data_center(obj) {
        return myGet({
            url: urls.data_center,
            params: {
                ...obj
            }
        })
    },
    other_shipping_templates(obj) {
        return myGet({
            url: urls.other_shipping_templates,
            params: {
                ...obj
            }
        })
    },
    orderDel(obj) {
        return myPost({
            url: urls.orderDel,
            data: {
                ...obj
            }
        })
    },
    updat_user_info(obj) {
        return myPost({
            url: urls.updat_user_info,
            data: {
                ...obj
            }
        })
    },
    article_list(obj) {
        return myGet({
            url: urls.article_list,
            params: {
                ...obj
            }
        })
    },
    article_add(obj) {
        return myPost({
            url: urls.article_add,
            data: {
                ...obj
            }
        })
    },
    article_edit(obj) {
        return myPost({
            url: urls.article_edit,
            data: {
                ...obj
            }
        })
    },
    article_del(obj) {
        return myPost({
            url: urls.article_del,
            data: {
                ...obj
            }
        })
    },
    user_pintuan_log(obj) {
        return myGet({
            url: urls.user_pintuan_log,
            params: {
                ...obj
            }
        })
    },
    user_pintuan_count(obj) {
        return myGet({
            url: urls.user_pintuan_count,
            params: {
                ...obj
            }
        })
    },
}