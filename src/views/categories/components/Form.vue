<template>
    <div>
        <Card>
            <template #header>
                Información de la categoría
            </template>

            <template #content>
                <Grid columns="6">
                    <Col size="4">
                        <Text 
                            v-model="form.name"
                            :errors="errors"
                            name="name"
                            label="Nombre" 
                            placeholder="Nombre de la categoría"
                        />
                    </Col>
                    <Col size="2">
                        <Text 
                            v-model="form.order"
                            :errors="errors"
                            name="order"
                            type="number"
                            label="Orden" 
                            placeholder="Orden (entero)"
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
</script>