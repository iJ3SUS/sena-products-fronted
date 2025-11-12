<template>
    <!-- Loading inicial del componente -->

    <!-- Formulario de login -->
    <div class="min-h-screen flex items-start justify-center bg-gradient-to-br from-primary-50 to-primary-100 pt-32">
        <div class="max-w-md w-full space-y-8 p-8">
            <div class="text-center">
                <div class="mx-auto h-12 w-12 bg-primary-600 rounded-lg flex items-center justify-center mb-4">
                    <svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </div>
                <h2 class="text-3xl font-bold text-gray-900">Iniciar Sesión</h2>
            </div>

            <div class="bg-white rounded-xl shadow-lg p-8">
                <form class="space-y-6" @submit.prevent="login">
                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                            Correo electrónico
                        </label>
                        <input
                            id="email"
                            v-model="form.email"
                            type="email"
                            required
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            placeholder="tu@email.com"
                        />
                    </div>

                    <div>
                        <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
                            Contraseña
                        </label>
                        <div class="relative">
                            <input
                                id="password"
                                v-model="form.password"
                                :type="showPassword ? 'text' : 'password'"
                                required
                                class="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                @click="showPassword = !showPassword"
                                class="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer hover:text-gray-600 focus:outline-none z-10"
                            >
                                <svg v-if="showPassword" class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                <svg v-else class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        :disabled="loading"
                        class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {{ loading ? 'Iniciando sesión...' : 'Iniciar Sesión' }}
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import Swal from 'sweetalert2'

import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

import { request, http } from '@/utils/http'

const router = useRouter()
const auth = useAuthStore()

const loading = ref(false)
const showPassword = ref(false)

const form = reactive({
    email: '',
    password: ''
})

const login = async () => {

    console.log("werwerwe")
    loading.value = true

    const { success, data } = await request(
        () => http.post('login', form)
    )

    loading.value = false

    if(!success) {

        await Swal.fire({
            icon: 'error',
            title: 'Error de autenticación',
            text: data.message,
            confirmButtonColor: '#0891b2',
            backdrop: 'rgba(0,0,0,0.7)'
        })

        return
    }

    const isLoggedIn = await auth.login(data)

    if(!isLoggedIn) {
        await Swal.fire({
            icon: 'error',
            title: 'Error de autenticación',
            confirmButtonColor: '#0891b2',
            backdrop: 'rgba(0,0,0,0.7)'
        })
        return
    }

    setTimeout(() => {
        router.push('/products')
    }, 200)
}
</script>