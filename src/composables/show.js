import { ref } from "vue"

import Swal from 'sweetalert2'

import { http } from '@/utils/http'

export default function useStore({ url = '' }) {

    const loading = ref(false)

    const show = async (_id) => {

        loading.value = true

        try {

            const response = await http.get(`${url}/${_id}`)

            loading.value = false 

            return {
                status: response.status,
                data: response.data,
                success: true
            }

            
        } catch (error) {

            loading.value = false
            
            return {
                status: error.response.status,
                data: error.response.data,
                success: false
            }

        }

    }

    return {
        loading,
        show
    }
}