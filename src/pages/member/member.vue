<template>
  <div>
    <v-editmember :info="info" ref="editMember"></v-editmember>
    <v-memberlist @editMember="editMember"></v-memberlist>
  </div>
</template>

<script>
import vEditmember from "./components/editMember";
import vMemberlist from "./components/memberList";

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
  methods: {
    editMember() {
      this.info.show = true;
      this.info.title = "修改会员";
      this.info.btnText = "修改";
      this.$refs.editMember.getDetail(id);
    },
  },
  components: {
    vEditmember,
    vMemberlist,
  },
};
</script>
<style scoped>
</style>