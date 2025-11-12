<template>
    <div 
        :class="[
            'rounded-full bg-gradient-to-r from-primary-500 to-primary-600 flex items-center justify-center text-white font-bold',
            sizeClasses
        ]"
    >
        {{ initial }}
    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    name: {
        type: String,
        required: true
    },
    size: {
        type: String,
        default: 'md',
        validator: (value) => ['sm', 'md', 'lg', 'xl'].includes(value)
    }
})

const initial = computed(() => {
    return props.name ? props.name.charAt(0).toUpperCase() : '?'
})

const sizeClasses = computed(() => {
    const sizes = {
        sm: 'w-6 h-6 text-xs',
        md: 'w-8 h-8 text-sm',
        lg: 'w-10 h-10 text-base',
        xl: 'w-12 h-12 text-lg'
    }
    return sizes[props.size] || sizes.md
})
</script>