import { ref } from "vue"

import Swal from 'sweetalert2'

import { http } from '@/utils/http'

export default function useUpdate({ url = '' }) {

    const loading = ref(false)

    const errors = ref({})

    const update = async (_id, payload) => {

        errors.value = {}
        loading.value = true

        try {

            const response = await http.put(`${url}/${_id}`, payload)

            loading.value = false 

            return {
                status: response.status,
                data: response.data,
                success: true
            }

        } catch (error) {

            if(error?.response?.status == 422){
                error.response.data.errors.forEach(error => {
                    errors.value[
                        error.context.label
                    ] = error.message
               
                })
            }

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response?.data?.message || error.message,
                backdrop: 'rgba(0,0,0,0.7)'
            })

            loading.value = false
            
            return {
                status: error.response.status,
                data: error.response.data,
                success: false
            }

        }

    }

    return {
        errors,
        loading,
        update
    }
}