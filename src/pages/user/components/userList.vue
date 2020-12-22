<template>
  <div>
    <el-table
      :data="list.userList"
      height="335"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
    >
      <el-table-column
        prop="id"
        label="用户编号"
        width="180"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="username"
        label="用户名"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="rolename"
        label="所属角色"
        align="center"
      ></el-table-column>
      <el-table-column prop="status" label="用户状态" align="center">
        <template slot-scope="scope">
          <el-tag type="success" effect="dark" v-if="scope.row.status === 1">
            启用
          </el-tag>
          <el-tag type="info" effect="dark" v-else> 禁用 </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="editUser(scope.row.uid)">
            编辑
          </el-button>
          <el-button
            type="danger"
            size="mini"
            @click="delUser(scope.row.uid, scope.row.username)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="list.count"
      :page-size="list.size"
      @current-change="changePage"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { errorAlert, msgAlert, successAlert } from "../../../utils/alert";
import { requestDelUser } from "../../../utils/request";

export default {
  computed: {
    ...mapGetters({
      list: "user/list",
    }),
  },
  methods: {
    ...mapActions({
      requestUserList: "user/userListActions",
      requestCount: "user/countActions",
      requestPage: "user/pageActions",
    }),
    editUser(uid) {
      this.$emit("editUser", uid);
    },
    delUser(uid, username) {
      this.$confirm("该操作将删除用户：" + username, "警告", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(() => {
          requestDelUser({ uid: uid }).then((res) => {
            if (res.data.code === 200) {
              successAlert("成功删除用户：" + username);
              this.requestCount();
              this.requestUserList();
            } else {
              errorAlert(res.data.msg);
            }
          });
        })
        .catch(() => {
          msgAlert("已取消删除");
        });
    },
    changePage(page) {
      this.requestPage(page);
      this.requestUserList();
    },
  },
  mounted() {
    this.requestCount();
    this.requestUserList();
  },
};
</script>
<style scoped>
</style>