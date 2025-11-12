<template>
    <div>

        <slot :loading_options :options></slot>

    </div>
</template>
<script setup>
import { reactive, ref, onMounted } from 'vue'

import { http } from '@/utils/http'

const props = defineProps({
    resources: Object
})

const loading_options = ref(true)

const options = reactive({})

onMounted(async () => {
  
    loading_options.value = true
    
    const promises = Object.entries(props.resources).map(async ([key, url]) => {
        try {
            const response = await http.get(url)
            options[key] = response.data
            return response
        } catch (error) {
            options[key] = []
            return error
        }
    })

    await Promise.allSettled(promises)

    loading_options.value = false
 
})
</script>