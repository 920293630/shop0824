<template>
  <div>
    <el-dialog
      :title="info.title"
      :visible.sync="info.show"
      @opened="$refs.form.clearValidate()"
      @closed="cancel"
    >
      <el-form :model="form" ref="form">
        <el-form-item
          label="活动名称"
          :label-width="formLabelWidth"
          prop="title"
          :rules="[{ required: true, message: '活动名称不能为空' }]"
        >
          <el-input
            v-model.trim="form.title"
            placeholder="请输入商品名称"
          ></el-input>
        </el-form-item>

        <el-form-item label="活动期限" :label-width="formLabelWidth">
          <el-date-picker
            v-model="times"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="一级分类" :label-width="formLabelWidth">
          <el-select v-model="form.first_cateid" placeholder="请选择">
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="二级分类" :label-width="formLabelWidth">
          <el-select v-model="form.second_cateid" placeholder="请选择">
            <el-option
              v-for="item in secondCateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品" :label-width="formLabelWidth">
          <el-select v-model="form.goodsid" placeholder="请选择">
            <el-option
              v-for="item in goods"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="活动状态" :label-width="formLabelWidth">
          <el-switch
            v-model="form.status"
            active-color="#409EFF"
            inactive-color="#909399"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="info.show = false">取消</el-button>
        <el-button type="primary" @click="sendSeckill">
          {{ info.btnText }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { msgAlert, successAlert, errorAlert } from "../../../utils/alert";
import {
  requestAddSeckill,
  requestEditSeckill,
  requestSeckillDetail,
} from "../../../utils/request";
export default {
  props: ["info"],
  data() {
    return {
      form: {},
      formDefault: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      },
      times: [],
      formLabelWidth: "120px",
      msgShow: true,
    };
  },
  computed: {
    ...mapGetters({
      cateList: "cate/list",
      goodsList: "goods/list",
    }),
    secondCateList() {
      let index = this.cateList.findIndex(
        (item) => item.id === this.form.first_cateid
      );
      if (index !== -1) {
        this.form.second_cateid = this.cateList[index].children[0].id;
      }
      return this.cateList[index] ? this.cateList[index].children : "";
    },
    goods() {
      let arr = [];
      if (this.goodsList.goodsList) {
        this.goodsList.goodsList.forEach((item) => {
          if (item.second_cateid === this.form.second_cateid) {
            arr.push(item);
          }
        });
      }
      return arr;
    },
  },
  methods: {
    ...mapActions({
      requestCateList: "cate/listActions",
      requestGoodsAll: "goods/goodsListActions",
      requestSeckillList: "seckill/listActions",
    }),
    cancel() {
      if (this.msgShow) {
        msgAlert("取消操作");
      }
      this.form = JSON.parse(JSON.stringify(this.formDefault));
      this.times = [];
      this.msgShow = true;
    },
    callback(res) {
      if (res.data.code === 200) {
        this.msgShow = false;
        this.info.show = false;
        successAlert(res.data.msg);
        this.requestSeckillList();
      } else {
        errorAlert(res.data.msg);
      }
    },
    sendSeckill() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.form.begintime = this.times[0].getTime();
          this.form.endtime = this.times[1].getTime();
          if (!this.form.id) {
            requestAddSeckill(this.form).then(this.callback);
          } else {
            requestEditSeckill(this.form).then(this.callback);
          }
        }
      });
    },
    getDetail(id) {
      requestSeckillDetail({ id: id }).then((res) => {
        if (res.data.code === 200) {
          this.form = res.data.list;
          this.times = [
            new Date(Number(res.data.list.begintime)),
            new Date(Number(res.data.list.endtime)),
          ];
          this.form.id = id;
        }
      });
    },
  },
  mounted() {
    this.form = JSON.parse(JSON.stringify(this.formDefault));
    this.requestCateList();
    this.requestGoodsAll(true);
  },
};
</script>
<style scoped>
</style>