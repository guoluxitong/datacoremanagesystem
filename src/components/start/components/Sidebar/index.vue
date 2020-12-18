<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      mode="vertical"
      background-color="#e3e7ec"
      text-color="#000000"
      active-text-color="#2a579a"
    >
      <template v-for="(item, index) in menuItems">
        <template v-if="item.children">
          <el-submenu :index="index + ''" :key="index">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{ item.title }}</span>
            </template>
            <el-menu-item
              v-for="(s, i) in item.children"
              :index="index + '-' + i"
              :key="i"
              ><router-link :to="s.path">{{ s.title }}</router-link>
            </el-menu-item>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="index + ''" :key="index">
            <router-link :to="item.path">{{ item.title }}</router-link>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </el-scrollbar>
</template>

<script>
//import SidebarItem from "./SidebarItem";

export default {
  //components: { SidebarItem },
  data() {
    return {
      isCollapse: false,
      menuItems: [],
    };
  },
  methods: {
    toggle() {
      this.isCollapse = !this.isCollapse;
    },
  },
  mounted() {
    let routes = this.$router.options.routes;
    for (let i in routes) {
      if (routes[i].hidden) {
        continue;
      }
      let menuitem = { title: routes[i].title };
      if (routes[i].children) {
        let chs = [];
        let children = routes[i].children;
        for (let c in children) {
          if (children[c].hidden) {
            continue;
          }
          let subitem = {
            title: children[c].title,
            path: routes[i].path + "/" + children[c].path,
          };
          chs.push(subitem);
        }
        if (chs.length) {
          //确认menuitem是否拥有可显示子项
          menuitem["children"] = chs;
        }
      } else {
        //如果没有字节点，则认为是可跳转节点
        menuitem["path"] = routes[i].path;
      }
      this.menuItems.push(menuitem);
    }
  },
};
</script>
