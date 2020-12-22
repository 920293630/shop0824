<template>
  <div>
    <el-button type="primary" @click="addUser">添加管理员</el-button>
    <v-adduser :info="info" ref="addUser"></v-adduser>
    <v-userlist @editUser="editUser($event)"></v-userlist>
  </div>
</template>

<script>
import vAdduser from "../user/components/addUser";
import vUserlist from "../user/components/userList";

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
    vAdduser,
    vUserlist,
  },
  methods: {
    addUser() {
      this.info.show = true;
      this.info.title = "添加管理员";
      this.info.btnText = "添加";
    },
    editUser(uid) {
      this.info.show = true;
      this.info.title = "修改管理员";
      this.info.btnText = "修改";
      this.$refs.addUser.getDetail(uid);
    },
  },
};
</script>
<style scoped>
.el-button {
  margin: 20px;
}
</style>