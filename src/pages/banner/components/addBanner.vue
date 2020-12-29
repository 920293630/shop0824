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
          label="标题"
          :label-width="formLabelWidth"
          prop="title"
          :rules="[{ required: true, message: '标题不能为空' }]"
        >
          <el-input
            v-model.trim="form.title"
            placeholder="请输入标题"
          ></el-input>
        </el-form-item>

        <el-form-item label="图片" :label-width="formLabelWidth">
          <!-- element 上传组件 -->
          <el-upload
            action="#"
            list-type="picture-card"
            :on-preview="showImg"
            :on-remove="removeImg"
            :on-change="changeImg"
            :auto-upload="false"
            :file-list="fileList"
            :on-exceed="exceedMsg"
            :limit="1"
            ref="imgUpload"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="imageUrl" alt="" />
          </el-dialog>
        </el-form-item>

        <el-form-item label="轮播状态" :label-width="formLabelWidth">
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
        <el-button type="primary" @click="sendBanner">
          {{ info.btnText }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { errorAlert, msgAlert, successAlert } from "../../../utils/alert";
import {
  requestAddBanner,
  requestBannerDetail,
  requestEditBanner,
} from "../../../utils/request";
export default {
  props: ["info"],
  data() {
    return {
      form: {},
      formDefault: {
        title: "",
        img: "",
        status: 1,
      },
      formLabelWidth: "120px",
      dialogVisible: false,
      imageUrl: "",
      getImgUrl: "",
      msgShow: true,
      fileList: [],
    };
  },
  methods: {
    ...mapActions({
      requestBannerList: "banner/listActions",
    }),
    cancel() {
      if (this.msgShow) {
        msgAlert("取消操作");
      }
      this.form = JSON.parse(JSON.stringify(this.formDefault));
      this.$refs.imgUpload.clearFiles();
      this.fileList = [];
      this.msgShow = true;
    },
    showImg(file) {
      this.imageUrl = file.url;
      this.dialogVisible = true;
    },
    removeImg() {
      this.form.img = "";
    },
    changeImg(file, fileList) {
      // 限制上传图片类型
      let ext = ["jpg", "jpeg", "png", "gif"];
      let imgExt = file.name.slice(file.name.lastIndexOf(".") + 1);
      if (!ext.some((item) => item === imgExt)) {
        errorAlert("仅支持：" + ext.join("，") + "等格式图片！");
        this.$refs.imgUpload.clearFiles();
        return;
      }

      // 限制图片上传大小
      if (file.size > 2 * 1024 * 1024) {
        errorAlert("图片大小超过2M，不支持上传！");
        this.$refs.imgUpload.clearFiles();
        return;
      }

      this.form.img = file.raw;
    },
    exceedMsg() {
      errorAlert("不支持上传多张图片");
    },
    callback(res) {
      if (res.data.code === 200) {
        this.msgShow = false;
        this.info.show = false;
        successAlert(res.data.msg);
        this.requestBannerList();
      } else {
        errorAlert(res.data.msg);
      }
    },
    sendBanner() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (!this.form.id) {
            requestAddBanner(this.form).then(this.callback);
          } else {
            requestEditBanner(this.form).then(this.callback);
          }
        }
      });
    },
    getDetail(id) {
      requestBannerDetail({ id: id }).then((res) => {
        if (res.data.code === 200) {
          this.form = res.data.list;
          this.form.id = id;
          if (this.form.img) {
            this.fileList.push({ url: this.$api + this.form.img });
          }
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