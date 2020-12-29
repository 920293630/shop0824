<template>
  <div>
    <el-button type="primary" @click="addSeckill" style="margin: 20px">
      添加活动
    </el-button>
    <v-addseckill :info="info" ref="addSeckill"></v-addseckill>
    <v-seckill-list @editSeckill="editSeckill($event)"></v-seckill-list>
  </div>
</template>

<script>
import vAddseckill from "./components/addSeckill";
import vSeckillList from "./components/seckillList";

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
    addSeckill() {
      this.info.show = true;
      this.info.title = "添加商品";
      this.info.btnText = "添加";
    },
    editSeckill(id) {
      this.info.show = true;
      this.info.title = "修改商品";
      this.info.btnText = "修改";
      this.$refs.addSeckill.getDetail(id);
    },
  },
  components: {
    vAddseckill,
    vSeckillList,
  },
};
</script>
<style scoped>
</style>