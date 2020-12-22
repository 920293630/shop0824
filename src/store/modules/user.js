import {
  requestUserCount,
  requestUserList,
} from '../../utils/request';

const state = {
  list: {
    userList: [], // 管理员列表
    count: 0, // 总记录条数
    size: 5, // 每页显示条数
    page: 1 // 当前页码
  }
}

const mutations = {
  changeUserList(state, arr) {
    state.list.userList = arr;
  },
  changeCount(state, count) {
    state.list.count = count;
  },
  changePage(state, page) {
    state.list.page = page;
  }
}

const actions = {
  userListActions(context) {
    let size = context.state.list.size;
    let page = context.state.list.page;
    requestUserList({
      size,
      page
    }).then((res) => {
      if (res.data.code === 200) {
        if (res.data.list === null && page > 1) {
          context.commit('changePage', page - 1);
          context.dispatch('userListActions');
          return;
        }
        context.commit('changeUserList', res.data.list);
      }
    });
  },
  countActions(context) {
    requestUserCount().then((res) => {
      if (res.data.code === 200) {
        context.commit('changeCount', res.data.list[0].total);
      }
    });
  },
  pageActions(context, page) {
    context.commit('changePage', page);
  }
}

const getters = {
  list(state) {
    return state.list;
  },
}

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
}
