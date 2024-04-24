<template>
  <div>mine</div>
</template>
<script setup lang="ts">
import { MineJson, AvatarJson } from '@/pages/scripts/mine';

const pvmine: any = reactive({
  mineJson: MineJson,
  avatarJson: AvatarJson,
  userInfo: uniGetStorage('userInfo')
});

const onTapChange = ({ item }: any) => {
};
const onGetUserInfo = ({ item, data }: any) => {
  // this.userInfo = data.userInfo;
};

const onTapLoginOut = () => {
  uni.clearStorage();
  routerTo();
};
</script>
