<template>
  <div class="login">
    <h2>后台操作管理系统</h2>
    <div class="loginWindow">
      <h3>登陆</h3>
      <p>
        <strong>账号：</strong
        ><el-input
          v-model.trim="user.username"
          placeholder="请输入用户名"
        ></el-input>
      </p>
      <p>
        <strong>密码：</strong
        ><el-input
          type="password"
          v-model="user.password"
          placeholder="请输入密码"
        ></el-input>
      </p>
      <el-button type="success" @click="login">登 陆</el-button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { errorAlert, successAlert } from "../../utils/alert";
import { requestUserLogin } from "../../utils/request";
export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions({
      userActions: "userActions",
    }),
    login() {
      requestUserLogin(this.user).then((res) => {
        if (res.data.code === 200) {
          successAlert(res.data.msg);
          this.userActions(res.data.list);
          this.$router.push("/");
        } else {
          errorAlert(res.data.msg);
        }
      });
    },
  },
};
</script>
<style scoped>
.login {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(left, #553443, #2f3d60);
  text-align: center;
  position: fixed;
  left: 0;
  top: 0;
}
.login > h2 {
  letter-spacing: 10px;
  margin-top: 100px;
  font-size: 42px;
  font-weight: bold;
  color: #fff;
}
.login .loginWindow {
  width: 400px;
  height: 300px;
  background-color: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
}
.login .loginWindow h3 {
  letter-spacing: 5px;
  font-size: 24px;
  font-weight: bold;
  margin: 20px 0;
}
.login .loginWindow p {
  padding: 10px 20px;
  display: flex;
}
.login .loginWindow p strong {
  white-space: nowrap;
  line-height: 36px;
  font-size: 18px;
}
.login .loginWindow .el-button {
  width: 90%;
  margin-top: 30px;
}
</style>