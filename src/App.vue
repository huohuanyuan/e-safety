<template>
  <div id="app">
    <router-view> </router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  //  mounted: function () {
  //        //此方法刷新页面时也会执行
  //        window.addEventListener('beforeunload',()=>{
  //           localStorage.removeItem('token');
  //       });
  //   },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
   height: 100%;
}
</style>
