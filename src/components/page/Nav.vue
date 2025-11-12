<template>
    <nav class="flex items-center h-20 bg-white">
        <!-- Nombre de la empresa con logo -->
        <div class="flex items-center gap-3">
            <div class="flex flex-col">
                <span class="text-xl font-bold text-gray-800">{{ appName }}</span>
                <span class="text-xs text-gray-500 font-medium">Sistema de Gestión</span>
            </div>
        </div>

        <!-- Menú sencillo alineado a la izquierda -->
        <div class="flex items-center space-x-2 text-gray-600 ml-8">
            <div v-for="item in menu" 
                :key="item.path"
                class="relative"
                @mouseenter="activeDropdown = item.path"
                @mouseleave="activeDropdown = null"
            >
                <RouterLink 
                    :to="item.path"
                    class="text-sm leading-relaxed inline-block px-3 py-2 rounded-md transition-colors duration-200 uppercase hover:bg-gray-50"
                    :class="{ 'bg-primary-50 text-primary-600 font-semibold': route.path.startsWith(item.path) }"
                >
                    <div class="flex items-center gap-1">
                        <span>{{ item.name }}</span>
                        <Icon v-if="item.children" icon="ChevronDown" class="w-4 h-4" />
                    </div>
                </RouterLink>

                <div v-if="item.children && activeDropdown === item.path"
                    class="absolute top-full left-0 bg-white rounded-lg shadow-xl py-3 min-w-[220px] z-50 border border-gray-200"
                >
                    <!-- Triangulito apuntando hacia arriba -->
                    <div class="absolute -top-2 left-4 w-4 h-4 bg-white border-l border-t border-gray-200 transform rotate-45"></div>
                    
                    <RouterLink 
                        v-for="child in item.children"
                        :key="child.path"
                        :to="item.path + child.path"
                        class="block px-4 py-3 text-sm hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200 font-medium"
                        :class="{ 'text-primary-600 font-semibold bg-primary-50': route.path === (item.path + child.path) }"
                    >
                        {{ child.name }}
                    </RouterLink>
                </div>
            </div>
        </div>

        <!-- Espaciador para empujar controles a la derecha -->
        <div class="flex-1"></div>

        <!-- Controles de usuario minimalistas -->
        <div class="flex items-center gap-3">
            <!-- Perfil de usuario minimalista -->
            <div class="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 cursor-pointer">
                <!-- Avatar simple -->
                <div class="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </div>
                
                <!-- Nombre simple -->
                <span class="text-sm font-medium text-gray-700">{{ authStore.user?.name || 'Usuario' }}</span>
                
                <!-- Icono dropdown simple -->
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
            </div>
            
            <!-- Botón logout minimalista -->
            <button
                @click="$emit('logout')"
                class="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                title="Cerrar sesión"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013 3v1" />
                </svg>
            </button>
        </div>
    </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const activeDropdown = ref(null)
const authStore = useAuthStore()

const emit = defineEmits(['logout'])

const appName = import.meta.env.VITE_APP_NAME || 'SIN NOMBRE'

const menu = [
    { 
        name: 'Productos', path: '/products'
    }
]
</script>