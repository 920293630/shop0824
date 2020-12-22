<template>
  <div>
    <el-button type="primary" @click="addGoods" style="margin: 20px">
      添加商品
    </el-button>
    <v-addgoods :info="info"></v-addgoods>
    <v-goodslist></v-goodslist>
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
  },
  components: {
    vAddgoods,
    vGoodslist,
  },
};
</script>
<style scoped>
</style>