//基础store配置信息
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    //0204000003
    state: {
        //多个组件中对sidebar的状态进行监听
        sidebar: {
            isOpened: true
        },
        user: {
            isAuthenticated: false,
            userName: ''
        }
    },
    getters: {
        userInfo: state => {
            return state.user
        },
        sidebar: state => {
            return state.sidebar
        }
    },
    mutations: {
        clearUserInfo(state) {
            state.user = { isAuthenticated: false, userName: '' }
        },
        setUserInfo(state, info) {
            state.user.isAuthenticated = info.isAuthenticated
            state.user.userName = info.userName
        },
        setSidebar(state,v){
            state.sidebar.isOpened = v
        }
    },
    actions: {
        userLogout({ commit }) {
            commit('clearUserInfo')
        },
        sidebarToggle({state,commit}){
            let v = state.sidebar.isOpened
            commit('setSidebar',!v)
        }
    }
})

export default store