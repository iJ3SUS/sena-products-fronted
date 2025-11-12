<template>
    <div>
        <Card>
            <template #header>
                Información del rol
            </template>
            <template #content>
                <Grid columns="6">
                    <Col size="6">
                        <Text 
                            v-model="form.name"
                            :errors="errors"
                            name="name"
                            label="Nombre" 
                            placeholder="Nombre"
                        />
                    </Col>
                </Grid>
            </template>
        </Card>
        <Card>
            <template #header>
                Permisos
            </template>
            <template #content>
                <Grid columns="6">
                    <Col size="6">
                        <Select 
                            v-model="permission"
                            label="Agregar permiso"
                            option_label="name"
                            option_value="_id"
                            :options="permissions"
                            @change="(e) => {
                                const find = permissions.find(item => item._id == e)

                                if(find && !form.permissions.includes(find.name)){
                                    form.permissions.push(find._id)
                                }
                            }"
                        />
                    </Col>
                    <Col size="6">
                        <ul class="ml-5 list-disc text-sm">
                            <li v-for="(item, index) in selectedPermissions">
                                {{ item.name }} 
                                <span 
                                    class="text-orange-600 font-medium text-xs cursor-pointer"
                                    @click="form.permissions.splice(index, 1)"
                                >
                                    Eliminar
                                </span>
                            </li>
                        </ul>
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
    edit: Boolean,
    permissions: Array,
})

const permission = ref('')

const selectedPermissions = computed(() => {
    return props.permissions.filter(item => props.form.permissions.includes(item._id))
})


</script>