import {
  reqGetSearchInfo
} from '@/api'
// search模块的小仓库
const state = {
  searchList: {},
}
const mutations = {
  GETSEARCHINFO(state, searchList) {
    state.searchList = searchList
  }
}
const actions = {
  // 获取search模块数据
  async getSearchList({
    commit
  }, params = {}) {
    // 当前这个reqGetSearchInfo这个函数在调用获取服务器数据的时候，至少传递一个参数
    let result = await reqGetSearchInfo(params)
    if (result.code == 200) {
      commit("GETSEARCHINFO", result.data)
    }
  }
}
//计算属性，项目中getters主要作用：简化仓库中的数据
const getters = {
  goodsList(state){
    return state.searchList.goodsList || []
  },
  trademarkList(state){
    return state.searchList.trademarkList || []
  },
  attrsList(state){
    return state.searchList.attrsList || []
  },
}
export default {
  state,
  mutations,
  actions,
  getters
}