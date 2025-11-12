<template>
    <Update
        browse_route="products.index"
        resource_url="dashboard/products"
        :schema="schema"
    >
        <template #actions></template>

        <template #content="{ form, errors }">
            <Form 
                edit
                :form="form"
                :errors="errors"
            />
        </template>

    </Update>
</template>
<script setup>
import Form from './components/Form.vue'
import schema from './schema.js'

</script>