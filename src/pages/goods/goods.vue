<template>
  <div>
    <el-button type="primary" @click="addGoods" style="margin: 20px">
      添加商品
    </el-button>
    <v-addgoods :info="info" ref="addGoods"></v-addgoods>
    <v-goodslist @editGoods="editGoods($event)"></v-goodslist>
  </div>
</template>

<script>
import vAddgoods from "./components/addGoods";
import vGoodslist from "./components/goodsList";

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
    addGoods() {
      this.info.show = true;
      this.info.title = "添加商品";
      this.info.btnText = "添加";
    },
    editGoods(id) {
      this.info.show = true;
      this.info.title = "修改商品";
      this.info.btnText = "修改";
      this.$refs.addGoods.getDetail(id);
    },
  },
  components: {
    vAddgoods,
    vGoodslist,
  },
};
</script>
<style scoped>
</style>