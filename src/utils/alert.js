/* 操作提示弹窗组件 */
import Vue from 'vue';
const vm = new Vue();

// 普通消息弹窗
export const msgAlert = (msg) => {
  vm.$message(msg);
}

// 操作成功弹窗
export const successAlert = (msg) => {
  vm.$message({
    type: 'success',
    message: msg
  });
}

// 操作错误弹窗
export const errorAlert = (msg) => {
  vm.$message.error(msg);
}

// 警告弹窗
export const warningAlert = (msg) => {
  vm.$message({
    type: 'warning',
    message: msg
  })
}
