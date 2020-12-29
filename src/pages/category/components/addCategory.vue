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
          label="上级分类"
          :label-width="formLabelWidth"
          prop="pid"
          :rules="[{ required: true, message: '请选择上级分类' }]"
        >
          <el-select v-model="form.pid">
            <el-option label="顶级分类" :value="0"></el-option>
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="分类名称"
          :label-width="formLabelWidth"
          prop="catename"
          :rules="[{ required: true, message: '分类名称不能为空' }]"
        >
          <el-input
            v-model="form.catename"
            placeholder="请输入分类名称"
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
            :limit="1"
            :on-exceed="exceedMsg"
            ref="imgUpload"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="imageUrl" alt="" />
          </el-dialog>
        </el-form-item>
        <el-form-item label="分类状态" :label-width="formLabelWidth">
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
        <el-button type="primary" @click="sendCate">
          {{ info.btnText }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { msgAlert, errorAlert, successAlert } from "../../../utils/alert";
import {
  requestAddCate,
  requestCateDetail,
  requestEditCate,
} from "../../../utils/request";

export default {
  props: ["info"],
  data() {
    return {
      form: {},
      formDefault: {
        pid: 0,
        catename: "",
        img: "",
        status: 1,
      },
      formLabelWidth: "120px",
      msgShow: true,
      imageUrl: "",
      fileList: [],
      dialogVisible: false,
    };
  },
  computed: {
    ...mapGetters({
      list: "cate/list",
    }),
  },
  methods: {
    ...mapActions({
      requestCateList: "cate/listActions",
    }),
    // 当添加上传图片时触发的方法
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
    removeImg(file, fileList) {
      this.form.img = "";
    },
    showImg(file) {
      this.imageUrl = file.url;
      this.dialogVisible = true;
    },
    exceedMsg() {
      errorAlert("不支持上传多张图片");
    },
    // 当添加或修改窗口隐藏时触发的方法
    cancel() {
      if (this.msgShow) {
        msgAlert("取消操作");
      }
      this.form = JSON.parse(JSON.stringify(this.formDefault));
      this.$refs.imgUpload.clearFiles();
      this.fileList = [];
      this.msgShow = true;
    },
    // 添加和修改发送请求后的回调
    callback(res) {
      if (res.data.code === 200) {
        this.msgShow = false;
        this.info.show = false;
        successAlert(res.data.msg);
        this.requestCateList();
      } else {
        errorAlert(res.data.msg);
      }
    },
    sendCate() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (!this.form.id) {
            requestAddCate(this.form).then(this.callback);
          } else {
            requestEditCate(this.form).then(this.callback);
          }
        }
      });
    },
    getDetail(id) {
      requestCateDetail({ id: id }).then((res) => {
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
    this.requestCateList();
  },
};
</script>
<style scoped>
</style>