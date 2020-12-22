<template>
  <div>
    <el-button type="primary" @click="addMenu">添加菜单</el-button>
    <v-addmenu :info="info" ref="addMenu"></v-addmenu>
    <v-listmenu @editMenu="editMenu($event)"></v-listmenu>
  </div>
</template>

<script>
// 导入子组件
import vAddmenu from "./components/addMenu";
import vListmenu from "./components/menuList";

export default {
  data() {
    return {
      info: {
        show: false,
        title: "",
        btnText: "",
      },
    };
  },
  components: {
    vAddmenu,
    vListmenu,
  },
  methods: {
    addMenu() {
      this.info.show = true;
      this.info.title = "添加菜单";
      this.info.btnText = "添加";
    },
    editMenu(id) {
      this.info.show = true;
      this.info.title = "编辑菜单";
      this.info.btnText = "修改";
      this.$refs.addMenu.getDetail(id);
    },
  },
};
</script>
<style scoped>
.el-button {
  margin: 20px;
}
</style>