import { ref } from "vue"

import { DateTime } from 'luxon'

import { http } from '@/utils/http'

export default function useBrowse({ url = '', limit }) {

    const loading = ref(false)

    const pagination = ref(null)

    const selected = ref(null)

    const items = ref([])

    const browse = async (params) => {

        loading.value = true

        try {

            const response = await http.get(url, {
                params: params
            })

            items.value = response.data

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
        items,
        pagination,
        selected,
        loading,
        browse
    }
}