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
        label="用户编号"
        width="120"
        align="center"
      ></el-table-column>
      <el-table-column prop="nickname" label="昵称" align="center">
      </el-table-column>
      <el-table-column prop="phone" label="手机号" align="center" width="250">
      </el-table-column>
      <el-table-column
        prop="status"
        label="会员状态"
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
          <el-button size="mini" @click="editMember(scope.row.id)">
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { errorAlert, msgAlert, successAlert } from "../../../utils/alert";
export default {
  computed: {
    ...mapGetters({
      list: "member/list",
    }),
  },
  methods: {
    ...mapActions({
      requestMemberList: "member/listActions",
    }),
    editMember(id) {},
  },
  mounted() {
    this.requestMemberList();
  },
};
</script>
<style scoped>
</style>