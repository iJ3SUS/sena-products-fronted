<template>
    <svg xmlns="http://www.w3.org/2000/svg" :class="[props.color]" :width="props.width" :height="props.height" viewBox="0 0 24 24" fill="currentColor"
        class="icon icon-tabler icons-tabler-filled icon-tabler-point">
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M12 7a5 5 0 1 1 -4.995 5.217l-.005 -.217l.005 -.217a5 5 0 0 1 4.995 -4.783z" />
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