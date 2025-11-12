<template>

    <div class="relative w-full select-text">

        <label :for="props.id" class="bg-white px-1.5 absolute block mb-2 text-xs font-semibold"
            :class="[
                props.error ? 'text-orange-600' : isFocus ? '' : 'text-gray-900'
            ]"
            :style="{
                top:'-8px',
                left: '5px'
            }"
        >{{ props.label }}</label>
        <textarea :id="props.id" :name="props.id" class="border text-gray-900 text-sm rounded block w-full px-2 py-2.5 outline-none disabled:bg-white"
            :class="[
                props.error ? 'border-orange-400 focus:ring-orange-500 focus:border-orange-500 focus:ring-1' : 'border-gray-200 focus:ring-cyan-600 focus:border-cyan-600 focus:ring-1'
            ]"
            :placeholder="props.placeholder"
            :maxLength="props.maxLength"
            :rows="props.rows"
            type="text" 
            :value="text"
            :readonly="props.disabled"
            @input="input"
            @keyup.enter="emit('enter')"
            @focus="isFocus = true"
            @blur="isFocus = false"
        ></textarea>
        <Transition mode="out-in" name="fade">
            <div class="pt-0.5 text-xs text-orange-600" v-if="props.error">
                {{ props.error }}
            </div>
        </Transition>

    </div> 

</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
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
    error: {
        default: ''
    },
    rows: {
        type: [String, Number],
        default: 3
    }
})

const emit = defineEmits(['update:modelValue', 'enter', 'removeError'])

const masked = IMask.createMask(props.mask)

const text = ref("")

const isFocus = ref(false)

const input = (event) => {

    emit('removeError')

    masked.resolve(event.target.value)

    event.target.value = masked.value

    text.value = event.target.value

    emit('update:modelValue', masked.unmaskedValue)

}


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
