import {
  requestSpecsCount,
  requestSpecsList
} from '../../utils/request';

const state = {
  list: {
    specsList: [], // 管理员列表
    count: 0, // 总记录条数
    size: 3, // 每页显示条数
    page: 1 // 当前页码
  }
}

const mutations = {
  changeSpecsList(state, arr) {
    state.list.specsList = arr;
  },
  changeCount(state, count) {
    state.list.count = count;
  },
  changePage(state, page) {
    state.list.page = page;
  }
}

const actions = {
  specsListActions(context) {
    let params = {
      size: context.state.list.size,
      page: context.state.list.page
    }
    requestSpecsList(params).then((res) => {
      if (res.data.code === 200) {
        if ((!res.data.list) && params.page > 1) {
          context.commit('changePage', params.page - 1);
          context.dispatch('specsListActions');
          return;
        }
        context.commit('changeSpecsList', res.data.list);
      }
    });
  },
  countActions(context) {
    requestSpecsCount().then((res) => {
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
