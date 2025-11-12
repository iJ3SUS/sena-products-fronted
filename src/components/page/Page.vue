<template>
    <div>

        <Heading :name="route.meta.heading?.name" :description="route.meta.heading?.description">
            <slot name="actions"></slot>
        </Heading>
        
        <hr class="border-gray-300">

        <div class="py-4"></div>  

        <Transition 
            name="fade-slide"
            appear
            mode="out-in"
        >
            <div>
                <slot></slot>
            </div>
        </Transition>

    </div>
</template>

<script setup>

import { useRoute } from 'vue-router'

import Heading from '@/components/page/Heading.vue'

const route = useRoute()

</script>

<style scoped>
/* Transición fade-slide */
.fade-slide-enter-active,
.fade-slide-leave-active {
    transition: all 0.3s ease;
}

.fade-slide-enter-from {
    opacity: 0;
    transform: translateY(20px);
}

.fade-slide-leave-to {
    opacity: 0;
    transform: translateY(-20px);
}

.fade-slide-enter-to,
.fade-slide-leave-from {
    opacity: 1;
    transform: translateY(0);
}
</style>