<template>
    <div>
        <!-- Loading Screen sobrepuesto -->
        <div v-if="initialLoading" class="fixed inset-0 bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center z-50">
            <div class="text-center">
                <div class="mx-auto h-16 w-16 bg-white rounded-full shadow-lg flex items-center justify-center mb-4">
                    <svg class="animate-spin h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </div>
                <h3 class="text-lg font-medium text-gray-900 mb-2">Cargando...</h3>
                <p class="text-sm text-gray-600">Verificando autenticación</p>
            </div>
        </div>

        <slot></slot>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()

const initialLoading = ref(true)

onMounted(async () => {
    // Simular verificación de autenticación inicial
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    initialLoading.value = false
})
</script>