<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
    >
      <el-table-column
        prop="id"
        label="轮播图编号"
        width="120"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="title"
        label="轮播图标题"
        align="center"
        width="250"
      >
      </el-table-column>
      <el-table-column prop="img" label="图片" align="center">
        <template slot-scope="scope">
          <img
            v-if="scope.row.img"
            :src="$api + scope.row.img"
            alt=""
            style="height: 100px"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        label="轮播图状态"
        width="120"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag type="success" effect="dark" v-if="scope.row.status === 1">
            启用
          </el-tag>
          <el-tag type="info" effect="dark" v-else> 禁用 </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="200">
        <template slot-scope="scope">
          <el-button size="mini" @click="editBanner(scope.row.id)">
            编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="delBanner(scope.row.id, scope.row.title)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { errorAlert, msgAlert, successAlert } from "../../../utils/alert";
import { requestDelBanner } from "../../../utils/request";
export default {
  computed: {
    ...mapGetters({
      list: "banner/list",
    }),
  },
  methods: {
    ...mapActions({
      requestBannerList: "banner/listActions",
    }),
    editBanner(id) {
      this.$emit("editBanner", id);
    },
    delBanner(id, title) {
      this.$confirm("该操作将删除轮播图：" + title, "警告", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(() => {
          requestDelBanner({ id: id }).then((res) => {
            if (res.data.code === 200) {
              successAlert("成功删除轮播图：" + title);
              this.requestBannerList();
            } else {
              errorAlert(res.data.msg);
            }
          });
        })
        .catch(() => {
          msgAlert("已取消删除");
        });
    },
  },
  mounted() {
    this.requestBannerList();
  },
};
</script>
<style scoped>
</style>