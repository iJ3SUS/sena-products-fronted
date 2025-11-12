<template>
    <div class="inline-block relative">
        <component :width="props.width" :height="props.height" :color="props.class" :is="current"></component>
        <div class="click-outside-none cursor-pointer absolute top-0 left-0 w-full h-full"></div>
    </div>    
</template>

<script setup>
import { defineAsyncComponent } from 'vue'

import IconDefault from './Default.vue'

const props = defineProps({
    width: {
        type: String,
        default: '24'
    },
    height: {
        type: String,
        default: '24'
    },
    class: {
        type: String,
        default: 'text-slate-900'
    },
    icon: {
        type: String,
        default: 'Add'
    }
    
})

const current = defineAsyncComponent({
    loader: () => import(`./Icon${props.icon}.vue`),
    delay: 200,
    errorComponent: IconDefault,
    timeout: 3000
})

</script>