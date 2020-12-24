<template>
  <div>
    <el-button type="primary" @click="addBanner" style="margin: 20px"
      >添加轮播图</el-button
    >
    <v-addbanner :info="info" ref="addBanner"></v-addbanner>
    <v-bannerlist @editBanner="editBanner($event)"></v-bannerlist>
  </div>
</template>

<script>
import vAddbanner from "./components/addBanner";
import vBannerlist from "./components/bannerList";

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
    addBanner() {
      this.info.show = true;
      this.info.title = "添加轮播图";
      this.info.btnText = "添加";
    },
    editBanner(id) {
      this.info.show = true;
      this.info.title = "修改商品";
      this.info.btnText = "修改";
      this.$refs.addBanner.getDetail(id);
    },
  },
  components: {
    vAddbanner,
    vBannerlist,
  },
};
</script>
<style scoped>
</style>