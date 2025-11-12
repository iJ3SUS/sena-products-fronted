<template>
    <div>
        <label class="inline-flex items-center cursor-pointer">
            <input type="checkbox" :checked="checked" class="sr-only peer"
                :disabled="disabled"
                @change="(e) => {
                    checked = e.target.checked
                    emit('change', checked)
                    emit('update:modelValue', checked)
                }"
            >
            <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-300  rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
            <span class="ms-3 text-sm font-medium text-gray-900">{{ props.label }}</span>
        </label>
    </div>
</template>

<script setup>

import { ref } from 'vue'

const emit = defineEmits(['update:modelValue', 'change'])

const props = defineProps({
    label: {
        type: String,
        default: ""
    },
    modelValue: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    }
})

const checked = ref(props.modelValue)

watch(() => props.modelValue, (newVal) => {
    checked.value = newVal
})

</script>