<template>
  <pv-form
    v-model="loginForm"
    ref="loginForm"
    @change="onTapChange"
    @submit="onBeforeSubmit"
    :option="loginJson"></pv-form>
</template>

<script setup lang="ts">
import LoginJson from '@/other/scripts/findpwd';
const loginJson = ref(LoginJson);
const loginForm: any = ref();

const onBeforeSubmit = (data: any) => {
  data.mmmm = 555555;
  loginForm.value = data;
};
const onTapChange = async ({ data }: any) => {
  // UserInfoModule.setToken(data.access_token);
  // UserInfoModule.setUserInfo(await getUserInfo());
};
</script>
