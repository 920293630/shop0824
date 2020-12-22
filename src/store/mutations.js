export const state = {
  userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : null
}
export const mutations = {
  changeUser(state, arr) {
    state.userInfo = arr;
    if (arr) {
      sessionStorage.setItem('userInfo', JSON.stringify(arr))
    } else {
      sessionStorage.removeItem('userInfo');
    }
  }
}
export const getters = {
  userInfo(state) {
    return state.userInfo;
  }
}
