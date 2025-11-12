<template>

    <div class="relative w-full select-text">
        <label :for="props.id" class="bg-white px-1.5 rounded absolute block mb-2 text-xs font-semibold z-10 shadow"
            :class="[
                error ? 'text-orange-600' : isFocus ? '' : 'text-gray-900',
                disabled ? 'shadow' : ''
            ]"
            :style="{
                top:'-8px',
                left: '5px'
            }"
        >{{ props.label }}</label>
        <select v-model="selected" :name="label" 
            class="
                border text-gray-900 text-sm rounded block w-full px-2 py-2.5 outline-none h-11
            "
            :class="[
                error ? 'border-orange-400 focus:ring-orange-500 focus:border-orange-500 focus:ring-1' : 'border-gray-200 focus:ring-cyan-700 focus:border-cyan-700 focus:ring-1',
                disabled ? 'bg-gray-100' : ''
            ]"
            :disabled="props.disabled"
            @change="change"
            @focus="isFocus = true"
            @blur="isFocus = false"
        >
            <option :value="null" :disabled="props.disablePlaceholder">Sin seleccionar</option>
            <option v-for="(item, index) in props.options" :value="index">{{ item[option_label] }}</option>
        
        </select>
        <Transition mode="out-in" name="fade">
            <div class="pt-0.5 text-xs text-orange-600" v-if="error">
                {{ error }}
            </div>
        </Transition>
    </div> 

</template>

<script setup>

import { onMounted, ref, watch, computed } from 'vue'

const emit = defineEmits(['update:modelValue', 'change'])

const props = defineProps({
    label: {
        type: String,
        default: ""
    },
    id: {
        type: String,
        default: null
    },
    options: {
        type: Array,
        default: []
    },
    option_label: {
        type: String,
        default: 'label'
    },
    option_value: {
        type: String,
        default: 'value'
    },
    modelValue: {
        default: null
    },
    errors: {
        default: {}
    },
    name: {
        type: String,
        default: ''
    },
    disabled: {
        type: Boolean,
        default: false
    },
    disablePlaceholder: {
        type: Boolean,
        default: false
    }
})

const selected = ref(null)

const isFocus = ref(false)

const change = () => {

    delete props.errors[props.name]

    const payload = selected.value === null ? null : props.options[selected.value][props.option_value]

    emit('update:modelValue', payload)
    emit('change', payload)
    
}

const error = computed(() => {
    return props.errors[props.name]
})

watch(() => props.modelValue,
    (current) => {
        const index = props.options.findIndex(e => {
            return JSON.stringify(e[props.option_value]) == JSON.stringify(props.modelValue)
        })

        selected.value = index != - 1 ? index : null

    }
)

watch(() => props.options,
    (current) => {

        const index = props.options.findIndex(e => {
            return JSON.stringify(e[props.option_value]) == JSON.stringify(props.modelValue)
        })

        selected.value = index != - 1 ? index : null

    }
)

onMounted(() => {

    const index = props.options.findIndex(e => {
        return JSON.stringify(e[props.option_value]) == JSON.stringify(props.modelValue)
    })

    selected.value = index != - 1 ? index : null

})

</script>
