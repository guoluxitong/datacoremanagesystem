<template>
  <div :class="classObj">
    <my-header class="main-header"></my-header>
    <sidebar class="main-sidebar"></sidebar>
    <div class="main-container" style="overflow:hidden">
      <router-view />
    </div>
  </div>
</template>

<script>
import { MyHeader, Sidebar } from "./components";

export default {
  name: "Start",
  components: {
    MyHeader,
    Sidebar,
  },
  computed: {
    sidebar() {
      return this.$store.state.sidebar;
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.isOpened,
        openSidebar: this.sidebar.isOpened,
      };
    },
  }
};
</script>
