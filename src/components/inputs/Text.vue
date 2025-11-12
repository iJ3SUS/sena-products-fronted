<template>

    <div class="relative w-full select-text">

        <label :for="props.id" class="bg-white rounded px-1.5 absolute block mb-2 text-xs font-semibold shadow"
            :class="[
                error ? 'text-orange-600' : isFocus ? 'text-cyan-800' : 'text-gray-900',
                disabled ? 'shadow' : ''
            ]"
            :style="{
                top:'-8px',
                left: '5px'
            }"
        >{{ props.label }}</label>
        <input :id="props.id" :name="props.id" 
            class="border text-gray-900 text-sm rounded block w-full px-2 py-2.5 outline-none"
            :class="[
                error ? 'border-orange-400 focus:ring-orange-500 focus:border-orange-500 focus:ring-1' : 'border-gray-200 focus:ring-cyan-700 focus:border-cyan-700 focus:ring-1',
                disabled ? 'bg-gray-100' : '',
                centered ? 'text-center' : '',
                size
            ]"
            :placeholder="props.placeholder"
            :maxLength="props.maxLength"
            :type="props.type" 
            :value="text"
            :readonly="props.disabled"
            @input="input"
            @keyup.enter="emit('enter', $event)"
            @focus="(() => { isFocus = true; emit('focus', $event) })"
            @blur="(() => { isFocus = false; emit('blur', $event) })"
        >
        <Transition mode="out-in" name="fade">
            <div class="pt-0.5 text-xs text-orange-600" v-if="error">
                {{ error }}
            </div>
        </Transition>
    </div> 

</template>

<script setup>
import { onMounted, ref, watch, computed } from 'vue'
import IMask from 'imask'

const props = defineProps({
    modelValue: {
        type: [ String, Number ],
        default: ''
    },
    id: {
        type: String,
        default: null
    },
    type: {
        type: String,
        default: 'text'
    },
    label: {
        type: String,
        default: ''
    },
    maxLength: {
        type: [ String, Number],
        default: 100
    },
    mask: {
        type: Object,
        default: {
            mask: String
        }
    },
    disabled: {
        type: Boolean,
        default: false
    },
    placeholder: {
        type: String,
        default: ''
    },
    name: {
        type: String,
        default: ''
    },
    errors: {
        default: {}
    },
    centered: {
        type: Boolean,
        default: false
    },
    size: {
        type: String,
        default: 'h-11'
    },
    money: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['update:modelValue', 'enter', 'focus', 'blur'])

const masked = IMask.createMask(props.mask)

const text = ref("")

const isFocus = ref(false)

// Al inicio del archivo, después de los imports
const debounce = (fn, delay) => {
    let timeoutId
    return function (...args) {
        if (timeoutId) {
            clearTimeout(timeoutId)
        }
        timeoutId = setTimeout(() => {
            fn.apply(this, args)
        }, delay)
    }
}

const input = (event) => {

    delete props.errors[props.name]

    masked.resolve(event.target.value)

    text.value = event.target.value
    

    emit('update:modelValue', masked.unmaskedValue.trim())

    if(props.money){
        setTimeout(() => {
            text.value = masked.value
        }, 2500)
    }

}

const error = computed(() => {
    return props.errors[props.name]
})

watch(() => props.modelValue,
    (current) => {
        
        masked.resolve(props.modelValue === null ? '' : props.modelValue.toString())
        text.value = masked.value

    }
)


onMounted(() => {

    masked.resolve(props.modelValue === null ? '' : props.modelValue.toString())

    text.value = masked.value

})


</script>
