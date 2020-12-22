<template>
  <div>
    <el-button type="primary" @click="addSpecs">添加规格</el-button>
    <v-addspecs :info="info" ref="addSpecs"></v-addspecs>
    <v-specslist @editSpecs="editSpecs($event)"></v-specslist>
  </div>
</template>
<script>
import vAddspecs from "./components/addSpecs";
import vSpecslist from "./components/specsList";

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
    addSpecs() {
      this.info.show = true;
      this.info.title = "添加规格";
      this.info.btnText = "添加";
    },
    editSpecs(id) {
      this.info.show = true;
      this.info.title = "修改规格";
      this.info.btnText = "修改";
      this.$refs.addSpecs.getDetail(id);
    },
  },
  components: {
    vAddspecs,
    vSpecslist,
  },
};
</script>
<style scoped>
.el-button {
  margin: 20px;
}
</style>