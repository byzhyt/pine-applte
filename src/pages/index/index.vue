<template>
  <view class="flex-col height-vh align-center">
    <view class="flex"></view>
    <view class="flex-row padding-30 text-center width-full" @tap="onTapChange">
      8888
    </view>
  </view>
</template>

<script setup lang="ts">
const router = useRouter();

const onTapChange = (item: any) => {
  router.pushTab('/login');
};
</script>
