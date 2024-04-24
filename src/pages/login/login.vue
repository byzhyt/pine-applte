<template>
  <view class="flex-col height-vh">
    <view class="flex">

    </view>
    <view class="padding-50 flex-row justify-center text-primary" @tap="onTapChange">
      忘记密码？
    </view>
  </view>
</template>

<script setup lang="ts">
import { loginPage, loginPost } from '@/pages/scripts/login';

const pvlogin: any = ref(loginPage);

const onTapChange = () => navigateTo('/other/findpwd/findpwd');
const onTapSubmit = async ({ item }: any) => {
  const loop = verifyData(pvlogin);
  console.log(item.path);

  // loginPost(pvlogin.data);
  switchTab('/pages/home/home');
};
</script>
