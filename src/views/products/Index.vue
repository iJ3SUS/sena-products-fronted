<template>
    <Browse 
        create_route="products.create"
        resource_url="dashboard/products"
        :limit="10"
    >
        <template #content="{ loading, items, pagination }">
            <Table>
                <template #top></template>
                
                <template #head>
                    <Row>
                        <Column class="text-left w-1/4">
                            Nombre
                        </Column>
                        <Column class="text-center w-24">
                            Stock
                        </Column>
                        <Column class="text-center w-32">
                            Precio
                        </Column>
                        <Column class="text-center w-24">
                            Estado
                        </Column>
                        <Column class="text-center w-28">
                            F. Creado
                        </Column>
                        <Column class="text-center w-28">
                            F. Actualizado
                        </Column>
                        <Column class="text-center w-24">
                            Acciones
                        </Column>
                    </Row>
                </template>

                <template #body>
                    <Row v-for="(product, index) in items" class="hover:bg-gray-50 transition-colors">
                        <Column class="w-1/4">
                            <div class="flex gap-2 items-center">
                                <Icon class="text-primary-600" icon="Point" width="18" height="18" />
                                <div class="flex flex-col">
                                    <span class="text-gray-900 leading-tight">
                                        {{ product.name }}
                                    </span>
                                    <span class="text-xs text-gray-500 truncate" :title="product.description">
                                        {{ product.description }}
                                    </span>
                                </div>
                            </div>
                        </Column>
                        <Column class="text-center w-24">
                            {{ product.stock }}
                        </Column>
                        <Column class="text-center w-32">
                            {{ product.price }}
                        </Column>
                        <Column class="text-center w-24">
                            <div class="flex justify-center">
                                <StatusBadge :active="product.active" />
                            </div>
                        </Column>
                        <Column class="text-center text-xs w-28">
                            <div class="space-y-1">
                                <div class="font-semibold text-gray-900">
                                    {{ product.created_at.toFormat('dd/MM/yyyy') }}
                                </div>
                                <div class="text-gray-500">
                                    {{ product.created_at.toFormat('HH:mm') }}
                                </div>
                            </div>
                        </Column>
                        <Column class="text-center text-xs w-28">
                            <div class="space-y-1">
                                <div class="font-semibold text-gray-900">
                                    {{ product.updated_at.toFormat('dd/MM/yyyy') }}
                                </div>
                                <div class="text-gray-500">
                                    {{ product.updated_at.toFormat('HH:mm') }}
                                </div>
                            </div>
                        </Column>
                        <Column class="w-24">
                            <div class="flex justify-center">
                                <RouterLink :to="{
                                    name: 'products.edit',
                                    params: { _id: product._id }
                                }">
                                    <Button theme="icon" color="gray-100" class="hover:bg-primary-50 hover:text-primary-600 transition-colors">
                                        <Icon icon="Pencil" width="18" height="18" />
                                    </Button>
                                </RouterLink>
                            </div>
                        </Column>
                    </Row>
                </template>

                <template #pagination>
                    <Pagination v-if="pagination" :pagination="pagination" :disabled="loading" />
                </template>
            </Table>
        </template>
    </Browse>
</template>
<script setup>

</script>