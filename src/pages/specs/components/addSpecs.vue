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
          label="规格名称"
          :label-width="formLabelWidth"
          prop="specsname"
          :rules="[{ required: true, message: '规格名称不能为空' }]"
        >
          <el-input v-model.trim="form.specsname"></el-input>
        </el-form-item>
        <el-form-item
          v-for="(item, index) in attrArr"
          :key="index"
          :label="'规格属性' + (index + 1)"
          :label-width="formLabelWidth"
          ><el-input
            v-model.trim="attrArr[index]"
            style="width: 50%"
          ></el-input>
          <el-button v-if="index === 0" type="primary" @click="addAttr">
            添加规格属性
          </el-button>
          <el-button v-else type="danger" @click="delAttr(index)">
            删除
          </el-button>
        </el-form-item>
        <el-form-item label="规格状态" :label-width="formLabelWidth">
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
        <el-button type="primary" @click="sendSpecs">{{
          info.btnText
        }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { errorAlert, msgAlert, successAlert } from "../../../utils/alert";
import {
  requestAddSpecs,
  requestEditSpecs,
  requestSpecsDetail,
} from "../../../utils/request";
import { mapGetters, mapActions } from "vuex";

export default {
  props: ["info"],
  data() {
    return {
      form: {},
      formDefault: {
        specsname: "",
        attrs: "",
        status: 1,
      },
      attrArr: [""],
      formLabelWidth: "120px",
      msgShow: true,
    };
  },
  methods: {
    ...mapActions({
      requestSpecsCount: "specs/countActions",
      requestSpecsList: "specs/specsListActions",
    }),
    addAttr() {
      this.attrArr.push("");
    },
    delAttr(i) {
      this.attrArr.splice(i, 1);
    },
    cancel() {
      if (this.msgShow) {
        msgAlert("取消操作");
      }
      this.form = JSON.parse(JSON.stringify(this.formDefault));
      this.attrArr = [""];
      this.msgShow = true;
    },
    callback(res) {
      if (res.data.code === 200) {
        this.msgShow = false;
        this.info.show = false;
        successAlert(res.data.msg);
        this.requestSpecsCount();
        this.requestSpecsList();
      } else {
        errorAlert(res.data.msg);
      }
    },
    sendSpecs() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.attrArr.some((item) => item.value === "")) {
            errorAlert("不能添加空的规格属性！");
            return;
          }
          this.form.attrs = this.attrArr.join(",");
          if (!this.form.id) {
            requestAddSpecs(this.form).then(this.callback);
          } else {
            requestEditSpecs(this.form).then(this.callback);
          }
        }
      });
    },
    getDetail(id) {
      requestSpecsDetail({ id: id }).then((res) => {
        if (res.data.code === 200) {
          this.form = res.data.list[0];
          this.attrArr = this.form.attrs.split(",");
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