<template>
    <div>

        <Card>
            <template #header>
                Información básica
            </template>

            <template #content>
                <Grid columns="6">
                    <Col size="3">
                        <Text 
                            v-model="form.name"
                            :errors="errors"
                            name="name"
                            label="Nombres" 
                            placeholder="Nombres"
                        />
                    </Col>
                    <Col size="3">
                        <Text 
                            v-model="form.last_name"
                            :errors="errors"
                            name="last_name"
                            label="Apellidos" 
                            placeholder="Apellidos"
                        />
                    </Col>
                    <Col size="3">
                        <Text 
                            v-model="form.email"
                            :errors="errors"
                            name="email"
                            label="Correo electrónico" 
                            placeholder="Correo electrónico"
                        />
                    </Col>
                    <Col size="3">
                        <Text 
                            v-model="form.identification"
                            :errors="errors"
                            name="identification"
                            label="Identificación" 
                            placeholder="Identificación"
                        />
                    </Col>
                    <Col size="3">
                        <Checkbox 
                            v-model="form.active"
                            :errors="errors"
                            name="active"
                            label="Usuario activo"
                        />
                    </Col>
                </Grid>
            </template>
        </Card>

        <Card>
            <template #header>
                Roles y Permisos
            </template>

            <template #content>
                <Grid columns="1">
                    <Col>
                        <Select 
                            v-model="role"
                            label="Agregar rol"
                            option_label="name"
                            option_value="_id"
                            :options="roles"
                            @change="(e) => {
                                const find = roles.find(role => role._id == e)

                                if(find && !form.roles.includes(find.name)){
                                    form.roles.push(find._id)
                                }
                            }"
                        />
                    </Col>
                    <Col>
                        <ul class="ml-5 list-disc text-sm">
                            <li v-for="(item, index) in selectedRoles">
                                {{ item.name }} 
                                <span 
                                    class="text-orange-600 font-medium text-xs cursor-pointer"
                                    @click="form.roles.splice(index, 1)"
                                >
                                    Eliminar
                                </span>
                            </li>
                        </ul>
                    </Col>
                </Grid>
            </template>
        </Card>

        <Card v-if="!edit">
            <template #header>
                Contraseña
            </template>
            <template #content>
                <Grid columns="1">
                    <Col>
                        <Text 
                            v-model="form.password"
                            :errors="errors"
                            name="password"
                            type="password"
                            label="Contraseña" 
                            placeholder="Contraseña"
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
    roles: Array,
    edit: Boolean
})

const role = ref(null)

const selectedRoles = computed(() => {
    return props.roles.filter(role => props.form.roles.includes(role._id))
})

</script>