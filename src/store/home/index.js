import {reqcategoryList,reqGetBannerList,reqFloorList} from '@/api';
// home模块的小仓库
const state = {
  // state中的数据默认初始值不要瞎写，服务器返回对象，服务器就返回数组
  categoryList:[],
  BannerList:[],
  FloorList:[],
}
const mutations = {
  CATEGORYLIST(state,categoryList){
    state.categoryList = categoryList
  },
  BANNERLIST(state,BannerList){
    // console.log("修改仓库数据");
    state.BannerList = BannerList
  },
  FLOORLIST(state,FloorList){
    state.FloorList = FloorList
  }
}
const actions = {
  // 通过API里面的接口函数调用，向服务器发请求
  async categoryList({commit}){
    let result = await reqcategoryList()
    // console.log(result);
    if(result.code == 200){
      commit("CATEGORYLIST",result.data)
    }
  },
  // 获取首页轮播图的数据
  async getBannerList({commit}){
    // console.log("获取服务器数据");
    let result = await reqGetBannerList()
    if(result.code == 200){
      commit("BANNERLIST",result.data)
    }
  },
  // 获取floor数据
  async getFloorList({commit}){
    let result = await reqFloorList()
    if(result.code == 200){
      commit('FLOORLIST',result.data)
    }
  }
}
const getters = {}
export default {
  state,
  mutations,
  actions,
  getters
}