<template>
  <div>
    <el-dialog
      :title="info.title"
      :visible.sync="info.show"
      @opened="$refs.form.clearValidate()"
      @closed="cancel(msgShow)"
    >
      <el-form :model="form" ref="form">
        <el-form-item
          label="所属角色"
          :label-width="formLabelWidth"
          prop="roleid"
          :rules="[{ required: true, message: '请选择所属角色' }]"
        >
          <el-select v-model="form.roleid" placeholder="请选择">
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="用户名"
          :label-width="formLabelWidth"
          prop="username"
          :rules="[{ required: true, message: '请输入用户名' }]"
        >
          <el-input
            v-model="form.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input
            type="password"
            v-model="form.password"
            placeholder="请输入密码"
            ref="passInp"
          ></el-input>
        </el-form-item>
        <el-form-item label="管理员状态" :label-width="formLabelWidth">
          <el-switch
            v-model="form.status"
            active-color="#409EFF"
            inactive-color="#909399"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="info.show = false">取消</el-button>
        <el-button type="primary" @click="sendUser">
          {{ info.btnText }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { errorAlert, msgAlert, successAlert } from "../../../utils/alert";
import {
  requestAddUser,
  requestEditUser,
  requestUserDetail,
} from "../../../utils/request";
export default {
  props: ["info"],
  data() {
    return {
      form: {},
      formDefault: {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      },
      formLabelWidth: "120px",
      msgShow: true,
    };
  },
  computed: {
    ...mapGetters({
      list: "role/list",
    }),
  },
  methods: {
    ...mapActions({
      requestRoleList: "role/listActions",
      requestCount: "user/countActions",
      requestUserList: "user/userListActions",
    }),
    cancel(msgShow) {
      if (msgShow) {
        msgAlert("取消操作");
      }
      this.msgShow = true;
      this.form = JSON.parse(JSON.stringify(this.formDefault));
    },
    callback(res) {
      if (res.data.code === 200) {
        this.msgShow = false;
        this.info.show = false;
        successAlert(res.data.msg);
        this.requestCount();
        this.requestUserList();
      } else {
        errorAlert(res.data.msg);
      }
    },
    sendUser() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (!this.form.uid) {
            requestAddUser(this.form).then(this.callback);
          } else {
            requestEditUser(this.form).then(this.callback);
          }
        }
      });
    },
    getDetail(uid) {
      requestUserDetail({ uid: uid }).then((res) => {
        if (res.data.code === 200) {
          this.form = res.data.list;
          this.form.uid = uid;
          this.form.password = "";
        }
      });
    },
  },
  mounted() {
    this.form = JSON.parse(JSON.stringify(this.formDefault));
    this.requestRoleList();
  },
};
</script>
<style scoped>
</style>