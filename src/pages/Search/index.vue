<template>
  <div>
    <!-- <h1>params参数--{{ $route.params.keyword }}</h1>
    <h1>query参数--{{ $route.query }}</h1> -->

    <!-- 通过简写 -->
    <h1>params参数--{{ keyword }}</h1>
    <h1>query参数--{{ k }}</h1>

  </div>
</template>

<script>
export default {
  name: "Search",
  // 路由组件是可以传递props
  props:['keyword','k'],
};
</script>

<style>
</style>