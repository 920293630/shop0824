<template>
  <div>
    <el-table
      :data="list.specsList"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
    >
      <el-table-column prop="id" label="规格编号" width="180" align="center">
      </el-table-column>
      <el-table-column prop="specsname" label="规格名称" align="center">
      </el-table-column>
      <el-table-column prop="attrs" label="规格属性" align="center">
        <template slot-scope="scope">
          <el-tag
            v-for="item in scope.row.attrs"
            :key="item"
            type="primary"
            style="margin: 5px"
            :disable-transitions="true"
          >
            {{ item }}
          </el-tag>
        </template>
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
          <el-button size="mini" @click="editSpecs(scope.row.id)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="delSpecs(scope.row.id, scope.row.specsname)"
            >删除</el-button
          >
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
import { requestDelSpecs } from "../../../utils/request";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "specs/list",
    }),
  },
  methods: {
    ...mapActions({
      requestSpecsList: "specs/specsListActions",
      requestCount: "specs/countActions",
      requestPage: "specs/pageActions",
    }),
    editSpecs(id) {
      this.$emit("editSpecs", id);
    },
    delSpecs(id, title) {
      this.$confirm("该操作将删除规格：" + title, "警告", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(() => {
          requestDelSpecs({ id: id }).then((res) => {
            if (res.data.code === 200) {
              successAlert("成功删除规格：" + title);
              this.requestCount();
              this.requestSpecsList();
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
      this.requestSpecsList();
    },
  },
  mounted() {
    this.requestCount();
    this.requestSpecsList();
  },
};
</script>
<style scoped>
</style>