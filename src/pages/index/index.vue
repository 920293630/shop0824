<template>
  <el-container class="index">
    <el-aside width="200px">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        :unique-opened="true"
        router
      >
        <el-menu-item index="/">
          <i class="el-icon-menu"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <template v-for="item in userInfo.menus">
          <el-submenu
            v-if="item.children"
            :index="item.id.toString()"
            :key="item.id"
          >
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{ item.title }}</span>
            </template>
            <template v-for="i in item.children">
              <el-menu-item :key="i.id" :index="'/' + i.url">
                {{ i.title }}
              </el-menu-item>
            </template>
          </el-submenu>
          <el-menu-item
            v-if="!item.children"
            :key="item.id"
            :index="'/' + item.url"
          >
            {{ item.title }}
          </el-menu-item>
        </template>
        <!-- <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span>系统设置</span>
          </template>
          <el-menu-item index="/menu">菜单管理</el-menu-item>
          <el-menu-item index="/role">角色管理</el-menu-item>
          <el-menu-item index="/user">管理员管理</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span>商品管理</span>
          </template>
          <el-menu-item index="/category">商品分类</el-menu-item>
          <el-menu-item index="/specs">商品规格</el-menu-item>
          <el-menu-item index="/goods">商品管理</el-menu-item>
          <el-menu-item index="/member">会员管理</el-menu-item>
          <el-menu-item index="/banner">轮播管理</el-menu-item>
          <el-menu-item index="/seckill">秒杀活动</el-menu-item>
        </el-submenu> -->
      </el-menu>
    </el-aside>
    <el-container>
      <el-header height="80px">
        <span>admin</span>
        <el-dropdown trigger="click" @command="handleCommand">
          <em class="el-dropdown-link">
            <i class="el-icon-setting"></i>
          </em>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="logout">退出登陆</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ $route.name }}</el-breadcrumb-item>
        </el-breadcrumb>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { successAlert } from "../../utils/alert";
export default {
  computed: {
    ...mapGetters({
      userInfo: "userInfo",
    }),
  },
  methods: {
    ...mapActions({
      userActions: "userActions",
    }),
    handleCommand(command) {
      if (command === "logout") {
        this.userActions();
        successAlert("退出登陆成功！");
        this.$router.push("/login");
      }
    },
  },
  mounted() {},
};
</script>
<style scoped>
.index {
  width: 100vw;
  height: 100vh;
}
.index .el-header {
  background-color: #b3c0d1;
  color: #333;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.index .el-header span {
  margin-right: 10px;
}
.index .el-header em {
  margin-right: 5px;
  font-size: 22px;
}
.index .el-header i {
  cursor: pointer;
}
.index .el-aside {
  height: 100%;
  background-color: #545c64;
  color: #333;
  text-align: left;
  line-height: 200px;
}
.index .el-main {
  background-color: #e9eef3;
  color: #333;
}
.index .el-main .el-breadcrumb {
  margin-bottom: 10px;
}
</style>