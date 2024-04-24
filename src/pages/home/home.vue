<template>
  <view>home</view>
</template>

<script setup lang="ts">
const onTapChange = async () => {
  // const res = await getUserInfo()
};

onShow(async () => {
  const res = uni.getLaunchOptionsSync();
  console.log(res);
  // this.vtype = await getview();
});
</script>
