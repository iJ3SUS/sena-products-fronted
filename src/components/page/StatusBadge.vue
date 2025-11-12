<template>
    <span :class="[
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        active 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
    ]">
        <span :class="[
            'w-1.5 h-1.5 rounded-full mr-1.5',
            active ? 'bg-green-400' : 'bg-red-400'
        ]"></span>
        {{ active ? 'Activo' : 'Inactivo' }}
    </span>
</template>

<script setup>
defineProps({
    active: {
        type: Boolean,
        required: true
    }
})
</script>