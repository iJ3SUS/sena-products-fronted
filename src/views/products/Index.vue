<template>
    <Page>

        <template #actions>
            <RouterLink :to="{
                name: 'products.create',
            }">
                <Button color="primary">
                    Nuevo
                </Button>
            </RouterLink>
        </template>
       
        <Table>
            <template #top></template>
            
            <template #head>
                <Row>
                    <Column class="text-left w-1/4">
                        Nombre
                    </Column>
                    <Column class="text-center w-32">
                        Precio
                    </Column>
                    <Column class="text-center w-24">
                        Acciones
                    </Column>
                </Row>
            </template>

            <template #body>
                <Row v-for="product in current_items[pagination.current - 1]" class="hover:bg-gray-50 transition-colors">
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
                    <Column class="text-right w-32">
                        {{ FormatNumber(product.price) }}
                    </Column>
                    <Column class="w-24">
                        <div class="flex justify-center">
                            <RouterLink :to="{
                                name: 'products.edit',
                                params: { _id: product.id }
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
                <PaginationLocal
                    :pagination="pagination" 
                    :pages="pages" 
                    @change="(page) => {
                        pagination.current = page
                    }" 
                />
            </template>
        </Table>

    </Page>
</template>
<script setup>

import usePagination from "@/composables/pagination"

const { items, backup, current_items, pagination, pages } = usePagination()

const browse = async () => {

    const { success, data } = await request(
        () => http.get('products')
    )

    if(!success) return 

    items.value = data

}

onMounted(() => {
    browse()
})

</script>