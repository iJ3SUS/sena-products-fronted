<template>
    <div class="inline-flex items-center border w-full rounded border-gray-200 h-11"
        :class="{
            'cursor-pointer': !props.disabled,
            'opacity-50': props.disabled
        }"
        @click="() => {
            if(props.disabled) return 
            checked = !checked
            emit('update:modelValue', checked)
            emit('change', checked)
        }"
    >

        <label class="relative flex items-center p-2 rounded-full cursor-pointer" :htmlFor="props.id">
            <input type="checkbox"
                class="
                    before:content[''] peer relative h-5 w-5 appearance-none rounded-md border border-gray-200 transition-all 
                    before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-gray-500 before:opacity-0 before:transition-opacity 
                    checked:border-cyan-700 checked:bg-cyan-700 checked:before:bg-cyan-600 hover:before:opacity-10
                    disabled:pointer-events-none
                "
                :id="props.id"
                :checked="checked"
                :disabled="props.disabled"
                @click.stop
                @change="(event) => {
                    emit('update:modelValue', event.target.checked)
                    emit('change', event.target.checked)
                }"
            />
            <span class="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"
                stroke="currentColor" stroke-width="1"
            >
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                ></path>
            </svg>
            </span>
        </label>
        <label class="mt-px text-gray-800 cursor-pointer select-none text-sm w-full pr-4">
            <slot>
                {{ props.label }}
            </slot>
        </label>
        
    </div> 
</template>

<script setup>
import { inject, ref, watch, onMounted } from 'vue'

const emit = defineEmits(['update:modelValue', 'change'])

const props = defineProps({
    modelValue: {
        default: false
    },
    id: {
        type: String,
        default: null
    },
    label: {
        type: String, 
        default: ""
    },
    disabled: {
        type: Boolean,
        default: false
    }
})

const checked = ref(props.modelValue)

watch(() => props.modelValue,
    (current) => {
        checked.value = props.modelValue
    }
)

</script>

