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
          label="手机号"
          :label-width="formLabelWidth"
          prop="phone"
          :rules="[{ required: true, message: '手机号不能为空' }]"
        >
          <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
        </el-form-item>

        <el-form-item
          label="昵称"
          :label-width="formLabelWidth"
          prop="nickname"
          :rules="[{ required: true, message: '昵称不能为空' }]"
        >
          <el-input v-model="form.nickname" placeholder="请输入昵称"></el-input>
        </el-form-item>

        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input
            type="password"
            v-model="form.password"
            placeholder="保持原密码"
          ></el-input>
        </el-form-item>

        <el-form-item label="会员状态" :label-width="formLabelWidth">
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
        <el-button type="primary" @click="sendMember">
          {{ info.btnText }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["info"],
  data() {
    return {
      form: {},
      formDefault: {
        uid: "",
        nickname: "",
        phone: "",
        password: "",
        status: 1,
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
    cancel() {},
    sendMember() {},
  },
  mounted() {
    this.form = JSON.parse(JSON.stringify(this.formDefault));
  },
};
</script>
<style scoped>
</style>