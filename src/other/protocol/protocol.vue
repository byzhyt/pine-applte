<template>
  <view class="flex-column padding-34">
    <rich-text
      :selectable="false"
      class="flex unselect"
      :nodes="content"></rich-text>
    <button
      class="button-primary padding-top-bottom-14 text-center width-full"
      @tap="onTapChange">
      返回上一页
    </button>
  </view>
</template>

<script setup lang="ts">
import { protocol } from '@/static/index';
const content = ref(protocol);
const onTapChange = () => navigateBack();
</script>
