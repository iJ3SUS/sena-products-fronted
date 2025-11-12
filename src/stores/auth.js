import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import { request, http } from '@/utils/http'

export const useAuthStore = defineStore('auth', () => {

    const isLoggedIn = ref(false)
    const user = ref(null)

    const login = async (payload) => {

        const { success, data } = await request(
            () => http.get('me', {
                headers: {
                    'Authorization': 'Bearer ' + payload.token,
                }
            })
        )

        if(!success) {
            return false
        }

        localStorage.setItem('session', JSON.stringify(payload))

        http.defaults.headers.common['Authorization'] = 'Bearer ' + payload.token

        user.value = data
        isLoggedIn.value = true

        return true
    }
    
    const check = async () => {

        let session = localStorage.getItem('session')

        if(!session) {
            isLoggedIn.value = false
            return false
        }

        session = JSON.parse(session)

        const response = await login(session)

        return response

    }

    const logout = () => {
        user.value = null
        isLoggedIn.value = false

        localStorage.removeItem('session')
        delete http.defaults.headers.common['Authorization']
    }
    
    return { 
        isLoggedIn, 
        user, 
        check,
        login, 
        logout 
    }
    
})
