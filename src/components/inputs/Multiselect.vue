<template>
    <div class="relative w-full">

        <Text 
            v-model="keyword"
            :label="label"
            :disabled="disabled"
            @input="handleInput"
            @focus="visible = true"
            @blur="handleBlur"
        />

        <Transition name="fade" mode="out-in">
            <div
                v-if="visible && !disabled" 
                class="mt-0.5 absolute bg-white w-full max-h-48 overflow-y-auto shadow-lg rounded-b-md z-50"
            >
                <slot name="items" :result="result">
                    <div class="p-3 text-sm text-gray-500 text-center">
                        Sin resultados encontrados
                    </div>
                </slot>
            </div>
        </Transition>

    </div>
</template>
<script setup>

import { ref, watch, onUnmounted } from "vue"

import { http } from '@/utils/http'

const props = defineProps({
    modelValue: {
        type: [ String, Number ],
        default: '' 
    },
    label: {
        type: String,
        default: ''
    },
    route: {
        type: String,
        default: ''
    },
    transform: {
        type: Function,
        default: null
    },
    disabled: {
        type: Boolean,
        default: false
    }
})

const keyword = ref(props.modelValue)
const visible = ref(false)
const result = ref([])

// Cache para evitar peticiones repetidas
const cache = new Map()

// Variables para manejar timeouts y cancelación de peticiones
let blurTimeout = null
let inputTimeout = null
let abortController = null

const handleBlur = () => {
    if (blurTimeout) clearTimeout(blurTimeout)

    blurTimeout = setTimeout(() => {
        visible.value = false
    }, 150) // Aumentado de 50ms a 150ms para mejor UX
}

const handleInput = () => {
    // Limpiar timeout anterior
    if (inputTimeout) clearTimeout(inputTimeout)
    
    // Cancelar petición HTTP anterior si existe
    if (abortController) {
        abortController.abort()
        abortController = null
    }

    inputTimeout = setTimeout(async () => {
        // No hacer petición si el keyword está vacío
        if (!keyword.value || keyword.value.trim().length < 2) {
            result.value = []
            return
        }

        const cacheKey = keyword.value.toLowerCase().trim()
        
        // Verificar si ya tenemos el resultado en caché
        if (cache.has(cacheKey)) {
            result.value = cache.get(cacheKey)
            return
        }

        // Crear nuevo AbortController para esta petición
        abortController = new AbortController()

        try {
            const response = await http.get(props.route, {
                params: {
                    keyword: keyword.value.trim()
                },
                signal: abortController.signal
            })

            // Verificar que la respuesta sea válida
            if (response && response.data) {
                const data = Array.isArray(response.data) ? response.data : []
                
                // Aplicar transformación si existe
                const transformedData = props.transform ? props.transform(data) : data
                
                // Guardar en caché (limitar tamaño del caché)
                if (cache.size > 50) {
                    const firstKey = cache.keys().next().value
                    cache.delete(firstKey)
                }
                cache.set(cacheKey, transformedData)
                
                result.value = transformedData
            } else {
                result.value = []
            }
            
        } catch (error) {
            // Solo mostrar error si no fue cancelada la petición
            if (error.name !== 'AbortError') {
                result.value = []
            }
        } finally {
            abortController = null
        }

    }, 300)
}

// Optimizar el watcher para evitar loops innecesarios
watch(() => props.modelValue, (newValue) => {
    if (newValue !== keyword.value) {
        keyword.value = newValue
    }
}, { immediate: true })

// Limpiar recursos al desmontar el componente
onUnmounted(() => {
    if (blurTimeout) {
        clearTimeout(blurTimeout)
        blurTimeout = null
    }
    if (inputTimeout) {
        clearTimeout(inputTimeout)
        inputTimeout = null
    }
    if (abortController) {
        abortController.abort()
        abortController = null
    }
    // Limpiar caché
    cache.clear()
})
</script>