<template>
    <!-- Loading Screen sobrepuesto con diseño del login -->
    <div v-if="isLoading" class="fixed inset-0 bg-gradient-to-br from-primary-500 to-primary-100 flex items-center justify-center z-50">
        <div class="max-w-md w-full space-y-8 p-8">
            <div class="text-center">
                <div class="mx-auto h-16 w-16 bg-primary-600 rounded-lg flex items-center justify-center mb-6">
                    <svg class="animate-spin h-8 w-8 text-white" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </div>
                <h2 class="text-3xl font-bold text-gray-900">Cargando</h2>
                <p class="mt-2 text-sm text-gray-600">Preparando tu espacio de trabajo...</p>
            </div>

            <div class="bg-white rounded-xl shadow-lg p-8">
                <div class="flex items-center justify-center space-x-2">
                    <div class="flex space-x-1">
                        <div class="w-2 h-2 bg-primary-600 rounded-full animate-bounce"></div>
                        <div class="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                        <div class="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                    </div>
                    <span class="text-gray-600 text-sm font-medium">Cargando aplicación</span>
                </div>
            </div>
        </div>
    </div>

    <!-- Main Layout (siempre visible) -->
    <div class="flex flex-col min-h-screen">
        <!-- Navegación unificada -->
        <div class="bg-white shadow-sm">
            <div class="container mx-auto">
                <Nav @logout="handleLogout" />
            </div>
        </div>
        
        <div class="container mx-auto flex flex-1">
            <div class="flex-1 py-9">
                <slot></slot>
            </div>
        </div>

        <!-- Footer -->
        <!-- <footer class="bg-gray-800 text-white py-4">
            <div class="container mx-auto px-4">
                <div class="flex justify-between items-center">
                    <div>
                        <p>&copy; 2024 </p>
                    </div>
                    <div>
                        <nav class="space-x-4">
                            <a href="#" class="hover:text-gray-300">1</a>
                            <a href="#" class="hover:text-gray-300">2</a>
                            <a href="#" class="hover:text-gray-300">3</a>
                        </nav>
                    </div>
                </div>
            </div>
        </footer> -->
    </div>
</template>
<script setup>
import Nav from './Nav.vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'

const authStore = useAuthStore()
const router = useRouter()
const isLoading = ref(true)

const handleLogout = () => {
    authStore.logout()
    router.push('/login')
}

onMounted(() => {
    setTimeout(() => {
        isLoading.value = false
    }, 1000)
})
</script>