// 当前这个模块：api进行统一管理
import requsets from './ajax'
import mockRequests from './mockAjax'

// 三级联动接口
// /api/product/getBaseCategoryList get 无参数
// 发请求: axios 发请求返回结果Promise对象
export const reqcategoryList = () => requsets({
  url: '/product/getBaseCategoryList',
  method: 'get'
})

// 获取banner（home首页轮播图接口）
export const reqGetBannerList = () => mockRequests.get('/banner')

// 获取floor数据 
export const reqFloorList = () => mockRequests.get('/floor')

// 获取搜索商品数据 地址：/api/list 方式：post  参数：需要带参数
/*
{
  "category3Id": "61",
  "categoryName": "手机",
  "keyword": "小米",
  "order": "1:desc",
  "pageNo": 1,
  "pageSize": 10,
  "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
  "trademark": "4:小米"
}
*/
export const reqGetSearchInfo = (params)=>requsets({url:'/list',method:"post",data:params})

// 获取产品详情信息的接口 /api/item/{ skuId } 请求方式Get 
export const reqGoodsInfo = (skuId)=>requsets({url:`/item/${skuId}`,method:'get'})

// 将产品添加到购物车中（获取更新某一个产品的个数）/api/cart/addToCart/{ skuId }/{ skuNum }
 export const reqAddOrUpdateShopCart = (skuId,skuNum) => requsets({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post'})

//  获取购物车列表数据接口 /api/cart/cartList 请求方式get 
export const reqCarList = ()=>requsets({url:'/cart/cartList',method:'get'})

//删除购物车产品的接口 /api/cart/deleteCart/{skuId} DELETE
export const reqDeleteCartById = (skuId)=>requsets({url:`/cart/deleteCart/${skuId}`,method:'delete'}) 

// 修改商品的选中状态 /api/cart/checkCart/{skuId}/{isChecked}
export const reqUpdatecheckCar = (skuId,isChecked) => requsets({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})