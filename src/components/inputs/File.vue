<template> 
    <div>
        <label class="text-sm font-medium text-gray-900" v-if="label"> {{ props.label }}</label>
        <div class="p-4 cursor-pointer rounded-md border border-dashed flex gap-2 items-center mt-1 bg-gray-100"
            :class="props.error ? 'border-red-500' : 'border-gray-300' "
            @click="handle"
        >
            <div class="flex items-center">
                <Icon icon="CloudUpload" width="28" height="28" />
            </div>
            <div class="overflow-hidden text-xs">
                
                <template v-if="!props.modelValue">
                    Seleccionar archivo
                </template>
                <template v-else>
                    <p class="truncate">{{ props.modelValue.name }}</p>
                </template>
                
            </div>
            
            <input ref="File" type="file" class="hidden" :disabled="disabled" @change="change"/>
            
        </div>

        <Transition mode="out-in" name="fade">
            <div class="pt-2 text-xs text-red-500" v-if="props.error">
                {{ props.error }}
            </div>
        </Transition>
    </div>
</template>
<script setup>

import { ref } from 'vue'

const props = defineProps({
    modelValue: {
        type: Object,
        default: null
    },
    error: {
        default: null
    },
    label: {
        default: null
    },
    disabled: {
        default: false
    }
})

const emit = defineEmits(['update:modelValue', 'update'])

const File = ref(null)

const handle = () => {
    File.value.click()
}

const change = (e) => {

    if(props.disabled) return 

    if(e.target.files.length == 0){
        return 
    }

    emit('update:modelValue', e.target.files[0])
    emit('update', e.target.files[0])

}

</script>