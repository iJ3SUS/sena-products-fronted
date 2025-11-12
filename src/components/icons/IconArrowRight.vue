<template>
    <svg xmlns="http://www.w3.org/2000/svg" :class="[props.color]" :width="props.width" :height="props.height" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
        class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-right">
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M5 12l14 0" />
        <path d="M13 18l6 -6" />
        <path d="M13 6l6 6" />
    </svg>
</template>
<script setup>

const props = defineProps({
    width: {
        type: String,
        default: '24'
    },
    height: {
        type: String,
        default: '24'
    },
    color: {
        type: String,
        default: 'text-slate-900'
    }
})

</script>