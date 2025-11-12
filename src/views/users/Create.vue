<template>
    <Store
        browse_route="users.index"
        resource_url="dashboard/users"
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
                    :form="form"
                    :errors="errors"
                    :roles="options.roles"
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
    roles: 'dashboard/roles'
}

</script>