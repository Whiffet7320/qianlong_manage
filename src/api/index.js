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
            'headerUserToken':sessionStorage.getItem("token"),
            'headerUsername':sessionStorage.getItem("username"),
            // 'X-Token': sessionStorage.getItem("token"),
            // 'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
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
            'headerUserToken':sessionStorage.getItem("token"),
            'headerUsername':sessionStorage.getItem("username"),
            // 'X-Token': sessionStorage.getItem("token"),
            // 'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
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
            'headerUserToken':sessionStorage.getItem("token"),
            'headerUsername':sessionStorage.getItem("username"),
            // 'X-Token': sessionStorage.getItem("token"),
            // 'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
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
            'headerUserToken':sessionStorage.getItem("token"),
            'headerUsername':sessionStorage.getItem("username"),
            // 'X-Token': sessionStorage.getItem("token"),
            // 'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
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
        return response.data
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
        return response.data
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
        return response.data
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
        return response.data
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
    getUserList(obj) {
        return myGet({
            url: urls.getUserList,
            params: {
                ...obj
            }
        })
    },
    muserGetAll(obj) {
        return myGet({
            url: urls.muserGetAll,
            params: {
                ...obj
            }
        })
    },
    muserMaddUser(obj) {
        return myPost({
            url: urls.muserMaddUser,
            data: {
                ...obj
            }
        })
    },
    mvipGetVIPTypeAll(obj) {
        return myGet({
            url: urls.mvipGetVIPTypeAll,
            params: {
                ...obj
            }
        })
    },
    mvipUpdateUser(obj) {
        return myPost({
            url: urls.mvipUpdateUser,
            data: {
                ...obj
            }
        })
    },
    mvipAddUser(obj) {
        return myPost({
            url: urls.mvipAddUser,
            data: {
                ...obj
            }
        })
    },
    morderGetUserOrders(obj) {
        return myGet({
            url: urls.morderGetUserOrders,
            params: {
                ...obj
            }
        })
    },
    financeYearIncome(obj) {
        return myGet({
            url: urls.financeYearIncome,
            params: {
                ...obj
            }
        })
    },
    financeMonthIncome(obj) {
        return myGet({
            url: urls.financeMonthIncome,
            params: {
                ...obj
            }
        })
    },
    financeTotalIncome() {
        return myGet({
            url: urls.financeTotalIncome,
        })
    },
    countCountCard() {
        return myGet({
            url: urls.countCountCard,
        })
    },
    countCountJob() {
        return myGet({
            url: urls.countCountJob,
        })
    },
    countCountUser() {
        return myGet({
            url: urls.countCountUser,
        })
    },
    getMyCardOrJob(obj) {
        return myPost({
            url: urls.getMyCardOrJob,
            data: {
                ...obj
            }
        })
    },
    getUnCheckJob(obj) {
        return myGet({
            url: urls.getUnCheckJob,
            params: {
                ...obj
            }
        })
    },
    getUnCheckCard(obj) {
        return myGet({
            url: urls.getUnCheckCard,
            params: {
                ...obj
            }
        })
    },
    checkCard(obj) {
        return myPost({
            url: urls.checkCard,
            params: {
                ...obj
            }
        })
    },
    checkJob(obj) {
        return myPost({
            url: urls.checkJob,
            params: {
                ...obj
            }
        })
    },
    getOrders(obj) {
        return myPost({
            url: urls.getOrders,
            data: {
                ...obj
            }
        })
    },
    jobTopTypeGetList(obj) {
        return myGet({
            url: urls.jobTopTypeGetList,
            params: {
                ...obj
            }
        })
    },
    jobTopTypeRefresh(obj) {
        return myGet({
            url: urls.jobTopTypeRefresh,
            params: {
                ...obj
            }
        })
    },
    jobTopTypeUpdateJobTpe(obj) {
        return myPost({
            url: urls.jobTopTypeUpdateJobTpe,
            data: {
                ...obj
            }
        })
    },
    jobTopTypeUpRefresh(obj) {
        return myPost({
            url: urls.jobTopTypeUpRefresh,
            data: {
                ...obj
            }
        })
    },
    mvipUpdateVIPType(obj) {
        return myPost({
            url: urls.mvipUpdateVIPType,
            data: {
                ...obj
            }
        })
    },

    getList(obj) {
        return myGet({
            url: urls.getList,
            params: {
                ...obj
            }
        })
    },
    update(obj) {
        return myPost({
            url: urls.update,
            data: {
                ...obj
            }
        })
    },
    agreementGetDetail(obj) {
        return myGet({
            url: urls.agreementGetDetail,
            params: {
                ...obj
            }
        })
    },
    mjobTopAdd(obj) {
        return myPost({
            url: urls.mjobTopAdd,
            data: {
                ...obj
            }
        })
    },
    mjobTopGetJobTopInfo(obj) {
        return myGet({
            url: urls.mjobTopGetJobTopInfo,
            params: {
                ...obj
            }
        })
    },
    mjobTopUpdateJobTop(obj) {
        return myPost({
            url: urls.mjobTopUpdateJobTop,
            data: {
                ...obj
            }
        })
    },
    mjobTopDelete(obj) {
        return myPost({
            url: urls.mjobTopDelete,
            params: {
                ...obj
            }
        })
    },
    getManagerList(obj) {
        return myGet({
            url: urls.getManagerList,
            params: {
                ...obj
            }
        })
    },
    getProvince(obj) {
        return myGet({
            url: urls.getProvince,
            params: {
                ...obj
            }
        })
    },
    getDistricts(obj) {
        return myGet({
            url: urls.getDistricts,
            params: {
                ...obj
            }
        })
    },
    managerCreate(obj) {
        return myPost({
            url: urls.managerCreate,
            data: {
                ...obj
            }
        })
    },
    authAuthArea(obj) {
        return myPost({
            url: urls.authAuthArea,
            data: {
                ...obj
            }
        })
    },
    authAward(obj) {
        return myPost({
            url: urls.authAward,
            data: {
                ...obj
            }
        })
    },
    authGetDisAuth(obj) {
        return myGet({
            url: urls.authGetDisAuth,
            params: {
                ...obj
            }
        })
    },
    managerGetManagerPower(obj) {
        return myGet({
            url: urls.managerGetManagerPower,
            params: {
                ...obj
            }
        })
    },
    authDeleteAuthArea(obj) {
        return myPost({
            url: urls.authDeleteAuthArea,
            data: {
                ...obj
            }
        })
    },
    managerUpdate(obj) {
        return myPost({
            url: urls.managerUpdate,
            data: {
                ...obj
            }
        })
    },
    managerDelete(obj) {
        return myPost({
            url: urls.managerDelete,
            params: {
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
}