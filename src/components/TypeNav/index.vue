<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveShow" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 三级联动 -->
        <transition name="sort">
          <div class="sort" v-show="isshow">
            <!-- 利用时间委派+编程式导航实现路由的跳转和传递参数 -->
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
              >
                <h3
                  @mouseenter="changeIndex(index)"
                  :class="{ cur: currentIndex == index }"
                >
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <!-- 二级 三级分类 -->
                <div
                  class="item-list clearfix"
                  :style="{ display: currentIndex == index ? 'block' : 'none' }"
                >
                  <div
                    class="subitem"
                    v-for="(c2, index) in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em
                          v-for="(c3, index) in c2.categoryChild"
                          :key="c3.categoryId"
                        >
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// 引入方式：是把lodash全部功能函数引入
// 最好的方式是按需引入
import throttle from "lodash/throttle";

export default {
  name: "TypeNav",
  data() {
    return {
      // 存储用户鼠标移到哪一个元素上
      currentIndex: -1,
      isshow:true
    };
  },
  // 组件挂载完毕：可以向服务器发送请求
  mounted() {
    // 通知vuex发请求，获取数据，存储于仓库当中
    // this.$store.dispatch("categoryList");
    // 当组件挂载完毕，让show属性变为false
    if(this.$route.path != '/home'){
      this.isshow = false;
    }
  },
  computed: {
    ...mapState({
      // 右侧需要的是一个函数，当使用这个计算属性的时候，右侧函数会立即执行一次
      // 注入一个参数state，其实为大仓库的数据
      categoryList: (state) => state.home.categoryList,
    }),
  },
  methods: {
    // 鼠标移入修改响应数据
    changeIndex: throttle(function (index) {
      // index:鼠标移上某一个一级分类元素的索引值
      // 正常情况（用户慢慢的操作）：鼠标移入，每一个一级分类h3，都会触发鼠标进入事件
      // 非正常情况（用户操作很快）：本身全部的一级分类都应该触发鼠标进入事件，但是经过测试，只有部分h3触发了
      // 就是由于用户行为过快，导致浏览器反应不过来，如果当前回调函数中有一些大量业务，有可能出现卡顿现象
      this.currentIndex = index;
    }, 50),
    // 一级分类移出的时间回调
    leaveShow() {
      this.currentIndex = -1;
      if(this.$route.path != '/home'){
        this.isshow = false
      }
    },
    enterShow(){
      // 单鼠标移入的时候，让商品分类显示
      this.isshow = true
    },
    // 进行路由跳转的方法
    goSearch(event) {
      // 最好的解决方案：编程式导航+事件委派
      // 利用时间委派存在一些问题：是把全部的节点【h3，dt，dl，em】的实践全部委派给父节点
      // 点击a标签的时候，才会进行路由跳转【怎么确定点击的一定是a标签】
      // 存在的另一个问题：即使你能够确定点击的是a标签，如何区分是一级，二级，三级分类的标签

      // 第一个问题:把子节点当中a标签,我加上自定义属性data-categoryName,其余的节点是没有的
      let element = event.target;
      // 获取当前触发这个事件的节点【h3,a,dt,dl】，需要带有data-categoryname 这样节点的一定是a标签
      // 节点有一个dataset属性，可以获取节点自定义属性和属性值
      // console.log(element.dataset);
      let { categoryname, category1id, category2id, category3id } = element.dataset;
      // 如果标签身上拥有categroryname一定是a标签
      if (categoryname) {
        // 整理路由跳转的参数
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        // 一级分类，二级分类，三级分类a标签
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
        // 判断：如果路由跳转的时候，带有params参数，携带传过去
        if(this.$route.params){
          location.params = this.$route.params;
          // 整理完参数
          location.query = query;
          // 路由跳转
          this.$router.push(location)
          }
      }
    },
  },
};
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
        .cur {
          background: skyblue;
        }
      }
    }
    // 过度动画的样式
    // 过度动画开始
    .sort-enter{
      height:0px;
    }
    .sort-enter-to{
      height: 461px;
    }
    .sort-enter-active{
      transition:all 0.2s  ease;
    }
  }
}
</style>