<template>
    <Store
        browse_route="roles.index"
        resource_url="dashboard/roles"
        :schema="schema"
    >

        <template #actions></template>

        <template #content="{ errors, form }">

            <Options 
                v-slot="{ options, loading_options }"
                :resources="resources"
            >
                <Form 
                    v-if="!loading_options"
                    :permissions="options.permissions"
                    :form="form"
                    :errors="errors"
                />
            </Options>
        </template>

    </Store>
</template>
<script setup>

import Options from '@/components/page/Options.vue'
import Form from './components/Form.vue'
import schema from './schema.js'

const resources = {
    permissions: 'api/permissions'
}

</script>