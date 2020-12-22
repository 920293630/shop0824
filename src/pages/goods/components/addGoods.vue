<template>
  <div>
    <el-dialog
      :title="info.title"
      :visible.sync="info.show"
      itemtype=""
      @opened="opened"
      @closed="cancel"
    >
      <el-form :model="form" ref="form">
        <el-form-item
          label="一级分类"
          :label-width="formLabelWidth"
          prop="first_cateid"
          :rules="[{ required: true, message: '一级分类不能为空' }]"
        >
          <el-select v-model="form.first_cateid" placeholder="请选择">
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="二级分类"
          :label-width="formLabelWidth"
          prop="second_cateid"
          :rules="[{ required: true, message: '二级分类不能为空' }]"
        >
          <el-select v-model="form.second_cateid" placeholder="请选择">
            <el-option
              v-for="item in secondCateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="商品名称"
          :label-width="formLabelWidth"
          prop="goodsname"
          :rules="[{ required: true, message: '商品名称不能为空' }]"
        >
          <el-input
            v-model.trim="form.goodsname"
            placeholder="请输入商品名称"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="价格"
          :label-width="formLabelWidth"
          prop="price"
          :rules="[{ type: 'number', message: '价格必须是数字' }]"
        >
          <el-input
            v-model.number="form.price"
            placeholder="请输入商品价格"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="市场价格"
          :label-width="formLabelWidth"
          prop="market_price"
          :rules="[{ type: 'number', message: '价格必须是数字' }]"
        >
          <el-input
            v-model.number="form.market_price"
            placeholder="请输入商品市场价格"
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
            :limit="1"
            :on-exceed="exceedMsg"
            ref="imgUpload"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-form-item>

        <el-form-item label="商品规格" :label-width="formLabelWidth">
          <el-select v-model="form.specsid" placeholder="请选择">
            <el-option
              v-for="item in sList.specsList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="规格属性" :label-width="formLabelWidth">
          <el-select v-model="form.specsattr" placeholder="请选择">
            <el-option
              v-for="(item, index) in specsAttrList"
              :key="index"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否新品" :label-width="formLabelWidth">
          <el-radio v-model="form.isnew" :label="1">是</el-radio>
          <el-radio v-model="form.isnew" :label="2">否</el-radio>
        </el-form-item>

        <el-form-item label="是否热卖" :label-width="formLabelWidth">
          <el-radio v-model="form.ishot" :label="1">是</el-radio>
          <el-radio v-model="form.ishot" :label="2">否</el-radio>
        </el-form-item>

        <el-form-item label="商品状态" :label-width="formLabelWidth">
          <el-switch
            v-model="form.status"
            active-color="#409EFF"
            inactive-color="#909399"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
        <el-form-item label="商品描述" :label-width="formLabelWidth">
          <div id="editor"></div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="info.show = false">取消</el-button>
        <el-button type="primary" @click="sendGoods">
          {{ info.btnText }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { msgAlert } from "../../../utils/alert";
import E from "wangeditor";

export default {
  props: ["info"],
  data() {
    return {
      form: {},
      formDefault: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: 0,
        market_price: 0,
        img: "",
        description: "",
        specsid: "",
        specsattr: "",
        isnew: 1,
        ishot: 1,
        status: 1,
      },
      formLabelWidth: "120px",
      dialogVisible: false,
      dialogImageUrl: "",
      editor: "",
      msgShow: true,
    };
  },
  computed: {
    ...mapGetters({
      cateList: "cate/list",
      sList: "specs/list",
    }),
    secondCateList() {
      let index = this.cateList.findIndex(
        (item) => item.id === this.form.first_cateid
      );
      this.form.second_cateid = "";
      return this.cateList[index] ? this.cateList[index].children : "";
    },
    specsAttrList() {
      let index = this.sList.specsList.findIndex(
        (item) => item.id === this.form.specsid
      );
      this.form.specsattr = [];
      return this.sList.specsList[index]
        ? this.sList.specsList[index].attrs
        : "";
    },
  },
  methods: {
    ...mapActions({
      requestCateList: "cate/listActions",
      requestSpecsList: "specs/specsListActions",
      requestGoodsList: "goods/listActions",
      requestGoodsCount: "goods/countActions",
    }),
    cancel() {
      if (this.msgShow) {
        msgAlert("取消操作");
      }
      this.form = JSON.parse(JSON.stringify(this.formDefault));
      this.$refs.imgUpload.clearFiles();
    },
    showImg(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    removeImg() {
      this.form.img = "";
    },
    changeImg() {},
    exceedMsg() {},
    opened() {
      this.editor = new E("#editor");
      this.editor.create();
      this.editor.txt.html("");
      this.$refs.form.clearValidate();
    },
    sendGoods() {},
  },
  mounted() {
    this.form = JSON.parse(JSON.stringify(this.formDefault));
    this.requestCateList();
    this.requestSpecsList();
  },
};
</script>
<style scoped>
</style>