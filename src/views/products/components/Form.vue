<template>
    <div>
        <Card>
            <template #header>
                Información del producto
            </template>
            <template #content>
                <Grid columns="6">
                    <Col size="3">
                        <Text 
                            v-model="form.name"
                            :errors="errors"
                            name="name"
                            label="Nombre" 
                            placeholder="Nombre"
                        />
                    </Col>
                    <Col size="3">
                        <Select 
                            v-model="form.category_id"
                            :errors="errors"
                            name="category_id"
                            label="Categoría"
                            option_label="name"
                            option_value="_id"
                            :options="options.categories"
                            disable-placeholder
                        />
                    </Col>
                    <Col size="6">
                        <Textarea 
                            v-model="form.description"
                            :errors="errors"
                            name="description"
                            label="Descripción" 
                            placeholder="Descripción del producto"
                        />
                    </Col>
                    <Col size="2">
                        <Text 
                            v-model="form.stock"
                            :errors="errors"
                            name="stock"
                            type="number"
                            label="Stock" 
                            placeholder="0"
                        />
                    </Col>
                    <Col size="2">
                        <Text 
                            v-model="form.price"
                            :errors="errors"
                            name="price"
                            type="number"
                            label="Precio" 
                            placeholder="0"
                        />
                    </Col>
                    <Col size="2">
                        <Text 
                            v-model="form.discount"
                            :errors="errors"
                            name="discount"
                            type="number"
                            label="Descuento (valor)" 
                            placeholder="0"
                        />
                    </Col>
                    <Col size="2">
                        <Checkbox 
                            v-model="form.active"
                            :errors="errors"
                            name="active"
                            label="Activo"
                        />
                    </Col>
                    <Col size="2">
                        <Checkbox 
                            v-model="form.featured"
                            :errors="errors"
                            name="featured"
                            label="Destacado"
                        />
                    </Col>
                </Grid>
            </template>
        </Card>

        <Images 
            v-if="edit"
            v-model="form.images"
        />

    </div>
</template>
<script setup>

import Images from './Images.vue'

const props = defineProps({
    errors: Object,
    form: Object,
    categories: Array,
    edit: Boolean
})

const optionsStore = useOptionsStore()

const options = computed(() => {
    return {
        categories: optionsStore.data['categories'] ?? []
    }
})

onMounted(() => {

    optionsStore.add({
        key: 'categories',
        source: 'dashboard/categories/list'
    })

})

const removeImage = (index) => {
    const next = Array.isArray(props.form.images) ? [...props.form.images] : []
    next.splice(index, 1)
    props.form.images = next
}

</script>