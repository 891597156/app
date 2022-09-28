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

