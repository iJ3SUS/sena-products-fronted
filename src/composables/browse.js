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

            if(limit) {

                params = {
                    ...params,
                    limit
                }

                const response = await http.get(url, {
                    params: params
                })
    
                const {
                    items: _items,
                    pagination: _pagination
                } = response.data
        
                pagination.value = _pagination
    
                items.value = _items.map(e => {
                    e.created_at = e.created_at ? DateTime.fromISO(e.created_at).setZone('America/Bogota') : null
                    e.updated_at = e.updated_at ? DateTime.fromISO(e.updated_at).setZone('America/Bogota') : null
                    return e
                })
    
                loading.value = false
    
                return {
                    status: response.status,
                    data: {
                        items: _items,
                        pagination: _pagination
                    },
                    success: true
                }

            }

            const response = await http.get(url, {
                params: params
            })

            items.value = response.data.map(e => {
                e.created_at = e.created_at ? DateTime.fromISO(e.created_at).setZone('America/Bogota') : null
                e.updated_at = e.updated_at ? DateTime.fromISO(e.updated_at).setZone('America/Bogota') : null
                return e
            })

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