<template>
    <Layout>
        <router-view></router-view>
    </Layout>
</template>

<script setup>

import { computed } from 'vue'

import { useAuthStore } from '@/stores/auth'

import AuthLayout from '@/components/page/AuthLayout.vue'
import GuestLayout from '@/components/page/GuestLayout.vue'

const auth = useAuthStore()

const Layout = computed(() => {
    return auth.isLoggedIn ? AuthLayout : GuestLayout
})

</script>
