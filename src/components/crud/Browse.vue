<template>
    <Page>

        <template #actions>
            
            <slot name="actions">
                <RouterLink :to="{
                    name: create_route,
                }">
                    <Button color="primary">
                        Nuevo
                    </Button>
                </RouterLink>
            </slot>
             
        </template>
        
        <slot name="content" :loading :items :pagination :browse ></slot>

        <slot name="modal" :loading :items :pagination :browse ></slot>
        
    </Page>
</template>

<script setup>
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

import Page from '@/components/page/Page.vue'

const props = defineProps({
    resource_url: String,
    create_route: String,
    limit: [Number, String] ,
})

import useBrowse from '@/composables/browse'

const { loading, items, pagination, browse } = useBrowse({
    url: props.resource_url,
    limit: props.limit
})

const route = useRoute()

watch(() => route.query, (query) => {
    browse(query)
})

onMounted(() => {
    browse(route.query)
})

</script>