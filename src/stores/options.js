import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'

import { http } from '@/utils/http'

export const useOptionsStore = defineStore('options', () => {

    const data = ref({})

    const status = ref({})

    const meta = ref({})

    const add = ({ key, source }) => {

        if(meta.value[key]) {
            return 
        }

        data.value[key] = []
        
        meta.value[key] = {
            key,
            source
        }

        status.value[key] = 'ready'

    }

    const set = ({key, dataset}) => {
        data.value[key] = dataset
    }

    const fetch = async () => {

        const promises = Object.keys(meta.value).map(async (key) => {

            const item = meta.value[key]

            if(status.value[key] !== 'ready') {
                return
            }

            try {

                status.value[key] = 'fetching'
                const response = await http.get(item.source)
                status.value[key] = 'finished'

                data.value[key] = response.data

            } catch (error) {

                status.value[key] = 'error'
                data.value[key] = []
               
                return error
            }
        })
    
        await Promise.allSettled(promises)

    }

    watch(meta.value, (next, prev) => {
        fetch()
    })
    
    return { data, add, set }

})
