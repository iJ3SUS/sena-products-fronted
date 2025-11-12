<template>
    <div class="flex justify-between" :class="[size]"
        @dragstart="dragstart"
        @dragover.prevent
        @drop="drop"
        :draggable="props.draggable"
    >
        <slot></slot>
            
    </div>
</template>
<script setup>

import { computed } from 'vue'

const emit = defineEmits(['change'])

const props = defineProps({
    size: {
        type: [ String, Number ],
        default: 1
    },
    uuid: {
        type: String,
        default: ''
    },
    draggable: {
        type: Boolean,
        default: false
    }
})

const sizes = {
    1: 'col-span-1',
    2: 'col-span-2',
    3: 'col-span-3',
    4: 'col-span-4',
    5: 'col-span-5',
    6: 'col-span-6',
    7: 'col-span-7',
    8: 'col-span-8',
    9: 'col-span-9',
    10: 'col-span-10',
    11: 'col-span-11',
    12: 'col-span-12'
}

const size = computed(() => {
    return sizes[props.size] ? sizes[props.size] : sizes[12]
})


const dragstart = (event) => {
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('text/plain',  props.uuid)
}

const drop = (event) => {

    event.preventDefault()

    const from = event.dataTransfer.getData('text/plain')
    const to = props.uuid

    if(from == to) return 

    emit('change', from, to)

}

</script>