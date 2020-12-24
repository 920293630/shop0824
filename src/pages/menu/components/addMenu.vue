<template>
  <div>
    <el-dialog
      :title="info.title"
      :visible.sync="info.show"
      @opened="$refs.form.clearValidate()"
      @closed="cancel(magShow)"
    >
      <el-form :model="form" ref="form">
        <el-form-item
          label="菜单名称"
          :label-width="formLabelWidth"
          prop="title"
          :rules="[{ required: true, message: '菜单名称不能为空' }]"
        >
          <el-input
            v-model.trim="form.title"
            placeholder="请输入菜单名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" :label-width="formLabelWidth">
          <el-select v-model="form.pid">
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型" :label-width="formLabelWidth">
          <el-radio v-model="form.type" :label="1">目录</el-radio>
          <el-radio v-model="form.type" :label="2">菜单</el-radio>
        </el-form-item>
        <el-form-item
          label="菜单图标"
          :label-width="formLabelWidth"
          v-if="form.type === 1"
        >
          <el-select v-model="form.icon" placeholder="请选择菜单图标">
            <el-option
              v-for="item in icons"
              :key="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单地址" :label-width="formLabelWidth" v-else>
          <el-select v-model="form.url" placeholder="请选择菜单路径">
            <el-option
              v-for="item in urls"
              :key="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单状态" :label-width="formLabelWidth">
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
        <el-button @click="info.show = false">取 消</el-button>
        <el-button type="primary" @click="sendMunu">{{
          info.btnText
        }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  requestAddMenu,
  requestMenuDetail,
  requestEditMenu,
} from "../../../utils/request";
import {
  msgAlert,
  successAlert,
  warningAlert,
  errorAlert,
} from "../../../utils/alert";
import { mapGetters, mapActions } from "vuex";

export default {
  props: ["info"],
  data() {
    return {
      form: {},
      formDefault: {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      },
      icons: [
        "el-icon-s-tools",
        "el-icon-goods",
        "el-icon-picture-outline-round",
        "el-icon-s-home",
        "el-icon-s-shop",
      ],
      urls: [
        "home",
        "menu",
        "role",
        "user",
        "category",
        "specs",
        "goods",
        "member",
        "banner",
        "seckill"
      ],
      formLabelWidth: "120px",
      magShow: true,
    };
  },
  computed: {
    ...mapGetters({
      list: "menu/list",
    }),
  },
  methods: {
    ...mapActions({
      requestMenuList: "menu/listActions",
    }),
    cancel(magShow) {
      if (magShow) {
        msgAlert("取消操作");
      }
      this.form = JSON.parse(JSON.stringify(this.formDefault));
      this.magShow = true;
    },
    callback(res) {
      if (res.data.code === 200) {
        this.requestMenuList();
        this.magShow = false;
        this.info.show = false;
        successAlert(res.data.msg);
      } else {
        errorAlert(res.data.msg);
      }
    },
    sendMunu() {
      this.$refs.form.validate((vaild) => {
        if (vaild) {
          if (!this.form.id) {
            requestAddMenu(this.form).then(this.callback);
          } else {
            requestEditMenu(this.form).then(this.callback);
          }
        }
      });
    },
    getDetail(id) {
      requestMenuDetail({ id: id }).then((res) => {
        if (res.data.code === 200) {
          this.form = res.data.list;
          this.form.id = id;
        }
      });
    },
  },
  mounted() {
    this.form = JSON.parse(JSON.stringify(this.formDefault));
  },
};
</script>
<style scoped>
</style>