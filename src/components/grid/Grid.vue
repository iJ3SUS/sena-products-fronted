<template>
    <div class="gap-4 grid select-none mb-6" :class="[columns]" >
        <slot></slot>
    </div>
</template>
<script setup>
import { computed } from 'vue'

const props = defineProps({
    columns: {
        type: [Number, String],
        default: 12
    }
})

const cols = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
    7: 'grid-cols-7',
    8: 'grid-cols-8',
    9: 'grid-cols-9',
    10: 'grid-cols-10',
    11: 'grid-cols-11',
    12: 'grid-cols-12',
}

const columns = computed(() => {
    return cols[props.columns] ? cols[props.columns] : cols[12]
})


</script>