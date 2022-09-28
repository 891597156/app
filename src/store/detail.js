import {
  reqGoodsInfo,reqAddOrUpdateShopCart
} from '@/api'
// 封装游客临时身份uuid-->生产一个随机字符串（不能再变了）
import {getUUID} from '@/utils/uuid_token'
const state = {
  goodInfo: {},
  uuid_token:getUUID()
}
const mutations = {
  GETGOODINFO(state, goodInfo) {
    state.goodInfo = goodInfo
  }
}
const actions = {
  // 获取产品信息action
  async getGoodsInfo({
    commit
  }, skuId) {
    let result = await reqGoodsInfo(skuId);
    if (result.code == 200) {
      commit('GETGOODINFO', result.data)
    }
  },
  // 将产品添加到购物车中 || 修改某一个产品的个数
  async addOrUpdateShopCart({
    commit
  }, {
    skuId,
    skuNum
  }) {
    // 加入购物车返回的解构
    // 加入购物车以后(发请求),前台将参数带给服务器
    // 服务器吸入数据成功,并没有返回其他的数据,只是返回code=200 代表这次操作成功
    // 因为服务器没有返回其他的数据,因此我们不需要三连环存储数据
    // 注意：async函数执行返回结果一定是一个promise【要么成功，要么失败】
    let result = await reqAddOrUpdateShopCart(skuId, skuNum);
    if(result.code == 200){
      return 'ok'
    }else{
      return Promise.reject(new Error('faile'))
    }
   
  }
}
const getters = {
  // 路径导航、面包屑简化数据
  categoryView(state) {
    // 单前计算出 categoryView属性至少是一个空对象，就不会报错
    return state.goodInfo.categoryView || {}
  },
  // 简化产品信息的数据
  skuInfo(state) {
    return state.goodInfo.skuInfo || {}
  },
  // 产品销售属性的简化
  spuSaleAttrList(state) {
    return state.goodInfo.spuSaleAttrList || []
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}