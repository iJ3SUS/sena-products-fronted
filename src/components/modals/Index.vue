<template>
    <div class="relative z-50">
        <div class="fixed inset-0 z-10 overflow-y-auto">
            <div class="flex min-h-screen items-end sm:items-center justify-center p-4 text-center">
                <div :class="[
                    'relative w-full transform bg-white text-left shadow-xl transition-all',
                    'flex flex-col min-h-[90vh] sm:min-h-0 sm:max-h-[90vh]',
                    'rounded-t-2xl sm:rounded-xl', size
                ]">
                    <!-- Header fijo -->
                    <div class="flex-none sticky top-0 z-10 bg-white border-b border-gray-200 p-4 rounded-t-2xl sm:rounded-t-xl">
                        <div class="flex justify-between items-center">
                            <h3 class="text-base sm:text-lg font-semibold text-gray-900 pr-4 truncate">
                                {{ title }}
                            </h3>
                            <button 
                                @click="close"
                                class="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition duration-300 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300 cursor-pointer"
                            >
                                <svg class="size-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div :id="id" class="flex-1 overflow-y-auto overflow-x-hidden p-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                        <slot></slot>
                    </div>
                    
                    <div v-if="$slots.footer" class="flex-none border-t border-gray-200 p-4">
                        <slot name="footer"></slot>
                    </div>
                </div>
            </div>
        </div>

        <div class="fixed inset-0 bg-gray-800/60 transition-all duration-300"></div>
    </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, useId } from 'vue'

const props = defineProps({
    title: {
        type: String,
        default: "Modal"
    },
    id: {
        type: String,
        default: () => useId()
    },
    size: {
        type: String,
        default: 'sm:max-w-md'
    }
})

const emit = defineEmits(['close'])

const blockScroll = () => {
    document.body.style.overflow = 'hidden'
}

const enableScroll = () => {
    document.body.style.overflow = 'auto'
}

onMounted(() => {
    blockScroll()
})

onBeforeUnmount(() => {
    enableScroll()
})

const close = () => {
    enableScroll()
    emit('close')
}

</script>
