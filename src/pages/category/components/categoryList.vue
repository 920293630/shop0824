<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column
        prop="id"
        label="分类编号"
        width="120"
        header-align="center"
      ></el-table-column>
      <el-table-column prop="catename" label="分类名称" align="center">
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
        label="分类状态"
        width="100"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag type="success" effect="dark" v-if="scope.row.status === 1">
            启用
          </el-tag>
          <el-tag type="info" effect="dark" v-else> 禁用 </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="editCate(scope.row.id)">
            编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="delCate(scope.row.id, scope.row.catename)"
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
import { msgAlert, errorAlert, successAlert } from "../../../utils/alert";
import { requestDelCate } from "../../../utils/request";
export default {
  computed: {
    ...mapGetters({
      list: "cate/list",
    }),
  },
  methods: {
    ...mapActions({
      requestCateList: "cate/listActions",
    }),
    editCate(id) {
      this.$emit("editCate", id);
    },
    delCate(id, catename) {
      this.$confirm("该操作将删除分类：" + catename, "警告", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(() => {
          requestDelCate({ id: id }).then((res) => {
            if (res.data.code === 200) {
              successAlert("成功删除分类：" + catename);
              this.requestCateList();
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
    this.requestCateList();
  },
};
</script>
<style scoped>
</style>