<template>
  <web-view
    :src="pvview.path"
    @message="onTapChange"
    @onPostMessage="onTapChange"></web-view>
</template>

<script setup lang="ts">
import { webview } from '@/static/index';
const pvview = ref();
onLaunch(async (option: any) => {
  pvview.value = await webview(option.pagetype);
  uni.setNavigationBarTitle({
    title: pvview.value.title
  });
});
const onTapChange = () => navigateBack(1);
</script>
