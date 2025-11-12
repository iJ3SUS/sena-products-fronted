<template>
    <div class="space-y-3">
        <div class="flex items-center gap-3">
            <input 
                ref="fileInput"
                type="file" 
                accept="image/*"
                :disabled="uploading || disabled"
                class="text-sm"
                @change="handleFileChange"
            />
            <Button 
                :disabled="uploading || disabled || !file" 
                color="primary"
                @click="upload"
            >
                <Icon v-if="uploading" icon="Loader2" class="animate-spin mr-1" width="16" height="16" />
                <span>{{ uploading ? 'Subiendo...' : 'Subir imagen' }}</span>
            </Button>
        </div>

        <Transition name="fade" mode="out-in">
            <div v-if="error" class="text-xs text-orange-600">
                {{ error }}
            </div>
        </Transition>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { http } from '@/utils/http'

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
    modelValue: {
        type: Array,
        default: () => []
    },
    upload_url: {
        type: String,
        default: 'dashboard/uploads'
    },
    disabled: {
        type: Boolean,
        default: false
    }
})

const fileInput = ref(null)
const file = ref(null)
const uploading = ref(false)
const error = ref('')

const handleFileChange = (e) => {
    error.value = ''
    const selected = e.target.files?.[0] || null
    file.value = selected
}

const upload = async () => {
    if (!file.value) return
    error.value = ''
    uploading.value = true

    const formData = new FormData()
    formData.append('file', file.value)

    try {
        const response = await http.post(props.upload_url, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })

        const data = response?.data || {}
        const url = data.url || data.secure_url || data.location || data.path || ''

        if (!url) {
            throw new Error('Respuesta inválida del servidor: no se encontró URL de imagen.')
        }

        const next = Array.isArray(props.modelValue) ? [...props.modelValue, url] : [url]
        emit('update:modelValue', next)

        // Reset input
        if (fileInput.value) {
            fileInput.value.value = ''
        }
        file.value = null
    } catch (err) {
        error.value = err?.response?.data?.message || err.message || 'Error subiendo imagen'
    } finally {
        uploading.value = false
    }
}
</script>