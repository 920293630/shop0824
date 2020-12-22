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
        label="菜单编号"
        width="150"
        header-align="center"
      >
      </el-table-column>
      <el-table-column prop="title" label="菜单名称" align="center">
      </el-table-column>
      <el-table-column prop="icon" label="菜单图标" width="300" align="center">
      </el-table-column>
      <el-table-column prop="url" label="菜单地址" width="200" align="center">
      </el-table-column>
      <el-table-column label="状态" width="100" align="center">
        <template slot-scope="scope">
          <el-tag type="success" effect="dark" v-if="scope.row.status == 1"
            >启用</el-tag
          >
          <el-tag type="info" effect="dark" v-else>禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="editMenu(scope.row.id)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="delMenu(scope.row.id, scope.row.title)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { requestDelMenu } from "../../../utils/request";
import {
  msgAlert,
  successAlert,
  errorAlert,
  warningAlert,
} from "../../../utils/alert";
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {};
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
    editMenu(id) {
      this.$emit("editMenu", id);
    },
    delMenu(id, title) {
      this.$confirm("该操作将删除菜单：" + title, "警告", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(() => {
          requestDelMenu({ id: id }).then((res) => {
            if (res.data.code == 200) {
              successAlert("成功删除菜单：" + title);
              this.requestMenuList();
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
    this.requestMenuList();
  },
};
</script>
<style scoped>
</style>