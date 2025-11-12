<template>
    <div class="bg-white rounded-xl shadow-sm mb-6 overflow-hidden">
        <div class="relative">
            <div class="absolute top-0 left-0 w-2 h-full bg-primary-700"></div>
            <div class="p-6 pl-8">
                <div class="flex justify-between items-center">
                    <div class="space-y-1">
                        <div class="flex items-center gap-3">
                            <h1 class="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                {{ name }}
                                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-50 text-primary-700">
                                    v1.0
                                </span>
                            </h1>
                        </div>
                        <p class="text-sm text-gray-500">
                            {{ description }}
                        </p>
                    </div>
                    <div class="flex items-center gap-3">
                        <Button 
                            theme="circle" 
                            color="gray" 
                            v-if="!route.meta.page?.hide_back_button" 
                            @click.prevent="router.back()"
                            class="hover:bg-gray-100 transition-colors duration-200"
                        >
                            <Icon icon="ArrowLeft" width="20" height="20" class="text-gray-600"/>
                        </Button>
                        <div class="h-8 w-px bg-gray-200"></div>
                        <slot></slot>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
<script setup>

import { useRoute, useRouter } from 'vue-router'

const props = defineProps({
    name: {
        type: String,
        default: 'Sin nombre'
    },
    description: {
        type: String,
        default: 'Sin descripción'
    }
})

const router = useRouter()
const route = useRoute()

</script>