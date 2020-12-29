import {
  requestGoodsCount,
  requestGoodsList
} from '../../utils/request';

const state = {
  list: {
    goodsList: '',
    count: 0,
    size: 5,
    page: 1
  }
}

const mutations = {
  changeGoodsList(state, arr) {
    state.list.goodsList = arr
  },
  changeCount(state, count) {
    state.list.count = count;
  },
  changePage(state, page) {
    state.list.page = page;
  }
}

const actions = {
  goodsListActions(context, all) {
    let params = "";
    if (!all) {
      params = {
        size: context.state.list.size,
        page: context.state.list.page
      }
    }
    requestGoodsList(params).then((res) => {
      if (res.data.code === 200) {
        if ((!res.data.list) && params.page > 1) {
          context.commit('changePage', params.page - 1);
          context.dispatch('goodsListActions');
          return;
        }
        context.commit('changeGoodsList', res.data.list);
      }
    });
  },
  countActions(context) {
    requestGoodsCount().then((res) => {
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
