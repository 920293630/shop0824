import axios from 'axios';
import qs from 'qs';
import store from '../store';

const baseUrl = "/api";

// 请求拦截
// 用户登陆之后设置一个token
axios.interceptors.request.use((config) => {
  console.group("=== 本次请求的路径为： ===" + config.url);
  if (config.url !== baseUrl + '/api/userlogin') {
    config.headers.authorization = store.state.userInfo.token
  }
  console.log(config);
  console.groupEnd("=== 请求结束 ===");
  return config
});
// 响应拦截
axios.interceptors.response.use((res) => {
  console.group("=== 本次响应的接口是：" + res.config.url + " ===");
  // 当token过期时处理
  if (res.data.code === 403) {
    store.dispatch('userActions');
    window.open('/#/login', '_self');
    window.alert("登陆以失效，请重新登陆！");
  }
  console.log(res);
  console.groupEnd("=== 响应结束 ===");
  return res;
});

/* 菜单操作发送请求 */
// 添加菜单
export const requestAddMenu = (data) => {
  return axios({
    method: 'post',
    url: baseUrl + '/api/menuadd',
    data: qs.stringify(data)
  });
}

// 获取菜单列表
export const requestMenuList = (params) => {
  return axios({
    method: 'get',
    url: baseUrl + '/api/menulist',
    params: params
  });
}

// 获取一个菜单的详细信息
export const requestMenuDetail = (params) => {
  return axios({
    method: 'get',
    url: baseUrl + '/api/menuinfo',
    params: params
  });
}

// 修改菜单信息
export const requestEditMenu = (data) => {
  return axios({
    method: 'post',
    url: baseUrl + '/api/menuedit',
    data: qs.stringify(data)
  });
}

// 删除指定菜单
export const requestDelMenu = (data) => {
  return axios({
    method: 'post',
    url: baseUrl + '/api/menudelete',
    data: qs.stringify(data)
  });
}

/* 角色操作发送请求 */
// 添加角色
export const requestAddRole = (data) => {
  return axios({
    method: 'post',
    url: baseUrl + '/api/roleadd',
    data: qs.stringify(data)
  })
}

// 获取角色列表
export const requestRoleList = (params) => {
  return axios({
    method: 'get',
    url: baseUrl + '/api/rolelist',
    params: params
  });
}

// 获取角色详细
export const requestRoleDetail = (params) => {
  return axios({
    method: 'get',
    url: baseUrl + '/api/roleinfo',
    params: params
  });
}

// 修改角色信息
export const requestEditRole = (data) => {
  return axios({
    method: 'post',
    url: baseUrl + '/api/roleedit',
    data: qs.stringify(data)
  });
}

// 删除角色信息
export const requestDelRole = (data) => {
  return axios({
    method: 'post',
    url: baseUrl + '/api/roledelete',
    data: qs.stringify(data)
  });
}

/* 管理员管理操作发送请求 */
// 添加管理员
export const requestAddUser = (data) => {
  return axios({
    method: 'post',
    url: baseUrl + '/api/useradd',
    data: qs.stringify(data)
  });
}

// 获取管理员总数
export const requestUserCount = () => {
  return axios({
    method: 'get',
    url: baseUrl + '/api/usercount'
  });
}

// 获取管理员列表
export const requestUserList = (params) => {
  return axios({
    method: 'get',
    url: baseUrl + '/api/userlist',
    params: params
  });
}

// 获取管理员信息
export const requestUserDetail = (params) => {
  return axios({
    method: 'get',
    url: baseUrl + '/api/userinfo',
    params: params
  });
}

// 修改管理员
export const requestEditUser = (data) => {
  return axios({
    method: 'post',
    url: baseUrl + '/api/useredit',
    data: qs.stringify(data)
  });
}

// 删除管理员
export const requestDelUser = (data) => {
  return axios({
    method: 'post',
    url: baseUrl + '/api/userdelete',
    data: qs.stringify(data)
  });
}

// 管理员登陆
export const requestUserLogin = (data) => {
  return axios({
    method: 'post',
    url: baseUrl + '/api/userlogin',
    data: qs.stringify(data)
  });
}

/* 商品分类操作发送的请求 */
// 添加分类
export const requestAddCate = (data) => {
  let form = new FormData();
  for (let key in data) {
    form.append(key, data[key]);
  }
  return axios({
    method: 'post',
    url: baseUrl + '/api/cateadd',
    data: form
  });
}

// 获取商品分类列表
export const requestCateList = (params) => {
  return axios({
    method: 'get',
    url: baseUrl + '/api/catelist',
    params: params
  });
}

// 获取商品分类详情
export const requestCateDetail = (params) => {
  return axios({
    method: 'get',
    url: baseUrl + '/api/cateinfo',
    params: params
  });
}

// 修改商品分类
export const requestEditCate = (data) => {
  let form = new FormData();
  for (let key in data) {
    form.append(key, data[key]);
  }
  console.log(form);
  return axios({
    method: 'post',
    url: baseUrl + '/api/cateedit',
    data: form
  });
}

// 删除商品分类
export const requestDelCate = (data) => {
  return axios({
    method: 'post',
    url: baseUrl + '/api/catedelete',
    data: qs.stringify(data)
  });
}


/* 商品规格操作发送请求 */
// 添加规格
export const requestAddSpecs = (data) => {
  return axios({
    method: 'post',
    url: baseUrl + '/api/specsadd',
    data: qs.stringify(data)
  });
}

// 获取规格总数
export const requestSpecsCount = () => {
  return axios({
    method: 'get',
    url: baseUrl + '/api/specscount'
  });
}

// 获取规格列表
export const requestSpecsList = (params) => {
  return axios({
    method: 'get',
    url: baseUrl + '/api/specslist',
    params: params
  });
}

// 获取规格详细信息
export const requestSpecsDetail = (params) => {
  return axios({
    method: 'get',
    url: baseUrl + '/api/specsinfo',
    params: params
  });
}

// 修改规格
export const requestEditSpecs = (data) => {
  return axios({
    method: 'post',
    url: baseUrl + '/api/specsedit',
    data: qs.stringify(data)
  });
}

// 删除规格
export const requestDelSpecs = (data) => {
  return axios({
    method: 'post',
    url: baseUrl + '/api/specsdelete',
    data: qs.stringify(data)
  });
}
