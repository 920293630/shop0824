<template>
  <div>
    <el-button type="primary" @click="addMember">添加会员</el-button>
    <el-addmember :info="info"></el-addmember>
  </div>
</template>

<script>
import vAddmember from "./components/addMember";
import vMemberlist from "./components/memberList";

export default {
  data() {
    return {
      info: {
        show: false,
        title: "",
        btnText,
      },
    };
  },
  methods: {
    addMember() {
      this.info.show = true;
      this.info.title = "添加会员";
      this.info.btnText = "添加";
    },
  },
  components: {
    vAddmember,
    vMemberlist,
  },
};
</script>
<style scoped>
</style>