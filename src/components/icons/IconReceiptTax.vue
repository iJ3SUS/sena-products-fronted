<template>
    <svg xmlns="http://www.w3.org/2000/svg" :class="[props.color]" :width="props.width" :height="props.height" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
        class="icon icon-tabler icons-tabler-outline icon-tabler-receipt-tax">
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M9 14l6 -6" />
        <circle cx="9.5" cy="8.5" r=".5" fill="currentColor" />
        <circle cx="14.5" cy="13.5" r=".5" fill="currentColor" />
        <path d="M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16l-3 -2l-2 2l-2 -2l-2 2l-2 -2l-3 2" />
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