<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
    >
      <el-table-column prop="title" label="活动名称" align="center">
      </el-table-column>
      <el-table-column
        prop="status"
        label="活动状态"
        width="200"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag type="success" effect="dark" v-if="scope.row.status === 1">
            启用
          </el-tag>
          <el-tag type="info" effect="dark" v-else> 禁用 </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="300">
        <template slot-scope="scope">
          <el-button size="mini" @click="editSeckill(scope.row.id)">
            编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="delSeckill(scope.row.id, scope.row.title)"
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
import { requestDelSeckill } from "../../../utils/request";
export default {
  computed: {
    ...mapGetters({
      list: "seckill/list",
    }),
  },
  methods: {
    ...mapActions({
      requestSeckillList: "seckill/listActions",
    }),
    editSeckill(id) {
      this.$emit("editSeckill", id);
    },
    delSeckill(id, title) {
      this.$confirm("该操作将删除活动：" + title, "警告", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(() => {
          requestDelSeckill({ id: id }).then((res) => {
            if (res.data.code === 200) {
              successAlert("成功删除活动：" + title);
              this.requestSeckillList();
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
    this.requestSeckillList();
  },
};
</script>
<style scoped>
</style>