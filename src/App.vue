<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
/**
 * vue.js编程式导航要求
 * 1、首先导入路由类型
 * import VueRouter from 'vue-router'
 * 2导入嵌套由配置信息
 * import levelRoutes from './routes/level'
 * 3启动路由
 * Vue.use(VueRouter)
 * 4生成路由对象
 * const router = new VueRouter({
 * routes: levelRoutes//应用动态路由
 * })
 * 5注入路由对象到vue对象上下文中
 * new Vue({
 *  router,
 *  render: h => h(App),
 * }).$mount('#app')
 * 6编写程序进行导航
 * 7注意，使用name进行导航时要在路由配置中配置name。
 * 不配置则无法导航且在控制台提示name无效的警告
 * 如下：
 * const levelRoutes = [{
 *   path: '/user/:id', component: User,
 *   name:'User'}]
 */
//import { mapState } from "vuex";

export default {
  name: "App"
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
