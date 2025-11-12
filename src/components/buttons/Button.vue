<template>
    <button :disabled="props.disabled" 
        class="relative
            inline-flex group items-center justify-center 
            shadow-lg active:shadow-none
            text-sm select-none
            cursor-pointer
            disabled:opacity-50 disabled:pointer-events-none 
        " 
        :class="[
            theme.button,
            color.button
        ]" 
        @click="click"
    >
        <span class="absolute w-0 h-0 transition-all duration-300 ease-out group-hover:w-full group-hover:h-full"
            :class="[
                theme.backdrop,
                color.backdrop
            ]" 
        ></span>
        <span class="relative flex items-center gap-1">
            <slot></slot>
        </span>
    </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    theme: {
        type: String,
        default: 'default'
    },
    color: {
        type: String,
        default: 'default'
    },
    disabled: {
        type: Boolean,
        default: false
    }
})

const themes = {
    'default': {
        button : 'px-4 py-2 rounded',
        backdrop: ''
    },
    'icon': {
        button: 'p-1 rounded',
        backdrop: ''
    },
    'circle': {
        button: 'p-1.5 rounded-full',
        backdrop: 'rounded-full'
    },
    'rounded': {
        button: 'px-6 py-2 rounded-full',
        backdrop: 'rounded-full'
    }
}

const colors = {
    'default': {
        button : `text-black bg-gray-200 shadow-none`,
        backdrop: `bg-gray-400 opacity-10 rounded`
    },
    'primary': {
        button: 'bg-primary-600 text-white',
        backdrop: 'bg-white opacity-10'
    },
    'danger': {
        button: 'bg-danger-600 text-white',
        backdrop: 'bg-white opacity-10'
    },
    'transparent': {
        button: 'text-white shadow-none hover:bg-gray-200',
        backdrop: 'bg-white opacity-10'
    },
    'gray': {
        button: 'bg-gray-200 shadow-none hover:bg-gray-300',
        backdrop: 'bg-white opacity-10'
    },
    'gray-100': {
        button: 'bg-gray-100 border border-gray-200 shadow-none hover:bg-gray-200',
        backdrop: 'bg-white opacity-10'
    },
}

const theme = computed(() => {
    return themes[ props.theme ] ? themes[ props.theme ] : themes.default
})

const color = computed(() => {
    return colors[ props.color ] ? colors[ props.color ] : themes.default
})

const emit = defineEmits(['handle'])

const click = () => {
    emit('handle')
}

</script>