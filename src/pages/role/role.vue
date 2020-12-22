<template>
  <div>
    <el-button type="primary" @click="addRole">添加角色</el-button>
    <v-addrole :info="info" ref="addRole"></v-addrole>
    <v-rolelist @editRole="editRole($event)"></v-rolelist>
  </div>
</template>

<script>
import vAddrole from "./components/addRole";
import vRolelist from "./components/roleList";

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
    vAddrole,
    vRolelist,
  },
  methods: {
    addRole() {
      this.info.show = true;
      this.info.title = "添加角色";
      this.info.btnText = "添加";
    },
    editRole(id) {
      this.info.show = true;
      this.info.title = "修改角色";
      this.info.btnText = "修改";
      this.$refs.addRole.getDetail(id);
    },
  },
};
</script>
<style scoped>
.el-button {
  margin: 20px;
}
</style>