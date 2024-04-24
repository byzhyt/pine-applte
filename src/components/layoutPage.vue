<template>
    <view :class="className">
        <solt></solt>
    </view>
</template>

<script setup lang="ts">

defineProps({
    className: {
        type: String
    }
})
defineExpose({

})
</script>