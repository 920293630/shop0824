<template>
  <div>
    <el-button type="primary" @click="addCate">添加分类</el-button>
    <v-addcategory :info="info" ref="addCate"></v-addcategory>
    <v-categorylist @editCate="editCate($event)"></v-categorylist>
  </div>
</template>

<script>
import vAddcategory from "./components/addCategory";
import vCategorylist from "./components/categoryList";

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
    addCate() {
      this.info.show = true;
      this.info.title = "添加分类";
      this.info.btnText = "添加";
    },
    editCate(id) {
      this.info.show = true;
      this.info.title = "修改分类";
      this.info.btnText = "修改";
      this.$refs.addCate.getDetail(id);
    },
  },
  components: {
    vAddcategory,
    vCategorylist,
  },
};
</script>
<style scoped>
.el-button {
  margin: 20px;
}
</style>