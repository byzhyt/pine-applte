<script setup lang="ts">
provide("globalData", {
  imgHttp: "https://metalshy.com",
  request: "https://metalshy.comn",
  task: null,
});
onLaunch(() => {
  setDetails({ 'www': 55, mm: '555' })
});
onShow(() => { });
onHide(() => { });
</script>
<style lang="scss">
/* #ifdef H5 */
uni-page-head {
  display: none !important;
  background-color: #e90e0e;
}

/* #endif */

@import "~@/static/iconfont.scss";
@import "~@/scss/index.scss";
</style>
