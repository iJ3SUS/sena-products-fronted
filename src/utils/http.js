import Swal from 'sweetalert2'

import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

const http = axios.create({
    baseURL: import.meta.env.VITE_AUTH_URL
})

http.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        if (error.response?.status === 401) {

            const authStore = useAuthStore()
        
            authStore.logout()
            
            window.location.reload()
        }
        
        return Promise.reject(error)
    }
)

const request = async (requestFn) => {
    try {

        const response = await requestFn()

        return {
            success: true,
            status: response.status,
            data: response.data
        }

    } catch (error) {

        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.response?.data?.message || error.message,
            backdrop: 'rgba(0,0,0,0.7)'
        })

        return {
            success: false,
            status: error.response.status,
            data: error.response.data
        }
        
    }
}

export { 
    http,
    request
}