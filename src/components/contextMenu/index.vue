<template>
  <ul class='contextmenu' v-show="visible" :style="{left:left+'px',top:top+'px'}"><slot></slot></ul>
</template>

<script>

export default {
  name: 'contextMenu',
  data() {
    return{
      visible: false,
      top: 0,
      left: 0,
      row:{},
    }
  },
  watch: {
    visible(value){
      if (value) {
        document.body.addEventListener('click', this.closeTableMenu)
      } else {
        document.body.removeEventListener('click', this.closeTableMenu)
      }
    }
  },
  methods: {
    openTableMenu(row, event) {
      window.event.returnValue=false;
      this.visible = true
      this.row=row
      this.left = event.clientX-180
      this.top = event.clientY-89
      this.$root.$emit('table-row',row)
    },
    closeTableMenu() {
      this.visible = false
    },
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 100;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, .3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
</style>

