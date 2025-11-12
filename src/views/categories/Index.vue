<template>
    <Browse 
        create_route="categories.create"
        resource_url="dashboard/categories"
        :limit="10"
    >
        <template #content="{ loading, items, pagination }">
            <Table>
                <template #top>
                    <div class="pt-6 p-4 flex gap-2">
                        <Text 
                            v-model="query.search"
                            label="Buscar"
                            placeholder="Buscar por nombre y pulsa enter"
                            size="h-10"
                            @enter="search"
                        />
                    </div>
                </template>
                
                <template #head>
                    <Row>
                        <Column class="text-left w-1/2">
                            Nombre
                        </Column>
                        <Column class="text-center w-24">
                            Orden
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
                    <Row v-for="(category, index) in items" class="hover:bg-gray-50 transition-colors">
                        <Column class="w-1/2">
                            <span class="text-gray-900 leading-tight">
                                {{ category.name }}
                            </span>
                        </Column>
                        <Column class="text-center w-24">
                            <span class="text-gray-900">
                                {{ category.order }}
                            </span>
                        </Column>
                        <Column class="text-center text-xs w-28">
                            <div class="space-y-1">
                                <div class="font-semibold text-gray-900">
                                    {{ category.created_at.toFormat('dd/MM/yyyy') }}
                                </div>
                                <div class="text-gray-500">
                                    {{ category.created_at.toFormat('HH:mm') }}
                                </div>
                            </div>
                        </Column>
                        <Column class="text-center text-xs w-28">
                            <div class="space-y-1">
                                <div class="font-semibold text-gray-900">
                                    {{ category.updated_at.toFormat('dd/MM/yyyy') }}
                                </div>
                                <div class="text-gray-500">
                                    {{ category.updated_at.toFormat('HH:mm') }}
                                </div>
                            </div>
                        </Column>
                        <Column class="w-24">
                            <div class="flex justify-center">
                                <RouterLink :to="{
                                    name: 'categories.edit',
                                    params: {
                                        _id: category._id
                                    }
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
import { reactive } from 'vue'

const router = useRouter()
const route = useRoute()

const query = reactive({
    search: route.query.search
})

const search = () => {
    router.push({
        name: 'categories.index',
        query: {
            search: query.search
        }
    })
}
</script>