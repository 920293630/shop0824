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
          label="角色名称"
          :label-width="formLabelWidth"
          prop="rolename"
          :rules="[{ required: true, message: '角色名称不能为空' }]"
        >
          <el-input v-model="form.rolename"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" :label-width="formLabelWidth">
          <el-tree
            :data="list"
            show-checkbox
            node-key="id"
            :props="defaultProps"
            ref="tree"
          >
          </el-tree>
        </el-form-item>
        <el-form-item label="角色状态" :label-width="formLabelWidth">
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
        <el-button type="primary" @click="sendRole">{{
          info.btnText
        }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { errorAlert, msgAlert, successAlert } from "../../../utils/alert";
import {
  requestAddRole,
  requestEditRole,
  requestRoleDetail,
} from "../../../utils/request";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  data() {
    return {
      form: {},
      formDefault: {
        rolename: "",
        menus: "",
        status: 1,
      },
      formLabelWidth: "120px",
      defaultProps: {
        children: "children",
        label: "title",
      },
      msgShow: true,
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
      requestRoleList: "role/listActions",
    }),
    cancel(msgShow) {
      if (msgShow) {
        msgAlert("取消操作");
      }
      this.form = JSON.parse(JSON.stringify(this.formDefault));
      this.$refs.tree.setCheckedKeys([]);
      this.msgShow = true;
    },
    callback(res) {
      if (res.data.code === 200) {
        this.msgShow = false;
        this.info.show = false;
        successAlert(res.data.msg);
        this.requestRoleList();
      } else {
        errorAlert(res.data.msg);
      }
    },
    sendRole() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
          if (!this.form.id) {
            requestAddRole(this.form).then(this.callback);
          } else {
            requestEditRole(this.form).then(this.callback);
          }
        }
      });
    },
    getDetail(id) {
      requestRoleDetail({ id: id }).then((res) => {
        if (res.data.code === 200) {
          this.form = res.data.list;
          this.$refs.tree.setCheckedKeys(JSON.parse(this.form.menus));
          this.form.id = id;
        }
      });
    },
  },
  mounted() {
    this.form = JSON.parse(JSON.stringify(this.formDefault));
    this.requestMenuList();
  },
};
</script>
<style scoped>
</style>