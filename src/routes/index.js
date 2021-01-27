import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
//导入vue组件
import login from '../components/login'
import start from '../components/start'
import home from '../components/start/components/home'
//
import enterpriselist from '../components/core/enterprise/list'
import devicelist from '../components/data/wechat/device/list'
//
Vue.use(VueRouter)

//设置静态路由
const router = new VueRouter({
    routes: [{
        path: '/login', component: login, name: 'login', hidden: true
    },
    {
        path: '/start', component: start, name: 'start', hidden: true,
        children: [
            { path: 'home', component: home, name: 'home' }
        ]
    },
    {
        path: '/core', component: start, name: 'core', title: '核心数据管理',
        children: [
            { path: 'enterprise', component: enterpriselist, name: 'enterpriselist', title: '企业管理' }
        ]
    },
        {
            path: '/data', component: start, name: 'data', title: '数据跟踪',
            children: [
                { path: 'wechat/device', component: devicelist, name: 'devicelist', title: '用户数据分析' }
            ]
        }
        ,
    {
        path: '/enterprise', component: start, name: 'enterprise', title: '企业数据管理'
    }
    ]
})
//设置全局路由卫士，拦截操作判断用户是否已认证
router.beforeEach((to, from, next) => {
    if (to.name !== 'login' && !store.state.user.isAuthenticated) next({ name: 'login' })
    else {
        //可在此动态加载动态路由信息，并添加到路由对象中
        next()
    }
})
export default router

