<template>
    <Store
        browse_route="products.index"
        resource_url="dashboard/products"
        :schema="schema"
    >
        <template #actions></template>

        <template #content="{ errors, form }">
            <Form
                :form="form"
                :errors="errors"
            />
        </template>
    </Store>
</template>
<script setup>
import Form from './components/Form.vue'
import schema from './schema.js'

</script>