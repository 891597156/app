import {
  reqCarList,reqDeleteCartById,reqUpdatecheckCar
} from '@/api'

const state = {
  cartList: []
}
const mutations = {
  GRTCARLIST(state, cartList) {
    state.cartList = cartList
  }
}
const actions = {
  // 获取购物车列表数据
  async getCarList({
    commit
  }) {
    let result = await reqCarList();
    console.log(result);
    if (result.code == 200) {
      commit('GRTCARLIST', result.data)
    }
  },
  // 删除购物车摸一个产品
  async deleteCarListBySkuId({commit},{skuId}){
    let result = await reqDeleteCartById(skuId);
    if(result.code == 200){
      return 'ok'
    }else{
      return Promise.reject(new Error('faile'))
    }
  },
  // 修改购物车某一个产品的选中状态
  async updateCheckedById({commit},{skuId,isChecked}){
   let result = await reqUpdatecheckCar(skuId,isChecked)
   console.log(skuId,isChecked);
   if(result.code == 200){
    return 'ok'
   }else{
    return Promise.reject(new Error('faile'))
   }
  }
}
const getters = {
  cartList(state) {
    return state.cartList[0] || {}
  },
}
export default {
  state,
  mutations,
  actions,
  getters
}