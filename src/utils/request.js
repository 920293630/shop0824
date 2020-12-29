import axios from 'axios';
import qs from 'qs';
import store from '../store';
import router from '../router';

// 开发环境下
const baseUrl = "/api";

// 生产环境下
// const baseUrl = "";

var userStatus = true; // 记录当前token状态,如果过期提示一次后，过滤后续请求

// 请求拦截
// 用户登陆之后设置一个token
axios.interceptors.request.use((config) => {
  console.group("=== 本次请求的路径为： ===" + config.url);
  if (config.url !== baseUrl + '/api/userlogin') {
    config.headers.authorization = store.state.userInfo.token
  }
  console.log(config);
  console.groupEnd();
  return config
});
// 响应拦截
axios.interceptors.response.use((res) => {
  console.group("=== 本次响应的接口是：" + res.config.url + " ===");
  // 当token过期时处理
  if (res.data.code === 403) {
    if (userStatus) {
      store.dispatch('userActions');
      router.push('/login')
      window.alert("登陆已失效，请重新登陆！");
      userStatus = false;
    }
    return;
  } else {
    userStatus = true;
  }
  console.log(res);
  console.groupEnd();
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


/* 商品管理操作发送请求 */
// 添加商品
export const requestAddGoods = (data) => {
  let form = new FormData();
  for (let key in data) {
    form.append(key, data[key]);
  }
  return axios({
    method: 'post',
    url: baseUrl + '/api/goodsadd',
    data: form
  });
}

// 获取商品总数
export const requestGoodsCount = () => {
  return axios({
    method: 'get',
    url: baseUrl + '/api/goodscount'
  });
}

// 获取商品列表
export const requestGoodsList = (params) => {
  return axios({
    method: 'get',
    url: baseUrl + '/api/goodslist',
    params: params
  });
}

// 获取商品详细信息
export const requestGoodsDetail = (params) => {
  return axios({
    method: 'get',
    url: baseUrl + '/api/goodsinfo',
    params: params
  });
}

// 修改商品信息
export const requestEditGoods = (data) => {
  let form = new FormData();
  for (let key in data) {
    form.append(key, data[key]);
  }
  return axios({
    method: 'post',
    url: baseUrl + '/api/goodsedit',
    data: form
  });
}

// 删除商品
export const requestDelGoods = (data) => {
  return axios({
    method: 'post',
    url: baseUrl + '/api/goodsdelete',
    data: qs.stringify(data)
  });
}


/* 会员管理操作发送请求 */
// 获取会员列表
export const requestMemberList = () => {
  return axios({
    method: 'get',
    url: baseUrl + '/api/memberlist',
  });
}

// 获取会员详情
export const requestMemberDetail = (params) => {
  return axios({
    method: 'get',
    url: baseUrl + '/api/memberinfo',
    params: params
  });
}

// 修改会员信息
export const requestEditMember = (data) => {
  return axios({
    method: 'post',
    url: baseUrl + '/api/memberedit',
    data: qs.stringify(data)
  });
}


/* 轮播图管理操作发送请求 */
// 添加轮播图
export const requestAddBanner = (data) => {
  let form = new FormData();
  for (let key in data) {
    form.append(key, data[key]);
  }
  return axios({
    method: 'post',
    url: baseUrl + '/api/banneradd',
    data: form
  });
}

// 获取轮播图列表
export const requestBannerList = (params) => {
  return axios({
    method: 'get',
    url: baseUrl + '/api/bannerlist',
    params: params
  });
}

// 获取轮播图详情
export const requestBannerDetail = (params) => {
  return axios({
    method: 'get',
    url: baseUrl + '/api/bannerinfo',
    params: params
  });
}

// 修改轮播图
export const requestEditBanner = (data) => {
  let form = new FormData();
  for (let key in data) {
    form.append(key, data[key]);
  }
  return axios({
    method: 'post',
    url: baseUrl + '/api/banneredit',
    data: form
  });
}

// 删除轮播图
export const requestDelBanner = (data) => {
  return axios({
    method: 'post',
    url: baseUrl + '/api/bannerdelete',
    data: qs.stringify(data)
  });
}

/* 秒杀活动管理操作发送请求 */
// 添加活动
export const requestAddSeckill = (data) => {
  return axios({
    method: 'post',
    url: baseUrl + '/api/seckadd',
    data: qs.stringify(data)
  });
}

// 秒杀活动列表
export const requestSeckillList = (params) => {
  return axios({
    method: 'get',
    url: baseUrl + '/api/secklist',
    params: params
  });
}

// 获取活动详情
export const requestSeckillDetail = (params) => {
  return axios({
    method: 'get',
    url: baseUrl + '/api/seckinfo',
    params: params
  });
}

// 修改秒杀活动
export const requestEditSeckill = (data) => {
  return axios({
    method: 'post',
    url: baseUrl + '/api/seckedit',
    data: qs.stringify(data)
  });
}

// 删除秒杀活动
export const requestDelSeckill = (data) => {
  return axios({
    method: 'post',
    url: baseUrl + '/api/seckdelete',
    data: qs.stringify(data)
  });
}
