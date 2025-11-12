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
                            v-model="form.price"
                            :errors="errors"
                            name="price"
                            type="number"
                            label="Precio" 
                            placeholder="0"
                        />
                    </Col>
                </Grid>
            </template>
        </Card>

    </div>
</template>
<script setup>

const props = defineProps({
    errors: Object,
    form: Object,
    edit: Boolean
})

onMounted(() => {



})


</script>