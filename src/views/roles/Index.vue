
<template>
    <Browse 
        create_route="roles.create"
        resource_url="dashboard/roles"
        :limit="5"
    >
        <template #content="{ loading, items, pagination }">
            <Table>
                <template #top></template>
                
                <template #head>
                    <Row>
                        <Column class="text-center">
                            Nombre
                        </Column>
                        <Column class="text-center">
                            F. Creado
                        </Column>
                        <Column class="text-center">
                            F. Actualizado
                        </Column>
                        <Column class="text-center">
                            Acciones
                        </Column>
                    </Row>
                </template>
    
                <template #body>

                    <Row v-for="(role, index) in items">
                        <Column class="font-semibold">
                            <div class="flex gap-1 items-center">
                                <Icon class="text-primary-600" icon="Point" width="18" height="18" /> 
                                <span>
                                    {{ role.name }}
                                </span>
                            </div>
                        </Column>
                        <Column class="text-center text-xs">
                            <div class="font-semibold">
                                {{ role.created_at.toFormat('dd/MM/yyyy') }}
                            </div>
                            <div>
                                {{ role.created_at.toFormat('HH:mm') }}
                            </div>
                        </Column>
                        <Column class="text-center text-xs">
                            <div class="font-semibold">
                                {{ role.updated_at.toFormat('dd/MM/yyyy') }}
                            </div>
                            <div>
                                {{ role.updated_at.toFormat('HH:mm') }}
                            </div>
                        </Column>
                        <Column class="w-40">
                            <div class="flex justify-center">
                                <RouterLink :to="{
                                    name: 'roles.edit',
                                    params: {
                                        _id: role._id
                                    }
                                }">
                                    <Button theme="icon" color="gray-100">
                                        <Icon icon="Pencil" width="20" height="20" />
                                    </Button>
                                </RouterLink>
                            </div>
                        </Column>
                    </Row>
                    
                </template>
    
                <template #pagination>
                    <Pagination v-if="pagination"  
                        :pagination="pagination"
                        :disabled="loading"
                    />
                </template>
            </Table>
        </template>
    </Browse>
</template>
<script setup>


</script>
