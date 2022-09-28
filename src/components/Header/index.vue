<template>
  <!-- 头部 -->
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p>
            <span>请</span>
            <router-link to="/login">登录</router-link>
            <router-link to="/register">免费注册</router-link>
          </p>
        </div>
        <div class="typeList">
          <a href="###">我的订单</a>
          <a href="###">我的购物车</a>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
          <router-link to="/home" class="logo">
            <img src="./images/logo.png" alt="" />
          </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="keyWord"
          />
          <button class="sui-btn btn-xlarge btn-danger" type="button" @click="goSearch">
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      keyWord: "",
    };
  },
  methods: {
    goSearch() {
      // 路由传参：
      //第一种：字符串方式
      // this.$router.push("/search/"+this.keyWord+"?key="+this.keyWord.toLowerCase());
      // 第二种方式: 模板字符串
      // this.$router.push(`/search/${this.keyWord}?key=${this.keyWord.toLowerCase()}`)
      // 第三种写法：对象（常用）
      // this.$router.push({name:'search',params:{keyword:this.keyWord},query:{k:this.keyWord.toUpperCase()}})

      // 面试题2,。如何制定params参数可传可不传?
      // 如果路由要求传递params参数，但是你就不传递params参数，那么url会出现问题
      //如何指定params参数可以传递，或者不传递，在配置路由的时候，在站位符的后面加上一个问号?
      // this.$router.push({name:'search',query:{k:this.keyWord.toUpperCase()}})

      // 面试题3：
      // 使用undefined解决：params参数可以传递，不传递（空的字符串）
      //this.$router.push({name:'search',params:{keyword:''|| undefined},query:{k:this.keyWord.toUpperCase()}})

      // 面试题4：路由组件能不能传递props数据
      // 可以的：三种写法
      if(this.$route.query){
        let location = {name: "search",params: { keyword: this.keyWord || undefined}}
        location.query = this.$route.query
        this.$router.push(location)
      }
    },
  },
  mounted(){
    // 通过全局事件总线清楚关键字
    this.$bus.$on("clear",()=>{
      this.keyWord = ''
    })
  }
};
</script>

<style lang="less" scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>