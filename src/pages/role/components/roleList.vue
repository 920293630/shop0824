<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
    >
      <el-table-column prop="id" label="角色编号" width="180" align="center">
      </el-table-column>
      <el-table-column prop="rolename" label="角色名称" align="center">
      </el-table-column>
      <el-table-column prop="status" label="状态" align="center">
        <template slot-scope="scope">
          <el-tag type="success" effect="dark" v-if="scope.row.status === 1"
            >启用</el-tag
          >
          <el-tag type="info" effect="dark" v-else>禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="editRole(scope.row.id)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="delRole(scope.row.id, scope.row.rolename)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { errorAlert, msgAlert, successAlert } from "../../../utils/alert";
import { requestDelRole } from "../../../utils/request";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "role/list",
    }),
  },
  methods: {
    ...mapActions({
      requestRoleList: "role/listActions",
    }),
    editRole(id) {
      this.$emit("editRole", id);
    },
    delRole(id, title) {
      this.$confirm("该操作将删除角色：" + title, "警告", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(() => {
          requestDelRole({ id: id }).then((res) => {
            if (res.data.code === 200) {
              successAlert("成功删除角色：" + title);
              this.requestRoleList();
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
    this.requestRoleList();
  },
};
</script>
<style scoped>
</style>