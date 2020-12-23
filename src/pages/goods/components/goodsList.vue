<template>
  <div>
    <el-table
      :data="list.goodsList"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
    >
      <el-table-column prop="id" label="商品编号" width="100" align="center">
      </el-table-column>
      <el-table-column prop="goodsname" label="商品名称" align="center">
      </el-table-column>
      <el-table-column prop="price" label="商品价格" align="center" width="120">
        <template slot-scope="scope">
          {{ scope.row.price | priceFilter }}
        </template>
      </el-table-column>
      <el-table-column
        prop="market_price"
        label="市场价格"
        align="center"
        width="120"
      >
        <template slot-scope="scope">
          {{ scope.row.market_price | priceFilter }}
        </template>
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
      <el-table-column prop="isnew" label="是否新品" align="center" width="80">
        <template slot-scope="scope">
          <el-tag type="success" effect="dark" v-if="scope.row.isnew === 1">
            是
          </el-tag>
          <el-tag type="info" effect="dark" v-else> 否 </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="ishot" label="是否热卖" align="center" width="80">
        <template slot-scope="scope">
          <el-tag type="success" effect="dark" v-if="scope.row.ishot === 1">
            是
          </el-tag>
          <el-tag type="info" effect="dark" v-else> 否 </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" align="center" width="80">
        <template slot-scope="scope">
          <el-tag type="success" effect="dark" v-if="scope.row.status === 1">
            启用
          </el-tag>
          <el-tag type="info" effect="dark" v-else> 禁用 </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="editGoods(scope.row.id)">
            编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="delGoods(scope.row.id, scope.row.goodsname)"
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
import { requestDelGoods } from "../../../utils/request";
export default {
  computed: {
    ...mapGetters({
      list: "goods/list",
    }),
  },
  methods: {
    ...mapActions({
      requestCount: "goods/countActions",
      requestGoodsList: "goods/goodsListActions",
      requestPage: "goods/pageActions",
    }),
    editGoods(id) {
      this.$emit("editGoods", id);
    },
    delGoods(id, goodsname) {
      this.$confirm("该操作将删除商品：" + goodsname, "警告", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(() => {
          requestDelGoods({ id: id }).then((res) => {
            if (res.data.code === 200) {
              successAlert("成功删除商品：" + goodsname);
              this.requestCount();
              this.requestGoodsList();
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
      this.requestCount();
      this.requestGoodsList();
    },
  },
  mounted() {
    this.requestCount();
    this.requestGoodsList();
  },
};
</script>
<style scoped>
</style>